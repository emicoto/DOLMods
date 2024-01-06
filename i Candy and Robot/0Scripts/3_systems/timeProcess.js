const oldPass = Time.pass

const TimeHandle = {
	prevDate : {},
	currentDate : {},
	passTime : function(pass){
		const { currentDate, prevDate } = this

		let sec = pass
		let min =  currentDate.minute - prevDate.minute

		if(min < 0){
			min += 60
		}

		let hour = currentDate.hour - prevDate.hour
		if(hour < 0){
			hour += 24
		}

		let day = currentDate.day - prevDate.day
		let month = currentDate.month - prevDate.month
		let year = currentDate.year - prevDate.year


		return {
			sec : sec,
			min : min,
			hour : hour,
			day : day,
			month : month,
			year : year,
			weekday : [prevDate.weekDay, currentDate.weekDay]
		}
	}
}

Time.pass = function(sec){
	const prevDate = new DateTime(V.startDate + V.timeStamp)
	const fragment = oldPass(sec)
	const currentDate = Time.date

	console.log('passed time:',sec)
	console.log('prevDate:',prevDate)
	console.log('currentDate:', currentDate)

	TimeHandle.prevDate = prevDate
	TimeHandle.currentDate = currentDate

	iTimeHandle(sec)
	if(V.combat == 1){
		iCombatHandle()
	}

	console.log('fragment:', fragment)
	if(fragment !== undefined){
		return fragment 
	}
	return ""
}

function iTimeHandle(passedSec){
	const { min, day, hour, month, year, weekday } = TimeHandle.passTime(passedSec)
	console.log('time handle:', passedSec, min, day, hour, month, year, weekday)

	if(!T.addMsg){
		T.addMsg = ''
	}

	//非战斗模式不处理低于0分的变动
	if(passedSec <= 0) return;
	if(min <= 0 && V.combat == 0) return;


	//根据事件的计算单位执行进程，先是按分钟计算的事件。
	if( passedSec/60 >= 1 || min > 0 || (passedSec > 0 && V.combat == 1)){
		minuteProcess(passedSec, min)
	}

	if(hour > 0 || passedSec/3600 >= 1 ){
		hourProcess(passedSec, hour)
	}

	if( day > 0 || passedSec/86400 >= 1 ){
		dayProcess(passedSec, day, weekday)
	}

	//每周的处理
	if(weekday[1] == 1 && weekday[0] !== 1){
		weekProcess(passedSec, day, weekday)
	}

}

function minuteProcess(sec, min){
	//-------------------------------------------------------------
	// 处理药物效果
	//-------------------------------------------------------------
		iCandy.DrugsProcess.minuteProcess(sec)

	//-------------------------------------------------------------
	// 处理额外效果
	//-------------------------------------------------------------
	const extraSense = R.extraSense
	for( const[type, sense] of Object.entries(extraSense)){
			iCandy.senseUpdate(sense, sec)
	}

	console.log('minute process:', sec, min)

	//-------------------------------------------------------------
	// 其他每分钟处理
	//-------------------------------------------------------------
	if(sec < 60 || min <= 0) return;
	//获得口渴值，口渴值受到疲劳的影响

	console.log('hunger and thirst process', sec, min)
	if ( sec / 60 > min ){
		min = Math.floor(sec / 60 + 0.5)
	}
	

	let thirstMult = 1 + (V.tiredness / C.tiredness.max)
	V.thirst = Math.clamp((V.thirst + 1 * min * thirstMult).fix(2), 0, C.thirst.max)

	//获得饥饿值, 饥饿值受到疲劳的影响
	let hungerMult = 1 + (V.tiredness / C.tiredness.max)
	V.hunger = Math.clamp((V.hunger + 1 * min * hungerMult).fix(2), 0, C.hunger.max)

	console.log('hunger:', V.hunger, hungerMult,'thirst:', V.thirst, hungerMult)

	//当饥饿值过高时，获得通知
	if(V.hunger >= C.hunger.max * 0.8){
		wikifier('stress', 8, 40)
		V.addMsg += lanSwitch(stateEffects.hungry) + '<<gstress>><br>'
	}

	//当饥渴值过高时，获得通知
	if(V.thirst >= C.thirst.max * 0.8){
		wikifier('stress', 8, 40)
		V.addMsg += lanSwitch(stateEffects.thirst) + '<<gstress>><br>'
	}

}

function hourProcess(sec, hour){
	//-------------------------------------------------------------
	// 检测药物戒断状态
	//-------------------------------------------------------------
	iCandy.DrugsProcess.hourProcess()

	//-------------------------------------------------------------
	// 检测普通成瘾品的戒断状态
	//-------------------------------------------------------------
	iCandy.DrugsProcess.hourProcess('general')

	//-------------------------------------------------------------
	// 其他每小时处理
	//-------------------------------------------------------------
	
	//随机减少商店库存，营造商店销售的假象
	for( const [key, shelf] of Object.entries(V.iShop)){
		if(!shelf || !shelf?.state){
			iShop.initShelf(key)
			iShop.getshelf(key)
		}
		else if(shelf.state == 'stocked'){
			shelf.stocks.forEach( item => {
				if(random(100) < 40){
					const data = Items.get(item.id)
					const sale = random(2, 6)
					item.stock = Math.max(0, item.stock - sale)
					item.count = Math.max(0, item.stock * data.num )
				}
			})
		}
	}

}


function dayProcess(sec, day, weekday){
	//-------------------------------------------------------------
	// 集算当日嗑药情况
	//-------------------------------------------------------------
	iCandy.DrugsProcess.dayProcess()

	//-------------------------------------------------------------
	// 集算酒精、尼古丁、催情类物质的情况
	//-------------------------------------------------------------
	iCandy.DrugsProcess.dayProcess('general')

	//-------------------------------------------------------------
	// 集算当日事件
	//-------------------------------------------------------------
	iCandy.DrugsProcess.eventCount()
	iCandy.DrugsProcess.eventCount('general')

	//-------------------------------------------------------------
	// 其他每日处理
	//-------------------------------------------------------------
	if(R.robot.power > 0){
		R.robot.power = Math.max(0, R.robot.power - 1)
	}

	R.flags.repairshop.today = 0;

	//事件flag的清理
	const chinatown = iEvent.getFlag('chinatown')
	for( let key in chinatown ){
		if(key.includes('today')){
			chinatown[key] = 0
		}
	}

	//商店上库存不足5的物品填充至20
	for( const [key, shelf] of Object.entries(V.iShop)){
		shelf.stocks.forEach( item => {
			const data = Items.get(item.id)
			if(item.stock <= 5){
				item.stock = 20
				item.count = item.stock * data.num
			}
		})
	}
}


function weekProcess(sec, day, weekday){
	//first day of game wont trigger this
	if(Time.days <= 1) return;
	//事件flag的清理
	iEvent.setFlag('chinatown', 'goatweek', 0)
	
	//清理商店的库存
	for( const [key, shelf] of Object.entries(V.iShop)){
		shelf.state = 'clear'
	}
}

function iCombatHandle(){
	const whitelistnpc = ['Avery', 'Briar', 'Darryl', 'Eden', 'Harper', 'Kylar', 'Landry', 'Morgan', 'Whitney', 'Winter', 'Remy', 'Wren', 'Keith', 'Cheng']
	//非战斗场景跳过
	if(V.combat == 0) return;
	if(V.stalk == true) return;
	//非白名单NPC跳过
	if(V.npc.length > 0 && !V.npc.has(...whitelistnpc)) return;

	//如果场景在学校，则看概率跳过
	if( V.location == 'school' && random(100) > 20) {
		R.combat.skip = true;
		return;
	}
	//如果场景在警察局，则看概率跳过
	if(V.location == 'police_station' && random(100) > 30){
		R.combat.skip = true;
		return;
	}
	//白名单NPC看概率跳过
	if(V.npc.length > 0 && V.npc.has(...whitelistnpc)  && V.consensual == 1 && !V.npc.has('Whitney', 'Morgan', 'Kylar') && random(100) > 40 ){
		R.combat.skip = true;
		return;
	}
	//已经跳过的，跳过
	if(R.combat.skip == true) return;


	//当pc处于反抗状态且处于优势时，跳过事件。
	if( V.pain < V.painmax * 0.8 
		&& V.enemyhealth < V.enemyhealthmax * 0.5 
		&& V.orgasmdown < 1 && V.rightarm !== 'bound' && V.leftarm !== 'bound' 
		&& V.leftleg !== 'bound' && V.rightleg !=='bound'
	) return;

	let rate = V.trauma/80 + V.stress/200
	const drugs = Items.search('drugs', 'or', 'pill', 'inject').filter( (item) => !item.id.has('angelpowder') && iCandy.getStat(item.id, 'efTimer') - V.timeStamp <= 1800 )
	console.log('combat feed drugs:',drugs)

	let html = ''


	//当敌人是触手或史莱姆或植物时，概率给pc上特殊分泌物
	if((V.enemytype == 'slime' || V.enemytype == 'tentacles' || V.enemytype == 'plant') && !iCandy.senseGet('genital', 'slime')){
		if(random(100) < 20 ){
			wikifier('drugs', 2000)
			iCandy.senseSet('genital', 'slime', 1.2, 3600)
			html += combatFeedMsg(V.enemytype, 'drugs')
			R.combat.slime = 1
		}
	}

	if(V.enemytype !== 'man') return;	
	//人类的情况，根据情况概率喂pc毒品

	for(let i = 0; i < V.enemynomax; i++){
		let npc = V.NPCList[i]
		//不能行动的，不是人类的，每个npc最多喂两次
		if(npc.stance == 'defeated' || npc.type !== 'human' || npc.feed >= 2){
			continue;
		}
		//如果pc有行动能力且npc血量过低，跳过
		if(V.pain < V.painmax && npc.health < npc.healthmax * 0.3 &&  V.orgasmdown < 1 && V.rightarm !== 'bound' && V.leftarm !== 'bound' && V.leftleg !== 'bound' && V.rightleg !=='bound'){
			continue;
		}

		if(npc.feed == undefined){
			npc.feed = 0
		}

		//当PC创伤或压力高于安全阈值时，NPC高概率喂PC天使粉。如果已经处于药效范围内，跳过
		if(V.trauma >= V.traumamax * 0.8 || V.stress >= V.stressmax * 0.8 ){

			if( iCandy.getStat('angelpowder', 'efTimer') > V.timeStamp ){
				continue;
			}

			if(random(100) < 40 && R.combat.angel < 1){
				html += combatFeedMsg(npc, 'angelpowder_inject')
				npc.feed++
				R.combat.angel++
				R.combat.total++
				continue;
			}

		}
		//其他情况根据创伤，疼痛，压力计算概率，随机喂PC毒品 
		if(random(100) <= rate && R.combat.total < 3 && drugs.length > 0 ){
			let drug = drugs.random()
			
			html += combatFeedMsg(npc, drug.id)
			
			npc.feed++
			R.combat.total++
			continue;
		}

		//嘴巴空着的话，概率投喂春药、致幻剂
		
	}

	console.log('combat handle:',html)

	if(html.length > 2){
		V.afterMsg += html
	}

}


Object.defineProperties(window.iCandy, {
	iTimeHandle : { value : iTimeHandle, writable : false },
	iCombatHandle : { value : iCombatHandle, writable : false },
	minuteProcess : { value : minuteProcess, writable : false },
	hourProcess : { value : hourProcess, writable : false },
	dayProcess : { value : dayProcess, writable : false }
})
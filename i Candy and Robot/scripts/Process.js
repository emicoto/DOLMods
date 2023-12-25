const oldPass = Time.pass

const TimeHandle = {
	prevDate : {},
	currentDate : {},
	passTime : function(){
		const { currentDate, prevDate } = this

		return {
			sec : currentDate.second - prevDate.second,
			min : currentDate.minute - prevDate.minute,
			day : currentDate.day - prevDate.day,
			month : currentDate.month - prevDate.month,
			year : currentDate.year - prevDate.year,
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

	if(V.combat == 1){
		iCombatHandle()
	}
	iTimeHandle(sec)

	console.log('fragment:', fragment)
	if(fragment !== undefined){
		return fragment 
	}
	return ""
}

function getDrugsConfig(tags, type){
	const { drugConfig } = setup
	if(tags.includes('immediate')){
		return drugConfig.immediate[type]
	}
	else if(tags.includes('super')){
		return drugConfig.super[type]
	}
	else if(tags.includes('strong')){
		return drugConfig.strong[type]
	}
	else if(tags.includes('risky')){
		return drugConfig.risky[type]
	}
	else{
		return drugConfig.normal[type]
	}
}

function iTimeHandle(passedSec){
	const { min, day, hour, month, year, weekday } = TimeHandle.passTime()

	if(!T.addMsg){
		T.addMsg = ''
	}

	//非战斗模式不处理低于0分的变动
	if(passedSec <= 0) return;
	if(min <= 0 && V.combat == 0) return;

	//根据事件的计算单位执行进程，先是按分钟计算的事件。
	if(min > 0 || (passedSec > 0 && V.combat == 1)){
		minuteProcess(passedSec)
	}

	if(hour > 0){
		hourProcess(passedSec, hour)
	}

	if(day > 0){
		dayProcess(passedSec, day, weekday)
	}

}

function minuteProcess(sec){
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

}

function iCombatHandle(){
	//非战斗场景跳过
	if(V.combat == 0) return;
	//合意场景的情况看对象是谁
	if(V.consensual == 1 && V.npc_name !== 0) return;
	//当pc处于反抗状态且处于优势时，跳过事件。
	if( V.pain < V.painmax * 0.8 
		&& V.enemyhealth < V.enemyhealthmax * 0.5 
		&& V.orgasmdown < 1 && V.rightarm !== 'bound' && V.leftarm !== 'bound' 
		&& V.leftleg !== 'bound' && V.rightleg !=='bound'
	) return;

	let rate = V.trauma/60 + V.stress/150
	const drugs = Items.search('drugs', 'or', 'pill', 'inject').filter( item => item.id !== 'angelpowder' )
	let html = ''


	//当敌人是触手或史莱姆时，概率给pc上特殊分泌物
	if(V.enemytype == 'slime' || V.enemytype == 'tentacles'){
	}
	
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

		//当PC创伤或压力高于安全阈值时，NPC高概率喂PC天使粉
		if(V.trauma >= V.traumamax * 0.65 || V.stress >= V.stressmax * 0.65 ){
			if(random(100) > 40){
				let palams = Item.get('angelpowder').onUse('enemy')
				html += `${npc.fullDescription}看着你毫无声息的脸，觉得这样很无趣。于是<<He>>拿出一针粉色的针剂，直接打在了你身上。<br>
				<span class ='pink'>你被注射了一针天使粉。</span> | ${palams}<br>`
				npc.feed++
				continue;
			}

		}
		//其他情况根据创伤，疼痛，压力计算概率，随机喂PC毒品 
		if(random(100) <= rate){
			let [drugId, drug] = drugs.random()
			let tags = drug.tags
			let html = ''
			let drugeffect = drug.onUse('enemy')

			//如果是注射的，直接打针
			if (tags.includes('inject')){
				html += `${npc.fullDescription}拿出一针${drug.name[1]}，直接打在了你身上。<br>
				<span class ='pink'>你被注射了一针${drug.name[1]}。</span> | ${drugeffect}<br>`
			}
			//药片需要看看pc的嘴或肛门是不是空的
			else{
				if(V.mouthuse !== 'penis' && V.mouthuse !== 'kiss'){
					html += `${npc.fullDescription}往你嘴里喂了颗${drug.name[1]}。`
				}
				else if(V.anususe !== 'penis' || V.anususe !== 'penisdouble'){
					html += `${npc.fullDescription}往你肛门塞了颗${drug.name[1]}。`
				}
				else if(V.mouthuse == 'kiss' && npc.mouth == 'kiss'){
					html += `${npc.fullDescription}亲吻你之余，通过嘴对嘴的方式喂了你一颗${drug.name[1]}。`
				}
				else{
					html += `${npc.fullDescription}在你喘气的空档强行喂了你一颗${drug.name[1]}。`
				}

				html += ' | ' + drugeffect +'<br>'

			}
			
			npc.feed++
			continue;
		}

		//嘴巴空着的话，概率投喂春药、致幻剂
		
	}

	console.log(html)

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
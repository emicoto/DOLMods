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

	iTimeHandle(sec)

	if(sec <= 0 ) return fragment 
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
	if(V.consensual == 1) return;

	let rate = V.trauma/60 + V.stress/150
	const drugs = Items.search('drugs', 'or', 'pill', 'inject')
	
	for(let i = 0; i < V.enemynomax; i++){
		let npc = V.NPCList[i]
		//不能行动的，不是人类的，已经投喂过的npc就跳过
		if(npc.stance == 'defeated' || npc.type !== 'human' || npc.feed ){
			continue;
		}

		//当PC创伤或压力高于安全阈值时，NPC高概率喂PC天使粉
		if(V.trauma >= V.traumamax * 0.6 || V.stress >= V.stressmax * 0.6 ){
			if(random(100) > 40){
				Items.data['angelpowder']
			}

		}
		//其他情况根据创伤，疼痛，压力计算概率，随机喂PC毒品 
		if(random(100) <= rate){


		}

		
	}

}


Object.defineProperties(window.iCandy, {
	iTimeHandle : { value : iTimeHandle, writable : false },
	iCombatHandle : { value : iCombatHandle, writable : false },
	minuteProcess : { value : minuteProcess, writable : false },
	hourProcess : { value : hourProcess, writable : false },
	dayProcess : { value : dayProcess, writable : false }
})
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


const DrugsProcess = {
	minuteProcess: function(sec){
		const drugStats = R.drugStates.drugs
		const drugFlags = R.drugFlags.drugs
	
		for(const[drug, stats] of Object.entries(drugStats)){
			//获取药物的信息
			if(iCandy.config.debug)
				console.log('drug states', drug, stats, drugFlags[drug]);

			const drugItem = Items.get(drug)
			if(!drugItem) continue;		
	
			//如果时间戳小于药物效果到期时间，运行药物效果
			if( V.timeStamp <= stats.efTimer){
	
				//如果药物的效果时间大于0，还没设置flag的话，设置flag
				if(drugFlags[drug].high == 0){
					drugFlags[drug].high = 1
				}
	
				//运行药物效果并获得通知
				if(typeof drugItem.onHigh == 'function'){
					V.addMsg += drugItem.onHigh(sec/60) + '<br>'
				}
				else if(drugMsg[drug].onHigh){
					V.addMsg += lanSwitch(drugMsg[drug].onHigh) + '<br>'
				}
			}
			else{
				//如果药效过去，取消flag并检测是否有清醒效果
				stats.efTimer = 0
	
				if(drugFlags[drug].high == 1){
					drugFlags[drug].high = 0;
					drugFlags[drug].highonce = 0
	
					//如果药物有清醒效果，运行清醒效果并获得通知
					if(typeof drugItem.onWake == 'function'){
						V.addMsg += drugItem.onWake() + '<br>'
					}
					else if(drugMsg[drug].onWake){
						V.addMsg += lanSwitch(drugMsg[drug].onWake) + '<br>'
					}
				}
			}
	
		}
	},
	hourProcess: function(type){
		const itemStats = type == 'general' ? R.drugStates.general : R.drugStates.drugs
		const itemFlags = type == 'general' ? R.drugFlags.general : R.drugFlags.drugs

		for(const[item, stats] of Object.entries(itemStats)){
			//获取药物的信息
			if(iCandy.config.debug)
				console.log('hourProcess, item check', type, item, stats, itemFlags[item]);

			const data =  type == 'general' ? setup.addictions[item] : Items.get(item)
			if(!data) continue;
	
			//获取戒断需求时间(hour)
			const { withdraw } = data
			//药物本身没有戒断设置的话，跳过
			if(!withdraw || withdraw == 0) continue;

			//药物没有上瘾的话，跳过
			if(stats.addict == 0) continue;
	
			//通过上次嗑药时间与当前时间的差值计算戒断时间
			const lastTime = stats.lastTime
			const withdrawTimer = Math.floor((V.timeStamp - lastTime)/3600)
	
			//戒断时间大于戒断反应时间的话，运行戒断效果并获得通知
			if(stats.lastTime > 0 && withdrawTimer >= withdraw){
				//如果设置了function，运行function
				if(typeof data.onWithdraw == 'function'){
					V.addMsg += data.onWithdraw() + '<br>'
				}
				else if(drugMsg[item].onWithdraw){
					V.addMsg += lanSwitch(drugMsg[item].onWithdraw) + '<br>'
				}
				//没有则运行默认的戒断效果
				else{
					const name = type == 'general' ? item : data.name
					V.addMsg += generalWithdraw(name) + '<br>'
				}
				//设置戒断状态
				stats.withdraw = 1
			}
		}
	},
	dayProcess: function(type){
		const itemStats = type == 'general' ? R.drugStates.general : R.drugStates.drugs
		const itemFlags = type == 'general' ? R.drugFlags.general : R.drugFlags.drugs

		for(const[item, stats] of Object.entries(itemStats)){
			//获取药物的信息
			const data =  type == 'general' ? setup.addictions[item] : Items.get(item)
			if(!data) continue;

			//获取上瘾阈值，最大过量值，戒除需求时间(day)，引起戒断反应所需时间(hour)
			const { threshold, maxOD, quit, tags } = data

			//当超量时，根据进度增加隐形上瘾值。
			const process = type == 'general' ? data.process : getDrugsConfig(tags, 'process')
			if(maxOD >= 0 && stats.overdose > 0 && stats.addict == 0){
				stats.process += process
			}

			//当近期过量次数大于最大过量值时，并且隐形上瘾值大于2，设置上瘾状态
			if(maxOD >= 0 && stats.overdose > maxOD && stats.addict == 0 && stats.process >= 2){
				stats.addict = 1
				//设置上瘾事件flag
				itemFlags[item].addiction = 1
			}

			//如果maxOd跟threshold都是0， 说明是必上瘾的特效药物，直接设置上瘾状态
			if(type !== 'general' && maxOD == 0 && threshold == 0 && stats.taken > 0 && stats.addict == 0){
				stats.addict = 1
				//设置上瘾事件flag
				itemFlags[item].addiction = 1
			}

			//检测最后一次嗑药时间，如果超过戒除需求时间，清除上瘾状态
			//累次戒除再次染上毒瘾时，每次戒除时间增加5天，但最多不超过120天
			const quitDays = quit * 86400 + stats.quitTimes * 5 * 86400
				Math.min(quitDays, 120 * 86400)

			if(stats.lastTime > 0 && stats.addict > 0 && V.timeStamp - stats.lastTime >= quitDays ){
				stats.addict = 0
				//设置戒除事件flag
				itemFlags[item].quit = 1
				//添加戒除次数
				stats.quitTimes ++
			}

			//超量值也算是一种药效残余值，每日自然恢复3点，但如果当日有嗑过药恢复数就减少。
			const recover = type == 'general' ? 3 : getDrugsConfig(tags, 'recover')
			if(stats.taken <= threshold ){
				stats.overdose = Math.max(stats.overdose - stats.taken > 0 ? recover/2 : recover, 0)
			}

			if(stats.taken > 0 ){
				if(!stats.takeDays){
					stats.takeDays = 1
				}
				else{
					stats.takeDays ++
				}
			}
			else{
				stats.takeDays = 0
			}

			//如果超量值大于零，同时没有引起戒断反应，且连续嗑药次数大于2
			if(type !== 'general' && stats.overdose > 0 && stats.withdraw == 0 && stats.takeDays >= 2 ){
				itemFlags[item].daily = 1
			}
			
			//每日清零当日计数器
			stats.taken = 0
		}
	},
	eventCount: function(type){
		const flags = type == 'general' ? R.drugFlags.general : R.drugFlags.drugs

		for(const[item, flag] of Object.entries(flags)){
			const data = type == 'general' ? setup.addictions[item] : Items.get(item)
			if(!data) continue;

			if(flag.daily == 1){
				if(typeof data.onDay == 'function'){
					V.addMsg += data.onDay() + '<br>'
				}
				else if(drugMsg[item]?.onDay){
					V.addMsg += lanSwitch(drugMsg[item].onDay) + '<br>'
				}
				else{
					
				}
				flag.daily = 0
			}

			if(flag.addiction == 1){
				V.addMsg += this.addictionEvent(item) + '<br>'

				//如果设置了专用事件，在通知后运行专用事件
				if(typeof data.addictionEvent == 'function'){
					V.addMsg += data.addictionEvent() + '<br>'
				}
				flag.addiction = 0
			}

			//如果当日有戒除，运行戒除效果并获得通知
			if(flag.quit == 1){
				V.addMsg += this.QuitEvent(item) + '<br>'

				//如果设置了专用事件，在通知后运行专用事件
				if(typeof data.quitEvent == 'function'){
					V.addMsg += data.quitEvent() + '<br>'
				}
				flag.quit = 0
			}
		}

	},

	addictionEvent: function(item){
		const general = ['alcohol', 'nicotine', 'aphrod']
		const template = [
			`You are completed addicted to {0}, you need to {1} {0} to maintain normal life. If you don't {1} {0} within {2} hours, you will have withdrawal symptoms.`,
			`你已经对{0}彻底上瘾了，你需要持续{1}{0}来维持正常的生活。如果{2}小时内没有{1}{0}，你将会出现戒断症状。`,
		]
		if(general.includes(item)){
			const word = lanSwitch(setup.addictions[item].name)
			const hours = setup.addictions[item].withdraw
			const methods = lanSwitch(setup.addictions[item].methods)
	
			return printTemplet(lanSwitch(template), word[item], methods[item], hours) + '<br>'
		}
		else{
			const data = Items.get(item)
			const word = lanSwitch(data.name)
			const hours = data.withdraw
			let methods = useMethods(data.type, data.tags)
	
			return printTemplet(lanSwitch(template), word, lanSwitch(methods), hours) + '<br>'
		}
	},

	QuitEvent : function(item){
		const general = ['alcohol', 'nicotine', 'aphrod']
		const template = [
			`You have completely quit {0}, as long as you don't touch {0} again, your body will gradually recover.`,
			`你已经彻底戒除了{0}，只要不再沾染上{0}你的身体将会逐渐恢复健康。`,
		]
	
		if(general.includes(item)){
			const word = lanSwitch(setup.addictions[item].name)
			return printTemplet(lanSwitch(template), word[item]) + '<br>'
		}
		else{
			const data = Items.get(item)
			const word = lanSwitch(data.name)
			return printTemplet(lanSwitch(template), word) + '<br>'
		}
	}
}

iCandy.getDrugsConfig = getDrugsConfig
iCandy.DrugsProcess = DrugsProcess
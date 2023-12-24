
function checkDayPass(){
	if(!V.iCandyStats.lastdaycheck){
		V.iCandyStats.lastdaycheck = Time.days
	}

	if(Time.days > V.iCandyStats.lastdaycheck){
		//-- 处理当天的嗑药状态
		addictionPross()

		if(V.iRobot.battery > 0){
			V.iRobot.battery--
		}

		if(V.iRobot.humanity >= 50){
			V.trauma -= 30
		}

		V.repairStore.today = 0

		//-- 处理完毕后再更新覆盖。
		V.iCandyStats.lastdaycheck = Time.days
	}

	//战斗结束后，从天使吻药效中醒来时
	if(V.iCandyStats.angelkissTaken == 1 && V.combat == 0 && V.hallucinogen <= 1 ){
		setup.candyDrug.angelkiss.onwake()
		V.iCandyStats.flags.angelkisswake = 1
	}

	let html = addctionEvent()
	if(html && html.length > 1)
		new Wikifier(null, `<<append #addMsg transition>>${html}<</append>>`)

	return ''
}

DefineMacroS('checkDayPass', checkDayPass)



function combatEffect(){
	if(V.combat == 0) return
	//合意场景对象不是惠特尼也返回.
	if(V.consensual==0) return

	//当PC创伤或压力高于一定程度时，NPC有一定概率会PC喂天使之吻。
	if( V.mouthuse !== 'penis' && V.trauma >= 500 || V.stress >= 1000){
		for(let i=0; i < V.enemynomax; i++){
			let npc = V.NPCList[i]
			if(npc.stance == 'defeated' || npc.type !== 'human')
				continue

				if(random(100) > 70){
					setup.candyDrug.angelkiss.ontake(1)
					new Wikifier(null, `<<append #addMsg transition>>${npc.fullDescription}给你喂了颗甜甜的糖果，你感觉整个人变得轻松愉快。<<gggdrugged>><<ggghallucinogens>><</append>>`)
					break
				}

			//一定概率随机喂高风险药物

		}
	}

	for(let i=0; i < V.enemynomax; i++){
		let npc = V.NPCList[i]
        if(npc.stance == 'defeated' || npc.type !== 'human')
            continue

			//当NPC的屌在A前进不去时，会有一定概率给PC上催情润滑油.
			if(npc.penis.includes('anus') && (npc.penis !== 'anus' || npc.penis !== 'anusdouble') ){
				if(random(100) > 30){
					setup.candyDrug.lubricantSP.onuse(1)
					new Wikifier(null, `<<append #addMsg transition>>${npc.fullDescription}在你的菊部涂抹了催情润滑油。 <<gggdrugged>><</append>>`)
				}
			}

			//一定概率被打针
	}


}

function addictionPross(){
	let Stats = V.iCandyStats

	for(let i in V.candyDrug){
		//确认初始化
		if(!Stats.candies[i] || !Stats.candies[i].addict){
			Stats.candies[i] = {
				addict:0,
				withdraw:0,
			}
		}

		if(!Stats.flags.candy[i]){
			Stats.flags.candy[i] = {
				addict:0,
				withdraw:0,
			}
		}

		let drug = V.candyDrug[i]
		let odStat = Stats.candies[i]
		let textflag = Stats.flags[i]

		//确认依赖度，连续嗑药数达标就会获得依赖。
		console.log(i, drug)
		if(drug.overdose >= setup.candyDrug[i].maxOD && drug.addict==0){
			drug.addict = 1 //状态flag
			textflag.addict = 1 //文本显示flag
		}
			
		//处于依赖状态当天没嗑药会感到心慌获得压力。但连续5天不吃就能清除依赖
		if(drug.addict == 1 && drug.taken == 0){
			//增加戒断日数
			odStat.withdraw ++

			//确认戒断状态
			if(odStat.withdraw >= setup.candyDrug[i].withdraw ){
				odStat.withdraw = 0;
				drug.addict = 0

				//显示彻底戒断的文本
				textflag.addict = 2
			}

			//显示戒断文本
			if(odStat.withdraw > 0 && textflag.withdraw == 0 )
				textflag.withdraw = 1
		}

		//计算当天超量，每天自然恢复3点，但如果当天有嗑过药恢复数就减少。
		let recover = {
			super: 0.5,
			strong: 1,
			risky: 2,
			normal: 3,
		}
		drug.overdose = drug.overdose + Math.max(drug.taken-3, 0)
		drug.overdose = Math.max(drug.overdose - recover[drug.subType], 0)
		//每日清零当日计数器
		drug.taken = 0
	}

	let flag = Stats.flags

	//春药中毒，短期内吸收超过1800点药物值或18次就会上瘾
	if(Stats.drugs.overdose >= 18){
		Stats.drugs.addict = 1
		flag.drugs.addict = 1 //显示上瘾文本
	}

	//春药戒断中，起码14天才能完全戒断
	if(Stats.drugs.take == 0){
		Stats.drugs.withdraw ++

		//确认戒断状态
		if(Stats.drugs.withdraw >= 14){
			Stats.drugs.addict = 0;

			//彻底戒断文本
			flag.drugs.addict = 2
		}
		//显示戒断文本
		if(Stats.drugs.withdraw > 0 && flag.drugs.withdraw == 0){
			flag.drugs.withdraw = 1
		}
	}

	//计算当天超量，每天自然恢复2点，但如果当天有吸收过春药恢复数就减少。
	Stats.drugs.overdose = Stats.drugs.overdose + Math.max(Stats.drugs.take - 2, -2)
	//当日计数清零
	Stats.drugs.take = 0

	//酒精中毒，短期内吸收超过2400点酒精或24次就会上瘾
	if(Stats.alcohol.overdrunk >= 24){
		Stats.alcohol.addict = 1
		flag.alcohol.addict = 1 //显示上瘾文本
	}

	//酒精戒断中，起码30天才能完全戒断
	if(Stats.alcohol.drunk == 0){
		Stats.alcohol.withdraw ++

		//确认戒断状态
		if(Stats.alcohol.withdraw >= 30){
			Stats.alcohol.addict = 0;

			//彻底戒断文本
			flag.alcohol.addict = 2
		}
		//显示戒断文本
		if(Stats.alcohol.withdraw > 0 && flag.alcohol.withdraw == 0){
			flag.alcohol.withdraw = 1
		}
	}

	//计算当天超量，每天自然恢复1点，但如果当天有喝过酒就没得恢复。
	Stats.alcohol.overdrunk = Stats.alcohol.overdrunk + Math.max(Stats.alcohol.drunk - 1, -1)
	//当日计数清零
	Stats.alcohol.drunk = 0

}

function addctionEvent(){
	let html = ''
	let {candy, drugs, alcohol, angelkisswake } = V.iCandyStats.flags

	if(angelkisswake == 1){
		html += '你从甜美的幻境中醒来了，你感到头昏脑涨。<<lllcontrol>><<gggalcohol>><<gggstress>><<gtrauma>>'
		V.iCandyStats.flags.angelkisswake = 0
	}

	for(let i in candy){
		if(candy[i].addict == 1){
			html += `你开始对${setup.candyDrug[i].name}产生了依赖，如果你想彻底戒掉起码要有${setup.candyDrug[i].withdraw}天不接触该药物。<br>`
		}
		else if(candy[i].addict == 2){
			html += `你已经彻底戒除了${setup.candyDrug[i].name}。<br>`	
		}
		candy[i].addict = 0
	}

	for(let i in candy){
		if(candy[i].withdraw == 1 && i !== 'angelkiss'){
			html += `你今天没吃${setup.candyDrug[i].name}感到些许心慌。<<ggstress>><<stress 12>>`
		}
		else if(candy[i].withdraw == 1 && i == 'angelkiss'){
			html += `你今天没嗑天使之吻，感到浑身发烫难受。<<gggstress>><<stress 60>><<gtrauma>><<trauma 8>><<arousal 240 'genital'>>`
		}
		candy[i].withdraw = 0
	}

	if(drugs.addict == 1){
		html += `你开始对性奋类药物上瘾。<br>`
	}
	else if(drugs.addict == 2){
		html += `你已经彻底戒除了性奋类药物。<br>`
	}

	if(drugs.withdraw == 1){
		html += `你今天没吸收性奋类药物，你感到十分空虚难受。<<ggstress>><<gtrauma>><<stress 16>><<trauma 4>>`
	}

	drugs.addict = 0
	drugs.withdraw = 0

	if(alcohol.addict == 1){
		html += `你开始对酒精上瘾。<br>`
	}
	else if(alcohol.addict == 2){
		html += '你已经彻底戒除了酒精。<br>'
	}

	if(drugs.withdraw == 1){
		html += '你今天没喝过酒，你感到十分烦躁。<<ggstress>><<stres 12>>'
	}

	alcohol.addict = 0
	alcohol.withdraw = 0


	return html
}

DefineMacroS('addctionEvent', addctionEvent)
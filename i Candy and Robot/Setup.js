setup.countlDrug = function(){
	let count = 0
	for(let i in V.candyDrug){
		count += V.candyDrug[i].owned
	}
	return count
},

setup.countlItems = function(){
	let count = 0
	for(let i in V.candyItems){
		count += V.candyItems[i]
	}
	return count
}

setup.countMechaItems = function(){
	let count = 0
	for(let i in V.mechaitems){
		if(i !== 'robotbuild') count += V.mechaitems[i];
	}
	return count
}

setup.candyDrug = {
	serotonin:{
		id		: 'serotonin',
		name	: '羟色胺',
		num		: 20,
		price	: 6200,
		info	: "具有放松和提振心情的作用",
		maxOD	: 12,
		withdraw: 5,
		ontake	: function(){
			let drug = V.candyDrug[this.id]
			let truama =  40 * Math.max(1-(drug.taken*0.1), 0.2)
			wikifier('trauma', -truama)
			drug.owned --
			drug.taken ++
		},
	},
	melatonin:{
		id		: 'melatonin',
		name	: '褪黑素',
		num		: 30,
		price	: 4800,
		info	: "能帮助睡眠以及消减压力",
		maxOD	: 16,
		withdraw: 5,
		ontake	: function(){
			let drug = V.candyDrug[this.id]
			let stress = 300 * Math.max(1-(drug.taken*0.1), 0.2)
			wikifier('stress', -stress)
			drug.owned --
			drug.taken ++
		},
	},
	neuroOptimization:{
		id		: 'neuroOptimization',
		name	: '神经优化片',
		num		: 20,
		price	: 6400,
		info	: "提神醒脑，增强记忆力",
		maxOD	: 24,
		withdraw: 3,
		ontake	: function(){
			let drug = V.candyDrug[this.id]
			let control = 100 * Math.max(1-(drug.taken*0.1), 0.2)
			wikifier('control', control)
			drug.owned --
			drug.taken ++		
		},
	},
	aminobutyric:{
		id		: 'aminobutyric',
		name	: '氨基丁酸',
		num		: 20,
		price	: 12000,
		info	: "对抑郁症和焦虑症有一定抵御效果。",
		maxOD	: 10,
		withdraw: 7,
		ontake	: function(){
			let drug = V.candyDrug[this.id]
			let trauma = 120 * Math.max(1-(drug.taken*0.1), 0.2)
			wikifier('trauma', -trauma)
			drug.owned --
			drug.taken ++	
		},
	},
	painreduce:{
		id		: 'painreduce',
		name	: '止痛药',
		num		: 20,
		price	: 4800,
		info	: "速效止痛药",
		maxOD	: 12,
		withdraw: 5,
		ontake	: function(){
			let drug = V.candyDrug[this.id]
			let pain = 50 * Math.max(1-(drug.taken*0.1), 0.2)
			wikifier('pain', -pain)
			drug.owned --
			drug.taken ++
		},
	},

	angelkiss:{
		id		:'angelkiss',
		name	:'天使之吻',
		num		: 3,
		price	: 5000,
		info	: '速效精神药物，带你直上天国。',
		maxOD   : 2,
		withdraw: 20,
		ontake  : function(enemy){
			let drug = V.candyDrug[this.id]
			let pain = 100 * Math.max(1-(drug.taken*0.1), 0.1)
			let trauma = 300 * Math.max(1-(drug.taken*0.1), 0.1)
			let stress = 1200 * Math.max(1-(drug.taken*0.1), 0.1)

			wikifier('pain', -pain)
			wikifier('trauma', -trauma)
			wikifier('stress', -stress)

			wikifier('drugs', 1000)
			wikifier('alcohol', 300)
			wikifier('arousal', 100, 'genital')
			wikifier('hallucinogen', 100)

			V.iCandyStats.angelkissTaken = 1

			drug.taken++
			V.medicated++
			if(!enemy)
				drug.owned--
		},
		onwake  : function(){
			wikifier('stress', 30)
			wikifier('trauma', 4)
			wikifier('alcohol', 100)
			wikifier('control', -36)

			V.iCandyStats.angelkissTaken = 0
		}
	},

	//-- 常规道具
	fruitscandy:{
		id		: 'fruitscandy',
		name	: '水果糖',
		num		: 12,
		price	: 2000,
		info	: "酸酸甜甜的，提供些许幸福感",
		onuse	: function(){
			let trauma = random(3, 12)
			wikifier('trauma', -trauma)

			V.candyItems[this.id] --
		},
	},
	chocolate:{
		id		: 'chocolate',
		name	: '巧克力',
		num		: 3,
		price	: 1600,
		info	: "甜甜的巧克力，能缓解些许压力",
		onuse	: function(){
			let stress = random(20, 60)
			let tiredness = random(60, 100)
			wikifer('stress', -stress)
			wikifier('tiredness', -tiredness)

			V.candyItems[this.id] --
		},
	},
	ramune:{
		id		: 'ramune',
		name	: '波子水',
		num		: 1,
		price	: 800,
		info	: "清爽的波子水，能补充点体力",
		onuse	: function(){
			let tiredness = random(64, 120)
			wikifier('tiredness', -tiredness)

			V.candyItems[this.id] --
		},
	},
	lolipop:{
		id		: 'lolipop',
		name	: '波板糖',
		num		: 1,
		price	: 400,
		info	: "甜甜的大波板糖，提供些许幸福感",
		onuse	: function(){
			let trauma = random(4, 20)
			wikifer('trauma', trauma)
			V.candyItems[this.id] --
		},
	},

	potachips:{
		id		:"potachips",
		name	: '薯片',
		num		: 1,
		price	: 500,
		info	: '脆脆的薯片，补充些许体力。',
		onuse	: function(){
			let tiredness = random(50, 100)
			wikifer('tiredness', -tiredness)

			V.candyItems[this.id] --
		}

	},

	lubricant:{
		id		: 'lubricant',
		name	: '润滑油',
		num		: 200,
		price	: 3000,
		onuse   : function(){
			V.player.bodyliquid.anus.goo += 50
			V.candyItems[this.id] -= 10
		}
	},
	lubricantSP:{
		id		: 'lubricantSP',
		name	: '催情润滑油',
		num		: 300,
		price	: 6000,
		onuse	: function(enemy){
			V.player.bodyliquid.anus.goo += 50
			let drug = 200
			wikifer('drugs', drug)

			if(!enemy)
				V.candyDrug[this.id] -= 10
		}
	}
}

function checkDayPass(){
	if(!V.iCandyStats.lastdaycheck){
		V.iCandyStats.lastdaycheck = Time.days
	}

	if(Time.days >= V.iCandyStats.lastdaycheck){
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
		V.iCandyStats.flag.angelkisswake = 1
	}

	let html = addctionEvent()
	if(html && html.length > 1)
		new wikifier(null, `<<append #addMsg transition>>${html}<</append>>`)

	return ''
}

DefineMacroS('checkDayPass', checkDayPass)

function combatEffect(){
	if(V.combat == 0) return
	//合意场景也返回.
	if(V.consensual==0) return

	//当PC创伤高于一定程度时，NPC有一定概率会PC喂天使之吻。
	if(V.trauma >= 2000 && V.mouthuse !== 'penis'){
		for(let i=0; i < V.enemynomax; i++){
			let npc = V.NPCList[i]
			if(npc.stance == 'defeated' || npc.type !== 'human')
				continue

				if(random(100) > 70){
					setup.candyDrug.angelkiss.ontake(1)
					new Wikifier(null, `<<append #addMsg transition>>${npc.fullDescription}给你喂了颗甜甜的糖果，你感觉整个人变得轻松愉快。<<gggdrugged>><<ggghallucinogens>><</append>>`)
					break
				}
		}
	}

	//当NPC的屌在A前进不去时，会有一定概率给PC上催情润滑油.
	for(let i=0; i < V.enemynomax; i++){
		let npc = V.NPCList[i]
        if(npc.stance == 'defeated' || npc.type !== 'human')
            continue

			if(npc.penis.includes('anus') && (npc.penis !== 'anus' || npc.penis !== 'anusdouble') ){
				if(random(100) > 50){
					setup.candyDrug.lubricantSP.onuse(1)
					new Wikifier(null, `<<append #addMsg transition>>${npc.fullDescription}在你的菊部涂抹了催情润滑油。 <<gggdrugged>><</append>>`)
				}
			}
	}


}

function addictionPross(){
	let Stats = V.iCandyStats

	for(let i in V.candyDrug){
		//确认初始化

		if(!Stats.candies[i]){
			Stats.candies[i] = {
				withdraw: 0,
				clear: 0,
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
		if(drug.overdose > setup.candyDrug[i].maxOD && drug.addict==0){
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
		drug.overdose = drug.overdose + Math.max(drug.taken - 3, -3)
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
		html += '你从甜美的幻境中醒来了，你感到头昏脑涨。<<lllcontrol>><<gggalcohol>><<gggstress>><<gtruama>>'
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
			html += `你今天没嗑天使之吻，感到浑身发烫难受。<<gggstress>><<stress 60>><<gtruama>><<truama 8>><<arousal 240 'genital'>>`
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
		html += `你今天没吸收性奋类药物，你感到十分空虚难受。<<ggstress>><<gtruama>><<stress 16>><<truama 4>>`
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
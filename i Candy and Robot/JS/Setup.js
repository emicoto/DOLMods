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
		type	: 'drugs',
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
		type	: 'drugs',
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
		type	: 'drugs',
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
		type	: 'drugs',
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
		type	: 'drugs',
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
		type	:'drugs',
		id		:'angelkiss',
		name	:'天使之吻',
		num		: 3,
		price	: 5000,
		info	: '速效精神药物，带你直上天国。',
		maxOD   : 1,
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
		type	: 'candy',
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
		type	: 'candy',
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
		type	: 'candy',
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
		type	: 'candy',
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
		type	:'candy',
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
		type	: 'extra',
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
		type	: 'extra',
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

function setBodywrite(obj){
	setup.bodywriting_namebyindex[obj.index] = obj.key
	setup.bodywriting[obj.key] = obj
}

function newBodyWrite(obj){
	return {
		index: Object.keys(setup.bodywriting).length,
		writing: obj.name,
		type: obj.type ?? 'text',
		writ_cn: obj.cn ?? obj.name,
		arrow: obj.arrow ? 1 : 0,
		special: obj.sp ?? 'none',
		gender: obj.gender ?? 'n',
		lewd: 1,
		degree: obj.degree ?? 0,
		key: obj.key,
		sprites:[],
	}
}

function addBodyWriting(){
	let newTattos = [

		newBodyWrite({
			key:'fifty_whore', name:'£50', sp:'prostitution', degree:5000, 
		}),

		newBodyWrite({
			key:'drug_eater', name:'Drug Eater', cn:'瘾君子', sp:'drugs', 
		}),

		newBodyWrite({
			key:'drug_whore', name:'Drug Whore', cn:'毒娼', sp:'prostitution', 
		}),

		newBodyWrite({
			key:'sell_for_drug', name:'Sell body for drugs', cn:'为药卖身', sp:'prostitution', 
		}),

		newBodyWrite({
			key:'drug_slut', name:'Drug Slut', cn:'药瘾婊子', sp:'drugs', 
		})

	]
	newTattos.forEach((value)=>{
		setBodywrite(value)
	})
}



$(document).one(':storyready',()=>{
	let check = setInterval(()=>{
		if(setup.bodywriting){
			addBodyWriting()
			clearInterval(check)
		}
	}, 100)
})
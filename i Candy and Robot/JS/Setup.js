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
	for(let i in V.mechaItems){
		if(i !== 'robotbuild') count += V.mechaItems[i];
	}
	return count
}

setup.iCandyVariable = {}
setup.iCandyVersion = '0.1.1'

let cv = setup.iCandyVariable

function getPalam(key, value){
	let list = ['trauma', 'pain', 'tiredness', 'drunk', 'hallucinations','control','corruption','stress', 'drugged']
	if(!V.statFreeze && list.includes(key))
		V[key] += value
}
window.getPalam = getPalam

function setupCandyVar(){

	setup.candyDrug = {
		serotonin:{
			type	: 'drugs',
			subType : 'normal',
			id		: 'serotonin',
			name	: lanSwitch('Serotonin','羟色胺'),
			num		: 20,
			price	: 6200,
			info	: lanSwitch('Help you relax and uplifit your mood',"具有放松和提振心情的作用"),
			maxOD	: 12,
			withdraw: 5,
			ontake	: function(){
				let drug = V.candyDrug[this.id]
				let truama =  20 * Math.max(1-(drug.taken*0.1), 0.2)
				wikifier('trauma', -truama)
				drug.owned --
				drug.taken ++
			},
		},
		melatonin:{
			type	: 'drugs',
			subType : 'normal',
			id		: 'melatonin',
			name	: lanSwitch('Melatonin', '褪黑素'),
			num		: 30,
			price	: 4800,
			info	: lanSwitch('Help for sleep and reduce stress',"能帮助睡眠以及消减压力"),
			maxOD	: 16,
			withdraw: 5,
			ontake	: function(){
				let drug = V.candyDrug[this.id]
				let stress = 20 * Math.max(1-(drug.taken*0.1), 0.2)
				wikifier('stress', -stress)
				drug.owned --
				drug.taken ++
			},
		},
		neuroOptimization:{
			type	: 'drugs',
			subType : 'normal',
			id		: 'neuroOptimization',
			name	: lanSwitch('Neuro Optimization', '神经优化片'),
			num		: 20,
			price	: 6400,
			info	: lanSwitch('Improves the brain and memory',"提神醒脑，增强记忆力"),
			maxOD	: 24,
			withdraw: 3,
			ontake	: function(){
				let drug = V.candyDrug[this.id]
				let control = 60 * Math.max(1-(drug.taken*0.1), 0.2)
				wikifier('control', control)
				drug.owned --
				drug.taken ++		
			},
		},
		aminobutyric:{
			type	: 'drugs',
			subType : 'normal',
			id		: 'aminobutyric',
			name	: lanSwitch('Aminobutyric','氨基丁酸'),
			num		: 20,
			price	: 12000,
			info	: lanSwitch('Help for against depression and anxiety',"对抑郁症和焦虑症有一定抵御效果"),
			maxOD	: 10,
			withdraw: 7,
			ontake	: function(){
				let drug = V.candyDrug[this.id]
				let trauma = 80 * Math.max(1-(drug.taken*0.1), 0.2)
				wikifier('trauma', -trauma)
				drug.owned --
				drug.taken ++	
			},
		},
		painreduce:{
			type	: 'drugs',
			subType : 'normal',
			id		: 'painreduce',
			name	: lanSwitch('Painkiller','止痛药'),
			num		: 20,
			price	: 4800,
			info	: lanSwitch('Fast-acting painkiller',"速效止痛药"),
			maxOD	: 12,
			withdraw: 5,
			ontake	: function(){
				let drug = V.candyDrug[this.id]
				let pain = 40 * Math.max(1-(drug.taken*0.1), 0.2)
				wikifier('pain', -pain)
				drug.owned --
				drug.taken ++
			},
		},
	
		angelkiss:{
			type	:'drugs',
			subType :'strong',
			id		:'angelkiss',
			name	: lanSwitch('Angel Kiss','天使之吻'),
			num		: 3,
			price	: 5000,
			info	: lanSwitch('Fast-acting psychotropic drugs, takes you fly to heaven','速效精神药物，带你直上天国。'),
			maxOD   : 1,
			withdraw: 20,
			ontake  : function(enemy){
				let drug = V.candyDrug[this.id]
				let pain = 60 * Math.max(1-(drug.taken*0.1), 0.1)
				let trauma = 360 * Math.max(1-(drug.taken*0.1), 0.1)
				let stress = 80 * Math.max(1-(drug.taken*0.1), 0.1)
	
				wikifier('pain', -pain)
				wikifier('trauma', -trauma)
				wikifier('stress', -stress)
	
				getPalam('drunk', 1000)
				getPalam('drugged', 1000)

				wikifier('arousal', 600, 'genital')
				wikifier('hallucinogen', 240)
	
				V.iCandyStats.angelkissTaken = 1
	
				drug.taken++
				V.medicated++
				if(!enemy)
					drug.owned--
			},
			onwake  : function(){
				wikifier('stress', 60)
				wikifier('trauma', 50)
				wikifier('alcohol', 300)
				wikifier('control', -40)
	
				V.iCandyStats.angelkissTaken = 0
			}
		},
	
		//-- 常规道具
		fruitscandy:{
			type	: 'items',
			subType : 'candy',
			id		: 'fruitscandy',
			name	: lanSwitch('Fruits Candy','水果糖'),
			num		: 12,
			price	: 2000,
			info	: lanSwitch("Sweet and sour, give you a little happiness","酸酸甜甜的，提供些许幸福感"),
			onuse	: function(){
				let trauma = random(3, 12)
				wikifier('trauma', -trauma)
	
				V.candyItems[this.id] --
			},
		},
		chocolate:{
			type	: 'items',
			subType : 'candy',
			id		: 'chocolate',
			name	: lanSwitch('Chocolate','巧克力'),
			num		: 3,
			price	: 1600,
			info	: lanSwitch('Sweet chocolate, may relives a little stress for you',"甜甜的巧克力，能缓解些许压力"),
			onuse	: function(){
				let stress = random(1, 3)
				let tiredness = random(60, 100)
				wikifer('stress', -stress)
				wikifier('tiredness', -tiredness)
	
				V.candyItems[this.id] --
			},
		},
		ramune:{
			type	: 'items',
			subType : 'drink',
			id		: 'ramune',
			name	: lanSwitch('Ramune','波子水'),
			num		: 1,
			price	: 800,
			info	: lanSwitch('Cool ramune, recover a bit of stamina',"清爽的波子水，能补充点体力"),
			onuse	: function(){
				let tiredness = random(64, 120)
				wikifier('tiredness', -tiredness)
	
				V.candyItems[this.id] --
			},
		},
		lolipop:{
			type	: 'items',
			subType : 'candy',
			id		: 'lolipop',
			name	: lanSwitch('Lolipop','波板糖'),
			num		: 1,
			price	: 400,
			info	: lanSwitch('Sweet, big lolipop, give you a bit of happiness',"甜甜的大波板糖，提供些许幸福感"),
			onuse	: function(){
				let trauma = random(4, 20)
				wikifer('trauma', trauma)
				V.candyItems[this.id] --
			},
		},
	
		potachips:{
			type	: 'items',
			subType : 'snack',
			id		: "potachips",
			name	: lanSwitch('Potato Chips','薯片'),
			num		: 1,
			price	: 500,
			info	: lanSwitch('Crunchy chips for some hungry','脆脆的薯片，补充些许体力。'),
			onuse	: function(){
				let tiredness = random(50, 100)
				wikifer('tiredness', -tiredness)
	
				V.candyItems[this.id] --
			}
	
		},

		candyfloss:{
			type	: 'items',
			subType : 'candy',
			id		: "candyfloss",
			name	: lanSwitch('Candyfloss','棉花糖'),
			num		: 1,
			price	: 640,
			info	: lanSwitch('Sweet, cloud like candyfloss, give you a bit happiness','甜甜的，云一般的棉花糖，给你点幸福感'),
			onuse	: function(){
				let tiredness = random(30, 80)
				wikifer('tiredness', -tiredness)

				let trauma = random(3, 9)
				wikifier('trauma', trauma)
				
				let stress = random(2, 8)
				wikifer('stress', -stress)
	
				V.candyItems[this.id] --
			}
	
		},
	
		lubricant:{
			type	: 'items',
			subType : 'liquid',
			id		: 'lubricant',
			name	: lanSwitch('Lubricant','润滑油'),
			num		: 200,
			price	: 3000,
			onuse   : function(){
				V.player.bodyliquid.anus.goo += 50
				V.candyItems[this.id] -= 10
			}
		},
		lubricantSP:{
			type	: 'items',
			subType : 'liquid',
			id		: 'lubricantSP',
			name	: lanSwitch('Drugged Lubricant','催情润滑油'),
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

	cv.iCandyStats = {
		modversion: setup.iCandyVersion,
		keepHairs: 't',
		candies: {},
		drugs:{
			take: 0, overdose: 0, addict: 0, withdraw: 0,
		},
		alcohol:{
			drunk: 0, overdrunk: 0, addict: 0, withdraw: 0,
		},

		flags:{
			candy	: {},
			drugs	: { addict: 0, withdraw: 0 },
			alcohol	: { addict: 0, withdraw: 0 },

			angelkisswake: 0,
		},

		angelkissTaken: 0,
	}

	let flaglist = [
		//地点事件flag
		'barbstreet', 'harvestreet', 'chinatown', 
		'brothel', 'pub', 'orphan', 'hospital',
		'repairshop', 'snackshop', 'sewer',
		// 角色事件flag	
		'xinyu', 'robot', 'foxlady', 
		//特殊事件flag记录	
		'mainevent', 'special'
	]
	cv.iCandyStory = {}

	flaglist.forEach((key)=>{
		cv.iCandyStory[key] = {}
	})

	cv.candyDrug = {}
	cv.candyItems = {}

	for(let i in setup.candyDrug){
		let drug = setup.candyDrug[i]

		if(drug.type == 'drugs'){
			cv.candyDrug[i] = {
				taken: 0,
				overdose: 0,
				addict: 0,
				owned: 0,
			}
		}
		else{
			cv.candyItems[i] = 0
		}
	}

	cv.mechaItems = {
		puzzle: 0,
		box: 0,
		robot: 0,
		tool: 0,
		parts: 0,
		robobuild: 0,
	}

	cv.iRobot = {
		name: 'Robert',
		battery: 0,
		humanity: 0,
		condition: 0,
	}

	cv.myApartment = {
		home: false,
		paid: 0,
		nextpayday: 0,
	}

	cv.repairStore = {
		repaired: 0,
		bonus: 0,
		work: 0,
		today: 0,
		workhour: 0,
		staffkey: 0,

		event: 0,
		intro: 0,
	}

	setup.iCandyMod = 'ready'
}

$(document).one('languageChecked', ()=>{
	if(Macro.has('lanSwitch') == false){
		DefineMacroS('lanSwitch', window.lanSwitch)
	}
	setupCandyVar()
	
})


function newBodyWrite(obj){
	let item = {
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

	setup.bodywriting[obj.key] = item
	setup.bodywriting_namebyindex[obj.index] = obj.key

	return item
}

function addBodyWriting(){
	setup.newTattos = [

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
	console.log(setup.newTattos)
}


function updateObj(objname, defaultvar){
	if(V[objname] == undefined){
		V[objname] = defaultvar
	}

	if (typeof V[objname] !== 'object'){
		return
	}

	for (let i in cv[objname] ){
		//添加新增变量到存档
		if(typeof V[objname][i] !== typeof cv[objname][i]){
			V[objname][i] = clone(cv[objname])
		}
		//从存档里删除弃用变量
		else if(V[objname][i] !== undefined && cv[objname] == undefined ){
			delete V[objname][i]
		}
	}
}


function iCandyInit(){
	if(setup.iCandyMod !== 'ready'){
		console.log('等待初始化中')
		setTimeout(()=>{
			console.log('i Candy and Robot 初始化')
			iCandyInit()
		}, 60)
	}

	if(V.iCandyStats && V.iCandyStats.modversion !== setup.iCandyVersion ){
		//更新
		updateObj('iCandyStats', {})
		updateObj('iCandyStory', {})
		updateObj('candyDrug', {})
		updateObj('candyItems', {})
		updateObj('mechaItems', {})
		updateObj('mechanic', 0)
		updateObj('iRobot', {})
		updateObj('natural_lactation', 0)
		updateObj('myApartment', {})
		updateObj('repairStore', {})
	}

	if(!V.iCandyStats){
		//首次初始化
		V.iCandyStats = clone(cv.iCandyStats)
		V.iCandyStory = clone(cv.iCandyStory)
		V.candyDrug = clone(cv.candyDrug)
		V.candyItems = clone(cv.candyItems)
		V.mechaItems = clone(cv.mechaItems)

		V.mechanic = 0
		V.iRobot = clone(cv.iRobot)

		V.natural_lactation = 0
		V.myApartment = clone(cv.myApartment)
		V.repairStore = clone(cv.repairStore)

	}

	return ''
}

DefineMacroS('iCandyInit', iCandyInit)


$(document).one(':storyready',()=>{
	let check = setInterval(()=>{
		if( setup.bodywriting ){
			addBodyWriting()
			clearInterval(check)
		}
	}, 100)
})
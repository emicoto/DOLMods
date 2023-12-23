const modversion = '0.2.0'
setup.iCandyMod = "start"


const addictions = { 
	alcohol:{
		threshold: 3,
		maxOD: 10,
		withdraw: 72,
		clear: 28,
		hours: 0
	},

	drug:{
		threshold: 1,
		maxOD: 8,
		withdraw: 24,
		clear: 28,
		hours: 0,
	},
	nicotine:{
		threshold: 1,
		maxOD: 6,
		withdraw: 36,
		clear: 28,
		hours: 0,
	},

	medicine:{
		threshold: 4,
		maxOD: 12,
		withdraw: 72,
		clear: 7,
		hours: 0,
	},

	riskyDrugs:{
		threshold: 1,
		maxOD: 3,
		withdraw: 24,
		clear: 30,
		hours: 1,
	},

	superDrugs:{
		threshold: 0,
		maxOD: 1,
		withdraw: 12,
		clear: 48,
		hours: 2,
	}
}
setup.addictions = addictions

//各种大小物品的最大堆叠限制
const maxStacks = {
	pill  : 50,
	inject: 10,

	powder: 80,//oz, 1lb=16oz, 1bread = 12oz uses
	micro : 36,
	tiny  : 18,
	small : 9,
	medium: 4,
	big   : 1,
}
setup.maxStacks = maxStacks

/**
 * 状态flag， 用于记录和判断
 */
function drugState(){
	this.taken = 0;				//当天嗑药次数
	this.lastTime = 0;			//上次嗑药时间详细
	this.overdose = 0;			//超量剂次数，也是上瘾倒计时
	this.addict = 0;			//是否上瘾状态
	this.withdraw = 0;			//是否处于戒断状态
	this.clearedTimes = 0;		//戒除次数
	this.efTimer = 0;			//药效到期时间(timeStamp + timer)
}

/**
 * 事件Flag。用于显示反馈文本
 */
function drugFlag(){
	this.addiction = 0;	//上瘾
	this.withdraw = 0;	//戒断
	this.cleared = 0;	//戒除
	this.high = 0;		//上头作用
	this.after = 0;		//下头副作用
	this.daily = 0;		//每日作用
}

/**
 * 额外的敏感度效果
 */
function exSense(type){
	return {
		type: type, //genital, bottom, breast, mouth
		base : 1,	//原生数值，每日结算时自动更新
		add  : 0,	//buff生效期间的变化值
		source:{}, 	//记录BUFF来源，确保每个来源只能有一个BUFF
		init: 0,	//是否已经初始化
	}
}


//--------------------------------------------------------
//
//  Item & Recipe Modules
//
//--------------------------------------------------------
const iPockets = {
	body: [],
	bags: [],
	cart: [],
	hole: [],
	bagtype : 'none',
	carttype: 'none',
	wallettype: 'none',
	
	states:{
		body:'naked',
		bag:'none',
		cart:'none',
		hole:'none',
		wallet:'none',
	},

	event:{
		body:0,
		bag:0,
		cart:0,
		hole:0,
		wallet:0,
	},

	global:{}
}

const iStorage = {
	home	 : {},	//只要在孤儿院就能使用	
	lockers  : {},	//放在储物柜里的物品可以在某些地方使用，如厕所、学校、浴室、妓院等
	warehouse: {},	//放在仓库里的物品用于贩售
	apartment: {},	//只要在出租屋就能使用
	farmbarns: {},	//只要在农场就能使用

	bushes_park:{},
	trashbin_elk:{},
	hideout:{},

	warehouseOwned: 0,
	lockerOwned:{
		school: 1,
		strip_club: 0,
		brothel: 0,
		shopping_centre: 0,
		office_building: 0,
		beach: 0,
	}
}

const Recipe = {
	books:{},
	craft:{},
	cooking:{},
	chemical:{},
	points:0,
}

//--------------------------------------------------------
//
//  robot & mechanical Modules
//
//--------------------------------------------------------
const iRobot = {
	name:"",
	power:0,

	location:"",

	components:{
		condition:{
			current:0,
			currentmax:0,
			basicmax:0,
			damaged:{},
		},
		mainboard:{
			type:"",
			condition:0,
		},
		cpu:{},
		memory:{}, //内存
		storage:{}, //数据储存
		camera:{},
		sensor:{},
		interface:{}, //接口
		hands:{},
		legs:{},
		body:{},
		skin:{},
		genitals:{},
		power:{},//动力炉/质能转换炉/电池……
		back:{},
		extra_0:{},//额外改装槽
		extra_1:{},
		extra_2:{},
	}
}
const iMechStats = {
	toolbox: 0,
	toolset: 0,
	robot: 0,
	robotProcess:0,

	research:{}, //进行中项目
	archived:{}, //已完成项目
	unlocked:{}, //解锁科技	
}


//--------------------------------------------------------
//
//  drug & hunger Modules
//
//--------------------------------------------------------
const iDrugStats = {
	state:{
		general:{
			aphrod	: new drugState(),
			alcohol	: new drugState(),
			nicotine: new drugState()
		},
		drugs : {}
	},
	flags:{
		general:{
			aphrod	: new drugFlag(),
			alcohol	: new drugFlag(),
			nicotine: new drugFlag()
		},
		drugs:{}
	},
}

for(const [Id, iData] of Object.entries(Items.data)){
	if(iData.tags.includes('addiction') && iData.tags.containsAny('nicotine', 'alcohol', 'aphrod') == false ){
		iDrugStats.state.drugs[Id] = new drugState()
		iDrugStats.flags.drugs[Id] = new drugFlag()
	}
	iStorage.home[Id] = 0
}

C.hunger = {
	max : 2000,
	min : 0
}

//--------------------------------------------------------
//
//  event Modules
//
//--------------------------------------------------------
const eventFlags = {}
const flaglist = [
	//地点事件flag
	'barbstreet', 'harvestreet', 'chinatown', 
	'brothel', 'pub', 'orphanage', 'hospital',
	'repairshop', 'snackshop', 'sewer', 'bank',
	'apartment',
	// 角色事件flag	
	'xinyu', 'robot', 'foxlady', 
	//特殊事件flag记录	
	'mainevent', 'special'
]
flaglist.forEach((key)=>{
	eventFlags[key] = {}
})

eventFlags.repairshop = {
	repaired: 0,
	bonus: 0,
	work: 0,
	today: 0,
	workhour: 0,
	staffkey: 0,
}
eventFlags.apartment = {
	owned: 0,
	paid: 0,
	nextPayDay: 0,
}

//--------------------------------------------------------
//
//  main variables
//
//--------------------------------------------------------
const iCandyRobot = {
	version: modversion,

	config:{
		globalStack: 1,
		disableStack: false,
		disablePockets: false,
		keepHairs: true,
	},

	//mechanical module stats
	robot: iRobot,
	mechStats:iMechStats,

	//drugs and hunger module stats
	drugStates : iDrugStats.state,
	drugFlags : iDrugStats.flags,

	extraSense : {
		genital : exSense('genital'),
		bottom	: exSense('bottom'),
		breast	: exSense('breast'),
		mouth 	: exSense('mouth')
	},
	//mod traits
	traits:{},

	//equip effects
	equipEf:{},
	
	bank:{
		money: 0,		//存款
		plan: 'none',	//存款计划
		countDay: 0,	//结算日
		debt: 0,		//债务
		credit: 100,	//借记卡限额
		score: 100,		//信用分
	},

	phone:{
		owned: 0,
		fleeca: 0, //电子支付
		app: [],
		message:[],
		contact: {},
		record:{},
		photos:[],
		controler: 'none'
	},

	//event modules
	flags:eventFlags,
}

const modVariables = {

	//总控
	iCandyRobot,

	//通用变量
	iPockets,
	iStorage,
	iRecipe : Recipe,

	//技能
	chemical	: 0, 
	mechanical	: 0, 
	cooking		: 0,

}

//Mod Data
const iCandy = {
	version : modversion,

	// mod startup config
	config : {
		
	},

	//save variables
	variables : {},

	//settings
	setup: {
		addictions,
		maxStacks,
		tattoos,
	},

	//temporary variables
	temp: {},

	getConfig: function(prop){
		return V.iCandyRobot.config[prop]
	},

	checkStat: function(item){
		const data = Items.get(item)

		if(R.drugStates.drugs[item]){
			return true
		}

		if(data && data.tags.includes('addiction')){
			R.drugStates.drugs[item] = new drugState()
			return true
		}

		return false
	},

	getStat: function(item, prop){
		const general = ['aphrod', 'alcohol', 'nicotine']
		if(general.includes(item)){
			return prop ? R.drugStates.general[item][prop] : R.drugStates.general[item];
		}

		if(this.checkStat(item)){
			return prop ? R.drugStates.drugs[item][prop] : R.drugStates.drugs[item];
		}
	},
	setStat: function(item, prop, value){
		const general = ['aphrod', 'alcohol', 'nicotine']
		if(general.includes(item)){
			R.drugStates.general[item][prop] = value
			return R.drugStates.general[item][prop]
		}
		if(this.checkStat(item)){
			R.drugStates.drugs[item][prop] = value
			return R.drugStates.drugs[item][prop]
		}
	},
	setValue: function(item, prop, value){
		const general = ['aphrod', 'alcohol', 'nicotine']
		if(general.includes(item)){
			R.drugStates.general[item][prop] += value
			return R.drugStates.general[item][prop]
		}

		if(this.checkStat(item)){
			R.drugStates.drugs[item][prop] += value
			return R.drugStates.drugs[item][prop]
		}
	},

	take: function(item, value){
		value = Number(value)
		if(!value) return;

		R.drugStates.general[item].taken += Math.max(Math.floor(value/100+0.5), 1)
		R.drugStates.general[item].lastTime = V.timeStamp
	},

	setFlag: function(item, prop, value){
		const general = ['aphrod', 'alcohol', 'nicotine']
		if(general.includes(item)){
			R.drugFlags.general[item][prop] = value
			return R.drugFlags.general[item][prop]
		}

		if(this.checkStat(item)){
			R.drugFlags.drugs[item][prop] = value
			return R.drugFlags.drugs[item][prop]
		}
	},

	getFlag: function(item, prop){
		const general = ['aphrod', 'alcohol', 'nicotine']
		if(general.includes(item)){
			return prop ? R.drugFlags.general[item][prop] : R.drugFlags.general[item]
		}

		if(this.checkStat(item)){
			return prop ? R.drugFlags.drugs[item][prop] : R.drugFlags.drugs[item]
		}
	},

	setEquipEf(efId){
		if(!R.equipEf[efId]){
			R.equipEf[efId] = 1
			return
		}
		R.equipEf[efId] = Math.min(R.equipEf[efId] + 1, 10)	
	},

	unsetEquipEf(efId){
		R.equipEf[efId] = Math.max(R.equipEf[efId] - 1, 0)
	},

	//记录更新。如果还没进行过初始化，就初始化一下。
	senseBak: function(){
		for( const [type, sens] of Object.entries(R.extraSense)){
			let base = V[type + 'sensitivity']

			if(sens.init == 0){
				sens.init = 1
				sens.base = V[type + 'sensitivity']
			}
			else{
				sens.base = base - sens.add
			}
		}
	},

	//设置感度BUFF来源，如果来源不存在则创建，存在则叠加
	senseSet: function(type, src, value, timer = 0, fade = 0){
		const sens = R.extraSense[type]
		if(!sens) return;

		const { source } = sens

		if(source[src] == undefined){
			source[src] = {
				value: value,
				timer: timer,
				fade: fade,
			}
		}
		else{
			source[src].value += value
			source[src].timer = Math.max(source[src].timer, timer)
		}

		return R.extraSense[type]
	},

	// 统计所有来源的buff，减少各来源的计时器，并更新到buffed, add
	// passtime单位为秒
	// calculate all buffs, reduce timer, update buffed value
	senseUpdate: function(sense, passtime) {
		this.senseBak();

		let add = 0;
		for (const [src, buff] of Object.entries(sense.source)) {
			// 如果计时器为0，且不是持续性buff，就删除这个来源
			// if timer is 0 and not a fade buff, delete this source
			if (buff.timer <= 0 && buff.fade == 0) {
				delete sense.source[src];
				continue;
			}

			// 如果是持续性buff，且数值低于等于0，就删除这个来源
			// if fade buff and value is 0, delete this source
			if (buff.timer <= 0 && buff.fade !== 0 && buff.value <= 0) {
				delete sense.source[src];
				continue;
			}

			// 如果是持续性buff，就先更新数值。
			// if fade buff, update value

			// 药效持续中，获得数值增加
			// the buff is activing, then add value
			if (buff.fade !== 0 && buff.timer > 0) {
				const multiplier = V.combat == 1 ? 0.5 : Math.max(passtime / 60, 1);
				buff.value += buff.fade * multiplier;
			}

			// 药效减退中，数值减少
			// the buff is fading, then reduce value
			if (buff.fade !== 0 && buff.timer <= 0) {
				const multiplier = V.combat == 1 ? 0.1 : Math.max(passtime / 60, 1);
				buff.value -= buff.fade * multiplier;

				//确保数值不会高于或低于0
				//make sure the value is not higher or lower than 0
				if (buff.fade > 0) {
					buff.value = Math.max(buff.value, 0);
				} else {
					buff.value = Math.min(buff.value, 0);
				}
			}

			//集算所有buff的数值
			//calculate all buffs
			add += buff.value;

			buff.timer = Math.max(buff.timer - passtime, 0);
		}

		sense.add = add;
		V[sense.type + 'sensitivity'] = sense.base + sense.add;

		return R.extraSense
	},
}
window.iCandy = iCandy

const tatoos = [
	{
		key:'fifty_whore', 
		name:'£50', 
		special:'prostitution', 
		degree:5000
	},
	{
		key:'drug_eater', 
		name:'Drug Eater', 
		cn:'瘾君子', 
		special:'drugs'
	},
	{
		key:'drug_whore', 
		name:'Drug Whore', 
		cn:'毒娼', 
		special:'prostitution'
	},
	{
		key:'sell_for_drug', 
		name:'Sell body for drugs', 
		cn:'为药卖身', 
		special:'prostitution'
	},
	{
		key:'drug_slut', 
		name:'Drug Slut', 
		cn:'药瘾婊子', 
		special:'drugs'
	}
]
	
setup.modTattoos.push(...tatoos)

//mirror
for(let i in modVariables){
	Object.defineProperty(iCandy.variables, i, {
		get:()=>{ 
			return V[i]
		},
		set:(value)=>{
			V[i] = value
		}
	})
}

Object.defineProperty(window, 'R', {
	get:()=>{
		return V.iCandyRobot
	}
})

function setupFeatsBoost(){
	V.featsBoosts.upgrades = {
		money:0,
		grades:0,
		skulduggery:0,
		dancing:0,
		swimming:0,
		athletics:0,
		tending:0,
		housekeeping:0,
		cooking:0,
		mechanical:0,
		chemical:0,
		greenThumb:0,
		seduction:0,
		purity:0,
		impurity:0,
		newLife:0,
		aNewBestFriend:0,
		tattoos:0,
		defaultMoves: 0,
		randomClothing:0,
		specialClothing:0,
		sexToys:0,
	}

	const { upgradeDetails, missing, name } = V.featsBoosts

	upgradeDetails.grades.cost = 10;
	upgradeDetails.greenThumb.cost = 30;
	
}


function iCRInit(){
	for(let i in modVariables){
		V[i] = modVariables[i]

	}
	setup.iCandyMod = "variable init"
}
DefineMacroS('iCandyInit', iCRInit)

setup.iCandyBakItem = {}
setup.iCandyUpdate = function(){
	if(passage() == 'Start') return;

	if(V.iCandyStats){
		delete V.iCandyStory
		delete V.mechaItems

		delete V.mechanic		
		delete V.iRobot
		delete V.natural_lactation

		delete V.myApartment
		delete V.repairStore

		for(let i in V.candyDrug){
			let item = V.candyDrug[i]
			setup.iCandyBakItem[i] = item.owned
		}

		delete V.candyDrug

		for(let i in V.candyItems){
			setup.iCandyBakItem[i] = V.candyItems[i]
		}

		delete V.candyItems
		delete V.iCandyStats

		iCRInit()
		for(let i in setup.iCandyBakItem){
			let item = setup.iCandyBakItem[i];
			if(item > 0){
				V.iStorage.home[i] = item
			}
		}
	}
	else if(V.iCandyRobot.version !== iCandy.version ){
		V.iCandyRobot = iUtil.updateObj(iCandyRobot, V.iCandyRobot)
		V.iPockets = iUtil.updateObj(iPockets, V.iPockets)
		V.iStorage = iUtil.updateObj(iStorage, V.iStorage)
		V.iRecipe = iUtil.updateObj(iRecipe, V.iRecipe)
	}
}

DefineMacroS('iCandyUpdate', iCandyUpdate)

$(document).one(':storyready',()=>{
	let check2 = setInterval(()=>{
		if( V.featsBoosts ){
			//modifyFeatsBoosts()
			//Engine.play('Start')
			clearInterval(check2)
		}
	}, 100)
})


$(document).on(':passageinit', ()=>{
	T.addMsg = ''; //效果区的显示信息
	T.afterMsg = '';//addAfterMsg区的显示信息
})

$(document).on(':passagedisplay', ()=>{
	if(T.addMsg.length > 2){
		new Wikifier(null, `<<append #addMsg transition>>${T.addMsg}<br><</append>>`)
	}
	if(T.afterMsg.length > 2){
		new Wikifier(null, `<<append #addAfterMsg transition>>${T.afterMsg}<br><</append>>`)
	}
})

//--------------------------------------------
//
//  type and Template
//
//--------------------------------------------
/**
 * 状态flag， 用于记录和判断
 */
function drugState(){
	this.taken = 0;				//当天嗑药次数
	this.lastTime = 0;			//上次嗑药时间详细
	this.overdose = 0;			//超量剂次数，也是上瘾倒计时
	this.addict = 0;			//是否上瘾状态
	this.withdraw = 0;			//是否处于戒断状态
	this.quitTimes = 0;		//戒除次数
	this.efTimer = 0;			//药效到期时间(timeStamp + timer)
	this.process = 0;			//上瘾进度
}

/**
 * 事件Flag。用于显示反馈文本
 */
function drugFlag(){
	this.addiction = 0;	//上瘾
	this.withdraw = 0;	//戒断
	this.quit = 0;	//戒除
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
	held: [],	
	bag: [],
	cart: [],
	hole: [],

	heldtype: 'none',
	bagtype : 'none',
	carttype: 'none',
	wallettype: 'none',
	
	states:{
		body:'naked',
		held:'none',
		bag:'none',
		cart:'none',
		hole:'none',
		wallet:'none',
	},

	event:{
		body:0,
		held:0,
		bag:0,
		cart:0,
		hole:0,
		wallet:0,
	},

	global:{}
}

iPockets.body.push(
	new pocketItem('plasticbag', 1),
	new pocketItem('coinpouch', 1),
)

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
	warehouseCapacity: 1000,
	lockerOwned:{
		school: 1,
		strip_club: 0,
		brothel: 0,
		shopping_centre: 0,
		office_building: 0,
		beach: 0,
	}
}

const vRecipe = {
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
	condition: 0,
	aware: 0,

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
	robot: 0,
	robotProcess:0,

	research:{}, //进行中项目
	archived:{}, //已完成项目
	unlocked:{}, //解锁科技	

	tools:{
		parts: 0,
		wrench: 0,
		hammer: 0,
		screwdriver: 0,
		spanner: 0,
		pliers: 0,
		tweezers: 0,
		cuttingknife: 0,
		weldingtool: 0,
		weldermask: 0,
	}
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
	if(iData.tags.includes('addiction') && iData.tags.containsAny('nicotine', 'alcohol', 'aphrod') == false && !iData.alias ){
		iDrugStats.state.drugs[Id] = new drugState()
		iDrugStats.flags.drugs[Id] = new drugFlag()
	}
}

C.hunger = {
	max : 2000,
	min : 0
}

C.thirst = {
	max : 2000,
	min : 0
}

//--------------------------------------------------------
//
//  event Modules
//
//--------------------------------------------------------
const iEventFlags = {}
let flaglist = [
	//地点事件flag
	'barbs', 'harvest', 'chinatown', 
	'brothel', 'pub', 'orphanage', 'hospital',
	'repairshop', 'snackshop', 'sewer', 'bank',
	'apartment',
	// 角色事件flag	
	'Xinyu', 'robot', 'foxlady', 
	//特殊事件flag记录	
	'mainevent', 'special'
]
flaglist.forEach((key)=>{
	iEventFlags[key] = {}
})

iEventFlags.repairshop = {
	repaired: 0,
	bonus: 0,
	work: 0,
	today: 0,
	workhour: 0,
	staffkey: 0,
}
iEventFlags.apartment = {
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
	version: iCandyModVersion,

	config:{
		globalStack: 1,
		disableStack: false,
		disablePockets: false,
		keepHairs: true,
		shopPriceMult : 1,
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

	discount:{
		daiso: {},
		snackshop: {},
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

	combat: null, //combat variables

	//mod pc states:
	player:{
		sleepy:	0,
		sleepymax: 1000,
		health: 100,
		healthmax: 100,

		healthstate: 'normal',
		ills: [],
	},

	//event modules
	flags:iEventFlags,
}

const vShop = {
	daiso_snack: {
		state: 'none',
		discount: 0,
		stocks: [],
	},
	daiso_drink: {
		state: 'none',
		discount: 0,
		stocks: [],
	},
	daiso_foods: {
		state: 'none',
		discount: 0,
		stocks: [],
	},
	daiso_sundry: {
		state: 'none',
		discount: 0,
		stocks: [],
	},
}

const iModVariables = {
	//总控
	iCandyRobot,

	//通用变量
	iPockets,
	iStorage,
	iRecipe:vRecipe,
	iShop:vShop,

	//技能
	chemical	: 0, 
	mechanical	: 0, 
	cooking		: 0,

	tvar : { //temporary variables
		useItem: null,
		exitPassage: null,
		eventPassage: null,
		img: null,
		scene: {},
		eventnext: null,
	},
}

const iModTattoos = [
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
	
setup.modTattoos.push(...iModTattoos)

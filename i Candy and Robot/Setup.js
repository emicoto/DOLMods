

let cv = setup.iCandyVariable

function iCandyStatus(){

	function addiction(){
		this.taken = 0;
		this.overdose = 0;
		this.addict = 0;
		this.withdrawCoolDown = 0;
		this.clearedTimes = 0;
	}

	function drugsEvent(){
		this.addiction = 0;
		this.withdraw = 0;
		this.cleared = 0;
		this.high = 0;
		this.after = 0;
		this.daily = 0;
	}

	cv.iCandyStats = {
		modversion: setup.iCandyVersion,
		keepHairs: 't',
		general:{
			drugs:new addiction(),
			alcohol:new addiction(),
			nicotine:new addiction(),
		},

		drugs:{},

		adEvents:{
			drugs	: {},
			general : {
				drugs	: new drugsEvent(),
				alcohol	: new drugsEvent(),
				nicotine: new drugsEvent(),
			},
		},

		extraSens:{
			genital:{
				base: 1, //原生数值，在追加值为零时会定期刷新
				add: 0,  //追加值，减少就是负数了
				timer: 0, //生效时间，效果过了后会每小时下降 0.1
			},
			bottom:{
				base: 1, //原生数值，在追加值为零时会定期刷新
				add: 0,  //追加值，减少就是负数了
				timer: 0, //生效时间，效果过了后会每小时下降 0.1
			},
			breast:{
				base: 1, //原生数值，在追加值为零时会定期刷新
				add: 0,  //追加值，减少就是负数了
				timer: 0, //生效时间，效果过了后会每小时下降 0.1
			},
			mouth:{
				base: 1, //原生数值，在追加值为零时会定期刷新
				add: 0,  //追加值，减少就是负数了
				timer: 0, //生效时间，效果过了后会每小时下降 0.1
			}
		},

	}

	const flaglist = [
		//地点事件flag
		'barbstreet', 'harvestreet', 'chinatown', 
		'brothel', 'pub', 'orphanage', 'hospital',
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

	cV.iPockets = {
		body: [],
		bags: [],
		cart: [],
		hole: [],
		bagtype : 'none',
		carttype: 'none',
		wallettype: 'none',
	}


	cv.iStorage = {
		lockers  : {},//放在储物柜里的物品可以在某些地方使用，如厕所、学校、浴室、妓院等
		warehouse: {},//放在仓库里的物品用于贩售
		orphanage: {},//只要在孤儿院就能使用
		apartment: {},//只要在出租屋就能使用
		farmbarns: {},//只要在农场就能使用
		home: {}, //当前安全屋镜像
	
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

	for(let i in Items.data){
		let item = Items.data[i]

		if(item.tags.includes('addiction') && item.tags.containsAny('nicotine', 'alcohol') == false ){
			cv.iCandyStats.drugs[i] = new addiction()
			cv.iCandyStats.adEvents.drugs[i] = new drugsEvent()
		}
		cv.iStorage.orphanage[i] = 0
	}

	cv.mechaItems = {
		puzzle: 0,
		box: 0,
		robot: 0,
		tool: 0,
		parts: 0,
	}

	cv.iRobot = {
		name: 'Robert',
		battery: 0,
		humanity: 0,
		condition: 0,
		build: 0,
	}

	cv.myApartment = {
		owned: 0,
		paid: 0,
		nextPayDay: 0,
	}

	cv.iBank = {
		money: 0,
		plan: 'none',
		nextCountDay: 0,
		debt: 0,
		credit: 100
	}

	cv.iPhone = {
		owned: 0,
		venmo: 0,
		app: [],
		contact: {},
		record:{},
		photos:[],
		controler: 'none'
	}

	cv.repairStore = {
		repaired: 0,
		bonus: 0,
		work: 0,
		today: 0,
		workhour: 0,
		staffkey: 0,
	}

	C.hunger = {
		max:2000,
		min:0
	}

	cv.chemistry = 0
	cv.mechanic = 0

	setup.iCandyMod = 'variable ready'
}


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

function updateItemObj(){
	for(let i in Items.data){
		if(V.candyDrug[i]?.owned > 0){
			V.iStorage.homeItems[i] = V.candyDrug[i].owned
			delete V.candyDrug[i].owned
		}
		else if(V.candyItems[i]){
			V.iStorage.homeItems[i] = V.candyItems[i]
		}
		else{
			V.iStorage.homeItems[i] = 0
		}
	}

	delete V.candyItems

	for(let i in cv.candyDrug){
		if(typeof cv.candyDrug[i] !== V.candyDrug[i]){
			V.candyDrug[i] = clone(cv.candyDrug[i])
		}
		else if(typeof V.candyDrug[i].clearedTimes == 'undefined'){
			let oldata = V.candyDrug[i]
			V.candyDrug[i] = {
				taken: oldata.taken,
				overdose: oldata.overdose,
				addict: oldata.addict,
				withdrawCoolDown: 0, //戒断倒计时，按小时算。
				clearedTimes: 0, //戒除的次数，根据药物强度，每次戒除后，下次染上毒瘾需求的戒断日+1/+3
			}
		}
	}
}

function iCandyUpdate(){
	if(V.iCandyStats?.modversion !== setup.iCandyVersion ){
		//更新
		updateObj('iCandyStats', {})
		updateObj('iCandyStory', {})
		updateItemObj()
		updateObj('mechaItems', {})
		updateObj('mechanic', 0)
		updateObj('chemical', 0)
		updateObj('iRobot', {})
		updateObj('natural_lactation', 0)
		updateObj('myApartment', {})
		updateObj('repairStore', {})
	}
}
DefineMacroS('iCandyUpdate', iCandyUpdate)


$(document).one(':storyready',()=>{
	let check = setInterval(()=>{
		if( setup.bodywriting ){
			addBodyWriting()
			clearInterval(check)
		}
	}, 100)

	let check2 = setInterval(()=>{
		if( V.featsBoosts ){
			//modifyFeatsBoosts()
			//Engine.play('Start')
			clearInterval(check2)
		}
	}, 100)
})
//Mod Data
const iCandy = {
	version : iCandyModVersion,
	author:"Lune",

	// mod startup config
	config : {
		
	},

	//save variables
	variables : {},

	//settings
	setup: {
		addictions:iModAddictions,
		maxStacks: iModMaxStacks,
		tattoos: iModTattoos,
		drugConfig: iModDrugConfig,
	},

	//temporary variables
	temp: {},

	//mod functions
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
		const data = setup.addictions[item]

		R.drugStates.general[item].taken += Math.max(Math.floor(value/100+0.5), 1)
		R.drugStates.general[item].lastTime = V.timeStamp

		if(R.drugStates.general[item].taken > data.threshold){
			R.drugStates.general[item].overdose ++
		}
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

Object.defineProperty(window, 'iCandy', { get:()=>{ return iCandy } })

//mirror
for(let i in iModVariables){
	Object.defineProperty(iCandy.variables, i, {
		get:()=>{ 
			return V[i]
		},
		set:(value)=>{
			V[i] = value
		}
	})
}

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


function iCandyInit(){
	for(let i in iModVariables){
		V[i] = clone(iModVariables[i])

	}
	setup.iCandyMod = "variable init"
	Items.init()
}
DefineMacroS('iCandyInit', iCandyInit)

setup.iCandyBakItem = {}
function iCandyUpdate(){
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

		iCandyInit()
		for(let i in setup.iCandyBakItem){
			let item = setup.iCandyBakItem[i];
			if(item > 0){
				V.iStorage.home[i] = item
			}
		}
	}
	else if(!V.iCandyRobot){
		iCandyInit()
	}
	else if(V.iCandyRobot.version !== iCandy.version ){
		V.iCandyRobot = iUtil.updateObj(iCandyRobot, V.iCandyRobot)
		V.iPockets = iUtil.updateObj(iPockets, V.iPockets)
		V.iStorage = iUtil.updateObj(iStorage, V.iStorage)
		V.iRecipe = iUtil.updateObj(iRecipe, V.iRecipe)
	}
}
iCandy.modUpdate = iCandyUpdate
DefineMacroS('iCandyUpdate', iCandyUpdate)

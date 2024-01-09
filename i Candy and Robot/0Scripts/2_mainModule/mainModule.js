//Mod Data
const iCandy = {
	version : iCandyModVersion,
	author:"Lune",

	// mod startup config
	config : {
		
	},

	//save variables
	variables : {},

	//variables setting
	valueSetting: iModVariables,

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
			R.drugStates.general[item][prop] = value
			return R.drugStates.general[item][prop]
		}

		if(this.checkStat(item)){
			R.drugStates.drugs[item][prop] = value
			return R.drugStates.drugs[item][prop]
		}
	},

	addValue: function(item, prop, value){
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

	senseGet: function(type, src){
		const sens = R.extraSense[type]
		if(!sens || !sens.source[src]) return;

		return sens.source[src]
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

			// 如果是持续性buff，且数值等于0，就删除这个来源
			// if fade buff and value is 0, delete this source
			if (buff.timer <= 0 && buff.fade !== 0 && buff.value == 0) {
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
				const multiplier = V.combat == 1 ? 0.2 : Math.max(passtime / 60, 1);
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

function destination(){
    if(V.bus == 'sea') return '<<seamovequick>><br><br>'
	if(V.bus == 'lakebus') return '<<lakequick>><br><br>'

    if(Macro.has(V.bus+'quick'))
        return `<<${V.bus}quick>><br><br>`
    else
        return '<<harvestquick>><br><br>'
}

function destinationeventend(){
	if(V.bus == 'sea') return '<<seamoveeventend>><br><br>'
	if(V.bus == 'lakebus') return '<<lakeeventend>><br><br>'
	if(Macro.has(V.bus+'eventend'))
		return `<<${V.bus}eventend>><br><br>`
	else
		return '<<harvesteventend>><br><br>'
}

function iCandyInit(){
	console.log('on iCandyInit')

	for(let i in iModVariables){
		V[i] = clone(iModVariables[i])
	}

	setup.iCandyMod = "ready"
	if(V.passage == 'Start'){
		Items.init()
	}
	for(const [key, datas] of Object.entries(iEvent.data)){
		datas.sort((a, b)=>{ b.priority - a.priority })
	}

	if(Macro.has('destination')){
		Macro.delete('destination')
		DefineMacroS('destination', destination)
	}
	if(Macro.has('destinationeventend')){
		Macro.delete('destinationeventend')
		DefineMacroS('destinationeventend', destinationeventend)
	}
}
DefineMacroS('iCandyInit', iCandyInit)


function iCandyOldInit(){
	console.log('on iCandyOldInit')

	for(let i in iModVariables){
		V[i] = clone(iModVariables[i])
	}
}
iCandy.manualInit = iCandyOldInit

function iCandyUpdate(){
	if(passage() == 'Start' && V.iCandyRobot) return;

	if(V.iCandyStats){
		delete V.iCandyStory
		delete V.mechaItems
		delete V.mechanic		
		delete V.iRobot
		delete V.natural_lactation
		delete V.myApartment
		delete V.repairStore
		delete V.candyDrug
		delete V.candyItems
		delete V.iCandyStats

		iCandyInit()
	}
	else if(!V.iCandyRobot){
		iCandyInit()
	}
	else if(V.iCandyRobot.version !== iCandy.version ){

		for(let i in iModVariables){
			if(V[i] == undefined){
				V[i] = clone(iModVariables[i])
			}
			else{
				V[i] = F.updateObj(iModVariables[i], V[i])
			}
		}

		//重新初始化仓库，如果是旧版本数据
		if(typeof V.iStorage.home.serotonin == 'number'){
			V.iStorage.home = {}
		}

		//修复药效时间错误
		let drugsStat = V.iCandyRobot.drugStates.drugs
		for( const [drug, data] of Object.entries(drugsStat)){
			const itemdata = Items.get(drug)
			let validTimer = itemdata.hours * 3600 + V.timeStamp

			if(data.efTimer > validTimer){
				console.log('drug timer update:', drug, data.efTimer, validTimer)
				data.efTimer = validTimer
			}

			if(data.lastTime > V.timeStamp){
				console.log('drug lasttime update:', drug, data.lastTime, V.timeStamp)
				data.lastTime = V.timeStamp
			}
		}

		//修复物品错误
		for( const [pos, pocket] of Object.entries(V.iPockets)){
			if(Array.isArray(pocket)){
				pocket.forEach((item, index)=>{
					if(!Items.get(item.id)){
						if(item.id == 'redbull'){
							item.id = 'redcow'
						}
						else if(!Items.get(item.id)){
							pocket.slice(index, 1)
						}
					}
				})
			}
		}

		//修正商店物品
		for( const [key, shelf] of Object.entries(V.iShop)){
			if(!shelf || !shelf?.state || !shelf.stocks.length == 0 ){
				iShop.initShelf(key)
				iShop.getshelf(key)
			}
			else if(shelf.state == 'stocked'){
				shelf.stocks.forEach( (item, key) => {
					const data = Items.get(item.id)
					if(!data){
						console.log('item not found:', item.id)
						shelf.stocks.deleteAt(key)
					}
				})
			}
		}

		//将旧版装备数据转换为新版
		for( const [key, value] of Object.entries(V.iPockets)){
			if(key.has('type')){
				const k = key.replace('type', '')
				V.iPockets.equip[k] = value
				delete V.iPockets[key]
			}
		}
	}
}
iCandy.modUpdate = iCandyUpdate
DefineMacroS('iCandyUpdate', iCandyUpdate)


function fixDrugEffect(){
	for(let id in R.drugStates.drugs){
		const drug = R.drugStates.drugs[id]
		if(drug.lastTime > 0 && drug.lastTime > V.timeStamp){
			drug.lastTime = V.timeStamp
		}
		drug.efTimer = 0;
	}
}

iCandy.fixDrugEffect = fixDrugEffect;
const plants = {
	"apple": [
		"Apple",
		"苹果",
		'Apples'
	],
	"baby_bottle_of_breast_milk": [
		"Baby bottle of breast milk",
		"小瓶装母乳",
		"Baby bottles of breast milk"
	],
	"banana": [
		"Banana",
		"香蕉",
		'Bananas'
	],
	"bird_egg": [
		"Bird Egg",
		"鸟蛋",
		'Bird Eggs'
	],
	"blackberry": [
		"Blackberry",
		"黑莓",
		'Blackberries'
	],
	"blood_lemon": [
		"Blood Lemon",
		"血柠",
		'Blood Lemons'
	],
	"bottle_of_breast_milk": [
		"Bottle of Breast Milk",
		"瓶装母乳",
		'Bottles of Breast Milk'
	],
	"bottle_of_milk": [
		"Bottle of Milk",
		"瓶装牛奶",
		'Bottles of Milk'
	],
	"bottle_of_semen": [
		"Bottle of Semen",
		"瓶装精液",
		'Bottles of Semen'
	],
	"broccoli": [
		"Broccoli",
		"西兰花",
		'Braccolis'
	],
	"cabbage": [
		"Cabbage",
		"卷心菜",
		'Cabbages'
	],
	"carnation": [
		"Carnation",
		"康乃馨",
		'Carnations'
	],
	"chicken_egg": [
		"Chicken Egg",
		"鸡蛋",
		'Chicken Eggs',
	],
	"daisy": [
		"Daisy",
		"雏菊",
		'Daisies'
	],
	"garlic_bulb": [
		"Garlic Bulb",
		"大蒜",
		'Garlic Bulbs'
	],
	"ghostshroom": [
		"Ghostshroom",
		"幽灵菇",
		'Ghostshrooms'
	],
	"lemon": [
		"Lemon",
		"柠檬",
		'Lemons'
	],
	"lily": [
		"Lily",
		"百合",
		'Lilies'
	],
	"lotus": [
		"Lotus",
		"睡莲",
		'Lotuses'
	],
	"mushroom": [
		"Mushroom",
		"普通蘑菇",
		'Mushrooms'
	],
	"onion": [
		"Onion",
		"洋葱",
		'Onions'
	],
	"orange": [
		"Orange",
		"橘子",
		'Oranges'
	],
	"orchid": [
		"Orchid",
		"兰花",
		'Orchids'
	],
	"peach": [
		"Peach",
		"桃子",
		'Peaches'
	],
	"pear": [
		"Pear",
		"梨",
		'Pears'
	],
	"plum": [
		"Plum",
		"李子",
		'Plums'
	],
	"plumeria": [
		"Plumeria",
		"鸡蛋花",
		'Plumerias'
	],
	"poppy": [
		"Poppy",
		"罂粟",
		'Poppies'
	],
	"potato": [
		"Potato",
		"马铃薯",
		'Potatoes'
	],
	"red_rose": [
		"Red Rose",
		"红玫瑰",
		'Red Roses'
	],
	"strange_flower": [
		"Strange Flower",
		"诡异的花",
		'Strange Flowers'
	],
	"strawberry": [
		"Strawberry",
		"草莓",
		'Strawberries'
	],
	"truffle": [
		"Truffle",
		"松露",
		'Truffles'
	],
	"tulip": [
		"Tulip",
		"郁金香",
		'Tulips'
	],
	"turnip": [
		"Turnip",
		"萝卜",
		'Turnips'
	],
	"white_rose": [
		"White Rose",
		"白玫瑰",
		'White Roses'
	],
	"wild_carrot": [
		"Wild Carrot",
		"胡萝卜",
		'Wild Carrots'
	],
	"wild_honeycomb": [
		"Wild Honeycomb",
		"野蜂巢",
		'Wild honeycombs'
	],
	"wolfshroom": [
		"Wolfshroom",
		"狼菇",
		'Wolfshrooms'
	]
}

function setupVanillaItems() {
	for (let i in setup.plants) {
		let plant = setup.plants[i]

		let item = Items.add('tending', plant.name, plants[plant.name], plant.plant_cost)
		let hunger = {
			fruit: 20,
			vegetable: 30,
			produce: 15
		}

		let size = {
			fruit: 'medium',
			flower: 'tiny',
			vegetable: 'small',
			shroom: 'small',
		}

		if (size[item.type]) {
			item.set('size', size[item.type])
		}
		else if (item.special.includes('small') || item.name.includes('egg')) {
			item.set('size', 'small')
		}

		if (item.type == 'fruit' || item.type == 'vegetable') {
			item.Tags('dol', 'food')
				.Effects(['hunger', hunger[item.type]])
		}
		else if (item.name.includes('bottle') || item.name.includes('Bottle')) {
			item.Tags('dol', 'drink', 'production')
				.Effects(['hunger', 10])
		}
		else {
			item.Tags('dol', 'production')
		}
	}

	const spray = {
		type: "items",
		id: "spray",
		name: ["Pepper Spray", "防狼喷雾"],
		num: 1,
		price: 1000,
		size: "big",
		tags: ["spray", "dol"],
		usage: 1,
		info: [
			"A spray made from chili pepper, is incredible effective",
			"用辣椒水制成的防狼喷雾，效果拔群。",
		],
	}

	Items.set(spray)
}

class Items {
	static data = {};
	/**
	 * 添加完整的物品OBJ
	 * @param {Items} obj 
	 * @returns {Items}
	 */
	static set(obj) {
		const { type, id, name } = obj
		if (this.data[id] !== undefined) {
			throw new Error('item already exist:', id)
		}

		const _data = new Items(type, id, name)
		for (let i in obj) {
			_data[i] = obj[i]
		}
		this.data[id] = _data

		return this.data[id]
	}

	/**
	 * 添加物品
	 * @param {string} type 
	 * @param {string} id 
	 * @param {[string, string]} name 
	 * @returns {Items}
	 */
	static add(type, id, name, ...args) {
		if (this.data[id] !== undefined) {
			throw new Error('item already exist:', id)
		}

		const [price, num, size] = args
		const _data = new Items(type, id, name, price, num, size)
		this.data[id] = _data
		return this.data[id]
	}

	/**
	 * 批量添加物品
	 * @param {Array<Items>} items 
	 */
	static addItems(items, defaultType) {
		items.forEach((item) => {
			const { type, id, name, price, num, size } = item
			if (this.data[id] !== undefined) {
				throw new Error('item already exist:', id)
			}

			const _data = new Items( type ?? defaultType, id, name, price, num, size)
			for (let i in item) {
				_data[i] = item[i]
			}
			this.data[item.id] = _data;
		})
	}

	/**
	 * 获取物品或物品内的某个值，不存在的话会返回undefined
	 * @param {string} id 
	 * @param {string} prop 
	 * @returns {Items | void}
	 */
	static get(id, prop) {
		let data = this.data[id]
		if (!data) {
			console.error('no such item:', id)
			return
		}
		if (prop && !data[prop]) {
			console.error('no such props from item:', id, prop)
			return
		}

		if (prop) return data[prop]
		else return data
	}
	/**
	 * 根据类别筛选物品
	 * @param {string} type 
	 * @returns {Array<[string, Items]>}
	 */
	static searchType(type) {
		const database = Object.entries(this.data)
		return database.filter(([key, item]) => item.type == type)
	}

	/**
	 * 根据标签（全部）筛选物品
	 * @param {string} tag 
	 * @returns {Array<[string, Items]>}
	 */
	static searchTag(...tag) {
		const database = Object.entries(this.data)
		return database.filter(([key, item]) => item.tags.containsAll(...tag))
	}

	/**
	 * 同时根据物品分类 以及 标签（所选标签任意一个）筛选物品
	 * @param {string} type;
	 * @param {string[]} tags;
	 * @returns { Array<[string, Items]> }
	 */
	static search(type, ...tags) {
		const database = Object.entries(this.data)
		return database.filter(([key, item]) => item.type == type && item.tag.containsAny(...tags))
	}

	/**
	 * 初始化游戏物品
	 */
	static init = setupVanillaItems
	/**
	 * 构造新物品
	 * @param {string} type 
	 * @param {string} id 
	 * @param {[string, string, string?]} name 
	 * @param {number} price 
	 * @param {number} num 
	 */
	constructor(type, id, name, price = 500, num = 1, size = 'big') {
		this.type = type
		this.id = id

		if (name.length == 3) {
			this.plural = name.pop()
			this.name = name
		}
		else {
			this.name = name
		}

		this.num = num
		this.price = price
		this.size = size
		this.tags = []
		this.usage = 1
		this.img = `${type}/${id}.png`

		this.imgdiff = {}
	}

	/**
	 * 获取对应的值
	 * @param {string} prop 
	 * @param {number} val 
	 * @returns
	 */
	get(prop, val) {
		if (!this[prop]) {
			this[prop] = val
		}
		return this[prop]
	}
	/**
	 * 更新或设置对应的值
	 * @param {string} prop 
	 * @param {number} val 
	 * @returns {Items}
	 */
	set(prop, val) {
		this[prop] = val
		return this
	}
	/**
	 * 一键设置药丸
	 * @returns {Items}
	 */
	isPill() {
		this.tags.push('pill')
		this.size = 'pill'
		return this
	}

	/**
	 * 一键设置针剂
	 * @returns {Items}
	 */
	isInject() {
		this.tags.push('inject')
		this.size = 'inject'
		return this
	}

	/**
	 * 设置物品说明
	 * @returns {Items}
	 */
	Info(EN, CN) {
		this.info = [EN ?? CN, CN ?? EN]
		return this
	}

	/**
	 * 设置上瘾相关各数值
	 * @param {number} threshold 安全剂量
	 * @param {number} maxOD 短期内多少嗑多少上瘾
	 * @param {number} withdraw 引起戒断反应所需时间（小时）
	 * @param {number} clear 彻底戒断所需日数
	 * @param {number} hours 起效时长（小时）
	 * @returns 
	 */
	Addiction({ threshold = 1, maxOD = 5, withdraw = 3 * 24, clear = 7, hours = 1 }) {
		this.threshold = threshold
		this.maxOD = maxOD
		this.withdraw = withdraw
		this.clear = clear
		this.hours = hours
		return this
	}

	/**
	 * 使用时的常规效果
	 * @param  {Array<[string, number]|[string, number, 'p']>} effects 
	 * @returns 
	 */
	Effects(...effects) {
		this.effects = effects
		return this
	}

	/**
	 * 使用时的特殊效果
	 * @param {function} callback 
	 * @returns 
	 */
	useEffect(callback) {
		this.onUse = callback
		return this
	}

	/**
	 * 设置每日效果
	 * @param {function} callback 
	 * @returns 
	 */
	dayEffect(callback) {
		this.onDay = callback
		return this
	}

	/**
	 * 设置戒断反应
	 * @param {function} callback 
	 * @returns 
	 */
	Withdraw(callback) {
		this.onWithdraw = callback
		return this
	}

	/**
	 * 药效起作用时的持续效果
	 * @param {function} callback 
	 * @returns 
	 */
	High(callback) {
		this.onHigh = callback
		return this
	}

	/**
	 * 药效失效时的副作用效果
	 * @param {funciton} callback 
	 * @returns 
	 */
	After(callback) {
		this.onAfter = callback
		return this
	}

	/**
	 * 设置标签
	 * @param  {string[]} tags 
	 * @returns 
	 */
	Tags(...tags) {
		this.tags.push(...tags)
		//去重
		this.tags = Array.from(new Set(this.tags))
		return this
	}

	/**
	 * 通用的使用效果处理
	 * @param {string} param 
	 * @param {number} value 
	 * @param {'p'|void} method 
	 */
	doDelta(param, value, method) {
		if (param == 'drugs') {
			iUtil.getPalam('drugged', value)
		}
		else if (param == 'alcohol') {
			iUtil.getPalam('drunk', value)
		}
		else {
			if (method == 'p') wikifier(param, value, param == 'arousal' ? 'genital' : null);
			else wikifier(param, -value);
		}
	}
}

class iRecipe {
	static data = {};

	/**
	 * 添加配方
	 * @param {string} id 
	 * @param {number} time 
	 * @param  {Array<[string, number]>} args 
	 * @returns 
	 */
	static add(id, time = 10, ...args) {
		if (this.data[id] !== undefined) {
			throw new Error('recipe already exist:', id)
		}
		const _data = new iRecipe(id, time, ...args)
		this.data[id] = _data
		return this.data[id]
	}

	/**
	 * 作为Obj添加
	 * @param {iRecipe} obj 
	 * @returns 
	 */
	static set(obj) {
		const { id, time, recipe } = obj
		if (this.data[id] !== undefined) {
			throw new Error('recipe already exist:', id)
		}

		this.data[id] = new iRecipe(id, time, ...recipe)
		for (let i in obj[i]) {
			this.data[i] = obj[i]
		}

		return this.data[id]
	}

	/**
	 * 批量添加
	 * @param {Array<iRecipe>} recipes 
	 */
	static addRecipes(recipes) {
		recipes.forEach((data) => {
			const { id, time, recipe } = data
			if (this.data[id] !== undefined) {
				throw new Error('recipe already exist:', id)
			}

			const _data = new iRecipe(id, time, ...recipe)

			for (let i in data) {
				_data = data[i];
			}
			this.data[id] = _data
		})
	}
	/**
	 * 根据产出物和合成方法搜索配方
	 * @param {string} production 
	 * @param {boolean|1} nocheck 
	 * @returns { Array<[ string, iRecipe ]> }
	 */
	static search(itemId, method, nocheck) {
		const database = Object.entries(this.data);

		if (!nocheck) {
			return database.filter(([key, data]) => {
				return data.production == itemId && data.methods.includes(method) && (!data.lock || (data.lock && data.requirement()))
			})
		}
		else {
			return database.filter(([key, data]) => {
				return data.production == itemId && data.methods.includes(method)
			})
		}

	}
	/**
	 * 根据合成方法搜索配方
	 * @param {string} method 
	 * @param {boolean|1} nocheck 
	 * @returns { Array<[ string, iRecipe ]> }
	 */
	static searchMethod(method, nocheck) {
		const database = Object.entries(this.data);

		if (!nocheck) {
			return database.filter(([key, data]) => {
				return data.methods.includes(method) && (!data.lock || (data.lock && data.requirement()))
			})
		}
		else {
			return database.filter(([key, data]) => {
				return data.methods.includes(method)
			})
		}
	}
	/**
	 * 根据物品Id搜索配方
	 * @param {string} itemId 
	 * @param {boolean|1} nocheck 
	 * @returns { Array<[ string, iRecipe ]> }
	 */
	static searchItem(itemId, nocheck) {
		const database = Object.entries(this.data);

		if (!nocheck) {
			return database.filter(([key, data]) => {
				return data.production == itemId && (!data.lock || (data.lock && data.requirement()))
			})
		}
		else {
			return database.filter(([key, data]) => {
				return data.production == itemId
			})
		}
	}

	/**
	 * @param {string} id 
	 * @param {number} time 
	 * @param  {Array<[string, number]>} args 
	 */

	constructor(id, time = 10, ...args) {
		this.id = id;
		this.production = id;
		this.givenum = 1;
		this.time = time;
		this.recipe = args;
		this.methods = ['craft'];

		/*
		this.difficult = 100
		this.skill = 'craft'
		this.lock = true/false
		this.requirement = ()=>{return V.iRecipe[id] !== undefined }
		this.failproduction = itemId
		this.failnum = 1
		this.onSucces = callback
		this.onFail = callback
		this.customtext = {
			onCraft:['', ''],
			onSucces:['', ''],
			onFail:['', '']
		}

	*/
	}

	/**
	 * 设置制作难度
	 * @param {string} skill 
	 * @param {number} difficulty 
	 * @returns {iRecipe}
	 */
	Difficulty(skill, difficulty) {
		this.skill = skill;
		this.difficulty = difficulty
		return this
	}

	/**
	 * 设置解锁需要的条件(function)
	 * @param {funciton} callback
	 * @returns { iRecipe}
	 */
	Unlock(callback) {
		this.lock = true
		this.unlock = callback
		return this
	}
	/**
	 * 设置副产品
	 * @param {string} itemId 
	 * @param {number} num 
	 * @param {number} rate 获得副产品的概率
	 * @returns {iRecipe}
	 */
	SubProduction(itemId, num = 1, rate = 80) {
		this.subItem = [itemId, num]
		this.subItemRate = rate
		return this
	}

	/**
	 * 设置失败产品
	 * @param {string} itemId 
	 * @param {number} num 
	 * @returns {iRecipe}
	 */
	FailedItem(itemId, num = 1, rate = 100) {
		this.failedItem = [itemId, num]
		this.failedItemRate = rate
		return this
	}

	CustomText(situation, textEN, textCN) {
		if (this.customText) {
			this.customText = {}
		}
		this.customText[situation] = [textEN, textCN]
		return this
	}

	SuccesEffect(callback) {
		this.onSucces = callback
		return this
	}

	FailedEffect(callback) {
		this.onFailed = callback
		return this
	}

}

//数组和对象在DOL内部传递有蜜汁错误。所以从背包里传递过来的，是具体位置信息。
function useItems(pocket, pos){
	let item = V.iPockets[pocket][pos]
	let data = Items.get(item.id)

	if(data?.effects.length > 0 && typeof data.onUse !== 'function'){
		data.effects.forEach((set)=>{
			let [param, value, method] = set;

			if(this.type == 'drugs' || this.type == 'medicine'){
				let { taken } = V.candyDrug[this.id]
				value = value * Math.max(1-(taken*0.1), 0.2)
			}

			data.doDelta(param, value, method);
		})
	}
	else if(typeof data.onUse == 'function'){
		data.onUse()
	}

	item.count -= data.usage

	if(item.count <= 0){
		pocket.deleteAt(pos)
	}
}

window.useItems = useItems
DefineMacroS('useItem', useItem)
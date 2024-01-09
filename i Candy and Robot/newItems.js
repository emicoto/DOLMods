class Items {
	static data = {};
	/**
	 * 添加完整的物品OBJ
	 * add a complete item object
	 * @param {Items} obj 
	 * @returns {Items}
	 */
	static set(obj) {
		const { type, id, name } = obj
		if (this.data[id] !== undefined) {
			throw new Error('item already exist:'+ id)
		}

		const _data = new Items(type, id, name)
		Object.assign(_data, obj)
		this.data[id] = _data

		return this.data[id]
	}

	/**
	 * 添加物品
	 * add an item
	 * @param {string} type 
	 * @param {string} id 
	 * @param {[string, string]} name 
	 * @returns {Items}
	 */
	static add(type, id, name, ...args) {
		if (this.data[id] !== undefined) {
			throw new Error('item already exist:'+ id)
		}

		const [price, num, size] = args
		const _data = new Items(type, id, name, price, num, size)
		this.data[id] = _data
		return this.data[id]
	}

	/**
	 * 批量添加物品
	 * batch add items
	 * @param {Array<Items>} items 
	 */
	static addItems(items, defaultType) {
		items.forEach((item) => {
			const { type, id, name, price, num, size } = item
			if (this.data[id] !== undefined) {
				throw new Error('item already exist:'+ id)
			}

			const _data = new Items( type ?? defaultType, id, name, price, num, size)
			Object.assign(_data, item)
			this.data[item.id] = _data;
		})
	}

	/**
	 * 获取物品或物品内的某个值，不存在的话会返回undefined
	 * get an item or a value of an item, return undefined if not exist
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
	 * search items by type
	 * @param {string} type 
	 * @returns {Array<[string, Items]>}
	 */
	static searchType(type) {
		const database = Object.entries(this.data)
		return database.filter(([key, item]) => item.type == type).map( item => item[1] )
	}

	/**
	 * 根据标签（全部）筛选物品
	 * search items by tags (all)
	 * @param {string} tag 
	 * @returns {Array<[string, Items]>}
	 */
	static searchTag(...tag) {
		const database = Object.entries(this.data)
		return database.filter(([key, item]) => item.tags.containsAll(...tag)).map( item => item[1] )
	}

	/**
	 * 同时根据物品分类 以及 标签（所选标签任意一个）筛选物品
	 * search items by type and tags (any or all)
	 * @param {string} type 物品的分类 the type of items
	 * @param { 'and' | 'or' } andor 需要匹配所有标签还是任一标签 need to match all tags or any tag
	 * @param {string[]} tags 标签（可多选） tags (can select multiple)
	 * @returns { Array<[string, Items]> }
	 */
	static search(type, andor, ...tags) {
		const database = Object.entries(this.data)
		if(andor == 'and'){
			return database.filter(([key, item]) => item.type == type && item.tags.containsAll(...tags)).map( item => item[1] )
		}
		else{
			return database.filter(([key, item]) => item.type == type && item.tags.containsAny(...tags)).map( item => item[1] )
		}
	}

	/**
	 * 初始化游戏物品
	 * init vanilla game items
	 */
	static init = iModSetupDoLItems
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
		this.effects = []
		this.usage = 1
		this.img = `img/items/${type}/${id}.png`
        
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
	 * 设置物品说明
	 * @returns {Items}
	 */
	Info(EN, CN) {
		this.info = [EN ?? CN, CN ?? EN]
		return this
	}

	/**
	 * 设置上瘾相关各数值
	 * set addiction values
	 * @param {number} threshold 安全剂量 safe dosage
	 * @param {number} maxOD 短期内多少嗑多少上瘾 short term overdose
	 * @param {number} withdraw 引起戒断反应所需时间（小时） time to cause withdraw reaction
	 * @param {number} quit 彻底戒断所需日数 time to quit
	 * @param {number} hours 起效时长（小时） duration of effect
	 * @returns 
	 */
	Addiction({ threshold = 1, maxOD = 5, withdraw = 3 * 24, quit = 7, hours = 1 }) {
		this.threshold = threshold
		this.maxOD = maxOD
		this.withdraw = withdraw
		this.quit = quit
		this.hours = hours
		return this
	}

	/**
	 * 使用时的常规效果
	 * the effects when used
	 * @param  {Array<[string, number]|[string, number, 'p']>} effects 
	 * @returns 
	 */
	Effects(...effects) {
		this.effects = effects
		return this
	}

	/**
	 * 使用时的特殊效果
	 * the special effects when used
	 * @param {function} callback 
	 * @returns 
	 */
	useEffect(callback) {
		this.onUse = callback
		return this
	}

	/**
	 * 设置每日效果
	 * set the daily effect
	 * @param {function} callback 
	 * @returns 
	 */
	dayEffect(callback) {
		this.onDay = callback
		return this
	}

	/**
	 * 设置戒断反应
	 * set the withdraw effect
	 * @param {function} callback 
	 * @returns 
	 */
	Withdraw(callback) {
		this.onWithdraw = callback
		return this
	}

	/**
	 * 药效起作用时的持续效果
	 * set the effect when the drug on high
	 * @param {function} callback 
	 * @returns 
	 */
	High(callback) {
		this.onHigh = callback
		return this
	}

	/**
	 * 药效失效时的副作用效果
	 * set the effect when the drug on low
	 * @param {funciton} callback 
	 * @returns 
	 */
	Wake(callback) {
		this.onWake = callback
		return this
	}

	/**
	 * 设置标签
	 * set tags
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
	 * 
	 * @param {string} param 
	 * @param {number} value 
	 */
	getPalam(param, value){
		let list = ['trauma', 'pain', 'tiredness', 'drunk', 'hallucinogen','control','corruption','stress', 'drugged', 'awareness']
		if(!V.statFreeze && list.includes(param))
			V[param] = Math.clamp(V[param] + value, 0, 10000)
	}

	/**
	 * 通用的使用效果处理
	 * set the general effect when used
	 * @param {string} param 
	 * @param {number} value 
	 * @param {'p'|void} method 
	 */
	doDelta(param, value, method) {
		console.log(this, this.getPalam)
		if (param == 'aphrod') {
			this.getPalam('drugged', value)
			param = 'drugged'
		}
		else if (param == 'drunk') {
			this.getPalam('drunk', value)
			param = 'alcohol'
		}
		else {
			if (method == 'p'){
				wikifier(param, value, param == 'arousal' ? 'genital' : null)
			}
			else{
				value = -value
				wikifier(param, value)
			}
		}
		return P.palams(param, value)
	}
}
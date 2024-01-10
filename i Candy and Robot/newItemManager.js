/**
 * 获取物品的可堆叠大小
 * @param {string} itemId 
 * @returns {number}
 */
function getStackSize(itemId, mode){
	let item = Items.get(itemId)
	let size = typeof item.size === "number" ? item.size : setup.maxStacks[item.size]

	if(!item){
		console.error('error from get items stack size, id:', itemId)
		return 0
	}
	else if(!item.size){
		return 1
	}

	else if(mode == 'storage'){
		return Math.clamp(size * iCandy.getConfig('globalStack') * 10, 1, 10000)
	}

	//获取原始堆叠大小
	else if(mode == 'raw'){
		return size
	}

	//应该完全禁用，但麻烦，干脆弄个除了作弊不会到达的数字。
	else if(iCandy.getConfig('disableStack') === true ){
		return Math.pow(10, 20)
	}

	//默认最大可能得堆叠上限为1k
	return Math.clamp(size * iCandy.getConfig('globalStack'), 1, 1000)
}



class iStack{

	static getSize = getStackSize

	/**
	 * split stack
	 * @param {iStack} stack 
	 * @param {number} size 
	 * @returns 
	 */
	static split = function(stack, size){
		if(stack.count <= size){
			return [stack]
		}

		const count = Math.floor(stack.count / size)
		const remain = stack.count % size
		const stacks = []

		for(let i = 0; i < count; i++){
			stacks.push(new iStack(stack.id, size, stack.diff))
		}
		if(remain > 0 ){
			stacks.push(new iStack(stack.id, remain, stack.diff))
		}

		return stacks
	}

	/**
	 * set stack to inventory
	 * @param {string} itemId 
	 * @param {number} num 
	 * @param {string | void} diff 
	 * @returns 
	 */
	static set = function(itemId, num, diff){
		const size = iStack.getSize(itemId)
		const stacks = iStack.split(new iStack(itemId, num, diff), size)     
		return stacks
	}

	/**
	 * merge same item stacks
	 * @param {iStack[]} stacks 
	 */
	static merge = function(stacks){
		const result = []
		const map = {}

		stacks.forEach(stack => {
			if(!map[stack.uid]){
				map[stack.uid] = stack
				result.push(stack)
			}
			else{
				map[stack.uid].count += stack.count
			}
		})

		return result
	}

	/**
	 * 
	 * @param {Items} data 
	 * @param {string} itemId 
	 * @param {number} num 
	 * @param {string} diff 
	 */
	constructor(itemId, num, diff){
		const data = Items.get(itemId)
		if(!data){
			throw new Error('no such item:', itemId)
		}

		this.id = data.id
		this.name = lanSwitch(data.name)
		this.count = num

		this.index = ['equip_body', 0]

		this.diff = diff
		this.uid = diff ? this.id + '_' + diff : this.id


		//check if the item can be stacked
		this.canStack = function(){
			return iStack.getSize(this.id) > 1
		}

		//check if the stack isnot full then return the remain space
		this.remain = function(){
			return iStack.getSize(this.id) - this.count
		}

		/**
		 * add to the stack and return the remain item count
		 * @param {number} num 
		 * @returns 
		 */        
		this.add = function(num){
			const limit = iStack.getSize(this.id)
			this.count = Math.min(this.count + num, limit)
			return num - this.count
		}

		/**
		 * take required count from stack and return left required count
		 * @param {number} num 
		 * @returns 
		 */
		this.take = function(num){
			const _count = this.count
			this.count = Math.max(this.count - num, 0)
			return Math.abs(_count - num)
		}

		/**
		 * check if the stack can add the item and return the remain item count
		 */
		this.check = function(num){
			const limit = iStack.getSize(this.id)
			return num - Math.clamp(this.count + num, 0, limit) 
		}

		/**
		 * check before take the item from stack, and return the remain required count
		 */
		this.checkTake = function(num){
			if(this.count >= num ){
				return 0
			}
			return Math.abs(this.count - num)
		}
	}
}


function countBodySlots(){

	let slot = 2 //2 slot for hands

	const { upper, over_upper, lower } = V.worn
	
	//lazy slot setting by worn type
	if(upper.name !== 'naked' || over_upper.name !== 'naked'){
		slot += 1
	}

	if(lower.name !== 'naked'){
		slot += lover.variable == upper.variable ? 1 : 2
	}

	//if hand held an item, then slot - 1
	if(getEquip('held')){
		slot -= 1
	}

	//if wallet has extraspace, then slot + 1
	if(getEquip('wallet')){
		let id = getEquip('wallet').id
		let item = Items.get(id)
		if(item.tags.includes('extraspace')){
			slot += 1
		}
	}

	return slot
}

function countHoleSlots(){
	if(currentSkillValue('promiscuity') >= 90){
		return 2
	}
	else if(currentSkillValue('promiscuity') >= 75){
		return 1
	}

	return 0
}

function getEquip(type){
	if(V.iPockets.equip[type].id == 'none')
		return

	return V.iPockets.equip[type]
}

/**
 * @class Pocket
 * @property { object } maxSlot
 * 
 */
class Pocket{
	static maxSlot = {

		body: countBodySlots,

		hole: countHoleSlots,
		/**
		 * get the max slot of the equips
		 * @param {string} type 
		 * @returns {number}
		 */
		equip: function(type){
			let item = getEquip(type)
			if(!item){
				return 0
			}
			const data = Items.get(item.id)
			return data.capacity || 0
		},

		held: function(){
			return this.equip('held')
		},

		bag: function(){
			return this.equip('bag')
		},

		cart: function(){
			return this.equip('cart')
		}
	}
	/**
	 * get the max slot of the inventory
	 * @param {string} type 
	 * @returns {number}
	 */
	static getMaxSlot(type){
		const max = Pocket.maxSlot
		if(!max[type]()){
			return 0
		}
		return max[type]()
	}

	static list = ['body', 'hole', 'held', 'bag', 'cart']

	/**
	 * get the inventory by type
	 * @param {string} type 
	 * @returns {Pocket}
	 */
	static get(type){
		if(this.list.includes(type)){
			return V.iPockets[type]
		}
		else{
			return V.iStorage[type]
		}
	}

	//get all stack by item uid from all inventory
	static search(itemId){
		return this.list.reduce((total, type) => {
			const inventory = this.get(type)
			const _stacks = inventory.getById(itemId)
			if(_stacks.length > 0){
				total.total += _stacks.reduce((total, stack) => total + stack.count, 0)
				total.stacks.push(..._stacks)
			}
			return total
		}, { total:0, stacks:[] })
	}

	//get total empty slot number from all inventory
	static getRemain(){
		return this.list.reduce((total, type) => {
			const inventory = this.get(type)
			total += inventory.remains()
			return total
		}, 0)
	}

	//merge all inventory stacks to an objcet
	static mergeObj(){
		const obj = {}
		this.list.forEach(type => {
			const inventory = this.get(type)
			inventory.slots.forEach(stack => {
				if(!obj[stack.uid]){
					obj[stack.uid] = stack
				}
				else{
					obj[stack.uid].count += stack.count
				}
			})
		})
		return obj
	}
	/**
	 * 
	 * @param {string} type 
	 * @param {string} position 
	 * @param {number} limitsize
	 * 
	 */
	constructor( type, position, limitsize ){
		this.type = type
		this.pos = position
		this.limitsize = limitsize || Pocket.getMaxSlot(position)
		this.slots = []
	}

	//---------------------------------------------//
	//              inventory methods              //
	//---------------------------------------------//
	/**
	 * 
	 * @returns {number} remain space
	 */
	remains(){
		return this.limitsize - this.slots.length
	}

	/**
	 * get a stack by uid
	 * @param {string} uid 
	 * @returns {iStack | void}
	 */
	get(uid){
		return this.slots.filter(stack => stack.uid == uid)[0]
	}

	/**
	 * get all stacks of the item by id
	 * @param {string} itemId 
	 * @returns {iStack[]}
	 */
	getById(itemId){
		return this.slots.filter(stack => stack.id == itemId)
	}

	/**
	 * get all stacks of the item by uid
	 * @param {string} itemId 
	 * @returns {iStack[]}
	 */
	getByUid(uid){
		return this.slots.filter(stack => stack.uid == uid)
	}

	/**
	 *  sort the inventory by type and id
	 */
	sort(){
		this.slots.sort((a, b) => {
			if(a.type == b.type){
				return a.id > b.id
			}
			return a.type > b.type
		})

		//update the index
		this.updateIndex()
		return this.slots
	}

	/**
	 * update the index
	 */
	updateIndex(){
		this.slots.forEach((stack, i) => {
			stack.index = [this.type+'_'+this.pos, i]
		})
	}

	/**
	 * sort out the inventory, if the stack is empty then remove it
	 * if the stack is bigger than the stack size then split it
	 * if the slot is out of the limit then remove it
	 * @param {iStack[]} mergeItem
	 */
	sortOut(mergeItem){
		this.slots = this.slots.filter(stack => stack.count > 0)

		if(mergeItem && mergeItem.length > 0){
			this.slots.push(...mergeItem)
		}
		const newslots = iStack.merge(this.slots)


		const result = this.add(newslots)	
		return result.overflow
	}

	/**
	 * take out the item from the inventory
	 * @param {string} uid
	 * @param {number} num
	 * @returns {iStack | void}
	 * 
	 */
	take(uid, num){
		const stack = this.getByUid(uid)
		if(stack.length == 0){
			return
		}

		const totalHas = stack.reduce((total, stack) => total + stack.count, 0)

		//if take number is not specified or just one stack size
		if(stack[0].count == num || num == undefined  ){
			return this.takeOne(uid)
		}

		//if take number is less than one stack size
		else if(stack[0].count < num){
			return this.takeSome(uid, num)
		}

		//if take number is more than one stack size and the total number of the item is less than take number
		else if(totalHas < num){
			return this.takeAll(uid)
		}

		else if(totalHas >= num){
			return this.takeMulti(uid, num)
		}
	}

	/**
	 * take out one stack item from the inventory
	 * @param {string} uid 
	 * @returns {iStack | void}
	 */
	takeOne(uid){
		const stack = this.get(uid)
		if(!stack){
			return
		}
		this.slots.splice(stack.index[1], 1)

		//mark the pocket is checked
		temp.pocketChecked = true
	}

	/**
	 * take out some item from the inventory
	 * @param {string} uid 
	 * @param {number} num 
	 * @returns {iStack | void}
	 */
	takeSome(uid, num){
		const stack = this.get(uid)
		if(!stack){
			return
		}

		const remain = stack.count - num
		stack.count = remain
		return new iStack(stack.id, num, stack.diff)
	}

	/**
	 * take out all specificd item from the inventory
	 * @param {string} uid 
	 * @returns {iStack[]}
	 */
	takeAll(uid){
		const stack = this.getByUid(uid)
		if(stack.length == 0){
			return
		}

		const result = []
		stack.forEach(stack => {
			this.slots.splice(stack.index[1], 1)
			result.push(stack)
		})
		return result
	}

	/**
	 * take out multi stacks from the inventory
	 * @param {string} uid
	 * @param {number} num
	 * @returns {iStack[]}
	 */
	takeMulti(uid, num){
		const stacks = this.getByUid(uid)
		if(stacks.length == 0){
			return
		}

		const result = []
		let remain = num
		stacks.forEach(stack => {
			if(remain > stack.count){
				this.slots.splice(stack.index[1], 1)
				result.push(stack)
				remain -= stack.count
			}
			else{
				stack.count -= remain
				result.push(new iStack(stack.id, remain, stack.diff))
				remain = 0
			}
		})

		return result
	}

	/**
	 * add item to the inventory and return the remains
	 * @param {iStack} stack 
	 * @returns { overflow: iStack[], total: number }
	 */
	add(itemStacks){
		if(this.remains() == 0){
			return
		}

		if(Array.isArray(itemStacks) == false){
			itemStacks = [itemStacks]
		}

		return itemStacks.reduce((result, itemStack) => {
			const sameStack = this.getByUid(itemStack.uid)
			let remain = itemStack.count

			//merge to the same stack
			if(sameStack.length > 0){
				sameStack.forEach(stack => {
					remain = stack.add(remain)
				})
			}

			//add to the empty slot
			if(remain > 0){
				const remainStack = iStack.set(itemStack.id, remain, itemStack.diff)
				const count = this.remains()
				
				for(let i = 0; i < count; i++){
					const stack = remainStack.pop()
					this.slots.push(stack)

					if(remainStack.length == 0){
						break
					}
				}

				result.overflow.push(...remainStack)
				result.total += remainStack.reduce((total, stack) => total + stack.count, 0)
				return result
			}
		},{ overflow: [], total: 0 })
	}

	/**
	 * check the availability of the items
	 * @param {iStack} stack
	 * @returns {avaliable: boolean, costslot: number, overflow: number, remain: number}
	 */
	check(itemStacks){
		let remainSlot = this.remains()

		if(Array.isArray(itemStacks) == false){
			itemStacks = [itemStacks]
		}

		return itemStacks.reduce((result, itemStack) => {
			const size = iStack.getSize(itemStack.id)
			const sameStack = this.getByUid(itemStack.uid)
			let remain = itemStack.count

			//merge to the same stack
			if(sameStack.length > 0){
				sameStack.forEach(stack => {
					remain = stack.check(remain)
				})
			}

			//add to the empty slot
			let costslot = Math.ceil(remain / size)
			if(remain > 0 && costslot  > remainSlot){
				result.costslot += costslot
				result.overflow += costslot - remainSlot
				result.remain += remain - (remainSlot * size)
				remainSlot = 0
			}
			else{
				result.costslot += costslot
				remainSlot -= costslot
			}

			if(result.overflow == 0 ){
				result.avaliable = true
			}
			else{
				result.avaliable = false
			}

			return result
		},{
			costslot: 0,
			overflow: 0,
			remain: 0,
		})
	}
}

function updatePockets(){

	//先检测当前装备的容器是否有容量变化
	Pocket.list.forEach(type => {
		const pocket = Pocket.get(type)
		const max = Pocket.getMaxSlot(type)

		if(pocket.limitsize != max){
			pocketStateChange(type)
			pocket.limitsize = max
		}
	})

	//更新上限记录
	savePocketState()

	//整理所有物品，超出堆叠上限的物品会被分堆
	//如果分堆后的物品又超出了容量上限，则会被自动转移或者丢弃
	const remainItems = []
	for(let i in Pocket.list){
		const pocket = Pocket.get(Pocket.list[i])

		const remain = pocket.sortOut(remainItems)
		if(remain.length > 0){
			remainItems.push(...remain)
		}
	}

	//如果有因为超出上限而被分堆、分堆又超出容量上限的物品，则给与玩家提示
	if(remainItems.length > 0){

		//notify('inventory overflow', overflow)
		//根据玩家所在地点，自动转移或者丢弃物品

	}
}

function checkItemOnGet(itemStacks, num){
	if(Array.isArray(itemStacks) == false && String(itemStacks) == '[object Object]'){
		itemStacks = [itemStacks]
	}
	else if(typeof itemStacks == 'string'){
		if(!num){
			num = 1
		}
		itemStacks = [new iStack(itemStacks, num)]
	}

	//search all pockets if the item can be added
	for(let i in Pocket.list){
		const pocket = Pocket.get(Pocket.list[i])
		const result = pocket.check(itemStacks)
		if(result.avaliable === false ){
			return false
		}
	}

	return true
}

function getItem(itemStacks, num){
	if(Array.isArray(itemStacks) == false && String(itemStacks) == '[object Object]'){
		itemStacks = [itemStacks]
	}
	else if(typeof itemStacks == 'string'){
		if(!num){
			num = 1
		}
		itemStacks = [new iStack(itemStacks, num)]
	}

	const overflow = []

	//search all pockets if the item can be added
	for(let i in Pocket.list){
		const pocket = Pocket.get(Pocket.list[i])
		const result = pocket.add(itemStacks)

		if(result.overflow.length > 0){
			overflow.push(...result.overflow)
		}
	}

	if(overflow.length > 0){
		return overflow
	}
}
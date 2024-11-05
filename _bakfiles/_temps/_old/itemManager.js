function getItemInfo(count,pos){
	return Object.assign({count:0,pos:[],
	addItem(count,pos){
		this.count += count;
		this.pos.push(pos)
	}
	},{
		count,
		pos:[pos]
	})
}

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

const sortOutEvent = function(item){
	let html = ''
	if(item.pocket == 'body' && this.getEvent('body') == 1){
		html += lanSwitch(
			'The items in your clothes pockets fall to the ground as your clothes are torn apart.', 
			'装在衣服口袋里的物品，伴随着衣服的破碎掉落到地上了。'
		)
		this.setEvent('body', 0)
	}

	if(item.pocket == 'body' && this.getEvent('body') == 2){
		html += lanSwitch(
			'You change your clothes, and the extra items are sorted out.', 
			'你更换了衣服，多余的物品被你整理出来。'
		)
		this.setEvent('body', 0)
	}

	if(this.getEvent('bag') == 1 && item.pocket == 'bag'){
		html += lanSwitch(
			'You change your bag, and the extra items are sorted out.', 
			'你更换了个更小的背包，多余的物品被你整理出来。'
		)
		this.setEvent('bag', 0)
	}

	if(this.getEvent('held') == 1 && item.pocket == 'held'){
		html += lanSwitch(
			'You change your handheld bag, and the extra items are sorted out.', 
			'你更换了个更小的手提袋后，多余的物品被你整理出来。'
		) + '<br>'
		this.setEvent('held', 0)
	}

	if(this.getEvent('cart') == 1 && item.pocket == 'cart'){
		html += lanSwitch(
			'You change your cart, and the extra items are sorted out.', 
			'你更换了个更小的推车，多余的物品被你整理出来。'
		)
		this.setEvent('cart', 0)
	}

	if(this.getEvent('hole') == 1 && item.pocket == 'hole'){
		html += lanSwitch(
			'Your promiscuity is not enough to keep the items in your asshole. The items are expelled from your body.', 
			'你的淫荡度不足以将物品继续存放在肠道里。因为受到刺激，存放在肠内的物品被排放了出来。'
		)
		this.setEvent('hole', 0)
	}
	return html + '<br>'
}

const iManager = {
	getStackSize,

	getEquip(pos){
		if(V.iPockets.equip[pos].id == 'none') return
		return V.iPockets.equip[pos]
	},

	setEquip(pos, value){
		V.iPockets.equip[pos] = value
	},
	
	unsetEquip(pos){
		V.iPockets.equip[pos] = { id:'none' }
	},

	getPocket(pos){
		return V.iPockets[pos]
	},

	getEvent(pos){
		return V.iPockets.event[pos]
	},

	setEvent(pos, value){
		V.iPockets.event[pos] = value
	},

	setState(pos, value){
		V.iPockets.states[pos] = value
	},

	getState(pos){
		return V.iPockets.states[pos]
	},
	/**
	 * 按堆叠限制切割物品堆
	 * @param {pocketItem} item 
	 * @param {number} stacksize 
	 * @returns {Array<pocketItem>}
	 */
	splitItems (item, stacksize){
		if(!stacksize || item.count <= stacksize) return [item];

		let totalCount = item.count;
		let items = []

		const resCount = totalCount % stacksize
		let splitItem =null;

		if(resCount > 0){
			splitItem = clone(item)
			splitItem.count = resCount;
			items.push(splitItem)
			totalCount -= resCount;
		}

		const itemCount = totalCount / stacksize;
		for (let index = 0; index < itemCount; index++) {
			splitItem = clone(item)
			splitItem.count = stacksize
			items.push(splitItem)
		}
		return items
	},

	/**
	 * 合并相同物品的堆叠
	 * @param {Array<pocketItem>} pocket 
	 */
	mergeSameItems (pocket){
		const sameItems = pocket.reduce((nowItem, { uid, count } ,i)=>{
			if(nowItem.has(uid)){
				var item = nowItem.get(uid)
				item.addItem(count,i)
				return nowItem;
			}

			nowItem.set(uid, getItemInfo(count, i))
			return nowItem;
		},new Map())
		
		let removeItemPos = []
		for (const { pos,count } of sameItems.values()) {
			const nowItemPos = pos.shift()
			pocket[nowItemPos].count = count

			if(pos.length <= 0){
				continue
			}
			for (const itemPos of pos) {
				removeItemPos.push(itemPos)
			}
		}

		removeItemPos = removeItemPos.sort((a,b)=>b-a);
		for (const pos of removeItemPos) {
			pocket.deleteAt(pos)
		}
		
	},

	/**
	 * 转移物品时显示用文本。 重复的物品会预先合并好
	 * @param {Array<{pos:string, item:pocketItem}> transferDetail
	 * @returns {string}
	 */
	transferMessage : function(transferDetail){
		return transferDetail.reduce((res, {pos, item})=>{
			const message = transferMsg[pos]

			if(typeof message !== "function" ) return res;
			res += message(item);
			return res;

		}, '')
	},
	/**
	 * 检测身上可用物品格
	 * @returns {number}
	 */
	checkBodySlots : function(){
		let count = 2
		const {upper, over_upper, lower } = V.worn
		if(upper.name !== 'naked' || over_upper !== 'naked'){
			count += 1
		}

		if(lower.name !== 'naked'){
			count += lower.variable == upper.variable ? 1 :2
		}

		if(this.getEquip('wallet')){
			let id = this.getEquip('wallet').id
			let wallet = Items.get(id)
			if(wallet.tags.includes('extraspace')){
				count += 1
			}
		}
		if(this.getEquip('held')){
			count -= 1
		}
		return count
	},

	/**
	 * 身上各部位的最大格子数
	 */
	MaxSlots : {
		body(){
			return iManager.checkBodySlots()
		},
		held(){
			let item = iManager.getEquip('held')
			if(!item) return 0

			const held = Items.data[item.id];
			return held?.capacity ?? 0
		},
		hole(){
			if(currentSkillValue('promiscuity') >= 90){
				return 2
			}
			else if(currentSkillValue('promiscuity') >= 75){
				return 1
			}

			return 0
		},
		bag(){
			let item = iManager.getEquip('bag')
			if(!item) return 0

			const bag = Items.data[item.id];
			return bag?.capacity ?? 0
		},
		cart(){
			let item = iManager.getEquip('cart')
			if(!item) return 0

			const cart = Items.data[id];
			return cart?.capacity ?? 0
		}
	},

	/**
	 * 获取身上各部位最大格子数
	 * @param {string} pos 
	 * @returns {number}
	 */
	getMaxSlots : function(pos){
		const slot = this.MaxSlots[pos];
		if(typeof slot === "function") return slot();
		return 0;
	},
	/**
	 * 在身上搜索物品，并返回对应物品的所有堆叠，以及相关信息
	 * @param {string} itemId 
	 * @returns { {total: number, stacks: Array<pocketItem>, path:Array<{ pos:string, index: number }>} }
	 */
	getStackFromPockets : function(itemId){
		return pocketsList.reduce((result, key)=>{

			const pocket = this.getPocket(key)
			//防意外
			if(!Array.isArray(pocket)) return result;

			let stack = pocket.filter((item, index)=>{
				if(item.uid == itemId) {
					result.total += item.count;
					result.path.push({ pos: key, index })
					return item;
				}
			})

			result.stacks.push(...stack)
			return result

	},{ total:0,  stacks: [], path:[] })
	},

	/**
	* 获取空余的物品格子
	* @return {{ slots: Array<{ pos:string, count:number }>, total: number }}
	*/
	getEmptySlots(){
		return pocketsList.reduce((result, key)=>{
			let pocket = this.getPocket(key)
			let max = this.getMaxSlots(key)
			if(pocket.length < max ){
				let count = max - pocket.length
				result.slots.push( { pos: key, count } )
				result.total += count
			}
			return result
		}, { slots:[ ], total: 0 })
	},

	objPocket(items){
		let obj = {};
		items.forEach((item)=>{
			if(!obj[item.uid]){
				obj[item.uid] = {
					type: item.type,
					id: item.id,
					uid: item.uid,
					name: item.name,
					count: item.count,
					pocket: item.pocket
				}
			}
			else{
				obj[item.uid].count += item.count
			}
		})

		return obj
	},

	shiftStacks : function(stacks, amount){
		return stacks.reduce((left, item)=>{
			if(left == 0) return left;
			let size = this.getStackSize(item.id)

			//如果开启了无限堆叠模式……到这步骤都不影响。
			if(item.count < size){
				//万一amount比size要小得多呢……？限制一下！
				let get = Math.clamp(size - item.count, 0, left);
				item.count += get;
				left = left - get;
			}
			return left
		}, amount)
	},
	
	shiftSlots : function(slots, items){
		return slots.reduce((result, { pos, count})=>{
			let pocket = this.getPocket(pos)
			if(result.items.length == 0) return result

			let item
			for(let i=0; i < count; i++){
				//console.log('shift for loop:', i, result.items)
				if(result.items.length > 0){
					item = result.items.pop()
					item.pocket = pos
					pocket.push(item)
					result.details.push({ pos, item })
				}
			}
			console.log('shiftSlots:', result)
			console.log('last:', item)
			result.last = item;
			return result
		}, { items, last:null, details:[]})
	},

	/**
	 * 物品获得前的检测。
	 * 返回boolean
	 */
	checkItemOnGet : function(itemId, num){
		//如果没有格子限制的话直接返回true
		if(iCandy.getConfig('disablePockets') == true ) return true;

		const size = this.getStackSize(itemId)
		const { total, stacks } = this.getStackFromPockets(itemId);
		console.log('size:', size, 'num:', num)
		console.log('total:', total, 'stacks:', stacks)

		//先检查即存堆叠是否有足够空位，有就直接返回true
		if(stacks.length * size - total >= num){
			return true
		}

		const slots = this.getEmptySlots()
		console.log('slots:', slots)

		//看看有无足够空余位置
		if( slots.total >= Math.ceil(num/size) ){
			return true
		}

		return false
	},

	/**
	 * 物品获得时的处理。将返回显示用文本。
	 * @param {string} itemId 
	 * @param {number} num
	 * @return {string} 
	 */
	getItems : function(itemId, num, diff){
		let newItem = new pocketItem(itemId, num, diff)
		let size = this.getStackSize(itemId)
		let msg = ''
		let leftNum = 0
		let ID = newItem.uid

		//如果没有格子限制，则直接扔pockets.global
		if(iCandy.getConfig('disablePockets') == true ){

			if(!V.iPockets.global[ID]){
				V.iPockets.global[ID] = newItem;
			}
			else{
				V.iPockets.global[ID].count += num;
			}
			
		}

		//先进行是否存在即存堆叠的检测。如果即存堆叠有足够空间，就直接加上。  
		let {total, stacks} = this.getStackFromPockets(ID)

		if(total > 0){
			//先整合看看有无剩余
			leftNum = this.shiftStacks(stacks, num)
			//如果这里已经没剩余数了，直接返回没有额外信息。
			console.log('leftNum:', leftNum)
			if(leftNum == 0) return msg
			//先更新物品数量。如果上一步即存堆叠都是满的话，leftNum现在跟num是一致的.
			newItem.count = leftNum
		}

		//然后根据堆叠限制切割
		let items = this.splitItems(newItem, size)
		let leftItems = {
			items,
		}
		let leftitem = {
				id: newItem.id,
				name: newItem.name,
				count: 0
			}

		//检测空格位置。有空间就塞，没有就把多余的扔地上/存储物柜/藏物点
		let Slots = this.getEmptySlots()
		if (Slots.total > 0){          
			leftItems = iM.shiftSlots(Slots.slots, clone(items))
			console.log('leftItems:', leftItems)

			//如果这里已经处理完了，根据最后处理的位置抛个提示
			if(leftItems.items.length == 0 ){
				let { last } = leftItems
				return transferMsg[last.pocket](last)
			}
		}

		//处理溢出的部分。
		//先统计一下总数
		leftitem.count = leftItems.items.reduce((result, item)=>{
			result += item.count; return result
		}, 0)

		//根据所在地点判断获取提示信息
		let html = this.dropOrTransferItems(leftitem)
		return html

	},

	dropItem : function(pos, index){
		const pocket = this.getPocket(pos)
		const dropMsg = {
			CN : `你丢弃了${pocket[index].name} x ${pocket[index].count}。`,
			EN : `You drop ${pocket[index].name} x ${pocket[index].count}.`
		}
		pocket.deleteAt(index)
		V.addMsg += lanSwitch(dropMsg.EN, dropMsg.CN) + '<br>'
	},

	dropOrTransferItems(item){
		//根据所在地点判断
		if(V.location == 'home'){
			//在家就转移到家里仓库。
			this.storeItems('home', item.id, item.count, item.diff)
			return transferMsg.home(item)
		}
		else if(V.location == 'farm'){
			//在农场里就转移到农场仓库
			this.storeItems('farmbarns', item.id, item.count, item.diff)
			return transferMsg.farm(item)
		}
		//如果所在地有储物柜
		else if(this.hasLockers() && this.canStoreLockers()){
			this.storeItems('lockers', item.id, item.count, item.diff)
			return transferMsg.lockers(item)
		}
		//如果所在地有藏物点
		else if(this.hidePoint[getLocation()]){
			let [place, storage] = this.hidePoint[getLocation()]
			this.storeItems(storage, item.id, item.count, item.diff)
			return transferMsg[place](item)
		}
		//其他情况就无了。
		else{
			return transferMsg.ground(item)
		}
	},

	//判定所在地有无储物柜。
	//只有学校、俱乐部、妓院、商场有储物柜。
	//储物柜内部是共通的(￣▽￣")。没有堆叠限制，但有item数限制
	hasLockers(){
		//学校的储物柜是免费的。
		if(getLocation() == 'school') return true;
		//其他地方的储物柜需要解锁。
		return V.iStorage.lockerOwned[getLocation()] == 1
	},

	//获取所在地的藏物点。
	//公园有灌木丛，工厂街有垃圾桶，岛上是自己的藏身处
	//灌木丛和垃圾桶每日清理。岛屿藏身处则概率清理。
	hidePoint :{
		park: ['bushes', 'bushes_park'],
		elk : ['trashbin', 'trashbin_elk'],
		island : ['hideout', 'hideout']
	},

	canStoreLockers(){
		return this.countStorageItems(V.iStorage.lockers) < 60
	},

	sortPocket(pocket, max){
		let items = []
		let leftItems = []
		let deleteItems = []
		for( let i=0; i < max; i++ ){
			let item = pocket[i]
			if(!item) continue
			let size = this.getStackSize(item.id)
			console.log('item:', item, 'size:', size)

			if(item.count > size){
				console.log('split item', item.count, size)
				let left = clone(item)
				item.count = size
				left.count -= size

				left = iManager.splitItems(left, size)
				leftItems.push(...left)
			}
			items.push(pocket[i])
			deleteItems.push(i)
		}
		deleteItems = deleteItems.sort((a,b)=>b-a)
		deleteItems.forEach((index)=>{
			pocket.deleteAt(index)
		})
		if(pocket.length > 0){
			leftItems.push(...pocket)
		}

		return { items, leftItems }
	},

	//定期更新口袋和容器的堆叠，并进行爆衣检测。
	updatePockets(situation){
		//初始化
		if(!V.iPockets.temp){
			this.saveSlotsStatus()
		}

		//先做爆衣检测
		pocketsList.forEach((pos)=>{    
			this.checkBroken(pos)
		})

		//然后保存当前slot状态
		this.saveSlotsStatus()

		//更新背包堆叠情况。如果爆了就清除多的物品并扔出提示文本
		let leftItems = []

		pocketsList.forEach((pos)=>{
			console.log('pocket:',pos,  V.iPockets[pos])
			let res = this.sortPocket(V.iPockets[pos], this.getMaxSlots(pos))
			console.log('sort result:',res)
			V.iPockets[pos] = res.items
			leftItems.push(...res.leftItems)
		})

		console.log('leftItems:', leftItems)
		//如果物品没有溢出就在这里结束，没有额外提示消息。
		if(leftItems.length == 0) return '';

		//如果背包、手推车遗失，会在遗失判定时同时清理掉物品。
		//先整理多余物品到已有堆叠中
		leftItems.forEach((item)=>{
			let { total, stacks } = this.getStackFromPockets(item.uid)
			if( total > 0 ){
				item.count = this.shiftStacks(stacks, item.count)
			}
		})
		//清理掉已清空的物品
		leftItems = leftItems.filter(item => item.count > 0)
		//如果物品没有溢出就在这里结束，没有额外提示消息。
		if(leftItems.length == 0) return '';
		
		//看看有无空间塞多出来的物品
		let empty = this.getEmptySlots()

		//如果有空位就先转移
		if(empty.total > 0){
			let result = this.shiftSlots(empty.slots, leftItems)
			leftItems = result.items

			if(leftItems.length == 0){
				return this.transferMessage(result.details)
			}
		}

		//如果有剩余，或者上面检测时没有空余位置的，就看看是就地转移物品到安全点或爆掉落
		if(leftItems.length > 0){
			let html = ''

			leftItems.forEach((item)=>{
				html += sortOutMsg(item)
				html += this.dropOrTransferItems(item)
			})

			return html
		}

	},

	onEquip(pos, pocket, slot){
		if(!V.iPockets[pocket][slot]) return

		const item = V.iPockets[pocket].deleteAt(slot)
		if(this.getEquip(pos)){
			this.onUnEquip(pos)
		}

		this.setEquip(pos, item[0])
		this.updatePockets()
	},

	onUnEquip(pos){
		const item = this.getEquip(pos)
		if(!item) return

		this.unsetEquip(pos)
		this.getItems(item.id, 1, item.diff)
		this.updatePockets()
	},

	//检测装备状态并记录
	checkBroken(pos){
		if(pos == 'body'){
			if (this.getMaxSlots('body') < V.iPockets.temp.body && this.getMaxSlots('body') >=4 ){
				this.setState('body', 'changed')
				this.setEvent('body', 2)
			}
			else if( this.getMaxSlots('body') < V.iPockets.temp.body){
				this.setState('body', 'broken')
				this.setEvent('body', 1)
			}
			else if( this.getMaxSlots('body') >= V.iPockets.temp.body && this.getMaxSlots('body') > 2 ){
				this.setState('body', 'equiped')
			}
		}

		else if(pos == 'hole'){
			if( this.getMaxSlots('hole') < V.iPockets.temp.hole ){
				this.setState('hole', 'fit')
				this.setEvent('hole', 1)
			}
			else if(this.getMaxSlots('hole') > 0 ){
				this.setState('hole', 'loose')
			}
			return
		}
		else{
			if( this.getMaxSlots(pos) < V.iPockets.temp[pos] && this.getMaxSlots(pos) > 0 ){
				this.setState(pos, 'changed')
				this.setEvent(pos, 1)
			}
			else if(this.getMaxSlots(pos) >= V.iPockets.temp[pos]  && this.getMaxSlots(pos) > 0){
				this.setState(pos, 'equiped')
			}
		}

	},

	saveSlotsStatus(){
		V.iPockets.temp = {
			body	: this.getMaxSlots('body'),
			held	: this.getMaxSlots('held'),
			bag		: this.getMaxSlots('bag'),
			hole	: this.getMaxSlots('hole'),
			cart	: this.getMaxSlots('cart'),
		}
	},

	storeItems(location, itemId, num, diff){
		const item = new pocketItem(itemId, num, diff)
		let id = item.uid

		if(!V.iStorage[location][id]){
			V.iStorage[location][id] = item
		}

		V.iStorage[location][id].count += num
		
		return V.iStorage[location][id]
	},

	countStorageItems(storage){
		return Object.entries(storage).reduce((result, [key, item])=>{
			//一个堆叠算一个。
			const size = this.getStackSize(item.id) ?? 1
			const stacks = Math.ceil(item.count / size)

			result += stacks

			return result
		}, 0)
	}

}

/**
 * 
 * @returns {string}
 */
function getLocation(){
	//巴士里直接返回巴士
	if(V.passage == 'Bus' || V.passage.includes('Bus')){
		return 'bus'
	}

	if(V.passsage.includes('Stall')){
		return 'market'
	}

	if(V.location == 'town'){
		//根据bus返回
		return V.bus

	}
	if(V.location == 'alley'){
		//根据passage返回地点
		if(V.passage.includes('Commercial')) return 'commercial_alley'
		if(V.passage.includes('Industrial')) return 'industrial_alley'
		if(V.passage.includes('Residential')) return 'residential_alley'
	}

	return V.location
}


const iMoney = {
	/**
	 * 获取可携带的最大金钱数额
	 * @returns {number}
	 */
	max : function(){
		let wallet = V.iPockets.wallettype?.id
		let bag = Items.data[wallet]
		return  bag?.capacity + 250000 ?? 250000
	},

	/**
	 * 金钱进行变动时的处理
	 * @param {number} value 
	 */
	gain : function(value){
		let left = V.money1 + value - this.max()
		V.money1 = Math.clamp(V.money1 + value, 0, this.max());

		if(left > 0){
			T.addMsg += this.giveMsg.drop(left)
		}
	},

	lost : function(value){
		V.money1 = Math.clamp(V.money1 - value, 0, this.max());
		T.addMsg += this.giveMsg.lost(value)
	},

	use : function(value){
		V.money1 -= value
	},

	giveMsg :{
		lost : function(value){

		},
		earn : function(value){

		},
		
		transfer : function(value){

		},

		drop : function(value){
			return lanSwitch(
				`You have more money than you can carry, and you have to leave the extra ${value/100}£ where it is.`, 
				`你的钱多得拿不下了，多余的${value/100}£你只好留在原地。`
				)
		}
	}
}


//被强奸后随机丢失物品，一定概率丢失背包钱包手推车
function lostItemsAfterRape(){
	let moneyrate = V.money1/100000
	let max = Math.floor(V.money1 * 0.75 / 100)
	let lostmoney = random(10, max) * 100

	//身上超过50块就可能丢失，钱越多，丢失概率越大
	if( V.money1 >= 5000 ){
		let rate = random(1000) * moneyrate
		if( rate >= 500 ){
			iMoney.money(-lostmoney)
		}
	}

	const lost = (pocket)=>{
		let count = random(0, 4)
		if(pocket.length < count || pocket.length == 0 || count == 0) return
		
		for( let i = 0; i < pocket.length; i++){
			if(count <= 0) break;

			if(random(100) > 50){
				pocket.deleteAt(i);
				count --
			}
		}

		return true
	}

	//判断物品丢失， 优先丢身上的
	let lostitem = lost('body')
	//然后背包里的
	if(!lostitem){
		lostitem = lost('bag')
	}
	//最后是手推车的
	if(!lostitem){
		lost('cart')
	}

	/*概率整个背包或手推车弄丢
	if(random(1000) >= 800){
		iM.unsetEquip('bag')
		V.iPockets.bag = []
		message
	}
	if(random(1000) >= 800){
		iM.unsetEquip('cart')
		V.iPockets.cart = []
		message
	}
	*/

}



//tending_pick, tending_harvest收获/拾取农作物时的处理
function harvestHandle(){

}


Object.defineProperties(window, {
	getItemInfo : {
		value : getItemInfo
	},
	iM : {
		value : iManager
	},
	iMoney : {
		value : iMoney
	},
	getLocation : {
		value : getLocation
	}
})	
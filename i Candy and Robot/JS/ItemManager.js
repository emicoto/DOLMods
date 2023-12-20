//各种大小物品的最大堆叠限制
setup.maxStacks = {
	pill  : 50,
	inject: 10,

	micro : 36,
	tiny  : 18,
	small : 9,
	medium: 3,
	big   : 1,
}

V.iManager = {
	global : 1, //堆叠倍率
	disableStack: false, //关闭堆叠限制
	disablePockets: false, //关闭格子限制，同时禁用背包功能。道具栏直接从V.iStorage.home使用所有物品，但依然有仓储功能
	status:{
		body:'naked',
		bag:'none',
		cart:'none',
		hole:'none',
		wallet:'none',
	}
}

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
const ItemPocket = ["bag","body","cart","hole"]


/**
 * @class
 * @param {string} itemId
 * @param {number} num
 */
function pocketItem(itemId, num){
	let data = Items.get(itemId);
	if(!data){
		throw new Error('no such item:', itemId)
	}

	this.type = data.type
	this.id = data.id
	this.name = lanSwitch(data.name)
	this.count = num
	this.pocket = 'body'
}

const iManager = {
	/**
	 * 获取物品的可堆叠大小
	 * @param {string} itemId 
	 * @returns {number}
	 */
	getStackSize (itemId){
		let item = Items.get(itemId)

		if(!item){
			console.error('error from get items stack size, id:', itemId)
			return 0
		}
		else if(!item.size){
			return 1
		}
		else if(V.iManager.disableStack === true ){
			return Math.pow(10, 20) //应该完全禁用，但麻烦，干脆弄个除了作弊不会到达的数字。
		}

		//默认最大可能得堆叠上限为1k
		return Math.clamp(setup.maxStacks[item.size] * V.iManager.global, 1, 1000)

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
	const sameItems = pocket.reduce((nowItem, { id, count } ,i)=>{
			if(nowItem.has(id)){
				var item = nowItem.get(id)
				item.addItem(count,i)
				return nowItem;
			}

			nowItem.set(id, getItemInfo(count, i))
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
	 * 转移物品时显示的文本
	 */
	transferMsg  : {
		ground(item){
			return lanSwitch(
				`There's no slot for the ${item.name} x ${item.count} on any containers on your body, so you have to leave it to the ground.`,
				`你身上所有地方都没有空位放置了，你只好把${item.name} x ${item.count}扔地上。`
			)+'<br>';
		},
		bag(item){
			return lanSwitch(
				`Your pockets are full, so you put ${item.name} to your bag.`,
				`你的口袋装满了，所以你将${item.name}放进了背包。`
			)+'<br>'
		},
		cart(item){
			return lanSwitch(
				`Your bag are full, so you put ${item.name} to your cart.`,
				`你的背包满了，所以你将${item.name}放进了折叠推车里。`
			)+'<br>'
		},
		hole(item){
			return lanSwitch(
				`Your hands and available container all full. With no other choice, you put ${item.name} into your asshole.`,
				`你双手以及可用的容器都已经装满了，无可奈何下，你把${item.name}塞进你的屁眼里。`
			)+'<br>'
		},
		home(item){
			let it = item.count > 1 ? 'them' : 'it'
			return lanSwitch(
				`There's no slot for the ${item.name} for any containers on your body, but it doesn't bother you.You calmly take ${it} to your storage.`,
				`你身上所有地方都没有空位放置了，不过这不影响你。你从容地把${item.name}收入了储物柜。`
			)+'<br>';
		},
		farm(item){
			let it = item.count > 1 ? 'them' : 'it'
			return lanSwitch(
				`There's no slot for the ${item.name} for any containers on your body, but it doesn't bother you.You calmly take ${it} to farmbarns.`,
				`你身上所有地方都没有空位放置了，不过这不影响你。你从容地把${item.name}收入了谷仓。`
			)+'<br>';
		},
		lockers(item){
			let it = item.count > 1 ? 'them' : 'it'
			return lanSwitch(
				`There's no slot for the ${item.name} for any containers on your body, so you stored ${it} to your locker.`,
				`你身上所有地方都没有空位放置了，你只好把${item.name}收进自己的储物柜里。`
			)+'<br>';
		},
		bushes(item){
			let it = item.count > 1 ? 'them' : 'it'
			return lanSwitch(
				`There's no slot for the ${item.name}x${item.count} for any containers on your body, so you hide ${it} to the bushes.`,
				`你身上所有地方都没有空位放置了，你只好把${item.name}x${item.count}藏到一处树丛里。`
			)+'<br>';
		},
		trashbin(item){
			let it = item.count > 1 ? 'them' : 'it'
			return lanSwitch(
				`There's no slot for the ${item.name}x${item.count} for any containers on your body, so you hide ${it} to the trashbin.`,
				`你身上所有地方都没有空位放置了，你只好把${item.name}x${item.count}藏到垃圾桶里。`
			)+'<br>';
		},
		hideout(item){
			let it = item.count > 1 ? 'them' : 'it'
			return lanSwitch(
				`There's no slot for the ${item.name}x${item.count} for any containers on your body, so you take ${it} to your hideout.`,
				`你身上所有地方都没有空位放置了，你只好把${item.name}x${item.count}放回你的藏身处。`
			)+'<br>';
		}
	},

	/**
	 * 转移物品时显示用文本。 重复的物品会预先合并好
	 * @param {Array<{pos:string, item:pocketItem}> transferDetail
	 * @returns {string}
	 */
	transferMessage : function(transferDetail){
		return transferDetail.reduce((res, {pos, item})=>{
			const message = this.transferMsg[pos]

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
		const {worn} = V
		if(worn.upper.name !== 'naked' || worn.over_upper !== 'naked'){
			count += 1
		}

		if(worn.lower.name !== 'naked'){

			count += worn.lower.name == worn.upper.name ? 1 :2
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
			const bag = Items.data[V.iPockets.bagtype];
			return bag?.capacity ?? 0
		},
		cart(){
			const cart = Items.data[V.iPockets.carttype];
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
		return ItemPocket.reduce((result, key)=>{

			const pocket = V.iPockets[key]
			//防意外
			if(!Array.isArray(pocket)) return result;

			let stack = pocket.filter((item, index)=>{
				if(item.id==itemId) {
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
		return ItemPocket.reduce((result, key)=>{
			let pocket = V.iPockets[key]
			let max = this.getMaxSlots(key)
			if(pocket.length < max ){
				let count = max - pocket.length
				result.slots.push( { pos: key, count } )
				result.total += count
			}
		}, { slots:[ ], total: 0 })
	},

	objPocket(items){
		let obj = {};
		items.forEach((item)=>{
			if(!obj[item.id]){
				obj[item.id] = {
					type: item.type,
					id: item.id,
					name: item.name,
					count: item.count,
					pocekt: item.pocekt
				}
			}
			else{
				obj[item.id].count += item.count
			}
		})

		return obj
	},

	shiftStacks : function(stacks, amount){
		stacks.reduce((left, item)=>{
			if(left == 0) return left;
			//如果开启了无限堆叠模式……到这步骤都不影响。
			if(item.count < size){
				//万一amount比size要小得多呢……？限制一下！
				let get = Math.clamp(size - item.count, 0, left);
				item.count += get;
				left = get;
			}
			return left
		}, amount)
	},
	
	shiftSlots : function(slots, items){
		return slots.reduce((result, { pos, count})=>{
			let pocket = V.iPockets[pos]
			let item
			for(let i=0; i < count; i++){
				item = result.items.pop()
				item.pocekt = pos
				pocket.push(item)
				result.details.push({ pos, item })
				if(result.items.length == 0) break
			}
			result.last = item;
			return result
		}, { items, last:null, details:[]})
	},
	/**
	 * 物品获得时的处理。将返回显示用文本。
	 * @param {string} itemId 
	 * @param {number} num
	 * @return {string} 
	 */
	getItems : function(itemId, num){
		let newItem = new pocketItem(itemId, num)
		let size = this.getStackSize(itemId)
		let msg = ''
		let leftNum = 0

		//先进行是否存在即存堆叠的检测。如果即存堆叠有足够空间，就直接加上。  
		let {total, stacks} = this.getStackFromPockets(itemId)

		if(total > 0){
			//先整合看看有无剩余
			leftNum = this.shiftStacks(stacks, num)
			//如果这里已经没剩余数了，直接返回没有额外信息。
			if(leftNum == 0) return msg
		}
		
		//先更新物品数量。如果上一步即存堆叠都是满的话，leftNum现在跟num是一致的.
		newItem.count = leftNum

		//然后根据堆叠限制切割
		let items = this.splitItems(newItem, size)
		let leftItems = []
		let leftitem = {
				id: newItem.id,
				name: newItem.name,
				count: 0
			}

		//检测空格位置。有空间就塞，没有就把多余的扔地上/存储物柜/藏物点
		let Slots = this.getEmptySlots()
		if (Slots.total > 0){          
			leftItems = this.shiftSlots(Slots.slots, clone(items))

			//如果这里已经处理完了，根据最后处理的位置抛个提示
			if(leftItems.items.length == 0 ){
				return this.transferMsg[leftItems.last.pocket](last)
			}
		}

		//处理溢出的部分。
		//先统计一下总数
		leftitem.count = leftItems.items.reduce((result, item)=>{
			result += item.count; return result
		}, 0)

		//根据所在地点判断获取提示信息
	let html = this.dropOrTransferItems(leftitem)
	if(html){
		new Wikifier(null, `<<append #addMsg transition>>${html}<</append>>`)
	}

	},

	dropOrTransferItems(item){
		//根据所在地点判断
		if(V.location == 'home'){
			//在家就转移到家里仓库。
			this.storeItems('home', item.id, item.count)
			return this.transferMsg.home(item)
		}
		else if(V.location == 'farm'){
			//在农场里就转移到农场仓库
			this.storeItems('farmbarns', item.id, item.count)
			return this.transferMsg.farm(item)
		}
		//如果所在地有储物柜
		else if(this.hasLockers() && this.canStoreLockers(item.id)){
			this.storeItems('lockers', item.id, item.count)
			return this.transferMsg.lockers(item)
		}
		//如果所在地有藏物点
		else if(this.hidePoint[getLocation()]){
			let [place, storage] = this.hidePoint[getLocation()]
			this.storeItems(storage, item.id, item.count)
			return this.transferMsg[place](item)
		}
		//其他情况就无了。
		else{
			return this.transferMsg.ground(item)
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

	canStoreLockers(itemId){
		let itemlist = Object.keys(V.iStorage.lockers)
		return (itemlist.length < 20 && !itemlist.includes(itemId)) || itemlist.includes(itemId)
	},

	sortPocket(pocket, max){
		let items = []
		let leftItems = []
		for( let i=0; i < max; i++ ){
			let item = pocket[i]
			let size = iManager.getStackSize(item.id)
			if(item.count > size){
				let left = clone(item)
				item.count = size
				left.count -= size

				left = iManager.splitItems(left, size)
				leftItems.push(...left)
			}
			items.push(pocket.deleteAt[i])
		}
		if(pocket.length > 0){
			leftItems.push(...pocket)
		}

		return { items, leftItems }
	},

	//定期更新口袋和容器的堆叠，并进行爆衣检测。
	updatePockets(situation){
		//初始化
		if(!V.iManager.temp){
			this.saveSlotsStatus()
		}

		//先做爆衣检测        
		this.checkBroken()
		//然后保存当前slot状态
		this.saveSlotsStatus()

		//更新背包堆叠情况。如果爆了就清除多的物品并扔出提示文本
		let leftItems = []

		for(let i in V.iPockets){
			let res = this.sortPocket(V.iPockets[i], this.getMaxSlots(i))
			V.iPockets[i] = res.items
			leftItems.push(...res.leftItems)
		}

		//如果物品没有溢出就在这里结束，没有额外提示消息。
		if(leftItems.length == 0) return;

		//如果背包、手推车遗失，会在遗失判定时同时清理掉物品。
		//先整理多余物品到已有堆叠中
		leftItems.forEach((item)=>{
			let { total, stacks } = this.getStackFromPockets(item.id)
			if( total > 0 ){
				item.count = this.shiftStacks(stacks, item.count)
			}
		})
		//清理掉已清空的物品
		leftItems = leftItems.filter(item => item.count > 0)
		
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
				if(item.pocekt == 'body' && V.iManager.textevent.body == 1){
					html += lanSwitch('', '装在衣服口袋里的物品，伴随着衣服的破碎掉落到地上了。')
					V.iManager.textevent.body = 0
				}

				if(item.pocekt == 'body' && V.iManager.textevent.body == 2){
					html += lanSwitch('', '你更换了衣服，多余的物品被你整理出来。')
					V.iManager.textevent.body = 0
				}

				if(V.iManager.textevent.bag == 1 && item.pocekt == 'bag'){
					html += lanSwitch('', '你更换了个更小的背包，多余的物品被你整理出来。')
					V.iManager.textevent.bag = 0
				}

				if(V.iManager.textevent.cart == 1 && item.pocekt == 'cart'){
					html += lanSwitch('', '你更换了个更小的推车，多余的物品被你整理出来。')
					V.iManager.textevent.cart = 0
				}

				if(V.iManager.textevent.hole == 1 && item.pocekt == 'hole'){
					html += lanSwitch('', '你的淫荡度不足以将物品继续存放在肠道里。因为受到刺激，存放在肠内的物品被排放了出来。')
					V.iManager.textevent.hole = 0
				}

				html += this.dropOrTransferItems(item)
			})

			new Wikifier(null, `<<append #addMsg transition>>${html}<</append>>`)
		}

	},

	onEquip(pos, itemId){
		V.pocekt[pos+'type'] = itemId
		this.updatePockets()
	},

	onUnEquip(pos){
		V.pocket[pos+'type'] = 'none'
		this.updatePockets()
	},

	//检测装备状态并记录
	checkBroken(){
		if (this.getMaxSlots('body') < V.iManager.temp.body && this.getMaxSlots('body') >=4 ){
			V.iManager.status.body = 'changed';
			V.iManager.textevent.body = 2;
		}
		else if( this.getMaxSlots('body') < V.iManager.temp.body){
			V.iManager.status.body = 'broken';
			V.iManager.textevent.body = 1;
		}
		else if( this.getMaxSlots('body') >= V.iManager.temp.body && this.getMaxSlots('body') > 2 ){
			V.iManager.status.body = 'clotheson'
		}
		
		if( this.getMaxSlots('bag') < V.iManager.temp.bag && this.getMaxSlots('bag') > 0 ){
			V.iManager.status.bag = 'changed';
			V.iManager.textevent.bag = 1
		}
		else if(this.getMaxSlots('bag') >= V.iManager.temp.bag  && this.getMaxSlots('bag') > 0){
			V.iManager.status.bag = 'equiped';
		}

		if( this.getMaxSlots('cart') < V.iManager.temp.cart && this.getMaxSlots('cart') > 0 ){
			V.iManager.status.cart = 'changed'
			V.iManager.textevent.cart = 1
		}
		else if(this.getMaxSlots('bag') >= V.iManager.temp.cart && this.getMaxSlots('cart') > 0){
			V.iManager.status.cart = 'equiped'
		}

		if( this.getMaxSlots('hole') < V.iManager.temp.hole ){
			V.iManager.status.hole = 'fit';
			V.iManager.textevent.hole = 1;
		}
		else if(this.getMaxSlots('hole') > 0 ){
			V.iManager.status.hole = 'loose'
		}

	},

	saveSlotsStatus(){
		V.iManager.temp = {
			body: this.getMaxSlots('body'),
			bag:this.getMaxSlots('bag'),
			hole:this.getMaxSlots('hole'),
			cart:this.getMaxSlots('cart'),
		}
	},

	storeItems(location, itemId, num){
		if(!V.iStorage[location][itemId]){
			V.iStorage[location][itemId] = 0
		}

		V.iStorage[location][itemId] += num
		
		return V.iStorage[location][itemId]
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
		if(V.passage.includes('Commercial')) return 'commercialAlley'
		if(V.passage.includes('Industrial')) return 'industrialAlley'
		if(V.passage.includes('Residential')) return 'residentialAlley'
	}

	return V.location
}

window.getLocation = getLocation

const iMoney = {
	/**
	 * 获取可携带的最大金钱数额
	 * @returns {number}
	 */
	max : function(){
		let wallet = V.iPockets.wallettype
		let bag = Items.data[wallet]
		return  bag?.capacity ?? 500000
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
		V.money1 -= Math.clamp(V.money1 - value, 0, this.max());
		T.addMsg += this.giveMsg.lost(value)
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
		lost('bag')
	}
	//最后是手推车的
	if(!lostitem){
		lost('cart')
	}

	/*概率整个背包或手推车弄丢
	if(random(1000) >= 800){
		V.iPockets.bagtype = 'none'
		V.iPockets.bag = []
		message
	}
	if(random(1000) >= 800){
		V.iPockets.carttype = 'none'
		V.iPockets.cart = []
		message
	}
	*/

}



//tending_pick, tending_harvest收获/拾取农作物时的处理
function harvestHandle(){

}

$(document).on(':passageinit', ()=>{
	T.addMsg = ''; //弹出区的显示信息
	T.afterMsg = '';//addAfterMsg区的显示信息
})

$(document).on(':passagedisplay', ()=>{
	if(T.addMsg.length > 2){
		new Wikifier(null, `<<append #headerPopUp transition>>${T.addMsg}<br><</append>>`)
	}
	if(T.afterMsg.length > 2){
		new Wikifier(null, `<<append #addAfterMsg transition>>${T.afterMsg}<br><</append>>`)
	}
})
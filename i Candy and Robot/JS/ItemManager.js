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
const ItemPocket = ["body","bag","cart","hole"]


/**
 * @class
 * @param {string} itemId
 * @param {number} num
 */
function pocketItem(itemId, num){
    let data = CandyItems.get(itemId);
    if(!data) return;

    this.type = data.type
    this.id = data.id
    this.name = lanSwitch(data.name)
    this.count = num
}

const iManager = {
    /**
     * 获取物品的可堆叠大小
     * @param {string} itemId 
     * @returns {CandyItems}
     */
    getStackSize : function(itemId){
        let item = CandyItems.get(itemId)

        if(!item){
            console.error('error from get items stack size, id:', itemId)
            return 0
        }
        else if(!item.size){
            return 1
        }
        else if(V.iManager.disableStack === true ){
            return 10000000000000000 //应该完全禁用，但麻烦，干脆弄个除了作弊不会到达的数字。
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
    splitItems : function(item, stacksize){
        if(stacksize <= 0 || itecount <= stacksize) return [item];

        let totalCount = itecount;
        let items = []
        const resCount = totalCount % stacksize
        let splitItem =null;
        if(resCount > 0){
            splitItem =clone(item)
            splitItecount = totalCount;
            items.push(splitItem)
            totalCount -= resCount;
        }
        const itemCount = totalCount / stacksize;
        for (let index = 0; index < itemCount; index++) {
            splitItem = clone(item)
            splitItecount = stacksize
            items.push(splitItem)
        }
        return items
    },

    /**
     * 合并相同物品的堆叠
     * @param {Array<pocketItem>} pocket 
     */
    mergeSameItems : function(pocket){
    const sameItems= pocket.reduce((nowItem, { id, count } ,i)=>{
            if(nowItem.has(id)){
                var item = nowItem.get(id)
                item.addItem(count,i)
                return nowItem;
            }

            nowItem.set(getItemInfo(count, i))
            return nowItem;
        },new Map())
        
        const removeItemPos = []
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
     * @param {string} pos 
     * @param {Array<{name, count}>} itemlist 
     * @returns {string}
     */
    transferMessage : function(pos, itemlist){
        const message = this.transferMsg[pos];
        if( typeof message !== "function") return '';
        return itemlist.reduce((res,item)=>{
            res+= message(item)
            return res;
        },"")
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
            return this.checkBodySlots()
        },
        hole(){
            return currentSkillValue('promiscuity') > 80 ? 2 : 0
        },
        bag(){
            const bag = CandyItems.data[V.pockets.bagtype];
            return bag?.capacity ?? 0
        },
        cart(){
            const cart = CandyItems.data[V.pockets.carttype];
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
     * 获取可携带的最大金钱数额
     * @returns {number}
     */
    getMaxMoney : function(){
        let wallet = V.pockets.wallettype
        let bag = CandyItems.data[wallet]
        return  bag?.capacity ?? 500000
    },

    /**
     * 金钱进行变动时的处理
     * @param {number} value 
     */
    money : function(value){
        let left = V.money1 + value - getMaxMoney()
        V.money1 = Math.clamp(V.money1 + value, 0, getMaxMoney())

        if(left > 0){
            new Wikifier(
                'div#addMsg', 
                lanSwitch(
                `You have more money than you can carry, and you have to leave the extra ${left}£ where it is.`, 
                `你的钱多得拿不下了，多余的${left}£你只好留在原地。`
                )
            )
        }
    },

    /**
     * 在身上搜索物品，并返回对应物品的所有堆叠，以及相关信息
     * @param {string} itemId 
     * @returns { {total: number, stacks: Array<pocketItem>, path:Array<{ pos:string, index: number }>} }
     */
    getStackFromPockets : function(itemId){
        return ItemPocket.reduce((result, key)=>{

            const pocket = V.pockets[key]
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
            let pocket = V.pockets[key]
            let max = this.getMaxSlots(key)
            if(pocket.length < max ){
                let count = max - pocket.length
                result.slots.push( { pos: key, count } )
                result.total += count
            }
        }, { slots:[ ], total: 0 })
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
            let pocket = V.pockets[pos]
            let item
            for(let i=0; i < count; i++){
                item = result.items.pop()
                pocket.push(item)
                if(result.items.length == 0) break
            }
            result.lastPos = pos;
            result.lastCount = item.count
            return result
        }, { lastPos: '' , items, lastCount:0 })
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

            //如果这里已经处理完了，根据最后处理的口袋抛个提示
            if(leftItems.items.length == 0 ){
                leftitem = leftItems.lastCount
                return this.transferMsg[leftItems.lastPos](leftitem)
            }
        }

        //处理溢出的部分。
        //先统计一下总数
        leftitem.count = leftItems.reduce((total, item)=>{ total += item.count; return total }, 0)

        //根据所在地点判断获取提示信息
        return this.dropOrTransferItems(leftitem)

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
        if(V.iStorage.lockerOwned[getLocation()] == 0) return false;
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

    },

    onEquipBag(itemId){


        this.updatePockets()
    },

    onUnEquipBag(itemId){
        
        
        this.updatePockets()
    },

    checkBroken(){
        if( this.MaxSlots.body() < V.iManager.temp.body){
            V.iManager.status.body = 'broken';
            V.iManager.textevent.body = 1;
        }
        else if( this.MaxSlots.body() > 2 ){
            V.iManager.status.body = 'clotheson'
        }
        
        if( this.MaxSlots.bag() < V.iManager.temp.bag && this.MaxSlots.bag() == 0 ){
            V.iManager.status.bag = 'lost';
            V.iManager.textevent.bag = 1;
        }
        else if( this.MaxSlots.bag() < V.iManager.temp.bag && this.MaxSlots.bag() > 0 ){
            V.iManager.status.bag = 'change';
            V.iManager.textevent.bag = 2
        }

        else if( this.MaxSlots.hole < V.iManager.temp.hole ){
            V.iManager.status.hole = 'fit';
            V.iManager.textevent.hole = 1;
        }

    },

    saveSlotsStatus(){
        V.iManager.temp = {
            body: this.MaxSlots.body(),
            bag:this.MaxSlots.bag(),
            hole:this.MaxSlots.hole(),
            cart:this.MaxSlots.cart(),
        }
    },

    //被强奸后随机丢失物品，一定概率丢失背包钱包手推车
    lostItemsAfterRape(){

    },

    //数组和对象在DOL内部传递有蜜汁错误。所以从背包里传递过来的，是具体位置信息。
    useItems(pocket, pos){
        let item = V.pockets[pocket][pos]
        let data = CandyItems.get(item.id)
        if(data?.effects.length > 0){
            data.onUse()
        }
        item.count -= data.usage

        if(item.count == 0){
            pocket.deleteAt(pos)
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

//tending_pick, tending_harvest收获/拾取农作物时的处理
function harvestHandle(){

}
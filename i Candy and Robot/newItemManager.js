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

/**
 * 获取容器的大小
 * @param {string} itemId 
 * @returns {number}
 */

class iStacks {
    static getsize = getStackSize
    static add(itemId, num, diff){
        const stackLimit = iStacks.getsize(itemId)

        const items = [new iStacks(itemId, num, diff)]
        const count = Math.floor(num / stackLimit)
        const remain = num % stackLimit

        for(let i = 0; i < count; i++){
            items.push(new iStacks(itemId, stackLimit, diff))
        }
        if(remain > 0){
            items.push(new iStacks(itemId, remain, diff))
        }

        return items
    }

    constructor(itemId, num, diff){
        const data = Items.get(itemId)
        const { type, name, id } = data

        this.id = id;
        this.uid = id;

        this.type = type;
        this.name = lanSwitch(name);
        this.count = num;

        this.index = ['body', 0] //default

        if(diff){
            this.diff = diff;
            this.uid = `${id}_${diff}`
        }

        this.check = function(count){
            const stackLimit = iStacks.getsize(this.id)
            const available = stackLimit - this.count
            return Math.clamp(count, 0, available)
        }

        this.add = function(count){
            const stackLimit = iStacks.getsize(this.id)
            const available = stackLimit - this.count

            this.count += Math.clamp(count, 0, available)
            return count - available
        }

        this.remove = function(count){
            this.count -= Math.clamp(count, 0, this.count)
        }

        this.move = function(pos, index){
            this.index = [pos, index]
        }
    }
}

class iContainer {
    constructor( limit, type ){
        this.type = type
        this.equip = ''
        this.limit = limit

        this.items = []

        this.find = function(itemId){
            return this.items.filter(item => item.uid == itemId)
        }

        this.clear = function(){
            this.items = this.items.filter(item => item.count > 0 )
        }

        this.sort = function(){
            this.items.sort((a, b) => {
                if(a.type == b.type){
                    return a.name > b.name ? 1 : -1
                }
                else{
                    return a.type > b.type ? 1 : -1
                }
            })
        }

        this.count = function(itemId){
            return this.items.filter(item => item.uid == itemId).reduce((res, items) => {
                res.count += items.count
                res.stacks += 1
                return res
             }, { count: 0, stacks: 0 })
        }

        this.check = function(itemId, count){
            const stackLimit = iStacks.getsize(itemId)
            const countresult = this.count(itemId)

            let available = (this.limit - this.items.length) * stackLimit
                available += (stackLimit * countresult.stacks) - countresult.count

            return Math.min(count, available)
        }

        //check multiple items before add
        this.checkMulti = function(items){
            const result = items.map(item => this.check(item.id, item.count))
            return result.reduce((res, count) => res + count, 0)
        }
    }
}
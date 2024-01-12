//-----------------------------------------------------------------------
//
//                          Stack Class
//
//-----------------------------------------------------------------------
class iStack {
    /**
	 * 获取物品的可堆叠大小
	 * @param {string} itemId
	 * @returns {number}
	 */
    static getSize = function (itemId, mode) {
        const item = Items.get(itemId);
        const size = typeof item.size === 'number' ? item.size : setup.maxStacks[item.size];
        const config = iCandy.getConfig('storageStack') || 1;
	
        if (!item) {
            console.error('error from get items stack size, id:', itemId);
            return 0;
        }
        else if (!item.size) {
            return 1;
        }
	
        else if (mode == 'storage') {
            return Math.clamp(size * config , 1, 10000);
        }
	
        // 获取原始堆叠大小
        else if (mode == 'raw') {
            return size;
        }
	
        // 应该完全禁用，但麻烦，干脆弄个除了作弊不会到达的数字。
        else if (iCandy.getConfig('disableStack') === true) {
            return Math.pow(10, 20);
        }
	
        // 默认最大可能得堆叠上限为1k
        return Math.clamp(size * config, 1, 1000);
    };

    /**
	 * split stack
	 * @param {iStack} stack
	 * @param {number} size
	 * @returns
	 */
    static split = function (stack, size) {
        if (stack.count <= size) {
            return [stack];
        }

        const count = Math.floor(stack.count / size);
        const remain = stack.count % size;
        const stacks = [];

        for (let i = 0; i < count; i++) {
            stacks.push(new iStack(stack.id, size, stack.diff));
        }
        if (remain > 0) {
            stacks.push(new iStack(stack.id, remain, stack.diff));
        }

        return stacks;
    };

    /**
	 * set stack to inventory
	 * @param {string} itemId
	 * @param {number} num
	 * @param {string | void} diff
	 * @returns
	 */
    static set = function (itemId, num, diff) {
        const size = iStack.getSize(itemId);
        const stacks = iStack.split(new iStack(itemId, num, diff), size);
        return stacks;
    };

    /**
	 * merge same item stacks
	 * @param {iStack[]} stacks
	 */
    static merge = function (stacks) {
        const result = [];
        const map = {};
        console.log('merge stacks:', stacks);
        stacks.forEach(stack => {
            if (!map[stack.uid]) {
                map[stack.uid] = stack;
                result.push(stack);
            }
            else {
                map[stack.uid].count += stack.count;
            }
        });

        return result;
    };

    static add = function (items) {
        const result = [];
        items.forEach(item => {
            result.push(...iStack.set(item.id, item.count, item.diff));
        });
        return result;
    };

    /**
	 *
	 * @param {Items} data
	 * @param {string} itemId
	 * @param {number} num
	 * @param {string} diff
	 */
    constructor(itemId, num, diff) {
        const data = Items.get(itemId);
        if (!data) {
            throw new Error('no such item:', itemId);
        }

        this.id = data.id;
        this.name = lanSwitch(data.name);
        this.count = num;

        this.index = ['equip_body', 0];

        this.diff = diff;
        this.uid = diff ? `${this.id}_${diff}` : this.id;


        // check if the item can be stacked
        this.canStack = function () {
            return iStack.getSize(this.id) > 1;
        };

        // check if the stack isnot full then return the remain space
        this.remain = function () {
            return iStack.getSize(this.id) - this.count;
        };

        /**
		 * add to the stack and return the remain item count
		 * @param {number} num
		 * @returns
		 */
        this.add = function (num) {
            const limit = iStack.getSize(this.id);
            const count = this.count;
            this.count = Math.min(this.count + num, limit);
            return count + num - limit;
        };

        /**
		 * take required count from stack and return left required count
		 * @param {number} num
		 * @returns
		 */
        this.take = function (num) {
            const _count = this.count;
            this.count = Math.max(this.count - num, 0);
            return Math.abs(_count - num);
        };

        /**
		 * check if the stack can add the item and return the remain item count
		 */
        this.check = function (num) {
            const limit = iStack.getSize(this.id);
            return num - Math.clamp(this.count + num, 0, limit);
        };
    }
}

//-----------------------------------------------------------------------
//
//                          Pocket Class
//
//-----------------------------------------------------------------------
class Pocket {
    static maxSlot = {
        body() {
            if (!V.worn) return 4;

            let slot = 2; // 2 slot for hands
            const { upper, over_upper, lower } = V.worn;
			
            // lazy slot setting by worn type
            if (upper.name !== 'naked' || over_upper.name !== 'naked') {
                slot += 1;
            }

            if (lower.name !== 'naked') {
                slot += lower.variable == upper.variable ? 1 : 2;
            }

            // if hand held an item, then slot - 1
            if (iManager.getEquip('held')) {
                slot -= 1;
            }

            // if wallet has extraspace, then slot + 1
            if (iManager.getEquip('wallet')) {
                const id = iManager.getEquip('wallet').id;
                const item = Items.get(id);
                if (item.tags.includes('extraspace')) {
                    slot += 1;
                }
            }
            return slot;
        },

        hole() {
            if (currentSkillValue('promiscuity') >= 90) {
                return 2;
            }
            else if (currentSkillValue('promiscuity') >= 75) {
                return 1;
            }
		
            return 0;
        },
        /**
		 * get the max slot of the equips
		 * @param {string} type
		 * @returns {number}
		 */
        equip(type) {
            const item = iManager.getEquip(type);
            if (!item) {
                return 0;
            }
            const data = Items.get(item.id);
            return data.capacity || 0;
        },

        held() {
            return this.equip('held');
        },

        bag() {
            return this.equip('bag');
        },

        cart() {
            return this.equip('cart');
        }
    };
    /**
	 * get the max slot of the inventory
	 * @param {string} type
	 * @returns {number}
	 */
    static getMaxSlot(type) {
        const max = Pocket.maxSlot;
        if (!max[type]) {
            return 0;
        }
        return max[type]();
    }

    static list = ['body', 'hole', 'held',  'bag', 'cart'];

    /**
	 * get the inventory by type
	 * @param {string} type
	 * @returns {Pocket}
	 */
    static get(type) {
        if (this.list.includes(type)) {
            return V.iPockets[type];
        }
		
        return V.iStorage[type];
    }

    // recover the class from save data
    static recover(pocket) {
        const { type, pos, limitsize, slots } = pocket;
        const inventory = new Pocket(type, pos, limitsize);
        inventory.slots = slots.map(stack => {
            const { id, count, diff } = stack;
            return new iStack(id, count, diff);
        });
        return inventory;
    }

    // get all stack by item uid from all inventory
    static search(itemId) {
        return this.list.reduce((total, type) => {
            const inventory = this.get(type);
            const _stacks = inventory.getById(itemId);
            if (_stacks.length > 0) {
                total.total += _stacks.reduce((total, stack) => total + stack.count, 0);
                total.stacks.push(..._stacks);
            }
            return total;
        }, { total : 0, stacks : [] });
    }

    // get total empty slot number from all inventory
    static getRemain() {
        return this.list.reduce((total, type) => {
            const inventory = this.get(type);
            total += inventory.remains();
            return total;
        }, 0);
    }

    // merge all inventory stacks to an objcet
    static mergeObj() {
        const obj = {};
        this.list.forEach(type => {
            const inventory = this.get(type);
            inventory.slots.forEach(stack => {
                if (!obj[stack.uid]) {
                    obj[stack.uid] = stack;
                }
                else {
                    obj[stack.uid].count += stack.count;
                }
            });
        });
        return obj;
    }

    /**
	 *
	 * @param {string} type
	 * @param {string} position
	 * @param {number} limitsize
	 *
	 */
    constructor(type, position, limitsize) {
        this.type = type;
        this.pos = position;
        this.limitsize = limitsize;
        this.slots = [];
    }

    // ---------------------------------------------//
    //              inventory methods              //
    // ---------------------------------------------//
    max() {
        if (Pocket.list.includes(this.pos)) {
            this.limitsize = Pocket.getMaxSlot(this.pos) || 0;
            return this.limitsize;
        }
        return this.limitsize;
    }
    /**
	 *
	 * @returns {number} remain space
	 */
    remains() {
        return this.limitsize - this.slots.length;
    }

    /**
	 * get a stack by setting
     * @param { 'id'| 'uid' | ''type } prop
	 * @param {string} value must match the prop
	 * @returns {iStack | void}
	 */
    get(prop = 'uid', value) {
        return this.slots.filter(stack => stack[prop] == value)[0];
    }

    /**
	 * get all stacks of by setting
     * @param {'id'| 'uid' | ''type} prop
	 * @param {string} value must match the prop
	 * @returns {iStack[]}
	 */
    getAll(prop = 'uid', value) {
        return this.slots.filter(stack => stack[prop] == value);
    }

    /**
     * get by seleted index
     * @param {number} index
     * @returns
     */
    select(index) {
        return this.slots[index];
    }

    /**
	 *  sort the inventory by type and id
	 */
    sort() {
        this.slots.sort((a, b) => {
            if (a.type == b.type) {
                return a.id > b.id;
            }
            return a.type > b.type;
        });

        return this.slots;
    }

    /**
	 * update the index and return the stacks that the position is changed
	 */
    updateIndex() {
        const posChanged = [];
        this.slots.forEach((stack, i) => {
            const oldPos = stack.index[0].split('_')[1];

            stack.index = [`${this.type}_${this.pos}`, i];

            if (oldPos != this.pos) {
                posChanged.push(stack);
            }
        });

        return posChanged;
    }

    /**
	 * sort out the inventory, if the stack is empty then remove it
	 * if the stack is bigger than the stack size then split it
	 * if the slot is out of the limit then remove it
	 * @param { iStack[] } mergeItem
	 */
    sortOut(mergeItem = []) {
        const items = this.slots.filter(stack => stack.count > 0);
        items.push(...mergeItem);

        this.slots = [];
        const newslots = iStack.merge(items);
        const result = this.add(newslots);

        return result.overflow;
    }

    /**
	 * take out seleted stack from the inventory
	 * @param {number} pos
	 * @returns {iStack}}
	 */
    take(pos) {
        const stack = this.slots.splice(pos, 1)[0];
        return stack;
    }

    /**
     * take a few selected item from the inventory
     * @param {number} pos
     * @param {number} num the num won't bigger than the stack count
     * @returns { iStack }
     */
    takeSome(pos, num) {
        const stack = this.slots[pos];
        if (num > stack.count) {
            console.error('the num must lower or equal to the stack count.');
            return this.take(pos);
        }

        const item = new iStack(stack.id, num, stack.diff);
        stack.take(num);

        return item;
    }

    /**
	 * take out all specificd item from the inventory
	 * @param {'id' | 'uid' | 'type'} prop
	 * @param {string} value
	 * @returns {iStack[]}
	 */
    takeAll(prop = 'id', value) {
        const stacks = this.getAll(prop, value);

        if (stacks.length == 0) {
            return;
        }
        const result = [];
        stacks.forEach(stack => {
            result.push(...this.slots.splice(stack.index[1], 1));
        });
        return result;
    }

    /**
	 * merge the item to old stacks before add to the inventory
	 * @param {iStack[]} itemStacks
	 * @returns {iStack[]}
	 */
    merge(itemStacks) {
        return itemStacks.reduce((remains, itemStack) => {
            const sameStack = this.getAll('uid', itemStack.uid);
            let remain = itemStack.count;

            // merge to the same stack
            if (sameStack.length > 0) {
                sameStack.forEach(stack => {
                    remain = stack.add(remain);
                });
            }

            if (remain > 0) {
                remains.push(new iStack(itemStack.id, remain, itemStack.diff));
            }

            return remains;
        }, []);
    }

    /**
	 * add item to the inventory and return the remains
	 * @param {iStack | iStack[]} stack
	 * @returns { overflow: iStack[], total: number }
	 */
    add(itemStacks) {
        if (Array.isArray(itemStacks) == false) {
            itemStacks = [itemStacks];
        }

        const result =  {
            overflow : itemStacks,
            total    : itemStacks.reduce((total, stack) => total + stack.count, 0)
        };

        if (this.remains() == 0) {
            return result;
        }

        // merge the item to the same stack before add to the inventory
        itemStacks = this.merge(itemStacks);

        result.overflow = [];
        result.total = 0;

        return itemStacks.reduce((result, item) => {
            // add to the empty slot
            const stacks = iStack.set(item.id, item.count, item.diff);
            const count = this.remains();
			
            for (let i = 0; i < count; i++) {
                const stack = stacks.pop();
                this.slots.push(stack);

                if (stacks.length == 0) {
                    break;
                }
            }
            result.overflow.push(...stacks);
            result.total += stacks.reduce((total, stack) => total + stack.count, 0);
            return result;
        }, result);
    }

    /**
	 * check the availability of the items
	 * @param {iStack} stack
	 * @returns {avaliable: boolean, overflow:number, costslot: number, availableSlot: number}
	 */
    check(itemStacks) {
        const remainSlot = this.remains();
        let _stacks = clone(itemStacks);

        if (Array.isArray(_stacks) == false) {
            _stacks = [_stacks];
        }

        iManager.mergeCheck(this, _stacks);
        
        console.log('check itemStacks:', _stacks);
        // calculate the total cost slot
        const costSlot = iManager.calcCostSlots(_stacks);

        const result = {
            costslot,
            availableSlot : remainSlot,
            overflow      : costSlot - remainSlot,
            avaliable     : costSlot <= remainSlot
        };

        return result;
    }
}

Object.defineProperties(window, {
    iStack : {
        value        : iStack,
        writable     : false,
        enumerable   : true,
        configurable : false
    },
    Pocket : {
        value        : Pocket,
        writable     : false,
        enumerable   : true,
        configurable : false
    }
});

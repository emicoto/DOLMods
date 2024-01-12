//-----------------------------------------------------------------------
//
//                          Management Functions
//
//-----------------------------------------------------------------------
const iManager = {

    //--------------------------------------------------------------
    //                     fast access functions
    //--------------------------------------------------------------

    /**
	 * get the current equiped container
	 * @param {string} type
	 * @returns {  iStack | void }
	 */
    getEquip(type) {
        if (V.iPockets.equip[type].id !== 'none') {
            return V.iPockets.equip[type];
        }
    },

    /**
	 * set container to equip slot
	 * @param {string} type
	 * @param {iStack} item
	 */
    setEquip(type, item) {
        V.iPockets.equip[type] = item;
    },

    /**
	 * unset container from equip slot
	 * @param {string} type
	 */
    unsetEquip(type) {
        V.iPockets.equip[type] = { type : 'misc', id : 'none', name : 'none' };
    },

    getState(type) {
        return V.iPockets.states[type];
    },

    setState(type, state) {
        V.iPockets.states[type] = state;
    },

    getSavedSize(type) {
        return V.iPockets.savedSize[type];
    },

    setFlag(type, flag) {
        V.iPockets.flag[type] = flag;
    },

    getFlag(type) {
        return V.iPockets.flag[type];
    },
	
    // --------------------------------------------------------------//
    //                     item management                          //
    // --------------------------------------------------------------//
	
    // sanitize the item stack
    format(stack, num, diff) {
        if (Array.isArray(stack) == false && String(stack) == '[object Object]') {
            stack = [stack];
        }
        else if (typeof stack == 'string') {
            const id = stack;
            const data = Items.get(id);
            if (!data) {
                console.error('error from iManager.format, no such item:', id);
                return [];
            }
            if (!num) {
                num = data.num;
            }
            stack = [new iStack(id, num, diff)];
        }

        if (Array.isArray(stack) == true && stack.length > 0) {
            return stack;
        }

        console.error('error from iManager.format, no available item stack:', stack, 'num:', num, 'diff:', diff);
        return [];
    },

    calcCostSlots(items) {
        return items.reduce((total, item) => {
            const size = iStack.getSize(item.id);
            total += Math.ceil(item.count / size);
            return total;
        }, 0);
    },

    mergeCheck(pocket, items) {
        const remains = [];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            // calculate the total cost slot
            const size = iStack.getSize(item.id);
            const sameStack = pocket.getAll('uid', item.uid);
            let remain = item.count;

            // check if can be merged to the same stack
            if (sameStack.length > 0) {
                const total = sameStack.reduce((total, stack) => {
                    total += stack.count;
                }, 0);
                remain = size * sameStack.length - total;
                item.count = remain;
            }

            if (remain > 0) {
                // delete the item from items if it can be merged to the same stack
                remains.push(item);
            }
        }
        return remains;
    },

    checkAvailable(items, num, diff) {
        let itemStacks = this.format(items, num, diff);
        let costSlot = 0;
        const availableSlot = Pocket.getRemain();

        if (itemStacks.length == 0) {
            return {
                available : false,
                overflow  : -1,
                costSlot  : -1,
                message   : 'no item to check'
            };
        }
        if (availableSlot == 0) {
            return {
                available : false,
                overflow  : itemStacks.length,
                costSlot  : -1,
                message   : 'no space'
            };
        }

        // before check the pockets, check if the item can be merged to the same stack
        Pocket.list.forEach(type => {
            const pocket = Pocket.get(type);
            itemStacks = this.mergeCheck(pocket, itemStacks);
        });
        
        costSlot += this.calcCostSlots(itemStacks);

        const available = costSlot <= availableSlot;
        const result = {
            available,
            overflow : costSlot - availableSlot,
            costSlot,
            availableSlot,
            message  : available ? 'item-added' : 'no-space'
        };
        return result;
    },

    /**
	 * send the stacks to global inventory
	 * @param {iStack[]} itemStacks
	 */
    sendGlobal(itemStacks) {
        const storage = Pocket.get('global');

        for (const i in itemStacks) {
            const id = itemStacks[i].uid;

            if (!storage.items[id]) {
                storage.items[id] = itemStacks[i];
            }
            else {
                storage.items[id].count += itemStacks[i].count;
            }
        }

        this.updateGlobal();
    },
    /**
     * update global inventory
     */
    updateGlobal() {
        const storage = Pocket.get('global');

        // turn items object to array then set to slots
        const items = Object.values(storage.items);
        storage.slots = items;
    },

    /**
	 * add an item to the inventory
	 * @param {string} itemId
	 * @param {number} num
	 * @param {string | void} diff
	 * @returns
	 */
    getItem(itemId, num, diff) {
        const data = Items.get(itemId);
        if (!data) {
            console.error('error from iManager.getItem, no such item:', itemId);
            return;
        }

        const stack = new iStack(itemId, num, diff);
        const result = this.onGetItems(stack, 'getone');
        return result;
    },

    /**
	 * on get items event, add items to the inventory and return the message
	 * @param {iStack[]} stacks
	 * @param {string} situation
	 * @returns {string}
	 */
    onGetItems(stacks, situation) {
        const itemStacks = this.format(stacks);
        let html = '';

        if (situation == 'unequip') {
            return this.addItems(itemStacks);
        }

        // 获取物品的提示
        if (situation == 'getone') {
            html = P.templet(sMsg.getItems, itemStacks[0].name, itemStacks[0].count);
        }
        else if (situation == 'getmulti') {
            stacks.forEach(item => {
                html += P.templet(sMsg.getItems, item.name, item.count);
            });
        }
        // if pockets be disabled then throw all items to global inventory
        if (iCandy.getConfig('disablePockets') === true) {
            this.sendGlobal(itemStacks);
            return html;
        }

        const overflow = this.addItems(itemStacks);
        console.log('on get items:', itemStacks, overflow);

        // check if overflow
        if (overflow.length > 0) {
            overflow.forEach(stack => {
                html += this.dropOrTransfer(stack);
            });
        }

        return html;
    },

    addItems(itemStacks) {
        let overflow = itemStacks;
	
        // search all pockets if the item can be added
        for (const i in Pocket.list) {
            const pocket = Pocket.get(Pocket.list[i]);
            const result = pocket.add(itemStacks);
	
            if (result.overflow.length > 0) {
                overflow = result.overflow;
            }
            else {
                overflow = [];
                break;
            }
        }
	
        if (overflow.length > 0) {
            return overflow;
        }

        return [];
    },

    /**
	 * drop a selected item
	 * @param {string} type
	 * @param {number} pos
	 * @returns {iStack | void}
	 */
    drop(type, pos) {
        const pocket = Pocket.get(type);
        const item = pocket.take(pos);
        return item;
    },

    /**
	 * drop all items that match the property
	 * @param {string} type must in the list: body, bag, cart, hole, held, global
	 * @param {*} prop search property
	 * @param {*} value match value
	 * @returns
	 */
    dropAll(type, prop , value) {
        const pocket = Pocket.get(type);
        const items = pocket.takeAll(prop, value);
        return items;
    },

    randomDrop(type, num) {
        const pocket = Pocket.get(type);
        for (let i = 0; i < num; i++) {
            const index = Math.floor(Math.random() * pocket.slots.length);
            pocket.take(index);
        }
        return items;
    },
	
    /**
	 * remove an item from the inventory then return the message
	 * @param {string} type
	 * @param {number} pos
	 * @returns
	 */
    onRemove(type, pos) {
        const item = this.drop(type, pos);
        return P.templet(sMsg.dropItem, item.name, item.count);
    },

    // save the current limit size of the pockets
    saveSize() {
        const savedSize = {};
        Pocket.list.forEach(type => {
            savedSize[type] = Pocket.get(type).limitsize;
        });
        V.iPockets.savedSize = savedSize;
    },

    // update the pockets states
    updateState(type) {
        const equip = Pocket.get(type);
        if (!equip) return;

        const size = equip.max();
        const savedSize = this.getSavedSize(type);

        if (type == 'body') {
            if (size < savedSize && size >= 4) {
                this.setState(type, 'changed');
                this.setFlag(type, 2);
            }
            else if (size < savedSize) {
                this.setState(type, 'exposed');
                this.setFlag(type, 1);
            }
            else if (size >= savedSize && size >= 4) {
                this.setState(type, 'equiped');
            }
        }
        else if (type == 'hole') {
            if (size < savedSize) {
                this.setState(type, 'tighten');
                this.setFlag(type, 1);
            }
            else if (size > savedSize) {
                this.setState(type, 'loosen');
            }
        }
        else {
            if (size < savedSize && size > 0) {
                this.setState(type, 'changed');
                this.setFlag(type, 1);
            }
            else if (size >= savedSize) {
                this.setState(type, 'equiped');
            }
        }
    },

    // make a message from the stacks transfered
    transMsg(stacks) {
        if (!Array.isArray(stacks)) {
            stacks = [stacks];
        }

        return stacks.reduce((message, stack) => {
            let pos = stack.index[0];

            // if the item index format is 'type_pos', then split it
            if (pos.split('_').length > 1) {
                pos = pos.split('_')[1];
            }

            // get the message from systemMsg.js
            const msg = sMsg.transferMsg[pos];

            if (typeof msg == 'function') {
                message += `${msg(stack)}<br>`;
            }
            else {
                message += `${P.templet(msg, stack.name, stack.count)}<br>`;
            }
            return message;
        }, '');
    },

    sortOutEvent() {
        let html = '';

        Pocket.list.forEach(type => {
            if (type == 'body') {
                if (this.getFlag('body') == 1) {
                    html += `${lanSwitch(sMsg.sortOutMsg.body_broken)}<br>`;
                }
                else if (this.getFlag('body') == 2) {
                    html += `${lanSwitch(sMsg.sortOutMsg.body_changed)}<br>`;
                }
            }
            else {
                if (this.getFlag(type) == 1) {
                    html += `${lanSwitch(sMsg.sortOutMsg[type])}<br>`;
                }
            }

            this.setFlag(type, 0);
        });

        return `${html}<br>`;
    },

    updatePockets() {
        if (!V.iPockets.saveSize) {
            this.saveSize();
        }

        // 先检测当前装备的容器是否有容量变化
        Pocket.list.forEach(type => {
            const pocket = Pocket.get(type);
            const max = Pocket.getMaxSlot(type);
	
            if (pocket.limitsize != max) {
                this.updateState(type);
                pocket.limitsize = max;
            }
        });

        // 更新上限记录
        this.saveSize();
	
        // 整理所有物品，超出堆叠上限的物品会被分堆
        // 如果分堆后的物品又超出了容量上限，则会被自动转移或者丢弃
        let remainItems = [];
        const updateItems = [];

        for (const i in Pocket.list) {
            const pocket = Pocket.get(Pocket.list[i]);
	
            const remain = pocket.sortOut(remainItems);
            if (remain.length > 0) {
                remainItems = remain;
            }
            pocket.sort();
            updateItems.push(...pocket.updateIndex());
        }

        // 如果没有超出容量限制的物品，或没有位置变动的情况，则不需要给与玩家提示
        if (remainItems.length == 0 && updateItems.length == 0) return '';

        const html = [];

        // 根据位置变动，给与玩家提示
        if (updateItems.length > 0) {
            html.push(this.transMsg(updateItems));
        }

        console.log('on update Pockets:',updateItems, remainItems);

        // 如果有多余的物品，则根据情况判断是扔掉还是转移
        if (remainItems.length > 0) {
            html.push(this.sortOutEvent());

            remainItems.forEach(stack => {
                html.push(this.dropOrTransfer(stack));
            });
        }
		
        if (html.length > 0) {
            return `${html.join('<br>')}<br>`;
        }
    },

    dropOrTransfer(stack) {
        // eslint-disable-next-line no-nested-ternary
        let storage = V.location == 'home' ? Pocket.get('home') : V.location == 'farm' ? Pocket.get('farm') : Pocket.get('lockers');

        // 根据所在地点判断, 如果是家里或者农场，则转移至仓库
        if (V.location.has('home', 'farm') && storage.check(stack) == true) {
            stack.index = [`storage_${V.location}` , storage.slots.length];
            storage.add(stack);
            return this.transMsg(stack);
        }

        // 如果所在地有储物柜，则转移到储物柜
        if (F.hasLockers() && storage.check(stack) == true) {
            stack.index = ['storage_lockers' , storage.slots.length];
            storage.add(stack);
            return this.transMsg(stack);
        }

        // 如果所在地有藏物处，则转移到藏物处
        const [type, fullname] = F.getHideOut();
        storage = Pocket.get(fullname);

        if (storage.check(stack) == true) {
            stack.index = [type , storage.slots.length];
            storage.add(stack);
            return this.transMsg(stack);
        }

        // 都没有的话，就扔掉
        return P.templet(sMsg.transferMsg.ground, stack.name, stack.count);
    },

    //--------------------------------------------------------------
    //					 item usage
    //--------------------------------------------------------------
    /**
	 * Equip item from the inventory
	 * @param {string} type
	 * @param {number} pos
	 */
    onEquip(type, pos, equip) {
        const item = Pocket.get(type).take(pos);
        if (this.getEquip(equip)) {
            this.onUnEquip(equip);
        }

        this.setEquip(equip, item);
        this.updatePockets();
    },
	
    onUnEquip(type) {
        const item = this.getEquip(type);
        if (!item) {
            return;
        }

        this.unsetEquip(type);

        this.onGetItems(item, 'unequip');
        this.updatePockets();
    },

    /**
	 * useItem
	 * @param {Items} data
	 */
    useItem(data, times, situation) {
        const { type, effects } = data;
        const passtime = iData.itemUseTime[type] || 1;

        let params = '';

        // if has use effect
        if (effects && effects.length > 0 && typeof data.onUse != 'function') {
            params = data.doEffects(times);
        }

        else if (typeof data.onUse == 'function') {
            params = data.onUse(times, situation);
        }

        // if use from inventory set the passtime
        if (situation?.includes('use')) {
            V.tvar.passtime = passtime;
        }

        return params;
    },

    // use item from inventory
    useFromInv(type, pos, situation = 'use') {
        const pocket = Pocket.get(type);
        const item = pocket.select(pos);
        const data = Items.get(item.id);
		
        if (!data) {
            console.error('error from iManager.useFromInv, no such item:', item.id);
            return 'Error: no item data found.';
        }
		
        const msg = this.onUseItem(item, situation);
        console.log(pocket, item);

        pocket.sortOut();

        return msg;
    },


    // default is use item from inventory,
    // if situation is specified then use item from the situation,
    // the type will be the item id and pos will be the item count
    onUseItem(stack, situation) {
        const item = stack || new iStack(itemId, 1);
        let data = Items.get(item.id);

        // if the item is alias then get original item data by alias
        if (data && data.alias) {
            data = Items.get(data.alias);
        }

        // if the item data is not available then return
        if (!data) {
            console.error('error from iManager.onUseItem, no such item:', item.id);
            return;
        }

        let params = '';
        let msg = '';
        let dropMsg = '';
        const usage = data.usage || 1;
        const times = situation == 'useall' ? Math.ceil(item.count / usage) : 1;

        console.log('on use item:', situation, times, usage);

        switch (situation) {
        case 'enemy':
            params = this.useItem(data, 1, situation);
            return params;

            // current version has not effect to npc
        case 'apply-to-npc':
            item.count -= usage;
            return '';

        case 'use':
        case 'useall':
            item.count = Math.max(item.count - usage * times, 0);

            if (typeof data.drop == 'object') {
                dropMsg = this.onItemDrop(data.drop, times);
            }
            params = this.useItem(data, times, situation);
        }

        // throw the item use message and event
        if (situation?.includes('use')) {
            msg += P.templet(sMsg.useItem, data.name, iData.useMethods(data.type, data.tags));

            if (itemMsg[data.id]) {
                msg += `<br>${lanSwitch(itemMsg[data.id])}`;
            }

            msg +=  params;

            if (dropMsg) {
                msg += `<br>${dropMsg}`;
            }
        }


        return msg;
    },

    onItemDrop(drop, times = 1) {
        let msg = '';
        const itemStacks = [];
		
        if (Array.isArray(drop) == false) {
            drop = [drop];
        }
        drop.forEach(item => {
            const num = item.num || 1;
            const itemStack = new iStack(item.item, num * times , item.diff);
            itemStacks.push(itemStack);
        });

        msg = this.onGetItems(itemStacks, drop.length > 1 ? 'getmulti' : 'getone');

        return msg;
    },

    takeSelected(type, position, amount = 1) {
        const pocket = Pocket.get(type);
        const item = pocket.takeSome(position, amount);
		
        pocket.sortOut();

        return item;
    }
};


// define the global variable
Object.defineProperties(window, {
    iManager : {
        value        : iManager,
        writable     : false,
        enumerable   : true,
        configurable : false
    },

    im : {
        get() {
            return iManager;
        }
    }
});

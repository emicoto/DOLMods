
class iStack {
    constructor(id, count, obj) {
        const data = Items.get(id);
        if (!data) {
            throw new Error(`Item with id ${id} not found`);
        }

        this.id = data.id;
        this.type = data.type;
        this.uid = data.id;
        this.count = count;

        console.log(`Created stack of ${count} ${data.name}`);
        const { uid, index, diff, unit } = obj;

        if (uid) {
            this.uid = uid;
        }
        else if (diff) {
            this.uid = `${data.id}_${diff}`;
        }

        if (unit) {
            this.unit = unit;
        }

        this.index = index ?? ['body', 0];
    }

    // get the item data
    get data() {
        return Items.get(this.id);
    }

    // get the item size
    get size() {
        return InvUtil.getMaxSize(this.id);
    }

    // check if the item can be stacked
    canStack() {
        return InvUtil.getMaxSize(this.id) > this.count;
    }

    // check if the stack isnot full then return the remain space
    remain() {
        return InvUtil.getMaxSize(this.id) - this.count;
    }


    /**
     * add to the stack and return the remain item count
     * @param {number} num
     * @returns
     */
    add(num) {
        const limit = this.size;
        const count = this.count;
        this.count = Math.clamp(this.count + num, 0, limit);
        
        if (count + num > limit) {
            return Math.abs(count + num - limit);
        }
        return 0;
    }

    /**
     * take required count from stack and return left required count
     * @param {number} num
     * @returns
     */
    take(num) {
        const _count = this.count;
        this.count = Math.max(this.count - num, 0);

        if (_count < num) {
            return Math.abs(_count - num);
        }
        return 0;
    }

    parent() {
        // eslint-disable-next-line no-use-before-define
        return Inventory.get(this.index[0]);
    }
}

class Inventory {
    static get(keyPath) {
        const [type, slot] = keyPath.split('_');
        if (!V.SFInv[type] || !V.SFInv[type][slot]) {
            throw new Error(`Inventory with id ${keyPath} not found`);
        }

        return V.SFInv[type][slot];
    }
    /**
     *
     * @param {string} type
     * @param {string} slot
     * @param {number} size
     */
    constructor(type = 'pc', slot = 'backpack', size = 12) {
        this.invId = `${type}_${slot}`;
        this.limitsize = size;
        this.slots = [];
    }

    // ---------------------------------------------//
    //              inventory methods               //
    // ---------------------------------------------//
    set(prop, value) {
        this[prop] = value;
    }

    max() {
        return this.limitsize;
    }

    remain() {
        return this.limitsize - this.slots.length;
    }

    count() {
        return this.slots.length;
    }

    clear() {
        this.slots = [];
    }

    canStore() {
        return this.remain() > 0;
    }

    canStoreItem(stackNum) {
        return this.remain() >= stackNum;
    }

    display() {
        const html = [];
        this.slots.forEach(stack => {
            const { id, count } = stack;
            const data = Items.get(id);
            const name = lanSwitch(data.name);
            html.push(`${name} x ${count}`);
        });
        return html;
    }

    /**
     * get the stack by id, uid or type
     * @param {'id' | 'uid' | 'type'} prop
     * @param {string} value
     * @returns {iStack | undefined}
     */
    get(prop = 'uid', value) {
        return this.slots.find(stack => stack[prop] === value);
    }

    /**
     * get all stacks by id, uid or type
     * @param {'id' | 'uid' | 'type'} prop
     * @param {string} value
     * @returns {iStack[]}
     */
    getAll(prop = 'type', value) {
        return this.slots.filter(stack => stack[prop] === value);
    }

    /**
     * count the total number of items in the inventory
     * @param {string} itemId
     * @returns {number}
     */
    has(itemId) {
        return this.slots.reduce((total, stack) => {
            if (stack.id === itemId) {
                return total + stack.count;
            }
            return total;
        }, 0);
    }

    /**
     * get by index
     * @param {number} index
     * @returns {iStack}
     */
    select(index) {
        return this.slots[index];
    }

    /**
	 *  sort the inventory and update index
	 */
    sort() {
        this.slots.sort((a, b) => {
            if (a.type == b.type) {
                return a.id > b.id;
            }
            return a.type > b.type;
        });

        const key = this.invId;

        this.slots.forEach((stack, index) => {
            stack.index = [key, index];
        });
    }

    // take whole stack from inventory
    take(pos) {
        return this.slots.splice(pos, 1)[0];
    }

    // take a part from a stack
    // should finish check availability before calling this method
    tackPart(pos, num) {
        if (num > this.slots[pos].count) {
            throw new Error('the required number is greater than the stack count');
        }

        const stack = this.slots[pos];
        stack.take(num);
        return new iStack(stack.id, num);
    }
}

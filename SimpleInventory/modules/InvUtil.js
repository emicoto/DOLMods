const InvUtil = (() => {
    'use strict';

    // export function
    
    function _getPalam(param, value) {
        if (param == 'aphrod') {
            InvUtil.getPalamV('drugged', value);
            return 'drugged';
        }
        
        if (param == 'drunk') {
            InvUtil.getPalamV('drunk', value);
            return 'alcohol';
        }

        wikifier(param, value, param == 'arousal' ? 'genital' : null);
        return param;
    }

    function _getPalamV(param, value) {
        if (!V.statFreeze && setup.palamlist.includes(param)) {
            V[param] = Math.clamp(V[param] + value, 0, 10000);
        }
    }

    function _printPalam(param, value) {
        let gl = 'l';
        let count = 1;
        if (value > 0) {
            gl = 'g';
        }

        value = Math.abs(value);

        if (value > 30) {
            count = 3;
        }
        else if (value > 20) {
            count = 2;
        }

        if (param == 'hunger' || param == 'thirsty') {
            if (value >= 500) {
                count = 3;
            }
            else if (value >= 200) {
                count = 2;
            }
        }

        if (palam == 'hallucinogen') {
            palam = 'hallucinogens';
        }
        if (palam == 'thirsty') {
            palam = 'thirst';
        }
    
        return `<<${gl.repeat(count)}${palam}>>`;
    }

    function _getMaxSize(itemId, mode = 'inv') {
        const itemData = Items.get(item);
        const size = SFInventory.maxsize(itemData.size);
        const { maxsize, boostsize, disableStack } = SFInventory.config;
        
        if (!itemData) {
            console.error(`Item with id ${itemId} not found`);
            return 0;
        }
        else if (size == null) {
            return 1;
        }
        else if (disableStack) {
            // if disabled stacking return a super large number
            return Math.pow(10, 20);
        }
    
        
        if (mode == 'raw') {
            return size;
        }
    
        return Math.clamp(size * boostsize, 1, maxsize);
    }

    function _organizeInv(Inv) {
        const remove = [];
    
        Inv.slots.forEach((stack, index) => {
            const { id } = stack;
            const same = Inv.slots.filter((stk, i) => stk.id === id && i !== index);
            if (same.length > 0) {
                same.forEach(stk => {
                    if (stk.canStack() && stack.count > 0) {
                        const remain = stk.add(stack.count);
                        stack.take(remain);
                    }
                });
            }
            if (stack.count === 0) {
                remove.push(stack);
            }
        });
    
        if (remove.length > 0) {
            remove.forEach(stack => {
                Inv.slots.delete(stack);
            });
        }
    
        Inv.sort();
    }
    
    function _sanityCheck(Inv, stack) {
        if (Inv instanceof Inventory === false && Inv instanceof Object === true && Inv.invId) {
            // recover the instance if object is not an instance of Inventory
            const [type, pos] = Inv.invId.split('_');
            const _inv = new Inventory(type, pos, Inv.limitsize);
            _inv.slots = Inv.slots.map(stack => new iStack(stack.id, stack.count, stack));
            Inv = _inv;
        }
    
        if (stack && stack instanceof iStack === false && stack instanceof Object === true && stack.id) {
            stack = new iStack(stack.id, stack.count, stack);
        }
    
        return [Inv, stack];
    }
    
    // should add a single stack to the inventory
    function _mergeStack(Inv, stack) {
        [Inv, stack] = _sanityCheck(Inv, stack);
    
        // merge to same stacks if possible
        const same = Inv.getAll('uid', stack.uid);
        if (same.length > 0) {
            same.forEach(stk => {
                if (stk.canStack()) {
                    const remain = stk.add(stack.count);
                    stack.take(remain);
                }
            });
        }
    
        return [Inv, stack];
    }
    
    // split the stack if it's count is more than the limit
    function _splitStack(stack) {
        if (stack.count <= stack.size) {
            return [stack];
        }
    
        const count = Math.floor(stack.count / stack.size);
        const remainder = stack.count % stack.size;
        const stacks = [];
        for (let i = 0; i < count; i++) {
            stacks.push(new iStack(stack.id, stack.size, stack));
        }
        if (remainder > 0) {
            stacks.push(new iStack(stack.id, remainder, stack));
        }
    
        return stacks;
    }
    
    // should add a single stack to the inventory
    function _addStack(Inv, stack) {
        if (stack.count <= 0) {
            console.error('Cannot add stack with zero count:', stack);
            return;
        }
    
        [Inv, stack] = _sanityCheck(Inv, stack);
        [Inv, stack] = _mergeStack(Inv, stack);
    
        if (stack.count === 0) {
            return true;
        }
    
        const result = {
            overflows : _splitStack(stack),
            total     : stack.count
        };
    
        if (Inv.remain() == 0) {
            console.warn('Inventory is full:', Inv);
            return result;
        }
        
        const remain = Inv.remain();
    
        for (let i = 0; i < remain; i++) {
            Inv.slots.push(stack[i]);
            stack.delete(stack[i]);
        }
    
        result.overflows = stack;
        result.total = stack.reduce((total, stk) => { total + stk.count; }, 0);
    
        if (result.total > 0) {
            console.log('has overflows:', result);
            return result.overflows;
        }
    
        return true;
    }
    
    // before addstack check if the stack can be merge and add
    // Each item should be added to the inventory one by one, not a bunch of them at once.
    function _mergeCheck(Inv, stack) {
        Inv = _sanityCheck(Inv)[0];
    
        const availableSlots = Inv.remain();
        const stacks = clone(stack);
    
        const same = clone(Inv.getAll('uid', stack.uid));
        if (same.length > 0) {
            same.forEach(stk => {
                if (stk.canStack()) {
                    const remain = s.add(stacks.count);
                    stacks.take(remain);
                }
            });
        }
    
        if (stacks.count === 0) {
            return true;
        }
        
        if (availableSlots === 0) {
            return false;
        }
    
        return true;
    }
    
    // try adding a bunch of items to the inventory
    function _addBunchItems(Inv, itemStacks) {
        Inv = _sanityCheck(Inv)[0];
        
        const remain = [];
    
        for (let i = 0; i < itemStacks.length; i++) {
            const stack = itemStacks[i];
            const canMerge = _mergeCheck(Inv, stack);
            if (canMerge) {
                const remain = _addStack(Inv, stack);
                if (remain !== true) {
                    // add to last of the itemStacks for next iteration
                    itemStacks.push(...remain);
                }
            }
            else {
                remain.push(stack);
            }
        }
    
        if (remain.length > 0) {
            console.log('Remaining items:', remain);
            return remain;
        }
    
        return true;
    }
    
    return {
        getPalam      : _getPalam,
        getPalamV     : _getPalamV,
        printPalam    : _printPalam,
        getMaxSize    : _getMaxSize,
        organizeInv   : _organizeInv,
        sanityCheck   : _sanityCheck,
        mergeStack    : _mergeStack,
        splitStack    : _splitStack,
        addStack      : _addStack,
        mergeCheck    : _mergeCheck,
        addBunchItems : _addBunchItems
    };
})();

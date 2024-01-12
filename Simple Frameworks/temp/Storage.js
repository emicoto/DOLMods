
// 物品管理

// 获取当前应有格子数
setup.maxStacks = {
    pill   : 50,
    inject : 10,

    micro  : 36,
    tiny   : 18,
    small  : 9,
    medium : 3,
    big    : 1
};

/**
 * 物品系统处理逻辑：
 * 所有物品都有堆叠限制
 * 每次操作过后会自动更新身上所有容器
 * 裸体时格子2，穿上衣服时+1～3，淫乱>=80时启用肠道空间（2格）
 * 背包容量根据装备设定
 * 折叠推车容量根据装备设定
 *
 * 获取物品时，如果超过可携带数量，多余的会放到地上，并显示提示文本（显示物品名称和掉落数量）
 * 整理物品时，也会显示整理的提示文（只显示名称）
 *
 * 当衣服破掉时，物品会从最后位开始掉落，并显示提示文本（显示物品名称和掉落数量）
 * 遭遇强奸时，强奸场景结束后会随机掉落物品。
 * 如果携带着毒品类，会优先掉落毒品（type:drugs)
 * 如果没找到毒品，则从物品堆里随机抽一个掉落
 *
 * 如果在安全屋里，掉落物品会直接放回V.iStorage[safehouse]
 * 如果在有储物柜的地方，掉落物品会存放到已拥有的储物柜里 V.istorage.lockers
 * 如果位于有藏物点的地方，掉落的物品会暂存V.dropItems[savepoint] 里面
 * 在清空前可以回来拿取
 * 其余情况就真的掉一地，彻底无了！
 *
 * 钱包系统
 * 获得钱时会根据数额处理
 * 如果当前金钱+获得金钱<=钱包容量，直接放钱包里
 * 如果拿不下，先填满然后根据多出来的钱（余额）处理：
 * 余额小于50块: 如果有手机V.iPhone.owned == 1，则转账到venmo，否则丢失
 * （如果在合法商店打工会帮忙开通银行账号，就不会丢钱
 * 余额大于50块: 如果银行开通了V.iBank.plan !=='none'，会直接转账到银行，没有跟上一条一样流程
 */


function getStackSize(itemId) {
    const item = Items.data[itemId];
    return setup.maxStacks[item.size];
}

function splitItems(item, stacksize) {
    const items = [];
    if (item.count <= stacksize) {
        items.push(item);
        return items;
    }

    while (item.count > stacksize) {
        const splitItem = clone(item);
        splitItem.count = stacksize;
        items.push(splitItem);
        item.count -= stacksize;
    }
    if (item.count > 0) {
        items.push(item);
    }
    return items;
}

function mergeSameItem(pocket) {
    const sameItem = {};
    for (let i = 0; i < pocket.length; i++) {
        const item = pocket[i];
        if (!sameItem[item.id]) {
            sameItem[item.id] = { count : item.count, pos : [i] };
        }
        else {
            sameItem[item.id].count += item.count;
            sameItem[item.id].pos.push(i);
        }
    }

    for (const k in sameItem) {
        const item = sameItem[k];
        let pos = item.pos[0];
        pocket[pos].count = item.count;

        if (item.pos.length == 1) {
            continue;
        }

        for (let i = 1; i < item.pos.length; i++) {
            pos = item.pos[i];
            pocket.deleteAt(pos);
        }
    }
}

// 整理格子，超出堆叠就分割，有剩返回剩余的obj
function sortPockets(pocket, max) {
    let _left = [];

    // 先将相同物品堆叠在一起
    mergeSameItem(pocket);

    // 接着整理物品
    for (let i = 0; i < obj.length; i++) {
        let item;
        const stacksize = getStackSize(item.id);

        // 整理物品时发现有物品用完的时候
        if (obj[i].count <= 0) {
            obj.deleteAt(i);
            i--; // 重置一下循环
            continue;
        }

        // 按最大堆叠分割
        if (obj[i].count > stacksize) {
            item = clone(obj[i]);
            // 保留原有的
            obj[i].count = stacksize;
            item.count -= stacksize;

            // 分割
            _left = splitItems(item, stacksize);
        }

        // 如果当前容器有空位装完全部就直接塞
        if (_left.length > 0 && obj.length + _left.length < max) {
            obj.push(..._left);
            _left = [];
        }

        // 有空位但装不完的话，先装满再说
        else if (_left.length > 0 && obj.length < max) {
            let i = _left.length - 1;
            while (obj.length <= max) {
                obj.push(_left[i]);
                _left.pop();
                i--;
            }
        }
    }

    return _left;
}

// 检测过slot才会进入这一步。尝试获取并合并物品
function mergeItems(pocket, item) {
    let _item;
    const size = getStackSize(item.id);

    for (let i = 0; i < pocket.length; i++) {
        if (pocket[i].id == item.id && pocket[i].count + item.count < size) {
            // 还没到堆叠上限就直接添加数字
            if (pocket[i].count + item.count < size) {
                pocket[i].count += item.count;
                _item = pocket[i];
                break;
            }

            // 到堆叠上限就分割
            else {
                pocket[i].count += item.count;
                const _items = splitItems(pocket[i], size);
                pocket[i].count = size;

                _items.shift();
                pocket.push(..._items);
            }
        }
    }
}

// 显示文本
function transferMassage(pos, namelist) {
    let res = '';
    let lastItem = '';
    namelist.forEach(itemname => {
        if (pos == 'ground' && itemname !== lastItem) {
            res += `${lanSwitch(
                `There's no slot for the ${itemname} on any containers on your body, so you have to leave it to the ground.`,
                `你身上所有地方都没有空位放置${itemname}了，你只好把它扔地上。`
            )}<br>`;

            lastItem = itemname;
        }
        
        if (pos == 'bag' && itemname !== lastItem) {
            res += `${lanSwitch(
                `Your pockets are full, so you put ${itemname} to your bag.`,
                `你的口袋装满了，所以你将${itemname}放进了背包。`
            )}<br>`;

            lastItem = itemname;
        }

        if (pos == 'cart' && itemname !== lastItem) {
            res += `${lanSwitch(
                `Your bag are full, so you put ${itemname} to your cart.`,
                `你的背包满了，所以你将${itemname}放进了折叠推车里。`
            )}<br>`;

            lastItem = itemname;
        }

        if (pos == 'hole' && itemname !== lastItem) {
            res += `${lanSwitch(
                `Your hands and available container all full. With no other choice, you put ${itemname} into your asshole.`,
                `你双手以及可用的容器都已经装满了，无可奈何下，你把${itemname}塞进你的屁眼里。`
            )}<br>`;

            lastItem = itemname;
        }
    });
    return res;
}

// 检测是否有位置放置物品
function checkItemAvailability(item) {
    const data = clone(item);
    const size = getStackSize(item.id);

    const pockets = V.iPockets;
    const { body, bag, hole, cart } = pockets;

    const stacks = {};
    const checkStack = pos => {
        let count = 0;
        let left = 0;
        const index = [];
        for (let i = 0; i < pockets[pos].length; i++) {
            const item = body[i];
            if (item.id === item.id && item.count < size) {
                count++; // 有空余的堆叠
                left += size - item.count; // 堆叠剩余量
                index.push(i); // 记录当前位置方便后续处理
            }
        }
        return { count, left, index };
    };

    // 先检查已有的堆叠
    stacks.body = checkStack('body');
    if (bag.length > 0) {
        stacks.bag = checkStack('bag');
    }
    if (hole.length > 0) {
        stacks.hole = checkStack('hole');
    }
    if (cart.length > 0) {
        stacks.cart = checkStack('cart');
    }

    // 统计
    let totalCount = 0;
    for (const k in stacks) {
        if (stacks[k].left > 0) {
            totalCount += stacks[k].left;
        }
    }

    // 身上有可以整理的堆叠时。
    if (totalCount > 0) {
        data.count -= totalCount;
    }

    const result = {
        available           : data.count <= 0,
        stacks,
        slots               : {},
        availableSlotCount  : 0,
        availableStackCount : totalCount,
        state               : 'stacks'
    };
    
    // 这个阶段整理完的话，直接返回
    if (result.available) {
        return result;
    }

    // 还没整理完的话，按堆叠数切割后继续
    const left = splitItems(data, size);
    const res = checkEmptySlots(left);

    result.available = res.availabl;
    result.slots = res.slots;
    result.availableSlotCount = res.availableSlotCount;
    result.state = 'pockets';
    result.availableStackCount += res.availableSlotCount * size;

    return result;
}

// 检测是否有足够空格放置物品
function checkEmptySlots(itemlist) {
    const { body, bag, hole, cart } = V.iPockets;
    const slots = {
        body : getMaxSlots('body') - body.length,
        bag  : getMaxSlots('bag') - bag.length,
        hole : getMaxSlots('hole') - hole.length,
        cart : getMaxSlots('cart') - cart.length
    };

    let require = 0;
    const result = {
        slots     : {},
        available : false
    };

    for (const i in slots) {
        const size = slots[i];
        if (size >= itemlist.length) {
            result.slots[i] = size;
            result.available = true;
            result.availableSlotCount = size;
            return result;
        }
        else if (size > 0) {
            count++;
            require += size;
            result.slots[i] = size;
            result.availableSlotCount = size;
        }
    }

    if (require >= itemlist.length) {
        result.available = true;
        return result;
    }
    
    return result;
}

// 转移物品
function makeItemTransfer(items, availability) {
    const pockets = V.iPockets;
    let msg;
    let _items;

    const transferItems = function (items) {
        const { slots } = availability;
        let l = items.length - 1;
        let msg = '';
        let todo = true;

        while (todo == true) {
            for (const k in slots) {
                const list = [];
                for (let i = 0; i < slots[k]; i++) {
                    mergeItems(pockets[k], items[l]);
                    l = leftItem.length - 1;

                    const item = leftItem.pop();
                    list.push(item.name);
                }

                if (list.length > 0) {
                    msg += transferMassage(k, list);
                }
                if (items.length == 0) {
                    break;
                }
            }

            if (items.length == 0) {
                todo = false;
            }
            else {
                const list = items.map(item => item.name);
                msg += transferMassage('ground', list);
                todo = false;
            }
        }
        return msg;
    };

    const merge = function (item, source) {
        for (const i in source.stacks) {
            const { left, index } = source.stacks;
            index.forEach(index => {
                pockets[i][index].count += left;
                item.count -= left;
            });
        }
    };

    if (Array.isArray(items)) {
        // transferItems
        msg = transferItems(items);
    }
    else {
        // mergeItem
        merge(items, availability);
        _items = splitItems(items);
        msg = transferItems(_items);
    }

    return msg;
}

// 更新口袋和容器的堆叠
function updatePockets() {
    const checkLeft = function (pos) {
        let msg = '';
        let availableSlots;

        let leftItem = sortPockets(V.iPockets[pos], getMaxSlots(pos));
        if (leftItem.length > 0) {
            availableSlots = checkEmptySlots(leftItem.length);

            if (availableSlots.available == false) {
                const namelist = leftItem.map(item => item.name);
                msg += transferMassage('ground', namelist);
            }
            else {
                msg += makeItemTransfer(leftItem, availableSlots);
            }
        }

        leftItem = [];
        return msg;
    };

    let message = '';

    message += checkLeft('body');
    message += checkLeft('bag');
    message += checkLeft('cart');
    message += checkLeft('hole');

    return message;
}

function checkBodySlots() {
    let count = 2;
    if (V.worn.upper.name !== 'naked' || V.worn.over_upper !== 'naked') {
        count += 1;
    }

    if (V.worn.lower.name !== 'naked') {
        if (V.worn.lower.name == V.worn.upper.name) {
            count += 1;
        }
        else {
            count += 2;
        }
    }
    return count;
}

function getMaxSlots(pos) {
    if (pos == 'body') {
        return checkBodySlots();
    }
    if (pos == 'hole') {
        return currentSkillValue('promiscuity') > 80 ? 2 : 0;
    }
    if (pos == 'bag') {
        if (V.iPockets.bagtype == 'none' || V.iPockets.bagtype == 0 || V.iPockets.bagtype == '') {
            return 0;
        }
        return Items.data[V.iPockets.bagtype].capacity;
    }
    if (pos == 'cart') {
        if (V.iPockets.carttype == 'none' || V.iPockets.carttype == 0 || V.iPockets.carttype == '') {
            return 0;
        }
        return Items.data[V.iPockets.carttype].capacity;
    }
    return 0;
}


// 被强奸后随机丢失物品，一定概率丢失背包、钱包，必定丢失手推车
function lostItemsAfterRape() {
    const moneyrate = V.money / 10000;
    const lostmoney = random(1000, 10000);

    // 身上超过50块就有可能丢失，钱越多，丢失概率越大
    if (moneyrate >= 0.5) {
        const rate = random(100) * moneyrate;
        if (rate >= 50) {
            setMoney(-lostmoney);
        }
    }


    const lost = random(0, 3);
    if (lost == 0) return;

    for (let i = 0; i < lost; i++) {
        // 优先丢身上的物品。
        if (V.iPockets.body.length > 0) {
            V.iPockets.body.pop();
        }
        else if (V.iPockets.bag.length > 0) {
            V.iPockets.bag.pop();
        }
        else if (V.iPockets.cart.length > 0) {
            V.iPockets.cart.pop();
        }
    }
}


// 获得物品时的处理
function getItems(itemId, num) {
    const data = Items.data[itemId];
    const stack = findPockets(itemId);
    const stacksize = getStackSize(itemId);
    const msg = '';

    if (stack.count + num <= stacksize) {
        stack.count += num;
        return msg;
    }
    
    const item = {
        type  : data.type,
        id    : data.id,
        name  : lanSwitch(data.name),
        count : num
    };
    const checked = checkItemAvailability(item);
    if (checked.available == false && checked.availableSlotCount == 0) {
        return transferMassage('ground', [item.name]);
    }
        
    return makeItemTransfer(item, checked);
}

// 在身上搜索物品，并返回对应obj
function findAllPockets(itemId) {
    const { body, bag, cart, hole } = V.iPockets;
    let _resItem;

    const find = obj => {
        for (let i = 0; i < obj.length; i++) {
            const item = obj[i];
            if (item.id == itemId) {
                return item;
            }
        }
    };

    _resItem = find(body);
    if (_resItem) return _resItem;

    _resItem = find(bag);
    if (_resItem) return _resItem;

    _resItem = find(cart);
    if (_resItem) return _resItem;

    _resItem = find(hole);
    if (_resItem) return _resItem;
}

// 在身上按类别搜索所有物品，并返回对应位置
function findAllPocketsByType(type) {
    const { body, bag, cart } = V.iPockets;
    let _res;
    const res = {
        body : [],
        bag  : [],
        cart : []
    };

    const find = obj => {
        const get = [];
        for (let i = 0; i < obj.length; i++) {
            const item = obj[i];
            if (item.type == type) {
                get.push(i);
            }
        }
        return get;
    };

    _res = find(body);
    if (_res) {
        res.body = _res;
    }

    _res = find(bag);
    if (_res) {
        res.bag = _res;
    }

    _res = find(cart);
    if (_res) {
        res.cart = _res;
    }
    
    return res;
}

// 通过id使用身上物品
function usePocketItems(itemId) {
    const item = findAllPockets(itemId);
    if (item) {
        item.count--;
        Items.data[item.id].onUse();
    }
}

// 使用储物柜物品
function useLockerItems(itemId) {
    V.iStorage.lockers[itemId]--;
    Items.data[itemId].onUse();
}

// 在家使用物品
function useItems(itemId) {
    V.iStorage.home[itemId]--;
    Items.data[itemId].onUse();
}

// 检测是否能使用
function checkItemUsage(itemId) {
    const data = Items.data[itemId];
    return data.effects?.length > 0;
}

// 从身上转移到储物柜/家里
function putStorage(storage, pocket, itemPos, num) {
    const item = pocket[itemPos];
    V.iStorage[storage][item.id] += num;
    item.count -= num;
    if (item.count <= 0) {
        pocket.deleteAt(itemPos);
    }
}
// 从储物柜/家里拿出物品, 没有足够空间是不会出现选项的
function takeStorage(storage, itemId, pocket, num) {
    // 放到对应容器里

    // 然后从仓库扣除
    V.iStorage[storage][itemId] -= num;
}


V.iPockets = {
    body       : [],
    bag        : [],
    cart       : [],
    hole       : [],
    bagtype    : 'none',
    carttype   : 'none',
    wallettype : 'none'
};

V.iStorage = {
    lockers   : {},// 放在储物柜里的物品可以在某些地方使用，如厕所、学校、浴室、妓院等
    warehouse : {},// 放在仓库里的物品用于贩售
    orphanage : {},// 只要在孤儿院就能使用
    apartment : {},// 只要在出租屋就能使用
    farmbarns : {},// 只要在农场就能使用
    home      : {}, // 当前安全屋镜像

    bushes_park  : {},
    trashbin_elk : {},
    hideout      : {},

    warehouseOwned : 0,
    lockerOwned    : {
        school          : 1,
        strip_club      : 0,
        brothel         : 0,
        shopping_centre : 0,
        office_building : 0,
        beach           : 0
    }
};

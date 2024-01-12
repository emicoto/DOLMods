// Mod Data
const iCandy = {
    version : iCandyModVersion,
    author  : 'Lune',

    // mod startup config
    config : {
		
    },

    // save variables
    variables : {},

    // variables setting
    valueSetting : iModVariables,

    // settings
    setup : {
        addictions : iModAddictions,
        maxStacks  : iModMaxStacks,
        tattoos    : iModTattoos,
        drugConfig : iModDrugConfig
    },

    // temporary variables
    temp : {},

    // mod functions
    getConfig(prop) {
        return V.iCandyRobot.config[prop];
    },

    checkStat(item) {
        const data = Items.get(item);

        if (R.drugStates.drugs[item]) {
            return true;
        }

        if (data && data.tags.includes('addiction')) {
            R.drugStates.drugs[item] = new drugState();
            return true;
        }

        return false;
    },

    getStat(item, prop) {
        const general = ['aphrod', 'alcohol', 'nicotine'];
        if (general.includes(item)) {
            return prop ? R.drugStates.general[item][prop] : R.drugStates.general[item];
        }

        if (this.checkStat(item)) {
            return prop ? R.drugStates.drugs[item][prop] : R.drugStates.drugs[item];
        }
    },
    setStat(item, prop, value) {
        const general = ['aphrod', 'alcohol', 'nicotine'];
        if (general.includes(item)) {
            R.drugStates.general[item][prop] = value;
            return R.drugStates.general[item][prop];
        }
        if (this.checkStat(item)) {
            R.drugStates.drugs[item][prop] = value;
            return R.drugStates.drugs[item][prop];
        }
    },
    setValue(item, prop, value) {
        const general = ['aphrod', 'alcohol', 'nicotine'];
        if (general.includes(item)) {
            R.drugStates.general[item][prop] = value;
            return R.drugStates.general[item][prop];
        }

        if (this.checkStat(item)) {
            R.drugStates.drugs[item][prop] = value;
            return R.drugStates.drugs[item][prop];
        }
    },

    addValue(item, prop, value) {
        const general = ['aphrod', 'alcohol', 'nicotine'];
        if (general.includes(item)) {
            R.drugStates.general[item][prop] += value;
            return R.drugStates.general[item][prop];
        }
		
        if (this.checkStat(item)) {
            R.drugStates.drugs[item][prop] += value;
            return R.drugStates.drugs[item][prop];
        }
    },

    take(item, value) {
        value = Number(value);
        if (!value) return;
        const data = setup.addictions[item];

        R.drugStates.general[item].taken += Math.max(Math.floor(value / 100 + 0.5), 1);
        R.drugStates.general[item].lastTime = V.timeStamp;

        if (R.drugStates.general[item].taken > data.threshold) {
            R.drugStates.general[item].overdose++;
        }
    },

    setFlag(item, prop, value) {
        const general = ['aphrod', 'alcohol', 'nicotine'];
        if (general.includes(item)) {
            R.drugFlags.general[item][prop] = value;
            return R.drugFlags.general[item][prop];
        }

        if (this.checkStat(item)) {
            R.drugFlags.drugs[item][prop] = value;
            return R.drugFlags.drugs[item][prop];
        }
    },

    getFlag(item, prop) {
        const general = ['aphrod', 'alcohol', 'nicotine'];
        if (general.includes(item)) {
            return prop ? R.drugFlags.general[item][prop] : R.drugFlags.general[item];
        }

        if (this.checkStat(item)) {
            return prop ? R.drugFlags.drugs[item][prop] : R.drugFlags.drugs[item];
        }
    },

    setEquipEf(efId) {
        if (!R.equipEf[efId]) {
            R.equipEf[efId] = 1;
            return;
        }
        R.equipEf[efId] = Math.min(R.equipEf[efId] + 1, 10);
    },

    unsetEquipEf(efId) {
        R.equipEf[efId] = Math.max(R.equipEf[efId] - 1, 0);
    },

    // 记录更新。如果还没进行过初始化，就初始化一下。
    senseBak() {
        for (const [type, sens] of Object.entries(R.extraSense)) {
            const base = V[`${type}sensitivity`];

            if (sens.init == 0) {
                sens.init = 1;
                sens.base = V[`${type}sensitivity`];
            }
            else {
                sens.base = base - sens.add;
            }
        }
    },

    // 设置感度BUFF来源，如果来源不存在则创建，存在则叠加
    senseSet(type, src, value, timer = 0, fade = 0) {
        const sens = R.extraSense[type];
        if (!sens) return;

        const { source } = sens;

        if (source[src] == undefined) {
            source[src] = {
                value,
                timer,
                fade
            };
        }
        else {
            source[src].value += value;
            source[src].timer = Math.max(source[src].timer, timer);
        }

        return R.extraSense[type];
    },

    senseGet(type, src) {
        const sens = R.extraSense[type];
        if (!sens || !sens.source[src]) return;

        return sens.source[src];
    },

    // 统计所有来源的buff，减少各来源的计时器，并更新到buffed, add
    // passtime单位为秒
    // calculate all buffs, reduce timer, update buffed value
    senseUpdate(sense, passtime) {
        this.senseBak();

        let add = 0;
        for (const [src, buff] of Object.entries(sense.source)) {
            // 如果计时器为0，且不是持续性buff，就删除这个来源
            // if timer is 0 and not a fade buff, delete this source
            if (buff.timer <= 0 && buff.fade == 0) {
                delete sense.source[src];
                continue;
            }

            // 如果是持续性buff，且数值等于0，就删除这个来源
            // if fade buff and value is 0, delete this source
            if (buff.timer <= 0 && buff.fade !== 0 && buff.value == 0) {
                delete sense.source[src];
                continue;
            }

            // 如果是持续性buff，就先更新数值。
            // if fade buff, update value

            // 药效持续中，获得数值增加
            // the buff is activing, then add value
            if (buff.fade !== 0 && buff.timer > 0) {
                const multiplier = V.combat == 1 ? 0.5 : Math.max(passtime / 60, 1);
                buff.value += buff.fade * multiplier;
            }

            // 药效减退中，数值减少
            // the buff is fading, then reduce value
            if (buff.fade !== 0 && buff.timer <= 0) {
                const multiplier = V.combat == 1 ? 0.2 : Math.max(passtime / 60, 1);
                buff.value -= buff.fade * multiplier;

                // 确保数值不会高于或低于0
                // make sure the value is not higher or lower than 0
                if (buff.fade > 0) {
                    buff.value = Math.max(buff.value, 0);
                }
                else {
                    buff.value = Math.min(buff.value, 0);
                }
            }

            // 集算所有buff的数值
            // calculate all buffs
            add += buff.value;

            buff.timer = Math.max(buff.timer - passtime, 0);
        }

        sense.add = add;
        V[`${sense.type}sensitivity`] = sense.base + sense.add;

        return R.extraSense;
    }
};

Object.defineProperty(window, 'iCandy', { get : () => iCandy });

// mirror
for (const i in iModVariables) {
    Object.defineProperty(iCandy.variables, i, {
        get : () => V[i],
        set : value => {
            V[i] = value;
        }
    });
}

function setupFeatsBoost() {
    V.featsBoosts.upgrades = {
        money           : 0,
        grades          : 0,
        skulduggery     : 0,
        dancing         : 0,
        swimming        : 0,
        athletics       : 0,
        tending         : 0,
        housekeeping    : 0,
        cooking         : 0,
        mechanical      : 0,
        chemical        : 0,
        greenThumb      : 0,
        seduction       : 0,
        purity          : 0,
        impurity        : 0,
        newLife         : 0,
        aNewBestFriend  : 0,
        tattoos         : 0,
        defaultMoves    : 0,
        randomClothing  : 0,
        specialClothing : 0,
        sexToys         : 0
    };

    const { upgradeDetails, missing, name } = V.featsBoosts;

    upgradeDetails.grades.cost = 10;
    upgradeDetails.greenThumb.cost = 30;
}

function destination() {
    if (V.bus == 'sea') return '<<seamovequick>><br><br>';
    if (V.bus == 'lakebus') return '<<lakequick>><br><br>';

    if (Macro.has(`${V.bus}quick`)) return `<<${V.bus}quick>><br><br>`;
    return '<<harvestquick>><br><br>';
}

function destinationeventend() {
    if (V.bus == 'sea') return '<<seamoveeventend>><br><br>';
    if (V.bus == 'lakebus') return '<<lakeeventend>><br><br>';
    if (Macro.has(`${V.bus}eventend`)) return `<<${V.bus}eventend>><br><br>`;
    return '<<harvesteventend>><br><br>';
}

function iCandyInit() {
    console.log('on iCandyInit');

    for (const i in iModVariables) {
        V[i] = clone(iModVariables[i]);
    }

    for (const key in V.iShop) {
        V.iShop[key].stocks = iShop.getshelf(key);
    }

    setup.iCandyMod = 'ready';

    if (V.passage == 'Start') {
        Items.init();
    }

    for (const [, datas] of Object.entries(iEvent.data)) {
        datas.sort((a, b) => { b.priority - a.priority; });
    }

    if (Macro.has('destination')) {
        Macro.delete('destination');
        DefineMacroS('destination', destination);
    }
    
    if (Macro.has('destinationeventend')) {
        Macro.delete('destinationeventend');
        DefineMacroS('destinationeventend', destinationeventend);
    }
}
DefineMacroS('iCandyInit', iCandyInit);


function iCandyOldInit() {
    console.log('on iCandyOldInit');

    for (const i in iModVariables) {
        V[i] = clone(iModVariables[i]);
    }
}
iCandy.manualInit = iCandyOldInit;

function iCandyUpdate() {
    if (passage() == 'Start' && V.iCandyRobot) return;

    if (V.iCandyStats) {
        delete V.iCandyStory;
        delete V.mechaItems;
        delete V.mechanic;
        delete V.iRobot;
        delete V.natural_lactation;
        delete V.myApartment;
        delete V.repairStore;
        delete V.candyDrug;
        delete V.candyItems;
        delete V.iCandyStats;

        iCandyInit();
    }
    else if (!V.iCandyRobot) {
        iCandyInit();
    }
    else if (V.iCandyRobot.version !== iCandy.version) {
        // 将旧版装备数据转换为新版
        // convert old equip data to new
        for (const [key, value] of Object.entries(V.iPockets)) {
            if (key.has('type')) {
                const k = key.replace('type', '');
                if (!V.iPockets.equip) V.iPockets.equip = {};

                if (typeof value == 'object') {
                    V.iPockets.equip[k] = value;
                }
                else {
                    V.iPockets.equip[k] = {
                        type : 'misc',
                        id   : 'none',
                        name : 'none'
                    };
                }
                
                delete V.iPockets[key];
            }
            else if (key.has('body', 'hole')) {
                const stacks = iStack.add(value);

                V.iPockets[key] = new Pocket('body', key);
                V.iPockets[key].add(stacks);
            }
            else if (Pocket.list.includes(key)) {
                const stacks = iStack.add(value);

                V.iPockets[key] = new Pocket('equip', key);
                V.iPockets[key].add(stacks);
            }
        }

        // 重新初始化仓库，如果是旧版本数据
        if (typeof V.iStorage.home.serotonin == 'number') {
            V.iStorage.home = {};
        }

        // 更新数据
        for (const i in iModVariables) {
            if (V[i] == undefined) {
                V[i] = clone(iModVariables[i]);
            }
            else {
                V[i] = F.updateObj(iModVariables[i], V[i]);
            }
        }

        // 更新版本号
        V.iCandyRobot.version = iCandy.version;

        // 修复药效时间错误
        const drugsStat = V.iCandyRobot.drugStates.drugs;
        for (const [drug, data] of Object.entries(drugsStat)) {
            const itemdata = Items.get(drug);
            const validTimer = itemdata.hours * 3600 + V.timeStamp;

            if (data.efTimer > validTimer) {
                console.log('drug timer update:', drug, data.efTimer, validTimer);
                data.efTimer = validTimer;
            }

            if (data.lastTime > V.timeStamp) {
                console.log('drug lasttime update:', drug, data.lastTime, V.timeStamp);
                data.lastTime = V.timeStamp;
            }
        }

        // 更新class
        for (const [key, pocket] of Object.entries(V.iPockets)) {
            if (Pocket.list.includes(key) && pocket.constructor.name !== 'Pocket') {
                V.iPockets[key] = Pocket.recover(pocket);
            }
        }

        for (const [key, storage] of Object.entries(V.iStorage)) {
            if (key == 'lockerOwned' || key == 'warehouseOwned') continue;
            if (storage.constructor.name !== 'Pocket') {
                V.iStorage[key] = Pocket.recover(storage);
            }
        }

        // 修正商店物品
        for (const [key, shelf] of Object.entries(V.iShop)) {
            if (!shelf || !shelf?.state || !shelf.stocks.length == 0) {
                iShop.initShelf(key);
                iShop.getshelf(key);
            }
            else if (shelf.state == 'stocked') {
                shelf.stocks.forEach((item, key) => {
                    const data = Items.get(item.id);
                    if (!data) {
                        console.log('item not found:', item.id);
                        shelf.stocks.deleteAt(key);
                    }
                });
            }
        }
    }
}
iCandy.modUpdate = iCandyUpdate;
DefineMacroS('iCandyUpdate', iCandyUpdate);


function fixDrugEffect() {
    for (const id in R.drugStates.drugs) {
        const drug = R.drugStates.drugs[id];
        if (drug.lastTime > 0 && drug.lastTime > V.timeStamp) {
            drug.lastTime = V.timeStamp;
        }
        drug.efTimer = 0;
    }
}

iCandy.fixDrugEffect = fixDrugEffect;

function iCandyOnLoad(save) {
    const val = save.state.history[0].variables;
    // 更新class
    for (const [key, pocket] of Object.entries(val.iPockets)) {
        if (Pocket.list.includes(key) && pocket.constructor.name !== 'Pocket') {
            val.iPockets[key] = Pocket.recover(pocket);
        }
    }

    for (const [key, storage] of Object.entries(val.iStorage)) {
        if (key == 'lockerOwned' || key == 'warehouseOwned') continue;
        if (storage.constructor.name !== 'Pocket') {
            val.iStorage[key] = Pocket.recover(storage);
        }
    }
}

Save.onLoad.add(iCandyOnLoad);

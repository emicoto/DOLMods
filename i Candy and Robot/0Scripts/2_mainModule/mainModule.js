
// mirror
for (const i in iModVariables) {
    Object.defineProperty(iCandy.variables, i, {
        get : () => V[i],
        set : value => {
            V[i] = value;
        }
    });
}

iCandy.variableSetting = iModVariables;

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
    if (passage() == 'Start' && V.iCandyRobot) {
        iCandyRecover();
        return;
    }

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
        console.log('on version update');

        const oldEquip = ['bagtype', 'walltettype', 'heldtype', 'carttype'];

        // 将旧版装备数据转换为新版
        // convert old equip data to new
        for (const [key, value] of Object.entries(V.iPockets)) {
            if (oldEquip.includes(key)) {
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
        }

        // 将旧的背包数据转换为新版
        for (const [key, value] of Object.entries(V.iPockets)) {
            if (key.has('body', 'hole') && value.limitsize == undefined) {
                const stacks = iStack.add(value);
                console.log('restore stacks:', stacks, value);

                V.iPockets[key] = new Pocket('body', key);
                V.iPockets[key].limitsize = V.iPockets[key].max();

                V.iPockets[key].add(stacks);

                console.log('new pockets:', V.iPockets[key].limitsize, V.iPockets[key].slots);
            }
            else if (Pocket.list.includes(key) && value.limitsize == undefined) {
                const stacks = iStack.add(value);

                V.iPockets[key] = new Pocket('equip', key);
                V.iPockets[key].limitsize = V.iPockets[key].max();

                V.iPockets[key].add(stacks);
            }
            else if (key == 'global') {
                V.iPockets.global = new Pocket('global', 'global', 1000000000);
                V.iPockets.global.items = {};
            }
        }


        // 重新初始化仓库，如果是旧版本数据
        if (typeof V.iStorage.home.serotonin == 'number') {
            for (const [key, value] of Object.entries(iStorage)) {
                if (value.limitsize == undefined) continue;
                
                V.iStorage[key] = new Pocket('storage', key);
                V.iStorage[key].limitsize = value.limitsize;
            }
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

    if (V.iPockets.body.constructor.name !== 'Pocket' || iCandy.onLoad === true) {
        iCandyRecover();
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

function iCandyRecover() {
    // 更新class
    for (const [key, pocket] of Object.entries(V.iPockets)) {
        if (pocket.limitsize !== undefined && pocket.constructor.name !== 'Pocket') {
            V.iPockets[key] = Pocket.recover(pocket);
        }
    }

    for (const [key, storage] of Object.entries(V.iStorage)) {
        if (storage.limitsize !== undefined && storage.constructor.name !== 'Pocket') {
            V.iStorage[key] = Pocket.recover(storage);
        }
    }
}

function iCandyOnLoad() {
    iCandy.onLoad = true;
}

Save.onLoad.add(iCandyOnLoad);

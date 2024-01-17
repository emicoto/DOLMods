//--------------------------------------------
//
//  setup config
//
//--------------------------------------------
setup.palamlist = ['trauma', 'pain', 'tiredness', 'drunk', 'hallucinogen','control','corruption','stress', 'drugged', 'awareness'];

const iModAddictions = {
    alcohol : {
        name      : ['alcohol', '酒精'],
        threshold : 3,
        maxOD     : 10,
        withdraw  : 60,
        quit      : 28,
        hours     : 0,
        process   : 0.2,
        methods   : ['drink', '喝'],
        recover   : 4
    },

    aphrod : {
        name      : ['aphrodisiacs', '催情剂'],
        threshold : 0,
        maxOD     : 4,
        withdraw  : 30,
        quit      : 28,
        hours     : 0,
        process   : 0.4,
        methods   : ['take', '吸收'],
        recover   : 5
    },

    nicotine : {
        name      : ['nicotine', '尼古丁'],
        threshold : 0,
        maxOD     : 6,
        withdraw  : 36,
        quit      : 28,
        hours     : 0,
        process   : 0.3,
        methods   : ['smoke', '吸'],
        recover   : 3
    },

    medicine : {
        threshold : 4,
        maxOD     : 12,
        withdraw  : 72,
        quit      : 7,
        hours     : 0,
        recover   : 3.5
    },

    riskyDrugs : {
        threshold : 1,
        maxOD     : 3,
        withdraw  : 24,
        quit      : 30,
        hours     : 1,
        recover   : 2
    },

    superDrugs : {
        threshold : 0,
        maxOD     : 1,
        withdraw  : 12,
        quit      : 48,
        hours     : 2,
        recover   : 1
    }
};

// 各种大小物品的最大堆叠限制
const iModMaxStacks = {
    pill   : 50,
    inject : 10,
    liquid : 500,	// ml
    powder : 80,	// oz, 1lb=16oz, 1bread = 12oz uses
    micro  : 36,
    tiny   : 18,
    small  : 9,
    medium : 4,
    big    : 1
};

const iModDrugConfig = {
    immediate : {
        process : 2,
        recover : 0.05
    },
    super : {
        process : 0.8,
        recover : 0.2
    },
    strong : {
        process : 0.6,
        recover : 0.5
    },
    risky : {
        process : 0.3,
        recover : 1
    },
    normal : {
        process : 0.07,
        recover : 3
    }
};


const plantNames = {
    apple : [
        'Apple',
        '苹果',
        'Apples'
    ],
    baby_bottle_of_breast_milk : [
        'Baby bottle of breast milk',
        '小瓶装母乳',
        'Baby bottles of breast milk'
    ],
    banana : [
        'Banana',
        '香蕉',
        'Bananas'
    ],
    bird_egg : [
        'Bird Egg',
        '鸟蛋',
        'Bird Eggs'
    ],
    blackberry : [
        'Blackberry',
        '黑莓',
        'Blackberries'
    ],
    blood_lemon : [
        'Blood Lemon',
        '血柠',
        'Blood Lemons'
    ],
    bottle_of_breast_milk : [
        'Bottle of Breast Milk',
        '瓶装母乳',
        'Bottles of Breast Milk'
    ],
    bottle_of_milk : [
        'Bottle of Milk',
        '瓶装牛奶',
        'Bottles of Milk'
    ],
    bottle_of_semen : [
        'Bottle of Semen',
        '瓶装精液',
        'Bottles of Semen'
    ],
    broccoli : [
        'Broccoli',
        '西兰花',
        'Braccolis'
    ],
    cabbage : [
        'Cabbage',
        '卷心菜',
        'Cabbages'
    ],
    carnation : [
        'Carnation',
        '康乃馨',
        'Carnations'
    ],
    chicken_egg : [
        'Chicken Egg',
        '鸡蛋',
        'Chicken Eggs'
    ],
    daisy : [
        'Daisy',
        '雏菊',
        'Daisies'
    ],
    garlic_bulb : [
        'Garlic Bulb',
        '大蒜',
        'Garlic Bulbs'
    ],
    ghostshroom : [
        'Ghostshroom',
        '幽灵菇',
        'Ghostshrooms'
    ],
    lemon : [
        'Lemon',
        '柠檬',
        'Lemons'
    ],
    lily : [
        'Lily',
        '百合',
        'Lilies'
    ],
    lotus : [
        'Lotus',
        '睡莲',
        'Lotuses'
    ],
    mushroom : [
        'Mushroom',
        '普通蘑菇',
        'Mushrooms'
    ],
    onion : [
        'Onion',
        '洋葱',
        'Onions'
    ],
    orange : [
        'Orange',
        '橘子',
        'Oranges'
    ],
    orchid : [
        'Orchid',
        '兰花',
        'Orchids'
    ],
    peach : [
        'Peach',
        '桃子',
        'Peaches'
    ],
    pear : [
        'Pear',
        '梨',
        'Pears'
    ],
    plum : [
        'Plum',
        '李子',
        'Plums'
    ],
    plumeria : [
        'Plumeria',
        '鸡蛋花',
        'Plumerias'
    ],
    poppy : [
        'Poppy',
        '罂粟',
        'Poppies'
    ],
    potato : [
        'Potato',
        '马铃薯',
        'Potatoes'
    ],
    red_rose : [
        'Red Rose',
        '红玫瑰',
        'Red Roses'
    ],
    strange_flower : [
        'Strange Flower',
        '诡异的花',
        'Strange Flowers'
    ],
    strawberry : [
        'Strawberry',
        '草莓',
        'Strawberries'
    ],
    truffle : [
        'Truffle',
        '松露',
        'Truffles'
    ],
    tulip : [
        'Tulip',
        '郁金香',
        'Tulips'
    ],
    turnip : [
        'Turnip',
        '萝卜',
        'Turnips'
    ],
    white_rose : [
        'White Rose',
        '白玫瑰',
        'White Roses'
    ],
    wild_carrot : [
        'Wild Carrot',
        '胡萝卜',
        'Wild Carrots'
    ],
    wild_honeycomb : [
        'Wild Honeycomb',
        '野蜂巢',
        'Wild honeycombs'
    ],
    wolfshroom : [
        'Wolfshroom',
        '狼菇',
        'Wolfshrooms'
    ]
};

function iModSetupDoLItems() {
    for (const i in setup.plants) {
        const plant = setup.plants[i];

        const item = Items.add('Indigrents', plant.name, plantNames[plant.name], plant.plant_cost);
        const hunger = {
            fruit     : 20,
            vegetable : 30,
            produce   : 15
        };

        const size = {
            fruit     : 'medium',
            flower    : 'tiny',
            vegetable : 'small',
            shroom    : 'small'
        };

        if (size[item.type]) {
            item.set('size', size[item.type]);
        }
        else if (item?.special?.includes('small') || item.name.includes('egg')) {
            item.set('size', 'small');
        }

        if (plant.type == 'fruit' || plant.type == 'vegetable') {
            item.Tags('edible', 'vegi')
                .Effects(['hunger', hunger[item.type]]);
        }
        else if (item.name.includes('bottle') || item.name.includes('Bottle')) {
            item.Tags('dol', 'drink', 'production')
                .Effects(['hunger', 10]);
        }
        else {
            item.Tags('dol', 'production');
        }
        item.set('img', `misc/icon/tending/${plant.icon}`);
    }

    const spray = {
        type   : 'consumable',
        id     : 'spray',
        name   : ['Pepper Spray', '防狼喷雾'],
        plural : 'Pepper Sprays',
        num    : 1,
        price  : 1000,
        size   : 'big',
        tags   : ['spray', 'dol'],
        usage  : 1,
        info   : [
            'A spray made from chili pepper, is incredible effective',
            '用辣椒水制成的防狼喷雾，效果拔群。'
        ]
    };

    Items.set(spray);
}


Object.defineProperties(setup, {
    addictions : { value : iModAddictions },
    maxStacks  : { value : iModMaxStacks },
    drugConfig : { value : iModDrugConfig },
    plantNames : { value : plantNames }
});


const iModTattoos = [
    {
        key     : 'fifty_whore',
        name    : '£50',
        special : 'prostitution',
        degree  : 5000
    },
    {
        key     : 'drug_eater',
        name    : 'Drug Eater',
        cn      : '瘾君子',
        special : 'drugs'
    },
    {
        key     : 'drug_whore',
        name    : 'Drug Whore',
        cn      : '毒娼',
        special : 'prostitution'
    },
    {
        key     : 'sell_for_drug',
        name    : 'Sell body for drugs',
        cn      : '为药卖身',
        special : 'prostitution'
    },
    {
        key     : 'drug_slut',
        name    : 'Drug Slut',
        cn      : '药瘾婊子',
        special : 'drugs'
    }
];

setup.modTattoos.push(...iModTattoos);

//--------------------------------------------
//
//  variable config
//
//--------------------------------------------
const pocketsList = ['body','held','bag','cart','hole'];

const iCandyDataSetting = {
    units : {
        roll : {
            EN        : 'roll',
            EN_plural : 'rolls',
            CN        : '卷'
        },
        can : {
            EN        : 'can',
            EN_plural : 'cans',
            CN        : '罐'
        },
        sheet : {
            EN        : 'sheet',
            EN_plural : 'sheets',
            CN        : '张'
        },
        canned : {
            EN        : 'can',
            EN_plural : 'cans',
            CN        : '罐'
        },
        bottle : {
            EN        : 'bottle',
            EN_plural : 'bottles',
            CN        : '瓶'
        },
        packed : {
            EN        : 'pack',
            EN_plural : 'packs',
            CN        : '包'
        },
        pack : {
            EN        : 'pack',
            EN_plural : 'packs',
            CN        : '包'
        },
        bagged : {
            EN        : 'bag',
            EN_plural : 'bags',
            CN        : '袋'
        },
        bag : {
            EN        : 'bag',
            EN_plural : 'bags',
            CN        : '袋'
        },
        boxed : {
            EN        : 'box',
            EN_plural : 'boxes',
            CN        : '盒'
        },
        box : {
            EN        : 'box',
            EN_plural : 'boxes',
            CN        : '盒'
        },
        set : {
            EN        : 'set',
            EN_plural : 'sets',
            CN        : '套'
        },
        cup : {
            EN        : 'cup',
            EN_plural : 'cups',
            CN        : '杯'
        },
        equip : {
            EN        : '',
            EN_plural : '',
            CN        : '件'
        },
        capsule : {
            EN        : 'capsule',
            EN_plural : 'capsules',
            CN        : '个'
        },
        misc : {
            EN        : '',
            EN_plural : '',
            CN        : '个'
        },
        paper : {
            EN        : 'sheet',
            EN_plural : 'sheets',
            CN        : '张'
        },
        piece : {
            EN        : 'piece',
            EN_plural : 'pieces',
            CN        : '块'
        },
        pair : {
            EN        : 'pair',
            EN_plural : 'pairs',
            CN        : '双'
        },
        uses : {
            EN        : 'use',
            EN_plural : 'uses',
            CN        : '次'
        },
        smoke : {
            EN        : '',
            EN_plural : '',
            CN        : '支'
        },
        inject : {
            EN        : 'shot',
            EN_plural : 'shots',
            CN        : '管'
        },
        pill : {
            EN        : 'pill',
            EN_plural : 'pills',
            CN        : '片'
        },
        drugpowder : {
            EN        : 'bag',
            EN_plural : 'bags',
            CN        : '包'
        },
        ml : {
            EN        : 'ml',
            EN_plural : 'ml',
            CN        : 'ml'
        },

        oz : {
            EN        : 'oz',
            EN_plural : 'oz',
            CN        : 'oz'
        },
        lb : {
            EN        : 'lb',
            EN_plural : 'lb',
            CN        : 'lb'
        },
		
        liquid : {
            EN        : 'ml',
            EN_plural : 'ml',
            CN        : 'ml'
        },
        mealbox : {
            EN        : 'box',
            EN_plural : 'boxes',
            CN        : '份'
        },
        meal : {
            EN        : 'serving',
            EN_plural : 'servings',
            CN        : '份'
        },
        serve : {
            EN        : 'serving',
            EN_plural : 'servings',
            CN        : '份'
        },
        loaf : {
            EN        : 'loaf',
            EN_plural : 'loaves',
            CN        : '条'
        },
        water : {
            EN        : 'bottle',
            EN_plural : 'bottles',
            CN        : '瓶'
        }
    },

    hidePoint : {
        park   : ['bushes', 'bushes_park'],
        elk    : ['trashbin', 'trashbin_elk'],
        island : ['hideout', 'howllow']
    },
	
    itemUseTime : {
        consumable : 5,
        foods      : 5,
        drinks     : 5,
        cooking    : 10,
        drugs      : 3,
        medicine   : 2,
        misc       : 5
    },

    storage : {
        home         : ['storage','仓库'],
        farm         : ['barn','谷仓'],
        lockers      : ['lockers','储物柜'],
        warehouse    : ['warehouse','仓库'],
        apartment    : ['shelf','储物架'],
        bushes_park  : ['bushes','灌木丛'],
        transbin_elk : ['trashbin','垃圾桶'],
        hideout      : ['hideout','藏身处'],
        howllow      : ['howllow','树洞'],
        bag          : ['bag','背包'],
        cart         : ['cart','手推车']
    },

    batchUnit : ['canned', 'bottle', 'packed', 'bagged', 'boxed', 'roll', 'set', 'box'],

    useMethods(type, tags) {
        let methods = ['use', '使用'];

        if (tags.includes('inject')) {
            methods = ['inject', '注射'];
        }
        if (tags.includes('drugpowder')) {
            methods = ['absorb', '吸取'];
        }
        if (tags.includes('smoke')) {
            methods = ['smoke', '抽'];
        }
        if (tags.includes('cream')) {
            methods = ['apply', '涂抹'];
        }
        if (type == 'medicine' || tags.includes('medicine')) {
            methods = ['take', '服用'];
        }
        if (type == 'foods' || tags.includes('edible')) {
            methods = ['eat', '吃'];
        }
        if (type == 'drinks' || tags.includes('potable')) {
            methods = ['drink', '喝'];
        }

        return methods;
    },

    batchUnitTxt(data, count) {
        let unit = '';
        for (let i = 0; i < this.batchUnit.length; i++) {
            const key = this.batchUnit[i];
            if (data.tags.has(key)) {
                if (count > 1 && this.units[key][`${setup.language}_plural`]) {
                    unit = this.units[key][`${setup.language}_plural`];
                }
                else {
                    unit = this.units[key][setup.language];
                }
                break;
            }
        }
        return unit;
    },

    subUnitTxt(data, count) {
        let unit = lanSwitch('', '个');
        const key = data.unit;
        const lan = setup.language;

        if (key) {
            if (count > 1 && this.units[key][`${lan}_plural`]) {
                unit = this.units[key][`${lan}_plural`];
            }
            else {
                unit = this.units[key][lan];
            }
            return unit;
        }
	
        for (let i = 0; i < this.subUnit.length; i++) {
            const key = this.subUnit[i];

            if (data.tags.has(key)) {
                if (count > 1 && this.units[key][`${lan}_plural`]) {
                    unit = this.units[key][`${lan}_plural`];
                }
                else {
                    unit = this.units[key][lan];
                }
                break;
            }
        }
        return unit;
    },

    itemUnit(data, count, num, storage) {
        let text = `x${count}`;

        if (!num) {
            let unit = this.subUnitTxt(data, count);
            if (unit) {
                text = `${count}${unit}`;
                return text;
            }

            unit = this.batchUnitTxt(data, count);
            if (unit) {
                text = `${count}${unit}`;
            }
            return text;
        }

        if (num) {
            const unit1 = this.batchUnitTxt(data, count);
            const unit2 = this.subUnitTxt(data, count * num);

            if (unit1 && unit2 && unit1 != unit2) {
                text = `${count}${unit1}(${count * num}${unit2})`;
                if (storage) {
                    text = `${count}${unit1}(${num}${unit2})`;
                }
            }
            else if (unit1) {
                text = `${count}${unit1}`;
            }
            else if (unit2) {
                text = `${count * num}${unit2}`;
            }
            else {
                text = `${count}`;
            }
        }

        return text;
    },

    pocketsList
};

const subUnit = Object.keys(iCandyDataSetting.units).filter(i => iCandyDataSetting.batchUnit.includes(i) == false);
iCandyDataSetting.subUnit = subUnit;

Object.defineProperty(window, 'iData', { get() { return iCandyDataSetting; } });
Object.defineProperty(window, 'pocketsList', { get() { return pocketsList; } });

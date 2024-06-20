/*
const newItems = [
    {
        tags : ['candy', 'food'], // Tag management system for logical judgment, categorization, and searching

        id     : 'fruitscandy', // item id, must be unique
        name   : ['Fruits Candy', '水果糖'], // item name, first is English, second is Chinese
        plural : 'Fruits Candies', // plural form of item name in english, default is item name + "s"
	
        info : [
            'Sweet and sour, give you a little happiness', // item description
            '酸酸甜甜的，提供些许幸福感'
        ],
	
        price : 1240, // item price in shop, real price = price/100
        num   : 12, // one package contains how many items
        size  : 'tiny', // item size for stack, default is "big"
	
        effects : [  // item effects, can be multiple
            ['trauma', 2],
            ['hunger', 50]
        ]
    },
    {
        tags : ['candy', 'food'],

        id     : 'chocolate',
        name   : ['Chocolate', '巧克力'],
        plural : 'Chocolates',
	
        info : [
            'Sweet chocolate, may relives a little stress for you',
            '甜甜的巧克力，能缓解些许压力'
        ],
	
        price : 1640,
        num   : 4,
        size  : 'small',
	
        effects : [
            ['trauma', 2],
            ['hunger', 80]
        ]
    }
];

// add new items to game
Items.addItems(newItems);

const recipe = [
	 {
        id         : 'bread', // 合成表的id，一般就是合成结果的物品id
        production : 'bread',// 可选，有的话会给指定的物品。没有会给与合成表ID一致的物品。
        givenum    : 1,
        lock       : false, // 可选，lock设置为true时，需要达成条件来解锁。解锁逻辑额外设置。
        // requirement:()=>{ return V.iRecipe.cookingbooks_1 !== undefined } //配方解锁逻辑
        time       : 30, // 制作需要时间（分钟）

        // batchtime: 120, //可选，批量制作需要时间（分钟）
        // batchnum: 10, //可选，批量制作次数

        difficult : 100, // 制作难度
        skill     : 'cooking', // 判定技能

        ingredients : [['powder', 2], ['butter', 1]], // 合成需要的材料
        methods     : ['cook','oven'] // 基础制作方法，便于检索

        // failproduction: 'burnt', //可选，制作失败的物品
        // failnum: 1, //可选，制作失败的物品数量

        // subproduce: 'toast', //可选，制作成功时的副产品
        // subnum: 1, //可选，副产品的数量
        // subchance: 0.5, //可选，副产品的概率
    },
    {
        id          : 'sandwich',
        production  : 'sandwich',
        givenum     : 1,
        lock        : false,
        time        : 30,
        difficult   : 100,
        skill       : 'cooking',
        ingredients : [['bread', 2], ['cheese', 1], ['ham', 1]],
        methods     : ['cook']
    }
];


Items.addRecipes(recipe);
// the item system currently need i Robot Candy to work.
*/

// define an array to setup your tattoos.
// almost same as vanilla, but you can skip some keys. skipped key will set to default var
const newTatoos = [
    {
        key     : 'two_hundred_pound_whore',
        name    : '£200',
        special : 'prostitution',
        degree  : 20000
    },
    {
        key     : 'ultimate_bitch',
        name    : 'Ultimate Bitch',
        cn      : '终极婊子',
        special : 'sex'
    }
];

// then push to modTatoos list
setup.modTattoos.push(...newTatoos);

//--------------------------------------------
//
//  setup config
//
//--------------------------------------------
const iModAddictions = { 
	alcohol:{
		name: ['alcohol', '酒精'],
		threshold: 3,
		maxOD: 10,
		withdraw: 60,
		quit: 28,
		hours: 0,
		process: 0.2,
		methods: ['drink', '喝']
	},

	aphrod:{
		name: ['aphrodisiacs', '催情剂'],
		threshold: 0,
		maxOD: 4,
		withdraw: 30,
		quit: 28,
		hours: 0,
		process: 0.4,
		methods:['take', '吸收']
	},
	nicotine:{
		name: ['nicotine', '尼古丁'],
		threshold: 0,
		maxOD: 6,
		withdraw: 36,
		quit: 28,
		hours: 0,
		process: 0.3,
		methods: ['smoke', '吸']
	},

	medicine:{
		threshold: 4,
		maxOD: 12,
		withdraw: 72,
		quit: 7,
		hours: 0,
	},

	riskyDrugs:{
		threshold: 1,
		maxOD: 3,
		withdraw: 24,
		quit: 30,
		hours: 1,
	},

	superDrugs:{
		threshold: 0,
		maxOD: 1,
		withdraw: 12,
		quit: 48,
		hours: 2,
	}
}

//各种大小物品的最大堆叠限制
const iModMaxStacks = {
	pill  : 50,
	inject: 10,
	liquid: 500, // ml
	powder: 80,//oz, 1lb=16oz, 1bread = 12oz uses
	micro : 36,
	tiny  : 18,
	small : 9,
	medium: 4,
	big   : 1,
}

const iModDrugConfig = {
    immediate: {
        process: 2,
        recover: 0.05,
    },
    super:{
        process: 0.8,
        recover: 0.2,
    },
    strong:{
        process: 0.6,
        recover: 0.5,
    },
    risky:{
        process: 0.3,
        recover: 1,
    },
    normal:{
        process: 0.07,
        recover: 3,
    }
}


const plantNames = {
	"apple": [
		"Apple",
		"苹果",
		'Apples'
	],
	"baby_bottle_of_breast_milk": [
		"Baby bottle of breast milk",
		"小瓶装母乳",
		"Baby bottles of breast milk"
	],
	"banana": [
		"Banana",
		"香蕉",
		'Bananas'
	],
	"bird_egg": [
		"Bird Egg",
		"鸟蛋",
		'Bird Eggs'
	],
	"blackberry": [
		"Blackberry",
		"黑莓",
		'Blackberries'
	],
	"blood_lemon": [
		"Blood Lemon",
		"血柠",
		'Blood Lemons'
	],
	"bottle_of_breast_milk": [
		"Bottle of Breast Milk",
		"瓶装母乳",
		'Bottles of Breast Milk'
	],
	"bottle_of_milk": [
		"Bottle of Milk",
		"瓶装牛奶",
		'Bottles of Milk'
	],
	"bottle_of_semen": [
		"Bottle of Semen",
		"瓶装精液",
		'Bottles of Semen'
	],
	"broccoli": [
		"Broccoli",
		"西兰花",
		'Braccolis'
	],
	"cabbage": [
		"Cabbage",
		"卷心菜",
		'Cabbages'
	],
	"carnation": [
		"Carnation",
		"康乃馨",
		'Carnations'
	],
	"chicken_egg": [
		"Chicken Egg",
		"鸡蛋",
		'Chicken Eggs',
	],
	"daisy": [
		"Daisy",
		"雏菊",
		'Daisies'
	],
	"garlic_bulb": [
		"Garlic Bulb",
		"大蒜",
		'Garlic Bulbs'
	],
	"ghostshroom": [
		"Ghostshroom",
		"幽灵菇",
		'Ghostshrooms'
	],
	"lemon": [
		"Lemon",
		"柠檬",
		'Lemons'
	],
	"lily": [
		"Lily",
		"百合",
		'Lilies'
	],
	"lotus": [
		"Lotus",
		"睡莲",
		'Lotuses'
	],
	"mushroom": [
		"Mushroom",
		"普通蘑菇",
		'Mushrooms'
	],
	"onion": [
		"Onion",
		"洋葱",
		'Onions'
	],
	"orange": [
		"Orange",
		"橘子",
		'Oranges'
	],
	"orchid": [
		"Orchid",
		"兰花",
		'Orchids'
	],
	"peach": [
		"Peach",
		"桃子",
		'Peaches'
	],
	"pear": [
		"Pear",
		"梨",
		'Pears'
	],
	"plum": [
		"Plum",
		"李子",
		'Plums'
	],
	"plumeria": [
		"Plumeria",
		"鸡蛋花",
		'Plumerias'
	],
	"poppy": [
		"Poppy",
		"罂粟",
		'Poppies'
	],
	"potato": [
		"Potato",
		"马铃薯",
		'Potatoes'
	],
	"red_rose": [
		"Red Rose",
		"红玫瑰",
		'Red Roses'
	],
	"strange_flower": [
		"Strange Flower",
		"诡异的花",
		'Strange Flowers'
	],
	"strawberry": [
		"Strawberry",
		"草莓",
		'Strawberries'
	],
	"truffle": [
		"Truffle",
		"松露",
		'Truffles'
	],
	"tulip": [
		"Tulip",
		"郁金香",
		'Tulips'
	],
	"turnip": [
		"Turnip",
		"萝卜",
		'Turnips'
	],
	"white_rose": [
		"White Rose",
		"白玫瑰",
		'White Roses'
	],
	"wild_carrot": [
		"Wild Carrot",
		"胡萝卜",
		'Wild Carrots'
	],
	"wild_honeycomb": [
		"Wild Honeycomb",
		"野蜂巢",
		'Wild honeycombs'
	],
	"wolfshroom": [
		"Wolfshroom",
		"狼菇",
		'Wolfshrooms'
	]
}

function iModSetupDoLItems() {
	for (let i in setup.plants) {
		let plant = setup.plants[i]

		let item = Items.add('tending', plant.name, plantNames[plant.name], plant.plant_cost)
		let hunger = {
			fruit: 20,
			vegetable: 30,
			produce: 15
		}

		let size = {
			fruit: 'medium',
			flower: 'tiny',
			vegetable: 'small',
			shroom: 'small',
		}

		if (size[item.type]) {
			item.set('size', size[item.type])
		}
		else if (item?.special?.includes('small') || item.name.includes('egg')) {
			item.set('size', 'small')
		}

		if (item.type == 'fruit' || item.type == 'vegetable') {
			item.Tags('dol', 'food')
				.Effects(['hunger', hunger[item.type]])
		}
		else if (item.name.includes('bottle') || item.name.includes('Bottle')) {
			item.Tags('dol', 'drink', 'production')
				.Effects(['hunger', 10])
		}
		else {
			item.Tags('dol', 'production')
		}
		item.set('img', `misc/icon/tending/${plant.icon}`)
	}

	const spray = {
		type: "consumable",
		id: "spray",
		name: ["Pepper Spray", "防狼喷雾"],
		plural:"Pepper Sprays",
		num: 1,
		price: 1000,
		size: "big",
		tags: ["spray", "dol"],
		usage: 1,
		info: [
			"A spray made from chili pepper, is incredible effective",
			"用辣椒水制成的防狼喷雾，效果拔群。",
		],
	}

	Items.set(spray)
}

function printPalams(palam, value){
	let gl = 'l';
	let count = 1;
	if (value > 0) {
		gl = 'g';
	}
	if (Math.abs(value) > 30) {
		count = 3;
	} else if (Math.abs(value) > 20) {
		count = 2;
	}
	if(palam == 'hallucinogen'){
		palam = 'hallucinogens'
	}

	return `<<${gl.repeat(count)}${palam}>>`;
}

function useMethods(tags, item){
	let methods = ['use', '使用']
	if(tags.includes('pill')){
		methods = ['take', '吞下']
	}
	if(tags.includes('inject')){
		methods = ['inject', '注射']
	}
	if(tags.includes('drugpowder')){
		methods = ['snort', '吸入']
	
	}
	if(tags.includes('food')){
		methods = ['ate', '吃']
	}		
	if(tags.includes('drink')){
		methods = ['drink', '喝']
	}
	if(tags.includes('smoke')){
		methods = ['smoke', '抽']
	}
	if(tags.includes('cream')){
		methods = ['apply', '涂抹']
	}
	return methods
}

function itemUnit(tags, count){
	const unit = {
		pill : {
			EN : 'pill',
			EN_plural : 'pills',
			CN : '片'
		},
		drugpowder : {
			EN : 'pack',
			EN_plural : 'packs',
			CN : '包'
		},
		inject : {
			EN : 'shot',
			EN_plural : 'shots',
			CN : '管'
		},
		canned : {
			EN : 'can',
			EN_plural : 'cans',
			CN : '罐'
		},
		candy : {
			EN : 'piece',
			EN_plural : 'pieces',
			CN : '块'
		},
		snack : {
			EN : 'pack',
			EN_plural : 'packs',
			CN : '包'
		},
		smoke : {
			EN : '',
			EN_plural : '',
			CN : '支'
		},
		liquid : {
			EN : 'ml',
			EN_plural : 'ml',
			CN : 'ml'
		},
		lite : {
			EN : 'oz',
			EN_plural : 'oz',
			CN : 'oz'
		},
		powder : {
			EN : 'lb',
			EN_plural : 'lb',
			CN : 'lb'
		},
		food : {
			EN : '',
			EN_plural : '',
			CN : '份'
		},
		drink : {
			EN : 'bottle',
			EN_plural : 'bottles',
			CN : '瓶'
		},
		equip : {
			EN : '',
			EN_plural : '',
			CN : '件'
		},

	}
	let text = 'x ' + count

	for(let i in unit){
		if(tags.includes(i)){
			if(count > 1 && unit[i][setup.language + '_plural']) 
				text += unit[i][setup.language + '_plural']
			else
				text += unit[i][setup.language]
		}
	}

	return text
}

const pocketsList = ["body","held","bag","cart","hole"]

Object.defineProperties(setup, {
	addictions: { value: iModAddictions },
	maxStacks: { value: iModMaxStacks },
	drugConfig: { value: iModDrugConfig},
	plantNames: { value: plantNames }
})

Object.defineProperties(window, {
	pocketsList: { value: pocketsList },
	printPalams: { value: printPalams },
	useMethods: { value: useMethods },
	itemUnit: { value: itemUnit },
})
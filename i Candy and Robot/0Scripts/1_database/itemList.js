const iFoods = [
{
	tags: ["pieces", "food", "candy"],

	id: "fruitscandy",
	name: ["Fruits Candy", "水果糖"],
	plural: "Fruits Candies",

	info: [
	"Sweet and sour, give you a little happiness",
	"酸酸甜甜的，提供些许幸福感",
	],

	price: 1240,
	num: 12,
	size: "tiny",

	effects: [
		["trauma", 2],
		["hunger", 50],
	],

	msg: itemMsg.fruitscandy,
	//stacksprites:[25, 50, 100]百分比值，当前堆叠数/堆叠上限 >= 数值时，在uid后加_num.png
},

{
	tags: ["pieces", "food", "candy"],

	id: "chocolate",
	name: ["Chocolate", "巧克力"],
	plural: "Chocolates",

	info: [
	"Sweet chocolate, may relives a little stress for you",
	"甜甜的巧克力，能缓解些许压力",
	],

	price: 1640,
	num: 4,
	size: "small",

	effects: [
		["trauma", 2],
		["hunger", 80],
	],

	msg: itemMsg.chocolate,
	
},
{
	tags: ["packed", "food", "snack"],

	id: "potachips",
	name: ["Potato Chips", "薯片"],
	plural: "Potato Chips",

	info: [
	"Bag of crunchy chips for some hungry",
	"一包脆脆的薯片，补充些许体力。",
	],

	size: "big",
	price: 380,
	num: 1,

	effects: [
		["tiredness", 12],
		["hunger", 120],
		["thirsty", 200, 'p']
	],

	msg: itemMsg.potachips,
},

{
	tags: ["packed", "food", "snack"],

	id: "orionring",
	name: ["Orion Rings", "洋葱圈"],
	plural: "Orion Rings",

	info: [
	"Bag of crunchy orion rings for some hungry",
	"一包松脆的洋葱圈，补充些许体力。",
	],

	size: "big",
	price: 380,
	num: 1,

	effects: [
		["tiredness", 12],
		["hunger", 120],
		["thirsty", 120, 'p']
	],

},
{
	tags: ["pieces", "food", "candy"],

	id: "lolipop",
	name: ["Lolipop", "波板糖"],
	plural: "Lolipops",

	info: [
	"Sweet, big lolipop, give you a bit of happiness",
	"甜甜的大波板糖，提供些许幸福感",
	],

	num: 1,
	price: 360,
	size: "medium",

	effects: [
		["trauma", 4],
		["hunger", 40],
		["stress", 3],
	],

	msg : itemMsg.lolipop,
},
{
	tags: ["packed", "food", "snack"],

	id: "oreo",
	name: ["Oreo", "奥利奥"],
	plural: "Oreos",

	info: [
	"Black and white oreo, sweet and crunchy.",
	"黑白相间的奥利奥，甜甜脆脆的。",
	],

	num: 1,
	price: 520,
	size: "medium",

	effects: [
		["tiredness", 20],
		["hunger", 200],
		["stress", 2],
	],
},
{
	tags: ["boxed", "food", "snack"],

	id: "pocky",
	name: ["Pocky", "百奇"],
	plural: "Pack of Pocky",

	info: [
	"Long and thin pocky, too many flavors to choose.",
	"细细长长的百奇，有太多口味可供选择了。",
	],

	num: 1,
	price: 600,
	size: "medium",

	effects: [
		["tiredness", 10],
		["hunger", 80]
	],
},
{
	tags: ["canned", "food", "snack"],

	id: "fruitscrisp",
	name: ["Fruits Crisp", "干果"],
	plural: "Pack of Fruits Crisp",

	info: [
		"Healthy and nutritious fruits crisp, sweet and salty.",
		"健康又营养的干果，吃起来咸咸甜甜的。",
	],

	num: 1,
	price: 1072,
	size: "medium",

	effects: [
		["tiredness", 30],
		["hunger", 60],
		["thirsty", 50, 'p']
	],
},
{
	tags: ["packed", "food", "snack"],

	id: "jellos",
	name: ["Jellos", "果冻"],
	plural: "Pack of Jellos",

	info: [
		"Smoothy and juicy Jellos, too many flavors to choose.",
		"滑溜又多汁的果冻，有太多口味可供选择了。",
	],

	num: 6,
	price: 1640,
	size: 6,

	effects: [
		["stress", 1],
		["hunger", 50],
		["thirsty", 20]
	],
},
{
	tags: ["food", "prepared"],	

	id: "sandwich",
	name: ["Sandwich", "三文治"],
	plural:"Sandwiches",

	num: 1,
	price: 650,
	size: "big",

	info: [
	"Plain sandwiches, a bread cut into triangles with eggs, bacon and veggies",
	"普通的三文治，切成三角形的面包夹着鸡蛋培根和蔬菜",
	],

	effects: [
		["tiredness", 40],
		["hunger", 800],
	],
},

{
	tags: ["pieces", "food", "stall"],

	id: "candyfloss",
	name: ["Candyfloss", "棉花糖"],
	plural:"Candyflosses",

	num: 1,
	price: 340,
	size: "big",

	info: [
	"Sweet, cloud like candyfloss, give you soft happiness",
	"甜甜的，云一般的棉花糖，给你软绵绵的幸福",
	],

	effects: [
		["tiredness", 20],
		["trauma", 5],
		["stress", 3],
		["hunger", 30],
	],

	msg : itemMsg.candyfloss,
},

{
	tags: ["food", "prepared"],

	id: "lunchbox",
	name: ["Simple Combo", "简易套餐"],
	plural:"Boxes of Simple Combo",

	num: 1,
	price: 1680,
	size: "big",

	info: [
	"Ordinary boxed lunch combo with vegetables and meat for nutritional balance",
	"普通的套餐餐盒，有菜有肉营养均衡",
	],
	effects: [
		["hunger", 1200],
		["tiredness", 80],
	],
},

{
	tags: ["boxed", "food", "cookie"],
	id: "danishcookies",
	name: ["Danish Cookies", "丹麦曲奇"],
	plural:"Boxes of Danish Cookies",

	num: 24,
	price: 2464,
	size: 24,

	info: [
		"Delicious Danish cookies, various styles, crispy and delicious.",
		"美味的丹麦曲奇，款式多样，松脆可口。",
	],

	effects: [
		["stress", 1],
		["hunger", 20],
		["thirsty", 10, 'p']
	],

},
{
	tags: ["boxed", "food" ,"candy"],
	id:"ferrero",
	name:["Ferrero", "费列罗巧克力"],
	plural:"Boxes of Ferrero",

	num: 12,
	price: 3280,
	size: 36,

	info: [
		"Delicious Ferrero chocolate, sweet and crunchy outside, rich hazelnut chocolate inside",
		"美味的费列罗巧克力，甜甜脆脆的外壳内是浓郁的榛果巧克力",
	],

	effects: [
		["stress", 1],
		["trauma", 2],
		["hunger", 10]
	],
},
{
	tags: ["food", "bread", "packed"],
	id:"sandwitchbread",
	name:["Sandwitch Bread", "三文治面包"],
	plural:"Sandwitch Breads",

	num: 10,
	price: 1000,
	size:"big",

	info:[
		"A loaf of bread for making sandwitches",
		"用来做三文治的面包"
	],

	effects:[
		["hunger", 360]
	]
},
{
    tags:["seasonal", "spring", "food", "mealbox"],

    id:"SpringBoxedMeal",
    name:["Spring boxed meal", "春季便当"],
    plural:"Spring boxed meal",

    info: [
    "Filled with the deliciousness of spring, it includes Mentaiko Chirashi-Sushi, fried shrimp, and potato mash salad served with tomatoes.",
    "满含春天的美味，内含了明太子散寿司、炸虾和马铃薯泥生菜沙拉佐番茄。",
    ],

    price: 4820,
    num: 1,
    effects: [
    ["hunger" , 1200],
    ],

    msg:itemMsg.SpringBoxedMeal
},
{
    tags:["seasonal", "autumn", "food", "mealbox"],

    id:"CreamChestnutCake",
    name:["Cream Chestnut Cake", "秋季便当"],
    plural:"Cream Chestnut Cake",

    info: [
    "Inside the luxurious lacquer box are a variety of autumn specialties, including rice soaked in eel sauce, tender grilled eel, sliced matsutake mushrooms, and fresh salmon arranged like vibrant flowers. Enjoy to your heart''s content!",
    "豪华的漆器盒子里面装载著满满的秋日特产，吸饱了蒲烧酱汁的米饭、肥嫩的蒲烧鳗、切成片的松茸，还有摆放成鲜豔花朵的当季新鲜鲑鱼，请尽情享用 ！",
    ],

    price: 4820,
    num: 1,
    effects: [
    	["hunger" , 1200],
    ],

    msg:itemMsg.AutumnBoxedMeal
},

{
    tags:["seasonal", "autumn", "food", "cake", "pieces"],

    id:"ChestnutEarlGreyCake",
    name:["Chestnut Earl Grey Cake", "栗香伯爵茶戚风蛋糕"],
    plural:"Chestnut Earl Grey Cake",

    info: [
    "Added a generous amount of chestnut filling on top of the Earl Grey tea chiffon cake, with finely chopped chocolate surrounding the Earl Grey cream. It smells of Earl Grey tea with a hint of fruity and chestnut sweetness.",
    "在伯爵茶戚风蛋糕的基底上加入了满满的栗子馅，细碎的巧克力围绕著红茶奶油、闻起来充满了伯爵红茶带著些微果香的芬芳与栗子馨香甜美。，"
    ],

    price: 12400,
    num: 4,
    effects: [
    	["hunger" , 420],
    ],

    msg:itemMsg.ChestnutEarlGreyCake
},
];

Items.addItems(iFoods, 'foods')

const iDrinks = [
	{
		tags: ["bottle", "soda"],
	
		id: "ramune",
		name: ["Ramune", "波子水"],
		plural: "Ramunes",
	
		info: [
			"Cool ramune, recover a bit of stamina",
			"清爽的波子水，能补充点体力",
		],
	
		price: 520,
		num: 1,
		size: 3,
	
		effects: [
			["tiredness", 64],
			["thirsty", 600]
		],
		
		msg: itemMsg.ramune,
	},

	{
		tags: ["canned","soda"],
	
		id: "cola",
		name: ["Can of Cola", "可乐"],
		plural:"Cans of Cola",
	
		num: 1,
		price: 200,
		size: 4,
	
		info: ["A regular canned cola", "一罐普通的罐装可乐"],
		effects: [
			["stress", 2],
			["thirsty", 500]
		],
	
		msg: itemMsg.cola,
	},
	
	{
		tags: ["bottle", "soda"],
	
		id: "cola_bottle",
		name: ["Bottle of Cola", "可乐"],
		plural:"Bottles of Cola",
	
		num: 1,
		price: 400,
	
		info: ["A regular bottle cola", "一瓶普通的瓶装可乐"],
		effects: [
			["stress", 2],
			["thirsty", 1000]
		],
	
		msg: itemMsg.cola,
	},
	
	{
		tags: ["bottle", "coffee"],
	
		id: "frappuccino",
		name: ["Frappuccino", "星冰乐咖啡"],
		plural:"Bottles of Frappuccino",
	
		num: 1,
		price: 800,
	
		info: ["A regular glass bottle Frappuccino", "一瓶星冰乐咖啡"],
		effects: [
			["stress", 3],
			["thirsty", 800]
		],
	},
	{
		tags: ["canned", "coffee"],
	
		id: "coffe",
		name: ["Can of Coffe", "罐装咖啡"],
		plural:"Cans of coffe",
	
		num: 1,
		price: 640,
	
		info: ["A regular canned coffe", "一罐普通的咖啡"],
		effects: [
			["stress", 1],
			["thirsty", 500]
		],
	},
	
	{
		tags: ["canned", "energy"],
	
		id: "redbull",
		name: ["Red Bull", "红牛"],
		plural:"Cans of Red Bull",
	
		num: 1,
		price: 800,
	
		info: [
			'Energy drink, "Red Bull gives you wings"',
			"能量饮料，红牛能让你飞起来",
		],
		effects: [
			["tiredness", 50],
			["thirsty", 500]
		],
	},
	{
		tags: ["canned", "soda"],
	
		id: "fruitsoda",
		name: ["Fruit Soda", "水果苏打"],
		plural:"Cans of Fruit Soda",
	
		num: 1,
		price: 520,
	
		info: [
			"Fresh and sparkling fruits soda, too many flavors to choose.",
			"清新爽口、美味可口的水果苏打，有太多口味可供选择了",
		],
		effects: [
			["tiredness", 5],
			["stress", 1],
			["thirsty", 500]
		],
	},
	{
		tags: ["bottle", "tea"],
	
		id: "milktea",
		name: ["Milk Tea", "午后奶茶"],
		plural:"Bottles of Milk Tea",
	
		num: 1,
		price: 849,
	
		info: [
			"Sweety and smooth, fragrant milk tea, makes your afternoon full of happiness",
			"甜丝丝，滑溜溜，香醇的奶茶，让你的午后充满幸福感",
		],
		effects: [
			["stress", 2],
			["thirsty", 600]
		],
	},
]

Items.addItems(iFoods, 'drinks')


const ingredients = [
	{
		tags: ["liquid", "chemical", "craft"],
		id:"blood",
		name:["Blood", "血液"],
		plural:"Blood",
	
		num: 1,
		price: 10000,
		size:"small",
	
		info:[
			"A pack of blood",
			"一包血液"
		],
	},
	{
		tags: ["chemical", "craft", "paper"],
		id:"candypackage",
		name:["Candy Package", "糖果包装"],
		plural:"Candy Packages",
	
		num: 1,
		price: 10,
		size:"micro",
	
		info:[
			"A package used to pack candies",
			"糖果吃剩后的包装"
		],
	},
	{
		tags: ["creamy","cooking", "food"],
		id:"cream",
		name:["Cream", "奶油"],
		plural:"Cream",
	
		num: 10,
		price: 1265,
		size:"micro",

		usage: 2,
		effects:[
			["hunger", 30]
		],
		info:[
			"cream, sweet and smooth",
			"甜甜的丝滑的奶油"
		],
	},
	{
		tags: ["powder", "cooking"],
		id:"flour",
		name:["Flour", "面粉"],
		plural:"Flour",

		num: 25,
		price: 3849,
		size: "powder",

		info:[
			"flour",
			"面粉"
		]
	},
	{
		tags: ["lite", "flavor", "cooking"],
		id:"mayonaise",
		name:["Mayonaise", "蛋黄酱"],
		plural:"Mayonaise",

		num: 40,
		price: 1039,
		size: 40,

		info:[
			"mayonaise",
			"蛋黄酱"
		]
	},
	{
		tags:["lite", "flavor", "cooking"],
		id:"sugar",
		name:["Sugar", "糖"],
		plural:"Sugar",

		num: 50,
		price: 1200,
		size: 50,

		info:[
			"sugar",
			"糖"
		]
	},
	{
		tags:["lite", "flavor", "cooking"],
		id:"salt",
		name:["Salt", "盐"],
		plural:"Salt",

		num: 50,
		price: 1000,
		size: 50,

		info:[
			"salt",
			"盐"
		]
	},
	{
		tags:["liquid", "flavor", "cooking"],
		id:"soysauce",
		name:["Soy Sauce", "酱油"],
		plural:"Soy Sauce",

		num: 180,
		price: 360,
		size: 180,

		info:[
			"soy sauce",
			"酱油"
		]
	}
]
Items.addItems(ingredients)

const dailyConsumables = [
	{
		tags: ['daily', 'roll'],
		id: 'papertowel',
		name: ['Roll of Paper Towel', '纸巾'],
		plural: 'Rolls of Paper towel',

		num: 1,
		price: 100,
		size: 'medium',

		info: [
			'A roll of paper towel',
			'一卷纸巾'
		],

		onUse: function(){
			//清理身上所有液体
			for(let i in V.player.bodyliquid){
				const liquid = V.player.bodyliquid[i]
				liquid.goo = 0;
				liquid.seme = 0;
				liquid.nectar = 0;
			}

		}
	}
]

const Gacha = [
	{
		tags: ["gacha", "gachacap"],
		id:"gacha",
		name:["Gacha", "扭蛋"],
		plural:"Gacha",
	
		num: 1,
		price: 600,
		size:"small",
	
		info:[
			"A gacha capsule, you can get a random item from it",
			"一个扭蛋胶囊，里面有一个随机物品"
		],

		require:"gacha",
		openItem:"gachaopened",
		gachaType:"random",

	},
	{
		tags: ["gacha", "gachacap"],
		id:"gacha_leef",
		name:["Leef Gacha", "叶子扭蛋"],
		plural:"Leef Gacha",
	
		num: 1,
		price: 600,
		size:"small",
	
		info:[
			"A gacha capsule with leaf pattern, you can get a random item from it",
			"一个有着叶子图案的扭蛋胶囊。里面有一个随机物品"
		],

		require:"gacha",
		openItem:"gachaopened",
		gachaType:"snack",

	},
	{
		tags: ["gacha", "gachacap"],
		id:"gacha_magic",
		name:["Magic Gacha", "魔法扭蛋"],
		plural:"Magic Gacha",
	
		num: 1,
		price: 600,
		size:"small",
		
	
		info:[
			"A gacha capsule with magic pattern, you can get a random item from it",
			"一个有着魔法图案的扭蛋胶囊。里面有一个随机物品"
		],

		require:"gacha",
		openItem:"gachaopened",
		gachaType:"collection",

	},
	{
		tags: ["gacha", "gachacap"],
		id:"gacha_star",
		name:["Star Gacha", "星星扭蛋"],
		plural:"Star Gacha",
	
		num: 1,
		price: 600,
		size:"small",
	
		info:[
			"A gacha capsule with leaf pattern, you can get a random item from it",
			"一个有着叶子图案的扭蛋胶囊。里面有一个随机物品"
		],

		require:"gacha",
		openItem:"gachaopened",
		gachaType:"candy",

	},
	{
		tags: ["gachaopened", "gachacap", "craft"],
		id:"gacha_opened",
		name:["Opened Gacha", "打开的扭蛋"],
		plural:"Opened Gacha",
	
		num: 1,
		price: 600,
		size:"small",
	
		info:[
			"An opened gacha capsule, the item inside has been taken out",
			"一个被打开的扭蛋，里面的物品已经被取出"
		],
	},
	{
		tags: ["gacha", "rare","gachacap"],
		id:"goldgacha",
		name:["Gold Gacha", "黄金扭蛋"],
		plural:"Gold Gacha",
	
		num: 1,
		price: 600,
		size:"small",
	
		info:[
			"A golden gacha capsule, you can get a random item from it",
			"一个金黄色的扭蛋胶囊。里面有一个随机物品"
		],

		require:"gacha",
		openItem:"gachaopened",
		gachaType:"rare",

	},
	{
		tags: ["gachaopened", "rare","gachacap", "craft"],
		id:"goldgacha_opened",
		name:["Opened Gacha", "打开的扭蛋"],
		plural:"Opened Gacha",
	
		num: 1,
		price: 600,
		size:"small",
	
		info:[
			"An opened golden gacha capsule, the item inside has been taken out",
			"一个被打开的黄金扭蛋，里面的物品已经被取出"
		],
	},
]

const GachaItems = [
	
]

const iSpecial = [
{
	type: "consumable",
	tags: ["liquid", "lubricant"],

	id: "lubricant",
	name: ["KY Anal Glide", "KY肛用润滑液"],
	plural:"KY Anal Glide",

	num: 200,
	price: 3000,
	size: 200,

	usage: 10,
	info: [
		"Desensitizing lube for anal play, keep inside for wet and slippery.",
		"灌肠用润滑油，保持肠道湿滑。",
	],

	effects: [
		["anusgoo", 50, "p"]
	],

	diff:{
		new:{
			displayname:['new package', '新包装'],
			img:'items/consumable/lubricant_new.png'
		}
	},

	require:"bathroom",
},

{
	type: "consumable",
	tags: ["liquid", "lubricant"],

	id: "druglubricant",
	name: ["Aphrodisiac Anal Lube", "催情润滑夜"],
	plural:"Aphrodisiac Anal Lube",

	num: 200,
	price: 3000,
	size: 200,

	usage: 10,
	info: [
		"The anal lube with aphrodisiac effect, bring you the ultimate experiments.",
		"带催情效果的肠内润滑夜，给你带来极致快乐。",
	],
	effects: [
		["anusgoo", 50, "p"],
		["drugs", 200, "p"],
		["hunger", 50, "p"],
	],

	require:"bathroom",
},

]

Items.addItems(iSpecial)

function onEquip(pocket, slot){
	const item = V.iPockets[pocket][slot]

	let pos = 'bag'
	if(this.tags.includes('held')){
		pos = 'held'
	}
	else if(this.tags.includes('cart')){
		pos = 'cart'
	}
	else if(this.tags.includes('wallet')){
		pos = 'wallet'
	}

	if(item?.diff && this.diff){
		const diff = this.diff[item.diff]

		if(diff.sp){
			iCandy.setEquipEf(diff.sp)
		}
	}

	let html = equipText[pos].equip(this.name)
	iM.onEquip(pos, pocket, slot)

	return html
}

function onUnEquip(){
	let pos = 'bag'
	if(this.tags.includes('held')){
		pos = 'held'
	}
	else if(this.tags.includes('cart')){
		pos = 'cart'
	}
	else if(this.tags.includes('wallet')){
		pos = 'wallet'
	}

	const item = V.iPockets[pos+'type']

	if(item.diff && this.diff){
		const diff = this.diff[item.diff]

		if(diff.sp){
			iCandy.unsetEquipEf(diff.sp)
		}
	}
	let html = equipText[pos].unequip(this.name)
	iM.onUnEquip(pos)
	return html
}


const iContainers = [
	{
		tags: ["equip","held"],
  
		id: "plasticbag",
		name: ["Plastic Bag", "塑料袋"],
		plural:"Plastic bag",
  
		info: [
		  "A plastic bag that can hold things.",
		  "一个稍微能装东西的塑料袋。",
		],	  
  
		num: 1,
		price: 100,
		size: 10,
  
		capacity: 3,
		
		onEquip,
		onUnEquip
	},
	{
		tags: ["equip","held"],
  
		id: "trashbag",
		name: ["Trash Bag", "垃圾袋"],
		plural:"Trash bag",
  
		info: [
		  "A black plastic bag that can hold a lot of trash.",
		  "一个能装大量垃圾的黑色塑料袋。",
		],
  
		num: 1,
		price: 300,
		size: 10,
  
		capacity: 6,
		
		onEquip,
		onUnEquip
	},
	{
		tags: ["equip","held"],
  
		id: "seedbag",
		name: ["Seeds Bag", "种子袋"],
		plural:"Seeds Bags",
  
		info: [
		  "A bag to hold seeds.",
		  "一个用来装种子的袋子。",
		],	  
  
		num: 1,
		price: 200,
		size: 10,
  
		capacity: 2,
		
		onEquip,
		onUnEquip
	},
	{
	  tags: ["equip","bag"],

	  id: "satchel",
	  name: ["Small Satchel", "小挎包"],
	  plural:"Small Satchels",

	  info: ["A small, cute satchel.", "一个小巧可爱的挎包。"],

	  num: 1,
	  price: 4200,
	  size: "big",
	  capacity: 4,
	  diff:{
		girl:{ displayname:['girlish', '女款'], img:'items/container/satchel_girl.png', sp:'girlish'},
		cat:{ displayname:['cat', '猫'], img:'items/container/satchel_cat.png', sp:'cat'}
	  },

	  onEquip,
	  onUnEquip
	},
  
	{
	  tags: ["equip","bag"],

	  id: "leathersatchel",
	  name: ["Leather Satchel", "皮包"],
	  plural:"Leather Satchels",

	  info: ["A stylish designed, leather satchel.", "一个时尚的皮包。"],

	  num: 1,
	  price: 6800,
	  size: "big",
	  capacity: 6,
	  diff:{
		girl:{ displayname:['girlish', '女款'], img:'items/container/leathersatchel_girl.png', sp:'girlish'},

	  },

	  onEquip,
	  onUnEquip
	},
  
	{
	  tags: ["equip","bag"],

	  id: "schoolbag",
	  name: ["School Bag", "书包"],
	  plural:"School bag",

	  info: ["A common school bag used by students.", "学生常用的书包。"],

	  num: 1,
	  price: 9680,
	  size: "big",
	  capacity: 8,
	  diff:{
		black:{ displayname:['black', '黑色'], img:'items/container/schoolbag_black.png'},
		pink:{ displayname:['pink', '粉色'], img:'items/container/schoolbag_pink.png', sp:'girlish'}
	  },
	  
	  onEquip,
	  onUnEquip
	},
  
	{
	  tags: ["equip","bag"],

	  id: "backpack",
	  name: ["Backpack", "大背包"],
	  plural:"Backpacks",

	  info: [
		"A large backpack with plenty of capacity.",
		"一个有着充足容量的大背包。",
	  ],	  

	  num: 1,
	  price: 13620,
	  size: "big",

	  capacity: 12,
	  diff:{
		girl:{ displayname:['girlish', '女款'], img:'items/container/backpack_girl.png', sp:'girlish'}
	  },
	  
	  onEquip,
	  onUnEquip
	},
	{
	  tags: ["equip","bag"],

	  id: "hikingpack",
	  name: ["Hiking Backpack", "登山包"],
	  plural:"Hiking Backpacks",

	  info: [
		"Extra large capacity backpack for hikinA collapsible cartg.",
		"一个有着充足容量的大背包。",
	  ],
	  	  
	  num: 1,
	  price: 28420,
	  size: "big",
	  capacity: 20,
	  
	  onEquip,
	  onUnEquip
	},
  
	{
	  tags: ["equip","cart"],

	  id: "cart",
	  name: ["Simple Cart", "简易手推车"],
	  plural:"Simple Carts",

	  num: 1,
	  price: 3200,
	  size: "big",

	  info: ["A simple, collapsible cart", "一个简易的，可折叠的手推车。"],
	  capacity: 36,
	  
	  onEquip,
	  onUnEquip
	},
  
	{
		tags: ["equip","cart"],
  
		id: "bucket",
		name: ["Rolling Bucket", "便携垃圾桶"],
		plural:"Rolling Buckets",
  
		num: 1,
		price: 27620,
		size: "big",
  
		info: ["A smart, stylish rolling buckets.", "一个智能的，时尚的便携式垃圾桶。"],
		capacity: 25,
		diff:{
			blue:{ displayname:['blue', '蓝色'], img:'items/container/bucket_blue.png'},
			yellow:{ displayname:['yellow', '黄色'], img:'items/container/bucket_yellow.png'},
		},
		
		onEquip,
		onUnEquip
	},

	{
	  tags: ["equip","cart"],

	  id: "xlcart",
	  name: ["Outdoor Cart", "可折叠户外手推车"],
	  plural:"Outdoor Carts",

	  num: 1,
	  price: 45960,
	  size: "big",

	  info: ["A normal, collapsible cart", "一个普通的，可折叠的手推车。"],
	  capacity: 50,
	  
	  onEquip,
	  onUnEquip
	},

	{
		tags: ["equip","wallet"],

		id:"coinpouch",
		name: ["Coin Pouch", "零钱袋"],
		plural:"Coin Pouches",

		num:1,
		price: 1200,
		size:"big",

		info:[
			"A small pouch for holding coins.",
			"一个用来装零钱的布袋。"
		],

		capacity: 10000,
		
		onEquip,
		onUnEquip
	},

	{
		tags: ["equip","wallet"],

		id:"pouch",
		name: ["Pouch", "荷包"],
		plural:"Pouches",

		num:1,
		price: 3640,
		size:"big",

		info:[
			"A purse for holds your coins. Small, but can hold more than your expect.",
			"看起来有点小的荷包。明明很小，意外的很能装东西。"
		],

		capacity: 50000,
		diff:{
			blue:{ displayname:['blue', '蓝色'], img:'items/container/pouch_blue.png'},
			green:{ displayname:['green', '绿色'], img:'items/container/pouch_green.png'},
			orange:{ displayname:['orange', '橙色'], img:'items/container/pouch_orange.png'},
			pink:{ displayname:['pink', '粉色'], img:'items/container/pouch_pink.png'},
			purple:{ displayname:['purple', '紫色'], img:'items/container/pouch_purple.png'},
			yellow:{ displayname:['yellow', '黄色'], img:'items/container/pouch_yellow.png'},
		},
		
		onEquip,
		onUnEquip
	},

	{
		tags: ["equip", "wallet", "cardslot"],

		id:"wallet",
		name: ["Wallet", "钱包"],
		plural:"Wallets",

		num:1,
		price: 9680,
		size:"big",

		info:[
			"A simple wallet. Average capacity with a small coin pocket and a card slot.",
			"一个普通的单夹层钱包。容量一般，但附带一个小小的零钱口袋与卡槽。"
		],

		capacity: 500000,
		
		onEquip,
		onUnEquip
	},

	{
		tags:["equip", "wallet", "cardslot", "extraspace"],

		id:"purse",
		name:["Handheld Purse", "手持包"],
		plural:"Handheld Purses",

		num:1,
		price: 16800,
		size: "big",

		info:[
			"A rectangular, stylish handheld purse. With planty capacity to carry bundles of cash, store many coins and cell phone.",
			"一个长方形的时尚手持包。充足的容量让你随时带着上万现金，还有足够的空间存放大量零钱以及手机。"
		],

		capacity: 2500000,
		
		onEquip,
		onUnEquip
	}
];
 
Items.addItems(iContainers, "container")

//普通成瘾品，烟酒类
const iAddictive = [
{
	type:"consumable",
	tags: ["smoke", "addiction","nicotine"],	

	id: "cigarettes",
	name: ["Cigarette", "香烟"],
	plural:"Cigarettes",

	info: ["Cheap cigarettes, smells burnt", "廉价的香烟，一股烧焦味"],

	num: 20,
	price: 3600,
	size: 40,

	effects: [
		["stress", 8],
		["trauma", 8],
		["nicotine", 100, "p"],
	],
	stacksprites:[50, 100]
},

{
	type:"consumable",
	tags: ["smoke", "addiction","nicotine"],	

	id: "marlboro",
	name: ["Marlboro 100%", "马宝龙香烟"],
	plural:"Box of Marlboro 100%",

	info: [
		"A brand cigarettes with great flavor", 
		"一个品牌香烟，味道香醇"
	],	 

	num: 20,
	price: 6400,
	size: 40,

	effects: [
		["stress", 12],
		["trauma", 16],
		["nicotine", 180, "p"],
	],
	stacksprites:[10, 25, 50, 75, 100]
},
{
	type:"drinks",
	tags: ["canned", "alcohol",],	 

	id: "beer",
	name: ["Can of Beer", "啤酒"],
	plural:"Cans of Bear",

	info: [
		"Cheep beer, tastes like alcohol",
		"便宜的啤酒，尝起来跟和酒精没两样",
	],	

	num: 1,
	price: 540,
	size: "medium",

	effects: [
		["alcohol", 100, "p"],
		["stress", 5],
	],
},
{
	type:"drinks",
	tags: ["canned", "alcohol", ],

	id: "blackbeer",
	name: ["Can of Black Beer", "黑啤酒"],
	plural:"Cans of Black Beer",

	info: ["Black bear, a strong flavor", "黑啤，味道浓郁十分上头"],

	num: 1,
	price: 780,
	size: "medium",

	effects: [
		["alcohol", 160, "p"],
		["stress", 10],
		["fatigue", 60],
	],
},

{
	type:"drinks",
    tags:["seasonal", "spring", "alcohol"],

    id:"SakuraWineWithBox",
    name:["Sakura wine", "盒装樱花酒"],
    plural:"Sakura Wine",

    info: [
    "In a glass bottle is a trans pink liquor brewed with green apple and cherry blossom as its base,  with a whole cherry blossom and gold leaf inside ! It looks very dreamy.",
    "透明的玻璃瓶里是淡粉色、以青苹果和樱花为基底酿造的酒液，里面有整朵樱花和金箔！看上去非常梦幻。",
    ],

    price: 12860,
    num: 1,
    effects: [
		["alcohol", 80, "p"],
		["stress", 6],
		["fatigue", 40],
    ],

    msg:itemMsg.SakuraWineWithBox
},

{
	type:"drinks",
    tags:["seasonal", "spring", "alcohol"],

    id:"BulkSakuraWine",
    name:["bulkSakuraWine", "散装樱花酒"],
    plural:"bulkSakuraWine",

    info: [
    "In a glass bottle is a trans pink liquor brewed with green apple and cherry blossom as its base,  with a whole cherry blossom and gold leaf inside ! It looks very dreamy.　But selling it so cheap... seems suspicious.",
    "透明的玻璃瓶里是淡粉色、以青苹果和樱花为基底酿造的酒液，里面有整朵樱花和金箔！看上去非常梦幻。但是卖得这么便宜…有些可疑",
    ],

    price: 9670,
    num: 1,
    effects: [
		["alcohol", 80, "p"],
		["stress", 4],
		["fatigue", 20],
    ],

    msg:itemMsg.BulkSakuraWine
},
{
	type:"drinks",
    tags:["seasonal", "autumn", "alcohol"],

    id:"OsmanthusWine",
    name:["Osmanthus wine", "桂花酒"],
    plural:"Osmanthus wine",

    info: [
    "The liquor presents a bright amber hue, and the bottle neck is adorned with a delicate circle of pale golden osmanthus. Though unopened, it seems to emit the fragrant scent of osmanthus. Upon shaking the bottle, osmanthus blooms abundantly and cascades gracefully.",
    "酒液呈明亮的琥珀色，瓶口装饰着一圈淡淡的金黄色桂花。虽未开瓶，却仿佛散发着芬芳的桂花香。晃动瓶身，桂花纷繁而落。",
    ],

    price: 8920,
    num: 1,
    effects: [
		["alcohol", 100, "p"],
		["stress", 3],
		["fatigue", 80],
    ],

    msg:itemMsg.OsmanthusWine
},
];

Items.addItems(iAddictive)

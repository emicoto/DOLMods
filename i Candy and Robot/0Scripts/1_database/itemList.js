const iFoods = [
{
	tags: ["candy", "food"],

	id: "fruitscandy",
	name: ["Fruits Candy", "水果糖"],
	plural: "Fruits Candies",

	info: [
	"Sweet and sour, give you a little happiness",
	"酸酸甜甜的，提供些许幸福感",
	],

	price: 1800,
	num: 12,
	size: "tiny",

	effects: [
		["trauma", 5],
		["hunger", 10],
	],

	msg: itemMsg.fruitscandy,
	//stacksprites:[25, 50, 100]百分比值，当前堆叠数/堆叠上限 >= 数值时，在uid后加_num.png
},

{
	tags: ["candy", "food"],

	id: "chocolate",
	name: ["Chocolate", "巧克力"],
	plural: "Chocolates",

	info: [
	"Sweet chocolate, may relives a little stress for you",
	"甜甜的巧克力，能缓解些许压力",
	],

	price: 1600,
	num: 4,
	size: "small",

	effects: [
		["trauma", 5],
		["hunger", 10],
	],

	msg: itemMsg.chocolate,
	
},

{
	tags: ["drink", "bottle"],

	id: "ramune",
	name: ["Ramune", "波子水"],
	plural: "Ramunes",

	info: [
	"Cool ramune, recover a bit of stamina",
	"清爽的波子水，能补充点体力",
	],

	price: 500,
	num: 1,
	size: 3,

	effects: [
		["tiredness", 64]
	],
	
	msg: itemMsg.ramune,
},

{
	tags: ["snack", "food"],

	id: "potachips",
	name: ["Potato Chip", "薯片"],
	plural: "Potato Chips",

	info: [
	"Pack of crunchy chips for some hungry",
	"一包脆脆的薯片，补充些许体力。",
	],

	size: "big",
	price: 540,
	num: 1,

	effects: [
		["tiredness", 40],
		["hunger", 100],
	],

	msg: itemMsg.potachips,
},

{
	tags: ["candy", "food"],

	id: "lolipop",
	name: ["Lolipop", "波板糖"],
	plural: ["Lolipops"],

	info: [
	"Sweet, big lolipop, give you a bit of happiness",
	"甜甜的大波板糖，提供些许幸福感",
	],

	num: 1,
	price: 400,
	size: "medium",

	effects: [
		["trauma", 16],
		["hunger", 16],
		["stress", 1],
	],

	msg : itemMsg.lolipop,
},

{
	tags: ["food", "prepared"],	

	id: "sandwich",
	name: ["Sandwich", "三文治"],
	plural:"Sandwiches",

	num: 1,
	price: 1000,
	size: "big",

	info: [
	"Plain sandwiches, a bread cut into triangles with eggs, bacon and veggies",
	"普通的三文治，切成三角形的面包夹着鸡蛋培根和蔬菜",
	],

	effects: [
		["tiredness", 40],
		["hunger", 120],
	],
},

{
	tags: ["candy", "food"],

	id: "candyfloss",
	name: ["Candyfloss", "棉花糖"],
	plural:"Candyflosses",

	num: 1,
	price: 640,
	size: "big",

	info: [
	"Sweet, cloud like candyfloss, give you soft happiness",
	"甜甜的，云一般的棉花糖，给你软绵绵的幸福",
	],

	effects: [
		["tiredness", 20],
		["trauma", 5],
		["stress", 3],
		["hunger", 12],
	],

	msg : itemMsg.candyfloss,
},

{
	tags: ["food", "prepared"],

	id: "lunchbox",
	name: ["Lunch Box", "盒饭"],
	plural:"Lunch Boxes",

	num: 1,
	price: 1680,
	size: "big",

	info: [
	"Ordinary boxed lunch with vegetables and meat for nutritional balance",
	"普通的盒饭，有菜有肉营养均衡",
	],
	effects: [
		["hunger", 300],
		["tiredness", 80],
	],
},

{
	tags: ["canned", "drink"],

	id: "cola",
	name: ["Can of Cola", "可乐"],
	plural:"Cans of Cola",

	num: 1,
	price: 200,
	size: "medium",

	info: ["A regular canned cola", "一罐普通的罐装可乐"],
	effects: [
		["stress", 2]
	],

	msg: itemMsg.cola,
},
{
	tags: ["food", "bread"],
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
		["hunger", 100]
	]
}
];

Items.addItems(iFoods, 'foods')

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
		tags: ["chemical", "craft"],
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
		price: 1000,
		size: 50,

		info:[
			"sugar",
			"糖"
		]
	}
]
Items.addItems(ingredients)


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
	type:"foods",
	tags: ["canned", "addiction","drink","alcohol",],	 

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
	type:"foods",
	tags: ["canned", "addiction","drink","alcohol", ],

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
];

Items.addItems(iAddictive)

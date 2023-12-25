const Foods = [
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

	customtxt:{
		onUse: [
			`You unwrap the candy, and the crystal-clear sugar ball reflects an enticing light.<br>
			You pop the candy into your mouth, delicately lick its surface with your tongue. <br>
			The sweet and sour taste immediately spreads on the tip of your tongue, bringing an inexplicable sense of comfort to your heart.`,
			`你剥开糖纸，晶莹剔透的糖块反射着诱人的光芒。<br>
			你把糖果塞进口里，用舌头小心地舔舐着它的表面，酸酸甜甜的味道马上在你的舌尖上晕开，一阵莫名的舒心涌上你的心头。`
		]
	}

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

	customtxt:{
		onUse: [
			`The rich and silky texture of chocolate spreads in your mouth. <br>
			With each bite, your teeth feel like they are being gently embraced by smooth silk. <br>
			A warmth, akin to sunlight, envelops you, and you experience a moment of relaxation throughout your body.`,
			`巧克力那醇厚丝滑的口感在你口中扩散开来，每咬下一口，牙齿都像在被柔顺的丝绸温柔地拥抱着。<br>
			阳光般的温暖感笼罩了你，你感到身体一阵放松。`
		]
	}
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
	size: "big",

	effects: [
		["tiredness", 64]
	],
},

{
	tags: ["snack", "food"],

	id: "potachips",
	name: ["Bag of Potato Chips", "薯片"],
	plural: "bag of Potato Chips",

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

	customtxt:{
		onUse: [
			`You tear up the packaged and take a chip, put it in your mouth.<br>
			Each chip is crispy and delicious, emitting a delightful and unforgettable sweetness, along with a sense of happiness. <br>
			You quickly devour all the chips, feeling a bit disappointed that the package was too big for the relatively few chips it contained.`,
			`你撕开包装，拿起薯片送进嘴里。<br>
			每一片都酥脆可口，散发出令人回味无穷的香甜，以及幸福感。<br>
			你很快把这些薯片消灭一空，有些遗憾包装太大而薯片太少。`
		]
	}
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

	customtxt:{
		onUse:[
			`You peel up the candy wrapper, revealing the colorful swirls of the lollipop.<br>
			You lick it slowly, savoring each moment. Eating this kind of candy requires patience, as the sweetness lingers with you for quite a while, even after it's gone.<br><br>
			Suddenly, memories of childhood flash back to you. <br>
			It's a distant recollection, almost hazy, but the image of enjoying this type of candy from your younger days brings a smile to your face.`,
			`你掀开糖纸，露出下面五彩斑斓的波板糖。<br>
			你一点一点舔着它，吃这种糖需要耐心，糖果的甜味将会陪伴着你好一会儿，即使吃完了也不会马上消散。<br>
			你突然想起小时候吃这种糖的情景，那已经是十分遥远的记忆了，模糊至极，但你还是莫名地笑了一下。`
		]
	}
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

	customtxt:{
		onUse:[
			`You pick up a candyfloss, it's light as a feather, as if it could float away if you let go.<br>
			You delicately lick it, and the sensation is peculiar. It feels as if there's nothing there, yet the subtle and comforting sweetness is undeniably real.<br>
			As the thread-like syrup dissolves in your mouth, your mind also relaxes significantly.`,
			`你拿起一朵棉花糖，它轻飘飘的，像是一松手就会升上天去。<br>
			你小心地舔舐着它，口感非常奇妙，仿佛空无一物，但细腻舒心的甜味却又真实无比。<br>
			随着丝线般的糖浆在口中化开，你的精神也放松了许多。`
		]
	}
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

	customtxt:{
		onUse:[
			`With a gentle lift, a "pop" echoes as the pull tab opens.<br>
			The black liquid eagerly surges forth, much like your current desire to drink off it.<br><br>
			You take a sip, feeling the cola dance in your mouth. Not lingering too long on the sensation, you let it slide down your throat. <br>
			The refreshing coldness spreads from your stomach throughout your body, invigorating your spirit.`,
			`你轻轻一提，噗的一声，拉环应声而开。<br>
			黑色的液体急切地涌动着，就像你现在想要喝掉它的心情。<br><br>
			你啜饮了一口，感受可乐在你的口腔里跳动。没有让这种感觉停留太久，你让它滑进胃里，冰凉的舒心感从胃部传到全身，你的精神为之一振。<br>`
		]
	}
},
];

Items.addItems(Foods, 'foods')

const Special = [
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


Items.addItems(Special)

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
	
	iM.onEquip(pos, pocket, slot)
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

	iM.onUnEquip(pos)
}


const Containers = [
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
		girlish:{ displayname:['girlish', '女款'], img:'items/container/satchel_girl.png', sp:'girlish'}
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
		girlish:{ displayname:['girlish', '女款'], img:'items/container/leathersatchel_girl.png', sp:'girlish'},
		boyish:{ displayname:['boyish', '男款'], img:'items/container/leathersatchel_boy.png', sp:'boyish'}
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
  
  
Items.addItems(Containers, "container")

//普通成瘾品，烟酒类
const Addictive = [
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

Items.addItems(Addictive)

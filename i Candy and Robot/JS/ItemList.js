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

	stacksprites:[25, 50, 100]//百分比值，当前堆叠数/堆叠上限 >= 数值时，在uid后加_num.png
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
},

{
	tags: ["bottle", "drink"],

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
	plural: "Bags of Potato Chips",

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
	tags: ["food", "candy"],

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
	tags: ["drink", "canned"],

	id: "cola",
	name: ["Can of Cola", "可乐"],
	plural:"Cans of Cola",

	num: 1,
	price: 200,
	size: "medium",

	info: ["A regular canned cola", "一罐普通的罐装可乐"],
	effects: [
		["stress", 1]
	],
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
	size: "big",

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
			img:'items/lubricant_new.png'
		}
	}
},

{
	type: "consumable",
	tags: ["liquid", "lubricant"],

	id: "druglubricant",
	name: ["Aphrodisiac Anal Lube", "催情润滑夜"],
	plural:"Aphrodisiac Anal Lube",

	num: 200,
	price: 3000,
	size: "big",

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
},

]


Items.addItems(Special)

function onEquip(item){
	let pos = 'bag'
	if(this.tags.includes('cart')){
		pos = 'cart'
	}
	else if(this.tags.includes('wallet')){
		pos = 'wallet'
	}

	if(item.diff && this.diff){
		const diff = this.diff[item.diff]

		if(diff.sp){
			iCandy.setEquipEf(diff.sp)
		}
	}
	
	iM.onEquip(pos, this.id)
}

function onUnEquip(item){
	let pos = 'bag'
	if(this.tags.includes('cart')){
		pos = 'cart'
	}
	else if(this.tags.includes('wallet')){
		pos = 'wallet'
	}

	if(item.diff && this.diff){
		const diff = this.diff[item.diff]

		if(diff.sp){
			iCandy.unsetEquipEf(diff.sp)
		}
	}

	iM.onUnEquip(pos, this.id)
}


const Containers = [
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
		girlish:{ displayname:['girlish', '女款'], img:'container/satchel_girl.png', sp:'girlish'}
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
		girlish:{ displayname:['girlish', '女款'], img:'container/leathersatchel_girl.png', sp:'girlish'},
		boyish:{ displayname:['boyish', '男款'], img:'container/leathersatchel_boy.png', sp:'boyish'}
	  },

	  onEquip,
	  onUnEquip
	},
  
	{
	  tags: ["equip","bag"],

	  id: "schoolbag",
	  name: ["School Bag", "书包"],
	  plural:"School Bags",

	  info: ["A common school bag used by students.", "学生常用的书包。"],

	  num: 1,
	  price: 9680,
	  size: "big",
	  capacity: 8,
	  diff:{
		black:{ displayname:['black', '黑色'], img:'container/schoolbag_black.png'},
		pink:{ displayname:['pink', '粉色'], img:'container/schoolbag_pink.png', sp:'girlish'}
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
	tags: ["addiction","smoke", "nicotine"],	

	id: "cigarettes",
	name: ["Cigarette", "香烟"],
	plural:"Cigarettes",

	info: ["Cheap cigarettes, smells burnt", "廉价的香烟，一股烧焦味"],

	num: 18,
	price: 3600,
	size: "tiny",

	effects: [
		["stress", 8],
		["trauma", 8],
		["nicotine", 100, "p"],
	],
},

{
	type:"consumable",
	tags: ["addiction","smoke", "nicotine"],	

	id: "marlboro",
	name: ["Marlboro 100%", "马宝龙香烟"],
	plural:"Box of Marlboro 100%",

	info: [
		"A brand cigarettes with great flavor", 
		"一个品牌香烟，味道香醇"
	],	 

	num: 18,
	price: 6400,
	size: "tiny",

	effects: [
		["stress", 12],
		["trauma", 16],
		["nicotine", 180, "p"],
	],
},
{
	type:"foods",
	tags: ["addiction","drink","alcohol","canned"],	 

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
	tags: ["addiction","drink","alcohol", "canned"],

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


function onUseDrags(){
	const { id, tags, effects, doDelta } = this
	effects.forEach((effect) => {
		const [palam, min, method] = effect;
		const take = iCandy.getStat(id, 'taken') ?? 0

		let max = Math.floor(value*1.2 + 1.5);
		let value = random(min, max);

		value = value * Math.max(1 - take * 0.1, 0.2);

		doDelta(palam, value, method);
	});


	if(tags.has('risky', 'strong')){
		iCandy.setValue(id, 'efTimer', V.timeStamp + this.hours*60*60);
	}

	if(iCandy.checkStat(id)){
		iCandy.setValue(id, 'taken', 1)
		iCandy.setValue(id, 'lastTime', V.timeStamp)

		if(take >= this.threshold){
			iCandy.setValue(id, 'overdose', 1)
		}
		//如果有戒断状态，清除戒断状态
		if(iCandy.getStat(id, 'withdraw') > 0){
			iCandy.setStat(id, 'withdraw', 1)
		}
	}
}

const Medicines = [
	{
		tags: ["addiction", "pill"],
		
		id: "serotonin",
		name: ["Serotonin", "羟色胺"],
		plural:"Bottle of Serotonin",

		info: ["Help you relax and uplifit your mood", "具有放松和提振心情的作用"],		

		num: 20,
		price: 6200,
		size: "pill",

		effects: [["trauma", 16]],

		threshold: 4,	//安全使用次数，超过这个值会涨overdose
		maxOD: 12,		//最大过量值，超过这个值会上瘾
		withdraw: 4*24,	//出现戒断反应所需时间，单位是小时
		clear: 7,		//戒除需求时间，单位是天
		hours: 1,		//药效持续时间，单位是小时

		onUse: onUseDrags,
	},
	{
		tags: ["addiction", "pill"],

		id: "melatonin",
		name: ["Melatonin", "褪黑素"],
		plural:"Bottle of Melatonin",

		info: ["Help for sleep and reduce stress", "能帮助睡眠以及消减压力"],
		
		num: 30,
		price: 4800,
		size: "pill",

		effects: [["stress", 6]],

		threshold: 2,	//安全使用次数，超过这个值会涨overdose
		maxOD: 18,		//最大过量值，超过这个值会上瘾
		withdraw: 4*24, //出现戒断反应所需时间，单位是小时
		clear: 5,		//戒除需求时间，单位是天
		hours: 1,		//药效持续时间，单位是小时

		onUse: onUseDrags,
	},
	{
		tags: ["addiction", "pill"],
		
		id: "neuroOptimization",
		name: ["Neuro Optimization", "神经优化片"],
		plural:"Bottle of Neuro Optimization",

		info: ["Improves the brain and memory", "提神醒脑，增强记忆力"],

		num: 20,
		price: 6400,
		size: "pill",

		effects: [["control", 30]],

		threshold: 4,	//安全使用次数，超过这个值会涨overdose
		maxOD: 20,		//最大过量值，超过这个值会上瘾
		withdraw: 30,	//出现戒断反应所需时间，单位是小时
		clear: 5,		//戒除需求时间，单位是天
		hours: 1,		//药效持续时间，单位是小时

		onUse: onUseDrags,
	},

	{
		tags: ["addiction", "pill"],

		id: "aminobutyric",
		name: ["Aminobutyric", "氨基丁酸"],
		plural:"Bottle of Aminobutyric",

		info: [
		"Help for against depression and anxiety",
		"对抑郁症和焦虑症有一定抵御效果",
		],

		num: 20,
		price: 8600,
		size: "pill",

		effects: [["trauma", 50]],

		threshold: 2,	//安全使用次数，超过这个值会涨overdose
		maxOD: 10,		//最大过量值，超过这个值会上瘾
		withdraw: 3*24,	//出现戒断反应所需时间，单位是小时
		clear: 5,		//戒除需求时间，单位是天
		hours: 1,		//药效持续时间，单位是小时

		onUse: onUseDrags,
	},

	{
		tags: ["pill"],

		id: "painreduce",
		name: ["Painkiller", "止痛药"],
		plural:"Bottle of Painkiller",

		info: ["Fast-acting painkiller", "速效止痛药"],		

		num: 20,
		price: 4750,
		size: "pill",

		effects: [["pain", 30]],

		onUse: onUseDrags,
	},
	{
		tags: ["cream"],

		id: "bruiserelief",
		name: ["Bruise Relief Cream", "淤青霜"],
		plural:"Bruise Relief Cream",

		info: [
			"A cream for helps relieve pain, swelling, bruise.", 
			"一款有助于缓解疼痛、肿胀、瘀伤的药膏。"],		

		num: 120,
		usage: 6,

		price: 3474,
		size: "pill",

		effects: [["pain", 12]],

		onUse: onUseDrags,
	},
];

Items.addItems(Medicines, "medicine")


const Drugs = [
{
	tags: ["risky", "addiction", "pill"],

	id: "nzt_48",
	name: ["NZT-48", "NZT-48"],
	plural:"Pack of NZT48",

	info: [
	"Fabled smart drug, concentration and memory dramatically improved after taking it. But it is addictive.",
	"传说中的聪明药，吃了后集中力与记忆力大幅提高。但具备成瘾性。",
	],

	num: 12,
	price: 12600,
	size: "pill",

	effects: [
		["stress", 10]
	],

	threshold: 1,	//安全使用次数，超过这个值会涨overdose
	maxOD: 4,		//最大过量值，超过这个值会上瘾
	withdraw: 1*24,	//出现戒断反应所需时间，单位是小时
	clear: 14,		//戒除需求时间，单位是天
	hours: 12,		//药效持续时间，单位是小时

	onUse: onUseDrags,
	onHigh:function(min = 1){
		//如果在学习，会获得更好的学习效果。
		min = Math.max(min, 1);
		iUtil.getPalam("control", 2 * min);


		let flag = iCandy.getFlag(this.id, 'highonce')
		//如果已经设置过flag，不再重复显示提醒
		if(flag == 1) return '';

		iCandy.setFlag(this.id, 'highonce', 1)
		let html =
			lanSwitch(
			"The effects of NZT-48 is on, you're feeling full of confident.",
			"NZT-48正在起作用，你感觉充满了自信。"
			) + `<<gcontrol>>`;
		
		return html;
	},
	onWake:function(){
		//药效下头后会变疲劳
		iUtil.getPalam("tiredness", 20 * min);

		let html =
		  lanSwitch(
			"The effects of NZT-48 is wearing off, you feel a little tired.",
			"NZT-48的效果正在消退，你感觉有些疲劳。"
		  ) + `<<ltiredness>>`;
		
		  return html;
	},
	onWithdraw:function(){
		wikifier("control", -80);
		wikifier("stress", 80)
		wikifier("willpower", -50)

		let html =
		  lanSwitch(
			"Without NZT-48, you feel frustrated and lose your confidence.",
			"没有嗑NZT-48，你感觉心烦意乱，失去了自信。"
		  ) + `<<llcontrol>><<ggstress>><<lllwillpower>>`;
		return html;
	
	}
},

{
	tags: ["risky", "addiction", "pill"],	
	id: "heroin",
	name: ["Heroin", "海洛因"],
	plural:"Pack of Heroin",

	info: [
	"Recreational drugs, take away your stress and bring you peace",
	"娱乐性药物，消除烦恼，给你带来快乐",
	],

	num: 4,
	price: 6800,
	size: "pill",

	effects: [
		["trauma", 60],
		["aphrod", 1000],
		["arousal", 1000, "p"],
		["hallucinogen", 100],
	],

	threshold: 1,	//安全使用次数，超过这个值会涨overdose
	maxOD: 2,		//最大过量值，超过这个值会上瘾
	withdraw: 24+18, //出现戒断反应所需时间，单位是小时
	clear: 28,		//戒除需求时间，单位是天
	hours: 2,		//药效持续时间，单位是小时

	onUse: onUseDrags,
	onHigh:function(min = 1){
		min = Math.max(min, 1);
		iUtil.getPalam("stress", -(2 * min));

		let html =
		  lanSwitch(
			"The effects of Heroin is on, you're feeling easy.",
			"海洛因正在起作用，你感觉心情愉快。"
		  ) + `<<gcontrol>>`;

		return html;
	}
},

{
	tags: ["risky", "addiction", "pill"],

	id: "mdma",
	name: ["MDMA", "摇头丸"],
	plural:"Pack of MDMA",

	info: [
	"Stimulant drugs to eliminate pain and fatigue",
	"兴奋类药物，消除痛苦与疲劳",
	],

	num: 5,
	price: 5600,
	size: "pill",

	effects: [
		["pain", 20],
		["tiredness", 200],
	],

	threshold: 1,	//安全使用次数，超过这个值会涨overdose
	maxOD: 2,		//最大过量值，超过这个值会上瘾
	withdraw: 24+16,//出现戒断反应所需时间，单位是小时
	clear: 28,		//戒除需求时间，单位是天
	hours: 2,		//药效持续时间，单位是小时

	onUse: onUseDrags,
	onHigh:function(min = 1){
		min = Math.max(min, 1);

		iUtil.getPalam("pain", -(5 * min));
		iUtil.getPalam("tiredness", -(5 * min));
	
		let html =
		  lanSwitch(
			"The effects of MDMA is on, you feel all the pains and tiredness are gone.",
			"摇头丸的效果上头了，你感觉浑身都很轻松。"
		  ) + `<<lpain>><<ltiredness>>`;
		return html;
	}
},

{
	tags: ["risky", "addiction", "inject"],

	id: "amphetamine",
	name: ["Amphetamine", "安非他命"],
	plural:"Pack of Amphetamine",

	info: [
	"Central stimulant, will get you high to heaven",
	"中枢兴奋剂，让你从头爽到尾。",
	],	

	num: 2,
	price: 7260,
	size: "inject",

	effects: [
		["pain", 20],
		["tiredness", 80],
		["arousal", 1000, "p"],
		["aphrod", 1000],
	],

	threshold: 0, 	//安全使用次数，超过这个值会涨overdose
	maxOD: 2, 		//最大过量值，超过这个值会上瘾
	withdraw: 20,	//出现戒断反应所需时间，单位是小时
	clear: 32,		//戒除需求时间，单位是天
	hours: 4,		//药效持续时间，单位是小时

	_onUse: onUseDrags,
	onUse: function(){
		this._onUse();
		
		//随机设置两个感官
		let list = ["genital", "bottom", "breast", "mouth"]
		let type = list.random()
		iCandy.senseSet(type, this.id, 0.1,  this.hours*60*60 , 0.02);

		//去掉已经设置好的，再随机一个
		list.delete(type)
		type = list.random()
		iCandy.senseSet(type, this.id, 0.1,  this.hours*60*60 , 0.02);


	},
	onHigh:function(min = 1){
		min = Math.max(min, 1);

		wikifier("arousal", 300*min, "genital");
		iUtil.getPalam("hallucinogen", 5*min);

		let flag = iCandy.getFlag(this.id, 'highonce')
		if(flag == 0){
			iCandy.setFlag(this.id, 'highonce', 1)
		}

		//第一次显示与持续显示有差分
		let html =
		  lanSwitch(
			"The effects of Amphetamine is on. A strong sensatons hit your whole body like an electric, making your body even more sensitive.",
			"安非他命的效果上来了，强烈的快感如电流般袭击全身，让你的身体更加敏感了。"
		  ) + `<<gggarousal>>`;
		
		if(flag == 1){
			html =
			  lanSwitch(
				"The amphetamine drown you in the storm of pleasure. Your body becomes more sensitive as the drug effect increases.",
				"安非他命让你沉浸在快感的风暴中。你的身体随着药效增强变得更加敏感了。"
			  ) + `<<gggarousal>>`;
		}
		return html;
	},
	onWake:function(){
		//感度逐步恢复
		let html =
		  lanSwitch(
			"The effects of Amphetamine is wearing off, you feel your body gradually calming down",
			"安非他命的效果正在消退，你感觉身体逐渐平复下来。"
		  );
		
		return html;
	}
},

{
	tags: ["risky", "addiction", "smoke"],	

	id: "canabitabacco",
	name: ["Cannabi Tabacco", "大麻烟"],
	plural:"Box of Cannabi Tabacco",

	info: [
	"Cigarettes made of cannabis. Have a smoke to be happy",
	"大麻制成的香烟，吸一口快乐好逍遥",
	],	

	num: 12,
	price: 5760,
	size: "small",

	effects: [
		["pain", 5],
		["stress", 5],
	],

	threshold: 1, 	//安全使用次数，超过这个值会涨overdose
	maxOD: 5,		//最大过量值，超过这个值会上瘾
	withdraw: 2*24+4, //出现戒断反应所需时间，单位是小时
	clear: 24,		 //戒除需求时间，单位是天
	hours: 0.3,		 //药效持续时间，单位是小时


	onUse: onUseDrags,
	onHigh:function(min = 1){
		min = Math.max(min, 1);
		if(V.combat == 1) return;

		iUtil.getPalam("stress", -(5 * min));

		let flag = iCandy.getFlag(this.id, 'highonce')
		if(flag == 1) return '';

		let html =
		  lanSwitch(
			"As the smoke of canabis around your head, you feel like your worries have gone.",
			"当大麻的烟雾旋绕在你头上，你感觉烦恼都烟消云去了。"
		  ) + `<<lstress>>`;
		return html;
	}
},

{
	tags: ["strong", "addiction", "inject", "super"],

	id: "cocaine",
	name: ["Cocaine", "可卡因"],
	plural:"Pack of Cocaine",

	info: [
	"Fast-acting nerve stimulant that eliminates all pain and worries.",
	"速效神经兴奋剂，消除所有痛苦与烦恼。",
	],

	num: 2,
	price: 12860,
	size: "inject",

	effects: [
		["pain", 100],
		["trauma", 200],
		["aphrod", 1000],
	],

	threshold: 0,
	maxOD: 1,
	withdraw: 18,
	clear: 52,
	hours: 2,

	onUse: onUseDrags,
	onHigh:function(min = 1){
		min = Math.max(min, 1);

		wikifier("drunk", 10 * min);
		wikifier("arousal", 4000, "genital");
		let html =
		  lanSwitch(
			"A strong ecstacy thrills your whole body, as you are dancing on the clouds.",
			"你全身上下都感到十分愉悦，仿佛在云端跳舞。"
		  ) + `<<ggdrunk>><<ghallucinogens>><<ggarousal>>`;
		return html;
	},
	onWake:function(){
		wikifier("drunk", -200);
		wikifier("control", -30);
		wikifier("stress", 80);
		let html =
		  lanSwitch(
			"After the cocaine wears off, you feel like falling off from the clouds.",
			"可卡因的药效过后，你感觉从云端掉了下来。"
		  ) + `<<llldrunk>><<ggstress>><<llcontrol>>`;
		return html;
	},
	onDay:function(){
		wikifier("control", 30);
		let html =
		  lanSwitch(
			"Continuously taking cocaine makes your confidence grow.",
			"持续吸取可卡因让你信心增长。"
		  ) + `<<ggcontrol>>`;
		return html;
	},
	onWithdraw:function(){
		wikifier("control", -60);
		wikifier("stress", 60);
		let html =
		  lanSwitch(
			"Cocaine withdrawal makes you feel empty and lost.",
			"可卡因的戒断反应让你感到空虚难受。"
		  ) + `<<lllcontrol>><<gggstress>>`;
		return html;
	}
},

{
	tags: ["strong", "addiction", "inject", "immediate"],

	id: "angelpowder",
	name: ["Angel Powder", "天使粉"],
	plural:"Pack of Angel Powder",

	info: [
		"Fast-acting psychotropic drugs, takes you fly to heaven",
		"速效精神药物，带你直上天国。",
	],

	num: 2,
	price: 28680,
	size: "inject",
	
	effects: [
		["pain", 100],
		["trauma", 320],
		["stress", 36],
		["aphrod", 1000],
		["drunk", 1000],
	],

	threshold: 0, //安全使用次数，超过这个值会涨overdose
	maxOD: 0,	  //最大过量值，超过这个值会上瘾
	withdraw: 16, //出现戒断反应所需时间，单位是小时
	clear: 64,  //戒除需求时间，单位是天
	hours: 1,   //药效持续时间，单位是小时

	_onUse: onUseDrags,
	onUse: function(){
		this._onUse();
		//提升全部感官
		iCandy.senseSet("genital", this.id, 0.5,  3*60*60 , 0.01);
		iCandy.senseSet("bottom", this.id, 0.5,  3*60*60 , 0.01);
		iCandy.senseSet("breast", this.id, 0.5,  3*60*60 , 0.01);
		iCandy.senseSet("mouth", this.id, 0.5,  3*60*60 , 0.01);
	
	},
	onHigh:function (min = 1){
		min = Math.max(min, 1);
		wikifier("hallucinogen", 5 * min);
		wikifier("arousal", 4000, "genital");
		let html =
		  lanSwitch(
			"An indescribable thrill of pleasure erupts from the depths of your soul.",
			"一股无法描述的快感从你的灵魂深处迸发。"
		  ) + `<<ghallucinogens>><<gggarousal>>`;
		return html;
	},
	onWake:function(){
		let physique = random(30, 60) / 10;
		wikifier("physique_loss", physique);
	
		wikifier("control", -20);
		wikifier("stress", 120);
	
		let html =
		  lanSwitch(
			"After the angel powder wears off, you feel weak and powerless.",
			"天使粉的药效过后，你感到虚弱无力。"
		  ) + `<<lcontrol>><<lphysique>><<gggstress>>`;
		return html;
	},
	onDay:function(){
		let physique = random(80, 160);
		iUtil.getPhysique(physique);
	
		let will = random(10, 20);
		wikifier("willpower", will);
	
		wikifier("awareness", -6);
		wikifier("pain", -20);
		wikifier("trauma", -20);
		wikifier("stress", -10);
		wikifier("tiredness", -30);
	
		wikifier("arousal", 300);
	
		let html =
		  lanSwitch(
			"The Angel powder in your body inspries you, makes you feeling easy and happy.",
			"体内的天使粉鼓舞着你，让你感到轻松愉快。"
		  ) +
		  `<<ggphysique>><<gwillpower>><<llawareness>><<lllpain>><<lltrauma>><<llstress>><<lltiredness>><<ggarousal>>`;
		return html;
	},
	onWithdraw:function(){
		let physique = random(60, 120) / 10;
		wikifier("physique_loss", physique);
	
		let will = random(10, 20);
		wikifier("willpower", -will);
	
		let stress = random(12, 18);
		wikifier("stress", stress);
	
		let html =
		  lanSwitch(
			"You're feeling a little weak without the Angel Powder.",
			"没有吸食天使粉的你感到身体有些虚弱……"
		  ) + `<<lphysique>><<lwillpower>><<ggstress>>`;
		return html;
	}
},
];

Items.addItems(Drugs, "drugs")
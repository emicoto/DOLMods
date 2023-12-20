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

	effects: [["tiredness", 64]],
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
	name: ["Cola", "可乐"],
	plural:"Colas",

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

const Specal = [
{
	type: "items",
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
},

{
	type: "items",
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
		["drugged", 200, "p"],
		["hunger", 50, "p"],
	],
},

]


Items.addItems(Specal)

const Containers = [
	{
	  tags: ["bag"],

	  id: "satchel",
	  name: ["Small Satchel", "小挎包"],

	  info: ["A small, cute satchel.", "一个小巧可爱的挎包。"],

	  num: 1,
	  price: 4200,
	  size: "big",
	  capacity: 4,
	},
  
	{
	  tags: ["bag"],

	  id: "leathersatchel",
	  name: ["Leather Satchel", "皮包"],

	  info: ["A stylish designed, leather satchel.", "一个时尚的皮包。"],

	  num: 1,
	  price: 6800,
	  size: "big",
	  capacity: 6,
	},
  
	{
	  tags: ["bag"],

	  id: "schoolbag",
	  name: ["School Bag", "书包"],

	  info: ["A common school bag used by students.", "学生常用的书包。"],

	  num: 1,
	  price: 9680,
	  size: "big",
	  capacity: 8,
	},
  
	{
	  tags: ["bag"],

	  id: "backpack",
	  name: ["Backpack", "大背包"],

	  info: [
		"A large backpack with plenty of capacity.",
		"一个有着充足容量的大背包。",
	  ],	  

	  num: 1,
	  price: 13620,
	  size: "big",

	  capacity: 12,
	},
  
	{
	  tags: ["bag"],

	  id: "hikingpack",
	  name: ["Hiking Backpack", "登山包"],

	  info: [
		"Extra large capacity backpack for hikinA collapsible cartg.",
		"一个有着充足容量的大背包。",
	  ],
	  	  
	  num: 1,
	  price: 13620,
	  size: "big",
	  capacity: 20,
	},
  
	{
	  tags: ["cart"],

	  id: "cart",
	  name: ["Simple Cart", "简易手推车"],

	  num: 1,
	  price: 13620,
	  size: "big",

	  info: ["A simple, collapsible cart", "一个简易的，可折叠的手推车。"],
	  capacity: 36,
	},
  
	{
	  tags: ["cart"],

	  id: "xlcart",
	  name: ["XL Outdoor Cart", "可折叠户外手推车"],

	  num: 1,
	  price: 38960,
	  size: "big",

	  info: ["A normal, collapsible cart", "一个普通的，可折叠的手推车。"],
	  capacity: 50,
	},
  ];
  
  
Items.addItems(Containers, "container")

//普通成瘾品，烟酒类
const Addictive = [
{
	type:"items",
	tags: ["addiction","smoke", "nicotine"],	

	id: "cigarettes",
	name: ["Cigarettes", "香烟"],

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
	type:"items",
	tags: ["addiction","smoke", "nicotine"],	

	id: "marlboro",
	name: ["Marlboro 100%", "马宝龙香烟"],

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
	name: ["Beer", "啤酒"],

	info: [
	"Cheep beer, tastes like alcohol",
	"便宜的啤酒，尝起来跟和酒精没两样",
	],	

	num: 1,
	price: 540,
	size: "medium",

	effects: [
		["drunk", 100, "p"],
		["stress", 5],
	],
},
{
	type:"foods",
	tags: ["addiction","drink","alcohol", "canned"],

	id: "blackbeer",
	name: ["Black Beer", "黑啤酒"],

	info: ["Black bear, a strong flavor", "黑啤，味道浓郁十分上头"],

	num: 1,
	price: 780,
	size: "medium",

	effects: [
		["drunk", 160, "p"],
		["stress", 10],
		["fatigue", 60],
	],
},
];
  
  
Items.addItems(Addictive, "items")


function onUseDrags(){
	const effects = this.effects;
	effects.forEach((effect) => {
		const [palam, min, method] = effect;
		const { taken } = V.candyDrug[this.id];	

		let max = Math.floor(value*1.2 + 1.5);
		let value = random(min, max);

		value = value * Math.max(1 - taken * 0.1, 0.2);

		this.doDelta(palam, value, method);
	});


	if(this.tags.includes('risky')){
		V.iCandyStats.tempflag.candy[this.id] = 1;
	}
	else if(this.tags.includes('strong')){
		V.iCandyStats.tempflag.candy[this.id] = 2;
	}

	if(V.candyDrug[this.id]){
		V.candyDrug[this.id].taken ++;
		if(V.candyDrug[this.id].taken >= this.threshold){
			V.candyDrug[this.id].overdose++
		}
	}
}

const Medicines = [
	{
		tags: ["addiction", "pill"],
		
		id: "serotonin",
		name: ["Serotonin", "羟色胺"],

		info: ["Help you relax and uplifit your mood", "具有放松和提振心情的作用"],		

		num: 20,
		price: 6200,
		size: "pill",

		effects: [["trauma", 16]],

		threshold: 4,
		maxOD: 12,
		withdraw: 4,
		clear: 7,
		hours: 1,

		onUse: onUseDrags,
	},
	{
		tags: ["addiction", "pill"],

		id: "melatonin",
		name: ["Melatonin", "褪黑素"],

		info: ["Help for sleep and reduce stress", "能帮助睡眠以及消减压力"],
		
		num: 30,
		price: 4800,
		size: "pill",

		effects: [["stress", 6]],

		threshold: 2,
		maxOD: 18,
		withdraw: 4,
		clear: 5,
		hours: 1,

		onUse: onUseDrags,
	},
	{
		tags: ["addiction", "pill"],
		
		id: "neuroOptimization",
		name: ["Neuro Optimization", "神经优化片"],

		info: ["Improves the brain and memory", "提神醒脑，增强记忆力"],

		num: 20,
		price: 6400,
		size: "pill",

		effects: [["control", 30]],

		threshold: 4,
		maxOD: 20,
		withdraw: 1.2,
		clear: 5,
		hours: 1,

		onUse: onUseDrags,
	},

	{
		tags: ["addiction", "pill"],

		id: "aminobutyric",
		name: ["Aminobutyric", "氨基丁酸"],

		info: [
		"Help for against depression and anxiety",
		"对抑郁症和焦虑症有一定抵御效果",
		],

		num: 20,
		price: 8600,
		size: "pill",

		effects: [["trauma", 50]],

		threshold: 2,
		maxOD: 10,
		withdraw: 3,
		clear: 5,
		hours: 1,

		onUse: onUseDrags,
	},

	{
		tags: ["pill"],

		id: "painreduce",
		name: ["Painkiller", "止痛药"],

		info: ["Fast-acting painkiller", "速效止痛药"],		

		num: 20,
		price: 4750,
		size: "pill",

		effects: [["pain", 30]],

		onUse: onUseDrags,
	},
];

Items.addItems(Medicines, "medicine")


const Drugs = [
{
	tags: ["risky", "addiction", "pill"],

	id: "nzt_48",
	name: ["NZT-48", "NZT-48"],

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

	threshold: 1,
	maxOD: 4,
	withdraw: 1,
	clear: 14,
	hours: 12,

	onUse: onUseDrags,
	onHigh:function(min = 1){
		//如果在学习，会获得更好的学习效果。
		wikifier("control", 1 * min);
		let html =
			lanSwitch(
			"The effects of NZT-48 is on, you're feeling full of confident.",
			"NZT-48正在起作用，你感觉充满了自信。"
			) + `<<gcontrol>>`;
		return html;
	}
},

{
	tags: ["risky", "addiction", "pill"],	
	id: "heroin",
	name: ["Heroin", "海洛因"],

	info: [
	"Recreational drugs, take away your stress and bring you peace",
	"娱乐性药物，消除烦恼，给你带来快乐",
	],

	num: 4,
	price: 6800,
	size: "pill",

	effects: [
		["trauma", 60],
		["drugs", 1000],
		["arousal", 1000, "p"],
		["hallucinations", 100],
	],

	threshold: 1,
	maxOD: 2,
	withdraw: 2,
	clear: 28,
	hours: 1,

	onUse: onUseDrags,
	onHigh:function(min = 1){
		getPalam("stress", -(2 * min));
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

	threshold: 1,
	maxOD: 2,
	withdraw: 2,
	clear: 28,
	hours: 1,

	onUse: onUseDrags,
	onHigh:function(min = 1){
		getPalam("pain", -(5 * min));
		getPalam("tiredness", -(5 * min));
	
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

	id: "amhetamine",
	name: ["Amphetamine", "安非他命"],

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
		["drugs", 1000],
	],

	threshold: 0,
	maxOD: 2,
	withdraw: 2,
	clear: 32,
	hours: 2,

	onUse: onUseDrags,
	onHigh:function(min = 1){
		wikifier("arousal", 1000, "genital");

		let list = ["genital", "bottom", "breast", "mouth"];
		let i = random(0, 4);
		getExtraSens(list[i], 0.001 * min, 300); //时间单位：分钟
	
		let html =
		  lanSwitch(
			"The effects of Amphetamine is on. A strong sensatons hit your whole body like an electric, making your body even more sensitive.",
			"安非他命的效果上来了，强烈的快感如电流般袭击全身，让你的身体更加敏感了。"
		  ) + `<<gggarousal>>`;
		return html;
	}
},

{
	tags: ["risky", "addiction", "smoke"],	

	id: "canabitabacco",
	name: ["Cannabi Tabacco", "大麻烟"],

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

	threshold: 1,
	maxOD: 5,
	withdraw: 2,
	clear: 24,
	hours: 1,


	onUse: onUseDrags,
	onHigh:function(min = 1){
		getPalam("stress", -(5 * min));

		let html =
		  lanSwitch(
			"As the smoke of canabis around your head, you feel like your worries have gone.",
			"当大麻的烟雾旋绕在你头上，你感觉烦恼都烟消云去了。"
		  ) + `<<lstress>>`;
		return html;
	}
},

{
	tags: ["strong", "addiction", "inject"],

	id: "cocaine",
	name: ["Cocaine", "可卡因"],

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
		["drugs", 1000],
	],

	threshold: 0,
	maxOD: 0,
	clear: 52,
	hours: 2,

	onUse: onUseDrags,
	onHigh:function(min = 1){
		wikifier("drunk", 10 * min);
		wikifier("arousal", 1000, "genital");
		let html =
		  lanSwitch(
			"A strong ecstacy thrills your whole body, as you are dancing on the clouds.",
			"你全身上下都感到十分愉悦，仿佛在云端跳舞。"
		  ) + `<<ggdrunk>><<ghallucinogens>><<ggarousal>>`;
		return html;
	},
	onAfter:function(){
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
	tags: ["strong", "addiction", "inject"],

	id: "angelpowder",
	name: ["Angel Powder", "天使粉"],

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
		["drugs", 1000],
		["alcohol", 1000],
	],

	threshold: 0,
	maxOD: 0,
	clear: 64,
	hours: 1,

	onUse: onUseDrags,
	onHigh:function (min = 1){
		wikifier("hallucinogen", 5 * min);
		wikifier("arousal", 1000, "genital");
		let html =
		  lanSwitch(
			"An indescribable thrill of pleasure erupts from the depths of your soul.",
			"一股无法描述的快感从你的灵魂深处迸发。"
		  ) + `<<ghallucinogens>><<gggarousal>>`;
		return html;
	},
	onAfter:function(){
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
		getPhysique(physique);
	
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

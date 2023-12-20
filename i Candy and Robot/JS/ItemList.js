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
	size: "big",

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
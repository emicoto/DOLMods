const iFoods = [
	{
		tags: ["candy", "packed"],

		id: "fruitscandy",
		name: ["Fruits Candy", "水果糖"],
		plural: "Fruits Candies",

		info: [
		"Sweet and sour, give you a little happiness",
		"酸酸甜甜的，提供些许幸福感",
		],
		unit: "piece",

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
		tags: ["candy", "packed"],

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
		unit: "piece",

		effects: [
			["trauma", 2],
			["hunger", 80],
		],

		msg: itemMsg.chocolate,
		
	},
	{
		tags: ["bagged", "snack"],

		id: "potachips",
		name: ["Potato Chips", "薯片"],
		plural: "Potato Chips",

		info: [
		"Bag of crunchy chips for some hungry",
		"一包脆脆的薯片，补充些许体力。",
		],

		size: "medium",
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
		tags: ["bagged", "snack"],

		id: "orionring",
		name: ["Orion Rings", "洋葱圈"],
		plural: "Orion Rings",

		info: [
		"Bag of crunchy orion rings for some hungry",
		"一包松脆的洋葱圈，补充些许体力。",
		],

		size: "medium",
		price: 380,
		num: 1,

		effects: [
			["tiredness", 12],
			["hunger", 120],
			["thirsty", 120, 'p']
		],

	},
	{
		tags: ["candy"],

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
		unit: "piece",

		effects: [
			["trauma", 4],
			["hunger", 40],
			["stress", 3],
		],

		msg: itemMsg.lolipop,
	},
	{
		tags: ["packed", "snack"],

		id: "oreo",
		name: ["Oreo", "奥利奥"],
		plural: "Oreos",

		info: [
		"Black and white oreo, sweet and crunchy.",
		"黑白相间的奥利奥，甜甜脆脆的。",
		],

		num: 10,
		price: 520,
		size: 10,
		unit: "piece",

		effects: [
			["tiredness", 20],
			["hunger", 200],
			["stress", 2],
		],
	},
	{
		tags: ["boxed", "snack"],

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
		tags: ["canned", "snack"],

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
		tags: ["packed", "snack"],

		id: "jellos",
		name: ["Jellos", "果冻"],
		plural: "Pack of Jellos",

		info: [
			"Smoothy and juicy Jellos, too many flavors to choose.",
			"滑溜又多汁的果冻，有太多口味可供选择了。",
		],

		num: 3,
		price: 1640,
		size: 6,
		unit: "cup",

		effects: [
			["stress", 1],
			["hunger", 50],
			["thirsty", 20]
		],
	},
	{
		tags: ["pastry", "premade"],

		id: "sandwich",
		name: ["Sandwich", "三文治"],
		plural:"Sandwiches",

		num: 1,
		price: 650,
		size: "big",
		unit: "piece",

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
		tags: ["candy"],
		location: ["stall"],

		id: "candyfloss",
		name: ["Candyfloss", "棉花糖"],
		plural:"Candyflosses",

		num: 1,
		price: 340,
		size: "big",
		unit: "piece",

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

		msg: itemMsg.candyfloss,
	},

	{
		tags: ["mealbox", "premade"],

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
		tags: ["boxed", "snack"],
		id: "danishcookies",
		name: ["Danish Cookies", "丹麦曲奇"],
		plural:"Boxes of Danish Cookies",

		num: 24,
		price: 2464,
		size: 24,
		unit: "piece",

		info: [
			"Delicious Danish cookies, various styles, crispy and delicious.",
			"美味的丹麦曲奇，款式多样，松脆可口。",
		],

		effects: [
			["stress", 1],
			["hunger", 10],
			["thirsty", 10, 'p']
		],

		stacksprites:[ 30, 80, 100]

	},
	{
		tags: ["boxed", "candy"],
		id:"ferrero",
		name:["Ferrero", "费列罗"],
		plural:"Boxes of Ferrero",

		num: 12,
		price: 3280,
		size: 36,
		unit: "piece",

		info: [
			"Delicious Ferrero chocolate, sweet and crunchy outside, rich hazelnut chocolate inside",
			"美味的费列罗巧克力，甜甜脆脆的外壳内是浓郁的榛果巧克力",
		],

		effects: [
			["stress", 1],
			["trauma", 2],
			["hunger", 10]
		],

		stacksprites:[ 30, 80, 100]
	},
	{
		tags: ["packed", "pastry", "premade"],
		id:"sandwichbread",
		name:["White Bread", "白面包"],
		plural:"White Breads",

		num: 10,
		price: 1000,
		size:10,
		unit: "piece",

		info:[
			"A loaf of bread for making sandwitches",
			"用来做三文治的面包"
		],

		effects:[
			["hunger", 360]
		]
	},
	{
		tags:["seasonal", "spring", "mealbox"],

		id:"SpringBoxedMeal",
		name:["Spring Boxed Meal", "春季便当"],
		plural:"Spring Boxed Meals",

		info: [
		"Filled with the deliciousness of spring.",
		"满含春天的美味，内含了明太子散寿司、炸虾和马铃薯泥生菜沙拉佐番茄。",
		],

		price: 4820,
		num: 1,
		effects: [
			["hunger" , 1200],
		],

		msg: itemMsg.SpringBoxedMeal,
	},
	{
		tags:["seasonal", "autumn", "mealbox"],

		id:"AutumnBoxedMeal",
		name:["Autumn Boxed Meal", "秋季便当"],
		plural:"Autumn Boxed Meals",

		info: [
		"A luxury box filled by autumn specialties.",
		"豪华的漆器盒子里面装载着满满的秋日特产，吸饱了蒲烧酱汁的米饭、肥嫩的蒲烧鳗、切成片的松茸，还有摆放成鲜艳花朵的当季新鲜鲑鱼。",
		],

		price: 4820,
		num: 1,
		effects: [
			["hunger" , 1200],
		],

		msg: itemMsg.AutumnBoxedMeal,
	},

	{
		tags:["seasonal", "autumn", "pieces", "pastry"],

		id:"ChestnutRoyalCake",
		name:["Chestnut Royal Cake", "栗香伯爵茶戚风蛋糕"],
		plural:"Chestnut Royal Cake",

		info: [
		"Royal tea chiffon cake filled with chesnuts, and chopped chocolate surrounding.",
		"在伯爵茶戚风蛋糕的基底上加入了满满的栗子馅，细碎的巧克力围绕着红茶奶油、闻起来充满了伯爵红茶带着些微果香的芬芳与栗子馨香甜美。",
		],

		price: 12400,
		num: 4,
		size: 4,
		effects: [
			["hunger" , 420],
		],

		msg: itemMsg.ChestnutRoyalCake,
	},
	{
		tags:["seasonal", "spring", "meal", "pastry"],

		id:"HanamiDango",
		name:["Hanami Dango", "花见团子"],
		plural:"Hanami Dango",

		info: [
		"String together three colored dango.",
		"由三种颜色的团子串成，要是能在樱花树下享用就更好了",
		],

		price: 600,
		num: 1,
		size: "small",

		effects: [
			["hunger" , 240],
		],

		msg: itemMsg.HanamiDango,
	},
	{
		tags:["seasonal", "spring", "meal", "pastry"],

		id:"Sakuramochi",
		name:["Sakuramochi", "樱饼"],
		plural:"Sakuramochi",

		info: [
		"A snack wrapped in cherry blossom sticky rice skin and leaves of the cherry blossom tree.",
		"被花瓣染成嫩粉色的糯米外皮包着甜蜜的红豆沙馅料、再由盐渍的樱花叶包裹，就完成了这个可爱又充满春天气息的点心。",
		],

		price: 1200,
		num: 3,
		size: "small",
		unit: "piece",

		effects: [
			["hunger" , 100],
		],

		msg: itemMsg.Sakuramochi,
	},
	{
		tags:["seasonal", "summer", "meal", "ramen"],

		id:"ColdRamen",
		name:["Cold Ramen", "中华冷面"],
		plural:"Cold Ramen",

		info: [
		"Loaded with cold noodles, topped with cucumber, tomato, soft-boiled egg, ham, and shrimp.",
		"用透明压克力盒装载满满的冷面、上面有小黄瓜、番茄、溏心蛋、火腿和虾仁，光是看着就能感到凉爽。",
		],

		price: 4220,
		num: 1,
		size: "big",
		effects: [
			["hunger" , 1000],
		],

		msg: itemMsg.ColdRamen,
	},
	{
		tags:["seasonal", "autumn", "pastry"],

		id:"MontBlancCake",
		name:["Mont Blanc Cake", "栗子蒙布朗"],
		plural:"Mont Blanc Cake",

		info: [
		"On the light and airy meringue cookies, spread rum raisins, topped with a generous layer of chestnut puree.",
		"在酥松轻盈的蛋白霜饼干上铺着酒酿葡萄、覆盖满满的栗子泥，最后淋上生奶油与糖粉、就是这份让人联想到秋日山峰的甜品了！",
		],

		price: 10400,
		num: 1,
		effects: [
			["hunger" , 400],
		],
		unit: "piece",

		msg: itemMsg.MontBlancCake,
	},
	{
		tags:["seasonal", "winter", "meal", "meat"],

		id:"PorkPie",
		name:["Pork pie", "猪肉派"],
		plural:"Pork pie",

		info: [
		"A traditional pork pie in the British style.",
		"英式的传统猪肉派，简单但细致美观的金黄色酥皮包裹着鲜美的肉馅和充满胶质的肉冻、散发着淡淡的肉香。",
		],

		price: 3200,
		num: 1,
		size: "big",
		effects: [
			["hunger" , 800],
		],

		msg: itemMsg.PorkPie,
	},
	{
		tags:["seasonal", "winter", "meal", "pastry"],

		id:"MincePie",
		name:["Mince pie", "圣诞百果派"],
		plural:"Mince pie",

		info: [
		"Traditional Christmas petits fours, flaky pie crust filled with a rich filling.",
		"传统的圣诞小点心，酥松的派底填上丰富的馅料。闻起来有浓郁的白兰地酒香与酸甜果香、和丁香与肉桂的香气组成了让人温暖起来的芬芳。",
		],

		price: 2400,
		num: 1,
		size: "big",
		effects: [
			["hunger" , 600],
		],

		msg: itemMsg.MincePie
	},
	{
		tags:["seasonal", "summer", "pudding"],
	
		id:"MintJelly",
		name:["Mint jelly", "薄荷果冻"],
		plural:"Mint jellies",
	
		info: [
		"The fragrant mint aroma goes straight to your heart, and the mint leaves wiggle to say hello.",
		"芬芳的薄荷香气直冲心脾，薄荷叶摇晃着和你打招呼。",
		],
	
		price: 600,
		num: 1,
		size: "small",
		unit: "serve",
	
		effects: [
			["hunger" , 240],
		],
	
		msg: itemMsg.MintJelly
	},
	{
		tags:["meal", "set"],
	
		id:"BasicFoodSet",
		name:["Basic Food Set", "基本组合"],
		plural:"Basic Food Sets",
	
		info: [
		"A serving of rice bowl, a bowl of miso soup, and a cup of tea. Rich in aroma, abundant in ingredients, simple yet delicious.",
		"一份盖饭，一碗味增汤，一杯茶。香气浓郁，食材丰富，简单而美味。吃完记得把盘子还给老板。",
		],
	
		price: 4220,
		num: 1,
		effects: [
			["hunger" , 800],
		],
	
		msg: itemMsg.BasicFoodSet
	},
	{
		tags:["seasonal", "winter", "meal", "meat"],
	
		id:"LambChop",
		name:["Lamb Chop", "小羊排"],
		plural:"Lamb Chops",
	
		info: [
		"Roasted lamb chops, golden and crispy.",
		"小羊排散发着碳烤与溶化脂肪的香气。表面烤至金黄酥脆。每一块都均匀撒上了迷迭香与百里香，令人垂涎欲滴。",
		],
	
		price: 6400,
		num: 1,
		size: "big",
		effects: [
			["hunger" , 1600],
		],
	
		msg: itemMsg.LambChop
	},
];

Items.addItems(iFoods, 'foods')

let dropbottle = {
	item: "bottle",
	num: 1
}

let dropcan = {
	item: "can",
	num: 1
}

const iDrinks = [
	{
		tags: ["bottle", "water"],

		id: "water",
		name: ["Water", "水"],
		plural: "Water",

		info: [
			"A bottle of potable water from an unreliable source.",
			"一瓶可饮用水，但水源不可靠。",
		],

		price: 89,
		num: 1,
		size: "medium",

		effects: [
			["thirsty", 800]
		],
		drop: dropbottle,

	},
	{
		tags: ["bottle", "water"],

		id: "mineralwater",
		name: ["Mineral Water", "矿泉水"],
		plural: "Bottles of Water",

		info: [
			"A bottle of mineral water, drink it to relieve thirst",
			"一瓶矿泉水，喝了能解渴",
		],

		price: 152,
		num: 1,
		size: "medium",

		effects: [
			["thirsty", 1200]
		],
		
		drop: dropbottle,
	},
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
		
		drop: dropbottle,
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
		drop: dropcan,
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
		drop: dropbottle,
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
			["tiredness", 10],
			["thirsty", 800]
		],
	},
	{
		tags: ["canned", "coffee"],
	
		id: "cancoffe",
		name: ["Can of Coffe", "罐装咖啡"],
		plural:"Cans of coffe",
	
		num: 1,
		price: 640,
	
		info: ["A regular canned coffe", "一罐普通的咖啡"],
		effects: [
			["stress", 1],
			["tiredness", 20],
			["thirsty", 500]
		],

		drop: dropcan,
	},
	
	{
		tags: ["canned", "energy"],
	
		id: "redcow",
		name: ["Red Cow", "红羊"],
		plural:"Cans of Red Cow",
	
		num: 1,
		price: 800,
	
		info: [
			'Energy drink, "Red Cow gives you wings"',
			"能量饮料，红羊能让你飞起来",
		],
		effects: [
			["tiredness", 50],
			["thirsty", 500]
		],

		drop: dropcan,
	},
	
	{
		tags: ["bottle", "energy"],
	
		id: "sportdrink",
		name: ["Energy Drink", "能量饮料"],
		plural:"bottles of Energy Drink",
	
		num: 1,
		price: 800,
	
		info: [
			'Sport drink, gives you an instant charge.',
			"能量饮料，让你立即充电。",
		],
		effects: [
			["tiredness", 50],
			["thirsty", 500]
		],

		drop: dropbottle,
	},
	{
		tags: ["bottle", "soda"],
	
		id: "fruitsoda",
		name: ["Fruit Soda", "水果苏打"],
		plural:"Bottles of Fruit Soda",
	
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

		diff: {
			lemon : { displayname:['Lemon Soda', '柠檬苏打'] },
			orange : { displayname:['Orange Soda', '甜橙苏打'] },
			peach : { displayname:['Peach Soda', '桃子苏打'] },
			grape : { displayname:['Grape Soda', '葡萄苏打'] },
			apple : { displayname:['Apple Soda', '苹果苏打'] },
			melon : { displayname:['Melon Soda', '甜瓜苏打'] },
		},

		drop: dropbottle,
	},
	{
		tags: ["bottle", "tea"],
	
		id: "milktea",
		name: ["Queen's Milk Tea", "皇后奶茶"],
		plural:"Bottles of Queen's Milk Tea",
	
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

		drop: dropbottle,
	},
	{
		tags: ["bottle", "tea"],
	
		id: "royaltea",
		name: ["Royal Tea", "午后红茶"],
		plural:"Bottles of Royal Tea",
	
		num: 1,
		price: 649,
	
		info: [
			"Fresh and fragrant straight tea, makes your afternoon full of happiness",
			"清新香醇的红茶，让你的午后充满幸福感",
		],
		effects: [
			["stress", 1],
			["thirsty", 500]
		],

		drop: dropbottle,
	},
	{
		tags: ["bottle", "tea"],
	
		id: "icetea",
		name: ["Ice Tea", "冰红茶"],
		plural:"Bottles of Ice Tea",
	
		num: 1,
		price: 562,
	
		info: [
			"Refreshingly sweet and sour iced tea for a cool day.",
			"清爽酸甜的冰红茶，给你清凉的一天。",
		],
		effects: [
			["thirsty", 800]
		],

		drop: dropbottle,
	},
	{
		tags:["seasonal", "summer", "serving"],
	
		id:"MintLemonade",
		name:["Mint Lemonade", "薄荷柠檬饮"],
		plural:"Mint Lemonade",
	
		info: [
		"The aroma of mint leaves perfectly blends with the unique tartness of lemon.",
		"清新爽口，薄荷叶的香气与柠檬独特的酸涩风味完美融合。夏日里带来一丝清凉。",
		],
	
		price: 800,
		num: 1,
		size: "medium",
		effects: [
			["thirsty", 800]
		],

		unit: 'cup',
	
		msg: itemMsg.MintLemonade
	},
	{
		tags:["seasonal", "summer", "serving"],
	
		id:"PineappleIce",
		name:["Pineapple Ice", "菠萝冰"],
		plural:"Pineapple Ice",
	
		info: [
		"The shape is unique, and the ice cubes suspended in the pineapple sparkle.",
		"造型奇特，悬浮在菠萝中的冰块在阳光下闪着晶莹的光泽。菠萝杯摸起来可能有些扎手。",
		],
	
		price: 1000,
		num: 1,
		size: "medium",
		effects: [
			["thirsty", 900]
		],

		unit: 'cup',
	
		msg: itemMsg.PineappleIce
	},
	{
		tags:["seasonal", "summer", "serving"],
	
		id:"WatermelonIce",
		name:["Watermelon Ice", "西瓜冰"],
		plural:"Watermelon Ice",
	
		info: [
		"The vibrant red flesh of the watermelon is clearly visible. Refreshing and cooling.",
		"红艳的西瓜肉清晰可见，杯壁的水珠在阳光下闪闪发亮。清凉解暑，不来一杯吗？",
		],
	
		price: 1000,
		num: 1,
		size: "medium",
		effects: [
			["thirsty", 900]
		],
		unit: 'cup',
	
		msg: itemMsg.WatermelonIce
	},
]

Items.addItems(iDrinks, 'drinks')


const ingredients = [
	{
		tags: ["liquid", "chemical", "craft"],
		id:"blood",
		name:["Blood", "血液"],
		plural:"Blood",
	
		num: 1,
		price: 10000,
		size:"small",
		unit: 'pack',
	
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
		tags: ["creamy","cooking", "edible"],
		id:"cream",
		name:["Cream", "奶油"],
		plural:"Cream",
	
		num: 10,
		price: 1265,
		size:"micro",
		unit: "oz",

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
		unit: 'lb',

		info:[
			"flour",
			"面粉"
		]
	},
	{
		tags: ["flavor", "cooking"],
		id:"mayonaise",
		name:["Mayonaise", "蛋黄酱"],
		plural:"Mayonaise",

		num: 40,
		price: 1039,
		size: 40,
		unit: 'oz',

		info:[
			"mayonaise",
			"蛋黄酱"
		]
	},
	{
		tags:["flavor", "cooking"],
		id:"sugar",
		name:["Sugar", "糖"],
		plural:"Sugar",

		num: 50,
		price: 1200,
		size: 50,
		unit: 'oz',

		info:[
			"sugar",
			"糖"
		]
	},
	{
		tags:["flavor", "cooking"],
		id:"salt",
		name:["Salt", "盐"],
		plural:"Salt",

		num: 50,
		price: 1000,
		size: 50,
		unit: 'oz',

		info:[
			"salt",
			"盐"
		]
	},
	{
		tags:["flavor", "cooking"],
		id:"soysauce",
		name:["Soy Sauce", "酱油"],
		plural:"Soy Sauce",

		num: 180,
		price: 360,
		size: 180,
		unit: 'ml',

		info:[
			"soy sauce",
			"酱油"
		]
	},

	{
		tags:["plastic", "craft"],
		id:"bottle",
		name:["Empty Bottle", "空瓶"],
		plural:"Empty Bottles",

		num: 1,
		price: 5,
		size: 'medium',
		unit: 'bottle',

		info:[
			"An empty bottle",
			"一个空瓶"
		]

	},

	{
		tags:["aluminum", "craft"],
		id:"can",
		name:["Empty Can", "空罐"],
		plural:"Empty Cans",

		num: 1,
		price: 10,
		size: 'medium',
		unit: 'canned',

		info:[
			"An empty can",
			"一个空罐"
		]
	},

	{
		tags:["glass", "craft"],
		id:"glassbottle",
		name:["Empty Glass Bottle", "空玻璃瓶"],
		plural:"Empty Glass Bottles",

		num: 1,
		price: 10,
		size: 'medium',
		unit: 'bottle',

		info:[
			"An empty glass bottle",
			"一个空玻璃瓶"
		]
	}
]
Items.addItems(ingredients, 'ingredients')

const Sundries = [
	{
		type: "consumable",
		tags: ['sundry', 'roll' ],
		id: 'papertowel',
		name: ['Roll of Paper Towel', '纸巾'],
		plural: 'Rolls of Paper towel',

		num: 10,
		price: 100,
		size: 30,
		unit: 'uses',

		info: [
			'A roll of paper towel, 10 uses',
			'一卷纸巾，可以用10次'
		],

		onUse: function(){
			//清理下身所有液体
			const body = ['anus', 'botom', 'penis', 'thigh', 'vagina', 'vaginaoutside']
			body.forEach( (key) =>{
				const liquid = V.player.bodyliquid[key]
				if(liquid){
					liquid.goo = 0;
					liquid.seme = 0;
					liquid.nectar = 0;
				}
			})
		}
	},
	{
		type: "consumable",
		tags: ['sundry', 'packed'],
		id: 'wettissue',
		name: ['Wet Tissue', '湿巾'],
		plural: 'Wet Tissues',

		num: 1,
		price: 100,
		size: 'medium',

		info: [
			'A pack of wet tissue, can clean yourself.',
			'一包湿巾，可以清理全身。'
		],

		onUse: function(){
			//清理身上所有液体
			for(let i in V.player.bodyliquid){
				const liquid = V.player.bodyliquid[i]
				if(liquid){
					liquid.goo = 0;
					liquid.seme = 0;
					liquid.nectar = 0;						
				}
			}
		}
	}
]
Items.addItems(Sundries)


const Gacha = [
	{
		tags: ["gacha", "gachacap"],
		id:"gacha",
		name:["Gacha", "扭蛋"],
		plural:"Gacha",
	
		num: 1,
		price: 600,
		size:"medium",
		unit: 'capsule',
	
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
		size:"medium",
		unit: 'capsule',
	
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
		size:"medium",
		unit: 'capsule',
		
	
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
		size:"medium",
		unit: 'capsule',
	
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
		size:"medium",
		unit: 'capsule',
	
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
		size:"medium",
		unit: 'capsule',
	
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
		name:["Opened Golden Gacha", "打开的扭蛋"],
		plural:"Opened Golden Gacha",
	
		num: 1,
		price: 600,
		size:"medium",
		unit: 'capsule',
	
		info:[
			"An opened golden gacha capsule, the item inside has been taken out",
			"一个被打开的黄金扭蛋，里面的物品已经被取出"
		],
	},
]

Items.addItems(Gacha, 'gacha')

const GachaItems = [
	{
		type: "collection",
		tags: ["gacha", "misc", "collection"],
		id:"angry_owl",
		name:["Angry Owl", "愤怒的猫头鹰"],
		plural:"Angry Owl",
	
		num: 1,
		price: 300,
		size:"small",
	
		info:[
			"A brown owl standing with crossed arms in anger. I have an idea, it seems to be saying.",
			"生气地叉着腰的棕色猫头鹰。“我有一个想法。”它似乎在讲话。"
		],

		rare: "n",
		gachaType:"random",

	},
	{
		type: "collection",
		tags: ["gacha", "misc", "collection"],
		id:"arctic_hare",
		name:["Arctic Hare", "北极兔"],
		plural:"Arctic Hare",
	
		num: 1,
		price: 300,
		size:"small",
	
		info:[
			"An Arctic hare. When crouched down, it's indistinguishable from an ordinary cute domestic rabbit, but when standing up, it reveals its long legs!",
			"是北极兔。趴下的时候和普通的可爱家兔没什么区别，站起来就会暴露大长腿！"
		],

		rare: "n",
		gachaType:"random",

	},
	{
		type: "collection",
		tags: ["gacha", "misc", "collection"],
		id:"dove",
		name:["Dove", "鸽子"],
		plural:"Dove",
	
		num: 1,
		price: 600,
		size:"small",
	
		info:[
			"A dove with grass growing on its head. It is said that the grass might be there to avoid conflicting with the image of another dove that eats stars.",
			"头上长草的鸽子。据说长草可能是为了不和另一只吃星星的鸽子形象冲突。"
		],

		rare: "r",
		gachaType:"random",

	},
	{
		type: "collection",
		tags: ["gacha", "misc", "collection"],
		id:"elephant_balloon",
		name:["Elephant Balloon", "红气球大象"],
		plural:"Elephant Balloon",
	
		num: 1,
		price: 600,
		size:"small",
	
		info:[
			"A blue elephant that will give you a red balloon. The balloon floats gently into the sky. This elephant, without tusks or long hair, firmly believes it's a mammoth, and for some reason, there's a small missing patch of fur on its belly.",
			"会送给你红色气球的蓝色大象。气球飘飘悠悠飞向天空。这只没有獠牙也没有长毛的大象坚定地认为自己是猛犸，而且肚子上的毛不知为何少了一小块。"
		],

		rare: "r",
		gachaType:"random",

	},
	{
		type: "collection",
		tags: ["gacha", "misc", "collection"],
		id:"fox",
		name:["Fox", "小狐狸"],
		plural:"Fox",
	
		num: 1,
		price: 300,
		size:"small",
	
		info:[
			"An ordinary little fox that has not yet delivered roses to anyone.",
			"普通的小狐狸。还没有给人送过玫瑰花。"
		],

		rare: "n",
		gachaType:"random",

	},
	{
		type: "collection",
		tags: ["gacha", "misc", "collection"],
		id:"foxdove",
		name:["Fox Dove", "狐狸和鸽子的剪影"],
		plural:"Fox Dove",
	
		num: 1,
		price: 600,
		size:"small",
	
		info:[
			"Silhouettes of a little fox wearing a moon headpiece and a dove with grass on its head snuggling together.",
			"佩戴月亮头饰的小狐狸和头上长草的鸽子依偎在一起的剪影。"
		],

		rare: "r",
		gachaType:"random",

	},
	{
		type: "collection",
		tags: ["gacha", "misc", "collection"],
		id:"foxmoon",
		name:["Fox Dove", "月亮狐狸"],
		plural:"Fox Dove",
	
		num: 1,
		price: 600,
		size:"small",
	
		info:[
			"A little fox wearing a moon headpiece. Sometimes you might see it with six tails. It must be an illusion.",
			"佩戴月亮头饰的小狐狸。有时候会看见它有六条尾巴。一定是错觉吧。"
		],

		rare: "r",
		gachaType:"random",

	},
	{
		type: "collection",
		tags: ["gacha", "misc", "collection"],
		id:"ir",
		name:["IR", "IR"],
		plural:"IR",
	
		num: 1,
		price: 300,
		size:"small",
	
		info:[
			"An unknown creature with four legs. But it's very cute.",
			"不知道是什么的生物，有四条腿。不过很可爱。"
		],

		rare: "n",
		gachaType:"random",

	},
	{
		type: "collection",
		tags: ["gacha", "misc", "collection"],
		id:"rabbit_green",
		name:["Rabbit Green", "绿耳雪兔"],
		plural:"Rabbit Green",
	
		num: 1,
		price: 300,
		size:"small",
	
		info:[
			"According to ancient rumors, if you can see supernatural beings, creating a snow rabbit like this in winter might allow you to enter its body. Contrary to the paired appearances in promotional art with a fellow with pink ears, they don't actually get along well.",
			"古老的传闻说，如果你能看见妖怪，那么在冬天捏出这样一只雪兔，就有可能进入它体内。装饰宣传画上经常和粉耳朵的家伙成双成对出现，实则关系并不好。"
		],

		rare: "n",
		gachaType:"random",

	},
	{
		type: "collection",
		tags: ["gacha", "misc", "collection"],
		id:"rabbit_pink",
		name:["Rabbit Pink", "粉耳雪兔"],
		plural:"Rabbit Pink",
	
		num: 1,
		price: 300,
		size:"small",
	
		info:[
			"According to ancient rumors, if you can see supernatural beings, creating a snow rabbit like this in winter might allow you to enter its body. Contrary to the paired appearances in promotional art with a fellow with green ears, they don't actually get along well.",
			"古老的传闻说，如果你能看见妖怪，那么在冬天捏出这样一只雪兔，就有可能进入它体内。装饰宣传画上经常和绿耳朵的家伙成双成对出现，实则关系并不好。"
		],

		rare: "n",
		gachaType:"random",

	},
	{
		type: "collection",
		tags: ["gacha", "misc", "collection"],
		id:"rainbow_cat",
		name:["Rainbow Cat", "彩虹猫"],
		plural:"Rainbow Cat",
	
		num: 1,
		price: 600,
		size:"small",
	
		info:[
			"Nyanyanyanyanyanyanya! Mysterious background music automatically plays in your mind when you stare at it. You might think it used to be a cow cat.",
			"Nyanyanyanyanyanyanya! 盯着它的时候脑中会自动出现神秘的背景音乐。你觉得它以前可能是奶牛猫。"
		],

		rare: "r",
		gachaType:"random",

	},
	{
		type: "foods",
		tags: ["gacha",  'candy',"collection"],
		id:"gachacandy",
		name:["Gacha Candy", "扭蛋糖"],
		plural:"Gacha Candy",
	
		num: 1,
		price: 300,
		size: "small",
		unit: 'piece',
	
		info:[
			"The candy dropped from the Gacha machine, it's green.",
			"扭蛋机里扭出来的糖果，是绿色的。"
		],

		rare: "n",
		gachaType:"candy",

	},
	{
		type: "foods",
		tags: ["gacha", 'candy', "collection"],
		id:"gachacandy_blue",
		name:["Gacha Candy Blue", "蓝色扭蛋糖"],
		plural:"Gacha Candy Blue",
	
		num: 1,
		price: 300,
		size:"small",
		unit: 'piece',
	
		info:[
			"The candy dropped from the Gacha machine, it's blue.",
			"扭蛋机里扭出来的糖果，是蓝色的。"
		],

		rare: "n",
		gachaType:"candy",

	},
	{
		type: "foods",
		tags: ["gacha", 'candy',"collection"],
		id:"gachacandy_orange",
		name:["Gacha Candy Orange", "橘色扭蛋糖"],
		plural:"Gacha Candy Orange",
	
		num: 1,
		price: 300,
		size:"small",
		unit: 'piece',
	
		info:[
			"The candy dropped from the Gacha machine, it's orange.",
			"扭蛋机里扭出来的糖果，是橘色的。"
		],

		rare: "n",
		gachaType:"candy",

	},
	{
		type: "foods",
		tags: ["gacha", 'candy', "collection"],
		id:"gachacandy_pink",
		name:["Gacha Candy Pink", "粉色扭蛋糖"],
		plural:"Gacha Candy Pink",
	
		num: 1,
		price: 300,
		size:"small",
		unit: 'piece',
	
		info:[
			"The candy dropped from the Gacha machine, it's pink.",
			"扭蛋机里扭出来的糖果，是粉色的。"
		],

		rare: "n",
		gachaType:"candy",

	},
	{
		type: "foods",
		tags: ["gacha", 'candy',"collection"],
		id:"gachacandy_purple",
		name:["Gacha Candy Purple", "紫色扭蛋糖"],
		plural:"Gacha Candy Purple",
	
		num: 1,
		price: 300,
		size:"small",
		unit: 'piece',
	
		info:[
			"The candy dropped from the Gacha machine, it's purple.",
			"扭蛋机里扭出来的糖果，是紫色的。"
		],

		rare: "n",
		gachaType:"candy",

	},
	{
		type: "foods",
		tags: ["gacha", 'candy',"collection"],
		id:"gachacandy_red",
		name:["Gacha Candy Red", "红色扭蛋糖"],
		plural:"Gacha Candy Red",
	
		num: 1,
		price: 300,
		size:"small",
		unit: 'piece',
	
		info:[
			"The candy dropped from the Gacha machine, it's red.",
			"扭蛋机里扭出来的糖果，是红色的。"
		],

		rare: "n",
		gachaType:"candy",

	},
	{
		type: "foods",
		tags: ["gacha", 'candy', "collection"],
		id:"gachacandy_yellow",
		name:["Gacha Candy Yellow", "黄色扭蛋糖"],
		plural:"Gacha Candy Yellow",
	
		num: 1,
		price: 300,
		size:"small",
		unit: 'piece',
	
		info:[
			"The candy dropped from the Gacha machine, it's yellow.",
			"扭蛋机里扭出来的糖果，是黄色的。"
		],

		rare: "n",
		gachaType:"candy",

	},
]

Items.addItems(GachaItems)

const iSpecial = [
{
	type: "consumable",
	tags: ["liquid", "lubricant", "bottle"],

	id: "lubricant",
	name: ["KY Anal Lube", "KY肛用润滑液"],
	plural:"KY Anal Lube",

	num: 200,
	price: 3000,
	size: 200,
	unit: 'ml',

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
			displayname:['KY Anal Glide', 'KY肛用护理液']
		}
	},

	require:"bathroom",
},

{
	type: "consumable",
	tags: ["liquid", "lubricant", "bottle"],

	id: "druglubricant",
	name: ["Aphrodisiac Anal Lube", "催情润滑夜"],
	plural:"Aphrodisiac Anal Lube",

	num: 200,
	price: 3000,
	size: 200,
	unit: 'ml',

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

	const item = iM.getEquip(pos)

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
		unit: 'bag',
  
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
		unit: 'bag',
  
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
		unit: 'bag',
  
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
		girl:{ displayname:['girlish', '女款'],  sp:'girlish'},
		cat:{ displayname:['cat', '猫'],  sp:'cat'}
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
		girl:{ displayname:['girlish', '女款'], sp:'girlish'},

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
		black:{ displayname:['black', '黑色'], },
		pink:{ displayname:['pink', '粉色'],  sp:'girlish'}
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
		girl:{ displayname:['girlish', '女款'],  sp:'girlish'}
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
			blue:{ displayname:['blue', '蓝色'], },
			yellow:{ displayname:['yellow', '黄色'], },
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
			blue:{ displayname:['blue', '蓝色'] },
			green:{ displayname:['green', '绿色'] },
			orange:{ displayname:['orange', '橙色'] },
			pink:{ displayname:['pink', '粉色'] },
			purple:{ displayname:['purple', '紫色']},
			yellow:{ displayname:['yellow', '黄色']},
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
		tags: ["smoke", "nicotine"],	

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
		tags: ["smoke", "nicotine"],	

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
		"The clear glass bottle contains a pale pink, green apple and cherry blossom based brew.",
		"透明的玻璃瓶里是淡粉色、以青苹果和樱花为基底酿造的酒液，里面有整朵樱花和金箔。",
		],

		price: 12860,
		num: 1,
		effects: [
			["alcohol", 80, "p"],
			["stress", 6],
			["fatigue", 40],
		],

		msg: itemMsg.SakuraWineWithBox
	},
	{
		type:"drinks",
		tags:["seasonal", "spring", "alcohol"],

		id:"BulkSakuraWine",
		name:["bulkSakuraWine", "散装樱花酒"],
		plural:"bulkSakuraWine",

		info: [
		"Sakura wine. The price it cheaper...queit suspicious.",
		"透明的玻璃瓶里是淡粉色、以青苹果和樱花为基底酿造的酒液，里面有整朵樱花和金箔！看上去非常梦幻。但是卖得这么便宜……有些可疑",
		],

		price: 9670,
		num: 1,
		effects: [
			["alcohol", 80, "p"],
			["stress", 4],
			["fatigue", 20],
		],

		msg: itemMsg.BulkSakuraWine
	},
	{
		type:"drinks",
		tags:["seasonal", "autumn", "alcohol"],

		id:"OsmanthusWine",
		name:["Osmanthus wine", "桂花酒"],
		plural:"Osmanthus wine",

		info: [
		"Amber-coloured Osmanthus wine.",
		"酒液呈明亮的琥珀色，瓶口装饰着一圈淡淡的金黄色桂花。虽未开瓶，却仿佛散发着芬芳的桂花香。晃动瓶身，桂花纷繁而落。",
		],

		price: 8920,
		num: 1,
		effects: [
			["alcohol", 100, "p"],
			["stress", 3],
			["fatigue", 80],
		],

		msg: itemMsg.OsmanthusWine
	},
	{
		type:"drinks",
		tags:["seasonal", "winter", "alcohol", "serving", "cup"],

		id:"MulledWine",
		name:["Mulled Wine", "热红酒"],
		plural:"Mulled Wine",

		info: [
		"Hot mulled wine, including red wine cinnamon, citrus, apple, and cherry.",
		"热腾腾的热红酒，加入了葡萄酒、肉桂、柑橘、苹果和樱桃。",
		],

		price: 7350,
		num: 1,
		effects: [
			["alcohol", 70, "p"],
			["stress", 3],
			["fatigue", 30],
		],

		msg: itemMsg.MulledWine
	},
];

Items.addItems(iAddictive)

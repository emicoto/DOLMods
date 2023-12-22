const Items = [
	{
		id: 'bread',
		type: 'foods',
		name:['Breads', '面包'],
		tags:['production', 'food'],
		num: 1,
		price: 500,
		info: [
			'A hand made bread.',
			'一个手制面包。'
		],
		effects: [['hunger', 30]],
		size: 'medium',
		usage: 1,
		customtext: [//you use/eat/drink itemname.
			"You take a bite the bread you just made, you can't say it's delicious but it's not that bad.",
			'你咬了一口你刚做好的面包，或许它并不足以说好吃，但也不算难吃。'
		],
		produce:['oven']
	}
]

const recipe = [
	 {
		id:'bread', //合成表的id，一般就是合成结果的物品id
		production: 'bread',//可选，有的话会给指定的物品。没有会给与合成表ID一致的物品。
		givenum: 1,
		lock: false, //可选，lock设置为true时，需要达成条件来解锁。解锁逻辑额外设置。
		//requirement:()=>{ return V.iRecipe.cookingbooks_1 !== undefined } //配方解锁逻辑
		time: 30, //制作需要时间（分钟）
		difficult: 100, //制作难度
		skill:'cooking', //判定技能
		list:[['powder', 2], ['butter', 1]], //合成配方
		methods:['cook','oven'], //基础制作方法，便于检索
	}
]


Items.addRecipe('bread', {
	time: 30,
	difficult: 100,
	skill:'cooking',
	list:[['powder', 2], ['butter', 1]],
	methods: ['cook', 'oven']
})

Items.add(
    'bread',
    ['Breads', '面包'],
    500,
    1,
    'foods'
)
.set('size', 'medium')
.setProduce('oven')
.setEffect(['hunger',30])
.setTags('food')
.setCustomMsg(
    "You take a bite the bread you just made, you can't say it's delicious but it's not that bad.",
    '你咬了一口你刚做好的面包，或许它并不足以说好吃，但也不算难吃。'
)

//define an array to setup your tattoos.
//almost same as vanilla, but you can skip some keys. skipped key will set to default var
const newTatoos =[
	{
		key:"two_hundred_pound_whore",
		name:"£200",
		special:"prostitution",
		degree:20000
	},
	{
		key:"ultimate_bitch",
		name:"Ultimate Bitch",
		cn:"终极婊子",
		special:"sex",
	}
]

//then push to modTatoos list
setup.modTattoos.push(...newTatoos)
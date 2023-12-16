class CandyItems{
	static data = {}
	/**
	 * 
	 * @param {string} type 
	 * @param {string} id 
	 * @param {[string, string]} name 
	 * @param {number} price 
	 * @param {number} num 
	 * @returns {CandyItems}
	 */
	static add( id, name, price, num, type){
		this.data[id] = new CandyItems(id, name, price, num, type)
		return this.data[id]
	}
	static check(id, prop){
		let data = this.data[id]
		if(!data) throw new Error('no such item:', id)
		if(prop && !data[prop]) throw new Error('no such props from item:', id, prop)

		if(prop) return data[prop]
		else return data
	}
	/**
	 * 
	 * @param {string} id 
	 * @param {string} prop 
	 * @returns {CandyItems | void}
	 */
	static get(id, prop){
		let data = this.data[id]
		if(!data) console.error('no such item:', id)
		if(prop && !data[prop]) console.error( 'no such props from item:', id, prop)

		if(prop) return data[prop]
		else return data
	}
	/**
	 * 
	 * @param {string} type 
	 * @param {string} id 
	 * @param {[string, string]} name 
	 * @param {number} price 
	 * @param {number} num 
	 */
	static init = setupVanillaItems
	constructor(id, name, price, num, type='items'){
		this.type = type
		this.id = id
		this.name = name

		this.num = num ?? 1
		this.price = price ?? 100
		this.size = 'big'
		this.tags = []
		this.usage = 1
	}
	get(prop, val){
		if(!this[prop]){
			this[prop] = val
		}
		return this[prop]
	}
	set(prop, val){
		this[prop] = val
		return this
	}
	isPill(){
		this.tags.push('pill')
		this.size = 'pill'
		return this
	}
	isInject(){
		this.tags.push('inject')
		this.size = 'inject'
		return this
	}
	setInfo(EN, CN){
		this.info = [EN ?? CN, CN ?? EN]
		return this
	}

	//安全剂量/短期内嗑多少上瘾/引起戒断反应的时间（小时）/彻底戒断所需日数/起效时长（小时）
	setAddict(threshold=1, maxOD=5, withdraw=3*24, clear=7, hours=1){
		this.threshold = threshold
		this.maxOD = maxOD
		this.withdraw = withdraw
		this.clear = clear
		this.hours = hours
		return this
	}

	//日常效果
	setDayEffect(callback){
		this.onDay = callback
		return this
	}
	//戒断反应
	setWithdraw(callback){
		this.withdraw = callback
		return this
	}
	//药效上头时的效果
	setHigh(callback){
		this.onHigh = callback
		return this
	}
	//药效失效时的副作用
	setAfter(callback){
		this.onAfter = callback
		return this
	}

	//使用时的效果
	setEffect(...effects){
		this.effects = effects
		return this
	}

	setTags(...tags){
		this.tags.push(...tags)
		return this
	}
	doDelta(param, value, method){
		if(this.type == 'drugs' || this.type == 'medicine'){
			let { taken } = V.candyDrug[this.id]
			value = value * Math.max(1-(taken*0.1), 0.2)
		}

		if(param == 'drugs') {
			getPalam('drugged', value)
		}
		else if(param == 'alcohol'){
			getPalam('drunk', value)
		}
		else{
			if(method=='p')  wikifier(param, value, param=='arousal'? 'genital' : null);
			else wikifier(param,-value);
		}
	}
	onUse(){
		this.effects.forEach((set)=>{
			let [param, min, method] = set;
			let max = Math.floor(min*1.2 + 1.5);
			let value = random(min, max);

			this.doDelta(param, value, method);

			if(this.tags.includes('risky')){
				V.iCandyStats.tempflag.candy[this.id] = 1;
			}
			else if(tjis.yags.includes('strong')){
				V.iCandyStats.tempflag.candy[this.id] = 2;
			}
		})

		if(V.candyDrug[this.id]){
			V.candyDrug[this.id].taken ++;
			if(V.candyDrug[this.id].taken >= this.threshold){
				V.candyDrug[this.id].overdose++
			}
		}
			
	}
}

function setupVanillaItems(){
	let c = CandyItems
	
	for(let i in setup.plants){
		let plant = setup.plants[i]
		let item = c.add(plant.name, [plant.plural, plant.plural], plant.plant_cost)
		let hunger = {
			fruit: 20,
			vegetable: 30,
			produce: 15
		}

		let size = {
			fruit: 'medium',
			flower: 'tiny',
			vegetable: 'small',
			shroom:'small',
		}

		if(size[item.type]){
			item.set('size', size[item.type])
		}
		else if(item.special.includes('small') || item.name.includes('egg')){
			item.set('size', 'small')
		}

		if(item.type == 'fruit' || item.type == 'vegetable' || (item.type == 'produce' && item.name !=='wild_honeycomb') ){
			item.setTags('tending', 'dol', 'food')
				.setEffect(['hunger', hunger[item.type]])
		}
		else{
			item.setTags('tending', 'dol')
		}
	}	
}


let c = CandyItems
//----------------------------------------------
//  原版道具特殊处理
//----------------------------------------------
c.add('spray', ['Pepper Spray', '防狼喷雾'], 0)
.setInfo(
	'A spray made from chili pepper, is incredible effective',
	'用辣椒水制成的防狼喷雾，效果拔群。'
 )
.setTags('spray', 'dol')

//----------------------------------------------
//  常规道具
//----------------------------------------------
c.add('fruitscandy', ['Fruits Candies', '水果糖'], 1600, 12)
.setInfo(
	'Sweet and sour, give you a little happiness', 
	'酸酸甜甜的，提供些许幸福感'
)
.setEffect(['trauma', 5],['hunger', 10])
.set('size', 'tiny')
.setTags('candy', 'food')

c.add('chocolate', ['Chocolate','巧克力'], 1600, 4)
.setInfo(
	'Sweet chocolate, may relives a little stress for you',
	"甜甜的巧克力，能缓解些许压力"
)
.set('size', 'small')
.setEffect(['stress', 1], ['tiredness', 24], ['hunger', 40])
.setTags('candy', 'food',)

c.add('ramune', ['Ramune','波子水'], 500)
.setInfo(
	'Cool ramune, recover a bit of stamina',
	"清爽的波子水，能补充点体力"
)
.setEffect(['tiredness', 64])
.setTags('soda', 'drink')

c.add('potachips', ['Potato Chips', '薯片'], 500)
.setInfo(
	'Pack of crunchy chips for some hungry',
	'一包脆脆的薯片，补充些许体力。'
)
.setEffect(['tiredness', 40], ['hunger', 100])
.setTags('snack', 'food')

c.add('lolipop', ['Lolipop', '波板糖'], 400)
.setInfo(
	'Sweet, big lolipop, give you a bit of happiness',
	"甜甜的大波板糖，提供些许幸福感"
)
.setEffect(['trauma', 16], ['hunger', 16], ['stress', 1])
.set('size', 'medium')
.setTags('candy', 'food', 'medium')

c.add('sandwich',['Sandwich', '三文治'], 1000)
.setInfo(
	'Plain sandwiches, a bread cut into triangles with eggs, bacon and veggies', 
	'普通的三文治，切成三角形的面包夹着鸡蛋培根和蔬菜'
)
.setEffect(['tiredness', 40], ['hunger', 120])
.setTags('food',)

c.add('candyfloss', ['Candyfloss', '棉花糖'], 640)
.setInfo(
	'Sweet, cloud like candyfloss, give you soft happiness',
	'甜甜的，云一般的棉花糖，给你软绵绵的幸福'
)
.setEffect(['tiredness', 20], ['trauma', 5], ['stress', 3], ['hunger', 12])
.setTags('food', 'candy')

c.add('lunchbox', ['Lunch Box', '盒饭'], 1680)
.setInfo(
	'Ordinary boxed lunch with vegetables and meat for nutritional balance',
	'普通的盒饭，有菜有肉营养均衡'
)
.setEffect(['hunger', 300], ['tiredness', 80])
.setTags('food')

c.add('cola', ['Cola', '可乐'], 200 )
.setInfo(
	'A regular canned cola', 
	'一罐普通的罐装可乐'
)
.setEffect(['stress', 1])
.setTags('drink')

//----------------------------------------------
//  特殊道具
//----------------------------------------------
c.add('lubricant', ['Lubricants', '润滑油'], 3000, 200 )
.set('usage', 10)
.setInfo(
	'Lubricating oil for enemas to keep the intestines wet and slippery.',
	'灌肠用润滑油，保持肠道湿滑。'
)
.setTags(['liquid', 'lubricant'])
.setEffect(['anusgoo', 50, 'p'], ['hunger', 100, 'p'])


c.add('druglubricant', ['Aphrodisiac Lubricants', '润滑油'], 3000, 200 )
.set('usage', 10)
.setInfo(
	'Lubricating oil for enemas to keep the intestines wet and slippery.',
	'灌肠用润滑油，保持肠道湿滑。'
)
.setTags(['liquid', 'lubricant'])
.setEffect(['anusgoo', 50, 'p'], ['drugged', 200, 'p'], ['hunger'], 120, 'p')

//----------------------------------------------
//  背包、手推车
//----------------------------------------------
c.add('satchel', ['Small Satchel', '小挎包'], 4200, 1, 'container')
.setInfo(
	"A small, cute satchel.",
	"一个小巧可爱的挎包。"
)
.set('capacity', 4)
.setTags('bag')

c.add('leathersatchel', ['Leather Satchel', '皮包'], 6800, 1, 'container')
.setInfo(
	"A stylish designed, leather satchel.",
	"一个时尚的皮包。"
)
.set('capacity', 6)
.setTags('bag')

c.add('schoolbag', ['School Bag', '书包'], 9680, 1, 'container')
.setInfo(
	"A common school bag used by students.",
	"学生常用的书包。"
)
.set('capacity', 8)
.setTags('bag')

c.add('backpack', ['Backpack', '大背包'], 13620, 1, 'container')
.setInfo(
	"A large backpack with plenty of capacity.",
	"一个有着充足容量的大背包。"
)
.set('capacity', 12)
.setTags('bag')

c.add('hikingpack', ['Hiking Backpack', '登山包'], 13620, 1, 'container')
.setInfo(
	"Extra large capacity backpack for hikinA collapsible cartg.",
	"一个有着充足容量的大背包。"
)
.set('capacity', 20)
.setTags('bag')

c.add('cart', ['Simple Cart', '简易手推车'], 13620, 1, 'container')
.setInfo(
	"A simple, collapsible cart",
	"一个简易的，可折叠的手推车。"
)
.set('capacity', 36)
.setTags('cart')

c.add('xlcart', ['XL Outdoor Cart', '可折叠户外手推车'], 38960, 1, 'container')
.setInfo(
	"A normal, collapsible cart",
	"一个普通的，可折叠的手推车。"
)
.set('capacity', 50)
.setTags('cart')

//----------------------------------------------
//  普通成瘾物
//----------------------------------------------
c.add('cigarettes', ['Cigarettes', '香烟'], 3600, 18)
.setInfo(
	'Cheap cigarettes, smells burnt', 
	'廉价的香烟，一股烧焦味'
)
.setEffect(['stress', 8], ['trauma', 8], ['nicotine', 100, 'p'])
.set('size', 'tiny')
.setTags('addiction', 'smoke', 'nicotine')

c.add('marlboro', ['Marlboro 100%', '马宝龙香烟'], 6400, 18)
.setInfo(
	'A brand cigarettes with great flavor', 
	'一个品牌香烟，味道香醇'
)
.set('size', 'tiny')
.setEffect(['stress', 12], ['trauma', 16], ['nicotine', 180, 'p'])
.setTags('addiction', 'smoke', 'nicotine')

c.add('beer', ['Beer', '啤酒'], 540)
.setInfo(
	'Cheep beer, tastes like alcohol', 
	'便宜的啤酒，尝起来跟和酒精没两样'
)
.setEffect(['drunk', 100, 'p'], ['stress', 5])
.setTags('addiction', 'alcohol')

c.add('blackbeer', ['Black Beer', '黑啤酒'], 780)
.setInfo(
	'Black bear, a strong flavor', 
	'黑啤，味道浓郁十分上头'
)
.setEffect(['drunk', 160, 'p'], ['stress', 10], ['fatigue', 60])
.setTags('addiction', 'alcohol')


//----------------------------------------------
//  普通药物（依赖性低）
//----------------------------------------------
c.add('serotonin', ['Serotonin','羟色胺'], 6200, 20, 'medicine')
.setInfo(
	'Help you relax and uplifit your mood',
	"具有放松和提振心情的作用"
)
.setEffect(['trauma', 16])
.setTags('addiction')
.isPill()
.setAddict(4, 12, 4, 7)

c.add('melatonin', ['Melatonin', '褪黑素'], 4800, 30, 'medicine')
.setInfo(
	'Help for sleep and reduce stress',
	"能帮助睡眠以及消减压力"
)
.setEffect(['stress', 6])
.setTags('addiction')
.isPill()
.setAddict(2, 18, 4, 5)

c.add('neuroOptimization', ['Neuro Optimization', '神经优化片'], 6400, 20, 'medicine')
.setInfo(
	'Improves the brain and memory',
	"提神醒脑，增强记忆力"
)
.setEffect(['control', 30])
.setTags('addiction')
.isPill()
.setAddict(4, 20, 1.2, 5)

c.add('aminobutyric', ['Aminobutyric','氨基丁酸'], 8600, 20, 'medicine')
.setInfo(
	'Help for against depression and anxiety',
	"对抑郁症和焦虑症有一定抵御效果"
)
.setEffect(['trauma', 50])
.setTags('addiction')
.isPill()
.setAddict(2, 10, 3, 5)

c.add('painreduce', ['Painkiller','止痛药'], 4750, 20, 'medicine')
.setInfo(
	'Fast-acting painkiller',
	"速效止痛药"
)
.setEffect(['pain', 30])
.isPill()


//----------------------------------------------
//  危险成瘾品（依赖性高）
//----------------------------------------------
c.add('nzt_48', ['NZT-48', 'NZT-48'], 12600, 12, 'drugs')
.setInfo(
	'Fabled smart drug, concentration and memory dramatically improved after taking it. But it is addictive.',
	'传说中的聪明药，吃了后集中力与记忆力大幅提高。但具备成瘾性。'
)
.setEffect(['stress', 10])
.setTags('risky', 'addiction')
.isPill()
.setAddict(1, 4, 1, 14, 12)
.setHigh((min=1)=>{
	//如果在学习，会获得更好的学习效果。
	wikifier('control', 1*min)
	let html = lanSwitch(
		"The effects of NZT-48 is on, you're feeling full of confident.",
		"NZT-48正在起作用，你感觉充满了自信。")
		+`<<gcontrol>>`
	return html
})

//----------------------------------------------
c.add('heroin', ['Heroin', '海洛因'], 6800, 4, 'drugs')
.setInfo(
	'Recreational drugs, take away your stress and bring you peace',
	'娱乐性药物，消除烦恼，给你带来快乐'
)
.setEffect(['trauma', 60], ['drugs', 1000], ['arousal', 1000, 'p'], ['hallucinations', 100])
.setTags('risky', 'addiction')
.isPill()
.setAddict(1, 2, 2, 28, 1)
//持续性减少压力
.setHigh((min=1)=>{
	getPalam('stress', -(2*min))
	let html = lanSwitch(
		"The effects of Heroin is on, you're feeling easy.",
		"海洛因正在起作用，你感觉心情愉快。")
		+`<<gcontrol>>`
	return html
})

//----------------------------------------------
c.add('mdma', ['MDMA', '摇头丸'], 5600, 5, 'drugs')
.setInfo(
	'Stimulant drugs to eliminate pain and fatigue', 
	'兴奋类药物，消除痛苦与疲劳'
)
.setEffect(['pain', 20], ['tiredness', 200])
.setTags('risky', 'addiction')
.isPill()
.setAddict(1, 2, 2, 28, 1)
.setHigh((min=1)=>{
	getPalam('pain', -(5*min))
	getPalam('tiredness', -(5*min))

	let html = lanSwitch(
		"The effects of MDMA is on, you feel all the pains and tiredness are gone.",
		"摇头丸的效果上头了，你感觉浑身都很轻松。")
		+`<<lpain>><<ltiredness>>`
	return html
})


//----------------------------------------------
c.add('amhetamine', ['Amphetamine', '安非他命'], 7260, 2, 'drugs')
.setInfo(
	'Central stimulant, will get you high to heaven', 
	'中枢兴奋剂，让你从头爽到尾。'
)
.setEffect(['pain', 20], ['tiredness', 80], ['arousal', 1000, 'p'], ['drugs', 1000])
.setTags('risky', 'addiction')
.isInject()
.setAddict(0, 2, 2, 32, 2)
.setHigh((min=1)=>{
	wikifier('arousal', 1000, 'genital')

	let list = ['genital', 'bottom', 'breast', 'mouth']
	let i = random(0, 4)
	getExtraSens(list[i], 0.001*min, 300) //时间单位：分钟

	let html = lanSwitch(
		"The effects of Amphetamine is on. A strong sensatons hit your whole body like an electric, making your body even more sensitive.",
		"安非他命的效果上来了，强烈的快感如电流般袭击全身，让你的身体更加敏感了。")
		+`<<gggarousal>>`
	return html
})


//----------------------------------------------
c.add('canabitabacco', ['Cannabi Tabacco', '大麻烟'], 5760 ,12, 'drugs')
.setInfo(
	'Cigarettes made of cannabis. Have a smoke to be happy', 
	'大麻制成的香烟烟，吸一口快乐好逍遥'
)
.setEffect(['pain', 5], ['stress', 5])
.setTags('risky', 'addiction', 'smoke')
.set('size', 'small')
.setAddict(1, 5, 2, 24, 1)
.setHigh((min=1)=>{

	getPalam('stress', -(5*min))

	let html = lanSwitch(
		"As the smoke of canabis around your head, you feel like your worries have gone.",
		"当大麻的烟雾旋绕在你头上，你感觉烦恼都烟消云去了。")
		+`<<lstress>>`
	return html
})

//----------------------------------------------
//  超强成瘾品。必定上瘾，效果极强，极难戒断，并带长期效果
//----------------------------------------------

//----------------------------------------------
//--可卡因
c.add('cocaine', ['Cocaine', '可卡因'], 12860, 2, 'drugs')
.setInfo(
	'Fast-acting nerve stimulant that eliminates all pain and worries.', 
	'速效神经兴奋剂，消除所有痛苦与烦恼。'
)
.setEffect(['pain', 100], ['trauma', 200], ['drugs', 1000])
.setTags('strong', 'addiction')
.isInject()
.setAddict(0, 0, 1, 52, 2)

//戒断时大幅降低控制，并增加压力
.setWithdraw(()=>{
	wikifier('control', -60)
	wikifier('stress', 60)
	let html = lanSwitch(
		"Cocaine withdrawal makes you feel empty and lost.",
		"可卡因的戒断反应让你感到空虚难受。")
		+`<<lllcontrol>><<gggstress>>`
	return html
})
//有持续嗑药时的每日效果，增加控制
.setDayEffect(()=>{
	wikifier('control', 30)
	let html = lanSwitch(
		"Continuously taking cocaine makes your confidence grow.",
		"持续吸取可卡因让你信心增长。")
		+`<<ggcontrol>>`
	return html
})
.setHigh((min=1)=>{
	wikifier('drunk', 10*min)
	wikifier('arousal', 1000, 'genital')
	let html = lanSwitch(
		"A strong ecstacy thrills your whole body, as you are dancing on the clouds.",
		"你全身上下都感到十分愉悦，仿佛在云端跳舞。")
		+`<<ggdrunk>><<ghallucinogens>><<ggarousal>>`
	return html
})
.setAfter(()=>{
	wikifier('drunk', -200)
	wikifier('control', -30)
	wikifier('stress', 80)
	let html = lanSwitch(
		"After the cocaine wears off, you feel like falling off from the clouds.",
		"可卡因的药效过后，你感觉从云端掉了下来。")
		+`<<llldrunk>><<ggstress>><<llcontrol>>`
	return html
})
//----------------------------------------------


//----------------------------------------------
//--天使粉
c.add('angelpowder', ['Angel Powder', '天使粉'], 28680, 2, 'drugs')
.setInfo(
	'Fast-acting psychotropic drugs, takes you fly to heaven',
	'速效精神药物，带你直上天国。'
)
.setEffect(['pain', 100], ['trauma', 320], ['stress', 36], ['drugs', 1000], ['alcohol', 1000])
.setTags('strong', 'addiction')
.isInject()
.setAddict(0, 0, 1, 64, 1)

//没有嗑药的当天获得的DEBUFF。减少体能和意志，并获得压力
.setWithdraw(()=>{
		let physique = random(60, 120)/10
		wikifier('physique_loss', physique)

		let will = random(10, 20)
		wikifier('willpower', -will)

		let stress = random(12, 18)
		wikifier('stress', stress)

		let html = lanSwitch(
			"You're feeling a little weak without the Angel Powder.",
			'没有吸食天使粉的你感到身体有些虚弱……')
			+`<<lphysique>><<lwillpower>><<ggstress>>`
		return html
})

//有持续嗑药时的每日效果，增加体能和意志，减少意识，大幅减少疼痛、压力、创伤、疲劳，获得性欲
.setDayEffect(()=>{
	let physique = random(80, 160)
	getPhysique(physique)

	let will = random(10, 20)
	wikifier('willpower', will)

	wikifier('awareness', -6)
	wikifier('pain', -20)
	wikifier('trauma', -20)
	wikifier('stress', -10)
	wikifier('tiredness', -30)

	wikifier('arousal', 300)

	let html = lanSwitch(
		"The Angel powder in your body inspries you, makes you feeling easy and happy.",
		'体内的天使粉鼓舞着你，让你感到轻松愉快。')
		+`<<ggphysique>><<gwillpower>><<llawareness>><<lllpain>><<lltrauma>><<llstress>><<lltiredness>><<ggarousal>>`
	return html
})

//药效起效期间的副作用
.setHigh((min=1)=>{
	wikifier('hallucinogen', 5*min)
	wikifier('arousal', 1000, 'genital')
	let html = lanSwitch(
		"An indescribable thrill of pleasure erupts from the depths of your soul.",
		"一股无法描述的快感从你的灵魂深处迸发。")
		+`<<ghallucinogens>><<gggarousal>>`
	return html
})

//药效过头后的副作用
.setAfter(()=>{
	let physique = random(30, 60)/10
	wikifier('physique_loss', physique)

	wikifier('control', -20)
	wikifier('stress', 120)

	let html = lanSwitch(
		"After the angel powder wears off, you feel weak and powerless.",
		"天使粉的药效过后，你感到虚弱无力。")
		+`<<lcontrol>><<lphysique>><<gggstress>>`
	return html
})
//----------------------------------------------


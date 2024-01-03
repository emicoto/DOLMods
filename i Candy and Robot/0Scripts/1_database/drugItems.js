
function onUseDrags(enemy){
	const { tags, effects, doDelta } = this
	let id = this.id
	if(this.alias){
		id = this.alias
	}

	let palams = '';

	effects.forEach((effect) => {
		const [palam, min, method] = effect;
		const take = iCandy.getStat(id, 'taken') ?? 0;

		let max = Math.floor(min * 1.2 + 1.5);
		let value = random(min, max);

		value = value * Math.max(1 - take * 0.1, 0.2);
		palams += doDelta(palam, value, method);
	});


	if(tags.has('risky', 'strong', 'super', 'immediate')){
		iCandy.setValue(id, 'efTimer', V.timeStamp + this.hours*60*60);
	}

	if(iCandy.checkStat(id)){
		iCandy.addValue(id, 'taken', 1)
		iCandy.setValue(id, 'lastTime', V.timeStamp)

		const take = iCandy.getStat(id, 'taken')

		if(take > this.threshold){
			iCandy.addValue(id, 'overdose', 1)
		}
		//如果有戒断状态，清除戒断状态
		if(iCandy.getStat(id, 'withdraw') > 0){
			iCandy.setStat(id, 'withdraw', 1)
		}
	}

	let methods = useMethods(tags)

	let html = lanSwitch(
		`You ${methods[0]} the ${this.name[0].toLocaleLowerCase()}.`,
		`你${methods[1]}了${this.name[1]}。`
	) + ' ' + palams;

	if(enemy){
		return palams;
	}

	if(drugMsg[id] && drugMsg[id]['onUse']){
		html = lanSwitch(drugMsg[id]['onUse']) + ' ' + palams;
	}

	return html;
}


const iMedicines = [
	{
		tags: ["pill", "addiction", ],
		
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
		quit: 7,		//戒除需求时间，单位是天
		hours: 1,		//药效持续时间，单位是小时

		onUse: onUseDrags,
	},
	{
		tags: ["pill", "addiction", ],

		id: "melatonin",
		name: ["Melatonin", "褪黑素"],
		plural:"Bottle of Melatonin",

		info: ["Help for sleep and reduce stress", "能帮助睡眠以及消减压力"],
		
		num: 30,
		price: 4800,
		size: "pill",

		effects: [["stress", 6],[ "tiredness", 20]],

		threshold: 2,	//安全使用次数，超过这个值会涨overdose
		maxOD: 18,		//最大过量值，超过这个值会上瘾
		withdraw: 4*24, //出现戒断反应所需时间，单位是小时
		quit: 5,		//戒除需求时间，单位是天
		hours: 1,		//药效持续时间，单位是小时

		onUse: onUseDrags,
	},
	{
		tags: ["pill", "addiction", ],
		
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
		quit: 5,		//戒除需求时间，单位是天
		hours: 1,		//药效持续时间，单位是小时

		onUse: onUseDrags,
	},

	{
		tags: ["pill", "addiction", ],

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
		quit: 5,		//戒除需求时间，单位是天
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
		tags: ["cream", "lite"],

		id: "bruiserelief",
		name: ["Bruise Relief Cream", "淤青霜"],
		plural:"Bruise Relief Cream",

		info: [
			"A cream for helps relieve pain, swelling, bruise.", 
			"一款有助于缓解疼痛、肿胀、瘀伤的药膏。"],		

		num: 8,
		usage: 0.4,

		price: 3474,
		size: "pill",

		effects: [["pain", 12]],

		onUse: onUseDrags,
	},
];

Items.addItems(iMedicines, "medicine")


const iDrugs = [
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
	quit: 14,		//戒除需求时间，单位是天
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
		let html = lanSwitch(drugMsg[this.id]['onHigh']) + `<<ggcontrol>>`;
		
		return html;
	},
	onWake:function(){
		//药效下头后会变疲劳
		iUtil.getPalam("tiredness", 400);	
		return lanSwitch(drugMsg[this.id]['onWake']) + `<<ggtiredness>>`;

	},
	onWithdraw:function(){
		wikifier("control", -80);
		wikifier("stress", 80)
		let will = random(60, 180);
		wikifier("willpower", -will)

		return lanSwitch(drugMsg[this.id]['onWithdraw']) + `<<llcontrol>><<ggstress>><<lllwillpower>>`;
	
	}
},

{
	tags: ["risky", "addiction", "pill"],	
	id: "heroin",
	name: ["Heroin", "海洛因"],
	plural:"Pack of Heroin",

	info: [
		"Stimulant drugs to eliminate pain and fatigue",
		"兴奋类药物，消除痛苦与疲劳",
		],
	

	num: 4,
	price: 6800,
	size: "pill",

	effects: [
		["pain", 50],
		["trauma", 60],
		["tiredness", 200],
		["hallucinogen", 300],
	],

	threshold: 0,	//安全使用次数，超过这个值会涨overdose
	maxOD: 3,		//最大过量值，超过这个值会上瘾
	withdraw: 24+18, //出现戒断反应所需时间，单位是小时
	quit: 28,		//戒除需求时间，单位是天
	hours: 2,		//药效持续时间，单位是小时

	onUse: onUseDrags,
	onHigh:function(min = 1){
		min = Math.max(min, 1);
		iUtil.getPalam("stress", -(2 * min));
		iUtil.getPalam("pain", -(1 * min));

		return lanSwitch(drugMsg[this.id]['onHigh']) + `<<lstress>><<lpain>>`;
	},
	onWake:function(){
		//药效下头时会感觉混乱和疲惫
		iUtil.getPalam("tiredness", 400);
		iUtil.getPalam("awareness", -5);

		return lanSwitch(drugMsg[this.id]['onWake']) + `<<ggtiredness>><<lawareness>>`;
	},
	onWithdraw:function(){
		wikifier("stress", 80);
		wikifier("trauma", 8);
		return lanSwitch(drugMsg[this.id]['onWithdraw']) + `<<ggstress>><<gtrauma>>`;
	}
},

{
	tags: ["risky", "addiction", "pill"],

	id: "mdma",
	name: ["MDMA", "摇头丸"],
	plural:"Pack of MDMA",
	info: [
		"Recreational drugs, take away your stress and bring you euphoria",
		"娱乐性药物，消除烦恼，给你带来快乐",
	],

	num: 5,
	price: 5600,
	size: "pill",

	effects: [
		["pain", 20],
		["aphrod", 1000],
		["trauma", 20],
	],

	threshold: 0,	//安全使用次数，超过这个值会涨overdose
	maxOD: 4,		//最大过量值，超过这个值会上瘾
	withdraw: 24+16,//出现戒断反应所需时间，单位是小时
	quit: 28,		//戒除需求时间，单位是天
	hours: 1,		//药效持续时间，单位是小时

	onUse: onUseDrags,
	onHigh:function(min = 1){
		min = Math.max(min, 1);

		iUtil.getPalam("pain", -(5 * min));
		iUtil.getPalam("tiredness", -(5 * min));

		return lanSwitch(drugMsg[this.id]['onHigh']) + `<<lpain>><<ltiredness>>`;
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
		["pain", 100],
		["tiredness", 100],
		["arousal", 200, "p"],
		["aphrod", 1000],
	],

	threshold: 0, 	//安全使用次数，超过这个值会涨overdose
	maxOD: 2, 		//最大过量值，超过这个值会上瘾
	withdraw: 20,	//出现戒断反应所需时间，单位是小时
	quit: 32,		//戒除需求时间，单位是天
	hours: 1,		//药效持续时间，单位是小时

	_onUse: onUseDrags,
	onUse: function(enemy){
		const html = this._onUse(enemy);
		
		//随机设置两个感官
		let list = ["genital", "bottom", "breast", "mouth"]
		let type = list.random()
		iCandy.senseSet(type, this.id, 0.1,  this.hours*60*60 , 0.02);

		//去掉已经设置好的，再随机一个
		list.delete(type)
		type = list.random()
		iCandy.senseSet(type, this.id, 0.1,  this.hours*60*60 , 0.02);

		return html

	},
	onHigh:function(min = 1){
		min = Math.max(min, 1);

		iUtil.getPalam("hallucinogen", 5*min);

		let _mult = 1 - Math.max(iCandy.getStat(this.id, 'taken') * 0.1, 0.3);

		iUtil.getPalam("pain", -(10 * min * _mult));
		iUtil.getPalam("stress", -(20 * min * _mult));

		//第一次显示与持续显示有差分		 
		let flag = iCandy.getFlag(this.id, 'highonce')

		let html = lanSwitch(drugMsg[this.id]['onHigh'][flag])
		 + `<<ghallucinogens>><<lpain>><<llstress>>`;

		if(flag == 0){
			iCandy.setFlag(this.id, 'highonce', 1)
		}

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
	quit: 24,		 //戒除需求时间，单位是天
	hours: 0.4,		 //药效持续时间，单位是小时


	onUse: onUseDrags,
	onHigh:function(min = 1){
		min = Math.max(min, 1);
		if(V.combat == 1) return;

		iUtil.getPalam("stress", -(5 * min));

		let flag = iCandy.getFlag(this.id, 'highonce')
		if(flag == 1) return '';

		return lanSwitch(drugMsg[this.id]['onHigh']) + `<<lstress>>`;
	}
},
{

	tags: ["addiction", "drugpowder", "strong"],
	id: "morphine",
	name: ["Morphine", "吗啡"],
	plural:"Pack of Morphine",

	info:[
		"Strong painkiller, can eliminate all pain and fatigue",
		"强效止痛药，能消除所有痛楚与疲劳",
	],

	num: 3,
	price: 9452,
	size: 12,

	effects:[
		["pain", 100],
		["tiredness", 200],
		["aphrod", 1000],
	],

	threshold: 0,	//安全使用次数，超过这个值会涨overdose
	maxOD: 4,		//最大过量值，超过这个值会上瘾
	withdraw: 30, 	//出现戒断反应所需时间，单位是小时
	quit: 40,		//戒除需求时间，单位是天
	hours: 1.6,		//药效持续时间，单位是小时

	onUse: onUseDrags,
	onHigh:function(min = 1){
		min = Math.max(min, 1);

		let _mult = 1 - Math.max(iCandy.getStat(this.id, 'taken') * 0.1, 0.3);

		iUtil.getPalam("pain", -(5 * min * _mult));
		iUtil.getPalam("tiredness", -(10 * min * _mult));
		wikifier("arousal", 100 * min * _mult, "genital");

		return lanSwitch(drugMsg[this.id]['onHigh']) + `<<lpain>><<ltiredness>><<ggarousal>>`;
	},
	onWake:function(){
		wikifier("tiredness", 100);
		iUtil.getPalam("pyshique", -50);

		return lanSwitch(drugMsg[this.id]['onWake']) + `<<ggtiredness>><<lllpyshique>>`;
	
	}
},
{
	tags: ["addiction", "drugpowder", "strong"],
	id: "ketamine",
	name: ["Ketamine", "K粉"],
	plural:"Pack of Ketamine",

	info:[
		"Kind of hallucinogen, bring you to a fantasy world",
		"一种致幻剂，带你进入幻想世界",
	],

	effects:[
		["hallucinogen", 300],
		["aphrod", 500],
	],

	threshold: 0,	//安全使用次数，超过这个值会涨overdose
	maxOD: 4,		//最大过量值，超过这个值会上瘾
	withdraw: 18, 	//出现戒断反应所需时间，单位是小时
	quit: 40,	  //戒除需求时间，单位是天
	hours: 1,	  //药效持续时间，单位是小时

	_onUse: onUseDrags,
	onUse: function(enemy){
		const html = this._onUse(enemy);
		
		//随机设置感官
		let list = ["genital", "bottom", "breast", "mouth"]
		let type = list.random()
		iCandy.senseSet(type, this.id, 0.1,  this.hours*60*60 , 0.01);

		return html

	},
	onHigh: function(min = 1){
		min = Math.max(min, 1);

		let _mult = 1 - Math.max(iCandy.getStat(this.id, 'taken') * 0.1, 0.3);

		iUtil.getPalam("hallucinogen", 5 * min);
		wikifier("arousal", 120 * min * _mult, "genital");

		return lanSwitch(drugMsg[this.id]['onHigh']) + `<<ghallucinogens>><<ggarousal>>`;
	}

},
{
	tags: ["addiction", "candy", "strong"],
	id: "iceshard",
	name: ["Ice shard", "冰毒"],
	plural:"Pack of Ice shard",

	info:[
		"Recreational drugs, bring you happiness and sweet dreams",
		"娱乐类药物，给你带来快乐与美梦。"
	],

	effects:[
		["arousal", 1000, "p"],
		["aphrod", 4000],
		["hallucinogen", 100],
	],

	threshold: 0,	//安全使用次数，超过这个值会涨overdose
	maxOD: 5,		//最大过量值，超过这个值会上瘾
	withdraw: 16, 	//出现戒断反应所需时间，单位是小时
	quit: 42,	  //戒除需求时间，单位是天
	hour: 1.5,	  //药效持续时间，单位是小时

	onUse: onUseDrags,
	onHigh:function(min = 1){
		min = Math.max(min, 1);

		let _mult = 1 - Math.max(iCandy.getStat(this.id, 'taken') * 0.1, 0.3);

		iUtil.getPalam("hallucinogen", 5 * min);

		wikifier("arousal", 500 * min * _mult, "genital");

		return lanSwitch(drugMsg[this.id]['onHigh']) + `<<ghallucinogens>><<ggarousal>>`;
	}
},
{
	tags: ["addiction", "candy", "risky"],
	id: "fizzy",
	name: ["Fizzy", "菲仔"],
	plural:"Pack of Fizzy",

	info:[
		"A kind of new drug, looks like a jelly bean.",
		"一种新型毒品，看起来与跳跳糖差不多。"
	],

	effects:[
		["aphrod", 1000],
		["drunk", 500],
	],

	threshold: 0,	//安全使用次数，超过这个值会涨overdose
	maxOD: 5,		//最大过量值，超过这个值会上瘾
	withdraw: 18, 	//出现戒断反应所需时间，单位是小时
	quit: 38,	  //戒除需求时间，单位是天
	hours: 1.2,	  //药效持续时间，单位是小时

	onUse: onUseDrags,
	onHigh:function(min = 1){
		min = Math.max(min, 1);

		let _mult = 1 - Math.max(iCandy.getStat(this.id, 'taken') * 0.1, 0.2);

		wikifier("drunk", 20 * min * _mult);
		wikifier("arousal", 100 * min * _mult, "genital");
		return lanSwitch(drugMsg[this.id]['onHigh']) + `<<ggdrunk>><<ggarousal>>`;
	}

},

{
	tags: ["addiction", "inject", "super"],

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
	quit: 52,
	hours: 1.5,

	onUse: onUseDrags,
	onHigh:function(min = 1){
		min = Math.max(min, 1);

		let _mult = 1 - Math.max(iCandy.getStat(this.id, 'taken') * 0.1, 0.3);

		iUtil.getPalam("drunk", 10 * min * _mult);
		wikifier("arousal", 800 * _mult, "genital");
		wikifier("hallucinogen", 5 * min);

		return lanSwitch(drugMsg[this.id]['onHigh'])
		 + `<<ggalcohol>><<ghallucinogens>><<ggarousal>>`;
	},
	onWake:function(){
		wikifier("alcohol", -200);
		wikifier("control", -30);
		wikifier("stress", 80);

		return lanSwitch(drugMsg[this.id]['onWake'])
		 + `<<lllalcohol>><<ggstress>><<llcontrol>>`;
	},
	onDay:function(){
		wikifier("control", 30);

		return lanSwitch(drugMsg[this.id]['onDay']) + `<<ggcontrol>>`;
	},
	onWithdraw:function(){
		wikifier("control", -60);
		wikifier("stress", 60);

		return lanSwitch(drugMsg[this.id]['onWithdraw']) + `<<lllcontrol>><<gggstress>>`;
	}
},
];

function angelOnUse(enemy){
	const html = this._onUse(enemy);
	//提升全部感官
	iCandy.senseSet("genital", this.id, 0.5,  3*60*60 , 0.01);
	iCandy.senseSet("bottom", this.id, 0.5,  3*60*60 , 0.01);
	iCandy.senseSet("breast", this.id, 0.5,  3*60*60 , 0.01);
	iCandy.senseSet("mouth", this.id, 0.5,  3*60*60 , 0.01);
	return html
}

function angelOnHigh(min = 1){
	min = Math.max(min, 1);
	wikifier("hallucinogen", 5 * min);
	wikifier("arousal", 2000, "genital");
	iUtil.getPalam("stress", -(80 * min));

	return lanSwitch( drugMsg[this.id]['onHigh'])
	 + `<<gggarousal>><<ghallucinogens>><<llstress>>`;
}

function angelOnWake(){
	let physique = random(30, 80) / 10;
	wikifier("physique_loss", physique);

	wikifier("control", -20);
	wikifier("stress", 120);

	return lanSwitch(drugMsg[this.id]['onWake'])
	+ `<<lcontrol>><<lphysique>><<gggstress>>`;
}

function angelOnDay(){
	let physique = random(40, 80);
	iUtil.getPhysique(physique);

	let will = random(10, 20);
	wikifier("willpower", will);

	wikifier("awareness", -6);
	wikifier("pain", -20);
	wikifier("trauma", -20);
	wikifier("stress", -10);
	wikifier("tiredness", -30);

	wikifier("arousal", 300);

	return lanSwitch(drugMsg[this.id]['onDay'])
	 + `<<gphysique>><<gwillpower>><<llawareness>><<lllpain>><<lltrauma>><<llstress>><<lltiredness>><<ggarousal>>`
}

function angelOnWithdraw(){
	let physique = random(60, 120) / 10;
	wikifier("physique_loss", physique);

	let will = random(20, 40);
	wikifier("willpower", -will);

	let stress = random(12, 18);
	wikifier("stress", stress);

	return lanSwitch(drugMsg[this.id]['onWithdraw'])
	 + `<<lphysique>><<lwillpower>><<ggstress>>`;
}

const magicDrugs = [
	{
		tags: ["addiction", "inject", "immediate"],
	
		id: "angelpowder_inject",
		alias: "angelpowder",
		name: ["Seraphic Euphoria", "天使粉"],
		plural:"Seraphic Euphoria",
	
		info: [
			"Fast-acting psychotropic drugs, takes you fly to heaven",
			"天使粉的针剂版。速效精神药物，带你直上天国。",
		],
	
		num: 2,
		price: 28680,
		size: "inject",
		
		effects: [
			["pain", 100],
			["trauma", 320],
			["stress", 50],
			["aphrod", 2000],
			["drunk", 1000],
		],
	
		threshold: 0, //安全使用次数，超过这个值会涨overdose
		maxOD: 0,	  //最大过量值，超过这个值会上瘾
		withdraw: 16, //出现戒断反应所需时间，单位是小时
		quit: 64,  //戒除需求时间，单位是天
		hours: 3.2,   //药效持续时间，单位是小时
	
		_onUse: onUseDrags,
		onUse: angelOnUse,
		onHigh:angelOnHigh,
		onWake: angelOnWake,

		onDay:angelOnDay,

		onWithdraw:angelOnWithdraw,

	},
	{
		tags: ["addiction", "drugpowder", "immediate"],
	
		id: "angelpowder",
		name: ["Seraphic Euphoria", "天使醉"],
		plural:"Seraphic Euphoria",
	
		info: [
			"The powder of Seraphic Euphoria.Fast-acting psychotropic drugs, takes you fly to heaven",
			"速效精神药物，带你直上天国。",
		],
	
		num: 2,
		price: 28680,
		size: 12,
		
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
		quit: 64,  //戒除需求时间，单位是天
		hours: 2,   //药效持续时间，单位是小时
	
		_onUse: onUseDrags,
		onUse: angelOnUse,
		onHigh:angelOnHigh,
		onWake: angelOnWake,

		onDay:angelOnDay,
		onWithdraw:angelOnWithdraw,
	},
]

Items.addItems(iDrugs, "drugs")
Items.addItems(magicDrugs, "drugs")
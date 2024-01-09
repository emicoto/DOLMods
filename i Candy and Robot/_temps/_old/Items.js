class Items {
static data = {};
static recipes = {};
/**
 * 将OBJ格式化到数据库中
 * @param {{id:string, name:string, price:number, num:number, type:string}} obj
 * @returns {Items}
 */
static set(obj) {
	const { id, name, price, num, type } = obj;
	this.data[id] = new Items(id, name, price, num, type);
	for (let i in obj) {
	if (this.data[i] == undefined) {
		this.data[i] = obj[i];
	}
	}
	return this.data[id];
}
/**
 * 添加物品
 * @param {string} type
 * @param {string} id
 * @param {[string, string]} name
 * @param {number} price
 * @param {number} num
 * @returns {Items}
 */
static add(id, name, price, num, type) {
	this.data[id] = new Items(id, name, price, num, type);
	return this.data[id];
}

static addRecipe(id, obj) {
	const data = new iRecipe(id);
	for (let i in obj) {
	data[i] = obj[i];
	}
	this.recipes[id] = data;
	return this.recipes[id];
}
static addRecipes(recipes) {
	recipes.forEach((data) => {
	const rec = new iRecipe(data.id, data.time, ...data.list);
	for (let i in obj) {
		rec[i] = obj[i];
	}
	this.recipes[recipe.id] = rec;
	});
}

static addItems(items) {
	items.forEach((item) => {
	const itm = new Items(
		item.id,
		item.name,
		item.price,
		item.num,
		item.type
	);
	for (let i in item) {
		itm[i] = item[i];
	}
	this.data[item.id] = itm;
	});
}
/**
 * 确认物品和对应数据确切存在并返回数据
 * @param {string} id
 * @param {string} prop
 * @returns {Items}
 */
static check(id, prop) {
	let data = this.data[id];
	if (!data) throw new Error("no such item:", id);
	if (prop && !data[prop])
	throw new Error("no such props from item:", id, prop);

	if (prop) return data[prop];
	else return data;
}
/**
 * 获取物品或物品内的某个值
 * @param {string} id
 * @param {string} prop
 * @returns {Items | void}
 */
static get(id, prop) {
	let data = this.data[id];
	if (!data) console.error("no such item:", id);
	if (prop && !data[prop])
	console.error("no such props from item:", id, prop);

	if (prop) return data[prop];
	else return data;
}
/**
 * 初始化游戏物品
 */
static init = setupVanillaItems;
/**
 *
 * @param {string} type
 * @param {string} id
 * @param {[string, string]} name
 * @param {number} price
 * @param {number} num
 */
constructor(id, name, price, num, type = "items") {
	this.type = type;
	this.id = id;
	this.name = name;

	this.num = num ?? 1;
	this.price = price ?? 100;
	this.size = "big";
	this.tags = [];
	this.usage = 1;
}
/**
 * 获取对应的值
 * @param {string} prop
 * @param {number} val
 * @returns
 */
get(prop, val) {
	if (!this[prop]) {
	this[prop] = val;
	}
	return this[prop];
}
/**
 * 更新或设置对应的值
 * @param {string} prop
 * @param {number} val
 * @returns {Items}
 */
set(prop, val) {
	this[prop] = val;
	return this;
}
/**
 * 一键设置药丸
 * @returns {Items}
 */
isPill() {
	this.tags.push("pill");
	this.size = "pill";
	return this;
}

/**
 * 一键设置针剂
 * @returns {Items}
 */
isInject() {
	this.tags.push("inject");
	this.size = "inject";
	return this;
}

/**
 * 设置物品说明
 * @returns {Items}
 */
setInfo(EN, CN) {
	this.info = [EN ?? CN, CN ?? EN];
	return this;
}
/**
 * 设置上瘾相关各数值
 * @param {number} threshold 安全剂量
 * @param {number} maxOD 短期内多少嗑多少上瘾
 * @param {number} withdraw 引起戒断反应所需时间（小时）
 * @param {number} clear 彻底戒断所需日数
 * @param {number} hours 起效时长（小时）
 * @returns
 */
setAddict(threshold = 1, maxOD = 5, withdraw = 3 * 24, clear = 7, hours = 1) {
	this.threshold = threshold;
	this.maxOD = maxOD;
	this.withdraw = withdraw;
	this.clear = clear;
	this.hours = hours;
	return this;
}

/**
 * 设置每日效果
 * @param {function} callback
 * @returns
 */
setDayEffect(callback) {
	this.onDay = callback;
	return this;
}
/**
 * 设置戒断反应
 * @param {function} callback
 * @returns
 */
setWithdraw(callback) {
	this.withdraw = callback;
	return this;
}
/**
 * 药效起作用时的持续效果
 * @param {function} callback
 * @returns
 */
setHigh(callback) {
	this.onHigh = callback;
	return this;
}
/**
 * 药效失效时的副作用效果
 * @param {funciton} callback
 * @returns
 */
setAfter(callback) {
	this.onAfter = callback;
	return this;
}

/**
 * 使用时的常规效果
 * @param  {Array<[string, number]|[string, number, 'p']>} effects
 * @returns
 */
setEffect(...effects) {
	this.effects = effects;
	return this;
}
/**
 * 设置标签
 * @param  {string[]} tags
 * @returns
 */
setTags(...tags) {
	this.tags.push(...tags);
	return this;
}
/**
 * 使用效果的处理
 * @param {string} param
 * @param {number} value
 * @param {'p'|void} method
 */
doDelta(param, value, method) {
	let params = ''
	if (this.type == "drugs" || this.type == "medicine") {
	let { taken } = V.candyDrug[this.id];
	value = value * Math.max(1 - taken * 0.1, 0.2);
	}

	if (param == "aphrod") {
		getPalam("drugged", value);
	} else if (param == "drunk") {
		getPalam("drunk", value);
	}
	else {
	if (method == "p"){
		wikifier(param, value, param == "arousal" ? "genital" : null);
	}
	else{
		value = -value;
		wikifier(param, value)
	}
	}

	if(param == 'aphrod'){
	param = 'drugged'
	}
	if(param == 'drunk'){
	param = 'alcohol'
	}

	return P.palams(param, value)
}
/**
 * 使用效果的处理
 */
/*onUse(){
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
	}*/
}

function setupVanillaItems() {
let c = Items;

for (let i in setup.plants) {
	let plant = setup.plants[i];
	let item = c.add(
	plant.name,
	[plant.plural, plant.plural],
	plant.plant_cost
	);
	let hunger = {
	fruit: 20,
	vegetable: 30,
	produce: 15,
	};

	let size = {
	fruit: "medium",
	flower: "tiny",
	vegetable: "small",
	shroom: "small",
	};

	if (size[item.type]) {
	item.set("size", size[item.type]);
	} else if (item.special.includes("small") || item.name.includes("egg")) {
	item.set("size", "small");
	}

	if (
	item.type == "fruit" ||
	item.type == "vegetable" ||
	(item.type == "produce" && item.name !== "wild_honeycomb")
	) {
	item
		.setTags("tending", "dol", "food")
		.setEffect(["hunger", hunger[item.type]]);
	} else {
	item.setTags("tending", "dol");
	}
}
}

let c = Items;
//----------------------------------------------
//  普通药物（依赖性低）
//----------------------------------------------
c.add("serotonin", ["Serotonin", "羟色胺"], 6200, 20, "medicine")
.setInfo("Help you relax and uplifit your mood", "具有放松和提振心情的作用")
.setEffect(["trauma", 16])
.setTags("addiction")
.isPill()
.setAddict(4, 12, 4, 7);

c.add("melatonin", ["Melatonin", "褪黑素"], 4800, 30, "medicine")
.setInfo("Help for sleep and reduce stress", "能帮助睡眠以及消减压力")
.setEffect(["stress", 6])
.setTags("addiction")
.isPill()
.setAddict(2, 18, 4, 5);

c.add(
"neuroOptimization",
["Neuro Optimization", "神经优化片"],
6400,
20,
"medicine"
)
.setInfo("Improves the brain and memory", "提神醒脑，增强记忆力")
.setEffect(["control", 30])
.setTags("addiction")
.isPill()
.setAddict(4, 20, 1.2, 5);

c.add("aminobutyric", ["Aminobutyric", "氨基丁酸"], 8600, 20, "medicine")
.setInfo(
	"Help for against depression and anxiety",
	"对抑郁症和焦虑症有一定抵御效果"
)
.setEffect(["trauma", 50])
.setTags("addiction")
.isPill()
.setAddict(2, 10, 3, 5);

c.add("painreduce", ["Painkiller", "止痛药"], 4750, 20, "medicine")
.setInfo("Fast-acting painkiller", "速效止痛药")
.setEffect(["pain", 30])
.isPill();

//----------------------------------------------
//  危险成瘾品（依赖性高）
//----------------------------------------------
c.add("nzt_48", ["NZT-48", "NZT-48"], 12600, 12, "drugs")
.setInfo(
	"Fabled smart drug, concentration and memory dramatically improved after taking it. But it is addictive.",
	"传说中的聪明药，吃了后集中力与记忆力大幅提高。但具备成瘾性。"
)
.setEffect(["stress", 10])
.setTags("risky", "addiction")
.isPill()
.setAddict(1, 4, 1, 14, 12)
.setHigh((min = 1) => {
	//如果在学习，会获得更好的学习效果。
	wikifier("control", 1 * min);
	let html =
	lanSwitch(
		"The effects of NZT-48 is on, you're feeling full of confident.",
		"NZT-48正在起作用，你感觉充满了自信。"
	) + `<<gcontrol>>`;
	return html;
});

//----------------------------------------------
c.add("heroin", ["Heroin", "海洛因"], 6800, 4, "drugs")
.setInfo(
	"Recreational drugs, take away your stress and bring you peace",
	"娱乐性药物，消除烦恼，给你带来快乐"
)
.setEffect(
	["trauma", 60],
	["drugs", 1000],
	["arousal", 1000, "p"],
	["hallucinogen", 100]
)
.setTags("risky", "addiction")
.isPill()
.setAddict(1, 2, 2, 28, 1)
//持续性减少压力
.setHigh((min = 1) => {
	getPalam("stress", -(2 * min));
	let html =
	lanSwitch(
		"The effects of Heroin is on, you're feeling easy.",
		"海洛因正在起作用，你感觉心情愉快。"
	) + `<<gcontrol>>`;
	return html;
});

//----------------------------------------------
c.add("mdma", ["MDMA", "摇头丸"], 5600, 5, "drugs")
.setInfo(
	"Stimulant drugs to eliminate pain and fatigue",
	"兴奋类药物，消除痛苦与疲劳"
)
.setEffect(["pain", 20], ["tiredness", 200])
.setTags("risky", "addiction")
.isPill()
.setAddict(1, 2, 2, 28, 1)
.setHigh((min = 1) => {
	getPalam("pain", -(5 * min));
	getPalam("tiredness", -(5 * min));

	let html =
	lanSwitch(
		"The effects of MDMA is on, you feel all the pains and tiredness are gone.",
		"摇头丸的效果上头了，你感觉浑身都很轻松。"
	) + `<<lpain>><<ltiredness>>`;
	return html;
});

//----------------------------------------------
c.add("amhetamine", ["Amphetamine", "安非他命"], 7260, 2, "drugs")
.setInfo(
	"Central stimulant, will get you high to heaven",
	"中枢兴奋剂，让你从头爽到尾。"
)
.setEffect(
	["pain", 20],
	["tiredness", 80],
	["arousal", 1000, "p"],
	["drugs", 1000]
)
.setTags("risky", "addiction")
.isInject()
.setAddict(0, 2, 2, 32, 2)
.setHigh((min = 1) => {
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
});

//----------------------------------------------
c.add("canabitabacco", ["Cannabi Tabacco", "大麻烟"], 5760, 12, "drugs")
.setInfo(
	"Cigarettes made of cannabis. Have a smoke to be happy",
	"大麻制成的香烟，吸一口快乐好逍遥"
)
.setEffect(["pain", 5], ["stress", 5])
.setTags("risky", "addiction", "smoke")
.set("size", "small")
.setAddict(1, 5, 2, 24, 1)
.setHigh((min = 1) => {
	getPalam("stress", -(5 * min));

	let html =
	lanSwitch(
		"As the smoke of canabis around your head, you feel like your worries have gone.",
		"当大麻的烟雾旋绕在你头上，你感觉烦恼都烟消云去了。"
	) + `<<lstress>>`;
	return html;
});

//----------------------------------------------
//  超强成瘾品。必定上瘾，效果极强，极难戒断，并带长期效果
//----------------------------------------------

//----------------------------------------------
//--可卡因
c.add("cocaine", ["Cocaine", "可卡因"], 12860, 2, "drugs")
.setInfo(
	"Fast-acting nerve stimulant that eliminates all pain and worries.",
	"速效神经兴奋剂，消除所有痛苦与烦恼。"
)
.setEffect(["pain", 100], ["trauma", 200], ["drugs", 1000])
.setTags("strong", "addiction")
.isInject()
.setAddict(0, 0, 1, 52, 2)

//戒断时大幅降低控制，并增加压力
.setWithdraw(() => {
	wikifier("control", -60);
	wikifier("stress", 60);
	let html =
	lanSwitch(
		"Cocaine withdrawal makes you feel empty and lost.",
		"可卡因的戒断反应让你感到空虚难受。"
	) + `<<lllcontrol>><<gggstress>>`;
	return html;
})
//有持续嗑药时的每日效果，增加控制
.setDayEffect(() => {
	wikifier("control", 30);
	let html =
	lanSwitch(
		"Continuously taking cocaine makes your confidence grow.",
		"持续吸取可卡因让你信心增长。"
	) + `<<ggcontrol>>`;
	return html;
})
.setHigh((min = 1) => {
	wikifier("alcohol", 10 * min);
	wikifier("arousal", 1000, "genital");
	let html =
	lanSwitch(
		"A strong ecstacy thrills your whole body, as you are dancing on the clouds.",
		"你全身上下都感到十分愉悦，仿佛在云端跳舞。"
	) + `<<ggalcohol>><<ghallucinogens>><<ggarousal>>`;
	return html;
})
.setAfter(() => {
	wikifier("alcohol", -200);
	wikifier("control", -30);
	wikifier("stress", 80);
	let html =
	lanSwitch(
		"After the cocaine wears off, you feel like falling off from the clouds.",
		"可卡因的药效过后，你感觉从云端掉了下来。"
	) + `<<lllalcohol>><<ggstress>><<llcontrol>>`;
	return html;
});
//----------------------------------------------

//----------------------------------------------
//--天使粉
c.add("angelpowder", ["Angel Powder", "天使粉"], 28680, 2, "drugs")
.setInfo(
	"Fast-acting psychotropic drugs, takes you fly to heaven",
	"速效精神药物，带你直上天国。"
)
.setEffect(
	["pain", 100],
	["trauma", 320],
	["stress", 36],
	["drugs", 1000],
	["alcohol", 1000]
)
.setTags("strong", "addiction")
.isInject()
.setAddict(0, 0, 1, 64, 1)

//没有嗑药的当天获得的DEBUFF。减少体能和意志，并获得压力
.setWithdraw(() => {
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
})

//有持续嗑药时的每日效果，增加体能和意志，减少意识，大幅减少疼痛、压力、创伤、疲劳，获得性欲
.setDayEffect(() => {
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
})

//药效起效期间的副作用
.setHigh((min = 1) => {
	wikifier("hallucinogen", 5 * min);
	wikifier("arousal", 1000, "genital");
	let html =
	lanSwitch(
		"An indescribable thrill of pleasure erupts from the depths of your soul.",
		"一股无法描述的快感从你的灵魂深处迸发。"
	) + `<<ghallucinogens>><<gggarousal>>`;
	return html;
})

//药效过头后的副作用
.setAfter(() => {
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
});
//----------------------------------------------

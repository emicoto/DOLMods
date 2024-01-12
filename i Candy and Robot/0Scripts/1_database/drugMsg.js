const generalWithdraw = function (drugItem) {
	wikifier('stress', 30);
	const html = {
		alcohol : lanSwitch(
			'You haven\'t drunk for a while, you feel irritable and start to have withdrawal symptoms.',
			'有一段时间没喝酒了，你感到烦躁难受。'
		),
		aphrod : lanSwitch(
			'You haven\'t taken aphrodisiac for a while, you\'re feeling lost and empty.',
			'你有一段时间没吸收催情类物质了，你感到空虚寂寞以及难受。'
		),
		nicotine : lanSwitch(
			'You haven\'t smoked for a while, your mouth feels empty and you feel irritable.',
			'你有一段时间没吸烟了，你的嘴感觉落空空的，心情有些烦躁。'
		)
	};

	if (html[drugItem]) {
		return `${html[drugItem]}<<gggstress>>`;
	}
	else {
		const html = lanSwitch(
			`You haven't taken ${drugItem[0]} for a while, you feel irritable and start to have withdrawal symptoms.`,
			`你有一段时间没吃${drugItem[1]}了，你感到烦躁，并开始出现戒断症状。`
		);
		return `${html}<<gggstress>>`;
	}
};

const combatFeedMsg = function (npc, drugItem) {
	if (npc == 'slime' || npc == 'tentacles') {
		const enemyname = {
			slime     : ['slime', '史莱姆'],
			tentacles : ['tentacles', '触手'],
			plant     : ['plant', '植物妖精']
		};
		const html = lanSwitch(
			`The ${enemyname[npc][0]} secreted a sweet-smelling juice and feed to you. <<gggdrugged>><br>`,
			`${enemyname[npc][1]}分泌出一种香甜的汁液喂给了你。<<gggdrugged>><br>`
		);

		return `${html}<br>`;
	}
	if (iCandy.config.debug) console.log('combat feed drugs:', npc, drugItem);

	const data = Items.get(drugItem);
	const palams = data.onUse('enemy');
	const html = {
		angelpowder_inject : lanSwitch(
			`${npc.fullDescription} looks at your lifeless face and finds it rather dull. So, <<He>> takes out a pink syringe and injects it directly into your body.<br>
			<span class ='pink'>You are injected with a dose of Seraphic Euphoria.</span>`,
			`${npc.fullDescription}看着你毫无声息的脸，觉得这样很无趣。于是<<He>>拿出一针粉色的针剂，直接打在了你身上。<br>
			<span class ='pink'>你被注射了一针天使醉。</span>`
		),
		randomInject : lanSwitch(
			`${npc.fullDescription} takes out a ${data.name[0]} syringe and injects it directly into your body.<br>
			<span class ='pink'>You are injected with a dose of ${data.name[0]}.</span>`,
			`${npc.fullDescription}拿出一针${data.name[1]}，直接打在了你身上。<br>
			<span class ='pink'>你被注射了一针${data.name[1]}。</span>`
		),
		randomFeedMouth : lanSwitch(
			`${npc.fullDescription} feeds you a <span class='pink'>${data.name[0]}</span>.`,
			`${npc.fullDescription}往你嘴里喂了颗<span class='pink'>${data.name[1]}</span>。`
		),
		randomFeedAnus : lanSwitch(
			`${npc.fullDescription} put a <span class='pink'>${data.name[0]}</span> into your anus.`,
			`${npc.fullDescription}往你肛门塞了颗<span class='pink'>${data.name[1]}</span>。`
		),
		randomFeedKiss : lanSwitch(
			`${npc.fullDescription} feeds you a <span class='pink'>${data.name[0]}</span> through mouth to mouth as <<he>> kiss you.`,
			`${npc.fullDescription}亲吻你之余，通过嘴对嘴的方式喂了你一颗<span class='pink'>${data.name[1]}</span>。`
		),
		randomFeedAny : lanSwitch(
			`${npc.fullDescription} feeds you a <span class='pink'>${data.name[0]}</span> as you gasp for breath.`,
			`${npc.fullDescription}在你喘气的空档强行喂了你一颗<span class='pink'>${data.name[1]}</span>。`
		)
	};

	if (drugItem == 'angelpowder_inject') {
		return `${html.angelpowder_inject} ${palams}<br>`;
	}

	if (data.tags.includes('inject')) {
		return `${html.randomInject} ${palams}<br>`;
	}

	if (V.mouthuse !== 'penis' && V.mouthuse !== 'kiss') {
		return `${html.randomFeedMouth} ${palams}<br>`;
	}

	if (V.anususe !== 'penis' && V.anususe !== 'penisdouble') {
		return `${html.randomFeedAnus} ${palams}<br>`;
	}

	if (V.mouthuse == 'kiss' && npc.mouth == 'kiss') {
		return `${html.randomFeedKiss} ${palams}<br>`;
	}

	return `${html.randomFeedAny} ${palams}<br>`;
};

const drugMsg = {
	nzt_48 : {
		onHigh : [
			"The effects of NZT-48 is on, you're feeling full of confident.",
			'NZT-48正在起作用，你感觉充满了自信。'
		],
		onWake : [
			'The effects of NZT-48 is wearing off, you feel a little tired.',
			'NZT-48的效果正在消退，你感觉有些疲劳。'
		],
		onWithdraw : [
			'Without NZT-48, you feel frustrated and lose your confidence.',
			'没有嗑NZT-48，你感觉心烦意乱，失去了自信。'
		]
	},

	heroin : {
		onUse : [
			"You take a piece of heroin. You feel more confident, as if you're flying in the sky.",
			'你吃下一片海洛因。你感觉更有自信了，仿佛整个人在天上飞。'
		],
		onHigh : [
			"The effects of Heroin is on, you're feeling easy.",
			'海洛因正在起作用，你感觉心情愉快。'
		],
		onWake : [
			'The effects of heroin is wearing off, you feel a little confused.',
			'海洛因的效果正在消退，你感觉有些混乱。'
		],
		onWithdraw : [
			'Without heroin, you feel disoriented. Anxiety grips you, making it impossible to find solace in sleep.',
			'没有嗑海洛因，你感到不知所措，焦虑得无法安眠。'
		]
	},

	mdma : {
		onUse : [
			`This looks like a normal candy, with its vibrant and colorful lookings.<br>
			 You pick one up, placing it in your mouth to savor the sweetness and euphoria brought on by MDMA. `,
			'这看着像是个普通的糖果，五颜六色的看着就很好吃。<br>你拿起一颗，含在嘴里品尝着摇头丸带来的甜味与幸福感。'
		],
		onHigh : [
			'The effects of MDMA is on, you feel all the pains and tiredness are gone.',
			'摇头丸的效果上头了，你感觉浑身都很轻松。'
		]
	},

	amphetamine : {
		onHigh : [
			[
				'The effects of Amphetamine is on. A strong sensatons hit your whole body like an electric, making your body even more sensitive.',
				'安非他命的效果上来了，强烈的快感如电流般袭击全身，让你的身体更加敏感了。'
			],
			[
				'The amphetamine drown you in the storm of pleasure. Your body becomes more sensitive as the drug effect increases.',
				'安非他命让你沉浸在快感的风暴中。你的身体随着药效增强变得更加敏感了。'
			]
		],
		onWake : [
			'The effects of Amphetamine is wearing off, you feel your body gradually calming down',
			'安非他命的效果正在消退，你感觉身体逐渐平复下来。'
		]
	},

	canabitabacco : {
		onHigh : [
			'As the smoke of canabis around your head, you feel like your worries have gone.',
			'当大麻的烟雾旋绕在你头上，你感觉烦恼都烟消云去了。'
		]
	},

	cocaine : {
		onHigh : [
			'A strong ecstacy thrills your whole body, as you are dancing on the clouds.',
			'你全身上下都感到十分愉悦，仿佛在云端跳舞。'
		],
		onWake : [
			'After the cocaine wears off, you feel like falling off from the clouds.',
			'可卡因的药效过后，你感觉从云端掉了下来。'
		],
		onDay : [
			'Continuously taking cocaine makes your confidence grow.',
			'持续吸取可卡因让你信心增长。'
		],
		onWithdraw : [
			'Cocaine withdrawal makes you feel empty and lost.',
			'可卡因的戒断反应让你感到空虚难受。'
		]
	},

	morphine : {
		onHigh : [
			'The effects of morphine is on, you feel your entire body becoming pleasantly relaxed and limp.',
			'吗啡的效果上来了，你感觉整个人瘫软下来十分放松。'
		],
		onWake : [
			"As the effects of the morphine wear off, you begin to feel dizzy, nauseous, and extremely weak. It's difficult to summon any strength, and your body feels drained.",
			'吗啡的效果在消退，你感觉头晕恶心，浑身乏力，一点力气都使不出来。'
		]
	},

	ketamine : {
		onHigh : [
			'The effects of ketamine is on, you see the world in a different way.',
			'氯胺酮的效果上来了，你看到的世界变得不一样了。'
		]
	},

	iceshard : {
		onHigh : [
			'The effects of ice shard is coming up, it brings you a sense of pleasure.',
			'冰毒的效果上来了，你感觉整个人酥酥麻麻特别舒服。'
		]
	},

	fizzy : {
		onHigh : [
			'The effects of fizzy start to take hold, and you begin to feel fuzzy, and somewhat sense of invincibility, as if you can do anything.',
			'菲仔的效果上来了，你感觉晕乎乎的，但莫名地觉得自己无所不能。'
		]
	},

	angelpowder : {
		onHigh : [
			'An indescribable thrill of pleasure erupts from the depths of your soul.',
			'一股无法描述的快感从你的灵魂深处迸发。'
		],

		onWake : [
			'After the Seraphic Euphoria wears off, you feel weak and powerless.',
			'天使醉的药效过后，你感到虚弱无力。'
		],
		onDay : [
			'The Seraphic Euphoria in your body inspries you, makes you feeling easy and happy.',
			'体内的天使醉鼓舞着你，让你感到轻松愉快。'
		],
		onWithdraw : [
			"You're feeling a little weak without the Seraphic Euphoria.",
			'没有嗑天使醉的你感到身体有些虚弱……'
		]
	}
};

Object.defineProperties(window, {
	drugMsg         : { get : () => drugMsg },
	generalWithdraw : { get : () => generalWithdraw },
	combatFeedMsg   : { get : () => combatFeedMsg }
});

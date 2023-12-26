
const equipText = {
	'held':{ equip: (name)=>{
		return lanSwitch(
			`You hold the ${name[0].toLocaleLowerCase()} in your hand.`, 
			`你拿起了${name[1]}。`)
		},
		unequip: (name)=>{
			return lanSwitch(
				`You put the ${name[0].toLocaleLowerCase()} down.`, 
				`你放下了${name[1]}。`)
		}
	},
	'cart':{
		equip: (name)=>{
		return lanSwitch(
			`You push the ${name[0].toLocaleLowerCase()} in front of you.`, 
			`你推着${name[1]}走在前面。`)
		},
		unequip: (name)=>{
			return lanSwitch(
				`You leave the ${name[0].toLocaleLowerCase()} aside.`, 
				`你将${name[1]}停放在了一旁。`)
		}
	},
	'bag':{
		equip: (name)=>{
		return lanSwitch(
			`You equip the ${name[0].toLocaleLowerCase()} to your body.`, 
			`你将${name[1]}装备到身上。`)
		},
		unequip: (name)=>{
			return lanSwitch(
				`You take off the ${name[0].toLocaleLowerCase()} from your body.`,
				`你将${name[1]}从身上卸下。`)
		}
	},
	'wallet':{
		equip: (name)=>{
		return lanSwitch(
			`You equip the ${name[0].toLocaleLowerCase()}.`, 
			`你将${name[1]}装备上。`)
		},
		unequip: (name)=>{
		return lanSwitch(
			`You take off ${name[0].toLocaleLowerCase()}.`,
			`你放下了${name[1]}。`)
		}
	}
}

function generalUseItemMsg(tags, names){
	let methods = useMethods(tags)
	let html = lanSwitch(
		`You ${methods[0]} the ${names[0].toLocaleLowerCase()}.`, 
		`你${methods[1]}了${names[1]}。`
	)
	return html
}

const itemMsg = {
	fruitscandy: [
		`You unwrap the candy, and the crystal-clear sugar ball reflects an enticing light.<br>
		You pop the candy into your mouth, delicately lick its surface with your tongue. <br>
		The sweet and sour taste immediately spreads on the tip of your tongue, bringing an inexplicable sense of comfort to your heart.`,
		`你剥开糖纸，晶莹剔透的糖块反射着诱人的光芒。<br>
		你把糖果塞进口里，用舌头小心地舔舐着它的表面，酸酸甜甜的味道马上在你的舌尖上晕开，一阵莫名的舒心涌上你的心头。`
	],

	chocolate:[
		`The rich and silky texture of chocolate spreads in your mouth. <br>
		With each bite, your teeth feel like they are being gently embraced by smooth silk. <br>
		A warmth, akin to sunlight, envelops you, and you experience a moment of relaxation throughout your body.`,
		`巧克力那醇厚丝滑的口感在你口中扩散开来，每咬下一口，牙齿都像在被柔顺的丝绸温柔地拥抱着。<br>
		阳光般的温暖感笼罩了你，你感到身体一阵放松。`
	],

	ramune:[
		`You press down on the marble, and with a distinctive 'pop,' the seal is broken. The carbonated bubbles fizz and dance inside the bottle, mirroring your anticipation to savor its unique taste.<br><br>
		As you take a sip, the unmistakable flavor of Ramune tingles on your taste buds. <br>
		The initial effervescence delights your palate, and you can't help but appreciate the drink's refreshing and slightly sweet notes.<br>
		With each gulp, the experience is like a playful celebration in your mouth, leaving you with a satisfying and uplifted feeling.`,
		`你用力按下弹珠，伴随着独特的“噗”声，瓶盖被打开。<br>
		瓶内的碳酸气泡欢快地冒着泡沫，仿佛在展示它独特口感，让你迫不及待地想要品尝。<br><br>
		当你抿上一口时，波子水特有的味道在你的味蕾上轻轻刺激。最初的气泡感令人愉悦，你会不禁欣赏这款饮料清新而略带甜意的味道。<br>
		每一口都像是口腔中的欢愉庆典，给予你一种满足而振奋的感觉。`
	],

	potachips:[
		`You tear up the packaged and take a chip, put it in your mouth.<br>
		Each chip is crispy and delicious, emitting a delightful and unforgettable sweetness, along with a sense of happiness. <br>
		You quickly devour all the chips, feeling a bit disappointed that the package was too big for the relatively few chips it contained.`,
		`你撕开包装，拿起薯片送进嘴里。<br>
		每一片都酥脆可口，散发出令人回味无穷的香甜，以及幸福感。<br>
		你很快把这些薯片消灭一空，有些遗憾包装太大而薯片太少。`
	],

	lolipop:[
		`You peel up the candy wrapper, revealing the colorful swirls of the lollipop.<br>
		You lick it slowly, savoring each moment. Eating this kind of candy requires patience, as the sweetness lingers with you for quite a while, even after it's gone.<br><br>
		Suddenly, memories of childhood flash back to you. <br>
		It's a distant recollection, almost hazy, but the image of enjoying this type of candy from your younger days brings a smile to your face.`,
		`你掀开糖纸，露出下面五彩斑斓的波板糖。<br>
		你一点一点舔着它，吃这种糖需要耐心，糖果的甜味将会陪伴着你好一会儿，即使吃完了也不会马上消散。<br>
		你突然想起小时候吃这种糖的情景，那已经是十分遥远的记忆了，模糊至极，但你还是莫名地笑了一下。`
	],

	candyfloss:[
		`You pick up a candyfloss, it's light as a feather, as if it could float away if you let go.<br>
		You delicately lick it, and the sensation is peculiar. It feels as if there's nothing there, yet the subtle and comforting sweetness is undeniably real.<br>
		As the thread-like syrup dissolves in your mouth, your mind also relaxes significantly.`,
		`你拿起一朵棉花糖，它轻飘飘的，像是一松手就会升上天去。<br>
		你小心地舔舐着它，口感非常奇妙，仿佛空无一物，但细腻舒心的甜味却又真实无比。<br>
		随着丝线般的糖浆在口中化开，你的精神也放松了许多。`
	],

	cola:[
		`With a gentle lift, a "pop" echoes as the pull tab opens.<br>
		The black liquid eagerly surges forth, much like your current desire to drink off it.<br><br>
		You take a sip, feeling the cola dance in your mouth. Not lingering too long on the sensation, you let it slide down your throat. <br>
		The refreshing coldness spreads from your stomach throughout your body, invigorating your spirit.`,
		`你轻轻一提，噗的一声，拉环应声而开。<br>
		黑色的液体急切地涌动着，就像你现在想要喝掉它的心情。<br><br>
		你啜饮了一口，感受可乐在你的口腔里跳动。没有让这种感觉停留太久，你让它滑进胃里，冰凉的舒心感从胃部传到全身，你的精神为之一振。<br>`
	]
}


Object.defineProperties(window, {
	equipText: { get: ()=>equipText },
	generalUseItemMsg: { get: ()=>generalUseItemMsg },
	itemMsg: { get: ()=>itemMsg },
})
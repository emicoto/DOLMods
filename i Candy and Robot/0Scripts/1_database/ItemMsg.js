
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
	],

	SpringBoxedMeal: [

        `You first put the chirashi-sushi into your mouth, the rice dyed a tender pink color by mentaiko brings a slight spiciness, then come the flavorful eggy taste of kinshi Tamago. <br>
        Afterwards, you chewed on the dense, delicate tuna puree, combined with seaweed to create a fresh seafood flavor. <br>
        Then bite into a crispy deep-fried shrimp and The succulent and firm shrimp meat and crispy batter fill the entire mouth. <br>
        Finally, put the mashed potatoes salad in your mouth and the freshness of spring vegetables removes all the fishy smell and greasiness. <br>
        Unconsciously, you have finished the entire meal box. You feel very satisfied.`,

        `你先将散寿司放入口中、被明太子染成嫩粉色的饭入口先带来微微地辣，然后是充满蛋香的蛋丝， <br>
        之后咀嚼到了绵密细腻的鲔鱼肉泥，和海苔组合成了清新的海味。 <br>
        再咬一口炸虾、咔滋一声，鲜甜紧实的虾肉和酥脆的面衣充盈著整个口腔。 <br>
        最后再将马铃薯泥沙拉放入口中，春天野菜的清新扫去所有腥味与油腻。 <br>
        不知不觉间，你已经将整份餐盒吃完。你感到十分满足。`

    ],

	SakuraWineWithBox: [
        `After you open the box, take out bottle of wine. <br>
        You shake the bottle and admire the blooming cherry blossom from different angles, and then open the bottle cap.<br>
        The sour-sweet fragrance of green apples and the faint aroma of cherry blossoms suddenly wafted out, you took a sip.<br>
        The alcohol content of the liquor is not high, but it effortlessly slides down the throat, <br>
        leaving a refreshing and sweet taste as well as the aroma of cherry blossoms on the lips and teeth. <br>
        With such fine wine accompanying, it doesn''t matter whether there is a view to enjoy. <br>
        You have found solace in this terrible world. `,

        `你打开盒子后、将瓶子拿了出来。 <br>
        你摇晃著瓶子，换角度欣赏了一会瓶子内盛开的樱花，之后打开瓶盖。 <br>
        青苹果的酸甜清香和微微樱花的芬芳顿时飘了出来、你饮上一口， <br>
        酒精含量并不高的酒液轻松地滑入喉咙，清甜爽口的味道和樱花的香味却还在唇齿间。 <br>
        有这样的美酒相伴，好像有没有景色可赏都无所谓了。 <br>
        你感受到了在这糟糕世界里的小小幸福。`

    ],

	BulkSakuraWine: [        
        `After you open the box, take out bottle of wine. <br>
        You shake the bottle and admire the blooming cherry blossom from different angles, and then open the bottle cap.<br>
        The sour-sweet fragrance of green apples and the faint aroma of cherry blossoms suddenly wafted out, you took a sip.<br>
        The alcohol content of the liquor is not high, but it effortlessly slides down the throat, <br>
        leaving a refreshing and sweet taste as well as the aroma of cherry blossoms on the lips and teeth. <br>
        Suddenly a surge of warmth rushes from your lower abdomen, making you instantly feel light-headed. <br>
        Your legs turn as soft as noodles, while your head feels as heavy as a stone. <br>
        All the scenery appears to be swirling and shimmering with dazzling colors. <br>
        What seems off to you doesn''t really matter, this wine is so good...`,


        `你摇晃著瓶子，换角度欣赏了一会瓶子内盛开的樱花，之后打开瓶盖。 <br>
        青苹果的酸甜清香和微微樱花的芬芳顿时飘了出来、你饮上一口， <br>
        酒精含量并不高的酒液轻松地滑入喉咙，清甜爽口的味道和樱花的香味却还在唇齿间。 <br> 
        一股热流从你的下腹上窜、你瞬间感到轻飘飘地，腿好像成了软成了面条、头却重的像石头。 <br> 
        眯著眼看去所有的景物都在扭动、满是绚丽的光彩。 <br> 
        你感到有什么事好像不太对劲，但是有什么关系呢？这酒可真好喝…`
    ],

	ChestnutEarlGreyCake: [
        `You hold this small, dainty cake in your hand, the light brown and white pastry doesn''t look desolate in autumn, but rather warm and appealing. <br>
        Put it in your mouth, the crisp meringue melts instantly, leaving only a light and refreshing crispness. <br>
        Rum-infused grapes burst with a slightly intoxicating aroma and then meet a rich nutty flavor and intense caramel sweetness of chestnut puree in the mouth. <br>
        The final cream balances the intense impact, combining smooth milk fragrance with alcohol and sweet chestnut, creating a unique and perfect whole. <br>
        You licking off the powdered sugar on your hand, You ponder whether to get another serving.`,

        `你将这个小巧的蛋糕拿在手里，浅棕色和白色的糕点看上去没有秋日的萧索、倒是显得温馨可人。 <br>
        将它送入口中，酥脆的蛋白霜入口即化、只留下清盈和爽脆的口感， <br>
        朗姆酒酿葡萄爆发出微醺的芬芳美味、和随后带著浓浓坚果香和强烈的焦糖滋味的香甜栗子泥在口中邂逅， <br>
        最后的生奶油平衡了过于浓烈的冲击、嫩滑的奶香融合了酒香和甜蜜的栗子、成为一个独特完美的整体。 <br>
        你舔掉手上的糖粉，思索著要不要再来一份？`

	],

	AutumnBoxedMeal: [        
        `You first put the rice full of  unagi sauce flavor into your mouth, and the unique sauce aroma immediately fills your mouth. <br>
        In combination with a juicy and tender grilled eel, the deliciousness of the eel and the sweetness of the sauce blend seamlessly, dancing on your taste buds. <br>
        Taking another bite, the captivating aroma of matsutake and the exquisite taste of matsutake surprisingly resembled tender and juicy red meat, adding more layers of flavor to this meal. <br>
        Finally, put the salmon that has been rolled into a beautiful flower into your mouth, and the tender fat and delicious salmon meat melt away, leaving only a sweet and rich flavor. <br>
        After finishing this delicious food, it makes you feel the gift from autumn, every bite full of the bounty of nature and human ingenuity.`,

        `你先将饱含蒲烧酱汁的米饭送入口中，那股独特的酱香顿时瀰漫在口中、 <br>
        配合一口肥嫩的蒲烧鳗，鳗鱼的鲜美和甘美的酱汁配合的天衣无缝、在你的唇齿间共舞。 <br>
        再尝一口散发著迷人香气的松茸、鲜美的菇类竟犹如红肉般醇厚多汁且充满了咬劲，为这份餐点添增了更多的层次感。 <br>
        最后再将卷成美丽花朵的鲑鱼放入口中，滑嫩的脂肪和鲜美的鲑鱼肉在口中化开、只余下鲜甜浓郁的滋味。 <br>
        在吃完这份美食，让你感受到了来自秋天的餽赠、每一口都充满了大自然的恩赐和人类的巧思。 `

    ],

	OsmanthusWine: [
        `You shake the bottle, and before your eyes appears a farmhouse courtyard surrounded by earthen walls and wooden fences.<br>
        In the center of the courtyard stands a osmanthus tree towering as high as a two-story building, a companion throughout your growth.<br>
        Osmanthus blossoms profusely, their rich and somewhat overpowering fragrance continuously drifting into your nostrils as you take a sip. The lush floral aroma perfectly blends into the fragrance of the wine, diffusing in your mouth.<br>
        You reminisce about times filled with the chirping sounds of friends engaged in idle chatter.<br>
        Sweet memories flood in from somewhere unknown.`,

        `你摇晃着瓶子，眼前出现了土墙和木篱笆围成的农家小院。<br>
        院子中央，是一棵足有两层楼高的桂花树，它伴你长大。<br>
        桂花纷繁盛开，浓郁到有些呛人的香气不停往鼻孔里钻，你灌下一口。<br>
        馥郁的花香完美地融入到酒香中，在口中晕开。<br>
        你回忆起身边充满叽叽喳喳声，朋友们无事闲谈的时光。<br>
        不知道是来自哪里的幸福记忆。`

    ],
}


Object.defineProperties(window, {
	equipText: { get: ()=>equipText },
	itemMsg: { get: ()=>itemMsg },
})
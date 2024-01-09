
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


const systemMsg = {
    getItem: [
        `<span class='green'>You got {0}.</span><br>`,
        `<span class='green'>你获得了{0}。</span><br>`
    ],

    useItem: [
        `You {0} the {1}.`,
        `你{0}了{1}。`
    ],
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

    cola_bottle:[
		`You rise to uncork the bottle, and with a snap, the lid falls off.<br>
		The black liquid eagerly surges forth, much like your current desire to drink off it.<br><br>
		You take a sip, feeling the cola dance in your mouth. Not lingering too long on the sensation, you let it slide down your throat. <br>
		The refreshing coldness spreads from your stomach throughout your body, invigorating your spirit.`,
		`你起开瓶盖，啪的一声，盖子应声而落。<br>
		黑色的液体急切地涌动着，就像你现在想要喝掉它的心情。<br><br>
		你啜饮了一口，感受可乐在你的口腔里跳动。没有让这种感觉停留太久，你让它滑进胃里，冰凉的舒心感从胃部传到全身，你的精神为之一振。<br>`
	],

	SpringBoxedMeal: [

        `The box includes Mentaiko Chirashi-Sushi, fried shrimp, and potato mash salad served with tomatoes.<br>
        You first put the chirashi-sushi into your mouth, the rice dyed a tender pink color by mentaiko brings a slight spiciness, then come the flavorful eggy taste of kinshi Tamago. <br>
        Afterwards, you chewed on the dense, delicate tuna puree, combined with seaweed to create a fresh seafood flavor. <br>
        Then bite into a crispy deep-fried shrimp and The succulent and firm shrimp meat and crispy batter fill the entire mouth. <br>
        Finally, put the mashed potatoes salad in your mouth and the freshness of spring vegetables removes all the fishy smell and greasiness. <br>
        Unconsciously, you have finished the entire meal box. You feel very satisfied.`,

        `你先将散寿司放入口中、被明太子染成嫩粉色的饭入口先带来微微地辣，然后是充满蛋香的蛋丝， <br>
        之后咀嚼到了绵密细腻的鲔鱼肉泥，和海苔组合成了清新的海味。 <br>
        再咬一口炸虾、咔滋一声，鲜甜紧实的虾肉和酥脆的面衣充盈着整个口腔。 <br>
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
        你摇晃着瓶子，换角度欣赏了一会瓶子内盛开的樱花，之后打开瓶盖。 <br>
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


        `你摇晃着瓶子，换角度欣赏了一会瓶子内盛开的樱花，之后打开瓶盖。 <br>
        青苹果的酸甜清香和微微樱花的芬芳顿时飘了出来、你饮上一口， <br>
        酒精含量并不高的酒液轻松地滑入喉咙，清甜爽口的味道和樱花的香味却还在唇齿间。 <br> 
        一股热流从你的下腹上窜、你瞬间感到轻飘飘地，腿好像成了软成了面条、头却重的像石头。 <br> 
        眯着眼看去所有的景物都在扭动、满是绚丽的光彩。 <br> 
        你感到有什么事好像不太对劲，但是有什么关系呢？这酒可真好喝……`
    ],

	MontBlancCake: [
        `You hold this small, dainty cake in your hand, the light brown and white pastry doesn''t look desolate in autumn, but rather warm and appealing. <br>
        Put it in your mouth, the crisp meringue melts instantly, leaving only a light and refreshing crispness. <br>
        Rum-infused grapes burst with a slightly intoxicating aroma and then meet a rich nutty flavor and intense caramel sweetness of chestnut puree in the mouth. <br>
        The final cream balances the intense impact, combining smooth milk fragrance with alcohol and sweet chestnut, creating a unique and perfect whole. <br>
        You licking off the powdered sugar on your hand, You ponder whether to get another serving.`,

        `你将这个小巧的蛋糕拿在手里，浅棕色和白色的糕点看上去没有秋日的萧索、倒是显得温馨可人。 <br>
        将它送入口中，酥脆的蛋白霜入口即化、只留下清盈和爽脆的口感， <br>
        朗姆酒酿葡萄爆发出微醺的芬芳美味、和随后带著浓浓坚果香和强烈的焦糖滋味的香甜栗子泥在口中邂逅， <br>
        最后的生奶油平衡了过于浓烈的冲击、嫩滑的奶香融合了酒香和甜蜜的栗子、成为一个独特完美的整体。 <br>
        你舔掉手上的糖粉，思索着要不要再来一份？`

	],

	AutumnBoxedMeal: [        
        `The box includes rice, tender grilled eel, matsutake mushrooms, and fresh salmon arranged like vibrant flowers.<br>
        You first put the rice full of  unagi sauce flavor into your mouth, and the unique sauce aroma immediately fills your mouth. <br>
        In combination with a juicy and tender grilled eel, the deliciousness of the eel and the sweetness of the sauce blend seamlessly, dancing on your taste buds. <br>
        Taking another bite, the captivating aroma of matsutake and the exquisite taste of matsutake surprisingly resembled tender and juicy red meat, adding more layers of flavor to this meal. <br>
        Finally, put the salmon that has been rolled into a beautiful flower into your mouth, and the tender fat and delicious salmon meat melt away, leaving only a sweet and rich flavor. <br>
        After finishing this delicious food, it makes you feel the gift from autumn, every bite full of the bounty of nature and human ingenuity.`,

        `你先将饱含蒲烧酱汁的米饭送入口中，那股独特的酱香顿时弥漫在口中。 <br>
        配合一口肥嫩的蒲烧鳗，鳗鱼的鲜美和甘美的酱汁配合的天衣无缝、在你的唇齿间共舞。 <br>
        再尝一口散发着迷人香气的松茸、鲜美的菇类竟犹如红肉般醇厚多汁且充满了咬劲，为这份餐点添增了更多的层次感。 <br>
        最后再将卷成美丽花朵的鲑鱼放入口中，滑嫩的脂肪和鲜美的鲑鱼肉在口中化开、只余下鲜甜浓郁的滋味。 <br>
        在吃完这份美食，让你感受到了来自秋天的馈赠、每一口都充满了大自然的恩赐和人类的巧思。 `

    ],

	OsmanthusWine: [
        `The liquor presents a bright amber hue, and the bottle neck is adorned with a delicate circle of pale golden osmanthus.<br>
        You shake the bottle, and before your eyes appears a farmhouse courtyard surrounded by earthen walls and wooden fences.<br>
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

	HanamiDango: [

        `You take a bite of the dango and taste an elegant rice fragrance and a soft and chewy texture, with a hint of sweetness. <br>
        The pink one has a light sakura fragrance, while the white one enhances the aroma of rice.And The green one has a scent mugwort. <br>
        Chew silently, causing your soul to feel pure and tranquil.`,

        `你咬了一口团子，尝到淡雅的米香和软糯弹牙的口感，带着些许的甜味。 <br>
        粉色的有淡淡的樱花香，白色的团子让米的香气更加鲜明，绿色的团子则有着艾草的香味。 <br>
        静静地咀嚼，让你感到心灵都澄净安宁了。`

    ],

	Sakuramochi: [
        `The glutinous rice outer skin is dyed a In a transparent glass bottle is a pale pink liquor brewed with green apple and cherry blossom pink by cherry blossom petals is filled with sweet red bean paste and wrapped in salted cherry blossom leaves, creating this cute and spring-like dessert.<br>
        You peel open the leaf and take a bite, tasting the mild and fragrant aroma of rice and the chewy glutinous rice skin, followed by the sweet and rich red bean paste filling. <br>
        After enjoying the sticky and soft sweetness, take another bite combine salted cherry leaves and instantly fill your mouth with the fragrance and cherry blossoms, bringing a tangy, sweet, and salty flavor. <br>
        You just ate the whole sakuramochi , feeling completely enveloped in the scent of cherry blossoms and spring.`,

        `你先剥开叶子咬上一口，尝到清淡柔和的米香和Q弹的的糯米外皮、接着是甜蜜浓厚的红豆沙馅， <br>
        充分享受黏呼呼又软绵绵的香甜后，再咬上一口盐渍的樱叶、樱花的香味瞬间充满了你的口腔，同时带来酸酸甜甜又咸咸的滋味。 <br>
        你就这样吃光了整个樱饼，感到整个人被包裹在樱花与春天的气息里。 `

    ],

    ColdRamen: [        
        `You put the cold noodles covered in sauce into your mouth, the chilled noodles have a satisfying chewiness, the crispy and refreshing cucumber and the tangy juicy tomatoes counterbalance the mild spiciness of the sauce, making your appetite open up. <br>
        Chewing the fresh and sweet shrimp along with the fragrant shredded ham, a completely different rich and flavorful taste swept over the taste buds. <br>
        After finishing the whole plate of cold noodles, the scorching heat of summer doesn't feel as unbearable.`,

        `你将沾满了酱汁的冷面放入口中，冰镇过后的面嚼劲十足、脆爽的小黄瓜和酸甜多汁的番茄抵消了微辣的酱汁带来的灼烧感，只让你胃口大开。 <br>
        再伴随鲜甜的虾仁和香气四溢的火腿丝一起咀嚼，和刚才截然不同的浓郁滋味席卷了味蕾。 <br>
        你吃完了整份冷面，感觉夏天的酷热也没有那么难熬了。`

    ],

    ChestnutRoyalCake: [
        `You cut open this cake with a warm brown tone, and the sweet fragrance of chestnuts becomes even richer. <br>
        Bite into a soft cake filled with rich and sweet chestnut paste, the fragrant aroma of Earl Grey cream and the sweetness of chestnuts intertwine in the mouth. <br>
        The finely chopped chocolate adds a crunchy texture and a hint of bittersweetness, bringing a richer and more luxurious flavor to the cake. <br>
        With the fragrance of red tea and chestnut, the slight bitterness prevents the sweet cake from becoming heavy, making it irresistible once you start eating it. <br>
        Unconsciously ate the whole cake, you can still savor the deliciousness just now. `,

        `你切开这个呈现温暖的褐色调的蛋糕，栗子的香甜更浓郁了。 <br>
        咬上一口，松软的蛋糕和浓郁甜美的栗子馅融为一体，红茶的馥郁香气和栗子的香甜在口中交织、 <br>
        细碎的巧克力增添了一些脆脆的食感和丝丝苦甜，这为蛋糕带来了更加丰富与奢华的风味。 <br>
        伴着红茶与栗子的馨香，微微的苦涩，完全不发腻让你一吃就停不下来。 <br>
        不知不觉吃完了整个蛋糕，你还能回味刚才的美味。 `

    ],

	PorkPie: [
        `This pie has completely cooled down, but the subtle meat aroma and roasted fragrance are still enticing, and the crust remains crispy and layered. <br>
        Biting into it lightly, the crispy and fluffy pastry, the cold and refreshing meat filling with a hint of spices, and the tender and smooth broth jelly melt and blend together in the mouth. <br>
        If paired with mulled wine, it would be the perfect meal. With a faint regret, you savor the delicious pork pie.` ,

        `这份派已经完全冷却了，但淡淡的肉香和烘烤的香气依旧诱人，酥皮也依然是酥脆而层次分明。 <br>
        轻咬一口，酥松的派皮、冷凉的肉馅带着香料的风味，和Q嫩的高汤冻在口内融化、交融。 <br>
        如果能配上一杯热红酒，那就是最棒的一餐了。你带淡淡的遗憾，享用着美味的猪肉派。`

    ],

    MincePie: [   
        `As you take a bite, the golden and crispy pie crust melts in your mouth, bringing a rich milky flavor. <br>
        The dried fruits soaked in strong liquor constantly release delicious flavors as they are chewed, some being soft and juicy, others crispy and tasty. Together with spices such as cardamom, cinnamon, and cloves, they form a warm aroma. <br>
        The sour-sweet green apple and slightly bitter candied orange peel balance the excessive sweetness, bringing a refreshing flavor. <br>
        You feel warm all over, even your breath is sweet and warm.`,

        `你一口咬下，金黄酥脆的派皮在你的嘴里化开，带来满满的奶香。 <br>
        被烈酒浸润的丰富果干在咀嚼间不断地释放美味，有的柔软多汁，有的松软可口，它们和豆蔻、肉桂、丁香等香料一起、组成了温暖的气息。 <br>
        酸甜的青苹果与微涩的糖渍柑橘皮中和了过重的甜味、带来了清爽的风味。 <br>
        你感到全身暖呼呼，连哈气都是甜蜜而温暖的。`

    ],

	MulledWine: [
        `You savor this cup of mulled wine carefully, as it seems to have been infused with some obscure ingredients as flavorings. <br>
        However, this has made the taste of this red wine more rich and layered. <br>
        The sweet and rich fruit aroma blends harmoniously with a hint of sourness and a lingering wine-like flavor between the lips and teeth, <br>
        smoothly sliding down the throat and creating a warm sensation. <br>
        Even more delightful is the introduction of a light mist-like, semi-transparent solid that offers a completely new texture.<br>
        Perhaps you can ask the bartender what this is. You chew on the soft, translucent solid and think about it. <br>
        You feel a surge of heat throughout your body.`,

        `你细细品尝着这杯热红酒，里面似乎加入了一些你不甚明晰的材料作为调味品。但这让这杯红酒的口感层次变得更加丰富了。 <br>
        香甜丰润的果香和微微的酸涩后调与唇齿间回味的酒香巧妙地融合，顺着食道滑入胃里，升腾起一阵暖意。 <br>
        更妙的是还有轻雾状的半透明固体带来了全新的食感。 <br>
        也许你可以去问问调酒师这是什么。你咀嚼着弹软的半透明固体，这样想到。 <br>
        你感到浑身热了起来。`

    ],

	MintJelly: [
        `You pinch the decorated mint leaf and gently set it aside. A gust of wind sweeps it away, leaving the air infused with a subtle hint of mint.<br>
        You take a bite of half the jelly; the cool and transparent fragrance of mint rushes out from the moist and slightly sweet jelly, instantly invigorating your senses.<br>
        The jelly is tender and springy, sliding smoothly down your throat. It captures the memories of summer, leaving a deep imprint in your mind.<br>
        You feel as if you've returned to childhood.`,

        `你捏住装饰薄荷叶，轻轻放到一边。一阵风卷走了它，空气染上了似有若无的薄荷芬芳。<br>
        你一口咬下半个果冻，清凉通透的薄荷香气从盈润微甜的果冻中直冲而出，让人不禁精神一振。<br>
        果冻水润弹牙，直顺喉咙而下。留住夏日的记忆，深深刻印在脑海中。<br>
        你仿佛回到了童年。`

    ],

	BasicFoodSet: [  
        `You gently stir the white rice with chopsticks, releasing a subtle fragrance of rice. The texture is full and tender, creating a harmonious blend with the side dishes.<br>
        The clear soup exudes the aroma of miso. As you consume the soft tofu and chew on the resilient seaweed, the broth reveals its richness, complemented by the freshness and deliciousness of the ingredients.<br>
        You leisurely lift the teacup, bringing it close to your lips to delicately sniff the sweet tea aroma. With a sip, the tea provides a refreshing relief from the meal's richness.<br>
        After finishing the meal, you tidy up the utensils and return them to the owner.`,

        `你用筷子轻轻拌动白米，米香淡淡。口感饱满而软糯。米饭与配菜相得益彰。<br>
        清汤溢着味增的香气，吃下软嫩的豆腐，嚼碎艮韧的海带。汤汁醇厚，食材新鲜而美味。<br>
        你悠然端起茶杯，凑近杯口，轻嗅着甘甜的茶香。饮下一口，清爽解腻。<br> 
        餐毕，你收拾好餐具，还给老板。`

    ],

    LambChop: [        
        `You gently tear with a fork, and the meat strands separate from the bones. The charcoal-grilled surface emanates a subtle charred fragrance, and the fat has melted during the grilling process, making the lamb chops rich and juicy. The aroma of rosemary and thyme mingles with the meat fragrance, rising like clouds.<br>
        As you place the torn lamb pieces into your mouth, a crisp golden crust breaks with a satisfying sound, and the intense charcoal-grilled aroma hits you. The meticulous charcoal grilling ensures the meat maintains its optimal texture, leaving you intoxicated with each bite.<br>
        One piece after another. You eat with thorough enjoyment, and a sense of satisfaction spreads throughout your body. The lamb chops completely fill your hungry stomach, making the harsh winter winds seem more bearable.`,

        `你拿用叉子轻轻一撕，肉丝从骨头上脱离，碳烤的外表散发着微微焦香，而脂肪在烤制过程中已经溶化，羊排浓郁多汁。迷迭香与百里香的香气混着肉香如云般升腾。<br>
        将撕下的羊肉块送入口中，咔嚓一声咬开金黄的脆壳，浓郁的炭烤香气扑面而来。精巧的烤制让肉保持在最佳口感，令人陶醉其中。<br>
        一块又一块。你吃得干干净净，满足感在身上蔓延，小羊排彻底填满了你饥饿的肚腹。冬季的寒风似乎也没那么难熬了。`

    ],

	MintLemonade: [
        `You took a sip through the straw, and the fragrance of mint took the lead, sweeping away the heat and stuffiness.<br>
        In the middle notes, a symphony composed of crushed mint leaves and freshly steeped lemon unfolds. The sweet aroma of the fruits permeates your nostrils.<br>
        Unconsciously, the sound of the straw sucking up the last drops of liquid echoes in the cup.<br>
        You savor the aftertaste in your mouth, feeling content in the scorching summer days.`,

        `你含住吸管啜了一口，薄荷的香气先声夺人，卷走了酷热与烦闷。<br>
        中调是揉碎的薄荷叶与泡得时间刚刚好的新鲜柠檬合成的协奏曲。水果的甘美气息浸润鼻腔。<br>
        不知不觉间，杯中传来吸管喝空液体的嘶嘶声。<br>
        你体会着口中的回甘，在炎炎夏日中倍感惬意。`

    ],

    PineappleIce: [
        `You take a bite of the dango and taste an elegant rice fragrance and a soft and chewy texture, with a hint of sweetness. <br>
        The pink one has a light sakura fragrance, while the white one enhances the aroma of rice.And The green one has a scent mugwort. <br>
        Chew silently, causing your soul to feel pure and tranquil.`,

        `你捧起菠萝杯，如预想中那样，有些扎手。<br>
        含有果汁的冰块在口中释放，在舌尖舞动。菠萝的香气随之弥漫开来，<br>
        不经意间，冰块的形状在口中变化，增添了一份趣味。<br>
        你咬碎冰块，咔嚓一声。烦恼和疲惫随着冰爽咽进肚中，消散而去。`

    ],

    WatermelonIce: [
        `You peel open the leaf and take a bite, tasting the mild and fragrant aroma of rice and the chewy glutinous rice skin, followed by the sweet and rich red bean paste filling. <br>
        After enjoying the sticky and soft sweetness, take another bite combine salted cherry leaves and instantly fill your mouth with the fragrance and cherry blossoms, bringing a tangy, sweet, and salty flavor. <br>
        You just ate the whole sakuramochi , feeling completely enveloped in the scent of cherry blossoms and spring.`,

        `西瓜的甜蜜在唇齿间蔓延。水珠沿着杯壁滑落，交织成一幅颇为后现代主义的画作。<br>
        你细细咀嚼着西瓜，仿佛在品味夏日的清新和甜美。 <br>
        不知不觉间，杯中传来吸管喝空液体的嘶嘶声。<br>
        你放下杯子，甩了甩手上的水。`
    ],

    orionring: [
        `You ate the onion rings.<br>
        The natural sweetness of the onion is enhanced by the frying process, contrasting with the crispy shell. The chicken flavour crunched.`,

        `你吃了洋葱圈。<br>
        洋葱的自然甜味在油炸的过程中得到了充分的提升，与酥脆的外壳形成鲜明对比。鸡肉味嘎嘣脆。`
    ],

    oreo: [
        `You ate the Oreo.<br>
        Twisted and licked and bubbled, the creamy flavour along with the taste of crunchy little chocolate biscuits filled your mouth.`,

        `你吃了奥利奥。<br>
        扭一扭舔一舔泡一泡，奶香味伴随着脆脆的巧克力小饼干味充满了你的口腔。`
    ],

    pocky: [
        `You ate pokey.<br>
        The outer layer of the cookie sticks is covered with a rich and smooth coating, slightly sweet, creating a perfect combination with the light and crispy texture of the cookies. Chewing produces a distinct crunch, providing you with a delightful experience.`,

        `你吃了百奇巧克力饼干条。<br>
        饼干棒的外层覆盖着一层味道丰富的涂层，丝滑又微甜，与饼干的轻盈和酥脆形成完美的搭配。在咀嚼时会产生明显的嘎吱声，给你愉快的体验。`
    ],

    fruitscrisp: [
        `You ate fruits crisp, casually pouring them into your mouth.<br>
        The crispness of the nuts and the softness of the dried berries blend together, creating a wonderfully unique flavor.`,

        `你吃了干果，你将它们随意地倒在嘴里。<br>
        坚果的酥脆和风干浆果的软糯混杂在一起，口味非常奇妙。`
    ],

    jellos: [
        `You ate a jelly.<br>
        It's smooth and slips into your stomach all at once. You guess at what it would have tasted like in the residual sweetness.`,

        `你吃下一个果冻。<br>
        滑溜溜的，一下子就溜进胃里。你在残余的甜味中猜测着它本来的口味。`
    ],

    danishcookies: [
        `You ate Danish cookies.<br>
        The rich aroma of butter permeates your mouth, gradually melting as you chew, providing a silky smooth texture.`,

        `你吃了丹麦曲奇。<br>
        浓郁的奶油香气在你口中四溢，在咀嚼时逐渐融化，口感丝滑。`
    ],

    ferrero: [
        `You ate Ferrero Rocher chocolate.<br>
        Its silky texture gently melts on your tongue, and as the chocolate shell dissolves, the rich caramel filling begins to release its unique charm. The caramel filling is rich and sweet, balancing perfectly with the chocolate's slight bitterness.`,

        `你吃了费列罗巧克力。<br>
        它的丝滑质地在你舌尖上轻轻融化，随着巧克力壳的融化，里面的焦糖馅料开始释放其独特的魅力。焦糖馅料浓郁而香甜，与巧克力的微苦恰到好处地平衡。`
    ],

    water: [
        `You drank the water.
        Err...is what water tastes like.`,

        `你喝了水。
        额……就是水的味道。`
    ],

    mineralwater: [
        `You drank mineral water. <br>
        It's a bit sweeter than normal water, which is why they can be sold in bottles`,

        `你喝了矿泉水。<br>
        比一般的水要甘一些，这就是它们能够装在瓶子里卖的原因。`
    ],

    frappuccino: [
        `You drank Frappuccino. <br>
        One sip of icy cold and refreshing.`,

        `你喝了星冰乐咖啡。<br>
        喝一口冰冰凉凉的，提神醒脑。`
    ],

    cancoffe: [
        `You drank coffee from a can. <br>
        Cream mixed with the flavour of dark roast industrial coffee.`,

        `你喝了罐装咖啡。<br>
        奶精混杂着深烘工业咖啡的味道。`
    ],

    redcow: [
        `You drank Red Cow. <br>
        A more powerful pick-me-up than coffee rushes down your throat in the flavour of taurine.`,

        `你喝了红羊。<br>
        比咖啡更加强劲的提神力量在牛磺酸的味道里涌进你的喉咙里。`
    ],

    sportdrink: [
        `You drank an energy drink. <br>
        It tastes a bit like grapefruit and replenishes electrolytes lost after a workout. 
        But it also tastes good on a regular basis.`,

        `你喝了能量饮料。<br>
        味道有点像是西柚，能够补充在运动过后流失的电解质。不过平时喝也很好味。`
    ],

    fruitsoda: [
        `You drank the fruit soda. <br>
        The fruity flavour with the carbonation tingles your taste buds, it's the bubbles that go up a bit and surge into your stomach, making you burp.`,

        `你喝了水果苏打。<br>
        水果味配着碳酸刺激着你的味蕾，就是气泡有点上头，涌入胃里，让你打了个嗝。`
    ],

    milktea: [
        `You drank Queen's Milk Tea. <br>
        The flavours of the creamer and tea mix blended together actually felt indulgently silky. It's just a bit high in calories.`,

        `你喝了皇后奶茶。<br>
        奶精和茶混合的味道，融合起来竟感觉纵享丝滑。就是热量有点高。`
    ],

    royaltea: [
        `You drank afternoon black tea. <br>
        The slight bitterness of the tea is masked by the flavour of the sugar, and you drink it with a sense of elegance.`,

        `你喝了午后红茶。<br>
        茶的微苦被糖的味道掩盖，喝起来有种优雅的感觉。`
    ],

    icetea: [
        `You drank ice tea. <br>
        The flavours of lemon and black tea mix together for an icy cold taste that's great for beating the summer heat.`,

        `你喝了冰红茶。<br>
        柠檬与红茶的味道混合在一起，口感冰冰凉凉，是夏天消暑的好物。`
    ],

    sandwich: [
        `You took a bite of sandwich. <br>
        Vegetables, eggs and meat textures appear in turn, wrapped in a hearty bread. It's not an elaborate dish, but filling enough.`,

        `你咬下一口三文治。<br>
        蔬菜、蛋和肉的口感依次出现，裹在丰盈的面包中。虽然不是精致菜肴，但足够充饥。`
    ],

    lunchbox: [
        `You ate the easy meal. <br> 
        The vegetables have lost their moisture and are dry; the meat is flabby. Sort of a mediocre meal.`,
        `你吃下了简易套餐。<br>
        蔬菜失去水分，干巴巴的；肉也很松散。算是平凡的一餐。`
    ],

    sandwichbread: [
        `You ate the sandwich bread. <br>
        It's dry and makes you want to drink water. <br>
        There should be something sandwiched inside the bread to make it taste good.`,
        `你吃下了三明治面包。面包很干，让人忍不住想喝水。<br>
        面包里面应该夹点什么才好吃。`
        
    ],

    ritz: [
        `You've had RITZ Biscuit. <br> 
        The crunch of the biscuit and the soft texture of the cheese sandwich intertwine while releasing the rich aroma of butter, cream and cheese. It's salty, sweet and deliciously pinched.`,

        `你吃了乐兹芝士夹心饼。<br>
        饼干的酥脆和芝士夹心的绵软质地相互交织，同时释放出黄油、奶油和芝士的浓郁香气。咸咸甜甜的，好吃捏。`
    ],

    gachacandy: [
        `Inside the transparent bag, the green Slime smiles at you.<br>
        You tear open the bag and squeeze the Slime candy inside, it feels Q-tastic to the touch.<br>
        You tentatively put the candy in your mouth, and a strong earthy flavour hits your brain.<br>
        Your teeth can't take the bite of the candy and the syrup inside explodes violently, the excessive sweetness drying out your throat.`,

        `透明的包装袋内，绿色的史莱姆对着你微笑。<br>
        你撕开包装袋，捏了捏里面的史莱姆糖果，手感Q弹。<br>
        你试探地把糖果放进了嘴里，强烈的土腥味冲击了你的大脑。<br>
        牙齿受不了地咬下糖果，里面的糖浆猛地炸开，过高的甜度令你喉咙发干。`
    ],

    gachacandy_blue: [
        `Strange objects of indescribable appearance in a bag with the title "booger-flavoured sweets" make you feel like your hands are not clean enough to hold the bag.<br>
        Would anyone really try to eat such things? You hesitantly put what might be called a candy in your mouth. <br>
        When the candy touches your tongue, you feel like you're in a house full of cobwebs, and the dusty smell that surrounds you makes you cough.`,

        `难以形容外表的奇怪物体在包装袋中，标题的“鼻屎味糖果”让你感觉自己拿着包装袋的手都不干净了，<br>
        真的会有人尝试吃这种东西吗？你犹豫良久将或许可以称之为糖果的物体放进嘴里。<br>
        当糖果接触到舌头，你仿佛置身于布满蜘蛛网的小屋，萦绕在你身边的灰尘味让你不自觉地咳嗽。`
    ],

    gachacandy_orange: [
        `"What kind of intense spark will the combination of sweets and spicy flavours create?<br>"
        The bag reads this description.<br>
        You carefully bite into the tip of the candy, the mild spiciness and moderate sweetness reassures you, and you pop the candy into your mouth.<br>
        You bite down on the candy, and the stimulating spiciness makes your tongue tingle, as if the spicy and sweet flavours in your mouth are fighting.<br>
        Your face turns red, your eyes fill with tears, and your tongue unconsciously sticks out trying to cool it.`,

        `“糖果和辣味结合在一起会迸发出怎样激烈的火花呢？”包装袋上写着这样的介绍。<br>
        你小心翼翼地咬了一口糖果的尖端，淡淡的辣味和适度的甜味令你安心，你将糖果放入嘴里。<br>
        你咬下糖果，刺激的辣味令你舌根发麻，嘴中的辣味和甜味仿佛打架一般。<br>
        你满脸通红，眼中盈满了泪水，舌头不自觉地伸出来想要冷却。`
    ],

    gachacandy_pink: [
        `The peach flavoured candy in the shape of a love heart falls flat against some candies, but is a reassuring taste.<br>
        You pop the candy straight into your mouth and take a bite, the refreshing peach flavour exploding in your mouth as you squint contentedly.`,

        `爱心形状的桃子味糖果在某些糖果的衬托下显得平平无奇，不过，是令人安心的口味。<br>
        你直接将糖果塞入嘴里，一口咬下去，清爽的桃子味在口中炸开，你满足地眯起眼睛。`
    ],

    gachacandy_purple: [
        `You feel reassured by the "grape flavoured candy" on the bag, a favourite among children.<br>
        The candy is very chewy, so you try hard to chew it with a puckered face.<br>
        When you bite into the candy, some grape-sweet juice flows out, which makes you feel good.`,

        `包装袋上的“葡萄味糖果”令你感到安心，是孩子们最爱的口味。<br>
        糖果十分有嚼劲，你鼓着脸努力地嚼嚼。<br>
        咬开糖果后，有些葡萄般清甜的汁水流了出来，令人心情愉快。`
    ],

    gachacandy_red: [
        `The words "Persimmon Flavoured Candy" are so obvious that people usually don't pay attention to the two little "mutation" words in front of them.<br>
        Of course, when they eat it in their mouths, they will regret not taking a closer look.<br>
        Whether it's the smooth and chewy texture of a soft persimmon or the dry and sweet taste of a crunchy persimmon, this candy has none of it.<br>
        Only the astringency of a tongue inching its way through a mountain.`,

        `“柿子味糖果”几个字过于明显，通常人们都不会在意前面的两个小小的“异变”二字。<br>
        当然，等他们吃进嘴里就会后悔不仔细看了。<br>
        不论是软柿黏滑且有嚼劲的口感，还是脆柿干脆香甜的口感，这块糖都没有。<br>
        只有舌头置身于山中寸步难行的涩。`
    ],

    gachacandy_yellow: [
        `The yellow octopus seems to be waving at you, but the "earwax-flavoured candy" on the bag makes the scene even more bizarre.
        When you put the candy in your mouth, the first thing you feel when the candy comes into contact with your tongue is the sour taste, followed by the smell of rotten fruit piling up and fermenting.`,

        `黄色的小章鱼似乎在向你招手，然而包装袋上的“耳屎味糖果”让这一幕变得诡异了起来。
        你将糖果放进嘴里，当糖果和舌头接触的那刻先感受到的是酸味，之后便是腐烂的水果堆在一起发酵的味道。`
    ],
}


Object.defineProperties(window, {
	equipText: { get: ()=>equipText },
	itemMsg: { get: ()=>itemMsg },
})
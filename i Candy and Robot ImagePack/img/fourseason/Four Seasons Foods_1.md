const iFoods = [
{
    tags:["seasonal", "summer", "food", "vegi"]

    id:"MintJelly"
    name:["Mint jelly", "薄荷果冻"]
    plural:"Mint jellies"

    info: [
    "The fragrant mint aroma goes straight to your heart, and the mint leaves wiggle to say hello.",
    "芬芳的薄荷香气直冲心脾，薄荷叶摇晃着和你打招呼。",
    ],

    price: 1,
    num: 1,
    siz: ,
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.MintJelly
},
{
    tags:["seasonal", "summer", "drink"]

    id:"MintLemonade"
    name:["Mint lemonade", "薄荷柠檬饮"]
    plural:"Mint lemonade"

    info: [
    "Refreshing and invigorating, the aroma of mint leaves perfectly blends with the unique tartness of lemon. It brings a touch of coolness to the summer days.",
    "清新爽口，薄荷叶的香气与柠檬独特的酸涩风味完美融合。夏日里带来一丝清凉。",
    ],

    price: 1,
    num: 1,
    siz: ,
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.MintLemonade
},
{
    tags:["seasonal", "summer", "drink"]

    id:"PineappleIce"
    name:["Pineapple ice", "菠萝冰"]
    plural:"Pineapple ice"

    info: [
    "The shape is unique, and the ice cubes suspended in the pineapple sparkle with a crystal-clear luster in the sunlight. They may feel a bit prickly to the touch.",
    "造型奇特，悬浮在菠萝中的冰块在阳光下闪着晶莹的光泽。菠萝杯摸起来可能有些扎手。",
    ],

    price: 1,
    num: 1,
    siz: ,
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.PineappleIce
},
{
    tags:["seasonal", "summer", "drink"]

    id:"WatermelonIce"
    name:["Watermelon ice", "西瓜冰"]
    plural:"Watermelon ice"

    info: [
    "The vibrant red flesh of the watermelon is clearly visible, and droplets on the cup's rim glisten in the sunlight. Refreshing and cooling, how about a cup to beat the summer heat?",
    "红艳的西瓜肉清晰可见，杯壁的水珠在阳光下闪闪发亮。清凉解暑，不来一杯吗？",
    ],

    price: 1,
    num: 1,
    siz: ,
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.WatermelonIce
},

{
    tags:["seasonal", "spring", "food", "vegi"]

    id:"BasicFoodSet"
    name:["Basic food set", "基本组合"]
    plural:"Basic food sets"

    info: [
    "A serving of rice bowl, a bowl of miso soup, and a cup of tea. Rich in aroma, abundant in ingredients, simple yet delicious. After finishing, remember to return the plates to the owner.",
    "一份盖饭，一碗味增汤，一杯茶。香气浓郁，食材丰富，简单而美味。吃完记得把盘子还给老板。",
    ],

    price: 1,
    num: 1,
    siz: ,
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.BasicFoodSet
},
{
    tags:["seasonal", "winter", "food", "meat"]

    id:"LambChop"
    name:["Lamb chop", "小羊排"]
    plural:"Lamb chops"

    info: [
    "Refreshing and invigorating, the aroma of mint leaves perfectly blends with the unique tartness of lemon. It brings a touch of coolness to the summer days.",
    "小羊排散发着碳烤与溶化脂肪的香气。表面烤至金黄酥脆。每一块都均匀撒上了迷迭香与百里香，令人垂涎欲滴。",
    ],

    price: 1,
    num: 1,
    siz: ,
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.LambChop
},
]

itemMsg = {
    MintJelly: [

        `You pinch the decorated mint leaf and gently set it aside. A gust of wind sweeps it away, leaving the air infused with a subtle hint of mint.<br>
        You take a bite of half the jelly; the cool and transparent fragrance of mint rushes out from the moist and slightly sweet jelly, instantly invigorating your senses.<br>
        The jelly is tender and springy, sliding smoothly down your throat. It captures the memories of summer, leaving a deep imprint in your mind.<br>
        You feel as if you've returned to childhood.`

        `你捏住装饰薄荷叶，轻轻放到一边。一阵风卷走了它，空气染上了似有若无的薄荷芬芳。<br>
        你一口咬下半个果冻，清凉通透的薄荷香气从盈润微甜的果冻中直冲而出，让人不禁精神一振。<br>
        果冻水润弹牙，直顺喉咙而下。留住夏日的记忆，深深刻印在脑海中。<br>
        你仿佛回到了童年。`

        ],

    MintLemonade: [

        `You took a sip through the straw, and the fragrance of mint took the lead, sweeping away the heat and stuffiness.<br>
        In the middle notes, a symphony composed of crushed mint leaves and freshly steeped lemon unfolds. The sweet aroma of the fruits permeates your nostrils.<br>
        Unconsciously, the sound of the straw sucking up the last drops of liquid echoes in the cup.<br>
        You savor the aftertaste in your mouth, feeling content in the scorching summer days.`

        `你含住吸管啜了一口，薄荷的香气先声夺人，卷走了酷热与烦闷。<br>
        中调是揉碎的薄荷叶与泡得时间刚刚好的新鲜柠檬合成的协奏曲。水果的甘美气息浸润鼻腔。<br>
        不知不觉间，杯中传来吸管喝空液体的嘶嘶声。<br>
        你体会着口中的回甘，在炎炎夏日中倍感惬意。`

    ],

    PineappleIce: [

        `You take a bite of the dango and taste an elegant rice fragrance and a soft and chewy texture, with a hint of sweetness. <br>
        The pink one has a light sakura fragrance, while the white one enhances the aroma of rice.And The green one has a scent mugwort. <br>
        Chew silently, causing your soul to feel pure and tranquil.`

        `你捧起菠萝杯，如预想中那样，有些扎手。<br>
        含有果汁的冰块在口中释放，在舌尖舞动。菠萝的香气随之弥漫开来，<br>
        不经意间，冰块的形状在口中变化，增添了一份趣味。<br>
        你咬碎冰块，咔嚓一声。烦恼和疲惫随着冰爽咽进肚中，消散而去。`

    ],

    WatermelonIce: [

        `You peel open the leaf and take a bite, tasting the mild and fragrant aroma of rice and the chewy glutinous rice skin, followed by the sweet and rich red bean paste filling. <br>
        After enjoying the sticky and soft sweetness, take another bite combine salted cherry leaves and instantly fill your mouth with the fragrance and cherry blossoms, bringing a tangy, sweet, and salty flavor. <br>
        You just ate the whole sakuramochi , feeling completely enveloped in the scent of cherry blossoms and spring.`

        `西瓜的甜蜜在唇齿间蔓延。水珠沿着杯壁滑落，交织成一幅颇为后现代主义的画作。<br>
        你细细咀嚼着西瓜，仿佛在品味夏日的清新和甜美。 <br>
        不知不觉间，杯中传来吸管喝空液体的嘶嘶声。<br>
        你放下杯子，甩了甩手上的水。`

    ],

    

    BasicFoodSet: [        
        `You gently stir the white rice with chopsticks, releasing a subtle fragrance of rice. The texture is full and tender, creating a harmonious blend with the side dishes.<br>
        The clear soup exudes the aroma of miso. As you consume the soft tofu and chew on the resilient seaweed, the broth reveals its richness, complemented by the freshness and deliciousness of the ingredients.<br>
        You leisurely lift the teacup, bringing it close to your lips to delicately sniff the sweet tea aroma. With a sip, the tea provides a refreshing relief from the meal's richness.<br>
        After finishing the meal, you tidy up the utensils and return them to the owner.`


        `你用筷子轻轻拌动白米，米香淡淡。口感饱满而软糯。米饭与配菜相得益彰。<br>
        清汤溢着味增的香气，吃下软嫩的豆腐，嚼碎艮韧的海带。汤汁醇厚，食材新鲜而美味。<br>
        你悠然端起茶杯，凑近杯口，轻嗅着甘甜的茶香。饮下一口，清爽解腻。<br> 
        餐毕，你收拾好餐具，还给老板。`
    ],

    LambChop: [        
        `You gently tear with a fork, and the meat strands separate from the bones. The charcoal-grilled surface emanates a subtle charred fragrance, and the fat has melted during the grilling process, making the lamb chops rich and juicy. The aroma of rosemary and thyme mingles with the meat fragrance, rising like clouds.<br>
        As you place the torn lamb pieces into your mouth, a crisp golden crust breaks with a satisfying sound, and the intense charcoal-grilled aroma hits you. The meticulous charcoal grilling ensures the meat maintains its optimal texture, leaving you intoxicated with each bite.<br>
        One piece after another. You eat with thorough enjoyment, and a sense of satisfaction spreads throughout your body. The lamb chops completely fill your hungry stomach, making the harsh winter winds seem more bearable.<br>

        `

        `你拿用叉子轻轻一撕，肉丝从骨头上脱离，碳烤的外表散发着微微焦香，而脂肪在烤制过程中已经溶化，羊排浓郁多汁。迷迭香与百里香的香气混着肉香如云般升腾。
        将撕下的羊肉块送入口中，咔嚓一声咬开金黄的脆壳，浓郁的炭烤香气扑面而来。精巧的烤制让肉保持在最佳口感，令人陶醉其中。
        一块又一块。你吃得干干净净，满足感在身上蔓延，小羊排彻底填满了你饥饿的肚腹。冬季的寒风似乎也没那么难熬了。
        `
    ],

}

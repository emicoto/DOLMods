const iFoods = [
{
    tags:["seasonal", "winter", "drink"]

    id:"MulledWine"
    name:["Mulled Wine", "热红酒"]
    plural:"Mulled Wine"

    info: [
    "Hot mulled wine, including red wine, cinnamon, citrus, apple, and cherry.",
    "热腾腾的热红酒，加入了葡萄酒、肉桂、柑橘、苹果和樱桃",
    ],

    price: 1,
    num: 1,
    siz: ,
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.MulledWine
}
{
    tags:["seasonal", "Spring", "food", "meat"]

    id:"SpringBoxedMeal"
    name:["Spring boxed meal", "春季便当"]
    plural:"Spring boxed meal"

    info: [
    "Filled with the deliciousness of spring, it includes Mentaiko Chirashi-Sushi, fried shrimp, and potato mash salad served with tomatoes.",
    "满含春天的美味，内含了明太子散寿司、炸虾和马铃薯泥生菜沙拉佐番茄。",
    ],

    price: 1,
    num: 1,
    siz: ,
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.SpringBoxedMeal
},
{
    tags:["seasonal", "Spring", "food", "vegi"]

    id:"HanamiDango"
    name:["Hanami dango", "花见糰子"]
    plural:"Hanami dango"

    info: [
    "String together three colored dango, it would be even better if we could enjoy them under the cherry blossom tree.",
    "有三种颜色的糰子串成，要是能在樱花树下享用就更好了",
    ],

    price: 1,
    num: 1,
    siz: ,
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.HanamiDango
},
{
    tags:["seasonal", "Spring", "food", "vegi"]

    id:"Sakuramochi"
    name:["Sakuramochi", "樱饼"]
    plural:"Sakuramochi"

    info: [
    "The glutinous rice outer skin is dyed a In a transparent glass bottle is a pale pink liquor brewed with green apple and cherry blossom pink by cherry blossom petals is filled with sweet red bean paste and wrapped in salted cherry blossom leaves, creating this cute and spring-like dessert.",
    "被花瓣染成嫩粉色的糯米外皮包著甜蜜的红豆沙馅料、再由盐渍的樱花叶包裹，就完成了这个可爱又充满春天气息的点心",
    ],

    price: 1,
    num: 1,
    siz: ,
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.Sakuramochi
},
{
    tags:["seasonal", "Spring", "drink"]

    id:"SakuraWineWithBox"
    name:["Sakura wine", "盒装樱花酒"]
    plural:"Sakura Wine"

    info: [
    "In a glass bottle is a trans pink liquor brewed with green apple and cherry blossom as its base,  with a whole cherry blossom and gold leaf inside ! It looks very dreamy.",
    "透明的玻璃瓶里是淡粉色、以青苹果和樱花为基底酿造的酒液，里面有整朵樱花和金箔！看上去非常梦幻。",
    ],

    price: 1,
    num: 1,
    siz: ,
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.SakuraWineWithBox
},

{
    tags:["seasonal", "Spring", "drink"]

    id:"BulkSakuraWine"
    name:["bulkSakuraWine", "散装樱花酒"]
    plural:"bulkSakuraWine"

    info: [
    "In a glass bottle is a trans pink liquor brewed with green apple and cherry blossom as its base,  with a whole cherry blossom and gold leaf inside ! It looks very dreamy.　But selling it so cheap... seems suspicious.",
    "透明的玻璃瓶里是淡粉色、以青苹果和樱花为基底酿造的酒液，里面有整朵樱花和金箔！看上去非常梦幻。但是卖得这么便宜…有些可疑",
    ],

    price: 1,
    num: 1,
    siz: ,
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.BulkSakuraWine
},

]








itemMsg = {
    MulledWine: [

        `You savor this cup of mulled wine carefully, as it seems to have been infused with some obscure ingredients as flavorings. <br>
        However, this has made the taste of this red wine more rich and layered. <br>
        The sweet and rich fruit aroma blends harmoniously with a hint of sourness and a lingering wine-like flavor between the lips and teeth, <br>
        smoothly sliding down the throat and creating a warm sensation. <br>
        Even more delightful is the introduction of a light mist-like, semi-transparent solid that offers a completely new texture.<br>
        Perhaps you can ask the bartender what this is. You chew on the soft, translucent solid and think about it. <br>
        You feel a surge of heat throughout your body.`


        `你细细品尝着这杯热红酒，里面似乎加入了一些你不甚明晰的材料作为调味品。但这让这杯红酒的口感层次变得更加丰富了。 <br>
        香甜丰润的果香和微微的酸涩后调与唇齿间回味的酒香巧妙地融合，顺著食道滑入胃里、升腾起一阵暖意。 <br>
        更妙的是还有轻雾状的半透明固体带来了全新的食感。 <br>
        也许你可以去问问调酒师这是什么。你咀嚼着弹软的半透明固体，这样想到。 <br>
        你感到浑身热了起来。`

        ]

    SpringBoxedMeal: [

        `You first put the chirashi-sushi into your mouth, the rice dyed a tender pink color by mentaiko brings a slight spiciness, then come the flavorful eggy taste of kinshi Tamago. <br>
        Afterwards, you chewed on the dense, delicate tuna puree, combined with seaweed to create a fresh seafood flavor. <br>
        Then bite into a crispy deep-fried shrimp and The succulent and firm shrimp meat and crispy batter fill the entire mouth. <br>
        Finally, put the mashed potatoes salad in your mouth and the freshness of spring vegetables removes all the fishy smell and greasiness. <br>
        Unconsciously, you have finished the entire meal box. You feel very satisfied.`

        `你先将散寿司放入口中、被明太子染成嫩粉色的饭入口先带来微微地辣，然后是充满蛋香的蛋丝， <br>
        之后咀嚼到了绵密细腻的鲔鱼肉泥，和海苔组合成了新鲜的海味。 <br>
        再咬一口炸虾、咔滋一声，鲜甜紧实的虾肉和酥脆的面衣充盈著整个口腔。 <br>
        最后再将马铃薯泥沙拉放入口中，春天野菜的清新扫去所有腥味与油腻。 <br>
        不知不觉间，你已经将整份餐盒吃完。你感到十分满足。`

    ],

    HanamiDango: [

        `You take a bite of the dango and taste an elegant rice fragrance and a soft and chewy texture, with a hint of sweetness. <br>
        The pink one has a light sakura fragrance, while the white one enhances the aroma of rice.And The green one has a scent mugwort. <br>
        Chew silently, causing your soul to feel pure and tranquil.`

        `你咬了一口糰子、尝到淡雅的米香和软糯弹牙的口感，带著些许的甜味。 <br>
        粉色的有淡淡的樱花香、而白色的糰子则让米的香气更加鲜明，绿色的糰子则有著艾草的香味。 <br>
        静静地咀嚼，让你感到心灵都澄净安宁了。`

    ],

    Sakuramochi: [

        `You peel open the leaf and take a bite, tasting the mild and fragrant aroma of rice and the chewy glutinous rice skin, followed by the sweet and rich red bean paste filling. <br>
        After enjoying the sticky and soft sweetness, take another bite combine salted cherry leaves and instantly fill your mouth with the fragrance and cherry blossoms, bringing a tangy, sweet, and salty flavor. <br>
        You just ate the whole sakuramochi , feeling completely enveloped in the scent of cherry blossoms and spring.`

        `你先剥开叶子咬上一口，尝到清淡柔和的米香和Q弹的的糯米外皮、接著是甜蜜浓厚的红豆沙馅， <br>
        充分享受黏呼呼又软绵绵地香甜后，再咬上一口盐渍的樱叶、樱花的香味瞬间充满了你的口腔，同时带来酸酸甜甜又鹹鹹的滋味。 <br>
        你就这样吃光了整个樱饼，感到整个人被包裹在樱花与春天的气息里 `

    ],
    SakuraWineWithBox: [
        `After you open the box, take out bottle of wine. <br>
        You shake the bottle and admire the blooming cherry blossom from different angles, and then open the bottle cap.<br>
        The sour-sweet fragrance of green apples and the faint aroma of cherry blossoms suddenly wafted out, you took a sip.<br>
        The alcohol content of the liquor is not high, but it effortlessly slides down the throat, <br>
        leaving a refreshing and sweet taste as well as the aroma of cherry blossoms on the lips and teeth. <br>
        With such fine wine accompanying, it doesn''t matter whether there is a view to enjoy. <br>
        You have found solace in this terrible world. `

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
        What seems off to you doesn''t really matter, this wine is so good...`


        `你摇晃著瓶子，换角度欣赏了一会瓶子内盛开的樱花，之后打开瓶盖。 <br>
        青苹果的酸甜清香和微微樱花的芬芳顿时飘了出来、你饮上一口， <br>
        酒精含量并不高的酒液轻松地滑入喉咙，清甜爽口的味道和樱花的香味却还在唇齿间。 <br> 
        一股热流从你的下腹上窜、你瞬间感到轻飘飘地，腿好像成了软成了面条、头却重的像石头。 <br> 
        眯著眼看去所有的景物都在扭动、满是绚丽的光彩。 <br> 
        你感到有什么事好像不太对劲，但是有什么关系呢？这酒可真好喝…`
    ],
}

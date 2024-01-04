const iFoods = [
{
    tags:["seasonal", "spring", "food", "vegi"]

    id:"HanamiDango"
    name:["Hanami dango", "花見糰子"]
    plural:"Hanami dango"

    info: [
    "String together three colored dango, it would be even better if we could enjoy them under the cherry blossom tree.",
    "有三種顏色的糰子串成，要是能在櫻花樹下享用就更好了",
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
    tags:["seasonal", "spring", "food", "vegi"]

    id:"Sakuramochi"
    name:["Sakuramochi", "櫻餅"]
    plural:"Sakuramochi"

    info: [
    "The glutinous rice outer skin is dyed a In a transparent glass bottle is a pale pink liquor brewed with green apple and cherry blossom pink by cherry blossom petals is filled with sweet red bean paste and wrapped in salted cherry blossom leaves, creating this cute and spring-like dessert.",
    "被花瓣染成嫩粉色的糯米外皮包著甜蜜的紅豆沙餡料、再由鹽漬的櫻花葉包裹，就完成了這個可愛又充滿春天氣息的點心",
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
    tags:["seasonal", "summer", "food", "meat"]

    id:"ColdRamen"
    name:["Cold Ramen", "中華冷麵"]
    plural:"Cold Ramen"

    info: [
    "Loaded with cold noodles, topped with cucumber, tomato, soft-boiled egg, ham, and shrimp.
    Just looking at it will make you feel refreshing.",
    "用透明壓克力盒裝載滿滿地冷麵、上面有小黃瓜、番茄、溏心蛋、火腿和蝦仁，光是看著就能感到涼爽。",
    ],

    price: 1,
    num: 1,
    siz: ,
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.ColdRamen
},

{
    tags:["seasonal", "autumn", "food", "vegi"]

    id:"MontBlancCake"
    name:["Mont Blanc Cake", "栗子蒙布朗"]
    plural:"Mont Blanc Cake"

    info: [
    "On the light and airy meringue cookies, spread rum raisins, topped with a generous layer of chestnut puree, and finally drizzled with whipped cream and powdered sugar – this is the dessert that evokes images of autumn mountains!",
    "在酥鬆輕盈的蛋白霜餅乾上舖著酒釀葡萄、覆蓋滿滿的栗子泥，最後淋上生奶油與糖粉、就是這份讓人聯想到秋日山峰的甜品了！",
    ],

    price: 1,
    num: 1,
    siz: ,
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.AutumnBoxedMeal
},


{
    tags:["seasonal", "winter", "food", "meat"]

    id:"PorkPie"
    name:["Pork pie", "豬肉派"]
    plural:"Pork pie"

    info: [
    "Inside the luxurious lacquer box are a variety of autumn specialties, including rice soaked in eel sauce, tender grilled eel, sliced matsutake mushrooms, and fresh salmon arranged like vibrant flowers. Enjoy to your heart's content!",
    "英式的傳統豬肉派，簡單但精緻美觀的金黃色酥皮包裹著鮮美的肉餡和充滿膠質的肉凍、散發著淡淡的肉香。",
    ],

    price: 1,
    num: 1,
    siz: ,
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.Porkpie
},

{
    tags:["seasonal", "winter", "food", "vegi"]

    id:"MincePie"
    name:["Mince pie", "聖誕百果派"]
    plural:"Mince pie"

    info: [
    "Traditional Christmas petits fours, flaky pie crust filled with a rich filling.
    It has a rich aroma of brandy, fruit, cloves, and cinnamon, creating a warm and fragrant scent.",
    "傳統的聖誕小點心，酥鬆的派底填上豐富的餡料。聞起來有濃郁的白蘭地酒香與酸甜果香、和丁香與肉桂的香氣組成了讓人溫暖起來的芬芳。",
    ],

    price: 1,
    num: 1,
    siz: ,
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.MincePie
},

{
    tags:["seasonal", "winter", "drink"]

    id:"MulledWine"
    name:["Mulled Wine", "熱紅酒"]
    plural:"Mulled Wine"

    info: [
    "Hot mulled wine, including red wine, cinnamon, citrus, apple, and cherry.",
    "熱騰騰的熱紅酒，加入了葡萄酒、肉桂、柑橘、蘋果和櫻桃",
    ],

    price: 1,
    num: 1,
    siz: ,
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.MulledWine
},

]








itemMsg = {

    ,

    HanamiDango: [

        `You take a bite of the dango and taste an elegant rice fragrance and a soft and chewy texture, with a hint of sweetness. <br>
        The pink one has a light sakura fragrance, while the white one enhances the aroma of rice.And The green one has a scent mugwort. <br>
        Chew silently, causing your soul to feel pure and tranquil.`

        `你咬了一口糰子、嘗到淡雅的米香和軟糯彈牙的口感，帶著些許的甜味。 <br>
        粉色的有淡淡的櫻花香、而白色的糰子則讓米的香氣更加鮮明，綠色的糰子則有著艾草的香味。 <br>
        靜靜地咀嚼，讓你感到心靈都澄淨安寧了。`

    ],

    Sakuramochi: [

        `You peel open the leaf and take a bite, tasting the mild and fragrant aroma of rice and the chewy glutinous rice skin, followed by the sweet and rich red bean paste filling. <br>
        After enjoying the sticky and soft sweetness, take another bite combine salted cherry leaves and instantly fill your mouth with the fragrance and cherry blossoms, bringing a tangy, sweet, and salty flavor. <br>
        You just ate the whole sakuramochi , feeling completely enveloped in the scent of cherry blossoms and spring.`

        `你先剝開葉子咬上一口，嚐到清淡柔和的米香和Q彈的的糯米外皮、接著是甜蜜濃厚的紅豆沙餡， <br>
        充分享受黏呼呼又軟綿綿地香甜後，再咬上一口鹽漬的櫻葉、櫻花的香味瞬間充滿了你的口腔，同時帶來酸酸甜甜又鹹鹹的滋味。 <br>
        你就這樣吃光了整個櫻餅，感到整個人被包裹在櫻花與春天的氣息裡 `

    ],
    ,
    

    ColdRamen: [        
        `You put the cold noodles covered in sauce into your mouth, the chilled noodles have a satisfying chewiness, the crispy and refreshing cucumber and the tangy juicy tomatoes counterbalance the mild spiciness of the sauce, making your appetite open up. <br>
        Chewing the fresh and sweet shrimp along with the fragrant shredded ham, a completely different rich and flavorful taste swept over the taste buds. <br>
        After finishing the whole plate of cold noodles, the scorching heat of summer doesn't feel as unbearable.`


        `你將沾滿了醬汁的冷麵放入口中，冰鎮過後的麵嚼勁十足、脆爽的小黃瓜和酸甜多汁的番茄抵銷了微辣的醬汁帶來的灼燒感，只讓你胃口大開。 <br>
        再伴隨鮮甜的蝦仁和香氣四溢的火腿絲一起咀嚼，和剛才截然不同的濃郁滋味席捲了味蕾。 <br>
        你吃完了整份冷麵，感覺夏天的酷熱也沒有那麼難熬了。`

    ],
    ChestnutEarlGreyCake: [
        `You cut open this cake with a warm brown tone, and the sweet fragrance of chestnuts becomes even richer. <br>
        Bite into a soft cake filled with rich and sweet chestnut paste, the fragrant aroma of Earl Grey cream and the sweetness of chestnuts intertwine in the mouth. <br>
        The finely chopped chocolate adds a crunchy texture and a hint of bittersweetness, bringing a richer and more luxurious flavor to the cake. <br>
        With the fragrance of red tea and chestnut, the slight bitterness prevents the sweet cake from becoming heavy, making it irresistible once you start eating it. <br>
        Unconsciously ate the whole cake, you can still savor the deliciousness just now. `

        `你切開這個呈現溫暖的褐色調的蛋糕，栗子的香甜更濃郁了。 <br>
        咬上一口、鬆軟的蛋糕和濃郁甜美的栗子餡融為一體，紅茶的馥郁香氣和栗子的香甜在口中交織、 <br>
        細碎的巧克力增添了一些脆脆的食感和絲絲苦甜，這為蛋糕帶來了更加豐富與奢華的風味。 <br>
        伴著紅茶與栗子的馨香、微微的苦澀完全不發膩讓你一吃就停不下來。 <br>
        不知不覺吃完了整個蛋糕，你還能回味剛才的美味。 `
    ],




Porkpie: [
        `This pie has completely cooled down, but the subtle meat aroma and roasted fragrance are still enticing, and the crust remains crispy and layered. <br>
        Biting into it lightly, the crispy and fluffy pastry, the cold and refreshing meat filling with a hint of spices, and the tender and smooth broth jelly melt and blend together in the mouth. <br>
        If paired with mulled wine, it would be the perfect meal. With a faint regret, you savor the delicious pork pie.` 

        `這份派已經完全冷卻了、但淡淡的肉香和烘烤的香氣依舊誘人，酥皮也依然是酥脆而層次分明。 <br>
        輕咬一口，酥松的派皮、冷涼的肉餡帶著香料的風味，和Q嫩的高湯凍在口內融化、交融。 <br>
        如果能配上一杯熱紅酒，那就是最棒的一餐了。你帶著淡淡的遺憾，享用著美味的豬肉派。`

    ],
MincePie: [   
        `As you take a bite, the golden and crispy pie crust melts in your mouth, bringing a rich milky flavor. <br>
        The dried fruits soaked in strong liquor constantly release delicious flavors as they are chewed, some being soft and juicy, others crispy and tasty. Together with spices such as cardamom, cinnamon, and cloves, they form a warm aroma. <br>
        The sour-sweet green apple and slightly bitter candied orange peel balance the excessive sweetness, bringing a refreshing flavor. <br>
        You feel warm all over, even your breath is sweet and warm.`

        `你一口咬下、金黃酥脆的派皮在你的嘴裡化開，帶來滿滿的奶香。 <br>
        被烈酒浸潤的豐富果乾在咀嚼間不斷地釋放美味，有的柔軟多汁、有的鬆脆可口，它們和荳蔻、肉桂、丁香等香料一起、組成了溫暖的氣息。 <br>
        酸甜的青蘋果與微澀的糖漬柑橘皮中和了過重的甜味、帶來了清爽的風味。 <br>
        你感到全身暖呼呼，連哈氣都是甜蜜而溫暖的。`

        ],
    
MulledWine: [

        `You savor this cup of mulled wine carefully, as it seems to have been infused with some obscure ingredients as flavorings. <br>
        However, this has made the taste of this red wine more rich and layered. <br>
        The sweet and rich fruit aroma blends harmoniously with a hint of sourness and a lingering wine-like flavor between the lips and teeth, <br>
        smoothly sliding down the throat and creating a warm sensation. <br>
        Even more delightful is the introduction of a light mist-like, semi-transparent solid that offers a completely new texture.<br>
        Perhaps you can ask the bartender what this is. You chew on the soft, translucent solid and think about it. <br>
        You feel a surge of heat throughout your body.`


        `你细细品尝着这杯热红酒，里面似乎加入了一些你不甚明晰的材料作为调味品。但这让这杯红酒的口感层次变得更加丰富了。 <br>
        香甜豐潤的果香和微微的酸澀後調與唇齒間回味的酒香巧妙地融合，順著食道滑入胃裡、升騰起一陣暖意。 <br>
        更妙的是還有輕霧狀的半透明固體帶來了全新的食感。 <br>
        也许你可以去问问调酒师这是什么。你咀嚼着弹软的半透明固体，这样想到。 <br>
        你感到渾身熱了起來。`

        ],

}

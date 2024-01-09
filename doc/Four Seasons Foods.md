const iFoods = [
{
    tags:["seasonal", "winter", "drink", 'alcohol'],

    id:"MulledWine",
    name:["Mulled Wine", "熱紅酒"],
    plural:"Mulled Wine",

    info: [
    "Hot mulled wine, including red wine, cinnamon, citrus, apple, and cherry.",
    "熱騰騰的熱紅酒，加入了葡萄酒、肉桂、柑橘、蘋果和櫻桃",
    ],

    price: 1,
    num: 1,
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.MulledWine
},
{
    tags:["seasonal", "Spring", "food", "meat"],

    id:"SpringBoxedMeal",
    name:["Spring boxed meal", "春季便當"],
    plural:"Spring boxed meal",

    info: [
    "Filled with the deliciousness of spring, it includes Mentaiko Chirashi-Sushi, fried shrimp, and potato mash salad served with tomatoes.",
    "滿含春天的美味，內含了明太子散壽司、炸蝦和馬鈴薯泥生菜沙拉佐番茄。",
    ],

    price: 1,
    num: 1,
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.SpringBoxedMeal
},
{
    tags:["seasonal", "Spring", "food", "sweet"],

    id:"HanamiDango",
    name:["Hanami dango", "花見糰子"],
    plural:"Hanami dango",

    info: [
    "String together three colored dango, it would be even better if we could enjoy them under the cherry blossom tree.",
    "有三種顏色的糰子串成，要是能在櫻花樹下享用就更好了",
    ],

    price: 1,
    num: 1,
    siz: 'medium',
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.HanamiDango
},
{
    tags:["seasonal", "Spring", "food", "vegi"],

    id:"Sakuramochi",
    name:["Sakuramochi", "櫻餅"],
    plural:"Sakuramochi",

    info: [
    "The glutinous rice outer skin is dyed a In a transparent glass bottle is a pale pink liquor brewed with green apple and cherry blossom pink by cherry blossom petals is filled with sweet red bean paste and wrapped in salted cherry blossom leaves, creating this cute and spring-like dessert.",
    "被花瓣染成嫩粉色的糯米外皮包著甜蜜的紅豆沙餡料、再由鹽漬的櫻花葉包裹，就完成了這個可愛又充滿春天氣息的點心",
    ],

    price: 1,
    num: 1,
    size: 'medium',
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.Sakuramochi
},
{
    tags:["seasonal", "Spring", "drink"],

    id:"SakuraWineWithBox",
    name:["Sakura wine", "盒裝櫻花酒"],
    plural:"Sakura Wine",

    info: [
    "In a glass bottle is a trans pink liquor brewed with green apple and cherry blossom as its base,  with a whole cherry blossom and gold leaf inside ! It looks very dreamy.",
    "透明的玻璃瓶裡是淡粉色、以青蘋果和櫻花為基底釀造的酒液，裡面有整朵櫻花和金箔！看上去非常夢幻。",
    ],

    price: 1,
    num: 1,
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.SakuraWineWithBox
},

{
    tags:["seasonal", "Spring", "drink"],

    id:"BulkSakuraWine",
    name:["bulkSakuraWine", "散裝櫻花酒"],
    plural:"bulkSakuraWine",

    info: [
    "In a glass bottle is a trans pink liquor brewed with green apple and cherry blossom as its base,  with a whole cherry blossom and gold leaf inside ! It looks very dreamy.　But selling it so cheap... seems suspicious.",
    "透明的玻璃瓶裡是淡粉色、以青蘋果和櫻花為基底釀造的酒液，裡面有整朵櫻花和金箔！看上去非常夢幻。但是賣得這麼便宜…有些可疑",
    ],

    price: 1,
    num: 1,
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.BulkSakuraWine
},

{
    tags:["seasonal", "summer", "food", "meat"],

    id:"ColdRamen",
    name:["Cold Ramen", "中華冷麵"],
    plural:"Cold Ramen",

    info: [
    "Loaded with cold noodles, topped with cucumber, tomato, soft-boiled egg, ham, and shrimp. Just looking at it will make you feel refreshing.",
    "用透明壓克力盒裝載滿滿地冷麵、上面有小黃瓜、番茄、溏心蛋、火腿和蝦仁，光是看著就能感到涼爽。",
    ],

    price: 1,
    num: 1,
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.ColdRamen
},

{
    tags:["seasonal", "autumn", "food", "meat"],

    id:"AutumnBoxedMeal",
    name:["Autumn Boxed Meal", "秋季便當"],
    plural:"Autumn Boxed Meal",

    info: [
    "Inside the luxurious lacquer box are a variety of autumn specialties, including rice soaked in eel sauce, tender grilled eel, sliced matsutake mushrooms, and fresh salmon arranged like vibrant flowers. Enjoy to your heart's content!",
    "豪華的漆器盒子裡面裝載著滿滿的秋日特產，吸飽了蒲燒醬汁的米飯、肥嫩的蒲燒鰻、切成片的松茸，還有擺放成鮮豔花朵的當季新鮮鮭魚，請盡情享用 ！",
    ],

    price: 1,
    num: 1,
    effects: [
    ["hunger" , 1],
    ],

    msg:itemMsg.AutumnBoxedMeal
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
        香甜豐潤的果香和微微的酸澀後調與唇齒間回味的酒香巧妙地融合，順著食道滑入胃裡、升騰起一陣暖意。 <br>
        更妙的是還有輕霧狀的半透明固體帶來了全新的食感。 <br>
        也许你可以去问问调酒师这是什么。你咀嚼着弹软的半透明固体，这样想到。 <br>
        你感到渾身熱了起來。`

        ],

    SpringBoxedMeal: [

        `You first put the chirashi-sushi into your mouth, the rice dyed a tender pink color by mentaiko brings a slight spiciness, then come the flavorful eggy taste of kinshi Tamago. <br>
        Afterwards, you chewed on the dense, delicate tuna puree, combined with seaweed to create a fresh seafood flavor. <br>
        Then bite into a crispy deep-fried shrimp and The succulent and firm shrimp meat and crispy batter fill the entire mouth. <br>
        Finally, put the mashed potatoes salad in your mouth and the freshness of spring vegetables removes all the fishy smell and greasiness. <br>
        Unconsciously, you have finished the entire meal box. You feel very satisfied.`

        `你先將散壽司放入口中、被明太子染成嫩粉色的飯入口先帶來微微地辣，然後是充滿蛋香的蛋絲， <br>
        之後咀嚼到了綿密細膩的鮪魚肉泥，和海苔組合成了新鮮的海味。 <br>
        再咬一口炸蝦、咔滋一聲，鮮甜緊實的蝦肉和酥脆的麵衣充盈著整個口腔。 <br>
        最後再將馬鈴薯泥沙拉放入口中，春天野菜的清新掃去所有腥味與油膩。 <br>
        不知不覺間，你已經將整份餐盒吃完。你感到十分滿足。`

    ],

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
    SakuraWineWithBox: [
        `After you open the box, take out bottle of wine. <br>
        You shake the bottle and admire the blooming cherry blossom from different angles, and then open the bottle cap.<br>
        The sour-sweet fragrance of green apples and the faint aroma of cherry blossoms suddenly wafted out, you took a sip.<br>
        The alcohol content of the liquor is not high, but it effortlessly slides down the throat, <br>
        leaving a refreshing and sweet taste as well as the aroma of cherry blossoms on the lips and teeth. <br>
        With such fine wine accompanying, it doesn't matter whether there is a view to enjoy. <br>
        You have found solace in this terrible world. `

        `你打開盒子後、將瓶子拿了出來。 <br>
        你搖晃著瓶子，換角度欣賞了一會瓶子內盛開的櫻花，之後打開瓶蓋。 <br>
        青蘋果的酸甜清香和微微櫻花的芬芳頓時飄了出來、你飲上一口， <br>
        酒精含量並不高的酒液輕鬆地滑入喉嚨，清甜爽口的味道和櫻花的香味卻還在唇齒間。 <br>
        有這樣的美酒相伴，好像有沒有景色可賞都無所謂了。 <br>
        你感受到了在這糟糕世界裡的小小幸福。`

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
        What seems off to you doesn't really matter, this wine is so good...`


        `你搖晃著瓶子，換角度欣賞了一會瓶子內盛開的櫻花，之後打開瓶蓋。 <br>
        青蘋果的酸甜清香和微微櫻花的芬芳頓時飄了出來、你飲上一口， <br>
        酒精含量並不高的酒液輕鬆地滑入喉嚨，清甜爽口的味道和櫻花的香味卻還在唇齒間。 <br> 
        一股熱流從你的下腹上竄、你瞬間感到輕飄飄地，腿好像成了軟成了麵條、頭卻重的像石頭。 <br> 
        瞇著眼看去所有的景物都在扭動、滿是絢麗的光彩。 <br> 
        你感到有什麼事好像不太對勁，但是有什麼關係呢？這酒可真好喝…`
    ],

    ColdRamen: [        
        `You put the cold noodles covered in sauce into your mouth, the chilled noodles have a satisfying chewiness, the crispy and refreshing cucumber and the tangy juicy tomatoes counterbalance the mild spiciness of the sauce, making your appetite open up. <br>
        Chewing the fresh and sweet shrimp along with the fragrant shredded ham, a completely different rich and flavorful taste swept over the taste buds. <br>
        After finishing the whole plate of cold noodles, the scorching heat of summer doesn't feel as unbearable. <br>
        `


        `你將沾滿了醬汁的冷麵放入口中，冰鎮過後的麵嚼勁十足、脆爽的小黃瓜和酸甜多汁番茄抵銷了微辣的醬汁帶來的灼燒感，只讓你胃口大開。
        再伴隨鮮甜的蝦仁和香氣四溢的火腿絲一起咀嚼，和剛才截然不同的濃郁滋味席捲了味蕾。
        你吃完了整份冷麵，感覺夏天的酷熱也沒有那麼難熬了。
        `

    ],

 AutumnBoxedMeal: [        
        `
        `


        `
        `

    ],

}

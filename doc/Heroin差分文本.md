【Heroin 初步】
你还还没来得及反应，周围的风声便停止了。一双手温和得如锅子上滴下的冷凝水般托起了你。
    if pc.athletics_grade.equal(S)
        你宛若芭蕾舞者，熟练地摆出了阿拉贝斯克。
    else if pc.athletics_grade.equal(A)
        你跳起了梦中学会的喵喵舞。
    else if pc.athletics_grade.equal(B)
        你闪了个趔趄，勉强稳住身形。
    else
        你摔倒在地。
你眯起眼睛。喧嚣声冻成了寒冬腊月湖顶的冰。一个身影打碎湖面，跃入冰排的间隙，在其中畅游，宛若湖底的游鱼，又如风中的追龙。烟雾般弥漫开的温暖的愉悦感搂住了你。你暖和起来。|--压力|--创伤|---自控
=======================================================================

【Heroin 察觉】
熟悉的困倦感袭来。你失去头颅、断掉四肢、屏蔽五感。钻回到温暖黑暗的子宫中。妈妈来了。
    if pc.awareness == 6
        “这就是海洛因。”你听见了双重神明的声音。是你吗？你在看着我。|++压力|+创伤|--自控
    else if pc.awareness >= 4
        空气中飞舞弥漫的白色神明。降临了。降临了。嘿，你来了。|+压力|+创伤|--自控
    else if pc.awareness >= 2
        你划起一根火柴。火光中没有妈妈的身影，只有药物。|+压力|--自控
    else
        温暖的太阳灯。温暖的壁炉。非常非常温暖。你很幸福。|-压力|+自控

=======================================================================

【Heroin 沦陷前兆】
肝脏代替了心脏的跳动，高浓度的欢愉泵送全身。一氧化碳与纯氧交错而来。双臂竹蜻蜓般三百六十度旋转，带着头颅飞上高空。
    switch(pc的主要恋人 primary love interest)
        case "罗宾": 你突然看见罗宾在孤儿院的床上抱着游戏机昏睡。
        case "惠特尼": 你突然看见惠特尼把头埋在纸袋里，来缓解过呼吸。
        case "伊甸": 你突然看见伊甸昏倒在笼子里。
        case "凯拉尔": 你突然看见凯拉尔拿着叉子怒气冲冲朝你走来。
        case "艾弗里": 你突然看见艾弗里坐在餐桌旁，对着一盘沙拉发抖。
        case "黑狼": 你突然看见黑狼依偎在狼群中，毛茸茸的尾巴打得地上的沙土啪啪响，把头埋得更深了些。
        case "巨鹰": 你突然看见巨鹰流着眼泪，叼着一串亮闪闪的东西回巢。
        case "艾利克斯": 你突然看见艾利克斯正站在田中央扮演稻草人。
        case "悉尼": 你突然看见悉尼的瞳孔骤然缩小，扔下手中的同心吊坠，吊坠里是你的照片。
        case "机器人": 你突然看见机器人身上掉下了几个齿轮般的零件。
        default: 你突然看见一个身影跪在地上抽搐，朝你伸出手。
你听见神明的呼唤。你看见神明的身影。救救我、救救我，石板下粉紫色的黄昏无助地呼喊。你穿越虚空，劈开混沌，撕裂黑暗。你随着火光起舞，食指触向火中的幻影。你看见粉色。你看见紫色。你看见扭曲变形的七彩波光一个接一个地破灭。归于灰色。归于灰烬。|-压力|---创伤|---自控

=======================================================================

【Heroin 上瘾后的特质文本】
你左摇右摆，泪水和汗水止不住地流下。你一直在发抖。你幻想着自己跃进火中，如飞蛾扑火。
    if pc在地上
            (随机差分1) 你看见一只长着鹿角的兔子。是蓝色的。兔子怎么会是蓝色的呢？可是那真有一只兔子。兔子跑起来了，跑了一圈，嘴里嚼着草。
            (随机差分2) 你扼住自己的咽喉。真让人恼火。你不明白自己为什么会到这种地步。你喘不上气，本能地松开了手。
            (随机差分3) 你的胃好像被一双手挤捏玩弄。一抽一抽地痛。这里装过精液吗？手问胃。胃不想回答。
    好冷。好痛。你快要吐出来了。
    else if pc在水里
            (随机差分1) 你沉没下去，沉眠于五彩斑斓的泡沫中。古董碎片扎到了你的手指，却并没有扎破。
            (随机差分2) 你与鱼群跳起水中华尔兹。正步，反步，大回旋。鱼群散去，你与自己的影子翩翩起舞。
            (随机差分3) 你发现自己戴着个玻璃头罩，罩子里是清洁的空气。你猛吸一口，肺里灌进了水。你连连呛咳。
    水冷得刺骨。
    else
        (随机差分1) “照亮丰收街的荒原的野狼王子，开始舞动的头颅才是人生的秩序。和着码头的汽笛与灯塔，喷出回收中的不可燃垃圾，这是压轴好戏。”收音机的电流声与播报声忽地出现，又戛然而止。电流窜过引出的吱嘎声让你清醒了些。
        (随机差分2) 你沉没下去，沉眠于五彩斑斓的泡沫中。纺锤扎穿了你的手指，这才让你清醒了些。
你还在往前挪，往前挪。你的意识里只剩下移动。或许还有隐身的神明。你需要它。|+++压力|+创伤|-自控
【Traits】
你打着冷颤，不时抽搐，毫无胃口。
=======================================================================
注：
(1) 阿拉贝斯克（arabesque）： 舞者一条腿立住，将另一条腿抬起，挥踢到身后，形成优美的弧线。
(2) ("love locket","同心吊坠")
(3) ("slab","石板") 神殿里的那个XD


NamedNPC.add(
    new NamedNPC(
        'Robert',
        ['robot', '机器人'],
        ['Robert', '罗伯特'],
        'robot'
    )
        .Init('m', 'adult')
        .isImportant(),

    new NamedNPC(
        'Hadley',
        ['mechanist', '机械师'],
        ['Hadley', '哈德利'],
        'human'
    )
        .setValue('insecurity', 'skill')
        .setColour('black', 'black', 'black')
        .Init('m', 'adult'),

    new NamedNPC(
        'Qing',
        ['assistant', '助手'],
        ['Qing', '晴'],
        'human'
    )
        .setValue('insecurity', 'skill')
        .setColour('ylight', 'grey', 'grey')
        .Init('m', 'adult'),

    new NamedNPC(
        'Lam',
        ['professor', '教授'],
        ['Lam', '林'],
        'human'
    )
        .setValue('insecurity', 'skill')
        .setColour('ylight', 'grey', 'grey')
        .Init('m', 'adult'),

    new NamedNPC(
        'Wei',
        ['snack keeper', '杂货店老板'],
        ['Wei', '魏'], 'human'
    )
        .setValue('insecurity', 'looks')
        .setColour('ylight', 'grey', 'white')
        .Init('f', 'adult'),


    new NamedNPC(
        'Xinyu',
        ['door keeper', '门童'],
        ['Xinyu', '心语'],
        'human'
    )
        .setValue('insecurity', 'weak')
        .setColour('ylight', 'brown', 'black')
        .Init('f', 'tean')
        .setPregnancy(),

    new NamedNPC(
        'Cheng',
        ['templer', '庙祝'],
        ['Cheng', '程'],
        'human'
    )
        .setValue('insecurity', 'worth')
        .setColour('ylight', 'grey', 'black')
        .Init('m', 'adult'),

    new NamedNPC(
        'Yue',
        ['fox lady', '狐仙'],
        ['Yue', '月'],
        'human'
    )
        .setValue('insecurity', 'skill')
        .setColour('pale', 'blue', 'softblond')
        .Init('f', 'adult')
        .isSpecial(),


    new NamedNPC(
        'Keith',
        ['drug dealer', '毒贩'],
        ['Keith', '凯思'],
        'human'
    )
        .setValue('insecurity', 'weak')
        .setColour('pale', 'brown', 'brown')
        .Init('m', 'adult')
);

const npcSetting = {
    Robert : {
        important : () => { V.iRobot.condition > 60; },
        love      : {
            displayname  : ['Devotion', '忠心'],
            activeIcon   : 'img/ui/devotion.png',
            inactiveIcon : 'img/ui/empty_devotion.png',
            maxValue     : 200
        },
        dom : {
            displayname  : ['Humanity', '人性'],
            activeIcon   : 'img/ui/humanity.png',
            inactiveIcon : 'img/ui/empty_humanity.png',
            maxValue     : 120
        },
        rage : {
            displayname  : ['Emotional', '感性'],
            activeIcon   : 'img/ui/emotional.png',
            inactiveIcon : 'img/ui/empty_emotional.png',
            maxValue     : 80
        },
        lust : {
            displayname  : ['Desire', '欲求'],
            activeIcon   : 'img/ui/desire.png',
            inactiveIcon : 'img/ui/empty_desire.png',
            maxValue     : 80
        },
        loveInterest : () => V.iRobot.condition > 80 && V.iRobot.aware > 2
    },

    Xinyu : {
        dom : {
            displayname : ['Confidence', '自信心']
        },
        rage : {
            displayname : ['Obesession', '执念']
        },
        lust : {
            displayname : ['Reversal', '逆转']
        }
    }

};

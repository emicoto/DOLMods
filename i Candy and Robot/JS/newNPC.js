$(document).one('addNameNPC:ready', ()=>{
    NamedNPC.add(
        new NamedNPC(
            'Robert', 
            ['Robort', '机器人'], 
            ['Robert', '罗伯特'], 
            'robot'
        )
        .Init('m', 'adult'),

        new NamedNPC(
            '晴', 
            ['mechanist', '机械师'], 
            ['Qing', '晴'], 
            'human'
        )
        .setValue('insecurity', 'skill')
        .setColour('ylight', 'grey', 'grey')
        .Init('m', 'adult'),

        new NamedNPC(
            '魏', 
            ['snack keeper', '杂货店老板'], 
            ['Wei', '魏'], 'human' 
        )
        .setValue('insecurity', 'looks')
        .setColour('ylight', 'grey', 'white')
        .Init('f', 'adult'),


        new NamedNPC(
            '心语', 
            ['door keeper', '门童'], 
            ['Xingyu', '心语'], 
            'human' 
        )
        .setValue('insecurity', 'weak')
        .setColour('ylight', 'brown', 'black')
        .Init('f', 'tean'),

        new NamedNPC(
            '程', 
            ['templer', '庙祝'], 
            ['Cheng', '程'], 
            'human' 
        )
        .setValue('insecurity', 'worth')
        .setColour('ylight', 'grey', 'black')
        .Init('m', 'adult'),

        new NamedNPC(
            '月', 
            ['fox lady', '狐仙'], 
            ['Yue', '月'], 
            'human'
        )
        .setValue('insecurity', 'skill')
        .setColour('pale', 'blue', 'softblond')
        .Init('f', 'adult'),


        new NamedNPC(
            '凯思', 
            ['drug dealer', '毒贩'], 
            ['Keith', '凯思'], 'human'
        )
        .setValue('insecurity', 'weak')
        .setColour('pale', 'brown', 'brown')
        .Init('m', 'adult') 
    )
})
$(document).one('languageChecked', ()=>{
    setup.addNPCList.push(
        new NamedNPC('Robert', lanSwitch('Robort', '机器人'), lanSwitch('Robert', '罗伯特'), 'robot').Init('m', 'adult'),
        new NamedNPC('晴', lanSwitch('mechanist', '机械师'), lanSwitch('Qing', '晴'), 'human' ).setValue('insecurity', 'skill').setColour('ylight', 'grey', 'grey').Init('m', 'adult'),
        new NamedNPC('魏', lanSwitch('snack keeper', '杂货店老板'), lanSwitch('Wei', '魏'), 'human' ).setValue('insecurity', 'looks').setColour('ylight', 'grey', 'white').Init('f', 'adult'),
        new NamedNPC('心语', lanSwitch('door keeper', '门童'), lanSwitch('Xingyu', '心语'), 'human' ).setValue('insecurity', 'weak').setColour('ylight', 'brown', 'black').Init('f', 'tean'),
        new NamedNPC('程', lanSwitch('templer', '庙祝'), lanSwitch('Cheng', '程'), 'human' ).setValue('insecurity', 'worth').setColour('ylight', 'grey', 'black').Init('m', 'adult'),
        new NamedNPC('月', lanSwitch('fox lady', '狐仙'), lanSwitch('Yue', '月'), 'human').setValue('insecurity', 'skill').setColour('pale', 'blue', 'softblond').Init('f', 'adult')         
    )
})
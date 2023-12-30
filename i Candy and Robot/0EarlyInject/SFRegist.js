simpleFrameworks.addto('iModInit', 'iCandyInit')
simpleFrameworks.addto('iModReady','iCandyUpdate', 'iCandyReady')
simpleFrameworks.addto('iModDone', 'iCandyDone')

simpleFrameworks.addto('ModMenuBig', 'showItemButton')
simpleFrameworks.addto('ModStatusBar', 'hungerBar')

simpleFrameworks.addto('ModCaptionDescription', 'captionPhone')
simpleFrameworks.addto('ModCaptionAfterDescription', 'captionDrugs')
simpleFrameworks.addto('ModCharaDescription', 'charadesDrugs')

simpleFrameworks.addto('ModSkillsBox', 'candySkills')

simpleFrameworks.addto('iModOptions', 'iCandyOptions')
simpleFrameworks.addto('iModCheats', 'iCandyCheats')

simpleFrameworks.addto('ModShopZone', {
    passage:'Pharmacy',
    widget:'ExtraPharmacy'
})

simpleFrameworks.addto('ExtraLinkZone', {
    passage: 'Shopping Centre',
    widget: 'daisoEntrance'
},{
    passage: 'Harvest Street',
    widget: 'almondPathEntry'
})

simpleFrameworks.addto('BeforeLinkZone', {
    passage:'Harvest Street',
    widget:'chinatownExplore'
})
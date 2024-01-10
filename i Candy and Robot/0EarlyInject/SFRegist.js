simpleFrameworks.addto('iModInit', 'iCandyInit')
simpleFrameworks.addto('iModReady','iCandyUpdate', 'iCandyReady')
simpleFrameworks.addto('iModDone', 'iCandyDone')

simpleFrameworks.addto('ModMenuBig', 'showItemsButton')
simpleFrameworks.addto('ModStatusBar', 'hungerBar', 'thirstyBar')

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
    passage:['Harvest Street', 'Mer Street'],
    widget:'chinatownExplore'
},{
    passage: 'Orphanage',
    widget:'OpenHomeStorage'
})

simpleFrameworks.addto('iModFooter', {
    passage: ['Canteen Lunch Robin', 'Canteen Lunch Robin CD 1', 'Robin Kiyoura Start', 'Canteen Lunch Kylar', 'Canteen Lunch Sydney', 'Canteen Lunch' ],
    widget: 'fillHungerSchool'
})
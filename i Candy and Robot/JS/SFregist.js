simpleFrameworks.addto('iModInit', 'iCandyInit')
simpleFrameworks.addto('iModReady','iCandyUpdate', 'iCandyReady')
simpleFrameworks.addto('iModDone', 'iCandyDone')

simpleFrameworks.addto('ModMenuBig', 'showItemButton')
simpleFrameworks.addto('ModStatusBar', 'hungerBar')

simpleFrameworks.addto('ModCaptionDescription', 'captionPhone')
simpleFrameworks.addto('ModCaptionAfterDescription', 'captionDrugs')
simpleFrameworks.addto('ModCharaDescription', 'charadesDrugs')

simpleFrameworks.addto('ModSkillsBox', 'candySkills')

simpleFrameworks.addto('iModsOptions', 'iCandyOptions')


simpleFrameworks.addto('ModShopZone', {
    passage:'Pharmacy',
    widget:'ExtraPharmacy'
})
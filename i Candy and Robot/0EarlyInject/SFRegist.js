simpleFrameworks.addto('iModInit', 'iCandyInit');
simpleFrameworks.addto('iModReady','iCandyUpdate', 'iCandyReady');
simpleFrameworks.addto('iModDone', 'iCandyDone');

simpleFrameworks.addto('ModMenuBig', 'showItemsButton');
simpleFrameworks.addto('ModStatusBar', 'iCandyStatusBar');

simpleFrameworks.addto('ModCaptionDescription', 'captionPhone');
simpleFrameworks.addto('ModCaptionAfterDescription', 'captionDrugs');
simpleFrameworks.addto('ModCharaDescription', 'charadesDrugs');

simpleFrameworks.addto('ModSkillsBox', 'candySkills');

simpleFrameworks.addto('iModOptions', 'iCandyOptions');
simpleFrameworks.addto('iModSettings', 'iCandySettings');
simpleFrameworks.addto('iModCheats', 'iCandyCheats');

simpleFrameworks.addto('ModShopZone', {
    passage : 'Pharmacy',
    widget  : 'ExtraPharmacy'
});

simpleFrameworks.addto('ExtraLinkZone', 'iCandyExtraLink');
simpleFrameworks.addto('BeforeLinkZone', 'iCandyBeforeLink');


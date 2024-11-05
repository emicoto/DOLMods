iStage.addTo(
    'passage',
    new SceneData('DrugsIntro', 'Event')
        .Trigger({ entrypassage : 'Brothel Basement' })
        .Stage('BrothelBasement')
        .Exit('Brothel Basement')
        .Phase(3)
        .Cond(
            () => iStage.getFlag('brothel', 'drugsintro') !== 1
            && V.brothel_basement_intro == 1
            && Tvar.lastPassage == 'Brothel'
        )
    ,
    new SceneData()
        .Trigger({ titlematch : /[a-zA-Z]+ Street$|Park$/ })
        .Toward('Chinatown RandomRumors')
        .Cond(
            () => iStage.getFlag('chinatown', 'intro') == undefined
            && V.location == 'town'
            && F.noEventRunning()
            && random(100) < 30
            && Time.days > 2
            && iStage.getFlag('chinatown', 'rumorstoday') < 2
        )
        .RandomBranch(4)
        .onInit(
            '<<set $tvar.scene.exit to $tvar.lastPassage>>'
        )
        .onEnd(
            `<<set $eventskip to 1>>
             <<run iStage.addFlag("chinatown", "rumors", 1); iStage.addFlag("chinatown", "rumorstoday", 1)>>`
        )
);

iStage.addTo(
    'event',
    new SceneData()
        .Series('Passout')
        .Toward('Chinatown Rescue')
        .Location('harvest', 'mer')
        .Cond(
            () => {
                let passout = iStage.getFlag('harvest', 'passout') || 0;
                passout += iStage.getFlag('mer', 'passout') || 0;

                return iStage.getFlag('chinatown', 'prologue') == undefined
                && passout  >= 3 && Time.days > 2;
            }
        )
);

//-------------------------------------------------------------
//
// Daiso Shop Event
//
//-------------------------------------------------------------
iStage.add(
    'DaisoShop',
    'Event',
    new SceneData('Intro')
        .Cond(
            () => iStage.getFlag('daiso', 'intro') !== 1
            && between(Time.hour, 9, 19)
            && !iStage.getFlag('daiso', 'thief')
        )
        .unsetAtNext()
    ,
    new SceneData('Exposed')
        .Cond(
            (lastPsg, passage) => lastPsg.title != 'BaseScene DaisoShop'
            && passage.title == 'BaseScene DaisoShop'
        )
        .Branches(
            {
                name : 'Naked',
                cond : () => V.exposed >= 2
            },
            {
                name : 'Reveal',
                cond : () => V.exposed == 1
            }
        )
        .Priority(10)
);

iStage.add(
    'DaisoShop',
    'Scene',
    new SceneData('Lock')
        .Cond(() => !between(Time.hour, 8, 19))
        .unsetAtNext()
);

//-------------------------------------------------------------
//
// Chinatown main event
//
//-------------------------------------------------------------
iStage.add(
    'Chinatown',
    'Event',
    new SceneData('Intro')
        .Exit('BaseScene Chinatown')
        .Priority(1000)
        .Phase(2)
        .onEnd(
            '<<run iStage.setFlag("chinatown", "intro", 1)>>'
        )
        .Cond(
            () => iStage.getFlag('chinatown', 'intro') == undefined
            && Tvar.lastPassage !== 'BaseScene Chinatown'
        )
);

iStage.add(
    'AlmondPath',
    'Event',
    new SceneData('Intro')
        .Phase(2)
        .Priority(1000)
        .onEnd(
            '<<run iStage.setFlag("chinatown", "intro", 1)>>'
        )
        .Exit('BaseScene AlmondPath', ['Enter the Chinatown', '进入唐人街'])
        .Cond(
            () => iStage.getFlag('chinatown', 'intro') == undefined
            && Tvar.lastPassage !== 'BaseScene AlmondPath'
        )
);


//-------------------------------------------------------------
//
// Chinatown random event
//
//-------------------------------------------------------------
iStage.add(
    'Chinatown',
    'Event',
    new SceneData('Random')
        .onInit(
            '<<set $tvar.onselect to true>><<generate1>><<person1>>'
        )
        .onEnd(
            '<<set $eventskip to 1>>'
        )
        .Cond(
            () => iCandy.config.debug == 'random'
            || Tvar.lastPassage == 'BaseScene Chinatown' && random(100) < 20
        )
        .Branches(
            {
                name : 'Vendor',
                cond : () => between(Time.hour, 6, 21)
                && iStage.getFlag('chinatown', 'vendortoday') < 3
                && Tvar.rng >= 70
            },
            {
                name     : 'Goat',
                initcode : '<<generate2>><<generate3>>',
                endcode  : '<<run delete V.tvar.debt>>',

                cond : () => between(Time.hour, 10, 18)
                && iStage.getFlag('chinatown', 'goatweek') < 2
                && Tvar.rng >= 50
            },
            {
                name : 'Beliver',
                cond : () => between(Time.hour, 9, 17)
                && iStage.getFlag('chinatown', 'belivertoday') < 3
                && Tvar.rng >= 30
            },
            {
                name : 'Kids',
                cond : () => Tvar.rng >= 10
                && (
                    groupmatch(Time.weekday, 1, 6, 7) && between(Time.hour, 12, 18) ||
                    between(Time.weekday, 2, 5) && between(Time.hour, 15, 18)
                )
            },
            {
                name : 'Janitor',
                cond : 'default'
            }
        )
);

iStage.add(
    'Chinatown',
    'Scene',
    new SceneData('StreetShow')
        .Cond(
            () => iCandy.config.debug == 'show'
            || Tvar.lastPassage == 'BaseScene Chinatown'
            && between(Time.hour, 10, 16)
            && random(100) < 30
            && iStage.getFlag('chinatown', 'showtoday') < 3
        )
);

//-------------------------------------------------------------
//
// Chara Event
//
//-------------------------------------------------------------
iStage.addChara(
    'Xinyu',
    new SceneData('Intro')
        .Location('almond_path')
        .onEndFunc(() => {
            if (iStage.getFlag('Xinyu', 'ask') >= 10) {
                iStage.setFlag('Xinyu', 'intro', 2);
            }
            else {
                iStage.setFlag('Xinyu', 'intro', 1);
            }
        })
        .Branches(
            {
                name  : 'FirstTime',
                cond  : () => iStage.getFlag('Xinyu', 'intro') == undefined,
                phase : 6
            },
            {
                name  : 'Again',
                cond  : () => iStage.getFlag('Xinyu', 'intro') == 1,
                phase : 2
            }
        )
    ,
    new SceneData('Talk')
        .Location('almond_path')
        .Cond(
            () => iStage.getFlag('Xinyu', 'intro') == 2
        )
        .Branches(
            {
                name : 'GeneralFriendly',
                cond : () => C.npc.Xinyu.love >= 40
            },
            {
                name : 'GeneralHateful',
                cond : () => C.npc.Xinyu.love < 0
            },
            {
                name : 'General',
                cond : () => C.npc.Xinyu.love >= 0
            }
        )
);

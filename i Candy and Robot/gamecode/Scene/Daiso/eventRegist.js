// iMod BaseScene DaisoShop
iEvent.registEvent('DaisoShop',
                   {
                       episode   : 'Intro',
                       type      : 'Event',
                       eventnext : true,
                       nextcode  : '<<=iEvent.unsetEvent()>>',
                       require   : () => iEvent.getFlag('daiso', 'intro') !== 1 && between(Time.hour, 9, 19) && !iEvent.getFlag('daiso', 'thief')
                   },
                   {
                       episode   : 'Lock',
                       type      : 'Scene',
                       eventnext : true,
        
                       nextcode : '<<=iEvent.unsetEvent()>>',
                       initcode : '',
                       require  : () => !between(Time.hour, 8, 19)
                   },
                   {
                       episode : 'Exposed',
                       type    : 'Event',
                       branch  : 'Naked',

                       priority : 10,

                       require : () => V.exposed >= 2 && V.tvar.lastPassage != 'BaseScene DaisoShop' && passage() == 'BaseScene DaisoShop'
                   }
);

iEvent.add(
    'DaisoShop',
    new EventData('Event', 'Intro')
        .Require(
            () => iEvent.getFlag('daiso', 'intro') !== 1
            && between(Time.hour, 9, 19)
            && !iEvent.getFlag('daiso', 'thief')
        )
        .unsetAtNext()
    ,
    new EventData('Scene', 'Lock')
        .Require(
            () => !between(Time.hour, 8, 19)
        )
        .unsetAtNext()
    ,
    new EventData('Event', 'Exposed')
        .Require(
            (lastPsg, passage) => lastPsg.title != 'BaseScene DaisoShop'
            && passage.title == 'BaseScene DaisoShop'
        )
        .Branch(
            {
                name    : 'Naked',
                require : () => V.exposed >= 2
            },
            {
                name    : 'Reveal',
                require : () => V.exposed == 1
            }
        )
        .Priority(10)
);

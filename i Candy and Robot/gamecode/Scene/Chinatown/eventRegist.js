iEvent.registEvent('Chinatown',{
    type: 'Event',
    episode: 'Intro',
    phase: 2,
    
    exit: 'BaseScene Chinatown',
    endcode: '<<run iEvent.setFlag("chinatown", "intro", 1)>>',
    priority: 1000,
    require: ()=>{ return iEvent.getFlag('chinatown', 'intro') == undefined && V.tvar.lastPassage !== 'BaseScene Chinatown' },
},
{
    type: 'Event',
    episode: 'Random_Vendor',
    eventnext: true,
    initcode: '<<set $tvar.onselect to true>><<generateRole 0 0 "vendor">><<person1>>',
    endcode: '<<set $eventskip to 1>>',
    
    require: ()=>{ return iCandy.config.debug == 'vendor' || (V.tvar.lastPassage == 'BaseScene Chinatown' && between(Time.hour, 6, 21) && V.eventskip == 0 && random(100) < 30 && iEvent.getFlag('chinatown', 'vendortoday') < 3) },
},
{
    type: 'Scene',
    episode: 'Random_Show',

    require: ()=>{ return iCandy.config.debug == 'show' || (V.tvar.lastPassage == 'BaseScene Chinatown' && between(Time.hour, 10, 16) && random(100) < 50 && iEvent.getFlag('chinatown', 'showtoday') < 3) },
},
{
    type: 'Event',
    episode: 'Random_Goat',

    require: ()=>{ return iCandy.config.debug == 'goat' || (V.tvar.lastPassage == 'BaseScene Chinatown' && between(Time.hour, 10, 18) && V.eventskip == 0 && random(100) < 20 && iEvent.getFlag('chinatown', 'goatweek') < 2) },
},
{
    type: 'Event',
    episode: 'Random_Beliver',

    require: ()=>{ return iCandy.config.debug == 'beliver' ||( V.tvar.lastPassage == 'BaseScene Chinatown' && between(Time.hour, 9, 17) && V.eventskip == 0 && random(100) < 20) },
}
)


iEvent.registEvent('AlmondPath',{
    type: 'Event',
    episode: 'Intro',
    phase: 2,

    endcode: '<<run iEvent.setFlag("chinatown", "known", 1)>>',
    priority: 1000,

    leaveLink: ['Enter the Chinatown', '进入唐人街'],
    exit: 'BaseScene Chinatown',

    require: ()=>{ return iEvent.getFlag('chinatown', 'known') == undefined && V.tvar.lastPassage !== 'BaseScene AlmondPath' },

})

iEvent.registEvent('Xinyu', {
    type: 'Chara',
    chara: 'Xinyu',

    episode: 'Talk',
    branch: 'Intro',

    phasetype: 'inframe',
    phase: 6,
    priority: 1000,

    endcode: '<<run if( iEvent.getFlag("Xinyu", "ask") >= 10) { iEvent.setFlag("Xinyu", "intro", 2) } else { iEvent.setFlag("Xinyu", "intro", 1) } >>',
    require: ()=>{ return iEvent.getFlag('Xinyu', 'intro') == undefined },
},
{
    type: 'Chara',
    chara: 'Xinyu',

    episode: 'Talk',
    branch: 'Intro Again',
    phase: 2,
    priority: 1000,

    endcode: '<<run if( iEvent.getFlag("Xinyu", "ask") >= 10) { iEvent.setFlag("Xinyu", "intro", 2) }>>',
    require: ()=>{ return iEvent.getFlag('Xinyu', 'intro') == 1 },
},

//没有require的事件不会出现在筛选队列中，只能通过setEvent来触发。
//the event without require won't go to the queue, and can only be triggered by setEvent.
{
    type: 'Chara',
    chara: 'Xinyu',

    episode: 'Talk',
    branch: 'Intro GiveUp',
    
    endcode: '<<run iEvent.setFlag("Xinyu", "intro", 1)>>',
},
{
    type: 'Chara',
    chara: 'Xinyu',

    episode: 'Talk',
    branch: 'GeneralFriendly',
    require: ()=>{ return iEvent.getFlag('Xinyu', 'intro') == 2 && C.npc['Xinyu'].love >= 40 },
},
{
    type: 'Chara',
    chara: 'Xinyu',

    episode: 'Talk',
    branch: 'GeneralHateful',
    require: ()=>{ return iEvent.getFlag('Xinyu', 'intro') == 2 && C.npc['Xinyu'].love <= -5},
},
{
    type: 'Chara',
    chara: 'Xinyu',

    episode: 'Talk',
    branch: 'General',
    require: ()=>{ iEvent.getFlag('Xinyu', 'intro') == 2 },
})

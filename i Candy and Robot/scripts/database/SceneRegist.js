
//iMod BaseScene DaisoShop
iEvent.registEvent('DaisoShop',
    { 
        episode: 'Intro',
        type: 'Event',
        eventnext: true,
        nextcode: '<<set $tvar.eventnext to false>><<endevent>>',
        require: ()=>{ return iEvent.getFlag('DaisoShop', 'intro') !== 1}
    },
    {
        episode: 'General',
        type: 'Scene',
        eventnext: false,
        nextcode: '',
        require: ()=>{ return iEvent.getFlag('DaisoShop', 'intro') === 1}
    }
)

//Brothel Basement
iEvent.registEvent('location',
    {
        passage: 'Brothel Basement',
        scene: 'Brothel Basement',
        episode: 'DrugsIntro',
        type: 'Event',
        phase: 3,
        eventnext: true,
        nextcode: '',
        require: (data)=>{ return iEvent.getFlag('Brothel', 'drugsintro') !== 1 && V.brothel_basement_intro == 1 }
    },
    /*{
        passage: 'Brothel',
        episode: 'SydneyShock',
        type:'Chara',
        chara:'Sydney',
        eventnext: false,
        nextcode: '',
        require: (data)=>{ return iEvent.getFlag('Brothel', 'sydneyshock') !== 1 && V.brothel_basement_intro == 1 && passage() == 'Brothel Basement' }
    }*/
)

iEvent.registEvent('Passout',
{
    episode: 'HungerPassout',
    type: 'Event',
    eventnext: true,
    nextcode: '<<set $tvar.eventnext to false>><<endevent>>',
    require: (data)=>{ 
        
        return V.hunger >= V.hungermax 
    }
}
)
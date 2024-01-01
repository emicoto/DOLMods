//Brothel Basement
iEvent.registEvent('location',
    {
        passage: 'Brothel Basement',
        scene: 'Brothel Basement',
        exit: 'Brothel Basement',

        episode: 'DrugsIntro',
        type: 'Event',
        phase: 3,
        eventnext: true,
        require: (data)=>{ return iEvent.getFlag('brothel', 'drugsintro') !== 1 && V.brothel_basement_intro == 1 && V.tvar.lastPassage == 'Brothel' && iEvent.getFlag('brothel', 'prostitution') >= 1 }
    },
)

iEvent.registPsg('Brothel Basement Sex', ()=>{
    iEvent.addFlag('brothel', 'prostitution', 1)
})

iEvent.registEvent('Passout', {
    type: 'Event',
    toward: 'Chinatown Rescue',

    require: ()=>{ return iEvent.getFlag('chinatown', 'prologue') == undefined && V.bus == 'harvest' && iEvent.getFlag('harvest', 'passout') >= 3 },
})

iEvent.registPsg('Harvest Street',()=>{
    if(V.stress >= V.stressmax){
        iEvent.addFlag('harvest', 'passout', 1)
    }
})
/*
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
*/
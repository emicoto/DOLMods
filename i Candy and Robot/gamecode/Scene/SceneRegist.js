
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
        require: (data)=>{ return iEvent.getFlag('Brothel', 'drugsintro') !== 1 && V.brothel_basement_intro == 1 && V.tvar.lastPassage == 'Brothel' && iEvent.getFlag('Brothel', 'prostitution') >= 1 }
    },
)

iEvent.registPsg('Brothel Basement Sex', ()=>{
    iEvent.addFlag('Brothel', 'prostitution', 1)
})


iEvent.registEvent('Location',{
    passage: 'Harvest Street',
    scene: 'Harvest Street',
    exit: 'Harvest Street',

    episode: 'ChinatownRescue',
    type: 'Event',
    require: (data)=>{ return iEvent.getFlag('Chinatown', 'prologue') === undefined && iEvent.getFlag('Harvest', 'passout') >= 3 },

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
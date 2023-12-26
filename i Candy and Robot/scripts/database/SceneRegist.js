
//iCandyMod BaseScene DaisoShop
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
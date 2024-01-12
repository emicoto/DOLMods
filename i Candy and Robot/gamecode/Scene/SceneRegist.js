// Brothel Basement
iEvent.registEvent('location',
																			{
																				entrypassage : 'Brothel Basement',
																				scene        : 'Brothel Basement',
																				exit         : 'Brothel Basement',

																				episode   : 'DrugsIntro',
																				type      : 'Event',
																				phase     : 3,
																				eventnext : true,
																				require   : data => iEvent.getFlag('brothel', 'drugsintro') !== 1 &&
            V.brothel_basement_intro == 1 && V.tvar.lastPassage == 'Brothel'
																			},
																			{
																				match : /[a-zA-Z]+ Street$|Park$/,

																				type     : 'Event',
																				toward   : 'Chinatown RandomRumors',
																				initcode : '<<set $tvar.scene.branch to random(1,4)>><<set $tvar.scene.exit to $tvar.lastPassage>>',
																				endcode  : '<<set $eventskip to 1>><<run iEvent.addFlag("chinatown", "rumors", 1); iEvent.addFlag("chinatown", "rumorstoday", 1)>>',
																				require  : data => iEvent.getFlag('chinatown', 'intro') == undefined &&
            V.location == 'town' && F.noEventRunning() && random(100) < 30 &&
            Time.days > 2 && iEvent.getFlag('chinatown', 'rumorstoday') < 2
																			}
);

iEvent.registPsg('Brothel Basement Sex', () => {
	iEvent.addFlag('brothel', 'prostitution', 1);
});

iEvent.registEvent('Passout', {
	type   : 'Event',
	toward : 'Harvest Chinatown Rescue',

	require : () => {
		let passout = iEvent.getFlag('harvest', 'passout') || 0;
		passout += iEvent.getFlag('mer', 'passout') || 0;

		return iEvent.getFlag('chinatown', 'prologue') == undefined && V.bus == 'harvest' && passout  >= 3 && Time.days > 2;
	}
});

iEvent.registPsg('Harvest Street',() => {
	if (V.stress >= V.stressmax) {
		iEvent.addFlag('harvest', 'passout', 1);
	}
});

iEvent.registPsg('Mer Street',() => {
	if (V.stress >= V.stressmax) {
		iEvent.addFlag('mer', 'passout', 1);
	}
});

iEvent.registPsg('Canteen Milkshake', () => {
	wikifier('thirsty', 1000);
	new Wikifier(null, `<<append #addAfterMsg>>${
		lanSwitch(
			'Your throat is moistened by the sweetness of the milkshake.',
			'你喉咙被奶昔的甜蜜滋润了。')
	}<<llthirst>><</append>>`);
});

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

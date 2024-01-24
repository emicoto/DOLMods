// Brothel Basement
iEvent
    .registEvent(
        'location',

        {
            entrypassage : 'Brothel Basement',
            exit         : 'Brothel Basement',
            scene        : 'BrothelBasement',

            episode   : 'DrugsIntro',
            type      : 'Event',
            phase     : 3,
            eventnext : true,
            require   : data => iEvent.getFlag('brothel', 'drugsintro') !== 1
            && V.brothel_basement_intro == 1 && V.tvar.lastPassage == 'Brothel'
        },

        {
            match : /[a-zA-Z]+ Street$|Park$/,

            type     : 'Event',
            toward   : 'Chinatown RandomRumors',
            initcode : '<<set $tvar.scene.branch to random(1,4)>><<set $tvar.scene.exit to $tvar.lastPassage>>',
            endcode  : '<<set $eventskip to 1>><<run iEvent.addFlag("chinatown", "rumors", 1); iEvent.addFlag("chinatown", "rumorstoday", 1)>>',
            require  : data => iEvent.getFlag('chinatown', 'intro') == undefined
            && V.location == 'town' && F.noEventRunning() && random(100) < 30
            && Time.days > 2 && iEvent.getFlag('chinatown', 'rumorstoday') < 2
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
    wikifier('thirsty', -1000);
    setTimeout(() => {
        new Wikifier(null, `<<append #addAfterMsg>>${
            lanSwitch(
                'Your throat is moistened by the sweetness of the milkshake.',
                '你喉咙被奶昔的甜蜜滋润了。')
        }<<llthirst>><</append>>`);
    }, 60);
});


iEvent.registPsg('Livestock Field', () => {
    if (!V.orgasmcurrent) return;
    if (random(100) < 20) return;

    const data = document.getElementById('passage-content');
    const [, txt] = data.innerHTML.match(/<div id="addAfterMsg"><\/div>([\s\S]+)<\/a>/) || [];

    data.innerHTML = data.innerHTML.replace(txt, '<div id="patchContent"></div>').replace('</div></a>', '</div>');
    const html = {
        EN : ` Your knees buckle, and you fall to the grass.
        <<if ($monsterchance gte 1 and ($hallucinations gte 1 or $monsterhallucinations is "f"))>>
            <<if maleChance() lt random(1, 100)>>
                Cowgirls around the field look over in confusion.
            <<else>>
                Bullboys around the field look over in confusion.
            <</if>>
        <</if>>`,

        CN : `你的膝盖弯曲，然后你跪到草地上。
		<<if ($monsterchance gte 1 and ($hallucinations gte 1 or $monsterhallucinations is "f"))>>
			<<if maleChance() lt random(1, 100)>>
				田野里的母牛们困惑地看着四周。
			<<else>>
				农场周围的公牛困惑地看着四周。
			<</if>>
		<</if>>`
    };

    setTimeout(() => {
        new Wikifier(null, `<<replace #patchContent>>
            <<orgasm>>${lanSwitch(html)}
            <br><br>
            <<link "${lanSwitch('Continue', '继续')}" "Livestock Field">><<pass 1>><<endevent>><<endcombat>><</link>>
            <</replace>>`
        );
    }, 60);
});

iEvent.registPsg('Livestock Field River', () => {
    const data = document.getElementById('passage-content');

    const links = data.getElementsByClassName('macro-link');

    let ref = null;
    for (let i = 0; i < links.length; i++) {
        if (links[i].innerHTML.has('Wash', '清洗')) {
            ref = links[i];
            break;
        }
    }

    const patch = document.createElement('div');
    patch.id = 'patchContent';
    data.replaceChild(patch, ref);
    
    const inner = {
        EN : 'You scoop up some water from the river with your hand and drink.  The cool water moistens your throat, <span class="teal"> you feel much better now.</span>',
        CN : '你用手在河水捧起一些水喝下。清凉的的水润过你的喉咙，<span class="teal">你感觉舒服多了。</span>'
    };

    const macro = `<<replace #addAfterMsg transition>>${lanSwitch(inner)}<<thirsty -600>><<lllthirst>><br><br><</replace>><<replace #thirstcaption>><<thirstyBar>><</replace>>`;

    const html = `<<actionUI "wash">><<link "${lanSwitch('Wash', '清洗')} (0:15)" "Livestock Field Wash">><<wash>><<pass 15>><</link>><br>
    <<actionUI "drinkwater">><<link "${lanSwitch('Drink', '喝水')} (0:10)">>${macro}<</link>>`;

    setTimeout(() => {
        new Wikifier(null, `<<replace #patchContent>>${lanSwitch(html)}<</replace>>`);
    }, 60);
});


iEvent
    .registEvent(
        'location',
        {
            entrypassage : 'Garden',
            toward       : 'Orphanage Garage Intro',
    
            type    : 'Event',
            require : () => !iEvent.getFlag('orphanage', 'garageinit')
            && iEvent.getFlag('orphanage', 'garageprocess') >= 6 && Time.dayState == 'day'
        }
    );

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

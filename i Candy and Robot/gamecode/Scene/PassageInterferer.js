
iStage.addListener(
    'countPassout',
    {
        passage      : ['Harvest Street', 'Mer Street'],
        runningPoint : 'onDisplay',
        onDisplay    : () => {
            if (V.stress >= V.stressmax) {
                iStage.addFlag(V.bus, 'passout', 1);
            }
        }
    }
);

iStage.addListener(
    'countGloryholeServe',
    {
        passage      : 'Brothel Basement Sex Finish',
        runningPoint : 'onDisplay',
        onDisplay    : () => {
            if (V.enemyarousal >= V.enemyarousalmax) {
                iStage.addFlag('brothel', 'prostitution', 1);
            }
        }
    }
);


iStage.patchTo('Canteen Milkshake', () => {
    const html = [
        'Your throat is moistened by the sweetness of the milkshake.',
        '你喉咙被奶昔的甜蜜滋润了。'
    ];
    return `${lanSwitch(html)}<<lllthirst>><<thirsty -1000>>`;
});


function livestockCombatOmit() {
    if (!V.orgasmcurrent) return;
    if (random(100) < 20) return;

    const data = document.getElementById('passage-content');
    const [txt, _txt] = data.innerHTML.match(/<div id="addAfterMsg">([\s\S]+)<\/a>/) || [];

    data.innerHTML = data.innerHTML.replace(txt, '<div id="addAfterMsg></div><div id="patchContent"></div>');

    const html = {
        EN : `Your knees buckle, and you fall to the grass.
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
}
iStage.addWidget('Livestock Field','combatOmit', livestockCombatOmit);

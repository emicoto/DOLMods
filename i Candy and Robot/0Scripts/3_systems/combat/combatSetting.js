
const whitelistnpc = ['Avery', 'Briar', 'Darryl', 'Eden', 'Harper', 'Kylar', 'Landry', 'Morgan', 'Whitney', 'Winter', 'Remy', 'Wren', 'Cheng'];

iCombat.set({
    condition : () => V.tutorial == 1 || Time.days < 3,
    key       : 'tutorialcheck',
    type      : 'forceskip'
});

iCombat.set({
    condition : () => V.location == 'school' && random(100) < 90,
    key       : 'schoolcheck',
    type      : 'forceskip'
});

iCombat.set({
    condition : () => V.location == 'police_station' && random(100) < 80,
    key       : 'policecheck',
    type      : 'forceskip'
});

iCombat.set({
    condition : () => V.npc.length > 0 && !V.npc.has(...whitelistnpc),
    key       : 'npccheck',
    type      : 'forceskip'
});

iCombat.set({
    condition : () => V.location == 'livestock' && random(100) < 80,
    key       : 'livestockcheck',
    type      : 'forceskip'
});

iCombat.set({
    condition : () => V.npc.length > 0 && V.npc.has(...whitelistnpc) && V.consensual == 1 && random(100) < 60,
    key       : 'consensualcheck',
    type      : 'forceskip'
});

iCombat.set({
    condition : () => V.consensual == 1 && V.npc.length == 0 && random(100) < 75,
    key       : 'consensualcheck',
    type      : 'forceskip'
});

iCombat.setInit('npcpocket', {
    condition : () => V.enemytype == 'man',
    action    : () => {
        for (let i = 0; i < V.enemynomax; i++) {
            const npc = V.NPCList[i];

            if (npc.pocket == undefined && npc.trait) {
                npc.pocket = 1;
            }
        }
    }
});

iCombat.setTurnStart('playerCheck', {
    condition : () => V.pain < V.painmax * 0.8
        && V.arousal < V.arousalmax * 0.8
        && V.enemyhealth < V.enemyhealthmax * 0.3
        && V.orgasmdown < 1 && V.rightarm !== 'bound' && V.leftarm !== 'bound'
        && V.leftleg !== 'bound' && V.rightleg !== 'bound',
    type      : 'skipcheck',
    skipevent : ['feeddrug']
});

iCombat.setEnemyTurn('takedrug', {
    condition : npc => npc.feed < 2 && npc.pocket,
    action    : npc => {
        const drugs = Items.search('drugs', 'or', 'pill', 'inject').filter(item => !item.id.has('angel') && iCandy.getStat(item.id, 'efTimer') - V.timeStamp <= 1800);
        if (drugs.length == 0) return;

        npc.takeItem = {
            item  : drugs.random(),
            timer : 0
        };
    },
    type     : 'action',
    feedback : npc => `${P.templet(sMsg.pickDrug, npc.fullDescription, npc.takeItem.item.name)}<br>`
});

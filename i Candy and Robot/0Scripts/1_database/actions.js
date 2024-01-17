const iCandyCombatActions = [
    {
        displayname : ['Whack the drugs away', '击落毒品'],
        value       : 'whackdrugs',
        type        : 'leftaction',
        widget      : 'whackdrugsDifficult',

        mainType : 'Default',
        color    : 'brat',
        condition() {
            return V.pain < 100 && V.arousal < V.arousalmax * 0.9
            && V.orgasmcurrent == 0
            && V.control >= V.controlmax * 0.3
            && V.NPCList[V.lefttarget].handItem;
        }
    },
    {
        displayname : ['Whack the drugs away', '击落毒品'],
        value       : 'whackdrugs',
        type        : 'rightaction',
        widget      : 'whackdrugsDifficult',

        mainType : 'Default',
        color    : 'brat',
        condition() {
            return V.pain < 100 && V.arousal < V.arousalmax * 0.9
            && V.orgasmcurrent == 0
            && V.control >= V.controlmax * 0.3
            && V.NPCList[V.righttarget].handItem;
        }
    }
];

setup.modCombatActions.push(...iCandyCombatActions);

const iCandyCombatActions = [
	{
		displayname : ['Whack the drugs away', '击落毒品'],
		value       : 'whackdrugs',
		type        : 'leftaction',
		widget      : 'whackdrugsDifficult',

		mainType : 'Default',
		color    : 'brat',
		condition() {
			return V.pain < 100 && V.arousal < V.arousalmax * 0.8 && V.control >= V.controlmax * 0.3 && V.NPCList[V.lefttarget].takeItem;
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
			return V.pain < 100 && V.arousal < V.arousalmax * 0.8 && V.control >= V.controlmax * 0.3 && V.NPCList[V.righttarget].takeItem;
		}
	}
];

setup.modCombatActions.push(...iCandyCombatActions);

const iChara = {
	data: {},
	XinyuCheck: function(){
		if(!C.npc.Xinyu) return

		//update name when language or gender changed
		if(C.npc.Xinyu.displayname_lan){
			if(C.npc.Xinyu.pronoun == 'm'){
				C.npc.Xinyu.displayname_lan[1] = '心宇'
				C.npc.Xinyu.displayname = lanSwitch(C.npc.Xinyu.displayname_lan)
			}
			else{
				C.npc.Xinyu.displayname_lan[1] = '心语'
				C.npc.Xinyu.displayname = lanSwitch(C.npc.Xinyu.displayname_lan)
			}
		}

		//update location
		if(Time.dayState == 'dusk' && [1,4,6,7].includes(Time.weekDay)){
			V.iModNpc.set('Xinyu', 'location', 'almond_path')
		}
		else if( between(Time.weekDay, 2, 6) && between(Time.hour, 9, 12)){
			V.iModNpc.set('Xinyu', 'location', 'shingwong')
		}
		else if( between(Time.hour, 14, 16) ){
			V.iModNpc.set('Xinyu', 'location', 'chinatown')
		}
		else{
			V.iModNpc.set('Xinyu', 'location', 'xinyuHome')
		}
	}
}

window.iChara = iChara
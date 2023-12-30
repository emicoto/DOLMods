const iChara = {
    data: {},
    XinyuCheck: function(){
        if(!C.npc.Xinyu) return

        //update name when language or gender changed
        if(C.npc.Xinyu.pronoun == 'm'){
            C.npc.Xinyu.displayname_lan[1] = '新宇'
            C.npc.Xinyu.displayname = lanSwich(C.npc.Xinyu.displayname_lan)
        }
        else{
            C.npc.Xinyu.displayname_lan[1] = '心语'
            C.npc.Xinyu.displayname = lanSwich(C.npc.Xinyu.displayname_lan)
        }

        //update location
        if(Time.dayState == 'dusk' && [1,4,6,7].includes(Time.weekDay)){
            iModNpc.set('Xinyu', 'location', 'almond_path')
        }
        else if(Time.dayState == 'day' && between(Time.weekDay, 2, 6)){
            iModNpc.set('Xinyu', 'location', 'chinatown')
        }
        else{
            iModNpc.set('Xinyu', 'location', 'land_shrine')
        }
    }
}
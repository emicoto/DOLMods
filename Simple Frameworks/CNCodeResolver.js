const check = {
    '好感' : function(npc){
        return C.npc[npc].love
    },

    '信赖' : function(npc) {
        return C.npc[npc].trust
    },

    '支配' : function(npc) {
        return C.npc[npc].dom
    },

    '罗宾自信' : function(){
        return C.npc['Robin'].dom
    },

    '愤怒' : function(npc){
        return C.npc[npc].rage
    },

    '性欲' : function(npc){
        return C.npc[npc].lust
    },

    '凯子嫉妒' : function(){
        return C.npc['Kylar'].rage
    },

    '悉尼纯洁' : function(){
        return C.npc['Sydney'].purity
    },

    '悉尼堕落' : function(){
        return C.npc['Sydney'].corruption
    },

    '抗拒态度' : function(){
        return V.speech_attitude == 'bratty'
    },

    '温顺态度' : function(){
        return V.speech_attitude == 'meek'
    },

    '中性态度' : function(){
        return V.speech_attitude == 'neutral'
    },

    '初遇' : function(npc){
        return C.npc[npc].init == 0
    },

    '阴道处女': function(npc){
        if(npc !== 'pc'){ 
            return C.npc[npc].virginity.vaginal 
        }
        return V.player.virginity.vaginal
    },

    '肛门处女': function(npc){
        if(npc !== 'pc'){ 
            return C.npc[npc].virginity.anal 
        }
        return V.player.virginity.anal
    },

    '初吻':function(npc){
        if(npc !== 'pc'){ 
            return C.npc[npc].virginity.kiss 
        }
        return V.player.virginity.kiss
    },

    '初次握手':function(npc){
        if(npc !== 'pc'){
            return C.npc[npc].virginity.handholding
        }
        return V.player.virginity.handholding
    },

    '初次口交':function(npc){
        if(npc !== 'pc'){
            return C.npc[npc].virginity.oral
        }
        return V.player.virginity.oral
    },

    '阴茎童贞':function(npc){
        if(npc !== 'pc'){
            return C.npc[npc].virginity.penile
        }
        return V.player.virginity.penile
    },

    '誓约':function(npc){
        if(npc !== 'pc'){
            return C.npc[npc].virginity.temple
        }
        return V.player.virginity.temple && V.templePromised
    },

    '贞洁誓约':function(){
        return V.player.virginity.temple
    },

    '纯洁之躯':function(npc){
       if(npc !== 'pc'){
            return C.npc[npc].virginity.vaginal && C.npc[npc].virginity.penile
       }
       return V.player.virginity.vaginal && C.npc[npc].virginity.penile
    },

    '恋人':function(npc){
        return V.loveInterest.primary == npc
    },

    '副恋人':function(npc){
        return V.loveInterest.secondary == npc
    }
}

window.check = check

const cntv = {
    '设置':function(prop, value){
        V.iModValues[prop] = value;
    },

    'npc设置':function(npc, prop, value){
        if(!V.iModNPC[npc]){
            V.iModNPC[npc] = {}
        }
        V.iModNPC[npc][prop] = value
    },

    '获取变量':function(prop){
        return V.iModValues[prop]
    },

    '变量':function(prop){
        return V.iModValues[prop]
    },

    '变量加减':function(prop, value){
        V.iModValues[prop] += value
    },

    '删除变量':function(prop){
        delete V.iModValues[prop]
    },

    '获取npc变量':function(npc, prop){
        return V.iModNPC[npc][prop]
    },

    'npc变量':function(npc, prop){
        return V.iModNPC[npc][prop]
    },
    'npc变量加减':function(npc, prop, value){
        if(!V.iModNPC[npc]){
            V.iModNPC[npc] = {}
        }
        V.iModNPC[npc][prop] += value
    },

    '态度差分':function(bratty, neutral, meek){
        if(V.speech_attitude == 'bratty')
            return bratty;
        if(V.speech_attitude == 'neutral')
            return neutral
        if(V.speech_attitude == 'meek')
            return meek
    },

    '性别差分':function(npc, female, male){
        let gender = 'f'
        if(npc !== 'pc'){
            gender = C.npc[npc].gender
        }
        else{
            gender = V.player.gender
        }

        if(gender == 'm'){
            return male
        }

        return female
    },

    '条件分支':function(...condtxt){
        for(let i=0; i<condtxt.length; i++){
            if(condtxt[i][0]){
                return condtxt[i][1]
            }

            return condtxt[condtxt.length-1][1]
        }
    },

    '好感变化':function(npc, value){
        C.npc[npc].love += value
    },

    '支配变化':function(npc, value){
        C.npc[npc].dom += value
    },

    '性欲变化':function(npc, value){
        C.npc[npc].lust += value
    },

    '愤怒变化':function(npc, value){
        C.npc[npc].rage += value
    },

    '凯子嫉妒变化':function(value){
        C.npc.Kylar.rage += value
    },

    '罗宾自信变化':function(value){
        C.npc.Robin.dom += value
    },

    '悉尼纯洁变化':function(value){
        C.npc.Sydney.purity += value
    },

    '悉尼堕落变化':function(value){
        C.npc.Sydney.corruption += value
    },

    '罗宾钱包变化':function(value){
        V.robinmoney += value
    }

}

window.cntv = cntv

function CNCodeTrans(key, ...args){
    return cntv[key](...args)
}


DefineMacroS('cntv', CNCodeTrans)

$(document).on(':passageready', ()=>{
    if(!V.iModValues){
        V.iModValues = {}
    }

    if(!V.iModNPC){
        V.iModNPC = {}
    }
})
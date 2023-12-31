
//------------------------------------------------------
//
//  widget： 语言切换，性别切换，条件切换
//
//------------------------------------------------------
function lanSwitch(...lan) {
    let [EN, CN] = lan
    if (Array.isArray(lan[0]))
        [EN, CN] = lan[0]

    if (setup.language == 'CN') {
        return CN ?? EN
    }
    return EN ?? CN
}
window.lanSwitch = lanSwitch
DefineMacroS('lanSwitch', lanSwitch)

function sexSwitch(npc, female,male){
    let gender = 'f'
    if(npc !== 'pc'){
        gender = C.npc[npc].gender
    }
    else{
        gender = V.player.gender_appearance
    }

    if(gender == 'm'){
        return male
    }

    return female
}

window.sexSwitch = sexSwitch
DefineMacroS('sexSwitch', sexSwitch)

function speachDif(bratty, neutral, meek){
    if(V.speech_attitude == 'bratty')
        return bratty;
    if(V.speech_attitude == 'neutral')
        return neutral
    if(V.speech_attitude == 'meek')
        return meek
}
window.speachDif = speachDif


function cond(...condtxt){
    for(let i=0; i<condtxt.length; i++){
        if(condtxt[i][0]){
            return condtxt[i][1]
        }

        return condtxt[condtxt.length-1][1]
    }
}
window.cond
DefineMacroS('cond', cond)


Macro.add("randomdata", {
    tags:["datas"],
    handler: function(){
        const len = this.payload.length;

        console.log(this.payload)
        if(len == 1) return this.error("no data found");

        const index = random(1, len-1);
        const data = this.payload[index].contents;
        jQuery(this.output).wiki(data);

    }
})
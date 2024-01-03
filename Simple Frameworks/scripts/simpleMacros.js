
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

function nnpcboy(npc){
   let gender = C.npc[npc].pronoun

   if(gender == 'm'){
        return lanSwitch('boy', '男孩')
   }

   return lanSwitch('girl', '女孩')
}
DefineMacroS('nnpcboy', nnpcboy)

function nnpcBoy(npc){
    let gender = C.npc[npc].pronoun

    if(gender == 'm'){
         return lanSwitch('Boy', '男孩')
    }
 
    return lanSwitch('Girl', '女孩')
 }
 DefineMacroS('nnpcBoy', nnpcBoy)

 function pcpn(pronun){
    switch(pronun){
        case 'him':
            return lanSwitch(sexSwitch('pc', 'him', 'her'), sexSwitch('pc', '他', '她'))
        case 'his':
            return lanSwitch(sexSwitch('pc', 'his', 'her'), sexSwitch('pc', '他的', '她的'))
        case 'he':
            return lanSwitch(sexSwitch('pc', 'he', 'she'), sexSwitch('pc', '他', '她'))
        case 'himself':
            return lanSwitch(sexSwitch('pc', 'himself', 'herself'), sexSwitch('pc', '他自己', '她自己'))
        case 'Him':
            return lanSwitch(sexSwitch('pc', 'Him', 'Her'), sexSwitch('pc', '他', '她'))
        case 'His':
            return lanSwitch(sexSwitch('pc', 'His', 'Her'), sexSwitch('pc', '他的', '她的'))
        case 'He':
            return lanSwitch(sexSwitch('pc', 'He', 'She'), sexSwitch('pc', '他', '她'))
        case 'Himself':
            return lanSwitch(sexSwitch('pc', 'Himself', 'Herself'), sexSwitch('pc', '他自己', '她自己'))
    }
 }

DefineMacroS('pcpn', pcpn)

function speechDif(bratty, neutral, meek){
    if(V.speech_attitude == 'bratty')
        return bratty;
    if(V.speech_attitude == 'neutral')
        return neutral
    if(V.speech_attitude == 'meek')
        return meek
}
window.speechDif = speechDif


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

Macro.add("lanLink", {
    tags:[],
    handler: function(){
		if (this.args.length === 0) {
			return this.error(`no link text specified`);
		}

    }
})
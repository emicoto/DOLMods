setup.lang = {
    next         : { EN : 'Next', CN : '继续' },
    leave        : { EN : 'Leave', CN : '离开' },
    back         : { EN : 'Back', CN : '返回' },
    items        : { EN : 'Items', CN : '物品' },
    ITEMS        : { EN : 'ITEMS', CN : '物品' },
    unequip      : { EN : 'Unequip', CN : '卸下' },
    equip        : { EN : 'Equip', CN : '装备' },
    move         : { EN : 'Move', CN : '移动' },
    drop         : { EN : 'Drop', CN : '丢弃' },
    willpower    : { EN : 'Willpower', CN : '意志' },
    alcohol      : { EN : 'Alcohol', CN : '酒精' },
    hallucinogen : { EN : 'Hallucinogen', CN : '幻觉' },
    hunger       : { EN : 'Hunger', CN : '饥饿' },
    health       : { EN : 'Health', CN : '健康' },
    storage      : { EN : 'Storage', CN : '库存' },
    mechanic     : { EN : 'Mechanic', CN : '机械' },
    chemical     : { EN : 'Chemical', CN : '化学' },
    cooking      : { EN : 'Cooking', CN : '烹饪' },
    wakeup       : { EN : 'Wake up', CN : '醒来' },
    loiter       : { EN : 'Loiter', CN : '闲逛' },
    take         : { EN : 'Take', CN : '取出' },
    takehalf     : { EN : 'Take half', CN : '取出一半' },
    clearall     : { EN : 'Clear', CN : '清空' }
};
//------------------------------------------------------
//
//  widget： 语言切换，性别切换，条件切换
//
//------------------------------------------------------
function lanSwitch(...lan) {
    if (String(lan[0]) == '[object Object]') {
        return lan[0][setup.language] ?? lan[0].EN ?? lan[0].CN;
    }

    let [EN, CN] = lan;

    if (Array.isArray(lan[0])) {
        [EN, CN] = lan[0];
    }

    if (setup.language == 'CN') {
        return CN ?? EN;
    }
    return EN ?? CN;
}
window.lanSwitch = lanSwitch;
DefineMacroS('lanSwitch', lanSwitch);

function getLan(key) {
    if (key.includes('.')) {
        const lanObj = getPath(setup.lang, key);
        if (lanObj == undefined) {
            return `error: the dictionary key is not found, path: ${key}`;
        }

        return lanObj[setup.language] ?? lanObj.EN ?? lanObj.CN;
    }

    if (setup.lang[key][setup.language] == undefined) {
        return setup.lang[key].EN ?? setup.lang[key].CN;
    }
    return setup.lang[key][setup.language];
}
window.getLan = getLan;
DefineMacroS('getLan', getLan);

function sexSwitch(npc, female, male) {
    let gender = 'f';
    if (npc !== 'pc' && typeof npc == 'string') {
        gender = C.npc[npc].gender;
    }
    else if (typeof npc == 'number') {
        gender = V.NPCList[V.index]?.gender ?? 'm';
    }
    else {
        gender = V.player.gender_appearance;
    }

    if (gender == 'm') {
        return male;
    }

    return female;
}

window.sexSwitch = sexSwitch;
DefineMacroS('sexSwitch', sexSwitch);

function nnpcboy(npc) {
    const gender = C.npc[npc].pronoun;
    const boy = {
        EN : 'boy',
        CN : '男孩'
    };
    const girl = {
        EN : 'girl',
        CN : '女孩'
    };

    if (gender == 'm') {
        return boy[setup.language];
    }

    return girl[setup.language];
}
DefineMacroS('nnpcboy', nnpcboy);

function nnpcBoy(npc) {
    return nnpcboy(npc).toUpperFirst();
}
DefineMacroS('nnpcBoy', nnpcBoy);

function pcpn(pronun) {
    const lan = {
        EN : {
            him     : 'him',
            his     : 'his',
            he      : 'he',
            himself : 'himself'
        },
        CN : {
            him     : '他',
            his     : '他的',
            he      : '他',
            himself : '他自己'
        }
    };
    const pron = pronun.toLowerCase();

    return pronun[0] == 'H' ? lan[setup.language][pron].toUpperFirst() : lan[setup.language][pron];
}

DefineMacroS('pcpn', pcpn);

function speechDif(bratty, neutral, meek) {
    if (V.speech_attitude == 'bratty') return bratty;
    if (V.speech_attitude == 'neutral') return neutral;
    if (V.speech_attitude == 'meek') return meek;
}
window.speechDif = speechDif;


function cond(...condtxt) {
    for (let i = 0; i < condtxt.length; i++) {
        if (condtxt[i][0]) {
            return condtxt[i][1];
        }

        return condtxt[condtxt.length - 1][1];
    }
}
window.cond;
DefineMacroS('cond', cond);


Macro.add('randomdata', {
    tags : ['datas'],
    handler() {
        const len = this.payload.length;

        console.log(this.payload);
        if (len == 1) return this.error('no data found');

        const index = random(1, len - 1);
        const data = this.payload[index].contents;
        jQuery(this.output).wiki(data);
    }
});

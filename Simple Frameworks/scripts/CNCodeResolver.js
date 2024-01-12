const check = {
    好感(npc) {
        return C.npc[npc].love;
    },

    信赖(npc) {
        return C.npc[npc].trust;
    },

    支配(npc) {
        return C.npc[npc].dom;
    },

    罗宾自信() {
        return C.npc.Robin.dom;
    },

    愤怒(npc) {
        return C.npc[npc].rage;
    },

    性欲(npc) {
        return C.npc[npc].lust;
    },

    凯子嫉妒() {
        return C.npc.Kylar.rage;
    },

    悉尼纯洁() {
        return C.npc.Sydney.purity;
    },

    悉尼堕落() {
        return C.npc.Sydney.corruption;
    },

    抗拒态度() {
        return V.speech_attitude == 'bratty';
    },

    温顺态度() {
        return V.speech_attitude == 'meek';
    },

    中性态度() {
        return V.speech_attitude == 'neutral';
    },

    初遇(npc) {
        return C.npc[npc].init == 0;
    },

    阴道处女(npc) {
        if (npc !== 'pc') {
            return C.npc[npc].virginity.vaginal;
        }
        return V.player.virginity.vaginal;
    },

    肛门处女(npc) {
        if (npc !== 'pc') {
            return C.npc[npc].virginity.anal;
        }
        return V.player.virginity.anal;
    },

    初吻(npc) {
        if (npc !== 'pc') {
            return C.npc[npc].virginity.kiss;
        }
        return V.player.virginity.kiss;
    },

    初次握手(npc) {
        if (npc !== 'pc') {
            return C.npc[npc].virginity.handholding;
        }
        return V.player.virginity.handholding;
    },

    初次口交(npc) {
        if (npc !== 'pc') {
            return C.npc[npc].virginity.oral;
        }
        return V.player.virginity.oral;
    },

    阴茎童贞(npc) {
        if (npc !== 'pc') {
            return C.npc[npc].virginity.penile;
        }
        return V.player.virginity.penile;
    },

    誓约(npc) {
        if (npc !== 'pc') {
            return C.npc[npc].virginity.temple;
        }
        return V.player.virginity.temple && V.templePromised;
    },

    贞洁誓约() {
        return V.player.virginity.temple;
    },

    纯洁之躯(npc) {
        if (npc !== 'pc') {
            return C.npc[npc].virginity.vaginal && C.npc[npc].virginity.penile;
        }
        return V.player.virginity.vaginal && C.npc[npc].virginity.penile;
    },

    恋人(npc) {
        return V.loveInterest.primary == npc;
    },

    副恋人(npc) {
        return V.loveInterest.secondary == npc;
    }
};

window.check = check;

const cntv = {
    设置(prop, value) {
        V.iModVar[prop] = value;
    },

    npc设置(npc, prop, value) {
        if (!V.iModNpc[npc]) {
            V.iModNpc[npc] = {};
        }
        V.iModNpc[npc][prop] = value;
    },

    获取变量(prop) {
        return V.iModVar[prop];
    },

    变量(prop) {
        return V.iModVar[prop];
    },

    变量加减(prop, value) {
        V.iModVar[prop] += value;
    },

    删除变量(prop) {
        delete V.iModVar[prop];
    },

    获取npc变量(npc, prop) {
        return V.iModNpc[npc][prop];
    },

    npc变量(npc, prop) {
        return V.iModNpc[npc][prop];
    },
    npc变量加减(npc, prop, value) {
        if (!V.iModNpc[npc]) {
            V.iModNpc[npc] = {};
        }
        V.iModNpc[npc][prop] += value;
    },

    态度差分 : speechDif,

    性别差分 : sexSwitch,

    条件分支 : cond,

    概率差分 : window.maybe,

    好感变化(npc, value) {
        C.npc[npc].love += value;
    },

    支配变化(npc, value) {
        C.npc[npc].dom += value;
    },

    性欲变化(npc, value) {
        C.npc[npc].lust += value;
    },

    愤怒变化(npc, value) {
        C.npc[npc].rage += value;
    },

    凯子嫉妒变化(value) {
        C.npc.Kylar.rage += value;
    },

    罗宾自信变化(value) {
        C.npc.Robin.dom += value;
    },

    悉尼纯洁变化(value) {
        C.npc.Sydney.purity += value;
    },

    悉尼堕落变化(value) {
        C.npc.Sydney.corruption += value;
    },

    罗宾钱包变化(value) {
        V.robinmoney += value;
    }

};

window.cntv = cntv;

function CNCodeTrans(key, ...args) {
    return cntv[key](...args);
}

DefineMacroS('cntv', CNCodeTrans);


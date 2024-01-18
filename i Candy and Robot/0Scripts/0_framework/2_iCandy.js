// Mod Data
const iCandy = {
    version : iCandyModVersion,
    author  : 'Lune',

    // mod startup config
    config : {
        debug          : false,
        globalStack    : 1,
        disableStack   : false,
        disablePockets : false,
        keepHairs      : true,
        shopPriceMult  : 1
    },

    // save variables
    variables : {},

    // settings
    setup : {
        addictions : iModAddictions,
        maxStacks  : iModMaxStacks,
        tattoos    : iModTattoos,
        drugConfig : iModDrugConfig
    },

    // temporary variables
    temp : {},

    // mod functions
    getConfig(prop) {
        return V?.iCandyRobot?.config[prop] ?? this.config[prop];
    },

    checkStat(item) {
        const data = Items.get(item);

        if (R.drugStates.drugs[item]) {
            return true;
        }

        if (data && data.tags.includes('addiction') && !data.alias) {
            R.drugStates.drugs[item] = new drugState();
            R.drugFlags.drugs[item] = new drugFlag();
            return true;
        }

        return false;
    },

    resovle(type, item) {
        const general = ['aphrod', 'alcohol', 'nicotine'];
        let key = 'drugStates';
        if (type == 'flag') key = 'drugFlags';

        if (general.includes(item)) {
            return R[key].general[item];
        }

        if (this.checkStat(item)) {
            return R[key].drugs[item];
        }
    },

    getStat(item, prop) {
        const stats = this.resovle('',item);
        if (!stats) return;

        return prop ? stats[prop] : stats;
    },
    setStat(item, prop, value) {
        const stats = this.resovle('',item);
        if (!stats) return;

        stats[prop] = value;
        return stats[prop];
    },

    addStat(item, prop, value) {
        const stats = this.resovle('',item);
        if (stats[prop] == undefined) {
            stats[prop] = value;
        }
        else {
            stats[prop] += value;
        }
        return stats[prop];
    },

    calcDose(item, value) {
        const data = setup.addictions[item];
        if (!data) return;
        let dose = this.getStat(item, 'dose') ?? 0;

        if (!dose) dose = this.addStat(item, 'dose', value);
        else if ((dose + value) / 150 < 1) {
            dose = this.addStat(item, 'dose', value);
        }

        return Math.floor((dose + value) / 150 + 0.5);
    },

    take(item, value) {
        value = Number(value);
        if (!value) return;

        const data = setup.addictions[item];
        if (!data) return;

        const dose = this.calcDose(item, value);
        const stat = this.getStat(item)

        if (dose > 0) {
            this.addStat(item, 'taken', Math.max(Math.floor(value / 100 + 0.5), 1));
        }
        
        this.setStat(item, 'lastTime', V.timeStamp);

        // 如果大于安全阈值，增加overdose
        if (stat.taken > data.threshold) {
            stat.overdose++;
        }

        // 清除戒断状态
        if (stat.withdraw > 0) {
            stat.withdraw = 0;
        }
    },

    setFlag(item, prop, value) {
        const flags = this.resovle('flag', item);
        if (!flags) return;

        flags[prop] = value;
        return flags[prop];
    },

    getFlag(item, prop) {
        const flags = this.resovle('flag', item);
        if (!flags) return;

        return prop ? flags[prop] : flags;
    },

    addFlag(item, prop, value) {
        const flags = this.resovle('flag', item);
        if (flags[prop] == undefined) {
            flags[prop] = value;
        }
        else {
            flags[prop] += value;
        }
        return flags[prop];
    },

    setEquipEf(efId) {
        if (!R.equipEf[efId]) {
            R.equipEf[efId] = 1;
            return;
        }
        R.equipEf[efId] = Math.min(R.equipEf[efId] + 1, 10);
    },

    unsetEquipEf(efId) {
        R.equipEf[efId] = Math.max(R.equipEf[efId] - 1, 0);
    },

    // 记录更新。如果还没进行过初始化，就初始化一下。
    senseBak() {
        for (const [type, sens] of Object.entries(R.extraSense)) {
            const base = V[`${type}sensitivity`];

            if (sens.init == 0) {
                sens.init = 1;
                sens.base = V[`${type}sensitivity`];
            }
            else {
                sens.base = base - sens.add;
            }
        }
    },

    // 设置感度BUFF来源，如果来源不存在则创建，存在则叠加
    senseSet(type, src, value, timer = 0, fade = 0) {
        const sens = R.extraSense[type];
        if (!sens) return;

        const { source } = sens;

        if (source[src] == undefined) {
            source[src] = {
                value,
                timer,
                fade
            };
        }
        else {
            source[src].value += value;
            source[src].timer = Math.max(source[src].timer, timer);
        }

        return R.extraSense[type];
    },

    senseGet(type, src) {
        const sens = R.extraSense[type];
        if (!sens || !sens.source[src]) return;

        return sens.source[src];
    },

    // 统计所有来源的buff，减少各来源的计时器，并更新到buffed, add
    // passtime单位为秒
    // calculate all buffs, reduce timer, update buffed value
    senseUpdate(sense, passtime) {
        this.senseBak();

        let add = 0;
        for (const [src, buff] of Object.entries(sense.source)) {
            // 如果计时器为0，且不是持续性buff，就删除这个来源
            // if timer is 0 and not a fade buff, delete this source
            if (buff.timer <= 0 && buff.fade == 0) {
                delete sense.source[src];
                continue;
            }

            // 如果是持续性buff，且数值等于0，就删除这个来源
            // if fade buff and value is 0, delete this source
            if (buff.timer <= 0 && buff.fade !== 0 && buff.value == 0) {
                delete sense.source[src];
                continue;
            }

            // 如果是持续性buff，就先更新数值。
            // if fade buff, update value

            // 药效持续中，获得数值增加
            // the buff is activing, then add value
            if (buff.fade !== 0 && buff.timer > 0) {
                const multiplier = V.combat == 1 ? 0.5 : Math.max(passtime / 60, 1);
                buff.value += buff.fade * multiplier;
            }

            // 药效减退中，数值减少
            // the buff is fading, then reduce value
            if (buff.fade !== 0 && buff.timer <= 0) {
                const multiplier = V.combat == 1 ? 0.2 : Math.max(passtime / 60, 1);
                buff.value -= buff.fade * multiplier;

                // 确保数值不会高于或低于0
                // make sure the value is not higher or lower than 0
                if (buff.fade > 0) {
                    buff.value = Math.max(buff.value, 0);
                }
                else {
                    buff.value = Math.min(buff.value, 0);
                }
            }

            // 集算所有buff的数值
            // calculate all buffs
            add += buff.value;

            buff.timer = Math.max(buff.timer - passtime, 0);
        }

        sense.add = add;
        V[`${sense.type}sensitivity`] = sense.base + sense.add;

        return R.extraSense;
    }
};

Object.defineProperty(window, 'iCandy', { get : () => iCandy });

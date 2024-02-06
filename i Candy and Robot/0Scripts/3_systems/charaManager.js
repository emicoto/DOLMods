
/**
 * @typedef {
 *  dayState? : string,
 *  days? : number[],
 *  week? : number[],
 *  start? : number,
 *  end? : number,
 *  stay? : number,
 *  rate? : number,
 *  vname : string,
 *  cond : function
 * } Schedule
 */
class Schedule {
    /**
     * @param {string} name the variable name of the location
     */
    constructor(name) {
        this.vname = name;
    }

    /**
     * @param {Schedule} option
     * @returns {Schedule}
     */
    Setting(option) {
        for (const key in option) {
            this[key] = option[key];
        }

        return this;
    }

    /**
     * the condition to trigger schedule
     * @param {function} callback
     * @returns {Schedule}
     */
    Cond(callback) {
        this.cond = callback;
        return this;
    }

    /**
     * check schedule
     */
    check() {
        if (this.cond && !this.cond()) return;

        if (this.dayState && this.dayState != Time.dayState) return;
        if (this.days && !this.days.includes(Time.weekDay)) return;
        if (this.week && !between(Time.weekDay, this.week[0], this.week[1])) return;

        const stay = this.checkStay();
        const rate = random(100);

        const res = {
            location  : this.vname,
            startTime : V.timeStamp,
            data      : this
        };

        if (stay && (!this.rate || this.rate && rate < this.rate)) {
            return res;
        }
    }

    checkStay() {
        let stay;
        if (this.start && this.end) {
            let min = this.start;
            let max = this.end;

            if (this.start > this.end) {
                min = this.end;
                max = this.start;
                stay = !between(Time.hour, min, max);
            }
            else {
                stay = between(Time.hour, min, max);
            }
        }
        else {
            stay = true;
        }
        return stay;
    }
}

class CharaData {
    constructor(charaId, color = 'white') {
        this.charaId = charaId;
        this.color = color;

        this.schedules = [];
        this.home = 'void';

        this.local = {
            vname : 'void'
        };

        this.state = {};
    }
    
    /**
     * @param  {...Schedule} schedule
     * @returns {CharaData}
     */
    Schedule(...schedule) {
        this.schedules = schedule;
        return this;
    }

    /**
     * set the home location of the character
     * @param {string} location
     * @returns {CharaData}
     */
    Home(location) {
        this.home = location;
        return this;
    }

    /**
     * set the actions list of the character
     * @param {...string} actions
     * @returns {CharaData}
     */
    Actions(...action) {
        this.actions = action;
        return this;
    }

    /**
     * @description reset the location state of the character
     */
    resetLocal() {
        this.local = {
            name : this.home
        };
    }

    get name() {
        return C.npc[this.charaId].displayname;
    }

    checkStay() {
        const data = this.local.data;

        if (data.cond && !data.cond()) return false;
        return data.checkStay();
    }

    checkSchedule() {
        for (const schedule of this.schedules) {
            const res = schedule.check();
            if (res) {
                this.local = res;
                break;
            }
        }
    }

    current() {
        // if void, check schedule
        if (this.local.vname == 'void') {
            this.local = this.checkSchedule();
        }
        else if (this.local.data && this.checkStay()) {
            return this.local.vname;
        }

        this.resetLocal();
        this.checkSchedule();

        return this.local.vname;
    }

    update() {
        const list = ['love', 'trust', 'rage', 'lust', 'trauma', 'dom', 'corruption', 'purity'];
        list.forEach(key => {
            this.state[key] = C.npc[this.charaId][key];
        });

        C.npc[this.charaId].location = this.current();
    }
}

const iChara = {
    data : {},
    XinyuCheck() {
        if (!C.npc.Xinyu) return;

        // update name when language or gender changed
        if (C.npc.Xinyu.displayname_lan) {
            if (C.npc.Xinyu.pronoun == 'm') {
                C.npc.Xinyu.displayname_lan[1] = '心宇';
                C.npc.Xinyu.displayname = lanSwitch(C.npc.Xinyu.displayname_lan);
            }
            else {
                C.npc.Xinyu.displayname_lan[1] = '心语';
                C.npc.Xinyu.displayname = lanSwitch(C.npc.Xinyu.displayname_lan);
            }
        }

        // update location
        if (Time.dayState == 'dusk' && [1,4,6,7].includes(Time.weekDay)) {
            C.npc.Xinyu.location = 'almond_path';
        }
        else if (between(Time.weekDay, 2, 6) && between(Time.hour, 9, 12)) {
            C.npc.Xinyu.location = 'shingwong';
        }
        else if (between(Time.hour, 14, 16)) {
            C.npc.Xinyu.location = 'chinatown';
        }
        else {
            C.npc.Xinyu.location = 'xinyuHome';
        }
    },

    currentLoc(charaId) {
        if (!this.data[charaId]) return;
        return this.data[charaId].current();
    },

    /**
     * @description add the chara data to the chara manager
     * @param {string} CharaId
     * @param {CharaData} data
     */
    add(CharaId, data) {
        const chara = new CharaData(CharaId, data.color);

        for (const key in data) {
            chara[key] = clone(data[key]);
        }

        this.data[CharaId] = chara;
    }
};


Object.defineProperty(window, 'iChara', {
    get() {
        return iChara;
    }
});

const oldPass = Time.pass;

const TimeHandle = {
    prevDate    : {},
    currentDate : {},
    passTime(pass) {
        const { currentDate, prevDate } = this;

        const sec = pass;
        let min =  currentDate.minute - prevDate.minute;

        if (min < 0) {
            min += 60;
        }

        let hour = currentDate.hour - prevDate.hour;
        if (hour < 0) {
            hour += 24;
        }

        let day = currentDate.day - prevDate.day;
        if (day < 0) {
            day = Math.max(day + prevDate.lastDayOfMonth, 1);
        }

        let month = currentDate.month - prevDate.month;
        if (month < 0) {
            month += 12;
        }

        const year = currentDate.year - prevDate.year;

        return {
            sec,
            min,
            hour,
            day,
            month,
            year,
            weekday : [prevDate.weekDay, currentDate.weekDay]
        };
    },

    event : {
        flag : {},
        html : {}
    },

    get(flag) {
        return this.event.flag[flag];
    },

    set(flag, html) {
        if (this.event.flag[flag] == undefined) {
            this.event.flag[flag] = {
                on    : 1,
                times : 0
            };
            this.event.html[flag] = html;
        }
        else {
            this.event.flag[flag].on = 1;
            this.event.html[flag] = html;
        }
    },

    unset(flag) {
        this.event.flag[flag].on = 0;
        this.event.html[flag] = '';
    },

    clear(flag) {
        this.event.flag[flag].on = 0;
        this.event.flag[flag].times = 0;
        this.event.html[flag] = '';
    },

    clearAll() {
        for (const [key] of Object.entries(this.event.flag)) {
            this.clear(key);
        }
    },

    onSave() {
        return this.event;
    },

    onLoad(data) {
        for (const [key, value] of Object.entries(data)) {
            this.event[key] = clone(value);
        }
    }
};

Save.onSave.add(() => {
    V.timeRec = TimeHandle.onSave();
});

Save.onLoad.add(data => {
    const saves = data.state.history;
    const save = saves[saves.length - 1].variables;

    console.log('timeRec:', save.timeRec);
    console.log('saves:', data, save);

    if (save.timeRec) {
        timeRec.onLoad(save.timeRec);
        delete save.timeRec;
    }
    else {
        timeRec.clearAll();
    }

    return data;
});

Time.pass = function (sec) {
    const prevDate = new DateTime(V.startDate + V.timeStamp);
    const fragment = oldPass(sec) || '';
    const currentDate = Time.date;

    if (!T.addMsg) {
        T.addMsg = '';
    }

    console.log('passed time:',sec);
    console.log('prevDate:',prevDate);
    console.log('currentDate:', currentDate);

    TimeHandle.prevDate = prevDate;
    TimeHandle.currentDate = currentDate;
	
    iTimeHandle(sec);
	
    if (V.combat == 1) {
        iCombatHandle();
        iCombatActionHandle();
    }

    V.addMsg += iManager.updatePockets();

    return fragment;
};

function iTimeHandle(passedSec) {
    const { min, day, hour, month, year, weekday } = TimeHandle.passTime(passedSec);

    console.log('time handle sec:', passedSec, 'min:', min, 'day:', day, 'hour:', hour, 'month:', month, 'year:', year, 'weekday:', weekday);

    if (V.sleephour > 0 || T.livestock_sleep > 0) {
        console.log('before sleepHandle:', V.sleephour, T.livestock_sleep);
        sleepHandle('before');
    }

    // 时间没有变化，跳过
    if (passedSec <= 0) return;

    // 根据事件的计算单位执行进程，先是按分钟计算的事件。
    if (passedSec / 60 >= 1 || min > 0 ||  V.combat == 1) {
        console.log('minute process:', passedSec, min);
        minuteProcess(passedSec, min);
    }

    if (hour > 0 || passedSec / 3600 >= 1) {
        console.log('hour process:', passedSec, hour);
        hourProcess(passedSec, hour);
    }

    if (day > 0 || passedSec / 86400 >= 1) {
        console.log('day process:', passedSec, day);
        dayProcess(passedSec, day, weekday);
    }

    // 每周的处理
    if (weekday[1] == 1 && weekday[0] !== weekday[1]) {
        console.log('week process:', passedSec, day, weekday);
        weekProcess(passedSec, day, weekday);
    }

    timeEffectHandle();  // 统一处理时间效果的事件与文本

    if (V.sleephour > 0 || T.livestock_sleep > 0) {
        sleepHandle('after');
    }
    else {
        timeRec.clearAll();
        delete V.sleeploop;
    }

    return '';
}

function minuteProcess(sec, min) {
    //-------------------------------------------------------------
    // 处理药物效果
    //-------------------------------------------------------------
    iCandy.DrugsProcess.minuteProcess(sec);

    //-------------------------------------------------------------
    // 处理额外效果
    //-------------------------------------------------------------
    const extraSense = R.extraSense;
    for (const [, sense] of Object.entries(extraSense)) {
        iCandy.senseUpdate(sense, sec);
    }

    console.log('minute process:', sec, min);

    //-------------------------------------------------------------
    // 其他每分钟处理
    //-------------------------------------------------------------
    if (sec < 60 && min <= 0) return;

    if (sec / 60 >= min) {
        min = Math.floor(sec / 60 + 0.5);
    }


    let mult = 1 + V.tiredness / C.tiredness.max;

    console.log('hunger and thirst process:', 'mult:', mult, 'min:', min);

    // 获得口渴值，口渴值受到疲劳的影响
    V.thirst = Math.clamp((V.thirst + min * mult).fix(2), 0, C.thirst.max);

    // 如果在雷米农场，饥饿值的增长速度大减
    if (F.getLocation() == 'livestock') {
        mult = 0.5;
    }

    // 获得饥饿值, 饥饿值受到疲劳的影响
    V.hunger = Math.clamp((V.hunger + min * mult).fix(2), 0, C.hunger.max);
}

function hourProcess(sec, hour) {
    //-------------------------------------------------------------
    // 检测药物戒断状态
    //-------------------------------------------------------------
    iCandy.DrugsProcess.hourProcess();

    //-------------------------------------------------------------
    // 检测普通成瘾品的戒断状态
    //-------------------------------------------------------------
    iCandy.DrugsProcess.hourProcess('general');

    //-------------------------------------------------------------
    // 其他每小时处理
    //-------------------------------------------------------------

    let mult = 50;

    // 睡眠时压力增长减缓
    if (V.sleephour > 0) {
        mult *= 0.5;
    }

    // 当饥饿值过高时，获得通知
    if (V.hunger >= C.hunger.max * 0.9) {
        wikifier('stress', 8, mult);
        timeRec.set('hungerstress', `${lanSwitch(sMsg.stateEffects.hungry)}<<gstress>><br>`);
    }

    // 当饥渴值过高时，获得通知
    if (V.thirst >= C.thirst.max * 0.9) {
        wikifier('stress', 8, mult);
        timeRec.set('thirststress', `${lanSwitch(sMsg.stateEffects.thirst)}<<gstress>><br>`);
    }

    // 当过度饥饿或过度口渴时，从睡眠中醒来。如果可能的话。
    if (V.hunger >= C.hunger.max * 0.95 || V.thirst >= C.thirst.max * 0.95) {
        if (T.sleepHoursTotal > 0) {
            timeRec.set('sleepinterrupt', '');
        }
    }

    // 随机减少商店库存，营造商店销售的假象
    for (const [key, shelf] of Object.entries(V.iShop)) {
        if (key == 'selected') {
            delete V.iShop.selected;
            continue;
        }
        else if (shelf.state == 'stocked') {
            shelf.stocks.forEach((item, key) => {
                const data = Items.get(item.id);
                if (!data) {
                    console.log('item not found:', item.id);
                    shelf.stocks.deleteAt(key);
                }
                else if (window.random(100) < 40) {
                    const sale = window.random(2, 6);
                    item.stock = Math.max(0, item.stock - sale);
                    item.count = Math.max(0, item.stock * data.num);
                }
            });
        }
    }
}


function dayProcess(sec, day, weekday) {
    //-------------------------------------------------------------
    // 集算当日嗑药情况
    //-------------------------------------------------------------
    iCandy.DrugsProcess.dayProcess();

    //-------------------------------------------------------------
    // 集算酒精、尼古丁、催情类物质的情况
    //-------------------------------------------------------------
    iCandy.DrugsProcess.dayProcess('general');

    //-------------------------------------------------------------
    // 集算当日事件
    //-------------------------------------------------------------
    iCandy.DrugsProcess.eventCount();
    iCandy.DrugsProcess.eventCount('general');

    //-------------------------------------------------------------
    // 其他每日处理
    //-------------------------------------------------------------
    if (R.robot.power > 0) {
        R.robot.power = Math.max(0, R.robot.power - 1);
    }

    R.flags.repairshop.today = 0;

    // 事件flag的清理
    const chinatown = iEvent.getFlag('chinatown');
    for (const key in chinatown) {
        if (key.includes('today')) {
            chinatown[key] = 0;
        }
    }

    // 商店上库存不足10的物品填充至50
    for (const [, shelf] of Object.entries(V.iShop)) {
        shelf.stocks.forEach(item => {
            const data = Items.get(item.id);
            if (item.stock <= 10) {
                item.stock = 50;
                item.count = item.stock * data.num;
            }
        });
    }
}


function weekProcess(sec, day, weekday) {
    // 事件flag的清理
    iEvent.setFlag('chinatown', 'goatweek', 0);
	
    // 清理商店的库存
    for (const [key, shelf] of Object.entries(V.iShop)) {
        if (key == 'selected') continue;
        shelf.state = 'clear';
        shelf.stocks = [];
        iShop.getshelf(key);
    }
}


function sleepHandle(mode) {
    if (!V.sleeploop) {
        V.sleeploop = 1;
    }
    
    if (mode == 'before') {
        V.sleeploop++ ;
        return;
    }

    const interrupt = timeRec.get('sleepinterrupt');
    if (interrupt > 1) {
        wikifier('exit');
    }
}

function timeEffectHandle() {
    const html = [];
    const { event } = TimeHandle;

    console.log('time effect handle:', clone(event));

    for (const [key, value] of Object.entries(event.flag)) {
        if (value.time > 1 && V.sleeploop > 0) {
            timeRec.unset(key);
            continue;
        }

        if (value.on == 1) {
            html.push(event.html[key]);
            value.times++;
            timeRec.unset(key);
        }
    }

    if (html.length > 0) {
        console.log('time effect handle html:', html);
        V.addMsg += `${html.join('')}<br>`;
    }
}

Object.defineProperties(window.iCandy, {
    timeRec       : { value : TimeHandle, writable : false },
    timeHandle    : { value : iTimeHandle, writable : false },
    minuteProcess : { value : minuteProcess, writable : false },
    hourProcess   : { value : hourProcess, writable : false },
    dayProcess    : { value : dayProcess, writable : false },
    weekProcess   : { value : weekProcess, writable : false },
    sleepHandle   : { value : sleepHandle, writable : false }
});

Object.defineProperties(window, {
    timeRec : { value : TimeHandle, writable : false }
});

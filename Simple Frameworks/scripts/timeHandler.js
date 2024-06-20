const oldPass = Time.pass;

const TimeHandle = {
    prevDate    : {},
    currentDate : {},
    passData    : null,

    events : {
        onSec    : [],
        onMin    : [],
        onHour   : [],
        onDay    : [],
        onWeek   : [],
        onMonth  : [],
        onBefore : [],
        onThread : [],
        onAfter  : []
    },

    /**
     * @description calculate the total passed days of the month
     * @param {number} current
     * @param {number} passed
     * @returns {number}
     */
    monthDays(current, passed) {
        const monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let days = monthDay[current - 1];

        for (let i = 0; i < passed; i++) {
            --current;
            if (current < 0) {
                current = 11;
            }
            days += monthDay[current - 1];
        }

        return days;
    },

    /**
     * @description calculate the total passed time
     * @param {DateTime} prev
     * @param {DateTime} current
     * @param {number} passedSec
     * @returns {{passed:number, sec:number, min:number, hour:number, day:number, month:number, year:number, weekday:number[]}}
     */
    passTime(prev, current, passedSec) {
        this.prevDate = prev;
        this.currentDate = current;

        const sec = passedSec;

        // calculate total passed minutes
        let min = current.minute - prev.minute;
        if (min < 0) {
            min += 60;
        }

        let hour = current.hour - prev.hour;
        if (hour < 0) {
            hour += 24;
        }

        let day = current.day - prev.day;
        if (day < 0) {
            day += prev.lastDayOfMonth;
        }

        let month = current.month - prev.month;
        const year = current.year - prev.year;

        // backward calculation if the current less or equal to the previous but the passed time is greater than 0
        if (year > 0 && current.month - prev.month <= 0) {
            month += 12 * year;
        }
        if (month > 0 && current.day - prev.day <= 0) {
            day = this.monthDays(current.month, month) + day;
        }
        if (day > 0 && hour === 0) {
            hour = 24 * day;
        }
        if (hour > 0 && min === 0) {
            min = 60 * hour;
        }

        let week = 0;
        if (day > 0 && current.weekDay <= prev.weekDay) {
            week = 1 + Math.floor(day / 7);
        }

        return {
            passed  : passedSec,
            sec,
            min,
            hour,
            day,
            month,
            year,
            weekday : [prev.weekDay, current.weekDay],
            week
        };
    },

    set(type, eventData) {
        this.events[type].push(eventData);
    },

    get(type) {
        return this.events[type];
    },

    run(type, timeData = {}) {
        for (const eventData of this.events[type]) {
            if (typeof eventData.cond === 'function' && eventData.cond(timeData) === false) {
                continue;
            }

            eventData.func(timeData);
        }
    },

    /**
     * @description forward or backward the time
     * @param {{min:number, hour:number, day:number, month:number, year:nun=mber}} option
     * @param {boolean} backward
     */
    timeTravel(option,  backward = false) {
        const { min = 0, hour = 0, day = 0, month = 0, year = 0 } = option;
        let passed = min * 60 + hour * 3600 + day * 86400 + month * 2592000 + year * 31536000;
        if (backward) {
            passed = -passed;
        }

        let stamp = V.timeStamp + passed;
        if (stamp < 0) {
            V.startDate += stamp;
            stamp = 0;
        }

        Time.set(stamp);
    }
};

Time.pass = function (passtime) {
    // initialize the time data
    const prevDate = new DateTime(V.startDate + V.timeStamp);
    const passData = Object.seal({
        passed    : passtime,
        timeStamp : V.timeStamp,

        prev   : Object.freeze(prevDate),
        option : {},

        current() {
            let passed = this.passed;
            const stamp = this.timeStamp;
            console.log('[SFDebug/timeHandle] passed:', passed, 'stamp:', stamp);

            if (typeof passed !== 'number' || isNaN(passed)) {
                passed = 0;
            }

            return new DateTime(V.startDate + stamp + passed);
        }
    });
    TimeHandle.passData = passData;
    console.log('[SFDebug/timeHandle] passData:', TimeHandle.passData);

    if (TimeHandle.get('onBefore').length > 0) {
        TimeHandle.run('onBefore', passData);
    }

    // double check the passed time
    const passed = Number(String(passData.passed));
    if (isNaN(passed) === false && passed >= 0) {
        passtime = passed;
    }

    // do the original time pass
    const fragment = oldPass(passtime) || '';

    // get the current date
    const currentDate = Time.date;

    console.log('[SFDebug/timeHandle] passed time:', passtime);
    console.log('[SFDebug/timeHandle] prevDate:', prevDate);
    console.log('[SFDebug/timeHandle] currentDate:', currentDate);

    const timeData = TimeHandle.passTime(prevDate, currentDate, passtime);
    timeData.prev = prevDate;
    timeData.current = currentDate;
    timeData.option = passData.option;

    const { sec, min, hour, day, month, year, weekday, week } = timeData;

    console.log(
        '[SFDebug/timeHandle] timedata:\n',
        `sec: ${sec}\n`,
        `min: ${min}\n`,
        `hour: ${hour}\n`,
        `day: ${day}\n`,
        `month: ${month}\n`,
        `year: ${year}\n`,
        `weekday: ${weekday}\n`,
        `passed: ${passed}\n`
    );

    if (TimeHandle.get('onThread').length > 0) {
        TimeHandle.run('onThread', timeData);
    }

    if (passtime <= 0) return fragment;

    // check sec events
    if (TimeHandle.get('onSec').length > 0) {
        TimeHandle.run('onSec', timeData);
    }

    // check min events
    if (TimeHandle.get('onMin').length > 0 && (min > 0 || passtime / 60 >= 1)) {
        TimeHandle.run('onMin', timeData);
    }

    // check hour events
    if (TimeHandle.get('onHour').length > 0 && (hour > 0 || passtime / 3600 >= 1)) {
        TimeHandle.run('onHour', timeData);
    }

    // check day events
    if (TimeHandle.get('onDay').length > 0 && (day > 0 || passtime / 86400 >= 1)) {
        TimeHandle.run('onDay', timeData);
    }

    // check week events
    if (TimeHandle.get('onWeek').length > 0 && (week > 0 || passtime / 604800 >= 1)) {
        TimeHandle.run('onWeek', timeData);
    }

    // check month events
    if (TimeHandle.get('onMonth').length > 0 && month > 0) {
        TimeHandle.run('onMonth', timeData);
    }

    // check after events
    if (TimeHandle.get('onAfter').length > 0) {
        TimeHandle.run('onAfter', timeData);
    }

    return fragment;
};

class TimeEvent {
    constructor(type, eventId) {
        this.type = type;
        this.eventId = eventId;

        this.cond = () => true;
        this.func = () => {};

        TimeHandle.set(type, this);
    }

    Cond(func) {
        this.cond = func;
        return this;
    }

    Action(func) {
        this.func = func;
        return this;
    }
}


Object.defineProperties(window, {
    TimeEvent  : { value : TimeEvent },
    TimeHandle : { get : () => TimeHandle }
});

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

    passTime(prev, current, passedSec) {
        this.prevDate = prev;
        this.currentDate = current;

        const sec = passedSec % 60;

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

        return {
            passed  : passedSec,
            sec,
            min,
            hour,
            day,
            month,
            year,
            weekday : [prev.weekDay, current.weekDay]
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
    }
};

Time.pass = function (passtime) {
    // initialize the time data
    const prevDate = new DateTime(V.startDate + V.timeStamp);
    const passData = Object.seal({
        passed : passtime,
        prev   : Object.freeze(prevDate),
        option : {},

        current() {
            let passed = this.passed;
            console.log('passed:', passed);

            if (typeof passed !== 'number' || isNaN(passed)) {
                passed = 0;
            }

            return new DateTime(V.startDate + V.timeStamp + passed);
        }
    });
    TimeHandle.passData = passData;
    console.log('passData:', TimeHandle.passData);

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

    console.log('passed time:', passtime);
    console.log('prevDate:', prevDate);
    console.log('currentDate:', currentDate);

    const timeData = TimeHandle.passTime(prevDate, currentDate, passtime);
    timeData.prev = prevDate;
    timeData.current = currentDate;
    timeData.option = passData.option;

    const { sec, min, hour, day, month, year, weekday } = timeData;

    console.log(
        'time handle data:\n',
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
    if (TimeHandle.get('onWeek').length > 0 &&
        (weekday[1] < weekday[0] || passtime / 604800 >= 1)
    ) {
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


new TimeEvent('onDay', 'NewYear')
    .Cond(timeData => timeData.current.month === 1 && timeData.current.day === 1)
    .Action(timeData => {
        console.log('Happy New Year!', timeData);
    });

TimeHandle.set('onAfter', {
    eventId : 'AfterEvent',
    func(timeData) {
        // do something after the time pass
        console.log('After event:', timeData);
    },
    cond(timeData) {
        // check the condition before the event
        console.log('After event condition:', timeData);
        return true;
    }
});

Object.defineProperties(window, {
    TimeEvent  : { value : TimeEvent },
    TimeHandle : { get : () => TimeHandle }
});

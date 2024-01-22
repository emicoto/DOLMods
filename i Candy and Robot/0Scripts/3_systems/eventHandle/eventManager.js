class EventData {
    /**
     * @param {'Event' | 'Chara' | 'Scene' | 'Action' | 'Patch'} type
     * @param {string} episode
     * @param  {...string} args
     */
    constructor(type, episode, ...args) {
        this.type = type;
        this.episode = episode;
        this.args = args;
    }

    /**
     * @description set the trigger passage of this event
     * entry, the entry passage of this event
     * keys, the matched keys of passage title which will trigger this event
     * keysNum, the number of required matched keys, if not set, will be keys.length
     * titleMatch, the regexp to match passage title which will trigger this event
     * @param { {entrypassage: string, keysearch: string[], keynum: number, titlematch: RegExp } } trigger
     */
    Trigger(trigger) {
        if (trigger.entry) {
            this.entry = trigger.entry;
        }
        if (trigger.keys) {
            this.keys = trigger.keys;
        }
        if (trigger.keysNum) {
            this.keysNum = trigger.keysNum;
        }
        if (trigger.titleMatch) {
            this.titleMatch = trigger.titleMatch;
        }
        return this;
    }

    /**
     * @description set the requirement of this event
     * @param {function} require
     * @returns {EventData}
     */
    Require(require) {
        this.require = require;
        return this;
    }

    /**
     * @description set the command on event next button
     * @param {string} nextcode
     * @returns {EventData}
     */
    Next(nextcode) {
        this.eventnext = true;
        this.nextcode = nextcode;
        return this;
    }

    /**
     * @description set the command on event init
     * @param {string | function} init
     * @returns {EventData}
     */
    onInit(init) {
        this.init = init;
        return this;
    }

    /**
     * @description set the command on event end
     * @param {string | function} end
     * @returns {EventData}
     */
    onEnd(end) {
        this.end = end;
        return this;
    }

    /**
     * @description set the command on event skip
     * @param {string | function} skip
     * @returns {EventData}
     */
    onSkip(skip) {
        this.skip = skip;
        return this;
    }

    /**
     * @description set phase of this event
     * @param {number} phase
     * @returns {EventData}
     */
    Phase(phase) {
        this.phase = phase;
        return this;
    }

    /**
     * @description set event exit
     * @param {string} exit
     * @returns {EventData}
     */
    Exit(exit) {
        this.exit = exit;
        return this;
    }

    /**
     * @description set as onetime event
     * @returns {EventData}
     */
    isOnetime() {
        this.onetime = true;
        return this;
    }

    /**
     * @description set the series of this event
     * @param {string} series
     * @returns {EventData}
     */
    Series(series) {
        this.series = series;
        return this;
    }

    /**
     * @description set the location of this event
     * @param {string} location
     * @returns {EventData}
     */
    Location(location) {
        this.location = location;
        return this;
    }

    /**
     * @description set the branches of this event
     * @param {...string} branches
     * @returns {EventData}
     */
    Branch(...branches) {
        this.branch = branches;
        return this;
    }

    /**
     * @description set the priority of this event
     * @param {number} priority
     * @returns {EventData}
     */
    Priority(priority) {
        this.priority = priority;
        return this;
    }

    /**
     * @description set the action of this event
     * @param {function} action
     * @returns {EventData}
     */
    Action(action) {
        this.action = action;
        return this;
    }

    /**
     * @description set the character of this event
     * @param {string} character
     * @returns {EventData}
     */
    Character(character) {
        this.character = character;
        return this;
    }

    /**
     * @description set the scene stage of this event
     * @param {string} baseScene
     * @returns {EventData}
     */
    Stage(baseScene) {
        this.stage = baseScene;
        return this;
    }

    /**
     * @description set the destination of this event
     * @param {string} destination
     * @returns {EventData}
     */
    Toward(destination) {
        this.toward = destination;
        return this;
    }

    /**
     * @description fast unset the event at next button
     */
    unsetAtNext() {
        this.eventnext = true;
        this.nextcode = '<<=iEvent.unsetEvent()>>';
        return this;
    }
}

class iListener {
    constructor(eventId, obj) {
        this.eventId = eventId;
        this.passage = obj.passage;
        this.watchvar = obj.watchvar;
        this.runningPoint = obj.runningPoint;
        this.onInit = obj.onInit;
        this.onDisplay = obj.onDisplay;
    }
}

const iEvent = {
    //----------------------------------------------------------------
    //
    //  Database
    //
    //----------------------------------------------------------------
    /**
     * @type { {
     *  chara: Object.<string, EventData[]>,
     *  location: Object.<string, EventData[]>,
     *  scene: Object.<string, EventData[]>,
     *  event: Object.<string, EventData[]>,
     * }}
     */
    data : {
        chara    : {},
        scene    : {},
        event    : {},
        location : {},
        global   : {}
    },
    /**
     * @type { {
     *  [passage: string]: {
     *     [widgetname: string]: function
     * }
     * }}
     */
    widget : {},

    /**
     * @type {
     * [eventId: string] : {
     *    passage: string[],
     *    watchvar: string[],
     *    runningPoint: string,
     *    event: function
     * }}
     */
    listener : {},

    /**
     * @description sort by priority, make sure non-priority property is at the end
     * @param {*} data
     */
    sort(data) {
        data.sort((a, b) => {
            if (a.priority == undefined) {
                return 1;
            }
            if (b.priority == undefined) {
                return -1;
            }
            return a.priority - b.priority;
        });
    },

    //----------------------------------------------------------------
    //
    //  register
    //
    //----------------------------------------------------------------
    /**
     * @description resister event data for static location event
     * @param {string} series
     * @param  {EventData[]} events
     */
    add(series, ...events) {
        if (!this.data.scene[series]) {
            this.data.scene[series] = [];
        }
        events.forEach(event => {
            event.Series(series);
            this.data.scene[series].push(event);
        });

        this.sort(this.data.scene[series]);
    },
    /**
     * @description resister event data for dynamic location event
     * @param {string} location
     * @param  {EventData[]} events
     */
    addGlobal(type, ...events) {
        events.forEach(event => {
            event.type = type;
            this.data.global.push(event);
        });
    },
    /**
     * @description resister event data to selected type
     * @param {'chara' | 'scene' | 'event' | 'location' | 'global'} type
     * @param {string} series
     * @param  {EventData[]} events
     */
    addTo(type, series, ...events) {
        if (!this.data[type]) throw new Error(`illegal event type: ${type}`);

        if (!this.data[type][series]) {
            this.data[type][series] = [];
        }
        this.data[type][series].push(...events);
        
        this.sort(this.data[type][series]);
    },

    /**
     * get event data from database
     * @param {'chara' | 'scene' | 'event' | 'location' | 'global'} type
     * @param {string} series
     * @returns {EventData[]}
     */
    get(type, series) {
        return series ? this.data[type][series] : this.data[type];
    },

    /**
     * @description resister a dynamic widget to a passage
     * @param {string} passage
     * @param {string} widgetname
     * @param {function} widget
     */
    addWidget(passage, widgetname, widget) {
        if (!this.widget[passage]) {
            this.widget[passage] = {};
        }
        this.widget[passage][widgetname] = widget;
    },
    /**
     * @description get a dynamic widget from a passage
     * @param {string} passage
     * @param {string} widgetname
     * @returns {function}
     */
    getWidget(passage, widgetname) {
        return this.widget[passage][widgetname];
    },

    /**
     * @description resister a listener to a event system
     * @param {string} eventId
     * @param { {
     *  passage: string[],
     *  watchvar: string[],
     *  runningPoint: string,
     *  onInit: function,
     *  onDisplay : function,
     * }} obj
     */
    addListener(eventId, obj) {
        this.listener[eventId] = obj;
    },

    //----------------------------------------------------------------
    //
    //  short cuts
    //
    //----------------------------------------------------------------
    /**
     * @description initialize event flags
     * @param {string} series
     * @param {string} flag
     */
    initFlag(series, flag) {
        if (!V.eFlags[series]) {
            V.eFlags[series] = {};
        }

        if (!V.eFlags[series][flag]) {
            V.eFlags[series][flag] = 0;
        }
    },

    /**
     * @description set event flag
     * @param {string} series
     * @param {string} flag
     * @param {number} value
     * @returns {number}
     */
    setFlag(series, flag, value) {
        this.initFlag(series, flag);
        V.eFlags[series][flag] = value;
        return value;
    },

    /**
     * @description get event flag
     * @param {string} series
     * @param {string} flag
     * @returns {object | number}
     */
    getFlag(series, flag) {
        this.initFlag(series, flag);
        return flag ? V.eFlags[series][flag] : V.eFlags[series];
    },

    /**
     * @description add value to event flag
     * @param {string} series
     * @param {string} flag
     * @param {number} value
     */
    addFlag(series, flag, value) {
        this.initFlag(series, flag);
        V.eFlags[series][flag] += value;
        return V.eFlags[series][flag];
    },

    //----------------------------------------------------------------
    //
    //  event handlers
    //
    //----------------------------------------------------------------

};



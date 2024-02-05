class SceneData {
    /**
     * when the event is a branch, the eventId is the branchId
     * @param {string} eventId
     * @param {'main' | 'branch'} type
     * @param {string} parent
     */
    constructor(eventId, type = 'main', parent) {
        /**
         * @type {'main' | 'branch'}
         */
        this.type = type;
        if (parent) {
            this.eventId = eventId;
            this.parent = parent;
        }
        else {
            this.eventId = eventId;
        }
        this.triggerType = 'scene';
        this.priority = 0;
        this.flagfields = [];
        /**
         * @type {SceneData[]}
         */
        this.branches = [];
        this.actions = {};
        this.playType = 'scene';
        /**
         * @type {number}
         */
        this.totalPhase = 0;
    }
    /**
     * @param {SceneData} obj
     * @returns {SceneData}
     */
    assign(obj) {
        for (const key in obj) {
            this[key] = clone(obj[key]);
        }
        return this;
    }

    /**
     * @param {string} prop
     * @param {*} value
     * @returns {SceneData}
     */
    set(prop, value) {
        this[prop] = value;
        return this;
    }

    /**
     * @param {{
     * type: 'entry' | 'action' | 'localAction' |'scene' | 'cond',
     * location: string[],
     * cond: function
     * }} trigger
     * @returns {SceneData}
     */
    Trigger(trigger) {
        this.triggerType = trigger.type;
        this.triggerOptions = trigger;
        return this;
    }

    Flag(...fields) {
        this.flagfields = fields;
        return this;
    }
    /**
     * @param {function} callback
     * @returns {SceneData}
     */
    Cond(callback) {
        this.cond = callback;
        return this;
    }

    Character(...chara) {
        this.character = chara;
        return this;
    }

    Branches(...branches) {
        branches.forEach(branch => {
            const data = new SceneData(branch.name, 'branch', this.eventId);
            data.assign(branch);
            this.branches.push(data);
        });
        return this;
    }

    RandomBranch(size = 2) {
        this.randomBranch = size;
        return this;
    }

    Action(action, arg) {
        if (action.has('next')) {
            this.nextButton = true;
        }

        this.actions[action] = arg;

        return this;
    }

    /**
     * @description set event exit
     * @param {string} exit
     * @param {string | language} displaylink
     * @returns {SceneData}
     */
    Exit(exitPassage, displaylink) {
        this.exit = exitPassage;
        this.leaveLink = displaylink;
        return this;
    }

    PlayType(type, arg) {
        this.playType = type;

        if (arg) {
            if (type == 'scene') {
                const passage = iMap.getScenePassage(arg);
                if (passage) {
                    this.jumpToward = passage;
                    this.stage = arg;
                }
                else {
                    this.jumpToward = `Scene ${arg}`;
                }
            }
            else if (type == 'jump') {
                this.jumpToward = `Event ${arg}`;
            }
        }
        return this;
    }

    Setting(setting) {
        for (const key in setting) {
            this[key] = setting[key];
        }
        return this;
    }

    Jump(fulltitle) {
        this.jumpToward = fulltitle;
        return this;
    }

    /**
     * @description set the location of this event
     * @param {...string} location
     * @returns {SceneData}
     */
    Location(...location) {
        this.location = location;
        return this;
    }

    /**
     * find the parent series of this event
     * @returns {SeriesData}
     */
    findSeries() {
        return iEvent.getData(this.entryPoint, this.seriesId, this.parent);
    }

    // sort branches by priority, higher priority first
    sortBranches() {
        this.branches.sort((a, b) => b.priority - a.priority);
    }

    // get available branch Id, if no branch available, return false
    getBranchId() {
        if (this.randomBranch) {
            return `No${random(1, this.randomBranch)}`;
        }

        for (let i = 0; i < this.branches.length; i++) {
            if (this.branches[i].cond()) {
                return this.branches[i].eventId;
            }
        }
        return false;
    }

    // get available branch, if no branch available, return false
    getBranch() {
        if (this.randomBranch) {
            return `No${random(1, this.randomBranch)}`;
        }

        const branchId = this.getBranchId();
        if (branchId) {
            return this.branches.find(branch => branch.eventId == branchId);
        }
        return false;
    }
}

class ActionData {
    /**
     * @param {string} actionId
     * @param {string} targetPassage
     */
    constructor(actionId, targetPassage) {
        this.id = actionId;
        this.type = 'action';
        this.target = targetPassage;
        this.displayname = {};
    }

    Cond(callback) {
        this.cond = callback;
        return this;
    }

    Display(...displayName) {
        if (typeof displayName[0] == 'object' && String(displayName[0]) == '[object Object]') {
            this.displayname = displayName[0];
            return this;
        }
        else if (Array.isArray(displayName[0])) {
            displayName = displayName[0];
        }

        const lang = ['EN', 'CN', 'JP'];
        displayName.forEach((name, index) => {
            this.displayname[lang[index]] = name;
        });
        return this;
    }

    Action(tweecode = '') {
        this.actionCode = tweecode;
    }

    Location(...location) {
        this.location = location;
        return this;
    }
}

class SeriesData {
    /**
     * @param {string} seriesId
     * @param {'passage' | 'chara' | 'scene' | 'state' | 'time'} event
     */
    constructor(seriesId, event) {
        this.id = seriesId;
        this.entryPoint = event;
        this.events = [];
    }

    //----------------------------------------------------------------
    //
    // Setting Functions
    //
    //----------------------------------------------------------------
    add(...events) {
        events.forEach(event => {
            const eventData = this.initData(event);

            if (eventData.type == 'branch' && eventData.parent) {
                try {
                    const parent = this.get(eventData.parent);
                    parent.branches.push(eventData);
                    parent.sortBranches();
                }
                catch (e) {
                    console.warn(`Parent Event ${eventData.parent} not found when adding branch ${eventData.eventId} to series ${this.id}, waiting for parent to be added.`);
                    this.events.push(eventData);
                }
            }
            else {
                this.events.push(eventData);
            }
        });
        return this;
    }

    initData(data) {
        let newData;

        if (data instanceof SceneData) {
            newData = data;
        }
        else {
            newData = new SceneData(data.eventId, data.type);
            newData.assign(data);
        }

        newData.seriesId = this.id;
        newData.entryPoint = this.entryPoint;

        if (this.entryPoint == 'chara') {
            this.initChara(newData);
        }

        return newData;
    }

    initChara(data) {
        if (!data.character) {
            data.character = [this.id];
        }
        else if (data.character.includes(this.id) == false) {
            data.character.push(this.id);
        }
    }

    get(id) {
        return this.events.find(event => event.eventId == id);
    }

    // sort the events by priority, higher priority first
    sort() {
        this.events.sort((a, b) => b.priority - a.priority);
    }
}


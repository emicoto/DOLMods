class SceneData {
    /**
     * when the event is a branch, the eventId is the branchId
     * @param {string} eventId
     * @param {EventType} type
     * @param {string} parent
     */
    constructor(eventId, type = 'Event', parent = '') {
        /**
         * @type {eventFormat}
         */
        this.format = 'main';
        this.seriesId = 'common';

        if (parent !== '') {
            this.eventId = eventId;
            this.parent = parent;
            this.format = 'branch';
        }
        else {
            this.eventId = eventId;
        }
        this.type = type;
        /**
         * @type {TriggerType}
         */
        this.triggerType = 'scene';
        this.priority = 0;
        this.flagfields = [];
        this.branches = [];
        this.actions = {};
        this.maxPhase = 0;
    }

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
     * @param {EventType} type
     * @returns {SceneData}
     */
    Type(type) {
        this.type = type;
        return this;
    }

    /**
     * @param {triggerOption} trigger
     * @returns {SceneData}
     */
    Trigger(trigger) {
        this.triggerType = trigger.type;
        delete trigger.type;

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
            if (branch.name) {
                branch.eventId = branch.name;
                delete branch.name;
            }
            const data = new SceneData(branch.eventId, this.type, 'branch', this.eventId);
            data.assign(branch);
            data.playType = this.playType;
            data.triggerType = 'branch';
            this.branches.push(data);
        });
        return this;
    }

    RandomBranch(size = 2) {
        this.randomBranch = size;
        return this;
    }

    /**
     * @param {actionType} action
     * the X should be number or branchId
     * @param {function | string} arg the string should be twee code
     * @returns {SceneData}
     */
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
    /**
     * @param {'scene' | 'jump' | 'local'} type
     * @param {string} arg
     * @returns {SceneData}
     */
    PlayType(type, arg) {
        this.playType = type;

        if (arg) {
            this.playArg = arg;
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

    // get a branch by random
    getRandomBranch() {
        if (this.branches.length == 0) {
            return `No${Random(1, this.randomBranch)}`;
        }
        return this.branches[Random(0, this.branches.length - 1)];
    }

    /**
     * get available branch, if no branch available, return false
     * @returns {string | SceneData | false}
     */
    getBranch() {
        if (this.randomBranch) {
            return `No${Random(1, this.randomBranch)}`;
        }

        for (let i = 0; i < this.branches.length; i++) {
            if (this.branches[i].cond()) {
                return this.branches[i];
            }
        }
        return false;
    }

    findBranch(id) {
        return this.branches.find(branch => branch.eventId == id);
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

            if (eventData.format == 'branch' && eventData.parent) {
                try {
                    const parent = this.get(eventData.parent);
                    parent.branches.push(eventData);
                    parent.sortBranches();
                }
                catch (e) {
                    console.warn(`Parent Event ${eventData.parent} not found when adding branch ${eventData.eventId} to series ${this.id}, waiting for parent to be added.`);
                    console.warn(e);
                    this.events.push(eventData);
                }
            }
            else {
                this.events.push(eventData);
            }
        });
        return this;
    }

    /**
     * @param {SceneData | object} data
     * @returns {SceneData}
     */
    initData(data) {
        let newData;

        if (data instanceof SceneData) {
            newData = data;
        }
        else {
            newData = new SceneData(data.eventId, data.type, data.format, data.parent);
            newData.assign(data);
        }

        newData.seriesId = this.id;
        newData.entryPoint = this.entryPoint;

        if (this.entryPoint == 'chara') {
            this.initChara(newData);
        }
        else {
            this.initDataType(newData);
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

        data.type = 'Chara';
    }

    // eslint-disable-next-line class-methods-use-this
    initDataType(data) {
        if (data.playType) return;

        switch (this.entryPoint) {
        case 'passage':
            data.playType = 'jump';
            break;
        case 'chara':
            data.playType = 'local';
            break;
        default:
            data.playType = 'scene';
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

class Scene {
    /**
     * @param {string} type
     * @param {SceneData} data
     */
    constructor(type = 'Scene', title, data = null) {
        this.type = type;
        this.baseTitle = title;
        this.data = data;

        if (this.data == null && V.stage) {
            this.stage = V.stage;
            this.fullTitle = `Scene ${V.stage} ${title}`;
        }

        this.startTime = V.timeStamp;
        this.exit = V.passage;
    }

    //----------------------------------------------------------------
    // initialize
    //----------------------------------------------------------------
    initSource(data) {
        const source = new SceneData(data.eventId, data.type, data.format, data.parent);
        source.assign(data);
        this.data = source;
    }

    initData() {
        const data = this.data;
        if (!data) return this;
        // make a backup of the source data
        this.source = clone(data);

        // init source data
        this.initSource(data);

        this.type = data.type;
        this.seriesId = data.seriesId;
        this.eventId = data.eventId;
        this.entryPoint = data.entryPoint;

        if (data.availableBranch) {
            this.initBranch(data.availableBranch);
        }

        this.initStage(data);

        this.startTime = V.timeStamp;
        this.exit = data.exit || V.passage;
        this.maxPhase = data.maxPhase || 0;

        return this;
    }

    /**
     * @description init the stage and base title of the scene
     */
    initStage(data) {
        // if has arg but not local
        if (data.playArg && data.playType !== 'local') {
            this.stage = this.getStage(data, data.playArg);
        }
        // no arg
        else {
            if (data.playType == 'jump') {
                this.stage = this.getStage(data);
            }
            else {
                const location = iMap.getFullStage(data.seriesId);
                if (location) {
                    this.location = data.seriesId.replace(/\s/g, '');
                    this.stage = location;
                }
                else if (V.stage) {
                    this.stage = iMap.getFullStage(V.stage);
                }
            }
        }
        this.baseTitle = this.combineTitle();
    }

    /**
     * @description check and init if the scene has branch data
     */
    initBranch(branch) {
        if (typeof branch == 'string') {
            this.branch = [branch];
        }
        else if (typeof branch == 'object') {
            const data = branch;

            this.branch = [data.eventId];
            this.data.assign(data);
            delete this.data.availableBranch;
        }
    }

    /**
     * @description on event initialize
     */
    Init() {
        const { character, actions } = this.data;
        // if has characters
        if (character) {
            character.forEach(chara => {
                wikifier('npc', chara);
            });

            wikifier('person1');
        }

        if (actions.before) {
            if (typeof actions.before == 'function') {
                actions.before();
            }
            else {
                new Wikifier(null, actions.before);
            }
        }
    }

    //----------------------------------------------------------------
    // util functions
    //----------------------------------------------------------------
    /**
     * get the stage title
     * @param {SceneData} data
     * @param {string} arg
     * @returns {string}
     */
    getStage(data, arg) {
        const location = iMap.getFullStage(arg);
        if (location) {
            this.location = arg;
            return location;
        }

        if (arg) {
            return `Stage ${arg}`;
        }

        if (data.jumpToward) {
            return data.jumpToward;
        }

        return this.combineTitle();
    }

    /**
     * combine the base title of the scene
     * @returns {string}
     */
    combineTitle() {
        const { type, eventId, seriesId } = this;
        let title = type;
        if (seriesId !== 'common') {
            if (this.data.entryPoint == 'passage') {
                title += ` ${seriesId.replace(/\s/g, '')}`;
            }
            else {
                title += ` ${seriesId}`;
            }
        }
        if (eventId) {
            title += ` ${eventId}`;
        }
        return title;
    }

    /**
     * get the full title of the scene
     * @param {1 | true} stage
     * @returns {string}
     */
    getFullTitle(stage = null) {
        let title = this.baseTitle;
        const phase = this.maxPhase || 0;

        if (this.branch) {
            title += ` ${this.branch.join(' ')}`;
            this.current = this.branch[this.branch.length - 1];
        }

        if (phase > 0 && V.phase < phase && stage == null) {
            title = `${title} ${V.phase + 1}`;
            console.log(`Phase ${V.phase + 1} of ${phase}`, this.baseTitle);
        }

        return title;
    }

    /*
    * get the language of the scene
    * @returns {string}
    */
    getLanguage() {
        const fullTitle = this.getFullTitle();

        if (Story.has(`${fullTitle} ${setup.language}`)) {
            return `${fullTitle} ${setup.language}`;
        }

        // if has default language
        if (Story.has(`${fullTitle} CN`)) {
            return `${fullTitle} CN`;
        }

        if (Story.has(`${fullTitle} EN`)) {
            return `${fullTitle} EN`;
        }

        return fullTitle;
    }

    /**
     * init the data from the branch
     * @param {SceneData} branch
     * @returns
     */
    initBranchData(branch) {
        if (!branch) {
            const current = this.branch[this.branch.length - 1];
            branch = this.data.findBranch(current);
        }
        if (!branch) return;

        this.initSource(this.source);
        
        const list = ['maxPhase', 'actions', 'flagfields', 'character', 'exit', 'leaveLink', 'eventId', 'parent'];

        for (const key of list) {
            if (typeof data[key] !== 'undefined') {
                this.data[key] = data[key];
            }
        }

        this.data.format = 'branch';
        this.maxPhase = this.data.maxPhase;
    }

    /**
     * restore the scene to the source data
     */
    restore() {
        this.initSource(this.source);
        this.maxPhase = this.source.maxPhase;
    }
}

class Scene {
    /**
     * @param {string} type
     * @param {SceneData} data
     */
    constructor(type = 'Scene', title, data = null) {
        this.type = type;
        this.baseTitle = title;
        this.data = data;

        if (this.data == null) {
            this.stage = V.currentStage;
            this.fullTitle = `Scene ${V.currentStage} ${title}`;
        }

        this.startTime = V.timeStamp;
        this.exit = V.passage;
    }

    InitData() {
        const data = this.data;
        if (!data) return this;

        this.type = data.eventType;
        this.series = data.seriesId;

        if (data.jumpToward) {
            this.jump = true;
            this.toward = data.jumpToward;
            this.baseTitle = data.jumpToward;
        }
        else {
            this.baseTitle = this.combineTitle();
        }

        if (data.stage) {
            this.stage = data.stage;
        }
        else if (data.playType !== 'jump') {
            this.stage = V.currentStage;
        }

        if (data.availableBranch) {
            this.initBranch(data.availableBranch);
        }

        this.startTime = V.timeStamp;
        this.exit = data.exit || V.passage;

        return this;
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
        }
    }

    /**
     * @description on event initialize
     */
    Init() {
        // if has characters
        if (this.data.character) {
            this.data.chara.forEach(chara => {
                wikifier('npc', chara);
            });
        }
    }
}

/**
 * @class iEvent
 * @typedef { object } iEvent
 */
const iEvent = {

    //---------------------------------------------
    //
    // event data
    //
    //---------------------------------------------
    data : {
        chara : {},
        scene : {},

        time  : {},
        state : {},

        passage : {}
    },

    action : {
        scene   : {},
        chara   : {},
        passage : {}
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

    patch : {},

    // sort all series data
    sortData(data) {
        if (data instanceof SeriesData) {
            data.sort();
            return;
        }

        if (typeof data == 'object' && String(data) == '[object Object]') {
            for (const key in data) {
                this.sort(data[key]);
            }
        }
    },

    //---------------------------------------------
    //
    // event register
    //
    //---------------------------------------------
    /**
     * @param {string} charaId
     * @returns {SeriesData}
     */
    onChara(charaId) {
        if (!this.data.chara[charaId]) {
            this.data.chara[charaId] = new SeriesData(charaId, 'chara');
        }
        return this.data.chara[charaId];
    },

    /**
     * @param {string} sceneId
     * @returns {SeriesData}
     */
    onScene(sceneId = 'common') {
        if (!this.data.scene[sceneId]) {
            this.data.scene[sceneId] = new SeriesData(sceneId, 'scene');
        }
        return this.data.scene[sceneId];
    },

    /**
     * @param {'scene' | 'chara' | 'passage'} type
     * @param {string} id
     */
    onLink(type, id) {
        if (!this.action[type]) {
            throw new Error(`not valid type: ${type}`);
        }
        if (!this.action[type][id]) {
            this.action[type][id] = new SeriesData(id, type);
        }
        return this.action[type][id];
    },

    onTime(timeType = 'common') {
        if (!this.data.time[timeType]) {
            this.data.time[timeType] = new SeriesData(timeType, 'time');
        }
        return this.data.time[timeType];
    },

    /**
     * @param {string} stateType
     * @returns {SeriesData}
     */
    onState(stateType) {
        if (!this.data.state[stateType]) {
            this.data.state[stateType] = new SeriesData(stateType, 'state');
        }
        return this.data.state[stateType];
    },

    onPassage(passage) {
        if (!this.data.passage[passage]) {
            this.data.passage[passage] = new SeriesData(passage, 'passage');
        }
        return this.data.passage[passage];
    },

    /**
     * get the data of the event or series
     * @param {'chara' | 'scene' |'time' | 'state' | 'passage'} entryPoint
     * @param {string} seriesId
     * @param {string} eventId
     * @returns {SeriesData | SceneData}
     */
    getData(entryPoint, seriesId, eventId) {
        if (entryPoint == 'time') {
            seriesId = 'common';
        }
        
        if (!seriesId && !eventId) {
            return this.data[entryPoint];
        }

        const series = this.data[entryPoint][seriesId];
        // if not event input but not found the series data, just return;
        if (!series && !eventId) {
            return;
        }
        // if event input but not found the series data, throw error;
        else if (!series) {
            throw new Error(`no series found, entryPoint:${entryPoint}, seriesId: ${seriesId}, eventId: ${eventId}`);
        }

        return eventId !== undefined ? series.get(eventId) : series;
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
        if (!this.widget[passage]) {
            return;
        }
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

    /**
    * @description patch a content to extra area on certain passage
    * @param {string} passage
    * @param {string | function} message
    */
    patchTo(passage, message) {
        if (!this.patch[passage]) {
            this.patch[passage] = [];
        }
       
        this.patch[passage].push(message);
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

        if (flag && !V.eFlags[series][flag]) {
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
        this.initFlag(series);
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
        this.initFlag(series);
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
    //  Event Handle
    //
    //----------------------------------------------------------------
    /**
     * @description on patch passage. if has patch, append to extra area
     */
    onPatch() {
        const passage = V.passage;
        let patchId = 'addAfterMsg';

        if (!this.patch[passage]) return;

        // get the current display html
        const displayhtml = document.getElementById('passage-content').innerHTML;

        // if the current display html has no extra area, then create one
        if (V.combat == 0 && displayhtml.has('Places of Interest', 'Places of interest', 'Points of Interest', '可访问地点') == false) {
            htmlTools.appendPatch();
            patchId = 'patchContent';
        }

        this.patch[passage].forEach(content => {
            const html = typeof content == 'function' ? content() : content;
            setTimeout(() => {
                new Wikifier(null, `<<append #${patchId}>>${html}<<</append>>`);
            }, 60);
        });
    },

    /**
     * @description fast set a scene event without init,
     * only work in the stage passage
     * @param {string} type
     * @param {string} title
     * @param {number} phase
     */
    playScene(type, title, phase = 0) {
        Tvar.scene = new Scene(type, title);
        Tvar.scene.init = true;
        Tvar.scene.start = true;
        if (phase > 0) {
            V.phase = phase;
        }
    },
    /**
     * @description set a event by certain keys
     * @param {'chara' | 'scene' | 'passage' | 'state' | 'time'} type
     * @param  {...any} args
     * @returns
     */
    setBy(type, ...args) {
        const database = this.data[type];
        if (!database) {
            throw new Error(`not valid type: ${type}`);
        }

        if (typeof args[0] !== 'string') {
            throw new Error(`no valid series: ${args[0]}`);
        }

        let [seriesId, eventId, branchId] = args;

        // if type is time, swap the variables;
        if (type == 'time') {
            branchId = eventId;
            eventId = seriesId;
            seriesId = 'common';
        }

        const eventData = this.getData(type, seriesId, eventId);
        if (!eventData) {
            throw new Error(`no valid event: ${eventId}`);
        }

        const branch = eventData.getBranch(branchId);
        if (branchId && !branch) {
            throw new Error(`no valid branch: ${branchId}`);
        }

        const event = clone(eventData);
        if (branch) {
            event.availableBranch = branch;
        }

        this.setEvent(event, V.passage);
    },

    /**
     * @description set event to current event
     * @param {eventData} event
     * @param {string} series
     */
    setEvent(event, passage) {
        const scene = new Scene('', '', event).InitData();

        // set the scene
        Tvar.scene = scene;
        // record the passage
        Tvar.scene.triggeredPassage = passage;
        // record the exit passage
        Tvar.exitPassage = scene.exit;

        // check the next link setting
        if (event.nextButton || event.totalPhase) {
            Tvar.nextButton = true;
        }

        // if has after action
        if (event.actions.after) {
            Tvar.afterAction = event.data.actions.after;
        }
    }
};

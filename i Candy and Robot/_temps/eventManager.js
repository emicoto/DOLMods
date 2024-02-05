/**
 * @typedef { string[] | { CN:string, EN:string} } language
 */

const htmlTools = {
    /**
     * @description append a new div with id extraContent before the first image or link in div passage-content
     * @param {string} eId
     */
    appendPatch(eId = 'patchContent') {
        // if has icon image, then find the first image in div passage-content, else find the first link
        let element = document.querySelector('#passage-content img');
        if (!element) {
            element = document.querySelector('#passage-content a');
        }

        // make a new div with id extraContent
        const div = document.createElement('div');
        div.id = eId;

        // insert the new div before the element
        element.parentNode.insertBefore(div, element);
    },

    /**
     * @description replace the oldlink with newlink
     * @param {string | string[]} oldlink
     * @param {string} newlink
    */
    replaceLink(oldlink, newlink) {
        // find the oldlink in elements
        const links = document.getElementsByClassName('macro-link');
        let elements;
        for (let i = 0; i < links.length; i++) {
            if (links[i].innerHTML.has(oldlink)) {
                // replace the oldlink with newlink
                elements = links[i];
                break;
            }
        }
        if (!elements) return;

        // replace the oldlink with newlink
        const parent = elements.parentNode;
        const newlinkPatch = document.createElement('div');
        newlinkPatch.id = 'patchlink';
        parent.replaceChild(newlinkPatch, elements);

        // wikifier the newlink
        new Wikifier(null, `<<replace "#patchlink">>${newlink}<</replace>>`);
    },

    /**
     * @description append content before certain link
     * @param {string | language} link;
     * @param {string} content;
     */
    appendBeforeLink(link, content) {
        const doc = document.getElementById('passage-content');
        const links = doc.getElementsByClassName('macro-link');
        let element;
        for (let i = 0; i < links.length; i++) {
            if (links[i].innerHTML.has(link)) {
                element = links[i];
                break;
            }
        }
        if (!element) return;

        // append content before the element
        const div = document.createElement('div');
        div.id = 'patchContent';
        doc.insertBefore(div, element);

        // wikifier the content
        new Wikifier(null, `<<append "#patchContent">>${content}<</append>>`);
    },

    /**
     * @description replace text at TEXT_NODE
     * @param {string | language} oldtext
     * @param {string} newtext
     */
    replaceText(oldtext, newtext) {
        const doc = document.getElementById('passage-content');
        const textNodes = doc.childNodes;
        if (!textNodes) return;

        if (typeof oldtext == 'object') {
            oldtext = lanSwitch(oldtext);
        }

        for (let i = 0; i < textNodes.length; i++) {
            const node = textNodes[i];
            if (node.textContent.has(oldtext)) {
                node.textContent = node.textContent.replace(oldtext, newtext);
                break;
            }
        }
    }
};

class Scene {
    /**
     * @param {string} title
     * @param {SceneData} eventData
     */
    constructor(type = 'Event', title, eventData = null) {
        this.title = title;
        this.type = type;
        this.data = eventData;

        if (this.data == null) {
            this.stage = V.currentStage;
            this.passage = `Scene ${V.currentStage} ${title}`;
        }

        this.startTime = V.timeStamp;
        this.exit = V.passage;
    }

    /**
     * @description initialize the scene data
     */
    InitData() {
        const data = this.data;
        if (data == null) return this;

        this.type = data.type;
        this.series = data.series;
        this.title = this.combineTitle();

        if (data.stage || data.toward) {
            this.jump = true;
            this.stage = this.getStage();
        }

        if (data.leavelink) {
            this.leavelink = data.leavelink;
        }

        if (data.chara) {
            if (typeof data.chara == 'string') {
                this.chara = [data.chara];
            }
            else {
                this.chara = data.chara;
            }
        }

        this.startTime = V.timeStamp;
        this.exit = data.exit || V.passage;

        return this;
    }

    /**
     * @description on event initialization
     */
    onInit() {
        // if has characters
        if (this.chara) {
            this.chara.forEach(chara => {
                wikifier('npc', chara);
            });

            wikifier('person1');
        }

        if (this.data?.initcode) {
            new Wikifier(null, this.data.initcode);
        }

        if (this.data?.initFunc) {
            this.data.initFunc();
        }
    }

    /**
     * @description get the passage name of this event
     */
    getPassage() {
        let passage = this.tilte;

        const phase = this.data?.phase || 0;

        if (phase > 0 && V.phase < phase && this.data.phasetype !== 'inframe') {
            passage = `${this.title} ${V.phase + 1}`;
            console.log('phase:', V.phase);
        }

        return passage;
    }

    /**
     * @description get the language of this event
     */
    getLanguage() {
        const passage = this.getPassage();

        if (Story.has(`${passage} ${setup.language}`)) {
            return `${passage} ${setup.language}`;
        }

        // if has default language
        if (Story.has(`${passage} CN`)) {
            return `${passage} CN`;
        }

        if (Story.has(`${passage} EN`)) {
            return `${passage} EN`;
        }

        return passage;
    }

    /**
     * @description combine the title of this event
     * @returns {string}
     */
    combineTitle() {
        if (!this.data) return this.title;

        const { type, series, episode, toward } = this.data;
        let title = `${type}`;

        if (series) {
            title += ` ${series}`;
        }

        if (episode) {
            title += ` ${episode}`;
        }

        if (toward) {
            title = `${type} ${toward}`;
        }
        return title;
    }

    /**
     * @description get the branch of this event
     * @returns {string}
     */
    getBranch() {
        if (this.data?.branch) {
            return this.data.branch;
        }
        else if (this.data?.randomBranch) {
            return random(1, this.data.randomBranch);
        }
        else if (this.data?.branches) {
            return this.data.checkBranch();
        }
        return '';
    }

    combineBranch() {
        const branch = this.getBranch();
        if (branch && this.data?.randomBranch) {
            return `${this.title}_${branch}`;
        }
        if (branch) {
            return `${this.title} ${branch}`;
        }
        return this.title;
    }

    getStage() {
        if (this.data?.stageScene) {
            this.stage = `BaseScene ${this.data.stageScene}`;
        }
        else if (this.data?.toward) {
            this.stage = `${this.data.type} ${this.data.toward}`;
        }

        return this.stage;
    }
}


const iStage = {
    //----------------------------------------------------------------
    //
    //  Database
    //
    //----------------------------------------------------------------
    /**
     * @type { {
     *  chara: Object.<string, SceneData[]>,
     *  passage: Object.<string, SceneData[]>,
     *  scene: Object.<string, SceneData[]>,
     *  event: Object.<string, SceneData[]>,
     * }}
     */
    data : {
        chara   : {},  // chara event
        scene   : {},  // static location event
        event   : [],  // stage event
        passage : []   // passage event
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
     * @description register event data to static scene
     * @param {string} series
     * @param {'Event' | 'Scene'} type
     * @param {SceneData[]} events
     */
    add(series, type, ...events) {
        if (!this.data.scene[series]) {
            this.data.scene[series] = [];
        }

        events.forEach(event => {
            event.type = type;
            this.data.scene[series].push(event);
        });

        this.sort(this.data.scene[series]);
    },

    /**
     * @description resister event data to passage / global event
     * @param {'passage' | 'event'} dataType
     * @param  {SceneData[]} events
     */
    addTo(dataType, ...events) {
        if (dataType !== 'event' && dataType !== 'passage') throw new Error(`illegal event type on register addTo: ${dataType}`);

        events.forEach(event => {
            this.data[dataType].push(event);
        });
    },

    /**
     * @description resister chara event
     * @param {string} chara
     * @param  {SceneData[]} events
     */
    addChara(chara, ...events) {
        if (!this.data.chara[chara]) {
            this.data.chara[chara] = [];
        }
        events.forEach(event => {
            event.type = 'Chara';
            event.series = chara;
            this.data.chara[chara].push(event);
        });
        
        this.sort(this.data.chara[chara]);
    },

    /**
     * get event data from database
     * @param {'chara' | 'scene' | 'event' | 'passage'} type
     * @param {string} series
     * @returns {SceneData[]}
     */
    get(type, series) {
        if (!this.data[type]) {
            throw new Error(`illegal event type: ${type}`);
        }
        if (type == 'chara' || type == 'scene') {
            return series ? this.data[type][series] : this.data[type];
        }
        
        if (series) {
            return this.data[type].filter(event => event.series == series);
        }

        return this.data[type];
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
     * @description find if the event has certain branch
     * @param {SceneData} eventData
     * @param {string} branchname
     * @returns
     */
    findBranch(eventData, branchname) {
        if (!eventData.branches) return false;

        const branch = eventData.branches.find(branch => branch.name == branchname);
        return typeof branch !== 'undefined';
    },

    /**
     * @description set a event by certain keys
     * @param {'get' | 'check'} mode
     * @param {'chara' | 'scene' | 'event' | 'passage'} type
     * @param  {...any} args
     * @returns
     */
    setBy(type, ...args) {
        const [series, key, branch] = args;
        let events = this.get(type);
        if (!events) {
            throw new Error(`illegal event type: ${type}`);
        }

        console.log(`event handle system on set, type:${type} series:${series} key:${key} branch:${branch}`);

        let data;
        if (type == 'chara' || type == 'scene') {
            events = events[series];
            if (!events) {
                throw new Error(`no event series found: ${series}`);
            }
        }
        else {
            events = events.filter(event => event.series == series);
        }

        data = events.filter(event => event.episode == key || event.toward.has(key));
        if (data.length == 0) {
            console.warn('no event found:', series, key);
        }

        if (branch) {
            data = data.filter(event => event.hasBranch(branch));
        }

        if (!data || data.length == 0) {
            console.error('no event found:', series, key, branch);
            return;
        }

        const event = clone(data[0]);

        if (branch) {
            event.branch = branch;
        }

        this.setEvent(event, V.passage);
    },

    /**
     * @description set event to current event
     * @param {eventData} event
     * @param {string} series
     */
    setEvent(event, passage) {
        const scene = new Scene('', event).InitData();

        // set the scene
        Tvar.scene = clone(scene);

        // record the passage
        Tvar.scene.trigger = passage;
        // record the exit passage
        Tvar.exitPassage = scene.exit;

        // check the next link setting
        if (event.eventnext) {
            Tvar.eventnext = true;
        }

        // if has endcode
        if (event.endcode) {
            Tvar.endcode = event.endcode;
        }

        if (scene.jump && Story.has(scene.stage)) {
            Tvar.jump = true;
        }
        else if (V.currentStage && scene.series == V.currentStage) {
            Tvar.scene.start = true;
        }
        else if (scene.type == 'Chara' && scene.location.has(F.getLocation())) {
            Tvar.scene.start = true;
        }

        console.log('event handle system on setEvent:', Tvar.scene, Tvar);

        return scene;
    },

    /**
     * @description init the event on Passage Header
     */
    initEvent() {
        /**
         * @type {Scene}
         */
        const scene = Tvar.scene;
        if (!scene) return;

        // if has not init flag
        if (!scene.init) {
            scene.onInit();
        }

        const passage = scene.getPassage();
        scene.passage = scene.getLanguage();

        // if has root script
        if (Story.has(`${scene.title}::Root`)) {
            const text = Story.get(`${scene.title}::Root`).text;
            new Wikifier(null, text);
        }
        
        // if has separate script
        if (Story.has(`${passage}::Script`)) {
            const text = Story.get(`${passage}::Script`).text;
            new Wikifier(null, text);
        }
        
        // do phase
        if (!scene.init) {
            scene.init = true;
            V.phase = 1;
        }
        else if (scene.data.phase > 0 && V.phase < scene.data.phase) {
            V.phase++;
        }

        if (V.phase >= scene.data.phase) {
            Tvar.eventnext = false;
        }

        console.log('event handle system on initEvent:', Tvar.scene, Tvar, V.phase);

        T.link = true;
    },

    /**
     * @description unset the event
     * @param {'end' | 'fix' | 'end-skipnext' | 'end-skipcode'} situation;
     */
    unsetEvent(situation = '') {
        if (situation.has('end') && situation.has('skipcode') == false) {
            if (Tvar.endcode) {
                new Wikifier(null, Tvar.endcode);
            }
            if (Tvar.scene.data?.endFunc) {
                Tvar.scene.data.endFunc();
            }
        }

        Tvar.scene = null;
        V.phase = 0;
        Tvar.eventnext = false;
        Tvar.onselect = false;
        Tvar.exitPassage = '';
        delete Tvar.selected;

        if (situation.has('skipnext')) {
            V.eventskip = 1;
        }

        wikifier('endevent');
        wikifier('endcombat');
    },

    /**
     * @description play the scene on stage
     */
    play() {
        setTimeout(() => {
            console.time('restore');
            for (const i in V) {
                V[i] = clone(window.bak[i]);
            }
            delete window.bak;
            console.timeEnd('restore');

            delete Tvar.jump;
            Tvar.scene.start = true;
            Engine.play(Tvar.scene.stage);
        }, 100);
    },

    /**
     * @description init the stage tag
     * @param {Passage} passage
     */
    initStage(passage) {
        if (passage.tags.includes('stage')) {
            V.currentStage = passage.title.split(' ')[1];
        }
        else {
            V.currentStage = undefined;
        }
        console.log('initStage:', V.currentStage, passage);
    },

    /**
     * @description if event has been set but didn't run, fix it
     * mostly used when the player using cheat to jump to other stage
     * @param {Passage} data
     */
    fixEvent(data) {
        // if not start
        if (!Tvar.scene.start) return;
        // if already init on header
        if (Tvar.scene.init) return;

        const scene = Tvar.scene;
        const stage = scene.data.stageScene || scene.data.series || scene.title.split(' ')[1];

        // if is scene and the stage is not match
        if (scene.type == 'Scene' && (data.tags.includes('stage') == false || data.tilte.includes(stage) == false)) {
            console.log('fixEvent:', scene, data);
            this.unsetEvent();
        }

        // if is event and stage is not match
        if (scene.type == 'Event' && V.timeStamp > scene.startTime + 120) {
            if (scene.data.toward && !data.title.includes(scene.data.toward) ||
                scene.data.stageScene && !data.title.includes(scene.data.stageScene)
            ) {
                console.log('fixEvent:', scene, data);
                this.unsetEvent();
            }
            else if (data.title.includes(stage) == false) {
                console.log('fixEvent:', scene, data);
                this.unsetEvent();
            }
        }

        if (scene.type == 'Chara' && scene.data.location && scene.data.location.includes(F.getLocation()) == false) {
            console.log('fixEvent:', scene, data);
            this.unsetEvent();
        }
    },

    //----------------------------------------------------------------
    //
    //  Event Cycle
    //
    //----------------------------------------------------------------
    /**
     * @description check the passout event
     */
    checkPassout() {
        $(document).trigger(':checkpassout');

        if (typeof Tvar.passout == 'function') {
            return Tvar.passout();
        }

        return V.stress >= V.stressmax;
    },

    /**
     * @description main cycle of event handle, will run at passageinit
     */
    lifeCycle(lastPassage, passage) {
        const title = passage.title;
        if (title == 'Start' || passage.tags.has('location', 'stage') == false) return;

        this.initStage(passage);

        const event = this.onCheck(passage);
    },

    onCheck(passage) {
        // already in event
        if (Tvar.scene.init) return;
        if (V.combat == 1) return;

        const { title, tags } = passage;
        console.log('event handle system on check:', title, V.currentStage, tags, Tvar);

        // passout event is always highest priority
        if (V.stress >= V.stressmax) {
            console.log('event handle system on check: stress passout', title);
            return this.checkEvent(passage, 'Passout');
        }
    },

    /**
     * @description at the passageready
     */
    onReady() {

    },

    /**
     * @description at the passagedisplay
     */
    onDone() {

    },

    /**
     * @description at the passageend
     */
    onEnd() {
        const passagedata = Story.get(V.passage);
        // if event has been set but didn't run, fix it
        this.fixEvent(passagedata);
    },

    // check static scene events
    checkScene(passage, series) {
        const events = this.get('scene', series);
        if (!events) return;

        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            if (event.condition(passage)) {
                return this.setEvent(event, passage.title);
            }
        }
    },

    // check the passage events
    checkPassage(passage) {
        const events = this.get('passage');
        const title = passage.title;
        if (!events || events.length == 0) return;

        for (let i = 0; i < events.length; i++) {
            /**
             * @type {SceneData}
             */
            const event = events[i];

            if (event.location && event.location.includes(F.getLocation()) == false) {
                continue;
            }

            if (
                event.entry && event.entry != title ||
                event.titleMatch && !title.match(event.titleMatch) ||
                event.keys &&  title.has(event.keys) !== event.keysNum
            ) {
                continue;
            }

            if (event.condition(passage)) {
                return this.setEvent(event, passage.title);
            }
        }
    },

    // check the global events
    checkEvent(passage, series) {
        let events = this.get('event');
        if (series) {
            events = this.get('event', series);
        }

        for (let i = 0; i < events.length; i++) {
            const event = events[i];

            if (event.location && event.location.includes(F.getLocation()) == false) {
                continue;
            }

            if (event.condition(passage)) {
                return this.setEvent(event, passage.title);
            }
        }
    },

    // check the chara events
    checkChara(passage, chara = null) {
        let events;
        if (chara == null) {
            // get all chara events
            const data = this.get('chara');
            events = [];
            for (const key in data) {
                events = events.concat(data[key]);
            }
        }
        events = this.get('chara', chara);
        if (!events || events.length == 0) return;

        for (let i = 0; i < events.length; i++) {
            const event = events[i];

            if (event.location && event.location.includes(F.getLocation()) == false) {
                continue;
            }

            if (event.condition(passage)) {
                return this.setEvent(event, passage.title);
            }
        }
    },

};



/**
 * @class iEvent
 * @typedef { object } iEvent
 */
const iEvent = (() => {
    //---------------------------------------------
    //
    // event data
    //
    //---------------------------------------------
    const database = {
        events : {
            chara : {},
            scene : {},
    
            time  : {},
            state : {},
    
            passage : {}
        },

        actions : {
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
         * @type {{
        * [eventId: string] : {
        *    passage: string[],
        *    watchvar: string[],
        *    runningPoint: string,
        *    event: function
        * }}}
        */
        listener : {},

        patch : {}
    };

    // sort all series data
    function sortData(data) {
        if (data instanceof SeriesData) {
            data.sort();
            return;
        }

        if (typeof data == 'object' && String(data) == '[object Object]') {
            for (const key in data) {
                sortData(data[key]);
            }
        }
    }

    /**
     * get the data of the event or series
     * @param {'chara' | 'scene' |'time' | 'state' | 'passage'} entryPoint
     * @param {string} seriesId
     * @param {string} eventId
     * @returns {SeriesData | SceneData}
     */
    function getData(entryPoint, seriesId, eventId = null) {
        if (entryPoint == 'time') {
            eventId = seriesId;
            seriesId = 'common';
        }
        
        if (!seriesId && !eventId) {
            return database.events[entryPoint];
        }

        const series = database.events[entryPoint][seriesId];
        // if not event input but not found the series data, just return;
        if (!series && !eventId) {
            return;
        }
        // if event input but not found the series data, throw error;
        else if (!series) {
            throw new Error(`no series found, entryPoint:${entryPoint}, seriesId: ${seriesId}, eventId: ${eventId}`);
        }

        return eventId !== undefined ? series.get(eventId) : series;
    }

    //---------------------------------------------
    //
    // event register
    //
    //---------------------------------------------
    const register = {
        /**
         * @param {string} charaId
         * @returns {SeriesData}
         */
        onChara(charaId) {
            if (!database.events.chara[charaId]) {
                database.events.chara[charaId] = new SeriesData(charaId, 'chara');
            }
            return database.events.chara[charaId];
        },

        /**
         * @param {string} sceneId
         * @returns {SeriesData}
         */
        onScene(sceneId = 'common') {
            if (!database.events.scene[sceneId]) {
                database.events.scene[sceneId] = new SeriesData(sceneId, 'scene');
            }
            return database.events.scene[sceneId];
        },

        /**
         * @param {'scene' | 'chara' | 'passage'} type
         * @param {string} id
         */
        onLink(type, id) {
            if (!database.action[type]) {
                throw new Error(`not valid type: ${type}`);
            }
            if (!database.action[type][id]) {
                database.action[type][id] = new SeriesData(id, type);
            }
            return database.action[type][id];
        },

        onTime(timeType = 'common') {
            if (!database.events.time[timeType]) {
                database.events.time[timeType] = new SeriesData(timeType, 'time');
            }
            return database.events.time[timeType];
        },

        /**
         * @param {string} stateType
         * @returns {SeriesData}
         */
        onState(stateType) {
            if (!database.events.state[stateType]) {
                database.events.state[stateType] = new SeriesData(stateType, 'state');
            }
            return database.events.state[stateType];
        },

        onPassage(passage) {
            if (!database.events.passage[passage]) {
                database.events.passage[passage] = new SeriesData(passage, 'passage');
            }
            return database.events.passage[passage];
        },

        /**
         * @description resister a dynamic widget to a passage
         * @param {string} passage
         * @param {string} widgetname
         * @param {function} widget
         */
        addWidget(passage, widgetname, widget) {
            if (!database.widget[passage]) {
                database.widget[passage] = {};
            }
            database.widget[passage][widgetname] = widget;
        },

        /**
         * @description get a dynamic widget from a passage
         * @param {string} passage
         * @param {string} widgetname
         * @returns {function}
         */
        getWidget(passage, widgetname) {
            if (!database.widget[passage]) {
                return;
            }
            return database.widget[passage][widgetname];
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
            database.listener[eventId] = obj;
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
        }
    };

    //----------------------------------------------------------------
    //
    //  short cuts
    //
    //----------------------------------------------------------------
    const shortcuts = {
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
        }
    };

    //----------------------------------------------------------------
    //
    //  Handle functions
    //
    //----------------------------------------------------------------
    /**
     * @description on patch passage. if has patch, append to extra area
     */
    function onPatch() {
        const passage = V.passage;
        let patchId = 'addAfterMsg';

        if (!database.patch[passage]) return;

        // get the current display html
        const displayhtml = document.getElementById('passage-content').innerHTML;

        // if the current display html has no extra area, then create one
        if (V.combat == 0 && displayhtml.has('Places of Interest', 'Places of interest', 'Points of Interest', '可访问地点') == false) {
            htmlTools.appendPatch();
            patchId = 'patchContent';
        }

        database.patch[passage].forEach(content => {
            const html = typeof content == 'function' ? content() : content;
            setTimeout(() => {
                new Wikifier(null, `<<append #${patchId}>>${html}<<</append>>`);
            }, 60);
        });
    }

    /**
     * @description fast set a scene event without init,
     * only work in the stage passage
     * @param {string} type
     * @param {string} title
     * @param {number} phase
     */
    function playScene(title, phase = 0) {
        Tvar.scene = new Scene('Scene', title);
        Tvar.scene.init = true;
        Tvar.scene.start = true;
        if (phase > 0) {
            V.phase = phase;
        }
    }

    const checker = {
        // 在开始前进行检查，如果不符合条件则报错并重置。
        error(scene, message) {
            console.error('event handle system on error:', Tvar.passage, Tvar.passagePrev, message, scene);

            setTimeout(() => {
                new Wikifier('#passage-footer', `<<error {
                    message : '${message}',
                    source  : 'Previous passage:  ${Tvar.passagePrev} | Current passage: ${Tvar.passage} | phase: ${V.phase}'
                }>>`);
            }, 120);
        },

        // 检测passage是否有效舞台
        isValidStage(passage) {
            return passage.tags.includes('stage') == true || passage.text.has('<<iStage>>', '<<include $tvar.scene.fullTitle>>') !== false;
        },

        // 检测舞台有效性，顺便检测是否需要跳转。
        checkStage(scene, passage) {
            // 如果没有设置舞台，直接返回false
            if (!scene.stage) return false;

            // 设置的舞台不存在, 返回false
            if (Story.has(scene.stage) == false) {
                return false;
            }

            // 有效但舞台不一致，准备跳转
            if (passage.title != scene.stage) {
                scene.jump = true;
            }

            return true;
        },

        // 检测是否存在候选舞台
        checkAlter(scene) {
            return Story.has(scene.baseTitle) == true || Story.has(scene.getFullTitle(1)) == true;
        },

        // 获取候选舞台
        getAlter(scene) {
            const psg = [Story.get(scene.baseTitle), Story.get(scene.getFullTitle(1))];
            for (const passage of psg) {
                if (isValidStage(passage) == true) {
                    return passage;
                }
            }
        },

        // 初始化时检测舞台有效性
        onBefore(scene, passage) {
            const { playType } = scene.data;
            if (playType == 'jump') {
                return this.beforeJump(scene);
            }
    
            if (playType == 'local') {
                return this.beforePlay(scene, passage);
            }
    
            return this.beforeScene(scene, passage);
        },
        
        beforeJump(scene) {
            // 如果stage有效，返回true
            if (Story.has(scene.stage)) {
                scene.jump = true;
                return true;
            }

            // 如果备选舞台都无效，返回false并报错。
            if (this.checkAlter(scene) == false) {
                this.error(scene, `No such stage: ${scene.stage}`);
                return false;
            }
        
            // 如果stage无效，但备选舞台有效，则重设舞台并跳转
            const alter = this.getAlter(scene);
            if (alter) {
                scene.stage = alter.title;
                scene.jump = true;
                return true;
            }

            // 如果都无效，报错
            this.error(scene, `Not valid stage: ${scene.stage}, ${scene.baseTitle}`);
            return false;
        },

        beforeScene(scene, passage) {
            // 如果舞台已设置且有效，直接返回
            if (checkStage(scene, passage) === true) {
                return true;
            }

            // 如果备选舞台无效，报错
            if (this.checkAlter(scene) == false) {
                this.error(scene, `No such stage and alter stage: ${scene.stage}, ${scene.baseTitle}`);
                return false;
            }
            
            const alter = this.getAlter(scene);

            // 备选舞台不是有效舞台，报错
            if (!alter) {
                this.error(scene, `Not a valid stage: ${scene.stage}, ${scene.baseTitle}`);
                return false;
            }

            // 如果舞台有效，则重设舞台并跳转
            scene.stage = alter;
            scene.jump = true;
            return true;
        },
    
        // 如果舞台为当前位置，检测当前位置是否有效舞台
        beforePlay(scene, passage) {
            if (typeof passage == 'string') {
                passage = Story.get(passage);
            }

            // 如果舞台已经设置，且有效，直接返回
            if (this.checkStage(scene, passage) === true) {
                return true;
            }

            // 如果舞台无效，报错
            if (this.isValidStage(passage) == false) {
                new Wikifier('#passage-footer', `<<error {
                    message : 'Not a valid stage: ${passage.title}',
                    source  : 'Previous passage:  ${V.passagePrev} | Current passage: ${V.passage}' | phase: ${V.phase}'
                }>>`);
                return false;
            }
            
            scene.stage = passage.title;
            return true;
        }
    };

    //---------------------------------------------
    //
    //  Main Handle
    //
    //---------------------------------------------
    const sceneHandle = {
        /**
         * @description set event to current event
         * @param {SceneData} event
         * @param {string} series
         */
        set(event, passage) {
            const scene = new Scene('', '', event);

            // check the availabe branch;
            const branch = event.getBranch();
            if (branch) {
                scene.data.availableBranch = branch;
            }

            // init the scene data
            scene.initData();
    
            // set the scene
            Tvar.scene = scene;
            // record the passage
            Tvar.scene.triggeredPassage = typeof passage == 'string' ? passage : passage.title;
            // record the exit passage
            Tvar.exitPassage = scene.exit;
    
            // check the next link setting
            if (event.nextButton || event.maxPhase) {
                Tvar.nextButton = true;
            }
    
            // if has after action
            if (event.actions.after) {
                Tvar.afterAction = event.data.actions.after;
            }
    
            // check the availability and jump before start
            const available = checker.onBefore(scene, passage);
            if (available == false) {
                this.unset();
                return;
            }
    
            if (!scene.jump) {
                scene.init = true;
            }
            
            console.log('event handle system on setEvent:', scene, Tvar);
        },

        /**
         * @description init the event before start at Passage Header
         */
        init() {
            /**
             * @type {Scene}
             */
            const scene = Tvar.scene;
            if (!scene) return;

            // if has not start flag;
            if (!scene.start) {
                scene.Init();
            }

            const title = scene.getFullTitle();
            scene.fullTitle = scene.getLanguage();

            // if has phase action
            if (scene.data.actions.onPhase) {
                const action = scene.data.actions.onPhase;
                if (typeof action == 'function') {
                    action();
                }
                else if (typeof action == 'string') {
                    new Wikifier(null, action);
                }
            }

            // if has separate script
            if (Story.has(`${title}::Script`)) {
                const text = Story.get(`${title}::Script`).text;
                new Wikifier(null, text);
            }

            // do phase
            if (!scene.start) {
                scene.start = true;
                V.phase = 1;
            }
            else if (scene.maxPhase > 0 && V.phase < scene.maxPhase) {
                Tvar.nextButton = true;
                V.phase++;
            }

            if (V.phase >= scene.maxPhase) {
                Tvar.nextButton = false;
            }

            console.log('event handle system on initEvent:', scene, Tvar, V.phase);

            T.link = true;
        },

        /**
         * @description unset the current event
         * @param {'end' | 'fix' | 'end-skipnext' | 'end-skipcode'} situation
         */
        unset(situation) {
            if (situation.has('end') && situation.has('skipcode') == false) {
                if (typeof Tvar.afterAction == 'function') {
                    Tvar.afterAction();
                }
                else if (typeof Tvar.afterAction == 'string') {
                    new Wikifier(null, Tvar.afterAction);
                }
            }
            Tvar.scene = null;
            V.phase = 0;
            Tvar.exitPassage = '';
            Tvar.nextButton = false;
            Tvar.onselect = false;
            delete Tvar.afterAction;
            delete Tvar.selected;

            wikifier('endevent');
            wikifier('endcombat');

            if (situation.has('skipnext')) {
                V.eventskip = 1;
            }
        },

        /**
         * @description play the current event when jump
         */
        jump() {
            if (!Tvar.scene.jump) return;

            setTimeout(() => {
                console.time('restore');
                if (window.bak) {
                    for (const i in V) {
                        V[i] = clone(window.bak[i]);
                    }
                    delete window.bak;
                }
                console.timeEnd('restore');

                delete Tvar.scene.jump;
                Tvar.scene.init = true;
                Engine.play(Tvar.scene.baseTitle);
            }, 100);
        },

        /**
         * @description set a event by manual
         * @param {'chara' | 'scene' | 'passage' | 'state' | 'time'} type
         * @param  {...any} args
         * @returns
         */
        setBy(type, ...args) {
            const database = getData(type);
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
    
            /**
             * @type {SceneData}
             */
            const eventData = getData(type, seriesId, eventId);
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
    
            this.set(event, V.passage);
        },

        /**
         * @description if event has been set but didn't run, fix it
         * mostly used when the player using cheat to jump to other stage
         * @param {Passage} passage
         */
        fix(passage) {
            // if not init  just return
            if (!Tvar.scene || !Tvar.scene.init) return;

            // if already init, then wait 60s to check
            if (V.timeStamp < Tvar.scene.startTime + 60) return;

            const scene = Tvar.scene;
            const data = scene.data;

            // if the stage is not match
            if (passage.title !== scene.stage) {
                console.warn('event handle system on fix, the stage is not match:', scene, passage);
                this.unset('fix');
                return;
            }

            // if the stage is match but is chara event and the chara location is not match78//////
            if (data.entryPoint == 'chara') {
                if (scene.data.location && scene.data.location.includes(iMap.currentLoc()) == false) {
                    console.warn('event handle system on fix, the chara location is not match:', scene, passage);
                    this.unset('fix');
                }

                const charaLocation = iChara.currentLoc();
                if (charaLocation && charaLocation !== iMap.currentLoc()) {
                    console.warn('event handle system on fix, the chara location is not match:', scene, passage);
                    this.unset('fix');
                }
            }
        },

        //-----------------------------------------------------
        //
        // branch handle during event
        //
        //-----------------------------------------------------
        /**
         * add a branch to the current event
         * @param {string} branchId
         */
        add(branchId) {
            const scene = Tvar.scene;
            if (!scene) return;

            if (!scene.branch || scene.branch.length == 0) {
                scene.branch = [];
            }

            if (!scene.phases) {
                scene.phases = {};
            }

            scene.branch.push(branchId);
            if (scene.current) {
                scene.phases[scene.current] = V.phase;
            }
            else {
                scene.phases.main = V.phase;
            }
            scene.current = branchId;
            scene.initBranchData();
            V.phase = 0;
        },

        /**
         * remove the last branch from the current event
         * @param {number} phase
         */
        pop(phase = 0) {
            const scene = Tvar.scene;
            if (!scene || !scene.branch || scene.branch.length == 0) return;

            const last = scene.branch.pop();
            scene.phases[last] = V.phase;

            scene.current = scene.branch[ scene.branch.length - 1 ];
            scene.initBranchData();
            V.phase = phase;
        },

        /**
         * remove all the branch from the current event
         * @param {number} phase
         */
        back(phase = 0) {
            const scene = Tvar.scene;
            if (!scene || !scene.branch || scene.branch.length == 0) return;

            const last = scene.branch[ scene.branch.length - 1 ];
            scene.phases[last] = V.phase;

            scene.current = scene.branch[0];
            scene.branch = [scene.current];
            scene.initBranchData();
            V.phase = phase;
        },

        /**
         * clear the branch list of the current event
         */
        clear(phase = 0) {
            const scene = Tvar.scene;
            if (!scene) return;

            scene.branch = [];
            scene.current = 'main';
            scene.restore();
            V.phase = phase;
        },

        /**
         * jump to the selected branch of the current event
         * @param {string} branchId
         * @param {number} phase
         */
        goto(branchId, phase = 0) {
            const scene = Tvar.scene;
            if (!scene) return;

            // if already in the branch list
            // then splice the list let the selected branch is the last one
            const branch = scene.branch;
            if (branch && branch.includes(branchId)) {
                const index = scene.branch.indexOf(branchId);
                branch.splice(index, branch.length - index);
            }
            else {
                // if not in the list then reset the list and add the selected branch
                scene.branch = [];
                scene.current = branchId;
            }

            scene.branch = [branchId];
            V.phase = phase;
        },

        /**
         * set phase of the current event
         * @param {number} phase
         */
        phase(phase) {
            const scene = Tvar.scene;
            if (!scene) return;

            V.phase = phase;
        }
    };

    //---------------------------------------------
    //
    //  Event Cycle
    //
    //---------------------------------------------
    const lifeCycle = {
        /**
         * @description init stage
         * @param {Passage} psg
         */
        initStage(passage) {
            if (passage.tags.includes('stage')) {
                const tags = passage.title.split(' ');
                V.stage = tags[1];
                if (tags[0] == 'MainStage') {
                    V.mainStage = tags[1];
                }
            }
            else {
                // record the available previous stage
                if (V.stage) {
                    V.prevStage = V.stage;
                }
                V.stage = undefined;
            }
            console.log('initStage:', V.stage, passage);
        },

        /**
         * the main life cycle of the event system, run at passageinit
         * @param {Passage} lastPsg
         * @param {Passage} psg
         * @returns
         */
        main(lastPsg, psg) {
            if (psg.title == 'Start') return;

            this.initStage(psg);

            // if already in the event, return;
            if (Tvar.scene?.start || V.combat == 1) return;
            
            console.log(
                'event handle system on main cycle on passage init.\n',
                'passage:',psg.title,
                'prev passage:', lastPsg.title,
                'cutrent stage:', V.stage,
                'temp vars:', Tvar
            );

            // get local characters
            iChara.initLocal();

            const event = [];
            // check local events
            event.push(this.onState(lastPsg));

            if (psg.tags.has('stage', 'scene')) {
                event.push(this.onScene(psg));
            }

            event.push(this.onPassage(psg));

            // if has event, then set the event
            for (const e of event) {
                if (typeof e == 'object') {
                    return sceneHandle.set(e, psg);
                }
            }
        },

        /**
         * the sub life cycle of the event system, run at passagedone
         * @param {Passage} passage
         * @returns
         */
        after(passage) {
            if (passage.title == 'Start') return;

            // fix the wrong event if player using cheats
            sceneHandle.fix(passage);

            // patch the passage content
            this.onPatch(passage);

            // if has chara on location, then check the chara event
            this.onChara(passage);

            // get the actions link and patch to the passage
            this.onLink(passage);
        },

        time() {
            const psg = Story.get(passage());

            // get the time events
            this.onTime(psg);
        }
    };

    return Object.defineProperties({}, {
        data     : { get : () => database },
        getData  : { value : getData },
        sortData : { value : sortData },
        register : { get : () => register },

        initFlag : { value : shortcuts.initFlag },
        setFlag  : { value : shortcuts.setFlag },
        getFlag  : { value : shortcuts.getFlag },
        addFlag  : { value : shortcuts.addFlag },

        chekcer   : { value : checker },
        onPatch   : { value : onPatch },
        playScene : { value : playScene },

        scene : { get : () => sceneHandle },
        cycle : { get : () => lifeCycle }

    });
})();

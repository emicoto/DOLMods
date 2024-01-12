const eventManager = {
    data   : {},
    widget : {},

    setFlag(event, prop, value) {
        if (!R.flags[event]) {
            R.flags[event] = {};
        }
        R.flags[event][prop] = value;

        return R.flags[event];
    },
    addFlag(event, prop, value) {
        if (!R.flags[event]) {
            R.flags[event] = {};
        }
        if (!R.flags[event][prop]) {
            R.flags[event][prop] = 0;
        }
        R.flags[event][prop] += value;
        
        return R.flags[event];
    },
    getFlag(event, prop) {
        if (!R.flags[event]) return;
        return prop ? R.flags[event][prop] : R.flags[event];
    },

    // regist event for static location event
    registEvent(event, ...events) {
        if (!this.data[event]) {
            this.data[event] = [];
        }
        this.data[event].push(...events);
    },

    // regist event for none static location event
    registEvent2(type, event, ...events) {
        if (!this.data[type]) {
            this.data[type] = {};
        }
        if (!this.data[type][event]) {
            this.data[type][event] = [];
        }
        this.data[type][event].push(...events);
    },

    // regist a process function for certain passage
    registPsg(passage, callback) {
        this.widget[passage] = callback;
    },

    getEvent(event) {
        if (!this.data[event]) return;
        return this.data[event];
    },

    startScene() {
        setTimeout(() => {
            console.time('restore');
            for (const i in V) {
                V[i] = clone(window.bak[i]);
            }
            delete window.bak;
            console.timeEnd('restore');

            delete V.tvar.jump;
            V.tvar.scene.start = true;
            Engine.play(V.tvar.scene.scenestage);
        }, Engine.minDomActionTime + 10);
    },

    // set event by certain keys
    setEvent(type, event, key, branch) {
        const eventdata = this.getEvent(event);
        if (!eventdata) return;

        console.log('setEvent:', type, event, key, branch, eventdata);

        let data;

        // get the branch event
        if (type == 'check' && key) {
            for (let i = 0; i < eventdata.length; i++) {
                const _data = eventdata[i];
                if (data.location && data.location.includes(V.location) == false) continue;

                if (eventdata[i].episode == key && typeof _data == 'function' && _data.require()) {
                    data = clone(_data);
                    break;
                }
            }
        }

        // get the event by certain key
        if (type == 'get' && key) {
            const _data = eventdata.filter(data => data.episode == key && !branch || data.episode == key && data.branch == branch);
            data = clone(_data[0]);
        }
        
        // check events
        if (!data && !key && !branch) {
            for (let i = 0; i < eventdata.length; i++) {
                const _data = eventdata[i];
                if (data.location && data.location.includes(V.location) == false) continue;

                if (typeof _data == 'function' && _data.require()) {
                    data = clone(_data);
                    break;
                }
            }
        }

        if (data) {
            this.setScene(event, data);
        }
        else {
            console.log('event not found:', type, event, key, branch);
        }

        console.log('setEvent:', data);
    },

    unsetEvent(skip) {
        V.tvar.scene = {};
        V.phase = 0;
        V.tvar.eventnext = false;
        V.tvar.onselect = false;
        V.tvar.exitPassage = null;
        V.tvar.selected = null;
        if (skip) {
            V.eventskip = 1;
        }
        wikifier('endevent');
    },

    goBranch(branch) {
        if (!V.tvar.scene.branch) {
            V.tvar.scene.branch = branch;
        }
        else {
            V.tvar.scene.branch += ` ${branch}`;
        }
        V.tvar.scene.title += ` ${branch}`;

        V.phase = 0;
    },

    popBranch(phase) {
        const branch = V.tvar.scene.branch.split(' ');
        branch.pop();
        V.tvar.scene.branch = branch.join(' ');
        V.tvar.scene.title = `${V.tvar.scene.type} ${V.tvar.scene.event} ${V.tvar.scene.episode}`;
        if (V.tvar.scene.branch.length > 0) {
            V.tvar.scene.title += ` ${V.tvar.scene.branch}`;
        }

        if (Number(phase)) {
            V.phase = Number(phase);
        }
    },

    backBranch(displaylink, phase) {
        const html = `<<link "${displaylink}" $passage>><<popBranch${Number(phase) ? ` ${phase}` : ''}>><</link>>`;
        return html;
    },

    setBranch(branch, phase) {
        if (!V.tvar.scene.branch) {
            V.tvar.scene.branch = branch;
        }
        else {
            // pop the last branch until the certain branch
            const branchlist = V.tvar.scene.branch.split(' ');
            const index = branchlist.indexOf(branch);
            branchlist.splice(index, branchlist.length - index);

            V.tvar.scene.branch = branchlist.join(' ');
            V.tvar.scene.title = `${V.tvar.scene.type} ${V.tvar.scene.event} ${V.tvar.scene.episode}`;
            if (V.tvar.scene.branch.length > 0) {
                V.tvar.scene.title += ` ${V.tvar.scene.branch}`;
            }

            if (Number(phase)) {
                V.phase = Number(phase);
            }
        }
    },

    setScene(located, data) {
        const scene = {
            event     : located, // event name
            startTime : V.timeStamp, // event start time
            passage   : '' // event passage
        };
        data.title = `${data.type} ${located} ${data.episode}`;
        if (data.branch) {
            data.title += ` ${data.branch}`;
        }
        if (data.randomBranch) {
            data.title += `_${random(data.randomBranch)}`;
        }

        if (data.scene) {
            data.scenestage = `BaseScene ${data.scene}`;
        }
        else if (data.toward) {
            data.scenestage = `${data.type} ${data.toward}`;
            
            if (Story.has(`${data.scenestage} ${setup.language}`)) {
                data.scenestage += ` ${setup.language}`;
            }
        }

        Object.assign(scene, data);
        V.tvar.scene = scene;
        V.tvar.scene.passage = data.title;

        if (data.eventnext !== undefined) {
            V.tvar.eventnext = data.eventnext;
        }
        else {
            data.eventnext = data.phase > 0;
            V.tvar.eventnext = data.eventnext;
        }

        V.tvar.exitPassage = data.exit ?? V.passage;
        V.tvar.endcode = data.endcode;
        
        console.log('setScene:', located, data, clone(V.tvar.scene));

        this.initEvent(V.tvar.scene);

        return V.tvar.scene;
    },

    initEvent(scene) {
        scene.passage = scene.title;

        if (scene.phase > 0 && Story.has(`${scene.title} 1`)) {
            scene.passage = `${scene.title} 1`;
        }

        if (Story.has(`${scene.passage} ${setup.language}`)) {
            scene.passage += ` ${setup.language}`;
        }

        if (scene.scenestage && Story.has(scene.scenestage) && !V.tvar.scene.init) {
            console.log('scene.scenestage:', scene.scenestage);
            V.tvar.jump = true;
        }
        else {
            V.tvar.scene.start = true;
        }
    },

    initScene() {
        const scene = V.tvar.scene;

        if (!scene.init && scene?.chara) {
            wikifier('npc', scene.chara);
            wikifier('person1');
        }
        if (!scene.init && scene?.initfunc) {
            scene.initfunc();
        }
        if (!scene.init && scene?.initcode) {
            new Wikifier(null, scene.initcode);
        }

        // combine the passage title
        scene.passage = scene.title;

        if (scene.phase > 0 && V.phase < scene.phase && scene.phasetype !== 'inframe') {
            scene.passage = `${scene.title} ${V.phase + 1}`;
        }
        console.log('phase:', V.phase);

        if (Story.get(`${scene.passage}::Script`)) {
            new Wikifier(null, `${scene.passage}::Script`);
        }

        if (Story.has(`${scene.passage} ${setup.language}`)) {
            scene.passage += ` ${setup.language}`;
        }
        console.log('title:', scene.passage);

        // do phase
        if (!scene.init) {
            scene.init = true;
            V.phase = 1;
        }
        else if (scene.phase > 0 && V.phase < scene.phase) {
            V.phase++;
        }

        if (V.phase >= scene.phase) {
            V.tvar.eventnext = false;
        }
        console.log('initScene:', scene, V.phase, V.tvar.eventnext, V.onselect);

        T.link = true;
    },

    initBaseScene(passage) {
        if (passage.tags.includes('scene')) {
            V.currentScene = passage.title.replace('BaseScene ', '');
        }
        else {
            V.currentScene = undefined;
        }
        console.log('initBaseScene:', V.currentScene, passage);
    },

    // if event has been set but didn't run, fix it
    fixEvent(data) {
        // check the event is running in the right scene or not
        if (!V.tvar.scene.start) return;

        const scene = V.tvar.scene;
        const stage = scene.event || scene.title.split(' ')[1];

        // 舞台不匹配的情况
        if (scene.type == 'Scene' && (data.tags.includes('scene') == false || data.title.includes(stage) == false)) {
            console.log('fixEvent:', scene, data);
            this.unsetEvent();
        }

        // 事件不匹配的情况，跳转事件会在下一次检测时清除
        if (scene.type == 'Event') {
            if (
                scene.toward && !data.title.includes(scene.toward) && V.timeStamp > scene.startTime + 900 ||
                scene.scene && !data.title.includes(scene.scene) && V.timeStamp > scene.startTime + 900
            ) {
                console.log('fixEvent:', scene, data);
                this.unsetEvent();
            }
            else if (!data.title.includes(stage) && V.timeStamp > scene.startTime + 900) {
                console.log('fix event:', scene, data);
                this.unsetEvent();
            }
        }

        // 地点不匹配的情况
        if (scene.type == 'Chara' && scene.location.includes(V.location) == false) {
            console.log('fixEvent:', scene, data);
            this.unsetEvent();
        }
    },

    // check event when enter a scene
    eventReady(data) {
        const title = data.title;

        // if event has been set but didn't run, clear it
        this.fixEvent(data);

        // already in event
        if (V.tvar.scene.start == true) return;
        // already in combat
        if (V.combat == 1) return;
        
        console.log('eventReady:', title, V.currentScene, data);

        // passout event always in the highest priority
        if (V.stress >= V.stressmax) {
            console.log('eventReady, check passout event:', title, V.currentScene);
            return this.checkEvent('Passout');
        }

        // check event from new scene
        if (typeof V.currentScene === 'string') {
            this.checkEvent(V.currentScene, data);
        }
        else {
            // check event from passage
            const keys = data.title.split(' ');

            if (keys.has('Passout') && (keys.indexOf('Passout') == 0 && !data.text.includes('combat') || keys.indexOf('Passout') == key.length)) {
                this.checkEvent('Passout', data);
            }
            else if (keys.has('Sleep') && data.text.includes('<<sleep>>')) {
                this.checkEvent('Sleep', data);
            }
            else if (title == 'Bath' || title == 'Cabin Bath' || keys.indexOf('Shower') == keys.length - 1) {
                this.checkEvent('Bath', data);
            }
            else {
                this.checkEvent2(data);
            }
        }

        if (data.tags.includes('scene') && V.eventskip == 0) {
            V.danger = random(1, 10000);
            V.dangerevent = 0;
        }
    },

    // run the post-process function for passage event
    eventDone() {
        const title = passage();
        const func = this.widget[title] ?? this.widget[V.currentScene];
        console.log('eventDone:', title, V.currentScene, func);
        
        if (typeof func == 'function') {
            func();
        }

        if (Story.get(title).tags.includes('scene') && V.eventskip == 1) {
            V.eventskip = 0;
        }
    },

    // 原有地点的事件监测
    checkEvent2(psgdata) {
        console.log('checkevent2:', psgdata);
        const title = psgdata.title;

        const eventlist = this.getEvent('location');
        if (!eventlist) return;

        for (let i = 0; i < eventlist.length; i++) {
            const data = eventlist[i];

            if (iCandy.config.debug) {
                console.log('eventdata:', data);
            }

            if (
                data.entrypassage && title == data.entrypassage ||
                 data.match && title.match(data.match)  ||
                 data.keys && title.has(...data.keys) == data.keyrequire
            ) {
                if (typeof data.require == 'function' && data.require(psgdata)) {
                    const _event = clone(data);
                    return this.setScene(title, _event);
                }
            }
        }
    },

    // 模组地点事件检测
    checkEvent(event, psgdata) {
        console.log('checkevent:', event);
        // 筛选事件
        const eventList = this.getEvent(event);
        if (iCandy.config.debug) console.log('eventlist:',eventList);
            
        if (!eventList) return;

        for (let i = 0; i < eventList.length; i++) {
            const data = eventList[i];
            // console.log('eventdata:', data)
            if (typeof data.require == 'function' && data.require(psgdata)) {
                const _event = clone(data);
                return this.setScene(event, _event);
            }
        }
    }
};

DefineMacroS('goBranch', eventManager.goBranch);
DefineMacroS('popBranch', eventManager.popBranch);
DefineMacroS('backBranch', eventManager.backBranch);
DefineMacroS('setBranch', eventManager.setBranch);

Object.defineProperties(window,{
    iEvent : {
        get() {
            return eventManager;
        }
    }
});

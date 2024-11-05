/**
 * @typedef { string[] | { CN:string, EN:string} } language
 */

class SceneData {
    /**
     * @param {'Event' | 'Chara' | 'Scene' | 'Action'} type
     * @param {string} episode
     * @param  {SceneData} obj
     */
    constructor(episode = '', type = 'Event', obj) {
        this.type = type;
        this.episode = episode;

        if (obj) {
            this.assign(obj);
        }
    }

    //----------------------------------------------------------------
    //
    // Setting Functions
    //
    //----------------------------------------------------------------

    /**
     * @description assign properties to event data
     * @param {*} obj
     * @returns {SceneData}
     */
    assign(obj) {
        for (const key in obj) {
            this[key] = clone(obj[key]);
        }
        return this;
    }

    /**
     * @description set property and value
     * @param {string} prop
     * @param {*} value
     * @returns
     */
    set(prop, value) {
        this[prop] = value;
        return this;
    }

    /**
     * @description set the Series of this event
     * @param {string} series
     * @returns {SceneData}
     */
    Series(series) {
        this.series = series;
        return this;
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

            if (trigger.keysNum) {
                this.keysNum = trigger.keysNum;
            }
            else {
                this.keysNum = trigger.keys.length;
            }
        }
        if (trigger.titleMatch) {
            this.titleMatch = trigger.titleMatch;
        }
        return this;
    }

    /**
     * @description set the requirement of this event
     * @param {function} cond
     * @returns {SceneData}
     */
    Cond(require) {
        this.condition = require;
        return this;
    }

    /**
     * @description set the command on event next button
     * @param {string} nextcode
     * @returns {SceneData}
     */
    Next(nextcode) {
        this.eventnext = true;
        this.nextcode = nextcode;
        return this;
    }

    /**
     * @description set the command on event init
     * @param {string} init
     * @returns {SceneData}
     */
    onInit(init) {
        this.initcode = init;
        return this;
    }

    /**
     * @description set the function on event init
     * @param {function} init
     * @returns {SceneData}
     */
    onInitFunc(init) {
        this.initFunc = init;
        return this;
    }

    /**
     * @description set the command on event end
     * @param {string} end
     * @returns {SceneData}
     */
    onEnd(end) {
        this.endcode = end;
        return this;
    }

    /**
     * @description set the function on event end
     * @param {function} end
     * @returns {SceneData}
     */
    onEndFunc(end) {
        this.endFunc = end;
        return this;
    }

    /**
     * @description set the function on event skip
     * @param {function} skip
     * @returns {SceneData}
     */
    onSkip(skip) {
        this.skip = skip;
        return this;
    }

    /**
     * @description set phase of this event
     * @param {number} phase
     * @returns {SceneData}
     */
    Phase(phase, inframe = false) {
        this.phase = phase;
        this.eventnext = true;
        if (inframe === true) {
            this.phasetype = 'inframe';
        }
        return this;
    }

    /**
     * @description set event exit
     * @param {string} exit
     * @param {string | language} displaylink
     * @returns {SceneData}
     */
    Exit(exit, displaylink) {
        this.exit = exit;
        this.leaveLink = displaylink;
        return this;
    }

    /**
     * @description set as onetime event
     * @returns {SceneData}
     */
    isOnetime() {
        this.onetime = true;
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
     * @description set the branches of this event
     * @param {...{
     * name: string,
     * cond: function | 'defaule' | 'bySet',
     * phase: number,
     * initcode: string,
     * endcode: string }} branches
     * @returns {SceneData}
     */
    Branches(...branches) {
        this.branches = branches;

        // sort branches by priority
        this.branches.sort((a, b) => {
            if (a.priority == undefined) {
                return 1;
            }
            if (b.priority == undefined) {
                return -1;
            }
            return a.priority - b.priority;
        });

        return this;
    }

    /**
     * @description set random branches of this event
     */
    RandomBranch(size = 1) {
        this.randomBranch = size;
        return this;
    }

    /**
     * @description set the priority of this event
     * @param {number} priority
     * @returns {SceneData}
     */
    Priority(priority) {
        this.priority = priority;
        return this;
    }

    /**
     * @description set the action of this event
     * @param {function} action
     * @returns {SceneData}
     */
    Action(action) {
        this.action = action;
        return this;
    }

    /**
     * @description set the character of this event
     * @param {string} charaId
     * @returns {SceneData}
     */
    Chara(charaId) {
        this.chara = charaId;
        return this;
    }

    /**
     * @description set the characters of this event
     * @param  {...string} charaIds
     * @returns {SceneData}
     */
    Characters(...charaIds) {
        this.chara = charaIds;
        return this;
    }

    /**
     * @description set the scene stage of this event
     * @param {string} baseScene
     * @returns {SceneData}
     */
    Stage(baseScene) {
        this.stageScene = baseScene;
        return this;
    }

    /**
     * @description set the destination of this event
     * @param {string} destination
     * @returns {SceneData}
     */
    Toward(destination) {
        this.toward = destination;
        return this;
    }

    /**
     * @description fast unset the event at next button
     * mostly used for one scene event
     */
    unsetAtNext() {
        this.eventnext = true;
        this.nextcode = '<<=iEvent.unsetEvent()>>';
        return this;
    }

    //----------------------------------------------------------------
    //
    //  Utils Functions
    //
    //----------------------------------------------------------------

    /**
     * @description check and get available branch
     * @returns {string}
     */
    checkBranch() {
        const branches = this.branches;
        if (!branches) return;
        if (branches.length == 0) return;

        const defaultBranch = branches.find(branch => branch.cond == 'default' || branch.cond == 'bySet');
        const branch = branches.filter(branch => typeof branch.cond == 'function' &&  branch.cond());

        let branchName = '';

        if (branch.length == 0 && defaultBranch) {
            branchName = defaultBranch.name;
        }
        else if (branch.length > 0) {
            branchName = branch[0].name;
        }

        return branchName;
    }

    /**
     * @description check if this event has certain branch
     * @param {string} branchname
     * @returns {boolean}
     */
    hasBranch(branchname) {
        if (!this.branches) return false;

        const branch = this.branches.find(branch => branch.name == branchname);
        return typeof branch !== 'undefined';
    }

    findSeries() {
        const id = this.seriesId;
        const series = iEvent.getSeries(this.eventType, id);
        if (!series) {
            throw new Error(`Series ${id} not found`);
        }
        return series;
    }
}

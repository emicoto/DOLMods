/* eslint-disable no-use-before-define */

class TriggerData {
    constructor(type = 'scene', callback = () => true) {
        this.type = type;
        this.cond = callback;
    }
    set(obj) {
        for (const key in obj) {
            if (!this[key]) {
                this[key] = clone(obj[key]);
            }
        }
        return this;
    }
    onCheck(passage) {
        if (this.type === 'scene') {
            if (this.scene && this.scene === V.scene) {
                return this.cond();
            }
            else if (!this.scene) {
                return this.cond();
            }
        }

        if (this.type === 'passage') {
            return this.checkPasssage(passage) && this.cond();
        }

        if (this.type === 'location') {
            return this.checkLocation() && this.cond();
        }

        if (this.type === 'match') {
            return this.checkMatch(passage) && this.cond();
        }

        return false;
    }
    checkLocation() {
        if (!this.location) {
            return false;
        }
        // location should be an array
        return this.location.includes(V.location);
    }
    /**
     *
     * @param {string} passage
     * @returns {boolean}
     */
    checkPasssage(passage) {
        if (!this.passage) {
            return false;
        }
        return this.passage === passage;
    }
    checkCond() {
        return this.cond();
    }
    /**
     *
     * @param {string} passage
     * @returns {boolean}
     */
    checkMatch(passage) {
        if (!this.match) {
            return false;
        }
        return passage.match(this.match);
    }
}

class PlayOptions {
    constructor(type = 'scene', arg = '') {
        this.type = type;
        this.arg = arg;
    }
    set(obj) {
        for (const key in obj) {
            if (!this[key]) {
                this[key] = clone(obj[key]);
            }
        }
        return this;
    }
}


class SceneData {
    constructor(eventId = '', type = '', priority = 0) {
        this.type = type;
        this.Id = eventId;
        this.priority = priority;

        this.trigger = new TriggerData();
        this.playOptions = new PlayOptions();
    }
    setData(obj) {
        for (const key in obj) {
            if (!this[key]) {
                this[key] = clone(obj[key]);
            }
        }
        return this;
    }

    initBranches() {
        if (this.branches && this.branches.length > 0) {
            this.branches = this.branches.map(
                branch =>
                    new BranchData(branch.Id, this.type, branch.priority ?? 0).setParent(this.Id).setData(branch)
            );
        }
        return this;
    }

    /**
     * set flag fields of this event which will be checked when the event is triggered
     * @param  {...string} fields
     * @returns {SceneData}
     */
    Flags(...fields) {
        this.flagfields = fields;
        return this;
    }

    Branches(...branches) {
        this.branches = branches;
        return this;
    }

    /**
     * set the trigger of this event
     * @param {triggerOption} trigger
     * @returns {SceneData}
     */
    Trigger(trigger) {
        this.trigger = trigger;
        return this;
    }

    /**
     * set the play options of this event
     * @param {playOption} options
     * @returns {SceneData}
     */
    PlayOptions(options) {
        this.playOptions = options;
        return this;
    }

    RandomBranch(size = 1) {
        this.randomSize = size;
        return this;
    }

    getRandomBranch() {
        if (this.branches.length === 0) {
            return `No${Random(1, this.randomSize)}`;
        }

        return this.branches[Random(0, this.branches.length - 1)];
    }

    findBranch(id) {
        return this.branches.find(branch => branch.Id === id);
    }

    // get branch by availbility condition
    getBranch() {
        if (this.randomSize) {
            return this.getRandomBranch();
        }

        if (this.branches.length === 0) {
            return false;
        }

        for (const branch of this.branches) {
            if (branch.cond()) {
                return branch;
            }
        }

        return false;
    }

    sort() {
        this.branches.sort((a, b) => a.priority - b.priority);
    }

    /**
     * set actions when the event is running
     * @param {actionType} action
     * actiontype: nextButton/leave/onPhase/before/after/branch_X/phase_X, X is the number or id of the branch or phase
     * the action will be triggered when the condition is met
     * nextButton: trigger when the next button is clicked
     * leave: trigger when the event is leaving
     * onPhase: trigger when the phase is changing
     * before: trigger before the event starts
     * after: trigger after the event ends
     * branch_X: trigger when the branch X starts
     * phase_X: trigger when the phase X starts
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
}


class BranchData extends SceneData {
    constructor(branchId = '', type = '', priority = 0) {
        super(branchId, type, priority);
        this.trigger = new TriggerData('branch');
    }
    setParent(parentId) {
        this.parentId = parentId;
        return this;
    }
}

class combatEvent {
    constructor(config) {
        for (const [key,value] of Object.entries(config)) {
            this[key] = value;
        }
    }
    /**
     * @param {string} key
     * @param {function} callback
     * @returns {combatEvent}
     */
    setAction(callback) {
        this.action = callback;
        return this;
    }

    /**
     *
     * @param {string} key
     * @param {function} callback
     * @returns {combatEvent}
     */
    setCondition(callback) {
        this.condition = callback;
        return this;
    }

    /**
     * set the feedback  to tell player what happened
     * @param {string} key
     * @param {any} content
     * @returns {combatEvent}
     */
    setFeedback(content) {
        this.feedback = content;
        return this;
    }

    /**
     * set value to the property
     * @param {string} prop
     * @param {any} value
     * @returns {combatEvent}
     */
    set(prop, value) {
        this[prop] = value;
        return this;
    }
}

/**
 * @class combatFeedback
 * @param {object} feedback
 * @param {object} config
 * @description 战斗中的反馈文本
 * @property {{ text: object, args: object[] }} feedback
 */
function combatFeedback(feedback, config) {
    /**
     * @type {{ text: object, args: object[] }}
     */
    this.feedback = feedback;
    for (const [key, value] of Object.entries(config)) {
        this[key] = value;
    }
}

/**
 * @class combatState
 * @description 战斗进程的状态
 * @property {boolean} running
 * @property {boolean} skip
 * @property {string} current
 * @property {string} event
 * @property {string} mode
 */
function combatState() {
    this.running = true;
    this.skip = false;
    this.current = 'onInit';
    this.event = 'onInit';
    this.mode = 'combat';
}

/**
 * @class combatConfig
 * @param {combatConfig} config
 * @description 战斗进程的配置
 * @property {boolean} forceskip
 * @property {string} situation
 * @property {string} enemytype
 * @property {object} next
 * @property {string} current
 * @property {string} prev
 * @property {object} endcombat
 * @property {string[]} skipevent
 * @property {object[]} history
 * @property {function} func
 * @property {string} key
 */
function combatConfig(config) {
    this.situation = 'rape';
    this.enemytype = 'man';
    this.next = {};
    this.current = 'turnstart';
    this.prev = '';
    this.skipevent = [];
    this.history = [];

    for (const [key, value] of Object.entries(config)) {
        this[key] = value;
    }
}

/**
 * @class turnConfig
 * @param {turnConfig} config
 * @description 回合的配置
 * @property {boolean} skip
 * @property {number} total
 * @property {number} arousal
 * @property {number} arousalmax
 * @property {string} event
 * @property {string} type
 * @property {string} enemyaction
 * @property {string} playeraction
 */
function turnConfig(config) {
    this.skip = false;
    this.total = 0;
    this.arousal = 0;
    this.arousalmax = 0;
    this.event = 'onInit';
    this.type = 'turnstart';

    for (const [key, value] of Object.entries(config)) {
        this[key] = value;
    }
}
/**
 * @typedef {object} iCombat
 */
const iCombat = {
    /**
     * @type {combatState}
     * @description 战斗进行的状态
     */
    state : {},

    /**
     * @type {combatConfig}
     * @description 战斗进程全局配置
     */
    config : {},

    /**
     * @type {turnConfig}
     * @description 每回合的配置
     */
    turn : {},

    /**
     * @type {Array<combatEvent>}
     * @description 检测是否可以执行战斗事件
     */
    onCheck : [],
    
    /**
     * @type {Map<string, combatEvent>}
     * @description 初始化时执行的事件
     */
    onInit : new Map(),// 因为战斗指令与事件具有唯一性且需互相匹配，这里使用Map.

    /**
     * @type {Map<string, combatEvent>}
     * @description 战斗中执行的事件
     */
    onAction : new Map(),

    /**
     * @type {Map<string, combatEvent>}
     * @description 敌人回合执行的事件
     */
    onEnemyTurn : new Map(),

    /**
     * @type {Map<string, combatEvent>}
     * @description 玩家回合执行的事件
     */
    onPlayerTurn : new Map(),

    /**
     * @type {Map<string, combatEvent>}
     * @description 回合开始时执行的事件
     */
    onTurnStart : new Map(),

    /**
     * @type {Map<string, combatEvent>}
     * @description 回合结束时执行的事件
     */
    onTurnEnd : new Map(),

    /**
     * @type {Map<string, combatEvent>}
     * @description 战斗结束时执行的事件
     */
    onEnd : new Map(),

    /**
     * @type {Map<string, combatFeedback>}
     * @description 战斗中的反馈文本
     */
    feedbacks : [], // 反馈文本

    //-----------------------------------------------------------------------------
    //
    //   register
    //
    //-----------------------------------------------------------------------------
    /**
    * check register
    * @param {combatEvent} config
    * @returns {combatEvent}
    */
    setCheck(config) {
        this.onCheck.push(new combatEvent(config));
        return this.onCheck[this.onCheck.length - 1];
    },
   
    /**
     *
     * @param {string} key
     * @param {combatEvent} config
     * @returns {combatEvent}
     */
    setInit(key, config) {
        this.onInit.set(key, new combatEvent(config));
        return this.onInit.get(key);
    },
    /**
     *
     * @param {string} key
     * @param {combatEvent} config
     * @returns {combatEvent}
     */
    setAction(key, config) {
        this.onAction.set(key, new combatEvent(config));
        return this.onAction.get(key);
    },

    /**
     * @param {string} key
     * @param {combatEvent} config
     * @returns {combatEvent}
     * @description 敌人回合执行的事件
     */
    setEnemyTurn(key, config) {
        this.onEnemyTurn.set(key, new combatEvent(config));
        return this.onEnemyTurn.get(key);
    },

    /**
     * @param {string} key
     * @param {combatEvent} config
     * @returns {combatEvent}
     * @description 玩家回合执行的事件
     */
    setPlayerTurn(key, config) {
        this.onPlayerTurn.set(key, new combatEvent(config));
        return this.onPlayerTurn.get(key);
    },
    
    /**
     * @param {string} key
     * @param {combatEvent} config
     * @returns {combatEvent}
     * @description 回合开始时执行的事件
     */
    setTurnStart(key, config) {
        this.onTurnStart.set(key, new combatEvent(config));
        return this.onTurnStart.get(key);
    },

    /**
     * @param {string} key
     * @param {combatEvent} config
     * @returns {combatEvent}
     * @description 回合结束时执行的事件
     */
    setTurnEnd(key, config) {
        this.onTurnEnd.set(key, new combatEvent(config));
        return this.onTurnEnd.get(key);
    },

    /**
     * @param {string} key
     * @param {combatEvent} config
     * @returns {combatEvent}
     * @description 战斗结束时执行的事件
     */
    setEnd(key, config) {
        this.onEnd.set(key, new combatEvent(config));
        return this.onEnd.get(key);
    },


    endCombat() {
        this.state = {};
        this.feedbacks = [];
        this.config = {};
    },

    pushFeedback() {
        for (const [key, value] of Object.entries(this.feedbacks)) {
            if (typeof value == 'string') {
                V.addMsg += `${value}<br>`;
            }
            else if (typeof value == 'function') {
                V.addMsg += `${value()}<br>`;
            }

            delete this.feedbacks[key];
        }
    },

    initData() {
        // 重新排序onInit 和 onAction，如果有priority属性，则按照priority从大到小排序
        // 如果没有priority属性，则往前排，有数值的往后排，保证先执行的都是没有priority的
        const onInit = Object.entries(this.onInit).sort((a, b) => {
            if (a[1].priority && b[1].priority) {
                return b[1].priority - a[1].priority;
            }
            else if (a[1].priority) {
                return 1;
            }
            else if (b[1].priority) {
                return -1;
            }
            
            return 0;
        });

        const onAction = Object.entries(this.onAction).sort((a, b) => {
            if (a[1].priority && b[1].priority) {
                return b[1].priority - a[1].priority;
            }
            else if (a[1].priority) {
                return 1;
            }
            else if (b[1].priority) {
                return -1;
            }

            return 0;
        });

        this.onInit = onInit.reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});

        this.onAction = onAction.reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});
    },

    init() {
        this.state = {
            running : true,
            skip    : false,
            event   : 'onInit',
            mode    : 'combat',
            current : 'onInit'
        };

        const config = {};

        // 检查否存在需要提前进行预处理的内容
        for (const [event, command] of Object.entries(this.onInit)) {
            if (command.condition && !command.condition()) continue;

            // 执行预处理
            const cfg = command.action(this);

            if (cfg) {
                for (const [key, value] of Object.entries(cfg)) {
                    config[key] = clone(value);
                }
            }

            if (command.feedback) {
                this.feedbacks[event] = command.feedback;
            }

            if (command.forceskip || config?.forceskip) {
                this.state.skip = true;
                break;
            }
        }

        if (this.state.skip) return;

        // 初始化完毕后，执行反馈文本。
        this.pushFeedback();
        this.config = config;
    },

    //-----------------------------------------------------------------------------
    //
    //    main process
    //
    //-----------------------------------------------------------------------------
    process() {
        if (!this.state.running) return;
        if (this.state.skip) return;

        let next;

        for (const [key, action] of Object.entries(this.onAction)) {
            // 如果前一个事件抛出了callback，执行callback；
            if (next?.func) {
                next.func();
            }
 
            // 如果有条件，且条件不满足，则跳过
            if (action.condition && !action.condition()) continue;

            // 如果有反馈文本，则添加到反馈文本中
            if (action.feedback) {
                this.feedbacks[key] = action.feedback;
            }

            // 执行行为
            action.action(next);

            // 如果有联动事件，则抛到下一个事件中
            if (action.next) {
                next = action.next;
            }
            else {
                next = undefined;
            }
        }

        // 执行完毕后，执行反馈文本。
        this.pushFeedback();
    }
};


Object.defineProperties(window, {
    iCombat : { value : iCombat, writable : false }
});

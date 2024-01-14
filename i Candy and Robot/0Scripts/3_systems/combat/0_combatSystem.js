/**
 * @class combatEvent
 * @property {string} id        // 事件ID
 * @property {string} type      // 事件类型
 * @property {string} actiontype// 哪个身体部位执行的行为
 * @property {string} target    // 执行行为的目标
 * @property {number} turns     // 行为准备到执行所需的回合数
 * @property {number} priority  // 优先级
 * @property {function} action  // 行为处理函数
 * @property {function} condition// 行为是否能执行的判断函数
 * @property {function} filter   // 行为是否在UI上可选的条件函数
 * @property {object} feedback   // 行为反馈数据
 * @property {string[]} tags     // 事件标签
 * @property {number}  time      // 经过的时间
 * @property {object}  next      // 联动事件、动作的设置
 * @property {boolean} forceable // 条件达到时是否可以无视玩家操作而强制执行
 * @property {boolean} autokeep  // 是否在执行完毕后自动保持
 */
class combatEvent {
    /**
     * @param {combatEvent} config
     */
    constructor(id, type, config) {
        this.id = id;
        this.type = type;
        this.config = {};

        if (config) {
            for (const [key,value] of Object.entries(config)) {
                this[key] = value;
            }
        }
    }
    /**
     * @param {string} key
     * @param {function} callback
     * @returns {combatEvent}
     */
    Action(callback) {
        this.action = callback;
        return this;
    }

    /**
     *
     * @param {string} key
     * @param {function} callback
     * @returns {combatEvent}
     */
    Cond(callback) {
        this.condition = callback;
        return this;
    }

    Skip(...event) {
        this.type = 'skipcheck';
        this.config.skipevent = event;
        return this;
    }

    /**
     * set the feedback  to tell player what happened
     * @param {string} key
     * @param {any} content
     * @returns {combatEvent}
     */
    Feedback(content) {
        this.feedback = content;
        return this;
    }

    Config(display, config) {
        this.configurable = true;
        this.displayId = display;
        this.config = config;
        return this;
    }

    Next(eventId, turn = 1) {
        this.next = {
            id : eventId,
            turn
        };
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

class combatFilter {
    constructor(id, condition) {
        this.id = id;
        this.condition = condition;
    }
    
    Config(name, config) {
        this.configurable = true;
        this.name = name;
        this.config = config;
        return this;
    }

    Cond(callback) {
        this.condition = callback;
        return this;
    }
}

/**
 * @class combatFeedback
 * @param {object} feedback
 * @param {object} config
 * @description 战斗中的反馈文本
 * @property {object} text      // 文本内容。一般为模板字符串
 * @property {object[]} args    // 文本参数
 * @property {function} getArgs // 获取文本参数的函数
 * @property {string} type      // 文本类型
 * @property {string} pos       // 文本显示位置
 */
function combatFeedback(config) {
    for (const [key, value] of Object.entries(config)) {
        this[key] = value;
    }
}

/**
 * @class combatState
 * @description 战斗进程的状态
 * @property {boolean} running  // 战斗是否正在进行
 * @property {boolean} skip     // 是否跳过运作处理
 * @property {string} current   // 系统当前状态
 * @property {string} event     // 处理中事件
 * @property {string} mode      // 战斗模式
 */
function combatState(state = 'init', event = 'onInit', mode = 'encount') {
    this.running = true;
    this.skip = false;
    this.current = state;
    this.event = event;
    this.mode = mode;
}

/**
 * @class combatConfig
 * @param {combatConfig} config
 * @description 战斗进程的配置
 * @property {string} situation
 * @property {string} enemytype
 * @property {combatConfig} next
 * @property {string} current
 * @property {combatConfig} prev
 * @property {object} endcombat
 * @property {string[]} skipevent
 * @property {object[]} history
 */
function combatConfig(config) {
    this.situation = 'rape';
    this.enemytype = 'man';
    this.next = {};
    this.current = 'turnstart';
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
 * @property {boolean} skip         // 是否跳过当前回合的处理
 * @property {number} total         // 敌人总数
 * @property {number} arousal       // 敌人总体的兴奋度
 * @property {number} arousalmax    // 敌人总体的最大兴奋度
 * @property {string} event         // 当前回合的事件
 * @property {string} prev          // 上一回合的事件

 * @property {string} type          // 当前回合的类型
 * @property {string} current       // 当前回合的状态
 * @property {string[]} enemyaction // 敌人行为列表
 * @property {string[]} playeraction// 玩家行为列表
 * @property {turnConfig[]} history // 回合历史
 */
function turnConfig(config) {
    this.skip = false;
    this.total = 0;
    this.arousal = 0;
    this.arousalmax = 0;
    this.event = 'molest';
    this.type = 'enemyturn';
    this.current = 'start';

    for (const [key, value] of Object.entries(config)) {
        this[key] = value;
    }
}
/**
 * @class iCombat
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
    Filter(config) {
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

    pushFeedback(msg) {
        // 设置反馈位置
        msg = `${msg}Msg` || 'afterMsg';

        for (let i = 0; i < this.feedbacks.length; i++) {
            const { text, getArgs, args } = this.feedbacks[i];

            const arg = getArgs ? getArgs() : args;

            V[msg] += P.templet(text, ...arg);
        }

        this.feedbacks = [];
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

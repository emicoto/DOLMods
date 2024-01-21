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
        this.skipEvent = event;
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

    Config(config) {
        this.configurable = true;
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

    EnemyAction(...action) {
        this.enemyAction = action;
        return this;
    }

    EventAction(...action) {
        this.eventAction = action;
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
    
    Config(config) {
        this.configurable = true;
        this.config = config;
        return this;
    }

    Cond(callback) {
        this.condition = callback;
        return this;
    }

    set(prop, value) {
        this[prop] = value;
        return this;
    }
}

/**
 * @class combatFeedback
 * @description 战斗中的反馈文本
 * @property {object} text      // 文本内容。一般为模板字符串
 * @property {object[]} args    // 文本参数
 * @property {function} getArgs // 获取文本参数的函数
 * @property {string} type      // 文本类型
 * @property {string} pos       // 文本显示位置
 */
function combatFeedback(text) {
    this.text = text;
    this.args = [];
    this.type = 'message';
    this.pos = 'add';
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
 * @property {turnConfig[]} next
 * @property {string} current
 * @property {combatConfig} prev
 * @property {object} endcombat
 * @property {string[]} skipevent
 * @property {object[]} history
 */
function combatConfig(config) {
    this.situation = 'rape';
    this.enemytype = 'man';
    this.next = [];
    this.current = 'turnstart';
    this.skipevent = [];
    this.history = [];

    if (config) {
        for (const [key, value] of Object.entries(config)) {
            this[key] = value;
        }
    }
}

/**
 * @class turnConfig
 * @param {turnConfig} config
 * @description 回合的配置
 * @property {boolean} skip         // 是否跳过当前回合的处理
 * @property {string} event         // 当前回合的事件
 * @property {string} prev          // 上一回合的事件

 * @property {string} type          // 当前回合的类型
 * @property {string} current       // 当前回合的状态
 * @property {string[]} playeraction// 玩家行为列表
 * @property {object[]} next      // 下一回合的配置
 */
function turnConfig(config) {
    this.skip = false;
    this.event = 'molest';
    this.type = 'enemyturn';
    this.current = 'start';
    this.skipEvent = [];
    this.playerAction = [];
    this.eventAction = [];
    this.next = [];

    if (config) {
        for (const [key, value] of Object.entries(config)) {
            this[key] = value;
        }
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
    add(type, ...config) {
        if (type == 'check') {
            this.onCheck.push(...config);
            return;
        }

        for (let i = 0; i < config.length; i++) {
            const com = config[i];
            this[type].set(com.id, com);
        }
    },

    regist(type, config) {
        this[type].set(config.id, config);
        return this[type].get(config.id);
    },

    endCombat() {
        this.state = {};
        this.feedbacks = [];
        this.config = {};
        delete this.temp;
    },

    pushFeedback(msg) {
        if (this.feedbacks.length == 0) return;

        // 设置反馈位置
        if (!msg) msg = 'after';
        let mPos = `${msg}Msg`;

        for (let i = 0; i < this.feedbacks.length; i++) {
            const { text, getArgs, args, pos } = this.feedbacks[i];

            const arg =  getArgs?.() || args;
            if (pos) mPos = `${pos}Msg`;
            else mPos = `${msg}Msg`;

            V[mPos] += P.templet(text, ...arg);
        }

        // 清空反馈列表
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

    getConfig(comId) {
        return iMod.getCf(comId);
    },
    //-----------------------------------------------------------------------------
    //
    //    temporary process handle
    //
    //-----------------------------------------------------------------------------
    /**
     * @description 检测是否运行特殊战斗处理
     */
    checkStart() {
        const checklist = this.onCheck;
        this.state = new combatState();

        for (let i = 0; i < checklist.length; i++) {
            const com = checklist[i];
            const config = this.getConfig(com.id) || com.config;

            console.log('check:', com.id, config, com.condition(config));

            if (com.condition(config)) {
                this.state.skip = true;
                this.state.event = `${com.id}-skip`;
                break;
            }
        }
    },

    init() {
        this.initNPC();
        this.initConfig();
        // 初始化完毕后，执行反馈文本。
        this.pushFeedback('add');
    },

    initNPC() {
        for (let i = 0; i < V.NPCList.length; i++) {
            const npc = V.NPCList[i];
            if (!npc.active || npc.active !== 'active') continue;
            console.log('init npc:', npc, npc.name);

            const list = Array.from(this.onInit.values());
            for (let k = 0; k < list.length; k++) {
                const com = list[k];
                if (!com) continue;

                const config = this.getConfig(com.id) || com.config;
                if (com.condition && !com.condition(npc, config)) continue;

                // 执行预处理
                const feedback = com?.action(npc, config);

                // 如果有反馈文本，则添加到反馈列表中
                if (feedback) {
                    this.feedbacks.push(feedback);
                }
            }
        }
    },

    initConfig() {
        // 最后统一处理设置，确定战斗进程的配置
        this.config = new combatConfig();
        this.config.enemytype = V.enemytype;
        
        // 更新situation
        if (V.enemynomax >= 2 && !V.consensual) {
            this.config.situation = 'gangbang';
        }
        else if (V.enemynomax >= 2) {
            this.config.situation = 'groupsex';
        }
        else if (V.consensual) {
            this.config.situation = 'sex';
        }

        if (V.npc.length > 0) {
            this.config.situation += '-NamedNPC';
        }

        this.state.turns = 0;
    },


    turnStart() {
        this.state.turns += 1;
        const next = this.turn.next;
        this.turn = new turnConfig();
        if (next) {
            this.turn.enemysetting = next;
        }

        // 初始化全局回合事件
        const turnstart = Array.from(this.onTurnStart.values()).filter(com => com.type !== 'npc');
        
        for (let i = 0; i < turnstart.length; i++) {
            const com = turnstart[i];
            const config = this.getConfig(com.id) || com.config;

            if (com.condition && !com.condition(config)) continue;
            // 执行预处理
            let feedback;
            if (typeof com.action == 'function') {
                feedback = com.action(this.turn, config);
            }
            
            // 如果有反馈文本，则添加到反馈列表中
            if (feedback) {
                this.feedbacks.push(feedback);
            }

            // regist the turn action and event
            const list = ['skipEvent', 'enemyAction', 'playerAction', 'eventAction'];
            for (let k = 0; k < list.length; k++) {
                const key = list[k];
                if (com[key]) this.turn[key].push(...com[key]);
            }
        }

        // 初始化npc回合事件，并获取npc的行为
        const npcstart = Array.from(this.onTurnStart.values()).filter(com => com.type === 'npc');

        for (let i = 0; i < npcstart.length; i++) {
            const com = npcstart[i];
            const config = this.getConfig(com.id) || com.config;

            for (let n = 0; n < V.NPCList.length; n++) {
                const npc = V.NPCList[n];
                if (npc.active !== 'active') continue;

                if (!npc.action) npc.action = [];

                console.log('npc start:', com.id, npc, config, com.condition(npc, config));

                if (com.condition && !com.condition(npc, config)) continue;
                // 执行预处理
                let feedback;
                if (typeof com.action === 'function') {
                    feedback = com.action(this.turn, npc, config);
                }

                // 如果有反馈文本，则添加到反馈列表中
                if (feedback) {
                    this.feedbacks.push(feedback);
                }

                // regist the turn action and event
                const list = ['skipEvent', 'eventAction'];
                for (let k = 0; k < list.length; k++) {
                    const key = list[k];
                    if (com[key]) this.turn[key].push(...com[key]);
                }

                if (com.enemyAction) {
                    console.log('npc action:', com.enemyAction);
                    npc.action.push(...com.enemyAction);
                }
            }
        }

        // 初始化完毕后，执行反馈文本。
        this.pushFeedback();
    },

    playerTurn() {
        const list = ['anus', 'vagina', 'penis', 'feet', 'left', 'right', 'chest', 'thigh', 'tail', 'mouth'];

        for (let i = 0; i < list.length; i++) {
            const part = list[i];
            const actpart = `${part}action`;
            const act = V[actpart];
            const npc = V.NPCList[`${part}target`];

            console.log('on player turn:', actpart, act, npc);

            if (actpart == 0) continue;

            const com = this.onPlayerTurn.get(act);
            if (com) {
                const config = this.getConfig(com.id) || com.config;
                action.action(this.turn, npc, part, config);
            }
        }
    },

    enemyTurn() {
        for (let n = 0; n < V.NPCList.length; n++) {
            const npc = V.NPCList[n];

            if (npc.active !== 'active' || !npc.active) continue;
            if (npc.action.length == 0) continue;

            const list = npc.action;
            
            for (let l = 0; l < list.length; l++) {
                const com = this.onEnemyTurn.get(list[l]);
                const config = this.getConfig(com.id) || com.config;
                if (!com || com.condition(npc, config)) continue;

                // 执行动作处理
                let feedback;
                if (typeof com.action === 'function') {
                    feedback = com.action(this.turn, npc, config);
                }

                // 如果有反馈文本，则添加到反馈列表中
                if (feedback) {
                    this.feedbacks.push(feedback);
                }

                // 如果有联动动作，则添加到下一回合npc的行为列表中
                if (com.next) {
                    const next = this.onEnemyTurn.get(com.next.id);
                    if (next) {
                        npc.action.push(com.next.id);
                    }
                }
            }

            // 处理完后，清空npc的行为列表
            npc.action = [];
        }
    },

    actionEvent() {
    },

    endTurn() {
    },
    /**
     * @description 临时用的战斗进程
     */

    process() {
        // 记录前一回合的事件
        if (this.turn.current) {
            this.config.history.push(this.turn);
        }

        // 回合开始时的预处理
        this.startTurn();

        // 先执行玩家回合，对玩家的输入进行处理
        this.playerTurn();

        // 玩家回合结束后，执行敌人回合
        this.enemyTurn();

        // 检测战斗中事件
        this.actionEvent();

        // 回合结束时的预处理
        this.endTurn();
    }
};


Object.defineProperties(window, {
    iCombat      : { value : iCombat, writable : false },
    combatEvent  : { value : combatEvent, writable : false },
    combatFilter : { value : combatFilter, writable : false },
    combatState  : { value : combatState, writable : false },
    combatConfig : { value : combatConfig, writable : false },
    turnConfig   : { value : turnConfig, writable : false }
});

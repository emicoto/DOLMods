
setup.DOLNPCNames = {
    Avery          : ['Avery', '艾弗利'],
    Bailey         : ['Bailey', '贝利'],
    Briar          : ['Briar', '布莱尔'],
    Charlie        : ['Charlie', '查理'],
    Darryl         : ['Darryl', '达里尔'],
    Doren          : ['Doren', '多伦'],
    Eden           : ['Eden', '伊甸'],
    Gwylan         : ['Gwylan', '格威岚'],
    Harper         : ['Harper', '哈珀'],
    Jordan         : ['Jordan', '约旦'],
    Kylar          : ['Kylar', '凯莱尔'],
    Landry         : ['Landry', '兰德里'],
    Leighton       : ['Leighton', '礼顿'],
    Mason          : ['Mason', '梅森'],
    Morgan         : ['Morgan', '摩根'],
    River          : ['River', '瑞沃'],
    Robin          : ['Robin', '罗宾'],
    Sam            : ['Sam', '萨姆'],
    Sirris         : ['Sirris', '西里斯'],
    Whitney        : ['Whitney', '惠特尼'],
    Winter         : ['Winter', '温特'],
    'Black Wolf'   : ['Black Wolf', '黑狼'],
    Niki           : ['Niki', '尼奇'],
    Quinn          : ['Quinn', '奎恩'],
    Remy           : ['Remy', '雷米'],
    Alex           : ['Alex', '艾利克斯'],
    'Great Hawk'   : ['Great Hawk', '巨鹰'],
    Wren           : ['Wren', '伦恩'],
    Sydney         : ['Sydney', '悉尼'],
    'Ivory Wraith' : ['Ivory Wraith', '白色幽灵'],
    Zephyr         : ['Zephyr', '泽菲尔']
};

setup.dolbus = [
    'nightingale',
    'domus',
    'elk',
    'high',
    'starfish',
    'barb',
    'connudatus',
    'wolf',
    'harvest',
    'oxford',
    'danube',
    'mer',
    'cliff',
    'industrial',
    'residential',
    'commercial',
    'park',
    'industrialdrain',
    'residentialdrain',
    'commercialdrain',
    'seabeach',
    'searocks',
    'seadocks',
    'seacliffs',
    'drainexit',
    'sea',
    'lakebus'
];

setup.ModLocationPNG = [];
setup.ModLocationGIF = [];

const lancheck = setInterval(() => {
    if (typeof setup !== 'object') { return; }

    if (window.modI18N || setup.breastsizes[1] == '微隆的') {
        setup.language = 'CN';
    }
    else {
        setup.language = 'EN';
    }

    if (setup.language == 'CN' || setup.language == 'EN' && setup.breastsizes[1] !== '微隆的') {
        clearInterval(lancheck);
        $(document).trigger('languageChecked');
    }
}, 60);

//------------------------------------------------------
//
//  新增特征与刺青支持
//
//------------------------------------------------------
setup.ModTraits = [];
setup.ModTraitTitle = [];
setup.addModTrait = function () {
    const Traits = [
        'General Traits',
        'Special Traits',
        'School Traits',
        'Trauma Traits',
        'NPC Traits',
        'Hypnosis Traits',
        'Acceptance Traits'
    ];

    console.log(Traits);
    const initTraits = function (trait) {
        const { addto, name, cond, text, colour } = trait;
        let index;

        if (addto) {
            index = Traits.indexOf(addto);
        }

        const option = {
            name : lanSwitch(name),
            has  : typeof cond === 'function' ? cond() : cond,
            text : lanSwitch(text),
            colour
        };

        return [option, index];
    };

    setup.ModTraitTitle.forEach(option => {
        if (String(option) == '[object Object]') {
            const traits = [];

            if (Array.isArray(option.traits)) {
                option.traits.forEach(trait => {
                    const [data, index] = initTraits(trait);
                    traits.push(data);
                });
            }

            T.traitLists.push({
                title : lanSwitch(option.display),
                traits
            });

            Traits.push(option.title);
        }
    });

    setup.ModTraits.forEach(trait => {
        const [data, index] = initTraits(trait);
        T.traitLists[index].traits.push(data);
    });
};


setup.modTattoos = [];
setup.addBodyWriting = function () {
    setup.modTattoos.forEach(obj => {
        const item = {
            index   : Object.keys(setup.bodywriting).length,
            writing : obj.name,
            type    : obj.type ?? 'text',
            writ_cn : obj.cn ?? obj.name,
            arrow   : obj.arrow ?? 0,
            special : obj.special ?? 'none',
            gender  : obj.gender ?? 'n',
            lewd    : typeof obj.lewd == 'number' ? obj.lewd : 1,
            degree  : obj.degree ?? 0,
            key     : obj.key,
            sprites : obj.sprites ?? []
        };

        setup.bodywriting[obj.key] = item;
        setup.bodywriting_namebyindex[item.index] = obj.key;
    });
};

//------------------------------------------------------
//
//  战斗动作支持
//
//------------------------------------------------------
setup.modCombatActions = [];

setup.ModCombatSetting = function () {
    console.log('ModCombatSetting', T.args);
    const [actions, actiontype] = T.args;

    setup.modCombatActions.forEach(setupAction => {
        const { displayname, value, type, condition, color } = setupAction;
        if ((typeof type === 'string' && type == actiontype || Array.isArray(type) && type.has(actiontype)) && typeof condition === 'function' && condition()) {
            const name = lanSwitch(displayname);
            actions[name] = value;
            if (typeof color === 'string') {
                T.args[2] = color;
            }
        }
    });
};

function modCombatDifficul(diffAction, action) {
    console.log('modCombatDifficul', T.args, action, diffAction);

    const actionObj = setup.modCombatActions.filter(action => action.value == diffAction)[0];
    if (actionObj && actionObj.widget && Macro.has(actionObj.widget)) {
        return `<<${actionObj.widget}>>`;
    }

    return '';
}
DefineMacroS('ModCombatDifficulty', modCombatDifficul);

//------------------------------------------------------
//
//  模组变量管理
//
//------------------------------------------------------
/**
 * iModManager is an object that provides methods to set, get, add and initialize certain game variables and configurations.
 */
const iModManager = {
    /**
    * iModManager is an object that provides methods to set, get, add and initialize certain game variables and configurations.
    */
    setCf(prop, value) {
        this.init('iModConfigs');
        V.iModConfigs[prop] = value;
    },

    /**
     * Returns the value of a configuration property.
     *
     * @param {string} prop The configuration property to get.
     * @returns {*} The value of the configuration property.
     */
    getCf(prop) {
        this.init('iModConfigs');
        return V.iModConfigs[prop];
    },

    /**
     * Sets the value of a game variable.
     *
     * @param {string} prop The game variable to set.
     * @param {*} value The value to set for the game variable.
     */
    setV(prop, value) {
        this.init('iModVar');
        V.iModVar[prop] = value;
    },

    /**
     * Adds a value to a game variable.
     * If the game variable does not already exist, it is created with the given value.
     * If it already exists, the given value is added to it.
     *
     * @template T expected Return Type
     * @param {string} prop The game variable to add value to.
     * @param {T} value The value to add to the game variable.
     * @returns {T} The new value of the game variable.
     */
    addV(prop, value) {
        this.init('iModVar');
        if (!V.iModVar[prop]) {
            V.iModVar[prop] = value;
        }
        else {
            V.iModVar[prop] += value;
        }
        return V.iModVar[prop];
    },

    /**
     * Returns the value of a game variable.
     *
     * @param {string} prop The game variable to get.
     * @returns {*} The value of the game variable.
     */
    getV(prop) {
        this.init('iModVar');
        return V.iModVar[prop];
    },

    /**
     * This function sets the value of a specific property for a particular character(NPC).
     * If the property value does not exist then it creates an empty object for that character
     * and then sets the property value.
     *
     * @param {string} chara The non-player character (NPC) identifier.
     * @param {string} prop the property to set.
     * @param {*} value the value to set for the property.
     * @returns {*} The value of the `chara` character after the new property value has been set.
     */
    setNpc(chara, prop, value) {
        this.init('iModNpc');
        if (!V.iModNpc[chara]) {
            V.iModNpc[chara] = {};
        }
        if (prop && value) {
            V.iModNpc[chara][prop] = value;
        }
        return V.iModNpc[chara];
    },

    /**
     * This function retrieves the value of a specific property for a particular character(NPC).
     * If the character or property does not exist then it creates an empty object for that character
     * and then returns the property value of that character.
     *
     * @param {string} chara The non-player character (NPC) identifier.
     * @param {string} prop the property to get.
     * @returns {*} The value of the specified property for the given character.
     */
    getNpc(chara, prop) {
        this.init('iModNpc');
        if (!V.iModNpc[chara]) {
            V.iModNpc[chara] = {};
        }
        return prop ? V.iModNpc[chara][prop] : V.iModNpc[chara];
    },

    /**
     * This function modifies the value of a specific property for a particular character(NPC).
     * The modification depends on the type of the existing property value.
     * If the existing value is a number, it is incremented by the new value.
     * If it's an array, the new value is pushed to the existing array.
     * If it's an object, the new value is merged into the existing object.
     * If the existing value is of any other type or does not exist, it is replaced by the new value.
     *
     * @param {string} prop The non-player character (NPC) identifier.
     * @param {*} value the new value to modify the existing property value.
     * @returns {*} The new value of the `prop` after modification.
     */
    npcV(prop, value) {
        this.init('iModNpc');
        if (!V.iModNpc[prop]) {
            V.iModNpc[prop] = value;
        }
        else {
            if (typeof V.iModNpc[prop] === 'number') {
                V.iModNpc[prop] += value;
            }
            else if (Array.isArray(V.iModNpc[prop])) {
                V.iModNpc[prop].push(value);
            }
            else if (typeof V.iModNpc[prop] === 'object') {
                V.iModNpc[prop] = Object.assign(V.iModNpc[prop], value);
            }
            else {
                V.iModNpc[prop] = value;
            }
        }
        return V.iModNpc[prop];
    },

    /**
     * Initializes a game variable or configuration if it doesn't already exist, and ensures that
     * the 'set' and 'get' methods exist and console logs an initialization message.
     *
     * @param {string} type The type of game variable or configuration to initialize.
     */
    init(type) {
        if (eval(`V.${type}`) == undefined) {
            eval(`V.${type} = {}`);
        }

        const modvar = eval(`V.${type}`);

        if (typeof modvar.set !== 'function' || modvar.initver !== 1) {
            console.log('init on ready:', type);
            modvar.set = function (prop, args1, args2) {
                if (!this[prop] && args2) {
                    this[prop] = {
                        [args1] : args2
                    };
                }
                else if (!this[prop] && !args2) {
                    this[prop] = args1 ?? 0;
                }
                else if (this[prop] && args2) {
                    this[prop][args1] = args2;
                }

                return this[prop];
            };
        }

        if (typeof modvar.get !== 'function' || modvar.initver !== 1) {
            modvar.get = function (prop, prop2) {
                if (!this[prop] && prop2) {
                    this[prop] = {};
                }

                return prop2 ? this[prop][prop2] : this[prop];
            };
        }

        modvar.initver = 1;
    },

    /**
     * Checks if a game variable or configuration of a certain type has a particular property.
     *
     * @param {string} type The type of game variable or configuration to check.
     * @param {string} prop The property to check.
     * @returns {boolean} True if the property exists, false otherwise.
     */
    has(type, prop) {
        if (!V[`iMod${type}`]) {
            this.init(type);
        }

        return V[`iMod${type}`][prop];
    },

    /**
     * play widgets from the given zone
     */
    play(zone, passageTitle) {
        const data = simpleFrameworks.data[zone];
        if (!data) return '';
        if (data.length == 0) return '';

        const title = passageTitle ?? V.passage;

        const html = data.reduce((result, widgets) => {
            if (String(widgets) == '[object Object]') {
                if (
                    typeof widgets.passage == 'string' && widgets.passage == title ||
                    Array.isArray(widgets.passage) && widgets.passage.includes(title) ||
                    typeof widgets.passage == 'undefined' ||
                    widgets.passage.length == 0
                ) {
                    result += `<<${widgets.widget}>>`;
                }
                else if (typeof widgets == 'string') {
                    result += `<<${widgets.widget}>>`;
                }

                return result;
            }
        }, '');

        return html;
    },

    // add to location
    addLocation(...args) {
        if (args.length == 0) return;

        let local = {};

        if (args.length == 1 && String(args[0]) == '[object Object]') {
            local = args[0];
        }
        else {
            local = {
                displayName   : lanSwitch(args[0]),
                targetPassage : args[1],
                entryPassage  : args[2],
                position      : 'before',
                condition     : 'skipEvent',
                action        : '',
                desc          : '',
                descPos       : 'before',
                value         : ''
            };
        }

        setup.locationEntries.push(local);
        return local;
    }

};
window.iMod = iModManager;

function iModonReady() {
    iMod.init('iModConfigs');
    iMod.init('iModVar');
    iMod.init('iModNpc');

    if (iMod.getCf('language')) {
        setup.language = iMod.getCf('language');
    }
    else {
        iMod.setCf('language', setup.language);
    }
}
DefineMacroS('iModonReady', iModonReady);

//------------------------------------------------------
//
//  进程处理
//
//------------------------------------------------------
setup.NPCFrameworkOnLoad = false;
function checkUpdate() {
    setup.NPCFrameworkOnLoad = true;
}

Save.onLoad.add(checkUpdate);

$(document).one(':passagedisplay', () => {
    if (passage() == 'Start' && setup.modCombatActions.length > 0) {
        console.log('Mod Combat Colours Setting');
        setup.modCombatActions.forEach(action => {
            const { value, color, mainType } = action;
            if (typeof color === 'string' && typeof mainType === 'string') {
                combatActionColours[mainType][color].push(value);
            }
        });
    }
});

$(document).on(':passagedisplay', () => {
    // 读档时的处理
    if (setup.NPCFrameworkOnLoad === true && V.passage !== 'Start' && V.passage !== 'Downgrade Waiting Room') {
        NamedNPC.clear();
        NamedNPC.update();
        setup.NPCFrameworkOnLoad = false;
    }
    else if (setup.NPCFrameworkOnLoad === true && V.passage == 'Downgrade Waiting Room') {
        setup.NPCFrameworkOnLoad = false;
        setup.NPCFrameworkOnDowngrade = true;
    }
    else if (setup.NPCFrameworkOnDowngrade === true && V.passage !== 'Downgrade Waiting Room') {
        NamedNPC.clear();
        NamedNPC.update();
        setup.NPCFrameworkOnDowngrade = false;
    }
});

$(document).on(':switchlanguage', () => {
    NamedNPC.switchlan();
});


postdisplay.onPost = function () {
    if (!V.passage || V.passage == 'Start' || V.passage == 'Downgrade Waiting Room') {
        return;
    }


    if (V.combat == 0) {
        ApplyZone.applyZone();
    }
    else {
        ApplyZone.applyCombat();
    }
};

//------------------------------------------------------
//
//  模组相关管理器
//
//------------------------------------------------------
/**
 * iModManager is an object that provides methods to manage mod variables/configurations and handle mod widgets.
 */
const iModManager = {
    /**
     * Sets the value of a configuration property.
     *  @param {string} prop The configuration property to set.
     * @param {*} value The value to set for the configuration property.
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
            console.log('[SFInfo] init on ready:', type);
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
        console.log('[SFDebug] checkzone:', zone, data);

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

            result += `<<${widgets}>>`;
            return result;
        }, '');

        console.log('[SFDebug] zoneHtml:',html);

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
    },

    isSafePeriod() {
        return V.combat == 0 && eventCheck() === false;
    }

};
window.iMod = iModManager;

function iModonReady() {
    iMod.init('iModConfigs');
    iMod.init('iModVar');
    iMod.init('iModNpc');
}
DefineMacroS('iModonReady', iModonReady);

setup.iModInit = true;

function iModOnLoad() {
    setup.iModOnLoad = true;
}

Save.onLoad.add(iModOnLoad);

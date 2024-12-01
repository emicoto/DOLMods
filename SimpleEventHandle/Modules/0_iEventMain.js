/* eslint-disable no-var */
var iEvent = (() => {
    'use strict';

    //---------------------------------------------
    //
    // data storage for events, actions, patches, listeners, post functions
    //
    //---------------------------------------------
    const _data = {
        events : {
            onScene   : new SeriesData('scene'),
            onTime    : new SeriesData('time'),
            onState   : new SeriesData('state'),
            onPassage : {},

            get(type, id) {
                const storage = _data.events[type];
                if (!storage) {
                    console.error(`Event type ${type} is not defined`);
                    return;
                }
                return _data.events[type].get(id);
            }
        },

        actions : {
            onScene : {},
            onChara : {}
        },

        postFunc : {},

        patches : {},

        listener : [],

        /**
         * add event to events storage
         * @param {string} eventType
         * @param {*} eventData
         * @returns {Map}
         */
        add(eventType, eventData) {
            const typeId = `on${eventType[0].toUpperCase()}${eventType.slice(1)}`;
            const eventStorage = this.events[typeId];
            if (!eventStorage) {
                console.error(`Event type ${eventType} is not defined`);
                return;
            }

            if (eventStorage.has(eventData)) {
                console.error(`Event ${eventData} is already defined`);
                return;
            }

            eventStorage.set(eventData.Id, eventData);
            return eventStorage;
        },

        /**
         * regist post function to postFunc storage for each passage
         * @param {string} passsageTile
         * @param {function} callback
         */
        registTo(passsageTile, callback) {
            if (!this.postFunc[passsageTile]) {
                this.postFunc[passsageTile] = [];
            }

            this.postFunc[passsageTile].push(callback);
        },

        /**
         * patch data to passage
         * @param {string} passageTitle
         * @param {*} data
         */
        patchTo(passageTitle, data) {
            if (!this.patches[passageTitle]) {
                this.patches[passageTitle] = [];
            }

            this.patches[passageTitle].push(data);
        },
        
        /**
         * add listener to listener storage
         * @param {{
         *   passages: string[],
         *   watchvars: string[],
         *   onInit: function,
         *   onPost: function
         * }} listenerObj
         */
        listen(listenerObj) {
            this.listener.push(listenerObj);
        }
    };

    //----------------------------------------------------------------
    //
    //  short cuts for flags management
    //
    //----------------------------------------------------------------

    /**
     * initialize event flags for a series
     * @param {string} series
     * @param {string} flag
     */
    function _initFlag(series, flag) {
        if (V.eFlags[series] === undefined) {
            V.eFlags[series] = {};
        }

        if (flag && V.eFlags[series][flag] === undefined) {
            V.eFlags[series][flag] = 0;
        }
    }

    /**
     * set event flag value
     * @param {string} series
     * @param {string} flag
     * @param {number | string | boolean } value
     * @returns {number | string | boolean}
     */
    function _setFlag(series, flag, value) {
        _initFlag(series, flag);
        V.eFlags[series][flag] = value;
        return V.eFlags[series][flag];
    }

    /**
     * get event flag value
     * @param {string} series
     * @param {string} flag
     * @returns {object| number | string | boolean}
     */
    function _getFlag(series, flag) {
        _initFlag(series, flag);
        return flag ? V.eFlags[series][flag] : V.eFlags[series];
    }

    /**
     * add event value to flag, only work if flag is number
     * @param {string} series
     * @param {string} flag
     * @param {number} value
     * @returns {number}
     */
    function _addFlag(series, flag, value) {
        _initFlag(series, flag);
        V.eFlags[series][flag] += value;
        return V.eFlags[series][flag];
    }

    //----------------------------------------------------------------
    //
    //  Handle functions
    //
    //----------------------------------------------------------------
    /**
     * @description on patch passage. if has patch, append html to patch div
     */
    function _doPatch() {
        const passage = V.passage;
        let patchId = 'addAfterMsg';

        if (!_data.patches[passage]) {
            return;
        }

        // find div id addAfterMsg
        const div = document.getElementById(patchId);
        if (!div) {
            htmlTools.appendPatch('before', 'patchContents');
            patchId = 'patchContents';
        }

        _data.patches[passage].forEach(content => {
            const html = typeof content === 'function' ? content() : content;
            new Wikifier(null, `<<append #${patchId}>${html}</<append>>`);
        });
    }

    function _getFlagField(flagKeys) {
        const flags = {};
        if (!flagKeys || flagKeys.length === 0) {
            return flags;
        }
 
        for (const key of flags) {
            flags[key] = _getFlag(key);
        }

        return flags;
    }

    function _sortEvents(data) {
        if (data instanceof SeriesData) {
            data.sort();
        }

        if (typeof data == 'object' && String(data) == '[object Object]') {
            for (const key in data) {
                _sortEvents(data[key]);
            }
        }
    }

    const _state = {
        running : '',
        init    : false,
        isReady() {
            return this.init;
        },
        isIdle() {
            return this.running === 'idle';
        },
        isPlaying() {
            return this.running.includes('play:');
        },
        isRunning() {
            // if is running or playing
            return this.running.includes('running:') || this.running.includes('play:');
        },
        currentEvent() {
            if (!this.isRunning()) {
                return '';
            }
            return this.running.split(':')[1];
        }
    };

    function _initSystem() {
        for (const key in _data.events) {
            _sortEvents(_data.events[key]);
        }
        
        if (typeof Tvar == 'undefined' || typeof V.tvar == 'undefined') {
            V.tvar = {
                init : 1
            };
            Object.defineProperty(window, 'Tvar', {
                get() {
                    return V.tvar;
                }
            });
            console.log('[SF/EventSystem] variable Tvar is ready:', Tvar);
        }

        if (typeof Flags == 'undefined' || typeof V.eFlags == 'undefined') {
            V.eFlags = {};
            Object.defineProperty(window, 'Flags', {
                get() {
                    return V.eFlags;
                }
            });
            console.log('[SF/EventSystem] variable Flags is ready:', Flags);
        }

        _state.running = 'ready';
        _state.init = true;
    }

    function _onLoad() {
        if (_state.isReady() === false) {
            _initSystem();
        }

        _state.running = V.eFlags.systemState || 'idle';

        if (_state.isPlaying()) {
            const event = _state.currentEvent();
            console.log(`[SF/EventSystem] Event ${event} is running`);

            // restore event running data
        }
    }

    function _play(eventData) {
        // play event by given data
    }

    function _setEvent(eventData) {
        // set event data and ready to play by given data

    }


    return Object.seal({
        get data() {
            return _data;
        },
        get state() {
            return _state;
        },

        init   : _initSystem,
        onLoad : _onLoad,

        initFlag : _initFlag,
        setFlag  : _setFlag,
        getFlag  : _getFlag,
        addFlag  : _addFlag,
        doPatch  : _doPatch,
        getFlags : _getFlagField
    });
})();

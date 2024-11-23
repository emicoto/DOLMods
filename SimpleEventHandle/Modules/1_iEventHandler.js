/* eslint-disable no-var */
var iEventHandler = (() => {
    // Event Handler for SimpleEventHandle

    // on Navigator start
    // return false or string to override passage title
    function _onNavigator(passage, prevPassage) {
        // if already running, just return;
        if (iEvent.state.isPlaying()) {
            return false;
        }

        const eventResult = {};

        // should finish event condition check on navigator and register event at this point
        if (eventResult.state === 'regist') {
            _setEvent(eventResult);
            return eventResult.passageTitle;
        }

        return false;
    }

    // before variable change
    function _onPreHistroy(passage, prevPassage) {
        // fix wrong event at this point if player cheated
        // backup last variables and restore
        if (iEvent.state.isPlaying()) {
            const condition = _onFixEvent(passage);
            if (condition.has('restore')) {
                window.variableBackup = clone(V);
                setup.restoredPassage = condition.split(':')[1];
                return;
            }
        }
        
        // won't run if in combat
        if (V.combat !== 0) {
            return;
        }

        // if not playing but is on running state, check if set to play
        if (!iEvent.state.isPlaying() && iEvent.state.isRunning()) {

        }

        // update the last passage if it's different
        if (prevPassage && prevPassage.title !== passage.title) {
            V.lastPassage = prevPassage.title;
        }
    }

    // after passage is shown
    function _onPostPassage() {
        const passage = Story.get(V.passage);
        const lastPassage = Story.get(V.lastPassage);

        // save system state ot variable for loading event;
        V.eFlags.systemState = iEvent.state.running;

        // clear backup and do restore if needed
        if (typeof setup.restoredPassage === 'string') {
            for (const key in window.variableBackup) {
                V[key] = clone(window.variableBackup[key]);
            }
            delete window.variableBackup;
            setTimeout(() => {
                Engine.play(setup.restoredPassage);
                delete setup.restoredPassage;
            }, 300);
        }
    }

    function _setEvent(eventData) {
        // set event data to iEvent
        // iEvent.setEvent(eventData);
        iEvent.state.running = `running:${eventData.eventFullId}`;
    }

    return Object.freeze({
        onPre  : _onPreHistroy,
        onNavi : _onNavigator,
        onPost : _onPostPassage
    });
})();

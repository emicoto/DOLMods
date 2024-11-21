/* eslint-disable no-var */
var iEventHandler = (() => {
    // Event Handler for SimpleEventHandle

    function _onPreHistroy(passage, prevPassage) {
    }

    // return new passageTitle or false to use default navigator
    function _onNavigator(passage, prevPassage) {
        return false;
    }

    function _onPostPassage() {
    }

    return Object.freeze({
        onPre  : _onPreHistroy,
        onNavi : _onNavigator,
        onPost : _onPostPassage
    });
})();

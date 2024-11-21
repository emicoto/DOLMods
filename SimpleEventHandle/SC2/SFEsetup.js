postdisplay.SFEInit = function () {
    const passage = this;
    if (!passage || passage.tags.has('widget') || !V.passage) {
        return;
    }

    if (iEvent.state.isReady() === true) {
        return;
    }

    iEvent.init();
};

const OldNavigator = Config.navigation.override;

Config.navigation.override = function (passageTitle) {
    const passage = Story.get(passageTitle);
    const prevPassage = Story.get(V.passage);
    let result = OldNavigator(passageTitle);

    if (!V.passage || passage.title.has('Start', 'Downgrade Waiting Room', 'Settings') !== false) {
        return result;
    }

    const _result = iEventHandler.onNavi(passage, prevPassage);
    if (typeof _result === 'string') {
        result = _result;
        V.passageOverride = _result;
    }

    return result;
};

prehistory.SFE_Prehistory = function () {
    const passage = this;
    if (!passage || passage.tags.has('widget')) {
        return;
    }

    if (!V.passage || passage.title.has('Start', 'Downgrade Waiting Room', 'Settings') !== false) {
        return;
    }

    const lastPassage = Story.get(V.passage);

    iEventHandler.onPre(passage, lastPassage);
};


$(document).on(':postApplyZone', () => {
    // won't run if in combat
    if (V.combat !== 0) {
        return;
    }

    // do patch at first if available
    iEvent.doPatch();
    // do post passage event
    iEventHandler.onPost();
});

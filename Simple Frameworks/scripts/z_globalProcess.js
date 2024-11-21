//------------------------------------------------------
//
//  进程处理
//
//------------------------------------------------------

const lancheck = navigator.language || navigator.userLanguage;
if (lancheck.includes('zh')) {
    setup.language = 'CN';
}
else {
    setup.language = 'EN';
}


$(document).one(':passagedisplay', () => {
    if (passage() == 'Start' && setup.modCombatActions.length > 0) {
        console.log('[SFDebug] Initializing Mod Combat Colours Setting...');
        setup.modCombatActions.forEach(action => {
            const { value, color, mainType } = action;
            if (typeof color === 'string' && typeof mainType === 'string') {
                combatActionColours[mainType][color].push(value);
            }
        });
    }
});

$(document).on(':switchlanguage', () => {
    NamedNPC.switchlan();
    iMod.setCf('language', setup.language);
});

// if the current passage does not implement the content div, then add it
prehistory.updatePassageDiv = function () {
    console.log('[SFDebug] onPreInit:', this, this.title, this.element);
    const passage = this;
    if (!passage || passage.tags.has('widget')) {
        return;
    }

    if (passage.title == 'Start' || passage.title == 'Downgrade Waiting Room') {
        return;
    }

    const source = passage.element.innerText;
    if (!source.includes('passage-content')) {
        this.element.innerText = `<div id='passage-content'>${source}</div>`;
    }
};

postdisplay.onPost = function () {
    const passage = this;
    if (!passage || passage.tags.has('widget')) {
        return;
    }

    // if the language setting is not initialized
    if (!iMod.getCf('language')) {
        iMod.setCf('language', setup.language);
    }

    // when on load
    if (setup.iModOnLoad) {
        setup.language = iMod.getCf('language');
    }

    if (!V.passage || passage.title.has('Start', 'Downgrade Waiting Room', 'Settings') !== false || V.passage.has('Start', 'Downgrade Waiting Room', 'Settings') !== false) {
        return;
    }

    if (V.combat == 1) {
        ApplyZone.applyCombat();
    }
    else {
        ApplyZone.applyZone();
    }

    $(document).trigger(':postApplyZone');
};

//------------------------------------------------------
//
//  NPC相关进程处理
//
//------------------------------------------------------
postdisplay.onPostNpc = function () {
    const passage = this;
    if (!passage || passage.tags.has('widget')) {
        return;
    }

    if (!V.passage || passage.title == 'Start' || passage.title == 'Downgrade Waiting Room' || V.passage == 'Start' || V.passage == 'Downgrade Waiting Room') {
        return;
    }

    if (setup.iModOnLoad || setup.iModInit || setup.iModOnDowngrade) {
        NamedNPC.clear();
        NamedNPC.update();
        setup.iModOnLoad = false;
        setup.iModInit = false;
    }
};

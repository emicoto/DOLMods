const iUtil = {
    resetTvar(...args) {
        args.forEach(arg => {
            delete V.tvar[arg];
        });
    },

    countHomeStorage() {
        let count = 0;
        for (const i in V.iStorage.home) {
            count += V.iStorage.home[i];
        }
        return count;
    },

    countMechaItems() {
        let count = 0;
        for (const i in R.mechStats.tools) {
            count += R.mechStats[i];
        }
        return count;
    },

    getPalam(key, value) {
        const list = ['trauma', 'pain', 'tiredness', 'drunk', 'hallucinogen','control','corruption','stress', 'drugged', 'awareness'];
        if (!V.statFreeze && list.includes(key)) V[key] += value;
    },

    getPhysique(value) {
        if (V.statFreeze) {
            V.physique = Math.clamp(V.physique + value, 0, V.physiquesize);
        }
    },

    updateObj(source, target, prop) {
        if (!prop) {
            if (typeof target !== typeof source) {
                return source;
            }

            if (String(source) == '[object Object]') {
                for (const key in source) {
                    iUtil.updateObj(source, target, key);
                }
                for (const key in target) {
                    iUtil.updateObj(source, target, key);
                }

                return target;
            }
			
            return target;
        }

        if (prop) {
            // 更新变量，如果type完全不一样就直接更新了。 弃用变量的删除或type一致但版号更新之类的用精准手术法。
            if (typeof target[prop] !== typeof source[prop] && source[prop] !== undefined) {
                target[prop] = source[prop];
            }
            if (String(source[prop]) == '[object Object]') {
                for (const key in source[prop]) {
                    iUtil.updateObj(source[prop], target[prop], key);
                }
                for (const key in target[prop]) {
                    iUtil.updateObj(source[prop], target[prop], key);
                }
            }
        }
    },

    noEventRunning() {
        return V.eventskip == 0 && V.combat == 0 && V.phase == 0;
    },

    getLocation() {
        // 巴士里直接返回巴士
        if (V.passage == 'Bus' || V.passage.includes('Bus')) {
            return 'bus';
        }

        if (V.passage.includes('Stall')) {
            return 'market';
        }

        if (V.location == 'town') {
            // 根据bus返回
            return V.bus;
        }

        if (V.location == 'farm' && V.passage.includes('Livestock')) {
            return 'livestock';
        }

        if (V.location == 'alley') {
            // 根据passage返回地点
            if (V.passage.includes('Commercial')) return 'commercial_alley';
            if (V.passage.includes('Industrial')) return 'industrial_alley';
            if (V.passage.includes('Residential')) return 'residential_alley';
        }

        return V.location;
    },

    inSafeHouse() {
        const safehouse = [
            'Bedroom', 'Cabin Actions', 'Farm Bedroom', 'Temple Bunk', 'BaseScene YourApartment', 'Lake House Bedroom', 'BaseScene HotSpringHouse'
        ];

        return safehouse.includes(V.passage);
    },

    hasLockers() {
        const local = this.getLocation();
        // 学校的储物柜是免费的。
        if (local == 'school') return true;
        // 其他地方的储物柜需要解锁。
        return R.lockerOwned[local] == 1;
    },

    getHideOut() {
        if (V.passage.has('Park')) {
            return iData.hidePoint.park;
        }

        if (V.passage.has('Elk')) {
            return iData.hidePoint.elk;
        }

        if (V.passage.has('Island')) {
            return iData.hidePoint.island;
        }
    }
};


function wetAnusLub(arg) {
    V.player.bodyliquid.anus.goo += arg;
}
DefineMacroS('anusgoo', wetAnusLub);

Object.defineProperties(window, {
    iUtil : { value : iUtil },
    F     : { get() { return iUtil; } }
	
});

window.updateOptions = function () {
    if (T.currentOverlay === 'options' && T.optionsRefresh && V.passage !== 'Start') {
        updatehistorycontrols();
        const optionsData = clone(V.options);
        const tmpButtons = T.buttons;
        const tmpKey = T.key;

        setup.gameSettingChange = true;

        if (!State.restore()) return; // don't do anything if state couldn't be restored
        V.options = optionsData;
        tanned(0, 'ignoreCoverage');
        State.show();

        T.key = tmpKey;
        T.buttons = tmpButtons;
        T.buttons.setupTabs();
        if (T.key !== 'options') {
            T.buttons.setActive(T.buttons.activeTab);
        }
    }
};

window.closeOverlay = function () {
    wikifier('journalNotesTextareaSave');
    window.updateOptions();

    delete T.currentOverlay;
    delete V.tempDisable;
    T.buttons.reset();
    $('#customOverlay').addClass('hidden').parent()
        .addClass('hidden');
};

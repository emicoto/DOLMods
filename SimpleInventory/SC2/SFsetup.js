
// eslint-disable-next-line no-var
setup.SFInv_State = true;
Save.onLoad.add(() => {
    setup.SFInv_onLoad = true;
});

postdisplay.InvInit = function () {
    const passage = this;
    if (!passage || passage.tags.has('widget') || !V.passage) {
        return;
    }

    if (setup.SFInv_State !== true && setup.SFInv_onLoad === false) {
        return;
    }

    if (!V.SFInv) {
        V.SFInv = {
            global : {}
        };

        const types = SFInventory.getTypes();
        for (const type of types) {
            V.SFInv[type] = {};
        }

        const rules = SFInventory.getRules();
        for (const rule of rules) {
            rule.init();
        }
    }

    if (!iMod.getCf('SimpleInventory')) {
        SFInventory.export();
    }
    else {
        SFInventory.import();
    }

    setup.SFInv_State = 'init';
    setup.SFInv_onLoad = false;

    $(document).trigger(':inventoryInitDone');
};

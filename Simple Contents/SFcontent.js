function InitSetupContent() {
    const newItems = {
        placebo : {
            type    : 'placebo',
            name    : 'Placebo',
            cn_name : '安慰剂',
            price   : 24000
        }
    };
    
    const itemSettings = [
        {
            name          : 'placebo',
            cn_name       : '安慰剂',
            description   : 'A pill makes you feel better.',
            onTakeMessage : 'You take the pill and feel better.',
            warning_label : 'Warning: Do not take more than 2 pill per day, make cause addiction.',
            indicators    : ["<span class='hip_indic_green'>++ Control</span>","<span class='hip_indic_green'>-- Truama</span>", "<span class='hip_indic_blue'>-- Stress</span>"],
            autoTake() {
                return V.sexStats.pills.pills.placebo.autoTake;
            },
            doseTaken() {
                return V.sexStats.pills.pills.placebo.doseTaken;
            },
            owned() {
                return V.sexStats.pills.pills.placebo.owned;
            },
            type  : 'harper',
            shape : 'pill',
            overdose() {
                return V.sexStats.pills.pills.placebo.overdose;
            },
            icon      : 'img/misc/icon/strong pills.png',
            frontIcon : 'img/misc/icon/pills.png',
            
            display_condition() {
                return this.owned() > 0 ? 1 : 0;
            },
            take_condition() {
                return this.owned() > 0 ? 1 : 0;
            },
            effects : ['<<control 25>>', '<<trauma -50>>', '<<stress -12>>', '<<set $medicated += 1>>']
        }
    ];
    
    Object.assign(setup.pharmacyItems, newItems);
    setup.pills.push(...itemSettings);
}


$(document).on(':postApplyZone', () => {
    if (!setup.SFNewItemInit) {
        InitSetupContent();
        setup.SFNewItemInit = true;
    }

    if (typeof V.sexStats?.pills?.pills?.placebo === 'undefined') {
        V.sexStats.pills.pills.placebo = {
            autoTake  : false,
            doseTaken : 0,
            owned     : 0,
            overdose  : 0
        };
    }
});

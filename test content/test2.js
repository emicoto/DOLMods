/*
$(document).on(':passageinit', () => {
    if (!V) return;
    console.log('check money on init:', V.money);
});

$(document).on(':passagestart', () => {
    if (!V) return;

    console.log('check money on start:', V.money);
});

$(document).on(':passagerender', () => {
    if (!V) return;

    console.log('check money on render:', V.money);
});

$(document).on(':passagedisplay', () => {
    console.log('check money on display:', V.money);
});

$(document).on(':passageend', () => {
    console.log('check money on end:', V.money);
});

function initMoney() {
    if (!V) return;

    if (!V.money1) {
        V.money1 = V.money;
    }

    Object.defineProperty(V, 'money', {
        get() {
            console.log('get money var');
            return V.money1;
        },
        set(value) {
            console.log('set money var:', value);
            V.money1 = value;
        }
    });
    console.log('check money at ready:', V.money);

    return V.money / 100;
}

DefineMacroS('initMoney', initMoney);

function checkMoneyFunc() {
    console.log('check money func:', V.money);

    return V.money / 100;
}
DefineMacroS('checkMoneyFunc', checkMoneyFunc);
*/

function testCombat() {
    console.log('combat check:', V.combat);
    
    if (V.combat && V.combatturn == undefined) {
        V.combatturn = 0;
        console.log('combat start:', V.combatturn, V.NPCList, V.enemyarousal, V.enemyarousalmax, V.enemyhealth, V.enemyhealthmax);
    }

    if (V.combat) {
        V.combatturn++;
    }

    console.log('combat turn:', V.combatturn);

    if (V.enemyarousal >= V.enemyarousalmax || V.enemyhealth <= 0 || V.finish || T.combatend) {
        console.log('combat turnning end:', V.combatturn, V.combat,  V.enemyarousal, V.enemyarousalmax, V.enemyhealth, V.enemyhealthmax, V.finish, T.combatend);
    }

    if (!V.combat) {
        console.log('combat end:', V.combatturn, V.combat);
        V.combatturn = undefined;
    }

    return '';
}

DefineMacroS('testCombat', testCombat);


prehistory.before = function (task) {
    console.log('running at prehistory.before');
    console.log('before passage:', this, task, passage());
};

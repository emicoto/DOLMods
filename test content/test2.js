
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

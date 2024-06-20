function newMoney() {
    if (!V.money1) {
        console.log('define money1');
        V.money1 = V.money;
    }

    Object.defineProperty(V, 'money',{
        get : () => {
            console.log('get money');
            return V.money1;
        },
        set : value => {
            console.log('set money', value);
            V.money1 = value;
        }
    });
}

DefineMacroS('newMoney', newMoney);

new TimeEvent('onDay', 'NewYear')
    .Cond(timeData => timeData.current.month === 1 && timeData.current.day === 1)
    .Action(timeData => {
        console.log('Happy New Year!', timeData);
    });


new TimeEvent('onSec', 'myTimer')
    // eslint-disable-next-line prefer-arrow-callback
    .Action(function (timeData) {
        console.log('myTimer:', V.mytimer);
        console.log(timeData);

        // 经过时间检测与更新
        if (timeData.passData.passed > 0) {
            V.mytimer = V.mytimer - timeData.passData.passed;
        }
    });

TimeHandle.set('onAfter', {
    eventId : 'AfterEvent',
    func(timeData) {
        // do something after the time pass
        console.log('After event:', timeData);
    },
    cond(timeData) {
        // check the condition before the event
        console.log('After event condition:', timeData);
        return true;
    }
});

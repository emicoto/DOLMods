const oldPass = Time.pass

const TimeHandle = {
    prevDate : {},
    currentDate : {},
    passTime : function(){
        const { currentDate, prevDate } = this

        return {
            sec : currentDate.second - prevDate.second,
            min : currentDate.minute - prevDate.minute,
            day : currentDate.day - prevDate.day,
            month : currentDate.month - prevDate.month,
            year : currentDate.year - prevDate.year,
            weekday : [prevDate.weekDay, currentDate.weekDay]
        }
    }
}

Time.pass = function(sec){
    const prevDate = new DateTime(V.startDate + V.timeStamp)
    const fragment = oldPass(sec)
    const currentDate = Time.date

    console.log('passed time:',sec)
    console.log('prevDate:',prevDate)
    console.log('currentDate:', currentDate)

    TimeHandle.prevDate = prevDate
    TimeHandle.currentDate = currentDate

    iTimeHandle(sec)

    if(sec <= 0 ) return fragment 
}


function iTimeHandle(passedSec){
    const { min, day, month, year, weekday } = TimeHandle.passTime()

    if(!T.addMsg){
        T.addMsg = ''
    }

    //非战斗模式不处理低于0分的变动
    if(passedSec <= 0) return;
    if(min <= 0 && V.combat == 0) return;

    //根据事件的计算单位执行进程，先是按分钟计算的事件。
    if(min > 0 || (passedSec > 0 && V.combat == 1)){
        minuteProcess(passedSec)
    }

    if(hour > 0){
        hourProcess(passedSec, hour)
    }

    if(day > 0){
        dayProcess(passedSec, day, weekday)
    }

}

function minuteProcess(sec){
    //-------------------------------------------------------------
    //
    // 处理药物效果
    //
    //-------------------------------------------------------------
    const drugStats = R.drugStates.drugs
    const drugFlags = R.drugFlags.drugs

    for(const[drug, stats] of Object.entries(drugStats)){
        //获取药物的信息
        const drugItem = Items.get(drug)
        if(!drugItem) continue;
        

        //如果时间戳小于药物效果到期时间，运行药物效果
        if( V.timeStamp <= stats.efTimer){

            //如果药物的效果时间大于0，还没设置flag的话，设置flag
            if(drugFlags[drug].high == 0){
                drugFlags[drug].high = 1
            }

            //运行药物效果并获得通知
            if(typeof drugItem.onHigh == 'function'){
                T.addMsg += drugItem.onHigh(sec/60) + '<br>'
            }
        }
        else{
            //如果药效过去，取消flag并检测是否有清醒效果
            stats.efTimer = 0

            if(drugFlags[drug].high == 1){
                drugFlags[drug].high = 0;
                drugFlags[drug].highonce = 0

                //如果药物有清醒效果，运行清醒效果并获得通知
                if(typeof drugItem.onWake == 'function'){
                    T.addMsg += drugItem.onWake() + '<br>'
                }
            }
        }

    }

    //-------------------------------------------------------------
    //
    // 处理额外效果
    //
    //-------------------------------------------------------------
   const extraSense = R.extraSense
   for( const[type, sense] of Object.entries(extraSense)){
        iCandy.senseUpdate(sense, sec)
   }

}

function hourProcess(sec, hour){
    //-------------------------------------------------------------
    //
    // 检测药物戒断状态
    //
    //-------------------------------------------------------------
    const drugStats = R.drugStates.drugs
    const drugFlags = R.drugFlags.drugs

    for(const[drug, stats] of Object.entries(drugStats)){
        //获取药物的信息
        const drugItem = Items.get(drug)
        if(!drugItem) continue;

        //获取戒断需求时间(hour)
        const { withdraw } = drugItem
        //药物本身没有戒断设置的话，跳过
        if(!withdraw || withdraw == 0) continue;
        //药物没有上瘾的话，跳过
        if(stats.addict == 0) continue;

        //通过上次嗑药时间与当前时间的差值计算戒断时间
        const lastTime = stats.lastTime
        const withdrawTimer = Math.floor((V.timeStamp - lastTime)/3600)
      

        //戒断时间大于戒断反应时间的话，运行戒断效果并获得通知
        if(withdrawTimer >= withdraw){
            //如果设置了function，运行function
            if(typeof drugItem.onWithdraw == 'function'){
                T.addMsg += drugItem.onWithdraw() + '<br>'
            }
            //没有则运行默认的戒断效果
            else{
                T.addMsg += generalWithdraw(drugItem.name) + '<br>'
            }

            //设置戒断状态
           stats.withdraw = 1
        }
    }

    //-------------------------------------------------------------
    //
    // 检测普通成瘾品的戒断状态
    //
    //-------------------------------------------------------------
    const addictStats = R.drugStates.general
    const addictFlags = R.drugFlags.general

    for(const[addict, stats] of Object.entries(addictStats)){
        //没上瘾的话，跳过
        if(stats.addict == 0) continue;

        //通过上次吸食时间与当前时间的差值计算戒断时间
        const lastTime = stats.lastTime
        const withdrawTimer = Math.floor((V.timeStamp - lastTime)/3600)
        const withdraw = {
            alcohol: 48,
            nicotine: 36,
            aphrod: 30,
        }

        if(withdrawTimer >= withdraw[addict]){
            T.addMsg += generalWithdraw(drugItem) + '<br>'
            //设置戒断状态
           stats.withdraw = 1
        }
    }
}

function generalWithdraw(drugItem){
    wikifier('stress', 30)
    const html = {
        alcohol: lanSwitch(
                    `You haven't drunk for a while, you feel irritable and start to have withdrawal symptoms.`,
                    `有一段时间没喝酒了，你感到烦躁难受。`,
        ),
        aphrod: lanSwitch(
                    `You haven't taken aphrodisiac for a while, you're feeling lost and empty.`,
                    `你有一段时间没吸收催情类物质了，你感到空虚寂寞以及难受。`,
        ),
        nicotine: lanSwitch(
                    `You haven't smoked for a while, your mouth feels empty and you feel irritable.`,
                    `你有一段时间没吸烟了，你的嘴感觉落空空的，心情有些烦躁。`,
        ),
    }

    if(html[drugItem]){
        return html[drugItem] + '<<gggstress>>'
    }
    else{
        let html = lanSwitch(
            `You haven't taken ${drugItem[0]} for a while, you feel irritable and start to have withdrawal symptoms.`,
            `你有一段时间没吃${drugItem[1]}了，你感到烦躁，并开始出现戒断症状。`,
        )
        return html + '<<gggstress>>'
    }
}

function dayProcess(sec, day, weekday){
    //-------------------------------------------------------------
    //
    // 集算当日嗑药情况
    //
    //-------------------------------------------------------------
    const drugStats = R.drugStates.drugs
    const drugFlags = R.drugFlags.drugs

    for(const[drug, stats] of Object.entries(drugStats)){
        //获取药物的信息
        const drugItem = Items.get(drug)
        if(!drugItem) continue;

        //获取上瘾阈值，最大过量值，戒除需求时间(day)，引起戒断反应所需时间(hour)
        const { threshold, maxOD, clear, tags } = drugItem
        
        //先进行过量检测，当日使用量大于安全阈值时，增加过量计数
        if(threshold >= 0 && stats.taken >= threshold ){
            stats.overdose ++
        }

        //当近期过量次数大于最大过量值时，设置上瘾状态
        if(maxOD >= 0 && stats.overdose >= maxOD && stats.addict == 0){
            stats.addict = 1
            //设置上瘾事件flag
            drugFlags[drug].addiction = 1
        }

        //检测最后一次嗑药时间，如果超过戒除需求时间，清除上瘾状态
        //累次戒除再次染上毒瘾时，每次戒除时间增加5天，但最多不超过120天
        const clearDays = clear * 86400 + stats.cleared * 5 * 86400
              Math.min(clearDays, 120 * 86400)

        if(V.timeStamp - stats.lastTime >= clearDays ){
            stats.addict = 0
            //设置戒除事件flag
            drugFlags[drug].cleared = 1
            //添加戒除次数
            stats.cleared ++
        }

        //超量值也算是一种药效残余值，每日自然恢复3点，但如果当日有嗑过药恢复数就减少。
        if(stats.taken <= threshold ){
            if(tags.includes('strong')){
                stats.overdose = Math.max(stats.overdose - stats.taken > 0 ? 0.1 : 0.25, 0)
            }
            else if(tags.includes('risky')){
                stats.overdose = Math.max(stats.overdose - stats.taken > 0 ? 0.5 : 1, 0)
            }
            else{
                stats.overdose = Math.max(stats.overdose - stats.taken > 0 ? 1.5 : 3, 0)
            }
        }

        //如果超量值大于零，同时没有引起戒断反应，获得增益效果
        if(stats.overdose > 0 && stats.withdraw == 0){
            //确认是否有增益效果
            if(typeof drugItem.onDay == 'function'){
                T.addMsg += drugItem.onDay() + '<br>'
            }
            //没有就只是设置当日嗑药flag
            else{
                drugFlags[drug].daily = 1
            }
        }
        //每日清零当日计数器
        stats.taken = 0        
    }

    //-------------------------------------------------------------
    //
    // 集算酒精、尼古丁、催情类物质的情况
    //
    //-------------------------------------------------------------


    //-------------------------------------------------------------
    //
    // 集算当日事件
    //
    //-------------------------------------------------------------


}

//返回对应的事件文本
function addictionEvent(item){
    const general = ['alcohol', 'nicotine', 'aphrod']
    if(general.includes(item)){
        const word = {
            alcohol: lanSwitch(
                `alcohol`,
                `酒精`,
            ),
            nicotine: lanSwitch(
                `nicotine`,
                `尼古丁`,
            ),
            aphrod: lanSwitch(
                `aphrodisiacs`,
                `催情类物质`,
            )
        }

        const hours = {
            alcohol: 48,
            nicotine: 36,
            aphrod: 30,
        }
        return lanSwitch(
            `You are completed addicted to ${word[item]}, you need to take ${word[item]} to maintain normal life. If you don't take ${word[item]} within ${hours[item]} hours, you will have withdrawal symptoms.`,
            `你已经对${word[item]}彻底上瘾了，你需要吸食${word[item]}来维持正常的生活。如果${hours[item]}小时内没有吸食${word[item]}，你将会出现戒断症状。`,
        ) + '<br>'
    }
    else{
        


    }
}

//彻底戒除时的通知文本与相关事件。
function ClearEvent(item){
    const general = ['alcohol', 'nicotine', 'aphrod']
    if(general.includes(item)){
        const word = {
            alcohol: lanSwitch(
                `alcohol`,
                `酒精`,
            ),
            nicotine: lanSwitch(
                `nicotine`,
                `尼古丁`,
            ),
            aphrod: lanSwitch(
                `aphrodisiacs`,
                `催情类物质`,
            )
        }
        return lanSwitch(
            `You have completely quit ${word[item]}, as long as you don't touch ${word[item]} again, your body will gradually recover.`,
            `你已经彻底戒除了${word[item]}，只要不再沾染上${word[item]}你的身体将会逐渐恢复健康。`,
        ) + '<br>'
    }
    else{

    }
}

function iCombatHandle(){
    //非战斗场景跳过
    if(V.combat == 0) return;
    //合意场景的情况看对象是谁
    if(V.consensual == 1) return;

    let rate = V.trauma/60 + V.stress/150
    const drugs = Items.search('drugs', 'or', 'pill', 'inject')
    
    for(let i = 0; i < V.enemynomax; i++){
        let npc = V.NPCList[i]
        //不能行动的，不是人类的，已经投喂过的npc就跳过
        if(npc.stance == 'defeated' || npc.type !== 'human' || npc.feed ){
            continue;
        }

        //当PC创伤或压力高于安全阈值时，NPC高概率喂PC天使粉
        if(V.trauma >= V.traumamax * 0.6 || V.stress >= V.stressmax * 0.6 ){


        }
        //其他情况根据创伤，疼痛，压力计算概率，随机喂PC毒品 
        if(random(100) <= rate){


        }

        
    }

}

iCandy.iTimeHandle = iTimeHandle
iCandy.iCombatHandle = iCombatHandle
iCandy.minuteProcess = minuteProcess
iCandy.hourProcess = hourProcess
iCandy.dayProcess = dayProcess
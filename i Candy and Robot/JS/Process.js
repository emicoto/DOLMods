const oldPass = Time.pass

Time.pass = function(sec){
    const prevDate = new DateTime(V.startDate + V.timeStamp)
    const fragment = oldPass(sec)
    const currentDate = Time.date

    iTimeHandle(sec, prevDate, currentDate)

    console.log('passed time:',sec)
    if(sec <= 0 ) return fragment 
}

function iTimeHandle(passSeconds, prevDate, currentDate){
    const sec = passSeconds, 
    min = currentDate.minute - prevDate.minute,
    hour = currentDate.hour - prevDate.hour,
    day = currentDate.day - prevDate.day,
    month = currentDate.month - prevDate.month,
    year = currentDate.year - prevDate.year,
    weekday = [prevDate.weekday, currentDate.weekday]

}


function iCombatHandle(){
    //非战斗场景跳过
    if(V.combat == 0) return;
    //合意场景的情况看对象是谁
    if(V.consensual == 1) return;

    let rate = V.trauma/60 + V.stress/150
    const drugs = Items.get()
    
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
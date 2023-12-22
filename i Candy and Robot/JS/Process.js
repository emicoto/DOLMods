const oldPass = Time.pass

Time.pass = function(sec){
    oldPass(sec)
    console.log('passed time:',sec)
    


}


function combatHandle(){
    //非战斗场景跳过
    if(V.combat == 0) return;
    //合意场景的情况看对象是谁
    if(V.consensual == 1) return;

    //当PC创伤或压力高于安全阈值时，NPC高概率喂PC天使粉
    //其他情况根据创伤，疼痛，压力计算概率，随机喂PC毒品
    let rate = V.trauma/60 + V.stress/150
    const drugs = Items.get()
    
    for(let i = 0; i < V.enemynomax; i++){
        let npc = V.NPCList[i]
        if(npc.stance == 'defeated' || npc.type !== 'human'){
            continue;
        }
        
        if(random(100) <= rate){


        }

        
    }

}
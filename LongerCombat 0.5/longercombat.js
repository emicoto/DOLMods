function simpleEjaculation(){
    V.ejaculating = 1
    for(let i = 0; i < V.enemynomax; i++){
        if(V.NPCList[i].stance == 'defeated')
            continue

        if(V.consensual == 1)
            wikifier('famesex', 1);
        else
            wikifier('famerape', 1);

        if(wearingCondom(i)){
            if(V.NPCList[i].condom.state == 'defective')
                T.condomResult = 'leaked';
            else if (V.NPCList[i].condom.state == 'defective')
                T.condomResult = 'burst';
            else
                T.condomResult = 'contained';
        }
        else{
            T.condomResult = 'none';
        }

        if(T.condomResult == 'contained'){
            wikifier('genericCondomEjaculation')
            return
        }

        if(V.NPCList[i].penis.includes('vagina') || V.NPCList[i].penis.includes('anus') || V.NPCList[i].penis.includes('mouth')){
            
            switch(V.NPCList[i].penis){
                case 'vagina':
                case 'vaginadouble':                  
                    wikifier('vaginalejacstat')
                    wikifier('bodyliquid', 'vagina', 'semen')
                    wikifier('recordVaginalSperm', 'pc', `$NPCList[${i}]`, `($enemytype is "man" ? "human" : $NPCList[${i}].type)`)

                    if(V.NPCList[i].penissize >= 4){
                        wikifier('thighejacstat')
                        wikifier('vaginalentranceejacstat')
                        wikifier('bodyliquid', 'thigh', 'semen')
                        wikifier('bodyliquid', 'vaginaoutside', 'semen')
                    }
                    break
                case 'anus':
                case 'anusdouble':
                    V.hunger -= 200
                    V.thirst -= 200
                    wikifier('analejacstat')
                    wikifier('bodyliquid', 'anus', 'semen')
                    wikifier('recordAnusSperm', 'pc', `$NPCList[${i}]`, `($enemytype is "man" ? "human" : $NPCList[${i}].type)`)
                    break
                case 'mouth':
                    V.hunger -= 200
                    V.thirst -= 200
                    wikifier('oralejacstat')
                    wikifier('cumswallow', V.NPCList[i].type, null, npcSemenMod(V.NPCList[i].penissize) )
                    break

                case 'vaginaentrance' :
                case 'vaginaentrancedouble':
                case 'vaginaentrance' :
                case 'vaginaentrancedouble':
                    wikifier('vaginalentranceejacstat')
                    wikifier('bodyliquid', 'vaginaoutside', 'semen')
                    wikifier('bodyliquid', 'thigh', 'semen')
                    wikifier('recordSperm', {target: "pc", spermOwner: `V.NPCList[${i}]`, spermType: `$enemytype is "man" ? "human" : $NPCList[${i}].type`, rngModifier: 15, rngType: "canWash"})
                    break
                
                case 'anusentrace':
                case 'anusentrancedouble':
                case 'anusimminent':
                case 'anusimminentdouble':
                    wikifier('bottomejacstat')
                    wikifier('bodyliquid', 'bottom', 'semen')
                    wikifier('bodyliquid', 'thigh', 'semen')
            }
            
            V.hygiene += 500
            wikifier('ejacstat')
        }

        if( !V.gloryhole  && ( V.NPCList[i].penis.includes('penis') ||V.NPCList[i].penis == 0) ){
            V.hygiene += 500            
            wikifier('tummyejacstat')
            wikifier('ejacstat')
            wikifier('bodyliquid', 'tummy', 'semen')
        }


    }
}

function longerCombat(){
    if(V.combat == 1){

        if(!setup.longerCombat){
            console.log('longer combat is running.')
            setup.longerCombat = true
        }

        if(V.lastejaculated == undefined){
            V.lastejaculated = 0
            V.overEjaculated = 0
        }

        if(V.enemyarousalmax%100 == 0){
            V.enemyarousalmax = V.enemyarousalmax*2.5 + random(51, 501) + 1 + Math.random()
        }

        if(Math.floor(V.enemyarousal/500) > Math.floor(V.lastejaculated/500) && V.NPCList[0].penis !== undefined){
            V.lastejaculated = V.enemyarousal;
            simpleEjaculation()
        }

        if(Math.random(0, 3) == 1 && V.enemyarousal/V.enemyarousalmax >= 0.9 && V.overEjaculated < 3 ){
            V.enemyarousal = V.enemyarousal - (V.enemyarousalmax * 0.1 + random(50, 500))
            V.overEjaculated++
        }  

    }
    else{
        setup.longerCombat = false
        V.lastejaculated = undefined
        V.overEjaculated = undefined
    }

    return ''
}

DefineMacroS('longerCombat', longerCombat)
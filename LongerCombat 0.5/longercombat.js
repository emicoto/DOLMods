function simpleEjaculation(){
    V.ejaculating = 1
    let html = ''
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
            let words = []
            let _html = ''
            let more
            
            switch(V.NPCList[i].penis){
                case 'vagina':
                case 'vaginadouble':                  
                    wikifier('vaginalejacstat')
                    wikifier('bodyliquid', 'vagina', 'semen')
                    wikifier('recordVaginalSperm', 'pc', `$NPCList[${i}]`, `($enemytype is "man" ? "human" : $NPCList[${i}].type)`)
                    wikifier('recordSperm', `{target: "pc", spermOwner: $NPCList[${i}], spermType: $enemytype is "man" ? "human" : $NPCList[${i}].type, rngModifier: 50}`)
                    words = [
                        lanSwitch(`"Your <<pussy>> is so good, damn, I'm cumming!" As $NPCList[${i}].fullDescription thrust, <<he>> ejaculate deep into your womb.`, 
                                  `"你的<<pussy>>实在太舒服了，该死，要射了。" $NPCList[${i}].fullDescription 一边抽插着，一边在你子宫深处射出了种子液。`),
                        
                        lanSwitch(`<<He>> grabs your hair and thrusts <<his>> $NPCList[${i}].penisdesc deep into your <<pussy>> as <<he>> cums. You feel semen splash inside.`,
                                  `<<He>>拉住你的头发并用<<his>> $NPCList[${i}].penisdesc 深深地在你<<pussy>>里灌注精液。你感觉到大量的精液在从你体内迸溅而出。`),
                        
                        lanSwitch(`<<He>> <span class="purple">grasps your throat</span> and pounds <<his>> $NPCList[${i}].penisdesc into you as <<he>> cums. Semen fills your <<pussy>> as you gasp for air.`,
                                  `<<He>><span class="purple">紧紧地握紧你的喉咙</span>并用<<his>>$NPCList[${i}].penisdesc重重地插入你的子宫深处射精。趁着精液灌满了你的<<pussy>>的空档，你大大喘了口气。`)
                    ]

                    more = true
                    _html = words.random()

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
                    words = [
                        lanSwitch(`"Your ass is so good, damn, I'm cumming!" As $NPCList[${i}].fullDescription thrust, <<he>> ejaculate deep into your anal.`, 
                                  `"你的菊穴实在太舒服了，该死，要射了。" $NPCList[${i}].fullDescription 一边抽插着，一边在你肠道深处射出了种子液。`),
                        
                        lanSwitch(`<<He>> grabs your hair and thrusts <<his>> $NPCList[${i}].penisdesc deep into your ass as <<he>> cums. You feel semen splash inside.`,
                                  `<<He>>拉住你的头发并用<<his>> $NPCList[${i}].penisdesc 深深地在你菊穴里灌注精液。你感觉到大量的精液在从你肠内迸溅而出。`),
                        
                        lanSwitch(`<<He>> <span class="purple">grasps your throat</span> and pounds <<his>> $NPCList[${i}].penisdesc into you as <<he>> cums. Semen fills your anus as you gasp for air.`,
                                  `<<He>><span class="purple">紧紧地握紧你的喉咙</span>并用<<his>>$NPCList[${i}].penisdesc重重地插入你的肠道深处射精。趁着精液灌满了你的肠道的空档，你大大喘了口气。`)
                    ]

                    more = true
                    _html = words.random()

                    break
                case 'mouth':
                    V.hunger -= 200
                    V.thirst -= 200
                    wikifier('oralejacstat')
                    wikifier('cumswallow', V.NPCList[i].type, null, npcSemenMod(V.NPCList[i].penissize) )

                    _html = lanSwitch(`<<He>> moans in plesure and ejaculates a big amount of cum to your throat as <<he>>'s fucking your mouth.`, 
                                    `<<He>>舒服地呻吟着，一边操弄你的嘴巴一边将大量的精液射进你的喉咙。`)
                    
                    more = true
                    break

                case 'vaginaentrance' :
                case 'vaginaentrancedouble':
                case 'vaginaimminent' :
                case 'vaginaimminentdouble':
                    wikifier('vaginalentranceejacstat')
                    wikifier('bodyliquid', 'vaginaoutside', 'semen')
                    wikifier('bodyliquid', 'thigh', 'semen')
                    wikifier('recordSperm', `{target: "pc", spermOwner: $NPCList[${i}], spermType: $enemytype is "man" ? "human" : $NPCList[${i}].type, rngModifier: 15, rngType: "canWash"}`)

                    _html = lanSwitch(`While <<He>> is still rubbing <<his>> $NPCList[${i}].penisdesc on your <<pussy>>, as moan <<he>> cum out a small amount of semen to coat on your <<pussy>>.`,
                                     `<<He>>还在外部磨蹭着的时候，舒服地射出少量精液涂抹在你的<<pussy>>上。`)
                    break
                
                case 'anusentrace':
                case 'anusentrancedouble':
                case 'anusimminent':
                case 'anusimminentdouble':
                    wikifier('bottomejacstat');
                    wikifier('bodyliquid', 'bottom', 'semen');
                    wikifier('bodyliquid', 'thigh', 'semen');

                    _html = lanSwitch(`While <<He>> is still rubbing <<his>> $NPCList[${i}].penisdesc on your butts, as moan <<he>> cum out a small amount of semen to coat on your cheeks.`,
                                     `<<He>>还在外部磨蹭着的时候，舒服地射出少量精液涂抹在你的股沟上。`)
                    V.hunger -= 200;
            }
            
            V.hygiene += 500
            wikifier('ejacstat')

            if(_html.length > 0 && more){
                words = [
                    lanSwitch(`Even <<he>> just cum but <<his>> $NPCList[${i}].penisdesc still hard, hard enough to continues fuck you.`, 
                              `明明射了但<<his>>的$NPCList[${i}].penisdesc依旧坚挺，继续操弄着你。`),
                    lanSwitch(`Even thos <<he>> still not satisfied, <<his>> $NPCList[${i}].penisdesc even fucks harder and harder, with a low growls he continues to shake his hips and fuck you hard.`,
                              `即使如此<<he>>依然不满足，<<his>> $NPCList[${i}].penisdesc 甚至越战越猛，越战越坚挺，他低吼一声继续摆动腰身狠狠地操干你。`),
                    lanSwitch(`Although he has just cum, but <<he>> quickly recovers and vigorously slaps your ass then continues his move.`,
                              `虽然刚射精，但<<he>>很快又恢复了过来，大力拍了拍你的屁股然后继续刚才的动作。`)
                ]

                _html += words.random() + '<br><br>'
            }
            else if(_html.length > 0){
                _html += '<br><br>'
            }

            html += _html

        }

        if( !V.gloryhole  && ( V.NPCList[i].penis.includes('penis') ||V.NPCList[i].penis == 0) ){
            V.hygiene += 500            
            wikifier('tummyejacstat')
            wikifier('ejacstat')
            wikifier('bodyliquid', 'tummy', 'semen')
        }


    }

    if(html.length > 2){
        new Wikifer(null, `<<append #addAfterMsg transition>>${html}<br><</append>>`)
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


$(document).on(':passagestart', ()=>{
    //初始化
    if(!iModManager.has('Options', 'longerMult')){
        iModManager.setCf('longerMult', 2.5)
    }
})
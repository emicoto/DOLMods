
window.lanSwitch = function(EN, CN){
    if (setup.language == 'CN'){
        return CN
    }
    
    return EN
}

let checkSetup = setInterval(()=>{
    if(setup && setup.breastsizes){
        if(setup.breastsizes[1] === '微隆的'){
            setup.language = 'CN'
        }
        else{
            setup.language = 'EN'
        }

        $(document).trigger('languageChecked')        
        clearInterval(checkSetup)
    }
}, 30)

class NamedNPC{
    constructor(name, title, des, type){
        this.nam = name
        this.title = title
        this.description = des
        this.type = type

        this.penis = 0
        this.vagina = 0
        this.insecurity = ''
        this.pronoun = 'none'
        this.penissize = 0
        this.penisdesc = 'none'
        this.bottomsize = 0
        this.ballssize = 0
        this.breastsize = 0
        this.breastdesc = 0
        this.breastsdesc = 0

        this.skincolour = 0
        this.teen = 0
        this.adult = 1
        this.init = 0
        this.intro = 0
        this.trust = 0
        this.love = 0
        this.dom = 0
        this.lust = 0
        this.rage = 0
        this.state = ''
        this.trauma = 0
        
        this.eyeColour = ''
        this.hairColour = ''

        this.chastity = { penis:'', vagina:'', anus:''}

        this.purity = 0
        this.corruption = 0

        this.pregnancy = {}
        this.pregnancyAvoidance = 100

        this.virginity={
            anal:false,
            oral:false,
            penile:false,
            vaginal:false,
            handholding:false,
            temple:false,
            kiss:false
        }       
    }
    Init(gender, age){
        this.setGender(gender)
        this.setAge(age)
     
        return this
    }
    setAge(age){
        if(age == 'teen'){
            this.teen = 1
            this.adult = 0
        }
        else{
            this.adult = 1
            this.teen = 0
        }
        return this
    }
    setValue(key, value){
        this[key] = value;
        return this
    }
    setPronouns(gender){
        if(gender == 'm'){
            this.pronouns = {
                he:'he', 
                his:'his', 
                hers:'hers', 
                him:'him',
                himself:'himself',
                man:'man',
                boy:'boy',
                men:'men',
            }
        }
        else{
            this.pronouns = {
                he:'she', 
                his:'her', 
                hers:'hers', 
                him:'her',
                himself:'herself',
                man:'woman',
                boy:'girl',
                men:'women',
            }
        }
        return this
    }
    setGender(gender){
        this.gender = gender
        this.penis = gender == 'm' ? 'clothed' : 'none'
        this.penissize = 3
        this.penisdesc = 'penis'
        this.vagina = gender == 'm' ? 'none' : 'clothed'
        this.pronoun = gender
        this.setPronouns()
        return this
    }
    setPenis(size, des){
        this.penissize = size
        this.penisdesc = des
        return this
    }
    setBreasts(size, des, desc){
        this.breastsize = size
        this.breastdesc = des
        this.breastsdesc = desc
        return this
    }
    setColour(skin, eye, hair){
        this.skincolour = skin 
        this.eyeColour = eye
        this.hairColour = hair
        return this
    }
    setVirginity(object){
        for(let i in object){
            this.virginity[i] = object[i]
        }
        return this
    }
    setPregnancy(){
        let pregnancy = {
            fetus: [],
            givenBirth: 0,
            totalBirthEvents: 0,
            timer: null,
            timerEnd: null,
            waterBreaking: null,
            npcAwareOf: null,
            pcAwareOf: null,
            type: null,
            enabled: true,
            cycleDaysTotal: random(24, 32),
            cycleDay: 0,
            cycleDangerousDay: 10,
            sperm: [],
            potentialFathers: [],
            nonCycleRng: [
                random(0,3), random(0, 3)
            ],
            pills: null
        }

        pregnancy.cycleDay = random(1, pregnancy.cycleDaysTotal)
        pregnancy.cycleDangerousDay = 10

        this.pregnancy = pregnancy
        this.pregnancyAvoidance = 50
        return this
    }
    setCustomPronouns(object){
        for(let i in object){
            this.pronouns[i] = object[i]
        }
        return this
    }
}

window.NamedNPC = NamedNPC
setup.addNPCList = []
$(document).trigger('addNameNPC:ready')


$(document).one('languageChecked', ()=>{
    setup.addNPCList.push(
        new NamedNPC('Tester', lanSwitch('tester', '测试员'), lanSwitch('Tester', '测试员'), 'robot' ).Init('m', 'adult'),       
    )
})

$(document).one(':storyready', ()=>{
    let checkSetup = setInterval(()=>{
        if(setup && setup.NPCNameList){
            updateNPC('update NPC on Startup') 
            clearInterval(checkSetup)
        }
    }, 60)
})

function updateNPC(stage){

    const clear = function(){
        //- 清理非法NPC
        for(let i=0; i<V.NPCName.length; i++){
            let npc = V.NPCName[i]

            if(!setup.NPCNameList.includes(npc.nam)){
                V.NPCName.deleteAt(i)
                V.NPCNameList.deleteAt(i)
                i--
            }
        }        
    }

    const update = function(){
        clear()

        setup.addNPCList.forEach((npc)=>{
            if( V.NPCNameList.includes(npc.nam) === false ){

                if(!V.NPCName.find( chara => chara.nam == npc.nam)){
                    V.NPCName.push(npc)
                }
                if(!setup.NPCNameList.includes(npc.nam) && V.passage !== 'Start'){
                    setup.NPCNameList.push(npc.nam)
                }
                if(!V.NPCNameList.includes(npc.nam)){
                    V.NPCNameList.push(npc.nam)
                }

                if(!C.npc[npc.nam]){
                    Object.defineProperty(C.npc, npc.nam, {
                        get() {
                            return V.NPCName[setup.NPCNameList.indexOf(npc.nam)];
                        },
                        set(val) {
                            V.NPCName[setup.NPCNameList.indexOf(npc.nam)] = val;
                        },
                    })                    
                }
            }
        })        
    }

    console.log('updateNPC', stage, V.NPCName, setup.NPCNameList)
    update()

    if(V.passage == 'Start'){
        new Wikifier(null, '<<goto Start>>')
    }        

}

function checkUpdate(){
    setTimeout(()=>{
        updateNPC('update NPC list after load a save')
    }, 300)
}

Save.onLoad.add(checkUpdate)

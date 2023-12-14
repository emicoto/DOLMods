
function lanSwitch(...lan){
    let [EN, CN] = lan

    if (setup.language == 'CN'){
        return CN
    }
    return EN
}
window.lanSwitch = lanSwitch
DefineMacroS('lanSwitch', lanSwitch)


let lancheck = setInterval(()=>{
    if( typeof setup !== 'object' ){ return }

    if(window.modI18N || setup.breastsizes[1] == '微隆的'){
        setup.language = 'CN'        
    }
    else {
        setup.language = 'EN'
    }

    if(setup.language == 'CN' || (setup.language == 'EN' && setup.breastsizes[1] !== '微隆的')){
        clearInterval(lancheck)
        $(document).trigger('languageChecked')
    }
}, 100)


class NamedNPC{
    static database = []
    /**
     * 
     * @param {NamedNPC} npc 
     */
    static add(...npc){
        this.database.push(...npc)
    }
    static clear(){
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
    static update(){
        this.database.forEach((data)=>{
            let npc = clone(data)
            if( V.NPCNameList.includes(npc.nam) === false ){
                npc.title = lanSwitch(npc.title_lan)
                npc.description = lanSwitch(npc.description_lan)

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
    static switchlan(){
        V.NPCName.forEach((npc)=>{
            if(npc.title_lan){
                npc.title = lanSwitch(npc.title_lan)
            }
            if(npc.description_lan){
                npc.description = lanSwitch(npc.description_lan)
            }
        })
    }
    static init(stage){
        this.clear()
        this.update()
        console.log('addNamedNPC', stage, V.NPCName, setup.NPCNameList)        
    }
    static reset(npc){
        let data = new NamedNPC(npc.nam, npc.title, npc.des, npc.type)
        for(let i in npc){
            data[i] = npc[i]
        }
        return data
    }
    constructor(name, title, des, type){
        this.nam = name
        this.title_lan = title
        this.description_lan = des
        this.type = type

        this.penis = 0
        this.vagina = 0
        this.insecurity = 'none'
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

//在init阶段统一切换显示语言
NamedNPC.add(
    new NamedNPC('Tester', ['tester', '测试员'], ['Tester', '测试员'], 'robot' ).Init('m', 'adult'),
)

$(document).one(':storyready', ()=>{
    let checkSetup = setInterval(()=>{
        if(setup && setup.NPCNameList){
            NamedNPC.init('adding NPC on Startup')
            clearInterval(checkSetup)
        }
    }, 60)
})

setup.NPCFrameworkOnLoad = false

function checkUpdate(){
    setup.NPCFrameworkOnLoad = true
}

Save.onLoad.add(checkUpdate)

//读档时的处理
$(document).on(':passageinit', ()=>{
    if(setup.NPCFrameworkOnLoad === true && V.passage !== 'Start'){
        NamedNPC.clear()
        NamedNPC.update()
        setup.NPCFrameworkOnLoad = false
    }
})
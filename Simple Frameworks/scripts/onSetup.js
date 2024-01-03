
setup.DOLNPCNames = {
    Avery: ["Avery", "艾弗利"],
    Bailey: ["Bailey", "贝利"],
    Briar: ["Briar", "布莱尔"],
    Charlie: ["Charlie", "查理"],
    Darryl: ["Darryl", "达里尔"],
    Doren: ["Doren", "多伦"],
    Eden: ["Eden", "伊甸"],
    Gwylan: ["Gwylan", "格威岚"],
    Harper: ["Harper", "哈珀"],
    Jordan: ["Jordan", "约旦"],
    Kylar: ["Kylar", "凯莱尔"],
    Landry: ["Landry", "兰德里"],
    Leighton: ["Leighton", "礼顿"],
    Mason: ["Mason", "梅森"],
    Morgan: ["Morgan", "摩根"],
    River: ["River", "瑞沃"],
    Robin: ["Robin", "罗宾"],
    Sam: ["Sam", "萨姆"],
    Sirris: ["Sirris", "西里斯"],
    Whitney: ["Whitney", "惠特尼"],
    Winter: ["Winter", "温特"],
    "Black Wolf": ["Black Wolf", "黑狼"],
    Niki: ["Niki", "尼奇"],
    Quinn: ["Quinn", "奎恩"],
    Remy: ["Remy", "雷米"],
    Alex: ["Alex", "艾利克斯"],
    "Great Hawk": ["Great Hawk", "巨鹰"],
    Wren: ["Wren", "伦恩"],
    Sydney: ["Sydney", "悉尼"],
    "Ivory Wraith": ["Ivory Wraith", "白色幽灵"],
    Zephyr: ["Zephyr", "泽菲尔"],
  };

setup.dolbus = [
    'nightingale',
    'domus',
    'elk',
    'high',
    'starfish',
    'barb',
    'connudatus',
    'wolf',
    'harvest',
    'oxford',
    'danube',
    'mer',
    'cliff',
    'industrial',
    'residential',
    'commercial',
    'park',
    'industrialdrain',
    'residentialdrain',
    'commercialdrain',
    'seabeach',
    'searocks',
    'seadocks',
    'seacliffs',
    'drainexit',
    'sea',
    'lakebus'
]

let lancheck = setInterval(() => {
    if (typeof setup !== 'object') { return }

    if (window.modI18N || setup.breastsizes[1] == '微隆的') {
        setup.language = 'CN'
    }
    else {
        setup.language = 'EN'
    }

    if (setup.language == 'CN' || (setup.language == 'EN' && setup.breastsizes[1] !== '微隆的')) {
        clearInterval(lancheck)
        $(document).trigger('languageChecked')
    }
}, 60)

//------------------------------------------------------
//
//  新增特征与刺青支持
//
//------------------------------------------------------
setup.ModTraits = [];
setup.ModTraitTitle = [];
setup.addModTrait = function () {
    let Traits = [
        'General Traits',
        'Special Traits',
        'School Traits',
        'Trauma Traits',
        'NPC Traits',
        'Hypnosis Traits',
        'Acceptance Traits'
    ]

    console.log(Traits)
    const initTraits = function(trait){
        let { addto, name, cond, text, colour } = trait;
        let index;

        if(addto){
            index = Traits.indexOf(addto)
        }

        let option = {
            name: lanSwitch(name),
            has: typeof cond == 'function' ? cond() : cond,
            text: lanSwitch(text),
            colour,
        }

        return [option, index]
    }

    setup.ModTraitTitle.forEach((option) => {
        if (String(option) == `[object Object]`) {

            let traits = []

            if(Array.isArray(option.traits)){
                option.traits.forEach((trait)=>{
                    const [data, index] = initTraits(trait)
                    traits.push(data)
                })
            }

            T.traitLists.push({
                title: lanSwitch(option.display),
                traits
            })

            Traits.push(option.title)
        }
    })

    setup.ModTraits.forEach((trait) => {
        const [data, index ] = initTraits(trait)
        T.traitLists[index].traits.push(data)
    })

}


setup.modTattoos = [];
setup.addBodyWriting = function(){
    setup.modTattoos.forEach((obj)=>{
        const item = {
            index: Object.keys(setup.bodywriting).length,
            writing: obj.name,
            type: obj.type ?? 'text',
            writ_cn: obj.cn ?? obj.name,
            arrow: obj.arrow ?? 0,
            special: obj.special ?? 'none',
            gender: obj.gender ?? 'n',
            lewd: obj.lewd ?? 1,
            degree: obj.degree ?? 0,
            key: obj.key,
            sprites: obj.sprites?? [],		
        }

        setup.bodywriting[obj.key] = item;
        setup.bodywriting_namebyindex[item.index] = obj.key;

    })
}


//------------------------------------------------------
//
//  模组变量管理
//
//------------------------------------------------------
const iModManager = {
    setCf: function(prop, value){
       this.init('iModConfigs')
        V.iModConfigs[prop] = value;
    },

    getCf: function(prop){
        this.init('iModConfigs')
        return V.iModConfigs[prop]
    },

    setV: function(prop, value){
        this.init('iModVar')
        V.iModVar[prop] = value;
    },

    addV: function(prop, value){
        this.init('iModVar')
        if(!V.iModVar[prop]){
            V.iModVar[prop] = value
        }
        else{
            V.iModVar[prop] += value
        }
        return V.iModVar[prop]
    },

    getV: function(prop){
        this.init('iModVar')
        return V.iModVar[prop]
    },

    setNpc: function(chara, prop, value){
        this.init('iModNpc')
        if(!V.iModNpc[chara]){
            V.iModNpc[chara] = {}
        }
        if(prop && value){
            V.iModNpc[chara][prop] = value
        }
        return V.iModNpc[chara]
    },

    getNpc: function(chara, prop){
        this.init('iModNpc')
        if(!V.iModNpc[chara]){
            V.iModNpc[chara] = {}
        }  
        return prop ? V.iModNpc[chara][prop] : V.iModNpc[chara]
    },
    
    npcV: function(prop, value){
        this.init('iModNpc')
        if(!V.iModNpc[prop]){
            V.iModNpc[prop] = value
        }
        else{
            if(typeof V.iModNpc[prop] == 'number'){
                V.iModNpc[prop] += value
            }
            else if(Array.isArray(V.iModNpc[prop])){
                V.iModNpc[prop].push(value)
            }
            else if(typeof V.iModNpc[prop] == 'object'){
                V.iModNpc[prop] = Object.assign(V.iModNpc[prop], value)
            }
            else{
                V.iModNpc[prop] = value
            }
        }
        return V.iModNpc[prop]
    },

    init: function(type){
        if(eval(`V.${type}`) == undefined){
            eval(`V.${type} = {}`)
        }

        const modvar = eval(`V.${type}`)

        if(typeof modvar.set !== 'function' || modvar.initver !== 1){
            console.log('init on ready:', type)
            modvar.set = function(prop, args1, args2){
                if(!this[prop] && args2){
                    this[prop] = {
                        [args1] : args2
                    }
                }
                else if(!this[prop] && !args2){
                    this[prop] = args1 ?? 0
                }
                else if(this[prop] && args2){
                    this[prop][args1] = args2
                }
                
                return this[prop]
            }
        }

        if(typeof modvar.get !== 'function'|| modvar.initver !== 1){
            modvar.get = function(prop, prop2){
                if(!this[prop] && prop2){
                    this[prop] = {}
                }

                return prop2 ? this[prop][prop2] : this[prop]
            }
        }

        modvar.initver = 1
    },

    has:function(type, prop){
        if(!V['iMod'+type]){
            this.init(type)
        }

        return V['iMod'+type][prop]
    }

}
window.iMod = iModManager

function iModonReady(){
    iMod.init('iModConfigs');
    iMod.init('iModVar');
    iMod.init('iModNpc');
}
DefineMacroS('iModonReady', iModonReady)

//------------------------------------------------------
//
//  进程处理
//
//------------------------------------------------------
setup.NPCFrameworkOnLoad = false
function checkUpdate() {
    setup.NPCFrameworkOnLoad = true
}

Save.onLoad.add(checkUpdate)

$(document).on(":passagedisplay",()=>{
    //读档时的处理
    if (setup.NPCFrameworkOnLoad === true && V.passage !== 'Start' && V.passage !== 'Downgrade Waiting Room') {
            NamedNPC.clear()
            NamedNPC.update()
        setup.NPCFrameworkOnLoad = false
    }
    else if(setup.NPCFrameworkOnLoad === true && V.passage == 'Downgrade Waiting Room'){
        setup.NPCFrameworkOnLoad = false
        setup.NPCFrameworkOnDowngrade = true
    }
    else if(setup.NPCFrameworkOnDowngrade === true && V.passage !== 'Downgrade Waiting Room'){
        NamedNPC.clear()
        NamedNPC.update()
        setup.NPCFrameworkOnDowngrade = false
    }
})

$(document).on(':switchlanguage', () => {
    NamedNPC.switchlan()
})

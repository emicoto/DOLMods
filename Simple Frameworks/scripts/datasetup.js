
setup.DOLNPCNames = {
    Avery          : ['Avery', '艾弗利'],
    Bailey         : ['Bailey', '贝利'],
    Briar          : ['Briar', '布莱尔'],
    Charlie        : ['Charlie', '查理'],
    Darryl         : ['Darryl', '达里尔'],
    Doren          : ['Doren', '多伦'],
    Eden           : ['Eden', '伊甸'],
    Gwylan         : ['Gwylan', '格威岚'],
    Harper         : ['Harper', '哈珀'],
    Jordan         : ['Jordan', '约旦'],
    Kylar          : ['Kylar', '凯莱尔'],
    Landry         : ['Landry', '兰德里'],
    Leighton       : ['Leighton', '礼顿'],
    Mason          : ['Mason', '梅森'],
    Morgan         : ['Morgan', '摩根'],
    River          : ['River', '瑞沃'],
    Robin          : ['Robin', '罗宾'],
    Sam            : ['Sam', '萨姆'],
    Sirris         : ['Sirris', '西里斯'],
    Whitney        : ['Whitney', '惠特尼'],
    Winter         : ['Winter', '温特'],
    'Black Wolf'   : ['Black Wolf', '黑狼'],
    Niki           : ['Niki', '尼奇'],
    Quinn          : ['Quinn', '奎恩'],
    Remy           : ['Remy', '雷米'],
    Alex           : ['Alex', '艾利克斯'],
    'Great Hawk'   : ['Great Hawk', '巨鹰'],
    Wren           : ['Wren', '伦恩'],
    Sydney         : ['Sydney', '悉尼'],
    'Ivory Wraith' : ['Ivory Wraith', '白色幽灵'],
    Zephyr         : ['Zephyr', '泽菲尔']
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
];

setup.ModLocationPNG = [];
setup.ModLocationGIF = [];

//------------------------------------------------------
//
//  新增特征与刺青支持
//
//------------------------------------------------------
setup.ModTraits = [];
setup.ModTraitTitle = [];
setup.addModTrait = function () {
    const Traits = [
        'General Traits',
        'Special Traits',
        'School Traits',
        'Trauma Traits',
        'NPC Traits',
        'Hypnosis Traits',
        'Acceptance Traits'
    ];

    console.log('[SFDebug] Traits:',Traits);
    const initTraits = function (trait) {
        const { addto, name, cond, text, colour } = trait;
        let index;

        if (addto) {
            index = Traits.indexOf(addto);
        }

        const option = {
            name : lanSwitch(name),
            has  : typeof cond === 'function' ? cond() : cond,
            text : lanSwitch(text),
            colour
        };

        return [option, index];
    };

    setup.ModTraitTitle.forEach(option => {
        if (String(option) == '[object Object]') {
            const traits = [];

            if (Array.isArray(option.traits)) {
                option.traits.forEach(trait => {
                    const [data, index] = initTraits(trait);
                    traits.push(data);
                });
            }

            T.traitLists.push({
                title : lanSwitch(option.display),
                traits
            });

            Traits.push(option.title);
        }
    });

    setup.ModTraits.forEach(trait => {
        const [data, index] = initTraits(trait);
        T.traitLists[index].traits.push(data);
    });
};


setup.modTattoos = [];
setup.addBodyWriting = function () {
    setup.modTattoos.forEach(obj => {
        const item = {
            index   : Object.keys(setup.bodywriting).length,
            writing : obj.name,
            type    : obj.type ?? 'text',
            writ_cn : obj.cn ?? obj.name,
            arrow   : obj.arrow ?? 0,
            special : obj.special ?? 'none',
            gender  : obj.gender ?? 'n',
            lewd    : typeof obj.lewd == 'number' ? obj.lewd : 1,
            degree  : obj.degree ?? 0,
            key     : obj.key,
            sprites : obj.sprites ?? []
        };

        setup.bodywriting[obj.key] = item;
        setup.bodywriting_namebyindex[item.index] = obj.key;
    });
};

//------------------------------------------------------
//
//  战斗动作支持
//
//------------------------------------------------------
setup.modCombatActions = [];

setup.ModCombatSetting = function () {
    console.log('[SFDebug] ModCombatSetting:', T.args);
    const [actions, actiontype] = T.args;

    setup.modCombatActions.forEach(setupAction => {
        const { displayname, value, type, condition, color } = setupAction;
        if ((typeof type === 'string' && type == actiontype || Array.isArray(type) && type.has(actiontype)) && typeof condition === 'function' && condition()) {
            const name = lanSwitch(displayname);
            actions[name] = value;
            if (typeof color === 'string') {
                T.args[2] = color;
            }
        }
    });
};

function modCombatDifficul(diffAction, action) {
    console.log('[SFDebug] modCombatDifficul:', T.args, action, diffAction);

    const actionObj = setup.modCombatActions.filter(action => action.value == diffAction)[0];
    if (actionObj && actionObj.widget && Macro.has(actionObj.widget)) {
        return `<<${actionObj.widget}>>`;
    }

    return '';
}
DefineMacroS('ModCombatDifficulty', modCombatDifficul);


const whitelistnpc = ['Avery', 'Briar', 'Darryl', 'Eden', 'Harper', 'Kylar', 'Landry', 'Morgan', 'Whitney', 'Winter', 'Remy', 'Wren', 'Cheng'];

setup.whitelistnpc = whitelistnpc;

const Filters = [
    new combatFilter('tutorial')
        .Config('新手保护', { days : 3 })
        .Cond(config => V.tutorial == 1 || Time.days < config.days),

    new combatFilter('location-school')
        .Config('学校概率', { rate : 90 })
        .Cond(config => V.location == 'school' && random(100) < config.rate),
    
    new combatFilter('location-police')
        .Config('警察局概率', { rate : 80 })
        .Cond(config => V.location == 'police_station' && random(100) < config.rate),
    
    new combatFilter('namenpc-check')
        .Cond(() => V.npc.length > 0 && !V.npc.has(...whitelistnpc)),
    
    new combatFilter('location-livestock')
        .Config('雷米农场概率', { rate : 75 })
        .Cond(config => V.location == 'livestock' && random(100) < config.rate),

    new combatFilter('randomnpc-consensual-check')
        .Cond(() => V.consensual == 1 && V.npc.length == 0 && random(100) < 70),
    
    new combatFilter('nnpc-consensual-check')
        .Cond(() => V.npc.length > 0 && V.npc.has(...whitelistnpc) && V.consensual == 1 && random(100) < 60)
];

function getNpcTrait(traits) {
    if (traits.includes('hypnotist')) return 'hypnotist';
    if (traits.includes('lecher')) return 'lecher';
    if (traits.includes('socialble')) return 'socialble';
    if (traits.includes('relaxed')) return 'relaxed';
    if (traits.includes('brooding')) return 'brooding';
}
setup.getNpcTrait = getNpcTrait;

function getNNpcTrait(name) {
    const traits = {
        Avery   : 'dominant',
        Briar   : 'relaxed',
        Darryl  : 'socialble',
        Eden    : 'relaxed',
        Harper  : 'hypnotist',
        Kylar   : 'lewd',
        Landry  : 'socialble',
        Morgan  : 'hypnotist',
        Whitney : 'lecher',
        Winter  : 'relaxed',
        Remy    : 'dominant',
        Wren    : 'socialble',
        Cheng   : 'hypnotist'
    };

    return traits[name];
}
setup.getNNpcTrait = getNNpcTrait;

const initEvent = [
    new combatEvent('drugpocket', 'npc')
        .Cond(npc => V.enemytype == 'man' || npc.type == 'human')
        .Config('NPCDrugItem', { dificulty : 1, maxnum : 2, noangel : false })
        .Action((sys, npc, config) => {
            const rate = {
                relaxed   : 20,
                socialble : 30,
                violent   : 40,
                dominant  : 50,
                brooding  : 60,
                sadistic  : 70,
                lewd      : 75,
                lecher    : 80,
                hypnotist : 100
            };

            let trait = setup.getNpcTrait(npc.trait);
            if (npc.pocket == undefined) npc.pocket = [];

            if (npc.fullDescription.has(...setup.whitelistnpc)) {
                trait = setup.getNNpcTrait(npc.fullDescription);
            }

            if (random(100) < rate[trait] * config.dificulty) {
                const drugs = Items.search('drugs', 'or', 'pill', 'inject').filter(item => !item.id.has('angel'));
                npc.pocket = [];
                // 为npc随机添加两款药物
                for (let i = 0; i < config.maxnum ; i++) {
                    const drug = drugs.randompop();
                    npc.pocket.push(drug);
                }
            }

            // 如果npc是催眠师，则添加天使粉
            if (npc.trait.includes('hypnotist') && !config.noangel) {
                npc.pocket.push(Items.get('angelpowder_inject'));
            }

            // 非催眠师低概率携带天使粉
            if (!npc.trait.has('hypnotist', 'relaxed') && random(100) < 10 && !config.noangel) {
                npc.pocket.push(Items.get('angelpowder_inject'));
            }

            // 初始化投喂的欲望值
            npc.drugdesire = rate[trait] * config.dificulty + random(20);
        })
];

const turnStartEvent = [
    // 如果玩家占据优势，则跳过npc的喂药行为
    new combatEvent('feedable')
        .Cond(() => V.pain < V.painmax * 0.8
                && V.arousal < V.arousalmax * 0.8
                && V.enemyhealth < V.enemyhealthmax * 0.25
                && V.orgasmdown < 1
                && V.rightarm !== 'bound' && V.leftarm !== 'bound'
                && V.leftleg !== 'bound' && V.rightleg !== 'bound'
        )
        .Skip('takedrug', 'feeddrug'),
    
    // 检测npc是否携带药物，有则登记相关动作
    new combatEvent('checkpocket', 'npc')
        .Cond(npc => npc.pocket.length > 0 && !npc.handItem && npc.drugdesire <= random(100))
        .Action(() => ({
            enemyaction : ['takedrug', 'feeddrug']
        }))

];

const enemyAction = [
    // 当敌人口袋里有药物时，概率拿出来。目前概率按玩家压力值与创伤值的比例算
    new combatEvent('takedrug', 'itemaction')
        .Cond(npc => npc.pocket.length > 0 && !npc.handItem
              && random(100) < Math.floor(V.trauma / 80 + V.stress / 200) * 100
        )
        .Action(npc => {
            if (npc.pocket.length == 0 || npc.handItem) return;

            const drugs = npc.pocket.randompop();
            npc.handItem = {
                item  : drugs,
                timer : 0
            };

            return {
                text : sMsg.takeDrug,
                args : [npc.fullDescription, npc.handItem.item.name],
                pos  : 'add'
            };
        })
        .Next('feeddrug', 2),
    
    // 当敌人手中拿着药物时，则会试图喂给玩家
    new combatEvent('feeddrug', 'itemaction')
        .Cond(npc => npc.handItem && npc.handItem.timer >= 1)
        .Config('NPCFeedDrug', { rate : 60 })
        .Action((npc, config) => {
            const item = npc.handItem.item;
            let params = '';

            if (random(100) < config.rate) {
                params = item.onUse('enemy');
                delete npc.handItem;
            }


            let situation = '';

            if (item.id == 'angelpowder_inject') {
                situation = 'angelpowder';
            }
            else if (item.tags.includes('inject')) {
                situation = 'inject';
            }
            else if (V.mouthuse !== 'penis' && V.mouthuse !== 'kiss') {
                situation = 'mouth';
            }
            else if (V.anususe !== 'penis' && V.anususe !== 'penisdouble') {
                situation = 'anus';
            }
            else if (V.mouthuse == 'kiss' && npc.mouth == 'kiss') {
                situation = 'kiss';
            }
            else {
                situation = 'random';
            }

            return {
                text : sMsg.combatMsg.feedDrug[situation],
                args : [npc.fullDescription, item.name],
                params,
                pos  : 'after'
            };
        }),
    
    // 当敌人是触手类生物时
    new combatEvent('feedjuice', 'action')
        .Cond(() => V.enemytype.has('slime', 'tentacle', 'plant')
                    && !iCandy.senseGet('genital', 'tentacle')
                    && (V.anususe !== 0 || V.mouthuse !== 0)
        )
        .Action((npc, config) => {
            if (random(100) > config.rate) return;

            wikifier('drugs', 2000);
            iCandy.senseSet('genital', 'tentacle', 1.2, 3600);

            return {
                text   : sMsg.combatMsg.feedDrug.tentacle,
                params : '<<gggdrugged>>',
                pos    : 'add'
            };
        })
];

const playerAction = [
    // 当玩家手部动作选择了打飞敌人手中物品时的处理
    new combatEvent('whackdrugs', 'action')
        .Cond(() => V.pain < 100 && V.arousal < V.arousalmax * 0.8
                && V.control >= V.controlmax * 0.3
                && (V.leftaction == 'whackdrugs' || V.rightaction == 'whackdrugs')
        )
        .Config('WhackDrug', { dificulty : 1, rate : 40 })
        .Action((npcs, part, config) => {
            const index = `${part}target`;
            if (!npcs[index].handItem) return;

            const npc = npcs[index];
            const item = npc.handItem.item;
            const { dificulty, rate } = config;


            return {
                text : sMsg.combatMsg.whackDrug,
                args : [item.name],
                pos  : 'add'
            };
        })

];

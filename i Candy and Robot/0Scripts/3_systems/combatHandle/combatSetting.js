/* eslint-disable no-unused-vars */
const whitelistnpc = ['Avery', 'Briar', 'Darryl', 'Eden', 'Harper', 'Kylar', 'Landry', 'Morgan', 'Whitney', 'Remy', 'Wren', 'Zephyr', 'Cheng'];

setup.whitelistnpc = whitelistnpc;

const combatOptions = {
    tutorial : {
        days : {
            displayname : {
                EN : 'tutorial protection',
                CN : '新手保护期'
            },

            info : {
                EN : 'the length of tutorial protection, at least 1 day, at most 7 days.',
                CN : '新手保护期的长度，最少1天，最多7天。'
            }
        }
    },

    'location-school' : {
        rate : {
            displayname : {
                EN : 'students carrying drugs rate',
                CN : '学生携带毒品概率'
            },

            info : {
                EN : 'the probability of students carrying drugs, at least 0, at most 100, default is 6%.',
                CN : '学生们携带毒品的概率，最少0%，最多100%，默认为6%。'
            }
        }
    },

    'location-police' : {
        rate : {
            displayname : {
                EN : 'police collusion rate',
                CN : '警察串通概率'
            },

            info : {
                EN : 'Possibility of police collusion with drug dealers, at least 0, at most 100, default is 15%.',
                CN : '警察们私下与毒贩串通的可能性，最少5，最多100，默认为15%。'
            }
        }
    },

    'location-livestock' : {
        rate : {
            displayname : {
                EN : 'livestock drug rate',
                CN : '雷米农场概率'
            },

            info : {
                EN : 'the probability of being drugged on the Remy farm, at least 5, at most 100, default is 25.',
                CN : '在雷米农场被打药的概率，最少5，最多100， 默认为25。'
            }
        }
    },

    initDrugPocket : {
        dificulty : {
            displayname : {
                EN : 'NPC drug rate',
                CN : 'NPC毒品概率'
            },

            info : {
                EN : 'The probability of encounter npcs in random combat with carring drugs, at least 0.5, at most 2, default is 1.',
                CN : '随机战时遇到携带毒品NPC的概率补正。最低为0.5，最高为2， 默认为1。'
            }
        },

        maxnum : {
            displayname : {
                EN : 'NPC drug number',
                CN : 'NPC毒品数量'
            },

            info : {
                EN : 'The number of drugs carried by NPC, at least 1, at most 5, default is 2.',
                CN : 'NPC携带的毒品数量，最少1，最多5， 默认为2。'
            }
        },

        noangel : {
            displayname : {
                EN : 'No ',
                CN : 'NPC不带天使醉'
            },

            info : {
                EN : 'NPC will not carry seraphic euphoria.',
                CN : 'NPC不会携带天使醉。'
            }
        }
    }
};

const combatfilters = [
    new combatFilter('tutorial')
        .Config({ days : 3 })
        .Cond(config => V.tutorial == 1 || Time.days < config.days),

    new combatFilter('location-school')
        .Config({ rate : 10 })
        .Cond(config => V.location == 'school' && random(100) >= config.rate),
    
    new combatFilter('location-police')
        .Config({ rate : 20 })
        .Cond(config => V.location == 'police_station' && random(100) >= config.rate),
    
    new combatFilter('namenpc-check')
        .Cond(() => V.npc.length > 0 && !V.npc.has(...whitelistnpc)),
    
    new combatFilter('location-livestock')
        .Config({ rate : 25 })
        .Cond(config => V.location == 'livestock' && random(100) >= config.rate),

    new combatFilter('randomnpc-consensual-check')
        .Cond(() => V.consensual == 1 && V.npc.length == 0 && random(100) < 70 && !V.location.has('brothel', 'underground')),
    
    new combatFilter('nnpc-consensual-check')
        .Cond(() => V.npc.length > 0 && V.npc.has(...whitelistnpc) && V.consensual == 1 && random(100) < 60)
];

iCombat.add('check', ...combatfilters);

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
        Remy    : 'dominant',
        Wren    : 'socialble',
        Zephyr  : 'relaxed',
        Cheng   : 'hypnotist'
    };

    if (!traits[name]) return 'innocent';

    return traits[name];
}
setup.getNNpcTrait = getNNpcTrait;

const initEvent = [
    new combatEvent('initTrait', 'npc')
        .Cond(npc => V.enemytype == 'man' || npc.type == 'human')
        .Config({ rate : 10 }) // drug trait rate
        .Action((npc, config) => {
            const traitrate = {
                innocent  : 2,
                drugadict : Math.clamp(config.rate + 5, 5, 80),
                lewd      : Math.clamp(config.rate + 15, 15, 80),
                sadistic  : 20,
                dominant  : 30,

                socialble : 30,
                brooding  : 30,
                relaxed   : 15,
                hypnotist : Math.clamp(config.rate, 5, 80),
                lecher    : 100 // 如果上面的都不满足，则强制设置为色狼
            };

            for (const [trait, rate] of Object.entries(traitrate)) {
                if (random(100) <= rate) {
                    npc.trait = trait;
                    break;
                }
            }

            // 如果npc本身就有催眠师特质，则强制设置为催眠师
            if (npc.traits.includes('hypnotist')) npc.trait = 'hypnotist';

            // 如果是固有npc，则根据npc名字设置特质
            if (V.npc.length > 0 && V.npc.has(npc.fullDescription)) {
                npc.trait = getNNpcTrait(npc.fullDescription);
            }
        }),
    new combatEvent('initDrugPocket', 'npc')
        .Cond((npc, config) => V.enemytype == 'man' || npc.type == 'human')
        .Config({ dificulty : 1, maxnum : 2, noangel : false })
        .Action((npc, config) => {
            const rate = {
                innocent  : 0,
                relaxed   : 15,
                socialble : 25,
                dominant  : 30,
                sadistic  : 40,
                brooding  : 50,
                lecher    : 60,
                lewd      : 70,
                hypnotist : 80,
                drugadict : 100
            };

            if (npc.pocket == undefined) npc.pocket = [];

            let max = config.maxnum;
            if (npc.trait == 'drugadict') max++;

            if (random(100) < rate[npc.trait] * config.dificulty) {
                const drugs = Items.search('drugs', 'or', 'pill', 'inject').filter(item => !item.id.has('angel'));
                npc.pocket = [];
                // 为npc随机添加药物
                for (let i = 0; i < max ; i++) {
                    const drug = drugs.randompop();
                    npc.pocket.push(drug);
                }
            }

            // 如果npc是催眠师，则添加天使粉
            if (npc.trait == 'hypnotist' && !config.noangel) {
                npc.pocket.push(Items.get('angelpowder_inject'));
            }

            // 非催眠师极低概率携带天使粉
            if (!npc.trait.has('hypnotist', 'relaxed') && random(100) < 5 && !config.noangel) {
                npc.pocket.push(Items.get('angelpowder_inject'));
            }

            // 初始化投喂的欲望值
            npc.drugdesire = Math.clamp(rate[trait] * config.dificulty + random(-20, 20), 0, 100);
        })
];

iCombat.add('onInit', ...initEvent);

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
        .Cond(npc => npc.pocket.length > 0 && !npc.handItem && npc.drugdesire >= random(100))
        .EnemyAction('takedrug', 'tryfeeddrug','feeddrug'),
    
    // 检测npc类型，如果是触手类则预约喂分泌物的行为
    new combatEvent('checkslime', 'npc')
        .Cond(() => V.enemytype.has('slime', 'tentacle', 'plant') && V.enemyarousal >= V.enemyarousalmax * 0.2)
        .EnemyAction('feedjuice')
];

iCombat.add('onTurnStart', ...turnStartEvent);

const enemyAction = [
    // 当敌人口袋里有药物时会在一定兴奋值或愤怒值下给玩家喂药
    new combatEvent('takedrug', 'itemaction')
        .Cond(npc => npc.pocket.length > 0 && !npc.handItem
              && (V.enemyarousal >= V.enemyarousalmax * 0.2 || V.enemyanger >= 100)
        )
        .Action((turn, npc) => {
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
        .Next('tryfeeddrug', 2),
    
    new combatEvent('tryfeeddrug', 'itemaction')
        .Cond(npc => npc.handItem && npc.handItem.timer < 2)
        .Action((turn, npc) => {
            const item = npc.handItem.item;
            npc.handItem.timer++;
            return {
                text : {
                    EN : `{0} with {2} in <<his>> hand and trying to drug you down.<br>${P.randomSpeach('tryfeeddrug')}`,
                    CN : `{0}拿着{2}试图给你下药。<br>${P.randomSpeach('tryfeeddrug')}`
                },
                args : [npc.fullDescription, item.name],
                pos  : 'add'
            };
        }),
    
    // 当敌人手中拿着药物且超过一定回合没被打飞，则会给PC打药
    new combatEvent('feeddrug', 'itemaction')
        .Cond(npc => npc.handItem && npc.handItem.timer > 2)
        .Action((turn, npc) => {
            const item = npc.handItem.item;
            let params = '';

            params = item.onUse('enemy');
            delete npc.handItem;

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
        .Cond(() => V.enemyarousal >= V.enemyarousal * 0.2
                    && !iCandy.senseGet('genital', 'tentacle')
                    && (V.anususe !== 0 || V.mouthuse !== 0)
        )
        .Config({ rate : 70 })
        .Action((turn, npc, config) => {
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

iCombat.add('onEnemyTurn', ...enemyAction);

const playerAction = [
    // 当玩家手部动作选择了打飞敌人手中物品时的处理
    new combatEvent('whackdrugs', 'action')
        .Cond(() => V.NPCList[V.lefttarget].handItem || V.NPCList[V.righttarget].handItem
        )
        .Config({ dificulty : 1, rate : 40 })
        .Action((turn, npc, part, config) => {
            const index = `${part}target`;
            const item = npc.handItem.item;
            const { dificulty, rate } = config;


            return {
                text : sMsg.combatMsg.whackDrug,
                args : [item.name],
                pos  : 'add'
            };
        })

];

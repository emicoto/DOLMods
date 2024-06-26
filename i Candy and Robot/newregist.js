/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-vars */

// eslint-disable-next-line prefer-const
let regist = iEvent.register;

// 角色登场或与角色交互时触发的事件
regist.onChara('Xinyu')
    .add(
        new SceneData('Intro')
            .Trigger({
                type     : 'localAction',
                location : ['almond_path']
            })
            .Setting({
                priority : 1000
            })
            .PlayType('jump')
            .Cond((chara, flag) => flag.intro == undefined && flag.known == 1) // 系列事件的条件
            .Branches(
                {
                    name     : 'FirstTime',
                    maxPhase : 6,

                    cond : (chara, flag) => flag.intro == undefined // 分支事件的条件
                },
                {
                    name     : 'Again',
                    maxPhase : 2,

                    cond : (chara, flag) => flag.intro == 1
                }
            )
        ,

        new SceneData('Talk')
            .Trigger({ type : 'action' })
            .PlayType('local')
            .Cond((chara, flag) => flag.intro == 2)
            .Branches(
                {
                    name : 'Almond Friendly',
                    cond : chara => chara.location == 'almond_path' && chara.love >= 40
                },
                {
                    name : 'Almond Hateful',
                    cond : chara => chara.location == 'almond_path' && chara.love < 0
                },
                {
                    name : 'Almond General',
                    cond : chara => chara.location == 'almond_path'
                },
                {
                    name : 'Town Friendly',
                    cond : chara => chara.location == 'chinatown' && chara.love >= 40
                },
                {
                    name : 'Town Hateful',
                    cond : chara => chara.location == 'chinatown' && chara.love < 0
                },
                {
                    name : 'Town General',
                    cond : chara => chara.location == 'chinatown'
                }
            )
    );


// 进入场景时触发的事件
regist.onScene('Chinatown')
    .add(
        // Eventlist
        new SceneData()
    );


// 获取互动链接，可以注册对应事件/互动的入口链接。
// 这些链接会出现在对应的互动菜单中，或在Place of interest/next之前。

// scene指有地图详细档案的新场景。链接会出现在地图互动菜单中。
regist.onLink('scene', 'Chinatown')
    .add(
        // actionlist
        new ActionData()
    );

// chara指角色的互动。如果当前场景时符合系统的新场景，链接会出现在角色互动菜单中。
// 否则，链接则会排列在最后一个链接之前。
regist.onLink('chara', 'Xinyu')
    .add(
        new ActionData()
    );

// 旧场景的完整标题。链接会排列在最后一个链接之前。
regist.onLink('passage', 'PassageFullTitle')
    .add(
        new ActionData()
    );


// 时间变化时触发的事件。时间变化类型只有common。
regist.onTime('common')
    .add(
        // Eventlist
        new SceneData()
    );

// 状态变化时触发的事件, 状态事件只有maxstress, common。
regist.onState('common')
    .add(
        // Eventlist
        new SceneData()
    )
;

// 段落变化时触发的事件
regist.onPassage('Brothel Basement')
    .add(
    // Eventlist
        new SceneData('DrugsIntro')
            .Setting({
                maxPhase   : 3,
                nextButton : true,

                exit : 'Brothel Basement'
            })
            .Flag('brothel')
            .Cond(
                flag => flag.drugsIntro !== 1
            && V.brothel_basement_intro == 1
            && Tvar.lastPassage == 'Brothel'
            )
    );

regist.onPassage('Garden')
    .add(
        new SceneData('GarageIntro')
            .Flag('orphanage')
            .Cond(
                flag => flag.garageInit === undefined
                && flag.garageProcess >= 6
                && Time.dayState == 'day'
            )
    );

// 不特定段落时，都加到common里
regist.onPassage('common')
    .add(
        new SceneData('ChinatownRumors')
            .Trigger(
                {
                    type : 'cond',
                    cond : passage => passage.title.match(/[a-zA-Z]+ Street$|Park$/) !== null
                }
            )
            .Flag('chinatown')
            .Cond(
                flag => flag.intro === undefined
                && V.location == 'town'
                && F.noEventRunning() && random(100) < 30
                && Time.days > 2 && flag.rumortoday < 2
            )
            .RandomBranch(4)
            .Action('before', function (flag, scene) {
                if (typeof flag.rumors !== 'object') {
                    flag.rumors = [];
                }
                if (flag.rumorstoday === undefined) {
                    flag.rumorstoday = 0;
                }
            })
            .Action('after', function (flag, scene) {
                V.eventskip = 1;
                flag.rumors.push(scene.branchId);
                flag.rumorstoday++;
            })
    );

regist.patchTo('passageName')
    .add(
        {
            content  : 'a whole new content.', // the content to replace, could be string or function
            position : '', // beforeContent, afterContent, beforeLink, afterLink, beforeNode, afterNode
            node     : 'linkname', // the name of link show at html, could be string or language object
            action   : function () {
                // the action to do when the patch is applied
            }
        }
    )
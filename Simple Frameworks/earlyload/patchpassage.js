(async () => {
    // 文件必须以 `(() => {` 在第一行第一个字符开头，以 `})();` 结尾，其他所有代码都必须在这个自调用函数中
    // 文件的开头会有一个等价的`return`，这个return会由JsPreloader在调用时插入到这个文件的开头
    // 这样才能确保这个文件的返回值会被JsPreloader正确接收

    // 自执行函数，会在mod插入html时执行此处内容
    console.log('[SFInfo] simple frameworks preload patch passage');
    const modUtils = window.modUtils;

    const patchedPassage = {};

    // 一些需要特殊处理的location Passage
    const locationPassage = {
        StoryCaption : [
            {
                src        : '<<img>>',
                applyafter : '\n\n\t\t<<CustomImgLayer>>\n'
            },
            {
                src : '<<schoolday>>\n\t\t<br>',
                to  : '<<schoolday>>\n\t\t<div id="captionTextBox">\n\t\t<<ModCaptionDescription>><br>\n\t\t\t'
            },
            {
                src         : '<<allurecaption>>',
                applybefore : '<<ModStatusBar>>\n\t\t\t'
            },
            {
                src : '<</button>>\n\t\t\t<div class="sidebarButtonSplit">',
                to  : '<</button>>\n\t\t\t<<ModMenuBig>>\n\t\t\t<div class="sidebarButtonSplit">'
            },
            {
                src : '</div>\n\t\t\t<div class="sidebarButtonSplit">',
                to  : '</div>\n\t\t\t<div class="sidebarButtonSplit"><<ModMenuSmall>></div>\n\t\t\t<div class="sidebarButtonSplit">'
            },
            {
                src : '<<goo>>',
                to  : '\n\t\t\t<<ModCaptionAfterDescription>>\n\t\t\t<<goo>>\n\t\t</div>'
            }
        ],
        Estate : [
            {
                src         : '<<if $estate.entrance is "gate">>',
                applybefore : '<<ExtraLinkZone>>\n'
            }
        ],
        'Ocean Breeze' : [
            {
                src         : '<<if $money gte 200>>',
                applybefore : '\n<<ModShopZone>>\n'
            }
        ],
        Orphanage : [
            {
                src         : '<<home_outside>>',
                applybefore : '\n\t<<ExtraLinkZone>>\n\t'
            }
        ],
        Pharmacy : [
            {
                src         : 'Contacts',
                applybefore : '<<ModShopZone>>\n\t'
            },
            {
                src         : '隐形眼镜',
                applybefore : '<<ModShopZone>>\n\t'
            }
        ],
        'Prison Wren' : [
            {
                src         : '<<if $prison.yard_key is 1 ',
                applybefore : '<<ModShopZone>>\n\n'
            }
        ],
        'Cosmetics Store' : [
            {
                src         : '<<cosmeticsicon>>',
                applybefore : '\n<<ModShopZone>>'
            }
        ],
        Hairdressers : [
            {
                scr         : '<<getouticon>>',
                applybefore : '\n<<ModShopZone>>\n'
            }
        ],
        'Shopping Centre' : [
            {
                src         : '/*<<shopicon "closed">><<link',
                applybefore : '\n\t\t<<ExtraLinkZone>>\n\t\t'
            },
            {
                src         : '/*Comment out when a new shop is',
                applybefore : '\n\t\t<<ExtraLinkZone>>\n\t\t'
            }
        ],
        'Pet Shop' : [
            {
                scr         : '<<getouticon>>',
                applybefore : '\n<<ModShopZone>>\n'
            }
        ],
        'Tattoo Choice' : [
            {
                src         : '<span class="lewd">',
                applybefore : '\n<<ModShopZone>>\n'
            }
        ],
        'Toy Shop' : [
            {
                scr         : '<<if $pregnancyStats.humanToysUnlocked>>',
                applybefore : '\n<<ModShopZone>>\n'
            }
        ]

    };
	
    const widgetPassage = {
        Characteristics : [
            {
                src        : '<<characteristic-box _deviancyConfig>>',
                applyafter : '\n\n<<ModDegreesBox>>\n\n'
            },
            {
                src        : '<<characteristic-box _housekeepingConfig>>',
                applyafter : '\n\n<<ModSkillsBox>>\n\n'
            },
            {
                src        : '<<bodywriting>>',
                applyafter : '\n\n<<ModCharaDescription>>\n\n'
            }
        ],
        overlayReplace : [
            {
                src : '</div>\n\t<<closeButton>>\n<</widget>>\n\n<<widget "titleSaves">>',
                to  : '\t\t<<button lanSwitch(\'Mods\', \'模组设置\')>>\n\t\t<<toggleTab>>\n\t\t<<replace #customOverlayContent>><<iModOptions>><</replace>>\n\t\t<</button>>\n\n</div>\n\t<<closeButton>>\n<</widget>>\n\n<<widget "titleSaves">>'
            },
            {
                src         : '</div>\n\t<<closeButton>>\n<</widget>>\n\n<<widget "titleOptions">>',
                applybefore : '\t\t<<button lanSwitch(\'Mods\', \'模组\')>>\n\t\t\t<<toggleTab>>\n\t\t\t<<replace #cheatsShown>><<iModCheats>><</replace>>\n\t\t\t<<run $("#customOverlayContent").scrollTop(0);>>\n\t\t<</button>>\n'
            }
        ],
        npcNamed : [
            {
                src         : '<<generateNPCNameHairAndEyeColors',
                applybefore : '\n<<run NamedNPC.init()>>\n'
            }
        ],
        Social : [
            {
                src         : 'T.importantNPCs = T.importantNpcOrder',
                applybefore : '\n\t\t\tsetup.ModSocialSetting();\n\n\t\t\t'
            },
            {
                srcmatch    : /<br>[\s]+<span class="gold">(Fame|知名度)<\/span>/,
                applybefore : '\n\t\t<<iModStatus>>\n\t\t'
            },
            {
                src         : '<div class="relation-box" @style="(_boxConfig.style || \'\')">',
                applybefore : '\n\t\t<<iModFame>>\n\t\t'
            }
        ],

        Traits : [
            {
                src         : '<div id="traitListsSearch">',
                applybefore : '\n<<run setup.addModTrait()>>\n\n'
            }
        ],

        'Widgets Settings' : [
            {
                src         : '<div @class="_selectedSettings is \'gallery\'',
                applybefore : '\n\t\t<<iModSettingsButton>>\n\t\t'
            },
            {
                src : '<span class="gold">$per_npc[_pNPCId].name',
                to  : '<span class="gold">$NPCName[_pNPCId].displayname'
            },
            {
                src : '<<NPC_CN_NAME $NPCName[_npcId].nam>>',
                to  : '$NPCName[_npcId].displayname'
            },
            {
                src : '\t$NPCName[_npcId].nam',
                to  : '\t$NPCName[_npcId].displayname'
            }
        ],
        'Widgets Named Npcs' : [
            {
                src : '<<relationshiptext>>',
                to  : '<<ModRelationshipText $NPCName[_i].nam>>'
            },
            {
                src : '<<NPC_CN_NAME _npc>>',
                to  : '<<=C.npc[_npc].displayname>>'
            },
            {
                src : '\t\t\t_npc',
                to  : '\t\t\t<<=C.npc[_npc].displayname>>'
            }
        ],
        Widgets : [
            {
                srcgroup : '_npcData.nam\n',
                to       : '_npcData.displayname\n'
            },
            {
                srcgroup : '_npcData.nam?\n',
                to       : '_npcData.displayname?\n'
            },
            {
                srcgroup : '<<NPC_CN_NAME _npcData.nam>>',
                to       : '_npcData.displayname'
            }
        ],
        'Widgets Underground' : [
            {
                src        : '<<widget "undergroundCellOptions">>',
                applyafter : '\n<<ExtraLinkZone>>\n'
            }
        ],
        'Widgets Attitudes' : [
            {
                src         : '<<if _potentialLoveInterests.length lte 1>>',
                applybefore : '\n<<run setup.ModLoveInterest()>>\n'
            },
            {
                srcgroup : '<<optionsfrom _potentialLoveInterests>>',
                to       : '<<optionsfrom _loveInterestSelections>>'
            },
            {
                srcgroup : '<<optionsfrom _loveInterestcn>>',
                to       : '<<optionsfrom _loveInterestSelections>>'
            },
            {
                src        : '<<run _potentialLoveInterests.delete($loveInterest.primary)>>',
                applyafter : '<<run let key = C.npc[$loveInterest.primary].displayname; delete _loveInterestSelections[key]>>'
            }
        ],

        Statistics : [
            {
                src : '\t<</foldout>>\n<</widget>>',
                to  : '\t<</foldout>>\n\n\t<<iModStatist>>\n\n<</widget>>'
            },
            {
                src : '</div>\n<</widget>>',
                to  : '\n\n\t<<iModExtraStatist>>\n\n\t</div>\n<</widget>>'
            }
        ],

        'Widgets Actions Generation' : [
            {
                src         : '<<switch $options.combatControls>>',
                applybefore : '\n<<run setup.ModCombatSetting()>>\n'
            }
        ]
    };
	
    function checkBJX(source) {
        if (source.includes('<<support>>')) {
            source = source.replace('\t\t/* 北极星模组 */\n\t\t<<support>>\n\t\t/* 北极星 */', '');
            source = `<<if $passage isnot 'Start'>><div style="position:fixed; top:1px; font-size:smaller; left:180px"><<support>></div><</if>>\n${source}`;
        }

        if (source.includes('"帕鲁提"')) {
            // 先把widget提取出来
            const _text = source.replace(/\n/g,'[n]');
            const [txt, widget] = _text.match(/<<widget "updateNewNamedNpcs">>(.+)<<\/widget>>\[n\]\[n\]<<widget "generateNPCNameHairAndEyeColors">>/);
            let [txt1, code] = widget.match(/\/\* 北极星模组 \*\/(.+)\/\* 北极星 \*\//);
            code = code.replace(/\[n\]/g, '\n');
            source = source.replace(code, '\t\t<<run\n\t\t\tconst bjxnpc = {\n\t\t\t\t"泰勒": {nam : "泰勒", title: "探险家", insecurity: "weak", teen: 1},\n\t\t\t\t"凯西": {nam : "凯西", title: "逃学者", insecurity: "weak", teen: 1},\n\t\t\t\t"塞伦": {nam : "塞伦", title: "见习信徒", insecurity: "skill", teen: 1},\n\t\t\t\t"帕鲁提": {nam : "帕鲁提", title: "巫师", insecurity: "skill", teen: 1, type: "cat", claws: "claws"}\n\t\t\t};\n\n\t\t\tObject.assign(_newNNPCs, bjxnpc)\n\t\t>>\n\t\t<<for _npc range Object.keys(_newNNPCs)>>\n\t\t\t<<if !$NPCNameList.includes(_newNNPCs[_npc].nam)>>\n\t\t\t\t<<newNamedNpc _newNNPCs[_npc]>>\n\t\t\t\t<<set _npcsAdded to true>>\n\t\t\t<</if>>\n\t\t<</for>>\n\t\t');
            console.log('[SFInfo] 北极星检测', source);
            simpleFrameworks.bjxpatch = true;
        }
		
        return source;
    }

    const applysrc = function (source, srctxt, set) {
        if (set.to) {
            source = source.replace(srctxt, set.to);
        }
        else if (set.applyafter) {
            source = source.replace(srctxt, srctxt + set.applyafter);
        }
        else if (set.applybefore) {
            source = source.replace(srctxt, set.applybefore + srctxt);
        }
        return source;
    };

    const applymatch = function (source, matcher, set) {
        if (source.match(matcher) == null) return source;
		
        const [txt, txt1] = source.match(matcher);
        return applysrc(source, txt, set);
    };

    const applygroup = function (source, srctxt, set) {
        if (set.to) {
            source = source.split(srctxt).join(set.to);
        }
        else if (set.applyafter) {
            source = source.split(srctxt).join(srctxt + set.applyafter);
        }
        else if (set.applybefore) {
            source = source.split(srctxt).join(set.applybefore + srctxt);
        }
        return source;
    };

    const matchAndApply = function (set, source, title) {
        if (set.src && source.includes(set.src)) {
            source = applysrc(source, set.src, set);
        }
        else if (set.src) {
            console.warn('match failed:', set.src, title);
        }
        if (set.srcmatch && source.match(set.srcmatch)) {
            source = applymatch(source, set.srcmatch, set);
        }
        else if (set.srcmatch) {
            console.warn('match failed:', set.srcmatch, title);
        }

        if (set.srcmatchgroup && source.match(set.srcmatchgroup)) {
            const txt = source.match(set.srcmatchgroup);
            if (txt.length > 0) {
                for (let i = 0; i < txt.length; i++) {
                    const text = txt[i];
                    if (set.find) {
                        const res = applysrc(text, set.find, set);
                        source = source.replace(text, res);
                    }
                    else if (set.findmatch) {
                        const [txt1, txt2] = text.match(set.findmatch);
                        const res = applysrc(txt[i], txt1, set);
                        source = source.replace(text, res);
                    }
                    else {
                        source = applysrc(source, text, set);
                    }
                }
            }
        }
        else if (set.srcmatchgroup) {
            console.warn('match failed:', set.srcmatchgroup, title);
        }
        if (set.srcgroup && source.includes(set.srcgroup)) {
            source = applygroup(source, set.srcgroup, set);
        }
        else if (set.srcgroup) {
            console.warn('match failed:', set.srcgroup, title);
        }

        return source;
    };

    // 能批处理的批处理。街道和地点，以及战斗场景
    function patchScene(passage, title) {
        let source = String(passage.content);

	
        if (locationPassage[title]) {
            locationPassage[title].forEach(set => {
                source = matchAndApply(set, source, title);
            });
			
            if (title === 'StoryCaption') {
                source = checkBJX(source);
            }

            passage.content = source;
			

            patchedPassage[title] = 1;
	
            return passage;
        }
        
        passage.content = source;
	
        return passage;
    }
	
    // 简单粗暴的批量脚本，在对应位置增加文本区域。
    function patchPassage(passage, title) {
        if (title == 'StoryCaption') {
            // nothing to do at storycaption
        }
        else if (title == 'PassageHeader') {
            // add div to passage header
            passage.content = `<div id="passage-header">\n${passage.content}\n<div id='headerMsg'></div><<iModHeader>></div>`;
        }
        else if (title == 'PassageFooter') {
            // add div to passage footer
            passage.content = `<div id="passage-footer">\n${passage.content}\n<<iModFooter>></div>`;
        }
        else {
            // add div to passage content
            passage.content = `<div id="passage-content">\n${passage.content}\n</div>`;
        }
        

        // 处理过的就跳过
        if (patchedPassage[title]) return passage;

        return passage;
    }

    function patchCombat(source) {
        let src = source;
        const txt = src.match(/<<widget "[a-zA-z]+Difficulty">>([\s\S]*?)<<\/widget>>/g);
        txt.forEach(text => {
            const [txt1, txt2] = text.match(/<<widget "(.+)Difficulty">>/);
            const res = text.replace('<</widget>>', `\n\n\t<<ModCombatDifficulty _diffAction "${txt2}">>\n\n<</widget>>`);
            src = src.replace(text, res);
        });
        return src;
    }
	
    // 简单粗暴的批量脚本，在对应的widget区最后加个钩子
    function patchWidget(passage, title) {
        let source = passage.content;

        if (!widgetPassage[title]) return;

        // console.log(typeof source, title, passage);
	
        widgetPassage[title].forEach(set => {
            if (set.src && source.includes(set.src)) {
                source = applysrc(source, set.src, set);
            }
            else if (set.src) {
                console.warn('match failed:', set.src, title);
            }
            if (set.srcmatch && source.match(set.srcmatch)) {
                srouce = applymatch(source, set.srcmatch, set);
            }
            else if (set.srcmatch) {
                console.warn('match failed:', set.srcmatch, title);
            }

            if (set.srcmatchgroup && source.match(set.srcmatchgroup)) {
                const txt = source.match(set.srcmatchgroup);
                if (txt.length > 0) {
                    for (let i = 0; i < txt.length; i++) {
                        const text = txt[i];
                        if (set.find) {
                            const res = applysrc(text, set.find, set);
                            source = source.replace(text, res);
                        }
                        else if (set.findmatch) {
                            const [txt1, txt2] = text.match(set.findmatch);
                            const res = applysrc(txt[i], txt1, set);
                            source = source.replace(text, res);
                        }
                        else {
                            source = applysrc(source, text, set);
                        }
                    }
                }
            }
            else if (set.srcmatchgroup) {
                console.warn('match failed:', set.srcmatchgroup, title);
            }
            if (set.srcgroup && source.includes(set.srcgroup)) {
                source = applygroup(source, set.srcgroup, set);
            }
            else if (set.srcgroup) {
                console.warn('match failed:', set.srcgroup, title);
            }
        });

        if (title == 'Widgets Actions Generation') {
            source = patchCombat(source);
        }

        if (title === 'npcNamed') {
            source = checkBJX(source);
        }
	
        passage.content = source;
	
        return passage;
    }

    function patchPasssage2(passage, title) {
        if (passage.tags.includes('widget')) {
            patchWidget(passage, title);
        }
        else {
            patchScene(passage, title);
            patchPassage(passage, title);
        }
    }
	
    async function simpleWidgetInit(passageData) {
        await simpleFrameworks.createWidgets();
        await simpleFrameworks.createModInitMacro();
        await simpleFrameworks.createSpecialWidgets();

        // modUtils.updatePassageData('Simple Widget Frameworks', '', ['widget'], 0)
        let data = {
            id       : 0,
            name     : 'Simple Widget Frameworks',
            position : '100,100',
            size     : '100,100',
            tags     : ['widget']
        };

        data.content = simpleFrameworks.widgethtml;
        passageData.set('Simple Widget Frameworks', data);

        data = {
            id       : 0,
            name     : 'PassageReady',
            position : '100,100',
            size     : '100,100',
            tags     : [],
            content  : '<<iModReady>>\n'
        };
		
        passageData.set('PassageReady', data);

        data = {
            id       : 0,
            name     : 'PassageDone',
            position : '100,100',
            size     : '100,100',
            tags     : [],
            content  : '<<iModDone>>\n'
        };

        passageData.set('PassageDone', data);

        data = passageData.get('StoryInit');
        data.content += '\n<<iModInit>>\n';
        passageData.set('StoryInit', data);
        
        return passageData;
    }
	
	
    async function afterPatchModToGame() {
        const modSC2DataManager = window.modSC2DataManager;
        const addonTweeReplacer = window.addonTweeReplacer;
	
        const oldSCdata = modSC2DataManager.getSC2DataInfoAfterPatch();
        const SCdata = oldSCdata.cloneSC2DataInfo();
        const passageData = SCdata.passageDataItems.map;

        console.log('[SFDebug] passageData: ' , passageData);
		
        await simpleWidgetInit(passageData);

        console.log('[SFDebug] Simple Framework patching passage...');

        for (const [title, passage] of passageData) {
            try {
                await patchPasssage2(passage, title);
            }
            catch (e) {
                console.error(e);
                addonTweeReplacer.logger.error(`PatchScene: ${title} ${e?.message ? e.message : e}`);
            }
        }
	
        SCdata.passageDataItems.back2Array();
        addonTweeReplacer.gModUtils.replaceFollowSC2DataInfo(SCdata, oldSCdata);
    }
	
    window.SimplePatchPassage = {
        patchedPassage,
        locationPassage,
        patchScene,
        patchPassage,
        patchWidget,
        afterPatchModToGame,
        applygroup,
        applymatch,
        applysrc
    };

    await afterPatchModToGame();
    // 这里的返回值会被JsPreloader接收，如果返回的是一个Promise，则会等待这个Promise执行完毕后再继续执行下一个脚本，或继续初始化引擎
    return Promise.resolve('Simple Patch Paassage ok');
})();

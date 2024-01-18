setup.lang = {
    next         : { EN : 'Next', CN : '继续' },
    leave        : { EN : 'Leave', CN : '离开' },
    back         : { EN : 'Back', CN : '返回' },
    items        : { EN : 'Items', CN : '物品' },
    ITEMS        : { EN : 'ITEMS', CN : '物品' },
    unequip      : { EN : 'Unequip', CN : '卸下' },
    equip        : { EN : 'Equip', CN : '装备' },
    move         : { EN : 'Move', CN : '移动' },
    drop         : { EN : 'Drop', CN : '丢弃' },
    willpower    : { EN : 'Willpower', CN : '意志' },
    alcohol      : { EN : 'Alcohol', CN : '酒精' },
    hallucinogen : { EN : 'Hallucinogen', CN : '幻觉' },
    hunger       : { EN : 'Hunger', CN : '饥饿' },
    health       : { EN : 'Health', CN : '健康' },
    storage      : { EN : 'Storage', CN : '库存' },
    mechanic     : { EN : 'Mechanic', CN : '机械' },
    chemical     : { EN : 'Chemical', CN : '化学' },
    cooking      : { EN : 'Cooking', CN : '烹饪' },
    wakeup       : { EN : 'Wake up', CN : '醒来' },
    loiter       : { EN : 'Loiter', CN : '闲逛' },
    take         : { EN : 'Take', CN : '取出' },
    takehalf     : { EN : 'Take half', CN : '取出一半' },
    clearall     : { EN : 'Clear', CN : '清空' }
};
//------------------------------------------------------
//
//  widget： 语言切换，性别切换，条件切换
//
//------------------------------------------------------
function lanSwitch(...lan) {
    if (String(lan[0]) == '[object Object]') {
        return lan[0][setup.language] ?? lan[0].EN ?? lan[0].CN;
    }

    let [EN, CN] = lan;

    if (Array.isArray(lan[0])) {
        [EN, CN] = lan[0];
    }

    if (setup.language == 'CN') {
        return CN ?? EN;
    }
    return EN ?? CN;
}
window.lanSwitch = lanSwitch;
DefineMacroS('lanSwitch', lanSwitch);

function getLan(key) {
    if (key.includes('.')) {
        const lanObj = getPath(setup.lang, key);
        if (lanObj == undefined) {
            return `error: the dictionary key is not found, path: ${key}`;
        }

        return lanObj[setup.language] ?? lanObj.EN ?? lanObj.CN;
    }

    if (setup.lang[key][setup.language] == undefined) {
        return setup.lang[key].EN ?? setup.lang[key].CN;
    }
    return setup.lang[key][setup.language];
}
window.getLan = getLan;
DefineMacroS('getLan', getLan);

function sexSwitch(npc, female, male) {
    let gender = 'f';
    if (npc !== 'pc' && typeof npc == 'string') {
        gender = C.npc[npc].gender;
    }
    else if (typeof npc == 'number') {
        gender = V.NPCList[V.index]?.gender ?? 'm';
    }
    else {
        gender = V.player.gender_appearance;
    }

    if (gender == 'm') {
        return male;
    }

    return female;
}

window.sexSwitch = sexSwitch;
DefineMacroS('sexSwitch', sexSwitch);

function nnpcboy(npc) {
    let gender = C.npc[npc].pronoun;

    if (npc == 0) {
        gender = V.NPCList[V.index].pronoun;
    }
    const boy = {
        EN : 'boy',
        CN : '男孩'
    };
    const girl = {
        EN : 'girl',
        CN : '女孩'
    };

    if (gender == 'm') {
        return boy[setup.language];
    }

    return girl[setup.language];
}
DefineMacroS('nnpcboy', nnpcboy);

function nnpcBoy(npc) {
    return nnpcboy(npc).toUpperFirst();
}
DefineMacroS('nnpcBoy', nnpcBoy);


function pcpn(pronun) {
    const lan = {
        EN : {
            him     : 'him',
            his     : 'his',
            he      : 'he',
            himself : 'himself'
        },
        CN : {
            him     : '他',
            his     : '他的',
            he      : '他',
            himself : '他自己'
        }
    };
    const pron = pronun.toLowerCase();

    return pronun[0] == 'H' ? lan[setup.language][pron].toUpperFirst() : lan[setup.language][pron];
}

DefineMacroS('pcpn', pcpn);

function speechDif(bratty, neutral, meek) {
    if (V.speech_attitude == 'bratty') return bratty;
    if (V.speech_attitude == 'neutral') return neutral;
    if (V.speech_attitude == 'meek') return meek;
}
window.speechDif = speechDif;


function cond(...condtxt) {
    for (let i = 0; i < condtxt.length; i++) {
        if (condtxt[i][0]) {
            return condtxt[i][1];
        }

        return condtxt[condtxt.length - 1][1];
    }
}
window.cond;
DefineMacroS('cond', cond);


Macro.add('randomdata', {
    tags : ['datas'],
    handler() {
        const len = this.payload.length;
        const rateMode = this.payload[0].source.includes('rate');

        console.log(this.payload);
        if (len == 1) return this.error(`no data found from randomdata: ${this.payload[0].source}${this.payload[0].contents}`);

        if (!rateMode) {
            const index = random(1, len - 1);
            const data = this.payload[index].contents;
            jQuery(this.output).wiki(data);
            return;
        }

        const datas = new Array(len - 1).fill({ rate : 0, contents : '' });
        let defaultText = '';

        this.payload.forEach((data, index) => {
            if (index == 0) return;

            const rate = data.source.match(/\d+/);
            datas[index - 1] = { rate : Number(rate), contents : data.contents };

            if (!rate) {
                defaultText = data.contents;
            }
        });

        // sort by rate, biggest to smallest
        datas.sort((a, b) => b.rate - a.rate);

        // if not default set, the biggest one will be the default text
        if (defaultText == '') {
            defaultText = datas[0].contents;
        }

        console.log(datas);

        // get total rate
        let total = datas.reduce((res, cur) => res + cur.rate, 0);

        // sort by rate, smaller to bigger
        datas.sort((a, b) => a.rate - b.rate);

        for (let i = 0; i < datas.length; i++) {
            const data = datas[i];
            const rate = random(1, total);

            if (Config.debug) {
                console.log('random rate:', rate, 'total:', total, 'data rate:', data.rate, 'data:', data.contents);
            }
            
            if (rate < data.rate) {
                jQuery(this.output).wiki(data.contents);
                return;
            }
            
            total -= data.rate;
        }

        jQuery(this.output).wiki(defaultText);
    }
});

/*
Macro.add(['lanLink', 'lanButton'], {
    isAsync : true,
    tags    : ['lan', 'linkcode'],
    handler() {
        let passage = this.args[0];

        if (this.payload.length == 1) return this.error('no link text found');

        const languages = this.payload.filter(data => data.name == 'lan').map(data => data.args);
        const code = this.payload.filter(data => data.name == 'linkcode')[0]?.contents ?? null;

        if (languages.length == 0) return this.error('no language text found');

        if (Config.debug) console.log(languages, code);

        let displaytext = '';
        for (let i = 0; i < languages.length; i++) {
            if (languages[i][0] == setup.language) {
                displaytext = languages[i][1];
                break;
            }
        }

        if (displaytext == '') {
            displaytext = languages[0][1];
        }

        const link = jQuery(document.createElement(this.name === 'lanButton' ? 'button' : 'a'));
        link.wikiWithOptions({ profile : 'core' }, displaytext);

        if (!passage) {
            link.addClass('link-internal');
        }
        else {
            link.attr('data-passage', passage);

            if (Story.has(passage)) {
                link.addClass('link-internal');
                T.link = true;

                if (Config.addVisitedLinkClass && State.hasPlayed(passage)) {
                    $link.addClass('link-visited');
                }
            }
            else {
                link.addClass('link-broken');
            }
        }

        link.addClass(`macro-${this.name == 'lanButton' ? 'button' : 'link'}`)
            .ariaClick(
                {
                    namespace : '.macros',
                    one       : typeof passage == 'string' && passage.length > 0
                },
                this.createShadowWrapper(
                    typeof code == 'string' ?
                        () => {
                            Wikifier.wikifyEval(code.trim());
                        }
                        : null,
                    
                    typeof passage == 'string' && passage.length > 0 ?
                        () => {
                            const target = document.querySelector('#storyCaptionDiv');
                            window.scrollUIBar = target ? target.scrollTop : null;
                            window.scrollMain = document.scrollingElement.scrollTop;
                            SugarCube.Engine.play(passage);
                        }
                        : null
                )

            )
            .appendTo(this.output);
    }
});
*/

// escape all the space inside the '' or ""
function escapeSpaceInsideQuote(source) {
    const patch = source.match(/".*?"|'.*?'/g);
    if (patch) {
        patch.forEach(text => {
            source = text.replaceAll(' ', '_');
        });
    }
    return text;
}

Macro.add(['lanlink', 'lanbutton'], {
    isAsync : true,
    tags    : null,
    handler() {
        if (this.args.length == 0) return this.error('no args found');

        const args = this.args;
        
        let displaytext;
        let passage = null;
        const code = this.payload[0].contents;

        // if using object or array
        if (typeof args[0] == 'object' && args.length <= 2) {
            displaytext = lanSwitch(args[0]);
            if (args.length == 2) passage = args[1];
        }
        else if (typeof args[0] == 'object' && args.length > 2) {
            return this.error('too many object args');
        }

        // if using global variable. if just a string like "go out." then should has ' or " to wrap it
        const checksanity = function(src) {
            const check = {
                gval : 0,
                val  : 0,
                func : 0,
                str  : 0
            };

            // escape all the space inside the quote
            src = escapeSpaceInsideQuote(src);

            const source = src.split(' ');
            // then check the source and analyze it
            for (let i = 0; i < source.length; i++) {
                const text = source[i];
                if (text.startsWith('State.')) {
                    check.val++;
                }
                else if (text.match(/^[a-zA-Z0-9]*?(\.\S|\[)/)) {
                    check.gval++;
                }
                else if (text[0].has('"', "'") == false && text[ text.length - 1 ].has('"', "'") == false && source[i].has('(', ')') == 2) {
                    check.func++;
                }
                else {
                    check.str++;
                }
            }

            return check;
        };

        const check = checksanity(args.full);

        console.log('lanlink check args:', args, check);

        // if is global variable and length is lte 2
        if (args.length <= 2 && check.gval == 1) {
            const variable = args[0].replaceAll('$', 'V.').replaceAll('_', 'T');
            // eslint-disable-next-line no-eval
            displaytext = lanSwitch(eval(variable));
            if (args.length == 2) passage = args[1];
        }
        else if (args.length > 2 && check.gval > 1) {
            return this.error('too many global variable args');
        }


        // if is string but found function or no string found
        if (args.length == 2 && check.func == 1 || check.str == 0) {
            displaytext = args[0];
            passage = args[1];
        }

        // if is two string;
        if (args.length == 2 && check.str == 2) {
            displaytext = lanSwitch(args[0], args[1]);
        }

        // just one string
        if (args.length == 1 && typeof args[0] == 'string') {
            displaytext = args[0];
        }
        
        // if no valid display text found
        if (args.length == 1 && !displaytext) {
            return this.error('no valid display text found');
        }

        if (!displaytext && args.length > 2) {
            passage = args.pop();
            displaytext = lanSwitch(args);
        }
        else if (!displaytext && args.length == 2) {
            displaytext = lanSwitch(args);
        }

        if (Config.debug) console.log(displaytext, passage);

        const link = jQuery(document.createElement(this.name === 'lanbutton' ? 'button' : 'a'));
        link.wikiWithOptions({ profile : 'core' }, displaytext);

        if (!passage) {
            link.addClass('link-internal');
        }
        else {
            link.attr('data-passage', passage);

            if (Story.has(passage)) {
                link.addClass('link-internal');
                T.link = true;

                if (Config.addVisitedLinkClass && State.hasPlayed(passage)) {
                    $link.addClass('link-visited');
                }
            }
            else {
                link.addClass('link-broken');
            }
        }

        link.addClass(`macro-${this.name == 'lanButton' ? 'button' : 'link'}`)
            .ariaClick(
                {
                    namespace : '.macros',
                    one       : passage != null
                },
                this.createShadowWrapper(
                    code !== '' ?
                        () => {
                            Wikifier.wikifyEval(code.trim());
                        }
                        : null,
                    
                    typeof passage == 'string' && passage.length > 0 ?
                        () => {
                            const target = document.querySelector('#storyCaptionDiv');
                            window.scrollUIBar = target ? target.scrollTop : null;
                            window.scrollMain = document.scrollingElement.scrollTop;
                            SugarCube.Engine.play(passage);
                        }
                        : null
                )

            )
            .appendTo(this.output);
    }
});

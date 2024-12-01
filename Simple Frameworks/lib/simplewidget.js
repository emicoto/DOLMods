const frameworkversion = "1.15.5"

window.simpleFrameworks = {
    version    : frameworkversion,
    name       : 'Simple Frameworks',
    author     : 'Lune',
    lastUpdate : '2024.06.20',
    onInit(...widgets) {
        widgets.forEach(widget => {
            if (String(widget) == '[object Object]' && widget.name) {
                this.initFunction.push(widget.name);
            }
            if (typeof widget === 'string') {
                this.iModInit.push(widget);
            }
        });
    },

    addto(zone, ...widgets) {
        widgets.forEach(widget => {
            if (typeof widget === 'string') {
                this.data[zone].push(widget);
            }
            if (String(widget) == '[object Object]' && widget.passage && widget.widget) {
                this.data[zone].push(widget);
            }
        });
    },

    initFunction : [],

    data : {
        ModDegreesBox              : [],
        ModSkillsBox               : [],
        ModCharaDescription        : [],
        ModCaptionDescription      : [],
        ModCaptionAfterDescription : [],
        ModStatusBar               : [],
        ModMenuBig                 : [],
        ModMenuSmall               : [],
        
        BeforeLinkZone : [],
        ExtraLinkZone  : [],
        ModShopZone    : [],
        CustomImgLayer : [],

        iModInit         : [],
        iModHeader       : [],
        iModFooter       : [],
        iModReady        : [],
        iModDone         : [],
        iModOptions      : [],
        iModSettings     : [],
        iModCheats       : [],
        iModStatus       : [],
        iModFame         : [],
        iModStatist      : [],
        iModExtraStatist : []

    },

    storyInit() {
        this.initFunction.forEach(initfunc => {
            const init = initfunc;
            if (typeof init == 'function') init();
        });
    },

    default : {
        iModInit  : () => '<<iModInitFunction>><<run setup.addBodyWriting()>>\n\n',
        iModReady : () => '<<iModonReady>>\n\n',
        
        iModOptions : () => `
<<setupOptions>>
<span class="gold"><<lanSwitch "Simple Framework" "简易框架" >></span>
<br>

<<lanSwitch "Current Modds Language Setting: " "当前模组语言设定：">>
<<set _output to lanSwitch("English","中文")>>
<<link _output $passage>>
	<<if setup.language is 'EN'>>
		<<set setup.language to 'CN'>>
	<<else>>
		<<set setup.language to 'EN'>>
	<</if>>
    <<run $(document).trigger(':switchlanguage')>>
<</link>>
　　
<<set _output to lanSwitch("Confirm", "确认")>>
<<link _output $passage>>
<</link>>
<br><br>

`,

        iModCheats : () => `
<span class="gold"><<lanSwitch "Cheats Extends Mods" "作弊扩展">></span>
<br>
<<set _link = lanSwitch("Dry yourself", "一键烘干")>>
<<link _link $passage>>
    <<set $upperwet to 0, $lowerwet to 0, $underlowerwet to 0, $underupperwet to 0>>
<</link>>
<br><br>
`,

        iModSettings : () => `
<div class="solidBorderContainer settings-container">
<i><<=lanSwitch(
    'All the settings of <span class="gold">mods</span>.',
    '所有<span class="gold">模组</span>的设置。'
)>></i>
</div>
<hr>
`,
        CustomImgLayer : () => '\n<<ModLocationIMG>>'
    },

    specialWidget : {
        iModReplace : () => `
<<widget "iModReplace">>
	<<set _key to _args[0]>>
	<<if !_key>>
		<<exit>>
	<</if>>

	<<if _currentOverlay is _key>>
		<<run closeOverlay()>>
		<<exit>>
	<</if>>

	<<script>>
		T.buttons.toggle();
		updateOptions();
		T.currentOverlay = T.key;
		$("#customOverlay").removeClass("hidden").parent().removeClass("hidden");
		$("#customOverlay").attr("data-overlay", T.currentOverlay);
	<</script>>
	<<print '<<'+_key+'>>'>>
<</widget>>`,

        iModSettingsButton : () => `
<<widget "iModSettingsButton">>
    <div id='modSettingButton' @class="_selectedSettings is 'mods' ? 'gold buttonStartSelected' : 'buttonStart'" >
    <<button "Mod Settings">>
        <<set _selectedSettings to "mods">>
        <<replace #settingsOptions>><<settingsOptions>><</replace>>
        <<replace #settingsDiv>><<iModSettings>><</replace>>
        <<replace #settingsExit>><<settingsExit>><</replace>>
    <</button>>
    </div>
<</widget>>
`,

        ModLocationIMG : () => `
<<widget "ModLocationIMG">>
    <<if setup.ModLocationPNG.includes($location)>>
    <img id='location' class='CustomLocation' @src="_imgLoc + _weather_display + '/$location' + _dayState + '.png'">
    <<elseif setup.ModLocationGIF.includes($location)>>
    <img id='location' class='CustomLocation' @src="_imgLoc + _weather_display + '/$location' + _dayState + '.gif'">
    <</if>>
<</widget>>
`,
        ModaddNPCRelationText : () => `
<<widget "ModaddNPCRelationText">>
<<if SugarCube.Macro.has($args[0]+'Opinion')>>
    <<print '<<'+$args[0]+'Opinion>>'>>
<<else>>
    <<print C.npc[_npc].displayname>>
    <<if C.npc[_npc].love gte $npclovehigh>>
        <<if C.npc[_npc].dom gte $npcdomhigh>>
            <<=lanSwitch(
                "thinks you're <span class='green'>adorable.</span>",
                "觉得你<span class='green'>十分惹人疼爱。</span>"
            )>>
        <<elseif C.npc[_npc].dom lte $npcdomlow>>
            <<=lanSwitch(
                "thinks you're <span class='green'>inspiring.</span>",
                "觉得你<span class='green'>令人心动。</span>"
            )>>
        <<else>>
            <<=lanSwitch(
                "thinks you're <span class='green'>delightful.</span>",
                "觉得你<span class='green'>令人愉快。</span>"
            )>>
        <</if>>
    <<elseif C.npc[_npc].love lte $npclovelow>>
        <<if C.npc[_npc].dom gte $npcdomhigh>>
            <<=lanSwitch(
                "thinks you're <span class='red'>pathetic.</span>",
                "认为你<span class='red'>十分可悲。</span>"
            )>>
        <<elseif C.npc[_npc].dom lte $npcdomlow>>
            <<=lanSwitch(
                "thinks you're <span class='red'>irritating.</span>",
                "认为你<span class='red'>使人恼火。</span>"
            )>>
        <<else>>
            <<=lanSwitch(
                "thinks you're <span class='red'>terrible.</span>",
                "认为你<span class='red'>非常讨厌。</span>"
            )>>
        <</if>>
    <<else>>
        <<if C.npc[_npc].dom gte $npcdomhigh>>
            <<=lanSwitch(
                "thinks you're <span class='pink'>cute.</span>",
                "认为你<span class='pink'>很可爱。</span>"
            )>>
        <<elseif C.npc[_npc].dom lte $npcdomlow>>
            <<=lanSwitch(
                "<span class='teal'>looks up to you.</span>",
                "<span class='teal'>敬仰着你。</span>",
            )>>
        <<else>>
            <<=lanSwitch(
                'has no strong opinion of you.',
                '对你没什么看法。'
            )>>
        <</if>>
    <</if>>
<</if>>
<</widget>>
`
    },

    // eslint-disable-next-line require-await
    async createWidgets() {
        const data = this.data;
        const print = {
            start : zone => {
                let html = `\n\n<<widget "${zone}">>\n`;
                const defaultTemp = this.default[zone];

                if (typeof defaultTemp === 'function') {
                    html += `${defaultTemp()}\n`;
                }
                else if (typeof defaultTemp === 'string') {
                    html += `${defaultTemp}\n`;
                }
                return html;
            },
            end : (zone, length) => {
                let html = '<</widget>>\n';
                const br = ['ModShopZone','ModCaptionAfterDescription','ExtraLinkZone'];
                if (br.includes(zone) && length > 0) {
                    html = `<br>${html}`;
                }
                return html;
            }
        };

        let html = '\n';

        for (const zone in data) {
            let _html = print.start(zone);
            _html += `<<=iMod.play("${zone}")>>`;
            _html += print.end(zone, data[zone].length);
            html += _html;
        }

        this.widgethtml = html;
        console.log('[SFDebug] widgetHtml: ', this.widgethtml);

        return 'ok';
    },

    // eslint-disable-next-line require-await
    async createMicroWidgets() {
        const print = {
            hasPassageArr : ({ passage, widget }) => {
                const arr = passage.join('","');

                return `<<if ["${arr}"].includes(V.passage)>><<${widget}>><</if>>\n`;
            },
            hasPassage : ({ passage, widget }) => `<<if V.passage is "${passage}">><<${widget}>><</if>>\n`,
            widget     : widget => `<<${widget}>>\n`,
            
            start : zone => {
                let html = `\n\n<<widget "${zone}">>\n`;
                const defaultTemp = this.default[zone];

                if (typeof defaultTemp === 'function') {
                    html += `${defaultTemp()}\n`;
                }
                return html;
            },

            end : (zone, length) => {
                let html = '<</widget>>\n';
                const br = ['ModShopZone','ModCaptionAfterDescription','ExtraLinkZone'];
                if (br.includes(zone) && length > 0) {
                    html = `<br>${html}`;
                }
                return html;
            }

        };

        let html = '\r\n';
        const data = this.data;
        for (const zone in data) {
            html += print.start(zone);
            
            // eslint-disable-next-line no-loop-func
            data[zone].forEach(widget => {
                if (String(widget) == '[object Object]' && typeof widget.passage == 'string') {
                    html += print.hasPassage(widget);
                }
                else if (String(widget) == '[object Object]' && Array.isArray(widget.passage)) {
                    html += print.hasPassageArr(widget);
                }
                else if (String(widget) == '[object Object]' && (typeof widget.passage == 'undefined' || widget.passage.length == 0)) {
                    html += print.widget(widget.widget);
                }
                else if (typeof widget == 'string') {
                    html += print.widget(widget);
                }
            });
            html += print.end(zone, data[zone].length);
        }

        this.widgethtml = html;

        return 'ok';
    },

    // eslint-disable-next-line require-await
    async createModInitMacro() {
        let html = '\n\n<<widget \'iModInitFunction\'>>\n';
        this.initFunction.forEach(func => {
            html += `<<run ${func}()>>\n`;
        });
        html += '<</widget>>\n';

        this.widgethtml += html;

        return 'ok';
    },

    // eslint-disable-next-line require-await
    async createSpecialWidgets() {
        let html = '\n\n';
        for (const widget in this.specialWidget) {
            html += this.specialWidget[widget]();
        }

        this.widgethtml += html;

        return 'ok';
    },

    widgethtml : ''
};

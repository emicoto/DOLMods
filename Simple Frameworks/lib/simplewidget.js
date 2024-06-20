const frameworkversion = '1.13.1';

window.simpleFrameworks = {
    version    : frameworkversion,
    name       : 'Simple Frameworks',
    author     : 'Lune',
    lastUpdate : '2024.01.04',
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
        <<run iMod.setCf('language', 'CN')>>
	<<else>>
		<<set setup.language to 'EN'>>
        <<run iMod.setCf('language', 'EN')>>
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

        data.forEach((widgets, zone) => {
            let html = print.start(zone);
            html += `<<=iMod.play("${zone}")>>\n`;
            html += print.end(zone, widgets.length);
            this.widgethtml += html;
        });
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
        for (const zone in this.data) {
            html += print.start(zone);
            
            // eslint-disable-next-line no-loop-func
            this.data[zone].forEach(widget => {
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
            html += print.end(zone, this.data[zone].length);
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

    widgethtml : ''
};


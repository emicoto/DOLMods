const frameworkversion = "1.10.1"

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

        iModDone         : [],
        iModReady        : [],
        iModHeader       : [],
        iModFooter       : [],
        iModOptions      : [],
        iModCheats       : [],
        iModStatus       : [],
        iModFame         : [],
        iModInit         : [],
        iModStatist      : [],
        iModExtraStatist : []

    },

    storyInit() {
        this.initFunction.forEach(initfunc => {
            const init = initfunc;
            if (typeof init == 'function') init();
        });
    },

    playWidgets(zone, passageTitle = '') {
        if (!this.data[zone]) return '';
        if (this.data[zone].length == 0) return '';

        const html = this.data[zone].reduce((result, widgets) => {
            if (String(widgets) == '[object Object]' && typeof widgets.passage == 'string' && widgets.passage == passageTitle) {
                result += `<<${widgets.widget}>>`;
            }
            else if (String(widgets) == '[object Object]' && Array.isArray(widgets.passage) && widgets.passage.includes(passageTitle)) {
                result += `<<${widgets.widget}>>`;
            }
            else if (String(widgets) == '[object Object]' && (typeof widgets.passage == 'undefined' || widgets.passage.length == 0)) {
                result += `<<${widgets.widget}>>`;
            }
            else if (typeof widgets == 'string') {
                result += `<<${widgets.widget}>>`;
            }
            return result;
        }, '');

        return html;
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
`
    },

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


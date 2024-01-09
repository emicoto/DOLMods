let frameworkversion = "1.7.5"

window.simpleFrameworks = {
    version: frameworkversion,
    name: 'Simple Frameworks',
    author: 'Lune',
    lastUpdate: '2024.01.04',
    onInit : function(...widgets){
        widgets.forEach((widget)=>{
            if(String(widget) == '[object Object]' && widget.name){
                this.initFunction.push(widget.name)
            }
            if(typeof widget === 'string'){
                this.iModInit.push(widget)
            }
        })
    },

    addto : function(zone, ...widgets){
        widgets.forEach((widget)=>{
            if(typeof widget === 'string'){
                this.data[zone].push(widget)
            }
            if(String(widget) == '[object Object]' && widget.passage && widget.widget){
                this.data[zone].push(widget)
            }
        })
    },

    initFunction:[],

    data : {
        ModSkillsBox:[],
        ModCharaDescription:[],
        ModCaptionDescription:[],
        ModCaptionAfterDescription:[],
        ModStatusBar:[],
        ModMenuBig:[],
        ModMenuSmall:[],
        
        BeforeLinkZone:[],
        ExtraLinkZone:[],
        ModShopZone:[],

        iModDone:[],
        iModReady:[],
        iModHeader:[],
        iModFooter:[],
        iModOptions:[],
        iModCheats:[],
        iModStatus:[],
        iModFame:[],
        iModInit:[],
        iModStatis: [],
        iModExtraStatis: [],

    },

    storyInit(){
        this.initFunction.forEach((initfunc)=>{
            let init = initfunc
            if(typeof init == 'function') init();
        })
    },

    playWidgets(zone, passageTitle=''){
        if(!this.data[zone]) return '';
        if(this.data[zone].length == 0) return '';

        let html = this.data[zone].reduce((result, widgets)=>{
            if(String(widgets) == '[object Object]' && typeof widgets.passage == 'string' && widgets.passage == passageTitle){
                result += `<<${widgets.widget}>>`
            }
            else if (String(widgets) == '[object Object]' && Array.isArray(widgets.passage) && widgets.passage.includes(passageTitle)){
                result += `<<${widgets.widget}>>`

            }
            else if(String(widgets) == '[object Object]' && (typeof widgets.passage == 'undefined' || widgets.passage.length == 0 )){
                result += `<<${widgets.widget}>>`
            }
            else if(typeof widgets == 'string'){
                result += `<<${widgets.widget}>>`
            }
            return result
        }, '')

        return html
    },

    default : {
        iModInit:()=>{
            return `<<iModInitFunction>><<run setup.addBodyWriting()>>\n\n`
        },
        iModReady:()=>{
            return `<<iModonReady>>\n\n`
        },
        
        iModOptions:()=>{
		return `
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

`
        },

        iModCheats:()=>{
            return `
<span class="gold"><<lanSwitch "Cheats Extends Mods" "作弊扩展">></span>
<br>
<<set _link = lanSwitch("Dry yourself", "一键烘干")>>
<<link _link $passage>>
    <<set $upperwet to 0, $lowerwet to 0, $underlowerwet to 0, $underupperwet to 0>>
<</link>>
<br><br>
`    
        }
    },

    createMicroWidgets : async function(){
        const print = {
            hasPassageArr : ({passage, widget})=>{
                const arr = passage.join('","')

                return `<<if ["${arr}"].includes(V.passage)>><<${widget}>><</if>>\n`
            },
            hasPassage : ({passage, widget})=>{
                return `<<if V.passage is "${passage}">><<${widget}>><</if>>\n`
            },
            widget : (widget)=>{
                return `<<${widget}>>\n`
            },
            
            start : (zone)=>{
                let html = `\n\n<<widget "${zone}">>\n`
                let defaultTemp = this.default[zone]

                if(typeof defaultTemp === 'function'){
                    html += defaultTemp()+'\n'
                }
                return html
            },

            end : (zone, length)=>{
                let html = `<</widget>>\n`
                let br=['ModShopZone','ModCaptionAfterDescription','ExtraLinkZone']
                if(br.includes(zone) && length > 0){
                    html = '<br>' + html
                }
                return html
            }

        }

        let html = '\r\n'
        for(let zone in this.data){
            html += print.start(zone)
            
            this.data[zone].forEach((widget)=>{
                if(String(widget) == '[object Object]' && typeof widget.passage == 'string'){
                    html += print.hasPassage(widget)
                }
                else if (String(widget) == '[object Object]' && Array.isArray(widget.passage)){
                    html += print.hasPassageArr(widget)
    
                }
                else if(String(widget) == '[object Object]' && (typeof widget.passage == 'undefined' || widget.passage.length == 0 )){
                    html += print.widget(widget.widget)
                }
                else if(typeof widget == 'string'){
                    html += print.widget(widget)
                }
            })                
            html += print.end(zone, this.data[zone].length)
        }

        this.widgethtml = html

        return 'ok'
    },

    async createModInitMacro(){
        let html = `\n\n<<widget 'iModInitFunction'>>\n`
        this.initFunction.forEach((func)=>{
            html += `<<run ${func}()>>\n`
        })
        html += '<</widget>>\n'

        this.widgethtml += html

        return 'ok'
    },

    widgethtml : ''
}


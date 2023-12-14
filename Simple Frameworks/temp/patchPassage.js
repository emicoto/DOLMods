
(async() => {
	console.log('patchPassage.js')
	alert('running patchPassage.js')

	const patchedPassage = {}

	//一些需要特殊处理的location Passage
	const locationPassage = {
		'PassageHeader':[
			{
				scr:"<<unset $bypassHeader>>",
				to:"<<unset $bypassHeader>>\n<<iModHeader>><div id='headerPopUp'></div>"
			}
		],
		'PassageFooter':[
			{
				scr:"<div id=\"gameVersionDisplay\">",
				to:"<<iModFooter>><div id='footerMsg'></div>\n<div id=\"gameVersionDisplay\">"
			}
		],
		'StoryCaption':[
			{
				scr:'<div id="sidebar-look-description">',
				applybefore:'<<ModCaptionDescription>>\n\t\t\t'
			},
			{
				scr:'<<allurecaption>>',
				applybefore:'<<ModStatusBar>>\n\t\t\t'
			},
			{
				scr:'<</button>>\n\t\t\t<div class="sidebarButtonSplit">',
				to:'<</button>>\n\t\t\t<<ModMenuBig>>\n\t\t\t<div class="sidebarButtonSplit">',
			},
			{
				scr:'</div>\n\t\t\t<div class="sidebarButtonSplit">',
				to:'</div>\n\t\t\t<div class="sidebarButtonSplit"><<ModMenuSmall>></div>\n\t\t\t<div class="sidebarButtonSplit">'
			}
		]
		,
		'Adult Shop':[
			{
				scr: "\t<br><br>\n<</if>>\n\n<<if $stress",
				to: "\t<br><br>\n<</if>>\n\n<div id=\"addAfterMsg\"></div><<beforeLinkZone>>\n\n<<if $stress"
			}
		],
		'Brothel':[
			{
				scr: '<<if $brotheljob is 1>>',
				applybefore: '\n<div id=\"addAfterMsg\"></div>\n<<beforeLinkZone>>\n'
			},
		],
		'Asylum Cell':[
			{
				scr:'<<effects>>',
				applyafter:'<div id="addAfterMsg"></div>\n'
	
			},
			{
				scrgroup:'<<roomoptions>>',
				applybefore:'\n<<beforeLinkZone>>\n'
			},
			{
				scrgroup:'<<link [[Settings|Asylum Settings]]>><</link>>',
				applybefore:'<<ExtraLinkzone>>\n'
			},
			{
				scrgroup:'<<link [[设置|Asylum Settings]]>><</link>>',
				applybefore:'<<ExtraLinkzone>>\n'
			}
		],
		'Asylum':[
			{
				scr:'<<effects>>',
				applyafter:'<div id="addAfterMsg"></div>\n'
			},
			{
				scr:'<<asylumicon  "cell">>',
				applybefore:'\n<<beforeLinkZone>>\n'
			},
			{
				scr:'<<asylumicon "door">>',
				applybefore:'\n<<beforeLinkZone>>\n'
			},
			{
				scr:'<<if $exposed gte 1>>',
				applybefore:'\n<<beforeLinkZone>>\n'
			}
		],
		'Eden Cabin':[
			{
				scr:'<<if ($edenfreedom is 2 and $edendays lt 8) or ($edenfreedom is 1 and $edendays lt 2)>>',
				applybefore:'<div id="addAfterMsg"></div>\n'
			},
			{
				scrgroup:'<<if Time.monthName is "November" and $edenprepare is 1>>',
				applybefore:'\n<<beforeLinkZone>>\n'
			},
			{
				scr:'<<bedicon "eden">><<link',
				applybefore:'\n<<beforeLinkZone>>\n'
			},
			{
				scr:'<<foodicon "pancakes">><<link',
				applybefore:'\n<<beforeLinkZone>>\n'
			}
		],
		'Churchyard':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n'
			},
			{
				scr:'<<foresticon "churchyard">>',
				applybefore:'\n<<beforeLinkZone>>\n'
			}
		],
		'Forest':[
			{
				scr:'<<if $forest lte 0>>',
				applybefore:'<div id="addAfterMsg"></div>\n'
			},
			{
				scrgroup:'<<forestdeeper>>',
				applybefore:'\n<<beforeLinkZone>>\n'
			}
		],
		'Lake Shore':[
			{
				scr:'<<if $exposed gte 1 and $laketeenspresent is 1>>',
				applybefore:'<div id="addAfterMsg"></div>\n',
			},
			{
				scr:'<<mirroricon>>',
				applybefore:'\n<<beforeLinkZone>>\n'
			}
		],
		'Lake Bus':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				scr:'<<if $exposed lte 0>>',
				applybefore:'\n<<beforeLinkZone>>\n'
			}
		],
		'Lake Waterfall':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				scr:'<<lakereturnjourney>>',
				applyafter:'\n<<beforeLinkZone>>\n'
			}
		],
		'Lake Fishing Rock':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				scr:'<<lakereturnjourney>>',
				applyafter:'\n<<beforeLinkZone>>\n'
			}
		],
		'Lake Firepit':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				scr:'<<lakereturnjourney>>',
				applyafter:'\n<<beforeLinkZone>>\n'
			}
		],
		'Lake Campsite':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				scr:'<<lakereturnjourney>>',
				applyafter:'\n<<beforeLinkZone>>\n'
			}
		],
		'Lake Shallows':[
			{
				scr:'<<if $stress gte $stressmax and !$possessed>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n',
			},
			{
				scr:'<<lakereturnjourney>>',
				applyafter:'\n<<beforeLinkZone>>\n'
			}
		],
		'Lake Shallows Ice':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				scr:'<<lakereturnjourney>>',
				applyafter:'\n<<beforeLinkZone>>\n'
			}
		],
		'Lake Depths':[
			{
				scr:'<<if $stress gte $stressmax and !$possessed>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n',
			},
			{
				scr:'<<swimicon>><<link',
				applybefore:'\n<<beforeLinkZone>>\n'
			}
		],
		'Lake Depths Ice':[
			{
				scr:'<<if $stress gte $stressmax and !$possessed>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n',
			},
			{
				scr:'<<if $nextPassageCheck',
				applybefore:'\n<<beforeLinkZone>>\n'
			}
		],
		'Tentacle Plains':[
			{
				scr:'<<tentaclewolf>>',
				applyafter:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				scr:'<<if $tentnorth is 0 and $tenteast is 0>>',
				applybefore:'\n<<beforeLinkZone>>\n'
			}
		],
		'Wolf Cave':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				scr:'<<if $wolfcavedig gte 13>>',
				applybefore:'\n<<beforeLinkZone>>\n'
			},
			{
				scr:'<<link [[Settings|',
				applybefore:'\n<<ExtraLinkzone>>\n'
			},
			{
				scr:'<<link [[设置|',
				applybefore:'\n<<ExtraLinkzone>>\n'
			}
		],
		'Wolf Cave Clearing':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				scr:'<<if $halloweenWolves and $wolfstate is "cave">>',
				applybefore:'\n<<beforeLinkZone>>\n'
			}
		],
		'Bird Tower':[
			{
				scr:'<<endevent>>',
				applyafter:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				scr:'<<if $leftarm is "bound" or $rig',
				applybefore:'\n<<beforeLinkZone>>\n'
			},
			{
				scr:'<<if $syndromebird is 1>>',
				applybefore:'\n<<ExtraLinkzone>>\n'
			}
		],
		'Coast Path':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n<<beforeLinkZone>>\n',
			}
		],
		'Coast Path Farmland':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n<<beforeLinkZone>>\n',
			}
		],
		'Estate':[
			{
				scr: '<<ind>><<link',
				applybefore:'<div id="addAfterMsg"></div>\n<<beforeLinkZone>>\n'
			}
		],
		'Farmland':[
			{
				scr:'<<if $stress gte $stressmax>>',
				applybefore:'<div id="addAfterMsg"></div>\n<<beforeLinkZone>>\n'
			},
		],
		'Farm Shed':[
			{
				scr:'<<ind>><<link',
				applybefore:'<div id="addAfterMsg"></div>\n<<beforeLinkZone>>\n'
			},
		],
		'Farm Shave':[
			{
				scr:'<<if $pblevel gte',
				applybefore:'<div id="addAfterMsg"></div>\n<<beforeLinkZone>>\n'
			},
		],
		'Farm Cottage':[
			{
				scr:'<<if $farm.build_finished.includes("nursery")>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				scrgroup:'<<farm_cottage_options>>',
				applybefore:'\n<<beforeLinkZone>>\n'
			}
		],
		'Farm Bedroom':[
			{
				scr:'<<if $stress gte $stressmax and !$possessed>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				scr:'<<if !($earSlime.event and $earSlime.noSleep)>>',
				applybefore:'\n<<beforeLinkZone>>\n'
			},
			{
				scr:'<<link [[Settings|',
				applybefore:'\n<<ExtraLinkzone>>\n'
			},
			{
				scr:'<<link [[设置|',
				applybefore:'\n<<ExtraLinkzone>>\n'
			}
		],
		'Farm Alex Bedroom':[
			{
				scr:'<<if $stress gte $stressmax and !$possessed>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				scr:'<<if playerIsPregnant() and ',
				applybefore:'\n<<beforeLinkZone>>\n'
			}
		],
		'Meadow':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				scr:'<<relaxicon>>',
				applybefore:'\n<<beforeLinkZone>>\n'
			}
		],
		'Livestock Cell':[
			{
				scr:'<<if isPlayerNonparasitePregnancyEnding()>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				scr:'<<else>>\n\t<<link',
				to:'<<else>>\n\t<<beforeLinkZone>>\n<<link',
			},
			{
				scr:'<<link [[Settings',
				applybefore:'\n<<ExtraLinkzone>>\n',
			
			}
		],
		'Livestock Field':[
			{
				scr:'<<if isPlayerNonparasitePregnancyEnding()>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				scr:'<<farmicon "grass">>',
				applybefore:'\n<<beforeLinkZone>>\n',
			}
		],
		'Moor':[
			{
				scr:'<<if $stress gte $stressmax>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				scr:'\t<<if $moor gte 100>>',
				applybefore:'\n<<beforeLinkZone>>\n',
			}
		],
		'Castle':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				scr:'<<if $harpy gte 6 ',
				applybefore:'\n<<beforeLinkZone>>\n',
			}
		],
		'Arcade':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				scr:'<<if Time.hour is 21>>',
				applybefore:'\n<<beforeLinkZone>>\n',
			},
		],
		'Beach':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				scr:'<<if $exposed lte 0>>',
				applybefore:'\n<<beforeLinkZone>>\n',
			}
		],
		'Brothel Dressing Room':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				scr:'<<wardrobeicon>>',
				applybefore:'\n<<beforeLinkZone>>\n',
			},
			{
				scr:'<<link [[Settings',
				applybefore:'\n<<ExtraLinkzone>>\n',
			},
			{
				scr:'<<link [[设置',
				applybefore:'\n<<ExtraLinkzone>>\n',
			}
		],
		'Bus':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br><<beforeLinkZone>>\n',
			}
		],
		'Bus Station':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				scr:'<<if $exposed gte 1>>',
				applybefore:'\n<<beforeLinkZone>>\n',
			}
		],
		'Ocean Breeze':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				scr:'<<if $openinghours is 1 and $exposed',
				applybefore:'\n<<beforeLinkZone>>\n',
			}
		],
		'Elk Compound':[
			{
				scr:'<<if $stress gte $stressmax>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n',
			},
			{
				scr:'<<if $danger lte',
				applybefore:'\n<<beforeLinkZone>>\n',
			}
		],
		'Dance Studio':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				scr:'<<if $openinghours is 1 and $exposed lt 1>>',
				applybefore:'\n<<beforeLinkZone>>\n',
			}
		],
		'Docks':[
			{
				scr:'<<if $arousal gte $arousalmax>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n',
			},
			{
				scr:'<<if $robindebtevent gte 1 and',
				applybefore:'\n<<beforeLinkZone>>\n',
			}
		],
		'Flats':[
			{
				scr:'<<if $stress gte $stressmax and !$possessed>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n',
			},
			{
				scr:'        <<if Time.dayState is "night">>',
				applybefore:'\n<<beforeLinkZone>>\n',
			}
		],
		'Bedroom':[
			{
				scr:"<<set _desk to Furniture.get('desk')>>",
				applybefore:'\n<div id="addAfterMsg"></div>\n',
			},
			{
				scr:'<<deskText "icon">>',
				applybefore:'\n<<beforeLinkZone>>\n',
			},
			{
				scr:'<<link [[Settings',
				applybefore:'\n<<ExtraLinkzone>>\n',
			},
			{
				scr:'<<link [[设置',
				applybefore:'\n<<ExtraLinkzone>>\n',
			}
		],
		'Bathroom':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				scr:'<<if $leftarm is "bound" and $rightarm is "bound">>',
				applybefore:'\n<<beforeLinkZone>>\n',
			}
		],
		"Orphanage":[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				scr:'<if $police_hack is 2 and',
				applybefore:'\n<<beforeLinkZone>>\n',
			}
		],
		'Orphanage Ward':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				scrgroup:'<<orphanageWardOptions>>',
				applybefore:'\n<<beforeLinkZone>>\n',
			}
		],
		'Storm Drain Entrance':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n<<beforeLinkZone>>\n',
			}
		],
		'Hospital front':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			
			{
				scr:'<<getinicon>><<link',
				applybefore:'\n<<beforeLinkZone>>\n',
			}
		],
		'Hospital Foyer':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			
			{
				scr:'<<if $exposed gte 1>>',
				applybefore:'\n<<beforeLinkZone>>\n',
			}
		],
		'Trash':[
			{
				scr:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			
			{
				scr:'<<eventstrash>>\n<<else>>',
				applyafter:'\n<<beforeLinkZone>>\n',
			}
		],
		'Museum':[
			{
				scr:'<<if $arousal gte $arousalmax>>',
				applybefore:'<div id="addAfterMsg"></div>\n',
			},
			
			{
				scr:'<<if $museumhorseintro is 0>>',
				applybefore:'\n<<beforeLinkZone>>\n',
			}
		]
	}
	
	const widgetPassage = {
		'Characteristics':[
			{
				src:'<<characteristic-box _housekeepingConfig>>',
				applyafter:'\n<<ModSkillsBox>>\n',
			},
			{
				scr:'<<bodywriting>>',
				applyafter:'\n<<ModCharaDescription>>\n'
			}
		],
		'overlayReplace':[
			{
				scr:'</div>\n\t<<closeButton>>\n<</widget>>\n\n<<widget \"titleSaves\">>',
				to:`\t\t<<button lanSwitch('Mods', '模组设置')>>\n\t\t<<toggleTab>>\n\t\t<<replace #customOverlayContent>><<iModsOptions>><</replace>>\n\t\t<</button>>\n\n</div>\n\t<<closeButton>>\n<</widget>>\n\n<<widget "titleSaves">>`
			}
		],
		'Widgets variablesStatic':[
			{
				scr:"<</widget>>",
				to:"<<iModInit>>\n\n<</widget>>",
			}
		],
	
	}
	
	//能批处理的批处理。街道和地点，以及战斗场景
	function patchScene(passage, title){
		let source = passage.content
	
		if(locationPassage[title]){
			locationPassage[title].forEach((set)=>{
				if(set.scr){
					if(set.to){
						source = source.replace(set.scr, set.to)
					}
					else if(set.applyafter){
						source = source.replace(set.scr, set.scr + set.applyafter)
					}
					else if(set.applybefore){
						source = source.replace(set.scr, set.applybefore + set.scr)
					}
				}
				if(set.scrgroup){
					if(set.to){
						source = source.split(set.scrgroup).join(set.to)
					}
					else if(set.applyafter){
						source = source.split(set.scrgroup).join(set.scrgroup + set.applyafter)
					}
					else if(set.applybefore){
						source = source.split(set.scrgroup).join(set.applybefore + set.scrgroup)
					}
				}
			})
			passage.content = source
			patchedPassage[title] = 1
	
			return passage
		}
	
		if(source.includes('<<if $options.mapTop is true>>')){
			source = source.replace('<<if $options.mapTop is true>>', '<<beforeLinkZone>>\n<<if $options.mapTop is true>>')
			passage.content = source
		}
	
		if(source.includes('<<streeteffects>>')){
			source = source.replace('<<streeteffects>>', '<<streeteffects>>\n<div id=\"addAfterMsg\"></div>')
			patchedPassage[title] = 1
		}
	
	
		if(source.includes('<<drainlinks>>')){
			source = source.replace('<<drainlinks>>', '<<beforeLinkZone>>\n<<drainlinks>>')
			passage.content = source
		}
	
		if(source.includes('<<island_tide_options>>')){
			source = source.replace('<<island_tide_options>>', '<<beforeLinkZone>>\n<<island_tide_options>>')
			passage.content = source
		}
	
		if(source.includes('<<stall_actions>>')){
			source = source.replace('<<stall_actions>>', '<<beforeLinkZone>>\n<<stall_actions>>')
			passage.content = source
		}
	
		if(source.includes('<<stateman>>')){
			source = source.replace('<<stateman>>', '<div id="addAfterMsg"></div>')
			passage.content = source
			patchedPassage[title] = 1
		}
	
		return passage
	}
	
	//简单粗暴的批量脚本，在对应位置增加文本区域。
	function patchPassage(passage, title){
		let source = passage.content
	
		//处理过的就跳过
		if(patchedPassage[title]) return passage;
		if(source.includes('<<effects>>' === false || patchedPassage[title]) == 1){
			return passage
		}
	
		//一些额外的位置
		let txt = source.split('\n')
	
		let IF = [], endIFZone = false, inIFZone = false, patch=false
		for(let i=0; i<txt.length; i++){
			let line = txt[i]
			let next = txt[i+1]
			let next2 = txt[i+2]
	
			if(line.includes('<<if')){
				IF.push(i)
				inIFZone = true
				endIFZone = false
			}
			if(line.includes('<</if')){
				IF.pop()
				
				if(IF.length == 0 ){
					endIFZone = true
					inIFZone = false
				}
			}
	
			if(line.includes('<br><br>') && (next?.includes('<<link')||next2?.includes('<<link')) && !endIFZone && !inIFZone ){
				txt[i] = txt[i].replace('<br><br>', `<br>\n<div id='addAfterMsg'></div><br>`)
				patch = true
				break
			}
			else if(line.includes('<br><br>') && (next?.includes('<<link')||next2?.includes('<<link')) && endIFZone ){
				txt[i] = txt[i].replace('<br><br>', `<br>\n<div id='addAfterMsg'></div><br>`)
				patch = true
				break
			}
		}
	
		txt = txt.join('\n')
	
		if(!patch && txt.includes('<br><br>')){
			if(txt.includes('<<if') === false && txt.count('<br><br>') > 1 ){
				txt = txt.split('<br><br>')
				txt[txt.length-1] = txt[txt.length-1]  + "\n<div id='addAfterMsg'><div>"
				txt.join('<br><br>')
	
			}
			else{
				txt.replace('<br><br>', `<br>\n<div id='addAfterMsg'><div><br>`)
			}
			patch = true
		}
	
		if(!patch){
			txt.replace('<<effects>>', "<<effects>><div id='addAfterMsg'><div>")
		}
	
		if(patch){
			passage.content = txt
		}
	
		return passage
	}
	
	//简单粗暴的批量脚本，在对应的widget区最后加个钩子
	function patchWidget(passage, title){
		if(!widgetPassage[title]) return;
	
		widgetPassage[title].forEach((set)=>{
			if(set.scr){
				if(set.to){
					source = source.replace(set.scr, set.to)
				}
				else if(set.applyafter){
					source = source.replace(set.scr, set.scr + set.applyafter)
				}
				else if(set.applybefore){
					source = source.replace(set.scr, set.applybefore + set.scr)
				}
			}
			if(set.scrgroup){
				if(set.to){
					source = source.split(set.scrgroup).join(set.to)
				}
				else if(set.applyafter){
					source = source.split(set.scrgroup).join(set.scrgroup + set.applyafter)
				}
				else if(set.applybefore){
					source = source.split(set.scrgroup).join(set.applybefore + set.scrgroup)
				}
			}
		})
	
		passage.content = source
	
		return passage
	}
	
	function patchPasssage2(passage, title){
	
		if(passage.tag.includes('widget')){
			patchWidget(passage, title)
		}
		else{
			patchScene(passage, title)
			patchPassage(passage, title)		
		}
	
	}
	
	async function simpleWidgetInit(passageData){
		let data = passageData.get('Simple Widget Frameworks')
		let html = ''
		html += await simpleFrameworks.createMicroWidgets();
		html += simpleFrameworks.createModInitMacro();
		data.content = html
	
		passageData.set('Simple Widget Frameworks', data)
	
	}
	
	
	async function afterPatchModToGame() {
	
		const modSC2DataManager = window.modSC2DataManager
		const addonTweeReplacer = window.addonTweeReplacer
	
		const oldSCdata = modSC2DataManager.getSC2DataInfoAfterPatch()
		const SCdata = oldSCdata.cloneSC2DataInfo()
		const passageData = SCdata.passageDataItems.map
	
		await simpleWidgetInit(passageData)
	
		for(const [title, passage] of passageData){
			try{
				await patchPasssage2(passage, title)
			}
			catch(e){
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
		afterPatchModToGame
	}
	
	
	await afterPatchModToGame()
	

    // 这里的返回值会被JsPreloader接收，如果返回的是一个Promise，则会等待这个Promise执行完毕后再继续执行下一个脚本，或继续初始化引擎
    return Promise.resolve("patchPassage.js ok");
})();
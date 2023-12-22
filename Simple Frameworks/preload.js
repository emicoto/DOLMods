(async() => {
    // 文件必须以 `(() => {` 在第一行第一个字符开头，以 `})();` 结尾，其他所有代码都必须在这个自调用函数中
    // 文件的开头会有一个等价的`return`，这个return会由JsPreloader在调用时插入到这个文件的开头
    // 这样才能确保这个文件的返回值会被JsPreloader正确接收

    // 自执行函数，会在mod插入html时执行此处内容
    console.log('simple frameworks preload patch passage');
    const modUtils = window.modUtils;

	const patchedPassage = {}

	//一些需要特殊处理的location Passage
	const locationPassage = {
		'PassageHeader':[
			{
				src:"<<unset $bypassHeader>>",
				to:"<<unset $bypassHeader>>\n<div id='headerPopUp'></div><<iModHeader>>"
			}
		],
		'PassageFooter':[
			{
				src:"<div id=\"gameVersionDisplay\">",
				to:"<div id='footerMsg'></div><<iModFooter>>\n<div id=\"gameVersionDisplay\">"
			}
		],
		'StoryCaption':[
			{
				src:'<<schoolday>>\n\t\t<br>',
				to:'<<schoolday>>\n\t\t<div id="captionTextBox">\n\t\t<<ModCaptionDescription>><br>\n\t\t\t'
			},
			{
				src:'<<allurecaption>>',
				applybefore:'<<ModStatusBar>>\n\t\t\t'
			},
			{
				src:'<</button>>\n\t\t\t<div class="sidebarButtonSplit">',
				to:'<</button>>\n\t\t\t<<ModMenuBig>>\n\t\t\t<div class="sidebarButtonSplit">',
			},
			{
				src:'</div>\n\t\t\t<div class="sidebarButtonSplit">',
				to:'</div>\n\t\t\t<div class="sidebarButtonSplit"><<ModMenuSmall>></div>\n\t\t\t<div class="sidebarButtonSplit">'
			},
			{
				src:'<<goo>>',
				to:'\n\t\t\t<<ModCaptionAfterDescription>>\n\t\t\t<<goo>>\n\t\t</div>'
			}
		],
		'Bath':[
			{
				src:'<<effects>>',
				applyafter:'<div id="addAfterMsg"></div>\n'
	
			},
			{
				src:'<<getouticon>><<link',
				applybefore:'\n<<ExtraLinkZone>>\n'
			}
		],
		'Adult Shop':[
			{
				src: "\t<br><br>\n<</if>>\n\n<<if $stress",
				to: "\t<br><br>\n<</if>>\n\n<div id=\"addAfterMsg\"></div><<BeforeLinkZone>>\n\n<<if $stress"
			}
		],
		'Brothel':[
			{
				src: '<<if $brotheljob is 1>>',
				applybefore: '\n<div id=\"addAfterMsg\"></div>\n<<BeforeLinkZone>>\n'
			},
		],
		'Brothel Shower':[
			{
				src:'<<wash>>\n<br><br>',
				applyafter:'<div id="addAfterMsg"></div>\n'
	
			},
			{
				src:'<<getouticon>>',
				applybefore:'<<ExtraLinkZone>>\n'
			}
		],
		'Asylum Cell':[
			{
				src:'<<effects>>',
				applyafter:'<div id="addAfterMsg"></div>\n'
	
			},
			{
				srcgroup:'<<roomoptions>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
			{
				srcgroup:'<<if $asylumstate isnot "sleep">>',
				applybefore:'<<ExtraLinkZone>>\n'
			}
		],
		'Asylum Garden':[
			{
				src:'<br><br>',
				applyafter:'<div id="addAfterMsg"></div>\n'
	
			},
			{
				src:'<<display_plot asylum>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
			{
				src:'<<getouticon>>',
				applybefore:'<<ExtraLinkZone>>\n'
			}
		],
		'Asylum':[
			{
				src:'<<effects>>',
				applyafter:'<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<asylumicon  "cell">>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
			{
				src:'<<asylumicon "door">>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
			{
				src:'<<if $exposed gte 1>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Eden Plots':[
			{
				src:'<<effects>>',
				applyafter:'<div id="addAfterMsg"></div>\n'
	
			},
			{
				src:'<<display_plot eden>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
			{
				src:'<<getouticon>>',
				applybefore:'<<ExtraLinkZone>>\n'
			}
		],
		'Eden Cabin':[
			{
				src:'<<if ($edenfreedom is 2 and $edendays lt 8) or ($edenfreedom is 1 and $edendays lt 2)>>',
				applybefore:'<div id="addAfterMsg"></div>\n'
			},
			{
				srcgroup:'<<if Time.monthName is "November" and $edenprepare is 1>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
			{
				src:'<<bedicon "eden">><<link',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
			{
				src:'<<foodicon "pancakes">><<link',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Cabin Actions':[
			{
				src:'<br>',
				to:'<br><div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<roomoptions>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Churchyard':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<foresticon "churchyard">>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Forest':[
			{
				src:'<<if $forest lte 0>>',
				applybefore:'<div id="addAfterMsg"></div>\n'
			},
			{
				srcgroup:'<<forestdeeper>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Lake Shore':[
			{
				src:'<<if $exposed gte 1 and $laketeenspresent is 1>>',
				applybefore:'<div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<mirroricon>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Lake Bus':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<if $exposed lte 0>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Lake Waterfall':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<lakereturnjourney>>',
				applyafter:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Lake Fishing Rock':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<lakereturnjourney>>',
				applyafter:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Lake Firepit':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<lakereturnjourney>>',
				applyafter:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Lake Campsite':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<lakereturnjourney>>',
				applyafter:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Lake Shallows':[
			{
				src:'<<if $stress gte $stressmax and !$possessed>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<lakereturnjourney>>',
				applyafter:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Lake Shallows Ice':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<lakereturnjourney>>',
				applyafter:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Lake Depths':[
			{
				src:'<<if $stress gte $stressmax and !$possessed>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<swimicon>><<link',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Lake Depths Ice':[
			{
				src:'<<if $stress gte $stressmax and !$possessed>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<if $nextPassageCheck',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Tentacle Plains':[
			{
				src:'<<tentaclewolf>>',
				applyafter:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<if $tentnorth is 0 and $tenteast is 0>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Wolf Cave':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<if $wolfcavedig gte 13>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
			{
				src:'<<link [[Settings|',
				applybefore:'\n<<ExtraLinkZone>>\n'
			},
			{
				src:'<<link [[设置|',
				applybefore:'\n<<ExtraLinkZone>>\n'
			}
		],
		'Wolf Cave Clearing':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<if $halloweenWolves and $wolfstate is "cave">>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
			{
				src:'<<if $nextPassageCheck is "Forest">>',
				applybefore:'\n<<ExtraLinkZone>>\n'
			}
		],
		'Wolf Cave Plots':[
			{
				src:'<<effects>>',
				applyafter:'<div id="addAfterMsg"></div>\n'
	
			},
			{
				src:'<<display_plot wolf>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
			{
				src:'<<getouticon>>',
				applybefore:'<<ExtraLinkZone>>\n'
			}
		],
		'Bird Tower':[
			{
				src:'<<endevent>>',
				applyafter:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<if $leftarm is "bound" or $rig',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
			{
				src:'<<if $syndromebird is 1>>',
				applybefore:'\n<<ExtraLinkZone>>\n'
			}
		],
		'Bird Tower Base':[
			{
				src:'<br><br>',
				applyafter:'<div id="addAfterMsg"></div>\n<<BeforeLinkZone>>\n'
	
			},
			{
				src:'<<getouticon>>',
				applybefore:'<<ExtraLinkZone>>\n'
			}
		],
		'Coast Path':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n<<BeforeLinkZone>>\n',
			}
		],
		'Coast Path Farmland':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n<<BeforeLinkZone>>\n',
			}
		],
		'Estate':[
			{
				src: '<<ind>><<link',
				applybefore:'<div id="addAfterMsg"></div>\n<<BeforeLinkZone>>\n'
			},
			{
				src:'<<if $estate.entrance is "gate">>',
				applybefore:'<<ExtraLinkZone>>\n'
			}
		],
		'Farmland':[
			{
				src:'<<if $stress gte $stressmax>>',
				applybefore:'<div id="addAfterMsg"></div>\n<<BeforeLinkZone>>\n'
			},
		],
		'Farm Shed':[
			{
				src:'<<ind>><<link',
				applybefore:'<div id="addAfterMsg"></div>\n<<BeforeLinkZone>>\n'
			},
			{
				src:'<<ind>><<link [[Leave',
				applybefore:'\n<<ExtraLinkZone>>\n'
			},
			{
				src:'<<ind>><<link [[离开',
				applybefore:'\n<<ExtraLinkZone>>\n'
			}
		],
		'Farm Shave':[
			{
				src:'<<if $pblevel gte',
				applybefore:'<div id="addAfterMsg"></div>\n<<BeforeLinkZone>>\n'
			},
		],
		'Farm Cottage':[
			{
				src:'<<if $farm.build_finished.includes("nursery")>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				srcgroup:'<<farm_cottage_options>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Farm Bedroom':[
			{
				src:'<<if $stress gte $stressmax and !$possessed>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<if !($earSlime.event and $earSlime.noSleep)>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
			{
				src:'<<link [[Settings|',
				applybefore:'\n<<ExtraLinkZone>>\n'
			},
			{
				src:'<<link [[设置|',
				applybefore:'\n<<ExtraLinkZone>>\n'
			}
		],
		'Farm Alex Bedroom':[
			{
				src:'<<if $stress gte $stressmax and !$possessed>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<if playerIsPregnant() and ',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Farm Fields':[
			{
				src:'<<if $stress gte $stressmax>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<display_plot farm>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
			{
				src:'<<getouticon>>',
				applybefore:'\n<<ExtraLinkZone>>\n'
			}
		],
		'Meadow':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<relaxicon>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Livestock Cell':[
			{
				src:'<<if isPlayerNonparasitePregnancyEnding()>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<else>>\n\t<<link',
				to:'<<else>>\n\t<<BeforeLinkZone>>\n<<link',
			},
			{
				src:'<<link [[Settings',
				applybefore:'\n<<ExtraLinkZone>>\n',
			},
			{
				src:'<<link [[设置',
				applybefore:'\n<<ExtraLinkZone>>\n',
			}
		],
		'Livestock Field':[
			{
				src:'<<if isPlayerNonparasitePregnancyEnding()>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<farmicon "grass">>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Moor':[
			{
				src:'<<if $stress gte $stressmax>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'\t<<if $moor gte 100>>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Castle':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<if $harpy gte 6 ',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Arcade':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<if Time.hour is 21>>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			},
		],
		'Beach':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<if $exposed lte 0>>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Brothel Dressing Room':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<wardrobeicon>>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			},
			{
				src:'<<link [[Settings',
				applybefore:'\n<<ExtraLinkZone>>\n',
			},
			{
				src:'<<link [[设置',
				applybefore:'\n<<ExtraLinkZone>>\n',
			}
		],
		'Bus':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br><<BeforeLinkZone>>\n',
			}
		],
		'Bus Station':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<if $exposed gte 1>>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Ocean Breeze':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<if $openinghours is 1 and $exposed',
				applybefore:'\n<<BeforeLinkZone>>\n',
			},
			{
				src:'<<if $money gte 200>>',
				applybefore:'\n<<ModShopZone>>\n',
			}
		],
		'Elk Compound':[
			{
				src:'<<if $stress gte $stressmax>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<if $danger lte',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Dance Studio':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<if $openinghours is 1 and $exposed lt 1>>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Docks':[
			{
				src:'<<if $arousal gte $arousalmax>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<if $robindebtevent gte 1 and',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Flats':[
			{
				src:'<<if $stress gte $stressmax and !$possessed>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n',
			},
			{
				src:'        <<if Time.dayState is "night">>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Bedroom':[
			{
				src:"<<set _desk to Furniture.get('desk')>>",
				applybefore:'\n<div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<deskText "icon">>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			},
			{
				src:'<<link [[Settings',
				applybefore:'\n<<ExtraLinkZone>>\n',
			},
			{
				src:'<<link [[设置',
				applybefore:'\n<<ExtraLinkZone>>\n',
			}
		],
		'Bathroom':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<if $leftarm is "bound" and $rightarm is "bound">>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		"Orphanage":[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<if $police_hack is 2 and',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Orphanage Ward':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			{
				srcgroup:'<<orphanageWardOptions>>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Storm Drain Entrance':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n<<BeforeLinkZone>>\n',
			}
		],
		'Hospital front':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			
			{
				src:'<<getinicon>><<link',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Hospital Foyer':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			
			{
				src:'<<if $exposed gte 1>>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Pharmacy':[
			{
				src:'<<effects>>',
				applyafter:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'Contacts:',
				applybefore:'<<ModShopZone>>\n\t'
			},
			{
				src:'隐形眼镜:',
				applybefore:'<<ModShopZone>>\n\t'
			}
		],
		'Trash':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			
			{
				src:'<<eventstrash>>\n<<else>>',
				applyafter:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Museum':[
			{
				src:'<<if $arousal gte $arousalmax>>',
				applybefore:'<div id="addAfterMsg"></div>\n',
			},
			
			{
				src:'<<if $museumhorseintro is 0>>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Office Lobby':[
			{
				src:'<<if $stress gte $stressmax>>',
				applybefore:'<div id="addAfterMsg"></div>\n',
			},
			{
				src:'<</if>>\n\t<<if Time.isWeekEnd()>>',
				to:'<</if>>\n\n<<BeforeLinkZone>>\n\n\t<<if Time.isWeekEnd()>>',
			}
		],
		'Office Agency':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			
			{
				src:'<<assignmenticon>>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		"Men's Toilets":[
			{
				src:'<<if $stress gte $stressmax>>',
				applybefore:'<div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<mirroricon>><<link',
				applybefore:'\n<<BeforeLinkZone>>\n',
			},
			{
				src:'<<if _store_check isnot 1>>',
				applybefore:'\n<<ExtraLinkZone>>\n',
			}
		],
		"Women's Toilets":[
			{
				src:'<<if $stress gte $stressmax>>',
				applybefore:'<div id="addAfterMsg"></div>\n',
			},
			{
				src:'\n\t\t\t<<link [[',
				applybefore:'\n<<BeforeLinkZone>>\n',
			},
			{
				src:'<<if _store_check isnot 1>>',
				applybefore:'\n<<ExtraLinkZone>>\n',
			}
		],
		"Police Station":[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br><<BeforeLinkZone>>\n',
			}
		],
		'Pound':[
			{
				src:'<<if $stress gte $stressmax>>',
				applybefore:'<div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<link [[',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
			{
				src:'<<beastNEWinit 1 dog>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Prison Cell':[
			{
				src:'<<link [[Settings|Asylum Settings]]>><</link>>',
				applybefore:'<<ExtraLinkZone>>\n'
			},
			{
				src:'<<link [[设置|Asylum Settings]]>><</link>>',
				applybefore:'<<ExtraLinkZone>>\n'
			},
			{
				src:'<<if isPlayerNonparasitePregnancyEnding()>>',
				applybefore:'<div id="addAfterMsg"></div>\n<<BeforeLinkZone>>\n'
			}
		],
		'Prison Canteen':[
			{
				src:'<<if Time.hour is 20>>',
				applybefore:'<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<if $prison.schedule is ',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Prison Wren':[
			{
				src:'<<effects>>',
				applyafter:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<link [[',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
			{
				src:'<<if $prison.yard_key is 1 ',
				applybefore:'<<ModShopZone>>\n\n'
			}
		],
		'Pub':[
			{
				src:'<<if $averyPub is 1 ',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<askicon>><<link [[',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Canteen':[
			{
				src:'<<if $stress gte $stressmax>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<if def $milkshake and $milkshake gt 0>>',
				applybefore:'\n<<BeforeLinkZone>>\n'

			}
		],
		'School Boy Changing Room':[
			{
				src:'<<if $arousal gte $arousalmax>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<changingRoom>>',
				applybefore:'\n<<BeforeLinkZone>>\n'

			}
		],
		'School Girl Changing Room':[
			{
				src:'<<if $arousal gte $arousalmax>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<changingRoom>>',
				applybefore:'\n<<BeforeLinkZone>>\n'

			}
		],
		'Hallways':[
			{
				src:'<<if $arousal gte $arousalmax>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<schoolperiod>>',
				applyafter:'\n<<BeforeLinkZone>>\n'

			}
		],
		'School Library':[
			{
				src:'<<if $stress gte $stressmax>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<projectoptions>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		"School Boy's Toilets":[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br><<BeforeLinkZone>>\n',
			},
			{
				src:'<<if _store_check isnot 1>>',
				applybefore:'\n<<ExtraLinkZone>>\n'
			}
		],
		"School Girl's Toilets":[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br><<BeforeLinkZone>>\n',
			},
			{
				src:'<<if _store_check isnot 1>>',
				applybefore:'\n<<ExtraLinkZone>>\n'
			}
		],
		'Sea Beach':[
			{
				src:'<<if $stress gte $stressmax>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<if $exposed lte 0 or Time.dayState',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Sea Rocks':[
			{
				src:'<<if $stress gte $stressmax>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<swimicon "leave">>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Rocks':[
			{
				src:'<<if $stress gte $stressmax>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<if $smuggler_location is',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Sea Docks':[
			{
				src:'<<if $stress gte $stressmax>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<docksicon>><<link',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Sea Cliffs':[
			{
				src:'<<if $stress gte $stressmax>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<if $swimmingSuccess>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Sea':[
			{
				srcgroup:'<<if $stress gte $stressmax>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				srcgroup:'<<if $swimmingSuccess>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Cosmetics Store':[
			{
				src:'<<effects>>',
				applyafter:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<cosmeticsicon>>',
				applybefore:'\n<<BeforeLinkZone>>\n<<ModShopZone>>'
			}
		],
		'Hairdressers':[
			{
				src:'<<if $stress gte $stressmax>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<if Time.hour is 21>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
			{
				scr:'<<getouticon>>',
				applybefore:'\n<<ModShopZone>>\n'
			}
		],
		'Shopping Centre Top':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			{
				srcgroup:'<<if $clothingShop.ban ',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
		],
		'Shopping Centre':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<if $exposed lte 0>>',
				applybefore:'\n<<BeforeLinkZone>>\n'

			},
			{
				src:'<<if Time.dayState is "night">>',
				applybefore:'\n<<BeforeLinkZone>>\n'

			}
		],
		'Pet Shop':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},

			{
				src:'<<if Time.dayState is "night"',
				applybefore:'\n<<BeforeLinkZone>>\n'

			},
			{
				scr:'<<getouticon>>',
				applybefore:'\n<<ModShopZone>>\n'
			}
		],
		'Tattoo Parlour':[
			{
				src:'<<if $stress gte $stressmax>>',
				applybefore:'<div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<if Time.hour is 21>>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Tattoo Choice':[
			{
				src:'<span class="lewd">',
				applybefore:'\n<<ModShopZone>>\n'
			}
		],
		'Toy Shop':[
			{
				src:'<<if $stress gte 10000>>',
				applybefore:'<div id="addAfterMsg"></div>\n',
			},
			{
				scr:'<<if $pregnancyStats.humanToysUnlocked>>',
				applybefore:'\n<<ModShopZone>>\n'
			}
		],
		'Spa':[
			{
				src:'<<if $stress gte $stressmax>>',
				applybefore:'<div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<if $openinghours is 1 and $exposed lt 1>>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Strip Club':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			{
				srcgroup:'<<shopicon "clothing">>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			},
			{
				src:'<<if Time.dayState isnot "dawn" and ',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],

		'Strip Club Dressing Room':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<wardrobeicon>>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			},
		],

		'Strip Club Shower':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n<<BeforeLinkZone>>\n',
			},
			{
				src:'<<getouticon>>',
				applybefore:'\n<<ExtraLinkZone>>\n',
			},
		],

		'Temple':[
			{
				src:'<br><br>',
				to:'<br><br><div id="addAfterMsg"></div>\n',
			},
			{
				src:'\t<<if Time.weekDay is 1 and Time.hour',
				applybefore:'\n<<BeforeLinkZone>>\n',
			},
			{
				src:'<<wolficon>><<link',
				applybefore:'\n<<ExtraLinkZone>>\n',
			}
		],
		'Temple Garden':[
			{
				src:'<<if $stress gte $stressmax>>',
				applybefore:'<div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<if Time.dayState is "night">>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			},
			{
				src:'<<wolficon>><<link',
				applybefore:'\n<<ExtraLinkZone>>\n',
			}
		],
		'Temple Confess Self':[
			{
				src:'<br><br>\n\n\n',
				to:'<br><br>\n<div id="addAfterMsg"></div>\n\n\n',
			},
			{
				src:'<<link',
				applybefore:'<<BeforeLinkZone>>'
			}
		],
		'Temple Cloister':[
			{
				src:'<<if isPlayerNonparasitePregnancyEnding()',
				applybefore:'<div id="addAfterMsg"></div>\n\n',
			},
			{
				src:'<<if $temple_cloister_progress is ',
				applybefore:'<<BeforeLinkZone>>'
			}
		],
		'Temple Cloister Showers':[
			{
				src:'<br><br>\n',
				to:'<br><br>\n<div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<ind>><<link',
				applybefore:'<<ExtraLinkZone>>'
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
				src:'<<bodywriting>>',
				applyafter:'\n<<ModCharaDescription>>\n'
			}
		],
		'overlayReplace':[
			{
				src:'</div>\n\t<<closeButton>>\n<</widget>>\n\n<<widget \"titleSaves\">>',
				to:`\t\t<<button lanSwitch('Mods', '模组设置')>>\n\t\t<<toggleTab>>\n\t\t<<replace #customOverlayContent>><<iModsOptions>><</replace>>\n\t\t<</button>>\n\n</div>\n\t<<closeButton>>\n<</widget>>\n\n<<widget "titleSaves">>`
			}
		],
		'npcNamed':[
			{
				src:"<<generateNPCNameHairAndEyeColors",
				applybefore:"\n<<run NamedNPC.init()>>\n",
			}
		],
		'Widgets variablesStatic':[
			{
				src:"<</widget>>",
				to:"<<iModInit>>\n\n<</widget>>",
			}
		],
		'Social':[
			{
				src:'T.importantNPCs = T.importantNpcOrder',
				applybefore:'\n\t\t\tsetup.ModSocialSetting();\n\n\t\t\t'
			},
			{
				src:'<br>\n\t\t<span class="gold">Fame</span>',
				applybefore:'\n\t\t<<iModStatus>>\n\t\t'
			},
			{
				src:"<br>\n\t\t<span class=\"gold\">知名度</span>",
				applybefore:'\n\t\t<<iModStatus>>\n\t\t'
			},
			{
				src:`<div class="relation-box" @style="(_boxConfig.style || '')">`,
				applybefore:'\n\t\t<<iModFame>>\n\t\t'
			}
		],

		'Traits':[
			{
				src:'<div id="traitListsSearch">',
				applybefore:'\n<<run setup.addModTrait()>>\n\n'
			},
		],

		'Widgets Settings':[
			{
				src:'$NPCName[_npcId].nam',
				to:'$NPCName[_npcId].displayname'
			}
		],
		'Widgets Named Npcs':[
			{
				src:'<<relationshiptext>>',
				to:'<<if NamedNPC.has($NPCName[_i].nam) >= 0>><<ModaddNPCRelationText>><<else>><<relationshiptext>><</if>>'
			}
		],
		'Widgets':[
			{
				srcgroup:'\t_npcData.nam',
				to:'\t_npcData.displayname'
			},
			{
				srcgroup:'<<print _npcData.nam',
				to:'<<print _npcData.displayname'
			}
		],
		'Widgets Cabin':[
			{
				src:'<<link [[Settings|Asylum Settings]]>><</link>>',
				applybefore:'<<ExtraLinkZone>>\n'
			},
			{
				src:'<<link [[设置|Asylum Settings]]>><</link>>',
				applybefore:'<<ExtraLinkZone>>\n'
			}
		],
		'Widgets Underground':[
			{
				src:'<<widget "undergroundCellOptions">>',
				applyafter:'\n<<ExtraLinkZone>>\n'
			}
		],
		'Widgets Attitudes':[
			{
				src:'<<if _potentialLoveInterests.length lte 1>>',
				applybefore:'\n<<run setup.ModLoveInterest()>>\n',
			},
			{
				srcgroup:'<<optionsfrom _potentialLoveInterests>>',
				to:'<<optionsfrom _loveInterestSelections>>'
			},
			{
				srcgroup:'<<optionsfrom _loveInterestcn>>',
				to:'<<optionsfrom _loveInterestSelections>>'
			},
			{
				src:'<<run _potentialLoveInterests.delete($loveInterest.primary)>>',
				applyafter:'<<run let key = C.npc[$loveInterest.primary].displayname; delete _loveInterestSelections[key]>>'
			}
		]
	}
	
	function checkBJX(source){

		if(source.includes('<<support>>')){
			source = source.replace('\t\t/* 北极星模组 */\n\t\t<<support>>\n\t\t/* 北极星 */', '')
			source = `<<if $passage isnot 'Start'>><div style="position:fixed; top:1px; font-size:smaller; left:180px"><<support>></div><</if>>\n` + source
			console.log('北极星检测', source)
		}

		if(source.includes('"帕鲁提"')){
			//先把widget提取出来
			let _text = source.replace(/\n/g,'[n]')
			let [txt, widget] = _text.match(/<<widget "updateNewNamedNpcs">>(.+)<<\/widget>>\[n\]\[n\]<<widget "generateNPCNameHairAndEyeColors">>/)
			let [txt1, code] = widget.match(/\/\* 北极星模组 \*\/(.+)\/\* 北极星 \*\//)
			code = code.replace(/\[n\]/g, '\n')
			source = source.replace(code, '\t\t<<run\n\t\t\tconst bjxnpc = {\n\t\t\t\t"泰勒": {nam : "泰勒", title: "探险家", insecurity: "weak", teen: 1},\n\t\t\t\t"凯西": {nam : "凯西", title: "逃学者", insecurity: "weak", teen: 1},\n\t\t\t\t"塞伦": {nam : "塞伦", title: "见习信徒", insecurity: "skill", teen: 1},\n\t\t\t\t"帕鲁提": {nam : "帕鲁提", title: "巫师", insecurity: "skill", teen: 1, type: "cat", claws: "claws"}\n\t\t\t};\n\n\t\t\tObject.assign(_newNNPCs, bjxnpc)\n\t\t>>\n\t\t<<for _npc range Object.keys(_newNNPCs)>>\n\t\t\t<<if !$NPCNameList.includes(_newNNPCs[_npc].nam)>>\n\t\t\t\t<<newNamedNpc _newNNPCs[_npc]>>\n\t\t\t\t<<set _npcsAdded to true>>\n\t\t\t<</if>>\n\t\t<</for>>\n\t\t')
		}
		
		return source
	}

	//能批处理的批处理。街道和地点，以及战斗场景
	function patchScene(passage, title){
		let source = String(passage.content)
	
		if(locationPassage[title]){
			locationPassage[title].forEach((set)=>{
				if(set.src){
					if(set.to){
						source = source.replace(set.src, set.to)
					}
					else if(set.applyafter){
						source = source.replace(set.src, set.src + set.applyafter)
					}
					else if(set.applybefore){
						source = source.replace(set.src, set.applybefore + set.src)
					}
				}
				if(set.srcgroup){
					if(set.to){
						source = source.split(set.srcgroup).join(set.to)
					}
					else if(set.applyafter){
						source = source.split(set.srcgroup).join(set.srcgroup + set.applyafter)
					}
					else if(set.applybefore){
						source = source.split(set.srcgroup).join(set.applybefore + set.srcgroup)
					}
				}
			})
			
			if(title === 'StoryCaption'){
				source = checkBJX(source)
			}

			passage.content = source

			

			patchedPassage[title] = 1
	
			return passage
		}
	
		if(source.includes('<<if $options.mapTop is true>>')){
			source = source.replace('<<if $options.mapTop is true>>', '<<BeforeLinkZone>>\n<<if $options.mapTop is true>>')
		}
	
		if(source.includes('<<streeteffects>>')){
			source = source.replace('<<streeteffects>>', '<<streeteffects>>\n<div id=\"addAfterMsg\"></div>')
			patchedPassage[title] = 1
		}
	
	
		if(source.includes('<<drainlinks>>')){
			source = source.replace('<<drainlinks>>', '<<BeforeLinkZone>>\n<<drainlinks>>')
		}
	
		if(source.includes('<<island_tide_options>>')){
			source = source.replace('<<island_tide_options>>', '<<BeforeLinkZone>>\n<<island_tide_options>>')
		}
	
		if(source.includes('<<stall_actions>>')){
			source = source.replace('<<stall_actions>>', '<<BeforeLinkZone>>\n<<stall_actions>>')
		}
	
		if(source.includes('<<stateman>>')){
			source = source.replace('<<stateman>>', '<div id="addAfterMsg"></div>\n<<stateman>>')
			patchedPassage[title] = 1
		}

		passage.content = source
	
		return passage
	}
	
	//简单粗暴的批量脚本，在对应位置增加文本区域。
	function patchPassage(passage, title){
		let source = String(passage.content)
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
			if(txt.includes('<<if') === false && txt.count('<br><br>') >= 1 ){
				txt = txt.split('<br><br>')
				txt[txt.length-1] = txt[txt.length-1]  + "\n<div id='addAfterMsg'></div>"
				txt = txt.join('<br><br>')

				patch = true
	
			}
		}
	
		if(!patch){
			txt = txt.replace('<<effects>>', "<<effects>><div id='addAfterMsg'></div>")
		}
	
		if(patch){
			passage.content = txt
		}
	
		return passage
	}
	
	//简单粗暴的批量脚本，在对应的widget区最后加个钩子
	function patchWidget(passage, title){
		let source = passage.content

		if(!widgetPassage[title]) return;

		console.log(typeof source, title, passage)
	
		widgetPassage[title].forEach((set)=>{
			if(set.src){
				if(set.to){
					source = source.replace(set.src, set.to)
				}
				else if(set.applyafter){
					source = source.replace(set.src, set.src + set.applyafter)
				}
				else if(set.applybefore){
					source = source.replace(set.src, set.applybefore + set.src)
				}
			}
			if(set.srcgroup){
				if(set.to){
					source = source.split(set.srcgroup).join(set.to)
				}
				else if(set.applyafter){
					source = source.split(set.srcgroup).join(set.srcgroup + set.applyafter)
				}
				else if(set.applybefore){
					source = source.split(set.srcgroup).join(set.applybefore + set.srcgroup)
				}
			}
		})

		if(title === 'npcNamed'){
			source = checkBJX(source)
		}
	
		passage.content = source
	
		return passage
	}
	
	function patchPasssage2(passage, title){
	
		if(passage.tags.includes('widget')){
			patchWidget(passage, title)
		}
		else{
			patchScene(passage, title)
			patchPassage(passage, title)		
		}
	
	}
	
	async function simpleWidgetInit(passageData){

		await simpleFrameworks.createMicroWidgets();
		await simpleFrameworks.createModInitMacro();

		//modUtils.updatePassageData('Simple Widget Frameworks', '', ['widget'], 0)
		let data = {
			id:0,
			name:'Simple Widget Frameworks',
			position:'100,100',
			size:'100,100',
			tags:['widget']
		}

		let html = 
`\n\n<<widget "iModReplace">>
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
<</widget>>


<<widget "ModaddNPCRelationText">>
<<print C.npc[_npc].description>>
<<if SugarCube.Macro.has(_npc+'Opinion')>>
    <<print '<<'+_npc+'Opinion>>'>>
<<else>>
    <<if C.npc[_npc].love gte $npclovehigh>>
        <<if C.npc[_npc].dom gte $npcdomhigh>>
            <<=lanSwitch(
                "thinks you're <span class='green'>adorable.</span>",
                "觉得你<span class='green'>十分惹人疼爱。</span>"
            )>>
        <<elseif C.npc[_npc].dom lte $npcdomlow>>
            <<=lanSwitch(
                "thinks you're <span class='green'>inspiring.</span>",
                "认为你<span class='green'>令人心动。</span>"
            )>>
        <<else>>
            <<=lanSwitch(
                "thinks you're <span class='green'>delightful.</span>",
                "认为你<span class='green'>令人愉快。</span>"
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

		data.content = simpleFrameworks.widgethtml + html
		passageData.set('Simple Widget Frameworks', data)

		data = {
			id:0,
			name:'PassageReady',
			position:'100,100',
			size:'100,100',
			tags:[],
			content: '<<iModReady>>\n'
		}
		
		passageData.set('PassageReady', data)

		data = {
			id:0,
			name:'PassageDone',
			position:'100,100',
			size:'100,100',
			tags:[],
			content: '<<iModDone>>\n'
		}

		passageData.set('PassageDone', data)

		return passageData
	}
	
	
	async function afterPatchModToGame() {
	
		const modSC2DataManager = window.modSC2DataManager
		const addonTweeReplacer = window.addonTweeReplacer
	
		const oldSCdata = modSC2DataManager.getSC2DataInfoAfterPatch()
		const SCdata = oldSCdata.cloneSC2DataInfo()
		const passageData = SCdata.passageDataItems.map

		console.log(passageData)
		
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
		patchWidget,
		afterPatchModToGame
	}

	await afterPatchModToGame()
    // 这里的返回值会被JsPreloader接收，如果返回的是一个Promise，则会等待这个Promise执行完毕后再继续执行下一个脚本，或继续初始化引擎
    return Promise.resolve("Simple Patch Paassage ok");
})();
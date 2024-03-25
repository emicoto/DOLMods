
// 想添加到哪个位置，第一个就填哪个模块的ID名称。
// 后面就是你要插入的widget名。可以同时添加多个。
// 用obj表格模式写的话，能指定在某个特定passage里显示。passage也能同时指定多个。

// just put the zoneID(see the widget copy.twee at temp folder) to the first,
// then put your widget name or widget setting to next argument.
// also you can add a lot at once.

simpleFrameworks.addto('iModHeader', 'aSimpleTest');
simpleFrameworks.addto('ModMenuSmall', 'testButton');
simpleFrameworks.addto('iModOptions', 'myOptionsA', 'myOptionsB', 'myOptionsC');
simpleFrameworks.addto('ModCaptionDescription', 'TestCaption');
simpleFrameworks.addto('ModCaptionAfterDescription', 'TestCaptionAfter');
simpleFrameworks.addto('iModReady', 'newMoney');
simpleFrameworks.addto('CustomImgLayer', 'testLocation');
/*
simpleFrameworks.addto('iModFooter', {
    passage:'Start', //set what passage your widget will show up
    widget: 'aSimpleTest',
})

simpleFrameworks.addto('iModFooter', {
    passage:['Start', 'Home'], //this can be array, then your widget only show up at certain passage
    widget: 'aSimpleTest',
})

//also can add a lot at once
simpleFrameworks.addto('iModFooter', {passage:'Start', widget: 'aSimpleTest'}, {passage:'Start', widget: 'aSimpleTest'},{passage:'Start', widget: 'aSimpleTest'},{passage:'Start', widget: 'aSimpleTest'},{passage:'Start', widget: 'aSimpleTest'},) */

/**
 
'Furniture Shop Papers':[
	{
		src:'<<set _normalisedName to Util.escape(_chosenWallpaperCustom).replace(/\[/g, "&#91;").replace(/\]/g, "&#93;")>>',
		to:'<<set _normalisedName to _chosenWallpaperCustom>>'
	}
],
  
 */

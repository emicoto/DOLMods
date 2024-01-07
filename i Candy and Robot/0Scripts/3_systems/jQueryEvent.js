window.bak = {}

setup.gamereloadcheck = true

$(document).on(':passageinit', ( data )=>{
//------------------------------------------------------------
//
// 数据初始化
//
//------------------------------------------------------------
	if(!V.addMsg){
		V.addMsg = ''
	}
	if(!V.afterMsg){
		V.afterMsg = ''
	}
	T.addMsg = ''; //效果区的显示信息
	T.afterMsg = '';//addAfterMsg区的显示信息

	if(!V.iCandyRobot) return

	if(!R.combat || V.combat == 1 ){
		R.combat = {
			angel:0, total:0
		}
	}
	else if(V.combat == 0){
		R.combat = {}
	}
	if( passage() == 'Start' ) return
//------------------------------------------------------------
//
// 事件系统的运作
//
//------------------------------------------------------------
	const psg = data.passage

	console.log('check passage in init:', passage(), psg.title)
	V.tvar.lastPassage = passage()
    iEvent.initBaseScene(psg);

	//刚刷新时跳过事件检测
	if(setup.gamereloadcheck){
		setup.gamereloadcheck = false
		return
	}	
	
    iEvent.eventReady(psg);

	if(V.tvar.jump){
		console.time('bakup')
		for(let i in V){
			window.bak[i] = clone(V[i])
		}
		console.timeEnd('bakup')
		iEvent.startScene()
	}

})


$(document).on(':passagedisplay', ()=>{
	setTimeout(()=>{
		if(T.addMsg.length > 2){
			new Wikifier(null, `<<append #addMsg transition>>${T.addMsg}<</append>>`)
		}
		if(T.afterMsg.length > 2){
			new Wikifier(null, `<<append #addAfterMsg transition>>${T.afterMsg}<br><</append>>`)
		}

		if(V.addMsg.length > 2){
			new Wikifier(null, `<<append #addMsg>>${V.addMsg}<</append>>`)
			V.addMsg = ''
		}

		if(V.afterMsg.length > 2){
			new Wikifier(null, `<<append #addAfterMsg>>${V.afterMsg}<br><</append>>`)
			V.afterMsg = ''
		}
	}, 30)
})
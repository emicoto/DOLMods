
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

	if(V.tvar.lastPassage == 'Start'){
		V.tvar.lastPassage = 'Domus Street'
	}

	//更新上一次的出口点
	if(V.tvar.lastPassage !== V.tvar.lastExitPoint && V.lastPassage.has('Actions') == false){
		V.tvar.lastExitPoint = V.tvar.lastPassage
	}

	//初始化场景设置
    iEvent.initBaseScene(psg);

	//刚刷新时跳过事件检测
	if(setup.gamereloadcheck){
		setup.gamereloadcheck = false
		return
	}

	//如果刚从动作事件里退出
	if(V.tvar.unsetAction){
		V.tvar.unsetAction = false

		//明明点选了退出，但莫名其妙再次回到动作事件时，强制跳转到上一次的出口点
		if(psg.title.has('Actions') && V.tvar.exitPassage.has('Actions') == false){
			setTimeout(()=>{
				Engine.play(V.tvar.exitPassage);
				V.tvar.exitPassage = ''
			}, 100)
		}
		//如果exitPassage被污染，强制跳转到上一次的出口点
		else if(psg.title.has('Actions') && isValid(V.tvar.lastExitPoint) ){
			setTimeout(()=>{
				Engine.play(V.tvar.lastExitPoint);
				V.tvar.exitPassage = ''
			}, 100)
		}
		//如果没有可靠的节点，则返回Domus Street
		else if(psg.title.has('Actions') ){
			setTimeout(()=>{
				Engine.play('Domus Street');
				V.tvar.exitPassage = ''
			}, 100)
		}
		//如果从物品事件出来，在这里就不再执行事件检测了
		return
	}
	
    iEvent.eventReady(psg);

	if(V.tvar.jump){
		console.time('bakup')
		window.bak = clone(V)
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
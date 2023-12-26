
$(document).one(':storyready',()=>{
	let check2 = setInterval(()=>{
		if( V.featsBoosts ){
			//modifyFeatsBoosts()
			//Engine.play('Start')
			clearInterval(check2)
		}
	}, 100)
})


$(document).on(':passageinit', ()=>{
	if(!V.addMsg){
		V.addMsg = ''
	}
	if(!V.afterMsg){
		V.afterMsg = ''
	}
	T.addMsg = ''; //效果区的显示信息
	T.afterMsg = '';//addAfterMsg区的显示信息

	if(V.iCandyRobot){
		if(!R.combat){
			R.combat = {
				angel:0, total:0,
			}
		}
		else if(V.combat == 0){
			R.combat = null
		}
	}
	console.log('check passage in init:', passage())
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
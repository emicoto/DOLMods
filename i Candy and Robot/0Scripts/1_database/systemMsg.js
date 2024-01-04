
const transferMsg = {
	ground(item){
		return lanSwitch(
			`There's no slot for the ${item.name} x ${item.count} on any containers on your body, so you have to leave it to the ground.`,
			`你身上所有地方都没有空位放置了，你只好把${item.name} x ${item.count}扔地上。`
		)+'<br>';
	},
	body(item){
		if(iManager.getMaxSlots('body') == 2){
			return lanSwitch(
				`You take ${item.name} into your hands.`,
				`你把${item.name}拿好了。`
			)+'<br>'
		}
		return lanSwitch(
			`You put ${item.name} into your clothes pocket.`,
			`你把${item.name}放进了衣服口袋里。`
		)+'<br>';
	},
	held(item){
		const held = Items.data[iManager.getEquip('held')];
		return lanSwitch(
			`You put ${item.name} into ${held.name[0].toLocaleLowerCase()}.`,
			`你把${item.name}放进了${held.name[1]}。`
		)+'<br>';
	},
	bag(item){
		return lanSwitch(
			`Your pockets are full, so you put ${item.name} to your bag.`,
			`你的口袋装满了，所以你将${item.name}放进了背包。`
		)+'<br>'
	},
	cart(item){
		return lanSwitch(
			`Your bag are full, so you put ${item.name} to your cart.`,
			`你的背包满了，所以你将${item.name}放进了折叠推车里。`
		)+'<br>'
	},
	hole(item){
		return lanSwitch(
			`Your hands and available container all full. With no other choice, you put ${item.name} into your asshole.`,
			`你双手以及可用的容器都已经装满了，无可奈何下，你把${item.name}塞进你的屁眼里。`
		)+'<br>'
	},
	home(item){
		let it = item.count > 1 ? 'them' : 'it'
		return lanSwitch(
			`There's no slot for the ${item.name} for any containers on your body, but it doesn't bother you.You calmly take ${it} to your storage.`,
			`你身上所有地方都没有空位放置了，不过这不影响你。你从容地把${item.name}收入了储物柜。`
		)+'<br>';
	},
	farm(item){
		let it = item.count > 1 ? 'them' : 'it'
		return lanSwitch(
			`There's no slot for the ${item.name} for any containers on your body, but it doesn't bother you.You calmly take ${it} to farmbarns.`,
			`你身上所有地方都没有空位放置了，不过这不影响你。你从容地把${item.name}收入了谷仓。`
		)+'<br>';
	},
	lockers(item){
		let it = item.count > 1 ? 'them' : 'it'
		return lanSwitch(
			`There's no slot for the ${item.name} for any containers on your body, so you stored ${it} to your locker.`,
			`你身上所有地方都没有空位放置了，你只好把${item.name}收进自己的储物柜里。`
		)+'<br>';
	},
	bushes(item){
		let it = item.count > 1 ? 'them' : 'it'
		return lanSwitch(
			`There's no slot for the ${item.name}x${item.count} for any containers on your body, so you hide ${it} to the bushes.`,
			`你身上所有地方都没有空位放置了，你只好把${item.name}x${item.count}藏到一处树丛里。`
		)+'<br>';
	},
	trashbin(item){
		let it = item.count > 1 ? 'them' : 'it'
		return lanSwitch(
			`There's no slot for the ${item.name}x${item.count} for any containers on your body, so you hide ${it} to the trashbin.`,
			`你身上所有地方都没有空位放置了，你只好把${item.name}x${item.count}藏到垃圾桶里。`
		)+'<br>';
	},
	hideout(item){
		let it = item.count > 1 ? 'them' : 'it'
		return lanSwitch(
			`There's no slot for the ${item.name}x${item.count} for any containers on your body, so you take ${it} to your hideout.`,
			`你身上所有地方都没有空位放置了，你只好把${item.name}x${item.count}放回你的藏身处。`
		)+'<br>';
	}
}

const sortOutMsg = function(item){
	let html = ''
	if(item.pocket == 'body' && this.getEvent('body') == 1){
		html += lanSwitch(
			'The items in your clothes pockets fall to the ground as your clothes are torn apart.', 
			'装在衣服口袋里的物品，伴随着衣服的破碎掉落到地上了。'
		)
		this.setEvent('body', 0)
	}

	if(item.pocket == 'body' && this.getEvent('body') == 2){
		html += lanSwitch(
			'You change your clothes, and the extra items are sorted out.', 
			'你更换了衣服，多余的物品被你整理出来。'
		)
		this.setEvent('body', 0)
	}

	if(this.getEvent('bag') == 1 && item.pocket == 'bag'){
		html += lanSwitch(
			'You change your bag, and the extra items are sorted out.', 
			'你更换了个更小的背包，多余的物品被你整理出来。'
		)
		this.setEvent('bag', 0)
	}

	if(this.getEvent('held') == 1 && item.pocket == 'held'){
		html += lanSwitch(
			'You change your handheld bag, and the extra items are sorted out.', 
			'你更换了个更小的手提袋后，多余的物品被你整理出来。'
		) + '<br>'
		this.setEvent('held', 0)
	}

	if(this.getEvent('cart') == 1 && item.pocket == 'cart'){
		html += lanSwitch(
			'You change your cart, and the extra items are sorted out.', 
			'你更换了个更小的推车，多余的物品被你整理出来。'
		)
		this.setEvent('cart', 0)
	}

	if(this.getEvent('hole') == 1 && item.pocket == 'hole'){
		html += lanSwitch(
			'Your promiscuity is not enough to keep the items in your asshole. The items are expelled from your body.', 
			'你的淫荡度不足以将物品继续存放在肠道里。因为受到刺激，存放在肠内的物品被排放了出来。'
		)
		this.setEvent('hole', 0)
	}
	return html + '<br>'
}

const stateEffects = {
	hungry: [
		`<span class='orange'>You are starving.</span><br>
		 You might black out if you don't eat something soon.`,
		`<span class='orange'>你快饿晕了。</span><br>
		 如果你不尽快吃点东西，你可能会晕倒。`
	]
}

Object.defineProperties(window,{
	transferMsg: {value: transferMsg},
	sortOutMsg: {value: sortOutMsg},
	stateEffects: {value: stateEffects}
})
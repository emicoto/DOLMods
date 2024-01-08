const iUtil = {
	resetTvar : function(...args){
		args.forEach((arg)=>{
			V.tvar[arg] = null
		})
	},
	countHomeStorage : function(){
		let count = 0
		for(let i in V.iStorage.home){
			count += V.iStorage.home[i]
		}
		return count
	},

	countMechaItems : function(){
		let count = 0
		for(let i in R.mechStats.tools){
			count += R.mechStats[i]
		}
		return count
	},

	getPalam : function(key, value){
		let list = ['trauma', 'pain', 'tiredness', 'drunk', 'hallucinogen','control','corruption','stress', 'drugged', 'awareness']
		if(!V.statFreeze && list.includes(key))
			V[key] += value
	},

	getPhysique : function(value){
		if(V.statFreeze){
			V.physique = Math.clamp(V.physique + value, 0, V.physiquesize)
		}
	},

	updateObj : function(source, target, prop){
		if(!prop){
			if(typeof target !== typeof source){
				return source
			}

			if(String(source) == '[object Object]'){
				for(let key in source){
					iUtil.updateObj(source, target, key)
				}
				for(let key in target){
					iUtil.updateObj(source, target, key)
				}

				return target
			}
			else{
				return target
			}
		}

		if(prop){
			//更新变量，如果type完全不一样就直接更新了。 弃用变量的删除或type一致但版号更新之类的用精准手术法。
			if(typeof target[prop] !== typeof source[prop] && source[prop] !== undefined){
				target[prop] = source[prop]
			}
			if(String(source[prop]) == '[object Object]'){
				for(let key in source[prop]){
					iUtil.updateObj(source[prop], target[prop], key)
				}
				for(let key in target[prop]){
					iUtil.updateObj(source[prop], target[prop], key)
				}
			}
		}

	},

	useItemPassTime : function(itemdata){
		const { type, tags } = itemdata
		const time = {
			consumable : 5,
			foods : 5,
			cooking : 10,
			drugs: 3,
			medicine : 2,
		}
		return time[type] || 1
	},

	printEquipment : function (){
		let html = ``
		const equip = ['held', 'bag', 'wallet', 'cart']
		equip.forEach((slot)=>{
			let item = V.iPockets[slot+'type']
				html += `<div id='${slot}' class='equipslot'>`
	
				if(item !== 'none'){
					const data = Items.get(item.id)
					let img = this.itemImageResolve(item, data)
					let onclick = ` onClick="V.addMsg += Items.get('${item.id}').onUnEquip(); SugarCube.Engine.play(V.passage)"`
	
					if(!iM.checkItemOnGet(item.id, 1)){
						onclick = ``
					}

					html += `<mouse class="tooltip-tiny"${onclick}>\n`
					html += `	<img class='icon' src="${img}">\n`
					html += `	<span>${lanSwitch(data.info)}\n`
					html += `	<span class="yellow">${lanSwitch('unequip', '取消装备')}</span>`
					html += '	</span>'
					html += '</mouse>'
				}
				else{
					html += `<img class='icon' src="img/items/${slot}_none.png">`
				}
	
				html += `</div>`
		})
	
		return html
	},

	itemImageResolve : function(item, data){
		if(!item) return 'img/items/item_none.png'
		let size = iM.getStackSize(item.id)

		let img = data.img
		if(item.diff){
			img = `img/items/${data.type}/${data.id}_${item.diff}.png`
		}
		if(data.stacksprites){
			let select = new SelectCase()

			for(let i = 1; i <= data.stacksprites.length; i++){
				let min = data.stacksprites[i-1]
				let max = i == data.stacksprites.length ? 1000 :  data.stacksprites[i] - 1
				let result = `img/items/${data.type}/${data.id}_${min}.png`
				if(item.diff){
					result = `img/items/${data.type}/${data.id}_${item.diff}_${min}.png`
				}
				select.case([min, max], result)
			}
			select.else(data.img)
			img = select.has(Math.floor((item.count/size+0.5)*100))
		}
		return img
	},

	itemIcons : function(itemId, diff){
		let data = Items.get(itemId)
		let item = { id : itemId, diff : diff, count: data.num }

		let img = this.itemImageResolve(item, data)
		return `<img class='icon' src='${img}'>`
	},

	printPocket : function(slot){
		let html = ''
		let pocket = V.iPockets[slot]
		let maxslot = iM.getMaxSlots(slot)
		for(let i = 0; i < maxslot; i++){
			const item = pocket[i]
			let data = item ? Items.get(item.id) : null
			if(data && item.diff && data.diff[item.diff].aliasItem){
				data = Items.get(data.diff[item.diff].aliasItem)
			}

			let itemname = data ? lanSwitch(data.name) : ''
			let itemcount = data ? itemUnit(data.tags, item.count) : ''

			let method = data ? lanSwitch( useMethods(data.type, data.tags) ) : ''

			let _html = `<div id='${slot}-${i}' class='pocketslot'>`
			let img = iUtil.itemImageResolve(item, data)

			_html += `<div class='itemname'>${itemname}</div>`
			_html += `<div class='itemcount'>${itemcount}</div>`
			_html += `<div id='${item ? item.uid : 'noitem'}' class='itemicon'>`
				if(item){
					_html += `<mouse class="tooltip-tiny">`
					_html += `	<img class='icon' src="${img}">`
					_html += data ? `	<span>${lanSwitch(data.info)}</span>` : ''
					_html += `</mouse>`
				}
				else{
					_html += `<img class='icon' src="img/items/item_none.png">`
				}
			_html += `</div>`
			if(data && V.combat == 0 && !V.event){
				_html += `<div id='action' class='pocketaction'>
				<span class='itemaction'>`

				if(data.tags.includes('equip')){
					_html += `<<link "${getLan('equip')}" $passage>>
						<<set $addMsg += "<<imgIcon '${img}'>>">>
						<<set $addMsg += Items.get('${data.id}').onEquip('${slot}', '${i}');>>
					<</link>>`
				}
				else if(!data.require && (data.effects.length > 0 || typeof data.onUse == 'function')){
					 _html += `<<link "${method}" "Actions UseItems">>
					 	<<set $tvar.useItem to ["${slot}", ${i}]>>
						<<set $tvar.itemdata to Items.get("${data.id}")>>
						<<set $tvar.img to "${img}">>
						<<if $passage.has("Actions UseItems", "Actions DropItems", "Actions TransferItem") is false>>
							<<set $tvar.exitPassage to $passage>>
						<</if>>
					 <</link>>`
				}
				
				_html += `</span>
				<span class='itemaction'>
					<<link "${getLan('move')}">>
						<<set $tvar.transferItem to ["${slot}", ${i}]>>
						<<if $passage.has("Actions UseItems", "Actions DropItems", "Actions TransferItem") is false>>
							<<set $tvar.exitPassage to $passage>>
						<</if>>
					<</link>>
				</span>
				<span class='itemaction'>
					<<link "${getLan('drop')}" $passage>>
						<<run iM.dropItem("${slot}", ${i})>>
					<</link>>
				</span>
				</div>`
			}
			_html += `</div>`

			if(iCandy.config.debug)
				console.log(_html);

			html += _html
		}
		return html
	}
}

function printTemplet(string, ...args){
    for(let i = 0; i < args.length; i++){
        string = string.replaceAll(`{${i}}`, args[i])
    }
    return string
}

function noEventRunning(){
	return V.eventskip == 0 && V.combat == 0
}
window.noEventRunning = noEventRunning

function wetAnusLub(arg){
	V.player.bodyliquid.anus.goo += arg
}
DefineMacroS('anusgoo', wetAnusLub)

function itemIcons(itemId, diff){
	if(diff == 'undefined') diff = undefined	
	if(V.options.images == 1){
		return iUtil.itemIcons(itemId, diff)
	}
	return ''
}
DefineMacroS('itemIcons', itemIcons)

function printMedicineLink(itemId, diff){
	if(!itemId) return ;

	let drug = Items.get(itemId)
	let linkname = ''
	let name = lanSwitch(drug.name)
	if(diff){
		name += '[' + lanSwitch(drug.diff[diff].displayname)+']'
	}	

	if(drug.tags.includes('pill')){
		linkname = `${name}(${drug.num}${lanSwitch('pills per bottle', '粒/瓶')})`
	}
	else if(drug.tags.includes('liquid')){
		linkname = `${name}(${drug.num}ml${lanSwitch(' bottle','瓶装')})`
	}
	else if(drug.tags.includes('cream')){
		linkname = `${name}(${drug.num}ml${lanSwitch('','支装')})`
	}
	else if(drug.tags.includes('inject')){
		linkname = `${name}(${drug.num}${lanSwitch('shots per pack','管/盒')})`
	}
	else{
		linkname = name
	}



	return `<<itemIcons '${itemId}' '${diff}'>><<link '${linkname}' 'Shop Pharmacy Sale'>><<set $pharmacyItem to Items.get("${itemId}")>><</link>><br>`
}

DefineMacroS('iMedicineLink', printMedicineLink)


Object.defineProperties(window, {
	iUtil : { value : iUtil },
	printTemplet : { value : printTemplet },
	
})

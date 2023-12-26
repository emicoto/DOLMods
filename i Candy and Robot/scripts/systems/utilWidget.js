const iUtil = {
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

	printEquipment : function (){
		let html = ``
		const equip = ['held', 'bag', 'wallet', 'cart']
		equip.forEach((slot)=>{
			let item = V.iPockets[slot+'type']
				html += `<div id='${slot}' class='equipslot'>`
	
				if(item !== 'none'){
					const data = Items.get(item.id)
					let img = data.img
					let onclick = ` onClick="V.addMsg += Items.get('${item.id}').onUnEquip(); SugarCube.Engine.play(V.passage)"`
	
					if(!iM.checkItemOnGet(item.id, 1)){
						onclick = ``
					}
	
					if(item.diff){
						img = data.diff[item.diff].img
					}
					html += `<mouse class="tooltip-tiny"${onclick}>\n`
					html += `	<img class='icon' src="img/${img}">\n`
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

	printItemCount : function(itemId, count){
		const item = Items.get(itemId)
		const unit = {
			'pill' : ['pills', 'pill', '片'],
			'inject' : ['shots', 'shot', '管'],
			'canned' : ['cans', 'can', '罐'],
			'candy' : ['p', 'p', '块'],
			'snack' : ['packs', 'pack', '包'],
			'smoke' : ['', '', '支'],
			'liquid' : ['ml', 'ml', 'ml'],
			'cream' : ['g', 'g', 'g'],
			'powder' : ['oz', 'oz', 'oz'],
			'food' : ['', '', '份'],
			'drink' : ['bottles', 'bottle', '瓶'],
			'equip' : ['', '', '件'],
		}
		let text = 'x ' + count

		for(let i in unit){
			if(item.tags.includes(i)){
				text += lanSwitch(count > 1 ? unit[i][1] : unit[i][0], unit[i][2])
				break
			}
		}

		return text
	},

	printPocket : function(slot){
		let html = ''
		let pocket = V.iPockets[slot]
		let maxslot = iM.getMaxSlots(slot)
		for(let i = 0; i < maxslot; i++){
			const item = pocket[i]
			const data = item ? Items.get(item.id) : null

			let itemname = data ? lanSwitch(data.name) : ''
			let itemcount = item ? iUtil.printItemCount(item.id, item.count) : ''

			let method = item ? lanSwitch( useMethods(data.tags) ) : ''

			let _html = `<div id='${slot}-${i}' class='pocketslot'>`
			let img = data ? data.img : 'img/items/item_none.png'

			if(item && item.diff){
				img = data.diff[item.diff].img
				itemname += '[' + lanSwitch(data.diff[item.diff].displayname)+']'
			}

			_html += `<div class='itemname'>${itemname}</div>`
			_html += `<div class='itemcount'>${itemcount}</div>`
			_html += `<div id='${item ? item.uid : 'noitem'}' class='itemicon'>`
				if(item){
					_html += `<mouse class="tooltip-tiny">`
					_html += `	<img class='icon' src="img/${img}">`
					_html += data ? `	<span>${lanSwitch(data.info)}</span>` : ''
					_html += `</mouse>`
				}
				else{
					_html += `<img class='icon' src="img/items/item_none.png">`
				}
			_html += `</div>`
			if(item && V.combat == 0 && !V.event && !data.require){
				_html += `<div id='action' class='pocketaction'>
				<span class='itemaction'>`

				if(data.tags.includes('equip')){
					_html += `<<link "${lanSwitch('equip', '装备')}" $passage>>
						<<set $addMsg += "<<itemIcon '${img}'>> ">>
						<<set $addMsg += Items.get('${item.id}').onEquip('${slot}', '${i}');>>
					<</link>>`
				}
				else{
					 _html += `<<link "${method}" "iCandyMod UseItems">>
					 	<<set $tvar.useItem to ["${slot}", ${i}]>>
						<<set $tvar.itemdata to Items.get("${item.id}")>>
						<<set $tvar.img to "${img}">>
						<<set $tvar.exitPassage to $passage>>
					 <</link>>`
					/*
					_html += `<<link "${method}" $passage>>
					<<set $addMsg to useItems("${slot}",${i})>>
					<</link>>`*/
				}
				
				_html += `</span>
				<span class='itemaction'>
					<<link "${lanSwitch('move', '转移')}">>
						<<set $tvar.transferItem to ["${slot}", ${i}]>>
						<<set $tvar.exitPassage to $passage>>
					<</link>>
				</span>
				</div>`
			}
			_html += `</div>`

			console.log(_html)

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


function wetAnusLub(arg){
	V.player.bodyliquid.anus.goo += arg
}
DefineMacroS('anusgoo', wetAnusLub)


function printMedicineLink(itemId, diff){
	if(!itemId) return ;

	let drug = Items.get(itemId)
	let linkname = ''
	let name = lanSwitch(drug.name)

	let img = drug.img
	if(diff){
		img = drug.diff[diff].img
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



	return `<<itemIcon '${img}'>><<link '${linkname}' 'iCandyMod Pharmacy Sale'>><<set $pharmacyItem to Items.get("${itemId}")>><</link>><br>`
}

DefineMacroS('iMedicineLink', printMedicineLink)


Object.defineProperties(window, {
	iUtil : { value : iUtil },
	printTemplet : { value : printTemplet },
	
})
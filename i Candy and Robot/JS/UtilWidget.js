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
		for(let i in V.mechaItems){
			count += V.mechaItems[i]
		}
		return count
	},

	getPalam : function(key, value){
		let list = ['trauma', 'pain', 'tiredness', 'drunk', 'hallucinogen','control','corruption','stress', 'drugged']
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

	}
}


function wetAnusLub(arg){
	V.player.bodyliquid.anus.goo += arg
}
DefineMacroS('anusgoo', wetAnusLub)

function printMedicineLink(itemId){
	if(!itemId) return ;

	let drug = Items.get(itemId)
	let linkname = ''
	let name = lanSwitch(drug.name)

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

	return `<<itemIcon '${drug.img}'>><<link '${linkname}' 'Pharmacy Sale EX'>><<set $pharmacyItem to Items.data["${key}"]>><</link>><br>`
}

DefineMacroS('iMedicineLink', printMedicineLink)
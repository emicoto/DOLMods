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
		let list = ['trauma', 'pain', 'tiredness', 'drunk', 'hallucinations','control','corruption','stress', 'drugged']
		if(!V.statFreeze && list.includes(key))
			V[key] += value
	},

	getPhysique : function(value){
		if(V.statFreeze){
			V.physique = Math.clamp(V.physique + value, 0, V.physiquesize)
		}
	},

	getExtraSens: function(type, num, timer){
		let sens = V.iCandyStats.extraSens
	
		//获取原始值
		if(sens[type].add == 0 && sens[type].timer == 0){
			sens[type].base = V[type+'sensitivity']
			sens[type].add = num
			sens[type].timer = timer
		}
		else{
			sens[type].add += num
			if(sens[type].timer < timer/2 ){
				sens[type].timer = timer
			}
		}
	},

	updateSens: function(pass){
		let list = ['genital', 'bottom', 'breast', 'mouth']
		let sens = V.iCandyStats.extraSens
		let init
	
		list.forEach((type)=>{
			if(sens[type].add > 0 && sens[type].timer > 0){
				V[type+'sensitivity'] = sens[type].base + sens[type].add
				sens[type].timer = Math.max( sens[type].timer - pass, 0)
			}
			else if(sens[type].timer <= 0 && sens.init == 1){
				V[type+'sensitivity'] = sens[type].base
			}
			else if(!sens.init){
				sens[type].base = V[type+'sensitivity']
				init = true
			}
		})
	
		if (init){
			sens.init = 1
		}
	},

	updateObj : function(source, target, prop){
		if(typeof source !== typeof target){
			return source
		}

		if(prop && typeof source[prop] !== typeof target[prop]){
			if(source[prop] !== undefined){
				target[prop] = source[prop]
			}
			else{
				delete target[prop]
			}
			return target
		}

		if(prop && String(source[prop]) == '[object Object]' ){
			return iUtil.updateObj(source[prop], target[prop])
		}

		if(!prop && String(source) == '[object Object]' ){
			for(let key in source){
				iUtil.updateObj(source, target, key)
			}
		}

		return target
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

	if(drug.tags.includes('pill')){
		linkname = `${drug.name}(${drug.num}${lanSwitch('pills per bottle', '粒/瓶')})`
	}
	else if(drug.tags.includes('liquid')){
		linkname = `${drug.name}(${drug.num}ml${lanSwitch(' bottle','装')})`
	}
	else if(drug.tags.includes('inject')){
		linkname = `${drug.name}(${drug.num}${lanSwitch('shots per pack','管/盒')})`
	}
	else{
		linkname = drug.name
	}

	return `<<link '${linkname}' 'Pharmacy Sale EX'>><<set $pharmacyItem to Items.data["${key}"]>><</link>><br>`
}

DefineMacroS('iMedicineLink', printMedicineLink)
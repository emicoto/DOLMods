
const patchedPassage = {}
const patchedByJson = {
	'Adult Shop':1,
	'Brothel':1
}

function patchPassage(passage){
	let source = passage.element.innerText
	let title = passage.title

	if(patchedByJson[title]){
	}
	else if(source.includes('<<set $location') && !patchedPassage[title]){
		let src = source.split('<br><br>')
		let patch = false
		if(src.length <= 0 ) return;

		for(let i=0; i < src.length; i++){
			if( (src[i].indexOf('<<if') !== -1 && src[i].indexOf('<<if') <= 10) || (src[i].indexOf('<<link') !== -1 && src[i].indexOf('<<link') <= 24 ) ){
				src[i-1] += '\n\n<div id="addAfterMsg"></div>'
				patch = true
				break
			}
		}

		if(!patch){
			src[1] = '\n\n<div id="addAfterMsg"></div>' + src[1]
		}

		passage.element.innerText = src.join('<br><br>')
		
		patchedPassage[title] = true
	}
}

$(document).on(':passageinit', (data)=>{
	let { passage } = data
	patchPassage(passage)
		
})
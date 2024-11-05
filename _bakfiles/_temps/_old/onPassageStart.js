// Execute pre-render events and tasks.
//开始渲染passage，在passageready之后，wikify passageheader之前
//依然还不能进行文本操作，已经错过修改innerHtml的最佳时机了

$(document).on(':passagestart', (data)=>{
	let { passage, content } = data
		
})
function newMoney() {
	if (!V.money1) {
		console.log('define money1');
		V.money1 = V.money;
	}

	Object.defineProperty(V, 'money',{
		get : () => {
			console.log('get money');
			return V.money1;
		},
		set : value => {
			console.log('set money', value);
			V.money1 = value;
		}
	});
}

DefineMacroS('newMoney', newMoney);

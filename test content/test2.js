function testReady(){
    if(passage() == 'Start') return;
    console.time('testReady')
    const arr = new Array(100000)
    for(let i=0; i<arr.length; i++){
        arr[i] = random(100000)
    }
    console.timeEnd('testReady')
    T.test = arr[arr.length-1]
}

DefineMacroS('testReady', testReady)

function testHeader(){
    console.log('testHeader', passage(), T.test)
    return T.test
}
DefineMacroS('testHeader', testHeader)

function destination(){
    if(V.bus == 'sea') return '<<seamovequick>>'
    if(Macro.has(V.bus+'quick'))
        return `<<${V.bus}quick>>`
    else
        return '<<domusquick>>'
}

function testInit(){
    console.log('destination check:', Macro.has('destination'))

    if(Macro.has('destination')){
        Macro.delete('destination')
        DefineMacroS('destination', destination)
    }
}

DefineMacroS('testInit', testInit)
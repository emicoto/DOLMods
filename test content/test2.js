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
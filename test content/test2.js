window.bak = {}

$(document).on(":passageinit", ({passage})=>{
    if(V.options && V.options.maxStates <= 1){

        V.options.maxStates = 2
        updatehistorycontrols()
    }


    if(!V.test){
        V.test = 0
    }

    console.log(passage)
    console.log('link', V.link, V.nextPassage, V.nextPassageIntended)
    if(passage.title == 'Domus Street'){
        console.log('jump to bedroom test!!!!')
        console.time('clone test')
            for(let i in V){
                window.bak[i] = clone(V[i])
            }
        console.timeend('clone test')
        
        setTimeout(() => {
            console.time('restore test')
            for(let i in window.bak){
                V[i] = window.bak[i]
            }
            console.timeend('restore test')

            Engine.play('Bedroom');
            console.log('test var:', V.test);
    }, 
        30)

    }
})
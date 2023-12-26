const eventManager = {
    setFlag: function (event, prop, value) {
        if(!R.flags[event]){
            R.flags[event] = {}
        }
        R.flags[event][prop] = value

        return R.flags[event]
    },

    getFlag: function (event, prop) {
        if(!R.flags[event]) return
        return prop ? R.flags[event][prop] : R.flags[event]
    },

    setScene: function(event, obj){
        R.tvar.scene[event] = {
            passage: obj.passage,
            eventnext: obj.eventnext,
            nextcode: obj.nextcode
        }
    },

    unsetEvent: function(event){
        delete R.tvar.scene[event]
    },

    getEvent: function(event){
        if(!R.events[event]) return
        return R.events[event]
    },

    registEvent: function(event, ...events){
        if(!R.events[event]){
            R.events[event] = []
        }
        R.events[event].push(...events)
    },

    eventProcess: function(event){
        if(R.scene && V.passage.containsAll(R.scene, 'Scene')){
            //筛选事件
            for(let i = 0; i < R.events[event].length; i++){
                const data = R.events[event][i]
                if(data.require()){
                    data.passage = `iCandyMod ${data.type} ${event} ${data.episode}`
                    if(data.branch){
                        data.passage += ` ${data.branch}`
                    }
                    
                    this.setScene(event, data)
                }
            }
        }
    }
}

Object.defineProperties(window,{
    iEvent: {
        get: function(){
            return eventManager
        }
    }
})
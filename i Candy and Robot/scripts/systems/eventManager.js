const eventManager = {
    data : {},
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
        V.tvar.scene = {
            event: event,
            passage: obj.passage,
            nextcode: obj.nextcode
        }
        V.tvar.eventnext = obj.eventnext
    },

    unsetEvent: function(){
        R.tvar.scene={}
    },

    getEvent: function(event){
        if(!R.events[event]) return
        return R.events[event]
    },

    registEvent: function(event, ...events){
        if(!this.data[event]){
            this.data[event] = []
        }
        this.data[event].push(...events)
    },

    eventProcess: function(event){
        console.log('event:', event)
        if(R.scene && passage().has(R.scene, 'BaseScene') == 2){
            //筛选事件
            const eventList = this.data[event]
            console.log('eventlist:',eventList)

            for(let i = 0; i < eventList.length; i++){
                const data = eventList[i]
                console.log('eventdata:', data)

                if(data.require()){
                    const _event = clone(data)
                    _event.passage = `iCandyMod ${data.type} ${event} ${data.episode}`
                    if(data.branch){
                        _event.passage += ` ${data.branch}`
                    }
                    if(Story.has(_event.passage + ` ${setup.language}`)){
                        _event.passage += ` ${setup.language}`
                    }
                    this.setScene(event, _event)
                    break
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
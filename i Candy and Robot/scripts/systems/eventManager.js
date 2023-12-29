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
        console.log('setScene:', event, obj)
        V.tvar.scene = obj
        V.tvar.scene.passage = obj.title
        V.tvar.eventnext = obj.eventnext
        this.initEvent(V.tvar.scene)
    },

    unsetEvent: function(){
        V.tvar.scene = {}
        V.phase = 0
        V.tvar.eventnext = false
        V.tvar.onselect = false
        wikifier('endevent')
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


    //check event when enter a scene
    eventReady: function(){
        let title = passage()
        if(R?.scene){
            this.checkEvent(R.scene)
        }
        else{
            const data = Story.get(title)
            const keys = data.title.split(' ')

            if(keys.has('Passout') && (keys.indexOf('Passout') == 0 && !data.text.includes('combat') || keys.indexOf('Passout') == key.length)){
                this.checkEvent('Passout')
            }
            else if(keys.has('Sleep') && data.text.includes('<<sleep>>') ){
                this.checkEvent('Sleep')
            }
            else if(title == 'Bath' || title == 'Cabin Bath' || keys.indexOf('Shower') == keys.length - 1){
                this.checkEvent('Bath')
            }
            else{
                this.checkEvent2(data.title)
            }
        }

    },

    initEvent: function(scene){
        scene.passage = scene.title 

        if(scene.phase > 0 && V.phase < scene.phase){
            scene.passage = `${scene.title} ${V.phase+1}`
        }

        if(Story.has(scene.passage+` ${setup.language}`)){
            scene.passage += ` ${setup.language}`
        }

        if(scene.chara){
            wikifier('nnpc', scene.chara)
            wikifier('person1')
        }
        console.log('scene:', scene)

        if(scene.scenestage && Story.has(scene.scenestage) && !V.tvar.scene.init){
            console.log('scene.scenestage:', scene.scenestage)
            V.phase = 1
            V.tvar.jump = true
        }

        V.tvar.scene.init = 1        
    },

    initScene: function(){
        const scene = V.tvar.scene

        if(scene?.chara){
            wikifier('nnpc', scene.chara)
            wikifier('person1')
        }
        if(scene?.initfunc){
            scene.initfunc()
        }
        if(scene?.initcode){
            new Wikifier(null, scene.initcode)
        }

        scene.passage = scene.title

        if(scene.phase > 0 && V.phase < scene.phase){
            scene.passage = `${scene.title} ${V.phase+1}`
        }

        if(Story.has(scene.passage+` ${setup.language}`)){
            scene.passage += ` ${setup.language}`
        }

        if(!scene.init && scene.phase > 0){
           V.phase = 1
        }
        else if(scene.phase > 0 && V.phase < scene.phase){
            V.phase ++
        }
        
        if(V.phase >= scene.phase){
            V.tvar.eventnext = false
        }

    },

    //原有地点的事件监测
    checkEvent2: function(passage){
        const eventlist = this.data.location
        if(!eventlist) return

        for(let i = 0; i < eventlist.length; i++){
            const data = eventlist[i]
            if(
                ( data.passage && passage == data.passage ) || 
                ( data.match && data.match(passage) ) ||
                ( data.keys && passage.has(data.keys) == data.keyrequire )
             ){
                if(data.require()){
                    const _event = clone(data)

                    _event.title = `${data.type} ${data.passage} ${data.episode}`

                    if(data.branch){
                        _event.title += ` ${data.branch}`
                    }

                    if(data.scene){
                        _event.scenestage = `BaseScene ${data.scene}`
                    }
                    _event.location = passage
                    this.setScene(data.passage, _event)
                    break
                }
            }
        }
    },

    //模组地点事件检测
    checkEvent: function(event){
        //console.log('event:', event)
        //筛选事件
        const eventList = this.data[event]
        //console.log('eventlist:',eventList)
        if(!eventList) return

        for(let i = 0; i < eventList.length; i++){
            const data = eventList[i]
            //console.log('eventdata:', data)
            if(data.require()){
                const _event = clone(data)

                _event.title = `${data.type} ${event} ${data.episode}`

                if(data.branch){
                    _event.title += ` ${data.branch}`
                }

                this.setScene(event, _event)
                break
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
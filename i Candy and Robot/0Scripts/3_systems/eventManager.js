const eventManager = {
    data : {},
    widget : {},

    setFlag: function (event, prop, value) {
        if(!R.flags[event]){
            R.flags[event] = {}
        }
        R.flags[event][prop] = value

        return R.flags[event]
    },
    addFlag: function (event, prop, value) {
        if(!R.flags[event]){
            R.flags[event] = {}
        }
        if(!R.flags[event][prop]){
            R.flags[event][prop] = 0
        }
        R.flags[event][prop] += value
        
        return R.flags[event]
    },
    getFlag: function (event, prop) {
        if(!R.flags[event]) return
        return prop ? R.flags[event][prop] : R.flags[event]
    },

    //regist event for static location event
    registEvent: function(event, ...events){
        if(!this.data[event]){
            this.data[event] = []
        }
        this.data[event].push(...events)
    },

    //regist event for none static location event
    registEvent2: function(type, event, ...events){
        if(!this.data[type]){
            this.data[type] = {}
        }
        if(!this.data[type][event]){
            this.data[type][event] = []
        }
        this.data[type][event].push(...events)
    },

    //regist a process function for certain passage
    registPsg: function(passage, callback){
        this.widget[passage] = callback
    },

    getEvent: function(event){
        if(!this.data[event]) return
        return this.data[event]
    },

    //set event by certain keys
    setEvent: function(type, event, key, branch){
        const eventdata = this.getEvent(event)
        if(!eventdata) return

        console.log('setEvent:', type, event, key, branch, eventdata)

        let data

        //get the branch event
        if(type == 'check' && key){
            for(let i = 0; i < eventdata.length; i++){
                const _data = eventdata[i]
                if(eventdata[i].episode == key && _data.require() ){
                    data = clone(_data)
                    break
                }
            }
        }

        //get the event by certain key
        if(type == 'get' && key){
            const _data = eventdata.filter( data => (data.episode == key && !branch )|| (data.episode == key && data.branch == branch ))
            data = clone(_data[0])
        }
        
        //check events
        if(!data && !key && !branch){
            for(let i = 0; i < eventdata.length; i++){
                const _data = eventdata[i]
                if(_data.require()){
                    data = clone(_data)
                    break
                }
            }
        }

        if(data){
            this.setScene(event, data)
        }

        console.log('setEvent:', data)
    },

    unsetEvent: function(){
        V.tvar.scene = {}
        V.phase = 0
        V.tvar.eventnext = false
        V.tvar.onselect = false
        V.tvar.exitPassage = null
        wikifier('endevent')
    },

    setScene: function(event, data){
        data.title = `${data.type} ${event} ${data.episode}`
        if(data.branch){
            data.title += ` ${data.branch}`
        }

        if(data.scene){
            data.scenestage = `BaseScene ${data.scene}`
        }
        else if(data.toward){
            data.scenestage = `${data.type} data.toward`
        }

        console.log('setScene:', event, data)
        
        V.tvar.scene = data
        V.tvar.scene.passage = data.title

        if(data.eventnext !== undefined){
            V.tvar.eventnext = data.eventnext
        }
        else{
            data.eventnext = (data.phase > 0)
        }

        V.tvar.exitPassage = data.exit ?? V.passage
        V.tvar.endcode = data.endcode

        this.initEvent(V.tvar.scene)
    },

    initEvent: function(scene){
        scene.passage = scene.title 

        if(scene.phase > 0 && Story.has(`${scene.title} 1`)){
            scene.passage = `${scene.title} 1`
        }

        if(Story.has(scene.passage+` ${setup.language}`)){
            scene.passage += ` ${setup.language}`
        }

        if(scene.scenestage && Story.has(scene.scenestage) && !V.tvar.scene.init){
            console.log('scene.scenestage:', scene.scenestage)
            V.tvar.jump = true
        }
      
    },

    initScene: function(){
        const scene = V.tvar.scene

        if(!scene.init && scene?.chara){
            wikifier('npc', scene.chara)
            wikifier('person1')
        }
        if(!scene.init && scene?.initfunc){
            scene.initfunc()
        }
        if(!scene.init && scene?.initcode){
            new Wikifier(null, scene.initcode)
        }

        //combine the passage title
        scene.passage = scene.title

        if(scene.phase > 0 && V.phase < scene.phase){
            console.log('phase:', V.phase)
            scene.passage = `${scene.title} ${V.phase+1}`
        }

        if(Story.has(scene.passage+` ${setup.language}`)){
            scene.passage += ` ${setup.language}`
        }

        //do phase
        if(!scene.init){
            scene.init = true
            //需要跳转的从0开始
            if(scene.scenestage || scene.toward){
                V.phase = 0
            }
            else{
                V.phase = 1
            }
        }
        else if(scene.phase > 0 && V.phase < scene.phase){
            V.phase ++
        }

        if(V.phase >= scene.phase){
            V.tvar.eventnext = false
        }

    },

    initBaseScene: function(){
        const psg = Story.get(passage())
        if(psg.tags.includes('scene')){
            R.scene = psg.title.replace('BaseScene ', '')
        }
        console.log('initBaseScene:', R.scene)
    },

    //check event when enter a scene
    eventReady: function(){
        let title = passage()
        if(typeof V.tvar.scene.passage == 'string') return

        console.log('eventReady:', title, R?.scene)

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

    //run the post-process function for passage event
    eventDone: function(){
        let title = passage()
        let func = this.widget[title]
        console.log('eventDone:', title, R.scene, func)
        
        if(R?.scene && this.widget[R.scene]){
            this.widget[R.scene]()
        }
        else if(typeof func == 'function'){
            func()
        }
    },

    //原有地点的事件监测
    checkEvent2: function(passage){
        console.log('checkevent2:', passage)

        const eventlist = this.getEvent('location')
        if(!eventlist) return

        for(let i = 0; i < eventlist.length; i++){
            const data = eventlist[i]
            if(
                ( data.passage && passage == data.passage ) || 
                ( data.match && data.match(passage) ) ||
                ( data.keys && passage.has(data.keys) == data.keyrequire )
             ){
                if(typeof data.require == 'function' && data.require()){
                    const _event = clone(data)
                    this.setScene(data.passage, _event)
                    break
                }
            }
        }
    },

    //模组地点事件检测
    checkEvent: function(event){
        console.log('checkevent:', event)
        //筛选事件
        const eventList = this.getEvent(event)
        //console.log('eventlist:',eventList)
        if(!eventList) return

        for(let i = 0; i < eventList.length; i++){
            const data = eventList[i]
            //console.log('eventdata:', data)
            if(typeof data.require == 'function' && data.require()){
                const _event = clone(data)
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
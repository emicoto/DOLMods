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

    startScene: function(){
		setTimeout(()=>{

			console.time('restore')
			for(let i in V){
				V[i] = clone(window.bak[i])
			}
			console.timeEnd('restore')

			delete V.tvar.jump
			V.tvar.scene.start = true
			Engine.play(V.tvar.scene.scenestage)

		}, Engine.minDomActionTime + 10 )
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
                if(data.location && data.location.includes(V.location) == false) continue

                if(eventdata[i].episode == key && typeof _data == 'function' && _data.require() ){
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
                if(data.location && data.location.includes(V.location) == false) continue

                if(typeof _data == 'function' && _data.require()){
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

    unsetEvent: function(skip){
        V.tvar.scene = {}
        V.phase = 0
        V.tvar.eventnext = false
        V.tvar.onselect = false
        V.tvar.exitPassage = null
        V.tvar.selected = null
        if(skip){
            V.eventskip = 1
        }
        wikifier('endevent')
    },

    goBranch: function(branch){
        if(!V.tvar.scene.branch){
            V.tvar.scene.branch = branch
        }
        else{
            V.tvar.scene.branch += ` ${branch}`
        }
        V.tvar.scene.title += ` ${branch}`

        V.phase = 0
    },

    jump: function(scene, phase){
    },

    popBranch: function(phase){
        const branch = V.tvar.scene.branch.split(' ')
        branch.pop()
        V.tvar.scene.branch = branch.join(' ')
        V.tvar.scene.title = `${V.tvar.scene.type} ${V.tvar.scene.event} ${V.tvar.scene.episode}`
        if(V.tvar.scene.branch.length > 0 ){
            V.tvar.scene.title += ` ${V.tvar.scene.branch}`
        }

        if(Number(phase)){
            V.phase = Number(phase)
        }
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
            data.scenestage = `${data.type} ${data.toward}`
            
            if(Story.has(data.scenestage+` ${setup.language}`)){
                data.scenestage += ` ${setup.language}` 
            }
        }      
        
        V.tvar.scene = data
        V.tvar.scene.passage = data.title

        if(data.eventnext !== undefined){
            V.tvar.eventnext = data.eventnext
        }
        else{
            data.eventnext = (data.phase > 0)
            V.tvar.eventnext = data.eventnext
        }

        V.tvar.exitPassage = data.exit ?? V.passage
        V.tvar.endcode = data.endcode
        
        console.log('setScene:', event, data)

        this.initEvent(V.tvar.scene)

        return V.tvar.scene
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
        else{
            V.tvar.scene.start = true
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

        if(scene.phase > 0 && V.phase < scene.phase && scene.phasetype !== 'inframe'){
           
            scene.passage = `${scene.title} ${V.phase+1}`
        }
        console.log('phase:', V.phase)

        if(Story.has(scene.passage+` ${setup.language}`)){
            scene.passage += ` ${setup.language}`
        }
        console.log('title:', scene.passage)

        //do phase
        if(!scene.init){
            scene.init = true
            V.phase = 1
        }
        else if(scene.phase > 0 && V.phase < scene.phase){
            V.phase ++
        }

        if(V.phase >= scene.phase){
            V.tvar.eventnext = false
        }
        console.log('initScene:', scene, V.phase, V.tvar.eventnext, V.onselect)

    },

    initBaseScene: function(passage){
        if(passage.tags.includes('scene')){
            R.scene = passage.title.replace('BaseScene ', '')
        }
        console.log('initBaseScene:', R?.scene, passage)
    },

    //if event has been set but didn't run, clear it
    fixEvent: function(data){
        //check the event is running in the right scene or not
        if(!V.tvar.scene.start || V.tvar.scene.scenestage ) return

        const scene = V.tvar.scene
        const stage = scene.title.split(' ')[1]

        if( data.title.includes(stage) == false && groupmatch(scene.type, 'Scene', 'Event')){
            console.log('fixEvent:', scene, data)
            this.unsetEvent()
        }

        if( scene.type == 'Chara' && scene.location.includes(V.location) == false){
            console.log('fixEvent:', scene, data)
            this.unsetEvent()
        }

 
    },

    //check event when enter a scene
    eventReady: function(data){
        let title = data.title
        this.fixEvent(data)
        //already in event
        if(V.tvar.scene.start == true) return
        //already in combat
        if(V.combat == 1) return 
        
        console.log('eventReady:', title, R?.scene, data)

        //passout event always in the highest priority
        if( V.stress >= V.stressmax ){
            console.log('eventReady, check passout event:', title, R.scene)
            return this.checkEvent('Passout')
        }

        //check event from new scene
        if(R && typeof R.scene === 'string'){
            this.checkEvent(R.scene)
        }
        else{
            //check event from passage
            
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

        if(data.tags.includes('scene') && V.eventskip == 0){
            V.danger = random(1, 10000)
            V.dangerevent = 0
        }

    },

    //run the post-process function for passage event
    eventDone: function(){
        let title = passage()
        let func = this.widget[title] ?? this.widget[R.scene]
        console.log('eventDone:', title, R.scene, func)
        
        if(typeof func == 'function'){
            func()
        }

        if(Story.get(title).tags.includes('scene') && V.eventskip == 1){
            V.eventskip = 0
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
                    return this.setScene(data.passage, _event)
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
                return this.setScene(event, _event)
            }
        }
        
    }
}

DefineMacroS("goBranch", eventManager.goBranch)
DefineMacroS("popBranch", eventManager.popBranch)

Object.defineProperties(window,{
    iEvent: {
        get: function(){
            return eventManager
        }
    }
})
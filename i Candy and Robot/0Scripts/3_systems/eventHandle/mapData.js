class BoardData {
    constructor(boardId) {
        this.locations = new Map();
        this.type = 'world';
        this.id = boardId;
    }

    /**
     * check if this board has the location
     * @param {*} stageId
     * @returns {boolean}
     */
    has(stageId) {
        return this.locations.has(stageId);
    }

    /**
     * get location data by variable name
     * @param {string} vname
     * @returns {iMap | void}
     */
    getByV(vname) {
        for (const [key, value] of this.locations) {
            if (value.name == vname) return this.locations.get(key);
        }
    }

    /**
     * get location data by stageId
     * @param {*} stageId
     * @returns {iMap}
     */
    get(stageId) {
        return this.locations.get(stageId);
    }

    /**
     * add locations to this board
     * @param  {...iMap} locations
     */
    add(...locations) {
        locations.forEach(location => {
            location.parent = this.id;
            this.locations.set(location.stageId, location);
        });
    }
}

class iMap {
    static data = {};
    static local = null;

    // get alley name
    static alley() {
        if (V.passage.includes('Commercial')) return 'commercial_alley';
        else if (V.passage.includes('Industrial')) return 'industrial_alley';
        else if (V.passage.includes('Residential')) return 'residential_alley';

        const location = this.getByV(V.bus);
        return `${location.area}_alley`;
    }

    // get current location variable name
    static currentLoc() {
        // 巴士里直接返回巴士
        if (V.passage.includes('Bus')) {
            return 'bus';
        }

        // 市场里直接返回市场
        if (V.passage.has('Stall', 'Market')  && V.location == 'town') {
            return 'connudatus_market';
        }

        // 根据bus返回
        if (V.location == 'town') {
            return V.bus;
        }

        // 如果是农场，根据passage返回地点
        if (V.location == 'farm' && V.passage.includes('Livestock')) {
            return 'livestock';
        }

        if (V.location == 'alley') {
            return this.alley();
        }

        return V.location;
    }

    // get current location data
    static current() {
        if (this.local && this.local.name == V.location) {
            return this.local;
        }

        const data = this.getByV(this.currentLoc());
        this.local = data;
        return data;
    }

    static getFullStage(scene) {
        const keys = Object.keys(this.data);
        for (let i = 0; i < keys.length; i++) {
            const board = this.data[keys[i]];
            const data = board.get(scene);

            if (data) {
                return data.fullTitle();
            }
        }
    }

    /**
     * @param {string} mapId
     * @returns {boardData}
     */
    static set(mapId) {
        this.data[mapId] = new BoardData(mapId);
        return this.data[mapId];
    }

    /**
     * get location data by stageId
     * @param {string} stageId
     * @returns
     */
    static get(stageId) {
        const keys = Object.keys(this.data);
        for (let i = 0; i < keys.length; i++) {
            const board = this.data[keys[i]];
            if (board.has(stageId)) {
                return board.get(stageId);
            }
        }
    }
    
    /**
     * get location data by variable name
     * @param {string} vname
     * @returns {iMap | void}
     */
    static getByV(vname) {
        const keys = Object.keys(this.data);
        for (let i = 0; i < keys.length; i++) {
            const board = this.data[keys[i]];
            const location = board.getByV(vname);
            if (location) {
                return location;
            }
        }
    }

    constructor(variable, stageId) {
        this.name = variable;
        this.stageId = stageId;
        this.display = {
            EN : '',
            CN : ''
        };
        this.entry = [];
        this.group = 'DolTown';
        this.type = 'street';
        this.tags = [];
        this.locations = {};
        this.transport = {
            bike   : false,
            bus    : false,
            portal : false
        };
    }

    fullTitle() {
        if (this.tags.includes('nonestage')) {
            return this.stageId;
        }

        if (this.tags.includes('mainstage')) {
            return `MainStage ${this.stageId}`;
        }

        if (this.tags.includes('mirrorstage')) {
            return `Stage ${this.stageId.replace(/\s/g, '')}`;
        }

        return `Stage ${this.stageId}`;
    }

    go() {
        V.location = this.name;
        iMap.local = this;
    }

    /**
     * @description set the display name of this map
     * @param  {...string | object } language
     * @returns {iMap}
     */
    Display(...language) {
        if (language.length == 1 && String(language[0]) == '[object Object]') {
            this.display = language[0];
        }
        else {
            const list = ['EN', 'CN', 'JP'];
            for (let i = 0; i < language.length; i++) {
                const text = language[i];
                this.display[list[i]] = text;
            }
        }
        return this;
    }

    /**
     * @description set the entry passage of this map
     * @param  {...string} passage
     * @returns {iMap}
     */
    Entry(...passage) {
        this.entry = passage;

        // if entry passage just one, set it as default group
        if (this.entry.length == 1) {
            this.group = this.entry[0];
        }
        return this;
    }

    /**
     * @description set the group of this map
     * @param {string} group
     * @returns {iMap}
     */
    Group(group) {
        this.group = group;
        return this;
    }

    /**
     * @description set the type of this map
     * @param {'building' | 'forest' | 'plain' | 'shore' | 'water' | 'underground' | 'special' } type
     * @returns {iMap}
     */

    Type(type) {
        this.type = type;

        // if type is building, set it as indoor location
        if (type == 'building') {
            this.indoor = 1;
        }
        return this;
    }

    /**
     * @description set the functional tags of this location
     * @param  {...'mainstage' | 'maze' | 'business' | 'activity' | 'shelter' | 'mobilestall' | 'waterspot' | 'cave'} tags
     * @returns {iMap}
     */
    Tags(...tags) {
        this.tags = tags;
        return this;
    }

    /**
     * @description set the available locations and the position relation of this map
     * @param {{ [location: string] : number }} locations
     * @returns {iMap}
     */
    Locations(locations) {
        this.locations = locations;
        return this;
    }

    /**
     * @description set the transportation of this map
     * @param  {'bike' | 'bus' | 'portal'} transport
     * @returns {iMap}
     */
    Transport(...transport) {
        transport.forEach(t => {
            this.transport[t] = true;
        });
        return this;
    }

    /**
     * @description set condition of the location, which will be checked when pc in the entry passage
     * @param {function} cond
     * @returns {iMap}
     */
    Cond(cond) {
        this.cond = cond;
        return this;
    }

    /**
     * @description set the business hours of this location
     * @param {number[]} ...hours
     * @returns {iMap}
     */
    BusinessHours(...hours) {
        this.businessHours = hours;
        return this;
    }

    /**
     * @description set the available actions of this location
     * @param  {...object} actions
     * @returns {iMap}
     */
    Actions(...actions) {
        this.actions = actions;
        return this;
    }

    /**
     * @description set the area group of this location
     */
    Area(area) {
        this.area = area;
        return this;
    }


    /**
     * @description set the taninng multiplier of this location
     * @param {number} multiplier
     */
    Tanning(multiplier) {
        this.tanning = multiplier;
        return this;
    }
}

iMap.set('Tauyuan').add(
    new iMap('chinatown', 'Chinatown')
        .Display('Chinatown', '唐人街')
        .Entry('AlmondForest')
        .Group('Tauyuan')
        .Type('town')
        .Tags('mainstage', 'mobilestall')
        .Locations({
            almond     : -5,
            chinatown  : 0,
            snackshop  : 1,
            taipark    : 3,
            kongfucafe : 5,
            teagarden  : 6,
            shingwong  : 7,
            institude  : 8,
            bathcenter : 10,
            moonforest : 15
        })
        .Transport('bike'),
    
    new iMap('almond', 'AlmondForest')
        .Display('Almond Forest', '杏花林')
        .Entry('Harvest Street', 'Mer Street')
        .Group('Tauyuan')
        .Type('forest')
        .Tags('mainstage', 'maze')
        // 地点连接出现在entry passage的条件。
        .Cond(() => iEvent.getFlag('chinatown', 'known') && !between(Time.hour, 8, 12))
        .Locations({
            mer       : -2,
            harvest   : -1,
            almond    : 0,
            chinatown : 5
        }),
    
    new iMap('snackshop', 'SnackShop')
        .Display('Snack Shop', '小吃店')
        .Entry('Chinatown')
        .Type('building')
        .Tags('business')
        .BusinessHours([9, 17])
        .Locations({
            chinatown : -1,
            snackshop : 0
        }),
    
    new iMap('taipark', 'TaiPark')
        .Display('Taichi Park', '太极公园')
        .Entry('Chinatown')
        .Type('park')
        .Tags('activity', 'shelter')
        .Locations({
            chinatown : -1,
            taipark   : 0
        }),
    
    new iMap('kongfucafe', 'KongfuCafe')
        .Display('Kongfu Café', '功夫茶餐厅')
        .Entry('Chinatown')
        .Type('building')
        .Tags('business')
        .BusinessHours([10, 21])
        .Locations({
            chinatown  : -1,
            kongfucafe : 0
        }),
    
    new iMap('teagarden', 'TeaGarden')
        .Display('Tea Garden', '茶园')
        .Entry('Chinatown')
        .Type('building')
        .Tags('business')
        .BusinessHours([10, 14], [17, 22])
        .Locations({
            chinatown : -1,
            teagarden : 0
        }),
    
    new iMap('shingwong', 'ShingWong')
        .Display('Shing Wong Temple', '城隍庙')
        .Entry('Chinatown')
        .Type('building')
        .Tags('activity')
        .Locations({
            chinatown : -1,
            shingwong : 0
        }),
    
    new iMap('institude', 'Institude')
        .Display('Robot Science Institude', '机器人研究所')
        .Entry('Chinatown')
        .Type('building')
        .Tags('activity')
        .Locations({
            chinatown : -1,
            institude : 0
        }),
    
    new iMap('bathcenter', 'BathCenter')
        .Display('Lotus Bath Center', '水木莲华')
        .Entry('Chinatown')
        .Type('building')
        .Tags('business')
        .BusinessHours([10, 22])
        .Locations({
            chinatown  : -1,
            bathcenter : 0
        }),
    
    new iMap('moonforest', 'MoonForest')
        .Display('Moon Forest', '月光森林')
        .Entry('AlmondForest', 'Chinatown')
        .Group('Tauyuan')
        .Type('forest')
        .Tags('mainstage', 'maze', 'waterspot')
        .Cond(() => iEvent.getFlag('moonforest', 'known'))
        .Locations({
            chinatown  : -15,
            moonforest : 0,
            hotspring  : 10,
            almond     : 20
        }),
    
    new iMap('hotspring', 'HotSpring')
        .Display('Hot Spring', '温泉')
        .Entry('MoonForest')
        .Type('forest')
        .Tags('waterspot')
        .Cond(() => Tvar.moonforest.forward >= 5 && random(100) < 40)
        .Locations({
            moonforest  : -1,
            hotspring   : 0,
            springhouse : 5
        }),
    
    new iMap('springhouse', 'SpringHouse')
        .Display('Spring House', '温泉屋')
        .Entry('MoonForest', 'Hotspring')
        .Type('building')
        .Tags('safehouse')
        .Cond(
            () => iMap.currentLoc() == 'hotspring' || Tvar.moonforest.forward >= 5 && random(100) < 20
        )
        .Locations({
            moonforest  : -2,
            hotspring   : -1,
            springhouse : 0
        })
);

iMap.set('DolTown').add(
    new iMap('domus', 'Domus Street')
        .Group('DolTown')
        .Area('residential')
        .Tags('nonestage')
        .Type('town')
        .Locations({
            manhole   : -5,
            orphanage : -1,
            domus     : 0,
            busstop   : 2,
            barb      : 5,
            danube    : 5,
            
            residential_alley : 5
        }),

    new iMap('barb', 'Barb Street')
        .Group('DolTown')
        .Area('residential')
        .Tags('nonestage')
        .Type('town'),
    
    new iMap('danube', 'Danube Street')
        .Group('DolTown')
        .Area('residential')
        .Tags('nonestage')
        .Type('town'),
    
    new iMap('wolf', 'Wolf Street')
        .Group('DolTown')
        .Area('residential')
        .Tags('nonestage')
        .Type('town'),
    
    new iMap('high', 'High Street')
        .Group('DolTown')
        .Area('commercial')
        .Tags('nonestage')
        .Type('town'),
    
    new iMap('connudatus', 'Connudatus Street')
        .Group('DolTown')
        .Area('commercial')
        .Tags('nonestage')
        .Type('town'),

    new iMap('cliff', 'Cliff Street')
        .Group('DolTown')
        .Area('commercial')
        .Tags('nonestage')
        .Type('town'),

    new iMap('nightingale', 'Nightingale Street')
        .Group('DolTown')
        .Area('commercial')
        .Tags('nonestage')
        .Type('town'),

    new iMap('starfish', 'Starfish Street')
        .Group('DolTown')
        .Area('commercial')
        .Tags('nonestage')
        .Type('town'),
    
    new iMap('oxford', 'Oxford Street')
        .Group('DolTown')
        .Area('commercial')
        .Tags('nonestage')
        .Type('town'),
    

    new iMap('elk', 'Elk Street')
        .Group('DolTown')
        .Area('industrial')
        .Tags('nonestage')
        .Type('town'),
    
    new iMap('mer', 'Mer Street')
        .Group('DolTown')
        .Area('industrial')
        .Tags('nonestage')
        .Type('town'),
    
    new iMap('harvest', 'Harvest Street')
        .Group('DolTown')
        .Area('industrial')
        .Tags('nonestage')
        .Type('town'),
    
    new iMap('brothel', 'Brothel Basement')
        .Group('Brothel')
        .Area('industrial')
        .Tags('mirrorstage')
        .Type('building')
);

Object.defineProperty(window, 'iMap', {
    get() {
        return iMap;
    }
});


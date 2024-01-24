class iMap {
    constructor(variable, stageId) {
        this.name = variable;
        this.stageId = stageId;
        this.display = {
            EN : '',
            CN : ''
        };
        this.entry = [];
        this.group = 'doltown';
        this.type = 'street';
        this.tags = [];
        this.locations = {};
        this.transport = {
            bike   : false,
            bus    : false,
            portal : false
        };
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
     * @param {string} type
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
     * @param  {...string} tags
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
     * @param  {...string} transport
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
}

const iMapData = {
    Chinatown : new iMap('chinatown', 'Chinatown')
        .Display('Chinatown', '唐人街')
        .Entry('AlmondForest')
        .Group('tauyuan')
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
    
    AlmondForest : new iMap('almond', 'AlmondForest')
        .Display('Almond Forest', '杏花林')
        .Entry('Harvest Street', 'Mer Street')
        .Group('tauyuan')
        .Type('forest')
        .Tags('mainstage', 'maze')
        // 地点连接出现在entry passage的条件。
        .Cond(() => iStage.getFlag('chinatown', 'known') && !between(Time.hour, 8, 12))
        .Locations({
            mer       : -2,
            harvest   : -1,
            almond    : 0,
            chinatown : 5
        }),
    
    SnackShop : new iMap('snackshop', 'SnackShop')
        .Display('Snack Shop', '小吃店')
        .Entry('Chinatown')
        .Type('building')
        .Tags('business')
        .BusinessHours([9, 17])
        .Locations({
            chinatown : -1,
            snackshop : 0
        }),
    
    TaiPark : new iMap('taipark', 'TaiPark')
        .Display('Taichi Park', '太极公园')
        .Entry('Chinatown')
        .Type('park')
        .Tags('activity', 'shelter')
        .Locations({
            chinatown : -1,
            taipark   : 0
        }),
    
    KongfuCafe : new iMap('kongfucafe', 'KongfuCafe')
        .Display('Kongfu Café', '功夫茶餐厅')
        .Entry('Chinatown')
        .Type('building')
        .Tags('business')
        .BusinessHours([10, 21])
        .Locations({
            chinatown  : -1,
            kongfucafe : 0
        }),
    
    TeaGarden : new iMap('teagarden', 'TeaGarden')
        .Display('Tea Garden', '茶园')
        .Entry('Chinatown')
        .Type('building')
        .Tags('business')
        .BusinessHours([10, 14], [17, 22])
        .Locations({
            chinatown : -1,
            teagarden : 0
        }),
    
    ShingWong : new iMap('shingwong', 'ShingWong')
        .Display('Shing Wong Temple', '城隍庙')
        .Entry('Chinatown')
        .Type('building')
        .Tags('activity')
        .Locations({
            chinatown : -1,
            shingwong : 0
        }),
    
    Institutude : new iMap('institude', 'Institude')
        .Display('Robot Science Institude', '机器人研究所')
        .Entry('Chinatown')
        .Type('building')
        .Tags('activity')
        .Locations({
            chinatown : -1,
            institude : 0
        }),
    
    BathCenter : new iMap('bathcenter', 'BathCenter')
        .Display('Lotus Bath Center', '水木莲华')
        .Entry('Chinatown')
        .Type('building')
        .Tags('business')
        .BusinessHours([10, 22])
        .Locations({
            chinatown  : -1,
            bathcenter : 0
        }),
    
    MoonForest : new iMap('moonforest', 'MoonForest')
        .Display('Moon Forest', '月光森林')
        .Entry('AlmondForest', 'Chinatown')
        .Group('tauyuan')
        .Type('forest')
        .Tags('mainstage', 'maze', 'waterspot')
        .Cond(() => iStage.getFlag('moonforest', 'known'))
        .Locations({
            chinatown  : -15,
            moonforest : 0,
            hotspring  : 10,
            almond     : 20
        }),
    
    Hotspring : new iMap('hotspring', 'HotSpring')
        .Display('Hot Spring', '温泉')
        .Entry('MoonForest')
        .Type('forest')
        .Tags('waterspot')
        .Cond(() => Tvar.moonforest.forward >= 5 && random(100) > 60)
        .Locations({
            moonforest  : -1,
            hotspring   : 0,
            springhouse : 5
        }),
    
    SpringHouse : new iMap('springhouse', 'SpringHouse')
        .Display('Spring House', '温泉屋')
        .Entry('MoonForest', 'Hotspring')
        .Type('building')
        .Tags('safehouse')
        .Cond(() => Tvar.moonforest.forward >= 5 && random(100) > 30)
        .Locations({
            moonforest  : -2,
            hotspring   : -1,
            springhouse : 0
        })
};


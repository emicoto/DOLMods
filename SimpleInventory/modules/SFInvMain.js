//----------------------------------
//
// Simple Inventory Main Object and Settings
//
//----------------------------------
const SFInventory = (() => {
    const _config = {
        maxsize      : 100,
        boostsize    : 1,
        disableStack : false
    };

    const _options = {
        imgRoot : 'SFInv/',
        types   : [],
        rules   : []
    };

    const _sizeData = {
        pill    : 60,
        inject  : 12,
        cans    : 12,
        bottles : 4,
        snacks  : 8,
        mealbox : 4,
        fruits  : 12,
        micro   : 62,
        tiny    : 32,
        small   : 16,
        medium  : 8,
        big     : 4,
        large   : 1,

        add(obj) {
            for (const key in obj) {
                this[key] = obj[key];
            }
        }
    };


    function _import() {
        const { maxsize, boostsize, disableStack } = iMod.getCF('SimpleInventory');
        _config.maxsize = maxsize;
        _config.boostsize = boostsize;
        _config.disableStack = disableStack;
    }

    function _export() {
        iMod.setCF('SimpleInventory', _config);
    }

    function _getMaxSize(size) {
        const data = _sizeData[size];

        if (data) {
            return data.size;
        }
        else if (typeof size === 'number') {
            return size;
        }
        
        return null;
    }

    
    class InventoryRules {
        constructor(Id = 'default', type = 'pc', slot = 'backpack', size = 12) {
            this.ruleId = Id;
            this.type = type;
            this.slot = slot;
            this.size = size;
        }

        init() {
            if (!V.SFInv[this.type]) {
                V.SFInv[this.type] = {};
            }

            if (!V.SFInv[this.type][this.slot]) {
                V.SFInv[this.type][this.slot] = new Inventory(this.type, this.slot, this.size);
            }
        }
        
        get() {
            this.init();
            return V.SFInv[this.type][this.slot];
        }
    }

    Object.defineProperty(window, 'InventoryRules', {
        value        : InventoryRules,
        writable     : false,
        configurable : false
    });


    return Object.freeze({
        config   : _config,
        options  : _options,
        sizeData : _sizeData,
        import   : _import,
        export   : _export,
        maxsize  : _getMaxSize,
        getTypes : () => _options.types,
        getRules : () => _options.rules
    });
})();

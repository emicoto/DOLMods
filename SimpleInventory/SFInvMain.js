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
        large   : 1
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

    function _getMaxStack(size) {
        const data = _sizeData[size];

        if (data) {
            return data.size;
        }
        else if (typeof size === 'number') {
            return size;
        }
        
        return null;
    }

    return Object.freeze({
        config    : _config,
        sizeData  : _sizeData,
        import    : _import,
        export    : _export,
        maxStacks : _getMaxStack
    });
})();

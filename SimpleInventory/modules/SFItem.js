/* eslint-disable no-var */

var Items = (() => {
    'use strict';

    const _items = new Map();

    function _addItem(id, obj) {
        if (_items.has(id)) {
            throw new Error(`item already exist:${id}`);
        }

        _items.set(id, obj);
    }

    function _getItem(id) {
        return _items.get(id);
    }

    function _searchByType(type) {
        const datas = [..._items.values()];
        return datas.filter(item => item.type === type);
    }

    function _searchByTag(...tag) {
        const datas = [..._items.values()];
        return datas.filter(item => item.tags.containsAll(...tag));
    }

    function _search(type, andor = 'and', ...tags) {
        const datas = [..._items.values()];
        return datas.filter(item => {
            if (type && item.type !== type) return false;
            if (tags.length === 0) return true;
            if (andor === 'or') return item.tags.containsAny(...tags);
            return item.tags.containsAll(...tags);
        });
    }

    function _create(id, obj) {
        const item = {
            id
        };

        for (const key in obj) {
            item[key] = obj[key];
        }

        if (typeof item.onUse !== 'function' && item.effects) {
            item.onUse = function (time = 1) {
                return this.effects.reduce((txt, effect) => {
                    // eslint-disable-next-line prefer-const
                    let { param, method, value } = effect;

                    if (method === 'loss') {
                        value = -value * time;
                    }
                    else {
                        value *= time;
                    }
                    
                    param = InvUtil.getPalam(param, value);

                    return txt + InvUtil.printPalam(param, value);
                }, '');
            };
        }

        return item;
    }

    function _initItemsData() {

    }

    return Object.freeze({
        data          : _items,
        add           : _addItem,
        get           : _getItem,
        create        : _create,
        searchType    : _searchByType,
        searchTag     : _searchByTag,
        search        : _search,
        initItemsData : _initItemsData,
        getPalam      : _getPalam,
        getPalamV     : _getPalamV
    });
})();


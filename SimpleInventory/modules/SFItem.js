/* eslint-disable no-var */

/**
 * Item module for managing items within the game.
 * Provides methods for adding, retrieving, and searching items.
 */
var Items = (() => {
    'use strict';

    /**
     * Internal storage for items using a Map structure.
     * @type {Map<string, Object>}
     */
    const _items = new Map();

    /**
     * Adds a new item to the collection.
     * @param {string} id - Unique identifier for the item.
     * @param {Object} obj - The item object to add.
     * @throws Will throw an error if an item with the given id already exists.
     */
    function _addItem(id, obj) {
        if (_items.has(id)) {
            throw new Error(`item already exist: ${id}`);
        }

        _items.set(id, obj);
    }

    /**
     * Retrieves an item by its unique identifier.
     * @param {string} id - The unique identifier of the item.
     * @returns {Object|undefined} The item object, or undefined if not found.
     */
    function _getItem(id) {
        return _items.get(id);
    }

    /**
     * Searches for items by their type.
     * @param {string} type - The type of items to search for.
     * @returns {Object[]} An array of items matching the specified type.
     */
    function _searchByType(type) {
        const datas = [..._items.values()];
        return datas.filter(item => item.type === type);
    }

    /**
     * Searches for items that contain all specified tags.
     * @param {...string} tag - The tags to search for.
     * @returns {Object[]} An array of items containing all specified tags.
     */
    function _searchByTag(...tag) {
        const datas = [..._items.values()];
        return datas.filter(item => item.tags.containsAll(...tag));
    }

    /**
     * Searches for items based on type and tags.
     * @param {string} [type] - The type of items to search for.
     * @param {string} [andor='and'] - Logic to apply to tags ('and' or 'or').
     * @param {...string} tags - The tags to search for.
     * @returns {Object[]} An array of items that match the specified criteria.
     */
    function _search(type, andor = 'and', ...tags) {
        const datas = [..._items.values()];
        return datas.filter(item => {
            if (type && item.type !== type) return false;
            if (tags.length === 0) return true;
            if (andor === 'or') return item.tags.containsAny(...tags);
            return item.tags.containsAll(...tags);
        });
    }

    /**
     * Creates a new item object.
     * @param {string} id - The unique identifier for the item.
     * @param {Object} obj - The base object data for the item.
     * @returns {Object} The newly created item.
     */
    function _create(id, obj) {
        const item = {
            id,
            ...obj
        };

        // If the item has effects but no custom 'onUse' function, provide a default one.
        if (typeof item.onUse !== 'function' && item.effects) {
            item.onUse = function (time = 1) {
                return this.effects.reduce((txt, effect) => {
                    // eslint-disable-next-line prefer-const
                    let { param, method, value } = effect;

                    if (method === 'loss') {
                        value = -value * time; // Apply negative effect if method is 'loss'
                    }
                    else {
                        value *= time; // Apply positive effect multiplier
                    }
                    
                    param = InvUtil.getPalam(param, value);

                    return txt + InvUtil.printPalam(param, value);
                }, '');
            };
        }

        return item;
    }

    /**
     * Initializes item data.
     * This function can be used to load initial item data into the system.
     */
    function _initItemsData() {
        // Placeholder for initializing item data.
    }

    // Expose public API
    return Object.freeze({
        data          : _items,
        add           : _addItem,
        get           : _getItem,
        create        : _create,
        searchType    : _searchByType,
        searchTag     : _searchByTag,
        search        : _search,
        initItemsData : _initItemsData
    });
})();

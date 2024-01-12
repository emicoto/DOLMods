class Items {
    static data = {};
    /**
	 * 添加完整的物品OBJ
	 * add a complete item object
	 * @param {Items} obj
	 * @returns {Items}
	 */
    static set(obj) {
        const { type, id, name } = obj;
        if (this.data[id] !== undefined) {
            throw new Error(`item already exist:${id}`);
        }

        const _data = new Items(type, id, name);
        Object.assign(_data, obj);

        this.data[id] = _data;

        return this.data[id];
    }

    /**
	 * 添加物品
	 * add an item
	 * @param {string} type
	 * @param {string} id
	 * @param {[string, string]} name
	 * @returns {Items}
	 */
    static add(type, id, name, ...args) {
        if (this.data[id] !== undefined) {
            throw new Error(`item already exist:${id}`);
        }

        const [price, num, size] = args;
        const _data = new Items(type, id, name, price, num, size);

        this.data[id] = _data;

        return this.data[id];
    }

    /**
	 * 批量添加物品
	 * batch add items
	 * @param {Array<Items>} items
	 */
    static addItems(items, defaultType) {
        items.forEach(item => {
            const { type, id, name, price, num, size } = item;
            if (this.data[id] !== undefined) {
                throw new Error(`item already exist:${id}`);
            }

            const _data = new Items(type ?? defaultType, id, name, price, num, size);

            Object.assign(_data, item);
			
            this.data[item.id] = _data;
        });
    }

    /**
	 * 获取物品或物品内的某个值，不存在的话会返回undefined
	 * get an item or a value of an item, return undefined if not exist
	 * @param {string} id
	 * @param {string} prop
	 * @returns {Items | void}
	 */
    static get(id, prop) {
        const data = this.data[id];
        if (!data) {
            console.error('no such item:', id);
            return;
        }
        if (prop && !data[prop]) {
            console.error('no such props from item:', id, prop);
            return;
        }

        if (prop) return data[prop];
        return data;
    }

    /**
	 * 根据类别筛选物品
	 * search items by type
	 * @param {string} type
	 * @returns {Array<[string, Items]>}
	 */
    static searchType(type) {
        const database = Object.entries(this.data);
        return database.filter(([key, item]) => item.type == type).map(item => item[1]);
    }

    /**
	 * 根据标签（全部）筛选物品
	 * search items by tags (all)
	 * @param {string} tag
	 * @returns {Array<[string, Items]>}
	 */
    static searchTag(...tag) {
        const database = Object.entries(this.data);
        return database.filter(([key, item]) => item.tags.containsAll(...tag)).map(item => item[1]);
    }

    /**
	 * 同时根据物品分类 以及 标签（所选标签任意一个）筛选物品
	 * search items by type and tags (any or all)
	 * @param {string} type 物品的分类 the type of items
	 * @param { 'and' | 'or' } andor 需要匹配所有标签还是任一标签 need to match all tags or any tag
	 * @param {string[]} tags 标签（可多选） tags (can select multiple)
	 * @returns { Array<[string, Items]> }
	 */
    static search(type, andor, ...tags) {
        const database = Object.entries(this.data);
        if (andor == 'and') {
            return database.filter(([key, item]) => item.type == type && item.tags.containsAll(...tags)).map(item => item[1]);
        }
		
        return database.filter(([key, item]) => item.type == type && item.tags.containsAny(...tags)).map(item => item[1]);
    }

    /**
	 * 初始化游戏物品
	 * init vanilla game items
	 */
    static init = iModSetupDoLItems;
    /**
	 * 构造新物品
	 * @param {string} type
	 * @param {string} id
	 * @param {[string, string, string?]} name
	 * @param {number} price
	 * @param {number} num
	 */
    constructor(type, id, name, price = 500, num = 1, size = 'big') {
        this.type = type;
        this.id = id;
        this.name = name;

        this.num = num;
        this.price = price;
        this.size = size;
        this.tags = [];
        this.effects = [];
        this.usage = 1;
        this.img = `img/items/${type}/${id}.png`;
    }

    /**
	 * 获取对应的值
	 * @param {string} prop
	 * @param {number} val
	 * @returns
	 */
    get(prop, val) {
        if (!this[prop]) {
            this[prop] = val;
        }
        return this[prop];
    }
    /**
	 * 更新或设置对应的值
	 * @param {string} prop
	 * @param {number} val
	 * @returns {Items}
	 */
    set(prop, val) {
        this[prop] = val;
        return this;
    }

    /**
	 * 设置物品说明
	 * @returns {Items}
	 */
    Info(EN, CN) {
        this.info = [EN ?? CN, CN ?? EN];
        return this;
    }

    /**
	 * 使用时的常规效果
	 * the effects when used
	 * @param  {Array<[string, number]|[string, number, 'p']>} effects
	 * @returns
	 */
    Effects(...effects) {
        this.effects = effects;
        return this;
    }

    /**
	 * 使用时的特殊效果
	 * the special effects when used
	 * @param {function} callback
	 * @returns
	 */
    useEffect(callback) {
        this.onUse = callback;
        return this;
    }

    /**
	 * 设置标签
	 * set tags
	 * @param  {string[]} tags
	 * @returns
	 */
    Tags(...tags) {
        this.tags.push(...tags);
        // 去重
        this.tags = Array.from(new Set(this.tags));
        return this;
    }
    /**
	 *
	 * @param {string} param
	 * @param {number} value
	 */
    getPalam(param, value) {
        if (!V.statFreeze && setup.palamlist.includes(param)) V[param] = Math.clamp(V[param] + value, 0, 10000);
    }

    /**
	 * 通用的使用效果处理
	 * set the general effect when used
	 * @param {string} param
	 * @param {number} value
	 * @param {'p'|void} method
	 */
    doDelta(param, value, method) {
        if (param == 'aphrod') {
            this.getPalam('drugged', value);
            param = 'drugged';
        }
        else if (param == 'drunk') {
            this.getPalam('drunk', value);
            param = 'alcohol';
        }
        else {
            if (method == 'p') {
                wikifier(param, value, param == 'arousal' ? 'genital' : null);
            }
            else {
                value = -value;
                wikifier(param, value);
            }
        }
        return P.palams(param, value);
    }

    doEffects(times = 1) {
        return this.effects.reduce((params, [param, value, method]) => {
            value *= times;
            params += this.doDelta(param, value, method);
            return params;
        }, '');
    }
}

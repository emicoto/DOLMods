
class iRecipe {
    static data = {};

    /**
	 * 添加配方
	 * add a recipe
	 * @param {string} id
	 * @param {number} time
	 * @param  {Array<[string, number]>} args
	 * @returns
	 */
    static add(id, time = 10, ...args) {
        if (this.data[id] !== undefined) {
            throw new Error('recipe already exist:', id);
        }
        const _data = new iRecipe(id, time, ...args);
        this.data[id] = _data;
        return this.data[id];
    }

    /**
	 * 作为Obj添加
	 * add a recipe as an object
	 * @param {iRecipe} obj
	 * @returns
	 */
    static set(obj) {
        const { id, time, recipe } = obj;
        if (this.data[id] !== undefined) {
            throw new Error('recipe already exist:', id);
        }

        this.data[id] = new iRecipe(id, time, ...recipe);
        for (const i in obj) {
            this.data[i] = obj[i];
        }

        return this.data[id];
    }

    /**
	 * 批量添加
	 * batch add recipes
	 * @param {Array<iRecipe>} recipes
	 */
    static addRecipes(recipes) {
        recipes.forEach(data => {
            const { id, time, ingredients } = data;
            if (this.data[id] !== undefined) {
                throw new Error('recipe already exist:', id);
            }

            const _data = new iRecipe(id, time, ...ingredients);

            for (const i in data) {
                _data[i] = data[i];
            }
            this.data[id] = _data;
        });
    }
    /**
	 * 根据产出物和合成方法搜索配方
	 * search recipe by production and method
	 * @param {string} production
	 * @param {boolean|1} nocheck
	 * @returns { Array<[ string, iRecipe ]> }
	 */
    static search(itemId, method, nocheck) {
        const database = Object.entries(this.data);

        if (!nocheck) {
            return database.filter(([, data]) =>
                data.production === itemId &&
                data.methods.includes(method) &&
                (!data.lock || data.lock && data.requirement())
            );
        }
		
        return database.filter(([, data]) =>
            data.production === itemId &&
            data.methods.includes(method)
        );
    }
    /**
	 * 根据合成方法搜索配方
	 * search recipe by method
	 * @param {string} method
	 * @param {boolean|1} nocheck
	 * @returns { Array<[ string, iRecipe ]> }
	 */
    static searchMethod(method, nocheck) {
        const database = Object.entries(this.data);

        if (!nocheck) {
            return database.filter(([, data]) =>
                data.methods.includes(method) &&
                (!data.lock || data.lock && data.requirement()));
        }
		
        return database.filter(([, data]) => data.methods.includes(method));
    }
    /**
	 * 根据物品Id搜索配方
	 * search recipe by item id
	 * @param {string} itemId
	 * @param {boolean|1} nocheck
	 * @returns { Array<[ string, iRecipe ]> }
	 */
    static searchItem(itemId, nocheck) {
        const database = Object.entries(this.data);

        if (!nocheck) {
            return database.filter(([, data]) => data.production == itemId && (!data.lock || data.lock && data.requirement()));
        }
		
        return database.filter(([, data]) => data.production == itemId);
    }

    /**
	 * @param {string} id
	 * @param {number} time
	 * @param  {Array<[string, number]>} args
	 */

    constructor(id, time = 10, ...args) {
        this.id = id;
        this.production = id;
        this.givenum = 1;
        this.time = time;
        this.ingredients = args;
        this.methods = ['craft'];

        /*
		this.batchtime = time
		this.batchnum = 10

		this.difficult = 100
		this.skill = 'craft'
		this.lock = true/false
		this.requirement = ()=>{return V.iRecipe[id] !== undefined }

		this.failproduction = itemId
		this.failnum = 1

		this.subproduce = itemId
		this.subnum = 1
		this.subchance = 0.5

		this.onSucces = callback
		this.onFail = callback
		this.customtext = {
			onCraft:['', ''],
			onSucces:['', ''],
			onFail:['', '']
		}

	*/
    }

    /**
	 * 设置制作难度
	 * @param {string} skill
	 * @param {number} difficulty
	 * @returns {iRecipe}
	 */
    Difficulty(skill, difficulty) {
        this.skill = skill;
        this.difficulty = difficulty;
        return this;
    }

    /**
	 * 设置解锁需要的条件(function)
	 * @param {funciton} callback
	 * @returns { iRecipe}
	 */
    Unlock(callback) {
        this.lock = true;
        this.unlock = callback;
        return this;
    }
    /**
	 * 设置副产品
	 * @param {string} itemId
	 * @param {number} num
	 * @param {number} rate 获得副产品的概率
	 * @returns {iRecipe}
	 */
    SubProduction(itemId, num = 1, rate = 80) {
        this.subItem = [itemId, num];
        this.subItemRate = rate;
        return this;
    }

    /**
	 * 设置失败产品
	 * @param {string} itemId
	 * @param {number} num
	 * @returns {iRecipe}
	 */
    FailedItem(itemId, num = 1, rate = 100) {
        this.failedItem = [itemId, num];
        this.failedItemRate = rate;
        return this;
    }

    CustomText(situation, textEN, textCN) {
        if (this.customText) {
            this.customText = {};
        }
        this.customText[situation] = [textEN, textCN];
        return this;
    }

    SuccesEffect(callback) {
        this.onSucces = callback;
        return this;
    }

    FailedEffect(callback) {
        this.onFailed = callback;
        return this;
    }
}

Object.defineProperty(window, 'iRecipe', {
    value        : iRecipe,
    writable     : false,
    enumerable   : true,
    configurable : false
});

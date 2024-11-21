/**
 * InvUI 模块
 * 这个模块提供了库存管理的工具函数，例如获取空物品、解析物品图标路径等。
 */
const InvUI = (() => {
    'use stric';

    /**
     * 返回一个空物品对象。
     * @returns {Object} 包含物品的默认信息：
     * - `id` (string): 物品ID，默认为 'none'
     * - `uid` (string): 物品唯一ID，默认为 'none'
     * - `name` (string): 物品名称，默认为空字符串
     * - `info` (string): 物品信息，默认为空字符串
     * - `count` (string): 物品数量，默认为空字符串
     * - `img` (string): 物品图标路径，默认为 'items/item_none.png'
     */
    function _emptyItem() {
        return {
            id    : 'none',
            uid   : 'none',
            name  : '',
            info  : '',
            count : '',
            img   : 'items/item_none.png'
        };
    }

    /**
     * 解析物品的图标路径。
     * @param {Object} item - 物品对象，包含以下属性：
     * - `id` (string): 物品ID。
     * - `diff` (string, optional): 物品的区别标记。
     * - `count` (number, optional): 物品数量。
     * @returns {string} 图标的路径。
     */
    function _resolveImg(item) {
        const root = `${SFInventory.options.imgRoot}/items`;
        const data = Items.get(item.id);

        if (!item || !data) return `${root}/item_none.png`;
        
        let img = data.img;
        if (data.diff) {
            img = `${root}/${data.type}/${data.id}_${item.diff}.png`;
        }

        img = _resolveStackSprites(img, item, data);

        return img;
    }

    /**
     * 根据物品数量解析叠加图标的路径。
     * @param {string} img - 当前物品图标的路径。
     * @param {Object} item - 物品对象，包含以下属性：
     * - `size` (number, optional): 物品的尺寸。
     * - `count` (number, optional): 物品数量。
     * - `diff` (string, optional): 物品的区别标记。
     * @param {Object} data - 物品的详细信息，包含 `stacksprites` 数组。
     * @returns {string} 更新后的图标路径。
     */
    function _resolveStackSprites(img, item, data) {
        if (!data.stacksprites) return img;

        const size = item.size ?? InvUtil.getMaxSize(data.id);
        const select = new SelectCase();
        const root = `${SFInventory.options.imgRoot}/items`;

        for (let i = 1; i < data.stacksprites.length; i++) {
            const min = data.stacksprites[i - 1];
            const max = i == data.stacksprites.length ? Math.pow(10, 10) :  data.stacksprites[i] - 1;
            let result = `${root}/${data.type}/${data.id}_${min}.png`;

            if (item.diff) {
                result = `${root}/${data.type}/${data.id}_${item.diff}_${min}.png`;
            }
            select.case([min, max], result);
        }
        select.else(data.img);
        img = select.has(Math.floor((item.count / size + 0.5) * 100));

        console.log('image', img, item, data);
        return img;
    }

    /**
     * 显示物品图标的HTML代码。
     * @param {string} itemId - 物品ID。
     * @param {string} diff - 物品的区别标记。
     * @returns {string} 包含图标HTML代码的字符串，或 `undefined` 如果找不到数据。
     */
    function _displayItemIcon(itemId, diff) {
        const data = Items.get(itemId);
        if (!data) return;

        const img = InvUI.resolveImg({ id : itemId, diff, count : data.num });
        const icon = `<img src="${img}" class="icon" alt="${data.name}">`;

        return icon;
    }

    return {
        /**
         * 获取一个空物品对象。
         */
        emptyItem : _emptyItem,

        /**
         * 解析物品图标的路径。
         */
        resolveImg : _resolveImg,

        /**
         * 根据物品的数量解析叠加图标的路径。
         */
        resolveStackSprites : _resolveStackSprites,

        /**
         * 显示物品图标的HTML代码。
         */
        displayItemIcon : _displayItemIcon
    };
})();

const InvUI = (() => {
    'use stric';

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

    function _displayItemIcon(itemId, diff) {
        const data = Items.get(itemId);
        if (!data) return;

        const img = InvUI.resolveImg({ id : itemId, diff, count : data.num });
        const icon = `<img src="${img}" class="icon" alt="${data.name}">`;

        return icon;
    }

    return {
        emptyItem           : _emptyItem,
        resolveImg          : _resolveImg,
        resolveStackSprites : _resolveStackSprites,
        displayItemIcon     : _displayItemIcon
    };
})();

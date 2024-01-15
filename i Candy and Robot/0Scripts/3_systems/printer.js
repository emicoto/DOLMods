const htmlPrinter = {
    palams(palam, value) {
        let gl = 'l';
        let count = 1;
        if (value > 0) {
            gl = 'g';
        }
        if (Math.abs(value) > 30) {
            count = 3;
        }
        else if (Math.abs(value) > 20) {
            count = 2;
        }
        
        if (palam == 'hunger' || palam == 'thirsty') {
            if (Math.abs(value) >= 500) {
                count = 3;
            }
            else if (Math.abs(value) >= 200) {
                count = 2;
            }
        }
    
        if (palam == 'hallucinogen') {
            palam = 'hallucinogens';
        }
        if (palam == 'thirsty') {
            palam = 'thirst';
        }
    
        return `<<${gl.repeat(count)}${palam}>>`;
    },

    itemImageResolve(item, data, shop) {
        if (!item) return 'img/items/item_none.png';
        const size = iStack.getSize(item.id);

        let img = data.img;
        if (item.diff) {
            img = `img/items/${data.type}/${data.id}_${item.diff}.png`;
        }
        if (data.stacksprites) {
            const select = new SelectCase();

            for (let i = 1; i <= data.stacksprites.length; i++) {
                const min = data.stacksprites[i - 1];
                const max = i == data.stacksprites.length ? 10000 :  data.stacksprites[i] - 1;
                let result = `img/items/${data.type}/${data.id}_${min}.png`;
                if (item.diff) {
                    result = `img/items/${data.type}/${data.id}_${item.diff}_${min}.png`;
                }
                select.case([min, max], result);
            }
            select.else(data.img);
            img = select.has(Math.floor((item.count / size + 0.5) * 100));
        }

        if (iCandy.config.debug) console.log('image', img, item, data);
		
        if (data.stacksprites && shop) {
            const len = data.stacksprites.length;
            img = `img/items/${data.type}/${data.id}_${data.stacksprites[len - 1]}.png`;
        }
        return img;
    },

    itemIcons(itemId, diff) {
        const data = Items.get(itemId);
        const item = { id : itemId, diff, count : data.num };

        const img = this.itemImageResolve(item, data);
        return `<img class='icon' src='${img}'>`;
    },

    templet(string, ...args) {
        // check if string is valid
        const isValid = function (str) {
            if (String(str) == '[object Object]' && (str.EN || str.CN)) return true;
            return typeof str === 'string' || Array.isArray(str) || typeof str === 'number';
        };

        const isLan = function (str) {
            return String(str) == '[object Object]' || Array.isArray(str);
        };

        if (!isValid(string)) return;

        if (isLan(string)) {
            string = lanSwitch(string);
        }

        for (let i = 0; i < args.length; i++) {
            let txt = args[i];

            if (!isValid(txt)) continue;

            if (isLan(txt)) {
                txt = lanSwitch(txt);
            }

            string = string.replaceAll(`{${i}}`, txt);
        }
        return string;
    },

    toLower(str) {
        if (String(str) == '[object Object]' && (str.EN || str.CN)) {
            str.EN = str.EN.toLowerCase();
            return str;
        }
		
        if (Array.isArray(str)) {
            str[0] = str[0].toLowerCase();
            return str;
        }

        return str.toLowerCase();
    },

    toUpper(str) {
        if (String(str) == '[object Object]' && (str.EN || str.CN)) {
            str.EN = str.EN.toUpperFirst();
            return str;
        }
        
        if (Array.isArray(str)) {
            str[0] = str[0].toUpperFirst();
            return str;
        }

        return str.toUpperFirst();
    },

    toFull(str) {
        if (String(str) == '[object Object]' && (str.EN || str.CN)) {
            str.EN = str.EN.toUpperCase();
            return str;
        }

        if (Array.isArray(str)) {
            str[0] = str[0].toUpperCase();
            return str;
        }

        return str.toUpperCase();
    },

    toCamel(str) {
        if (String(str) == '[object Object]' && (str.EN || str.CN)) {
            str.EN = str.EN.toCamelCase();
            return str;
        }

        if (Array.isArray(str)) {
            str[0] = str[0].toCamelCase();
            return str;
        }

        return str.toCamelCase();
    },

    pharmacy(itemId, diff) {
        if (!itemId) return ;

        const drug = Items.get(itemId);
        let linkname = '';
        let name = lanSwitch(drug.name);
        if (diff) {
            name += `[${lanSwitch(drug.diff[diff].displayname)}]`;
        }
    
        if (drug.tags.includes('pill')) {
            linkname = `${name}(${drug.num}${lanSwitch('pills per bottle', '粒/瓶')})`;
        }
        else if (drug.tags.includes('liquid')) {
            linkname = `${name}(${drug.num}ml${lanSwitch(' bottle','瓶装')})`;
        }
        else if (drug.tags.includes('cream')) {
            linkname = `${name}(${drug.num}ml${lanSwitch('','支装')})`;
        }
        else if (drug.tags.includes('inject')) {
            linkname = `${name}(${drug.num}${lanSwitch('shots per pack','管/盒')})`;
        }
        else {
            linkname = name;
        }
 
        return `<<itemIcons '${itemId}' '${diff}'>><<link '${linkname}' 'Shop Pharmacy Sale'>><<set $pharmacyItem to Items.get("${itemId}")>><</link>><br>`;
    }
};


//------------------------------------------------------------
//
// Export namespace
//
//------------------------------------------------------------

window.htmlPrinter = htmlPrinter;
Object.defineProperty(window, 'P', { get() { return htmlPrinter; } });


//------------------------------------------------------------
//
// Macro
//
//------------------------------------------------------------

function itemIcons(itemId, diff) {
    if (diff == 'undefined') diff = undefined;
    if (V.options.images == 1) {
        return P.itemIcons(itemId, diff);
    }
    return '';
}


DefineMacroS('itemIcons', itemIcons);
DefineMacroS('iMedicineLink', htmlPrinter.pharmacy);

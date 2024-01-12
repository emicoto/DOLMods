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
            return str && (typeof str === 'string' || Array.isArray(str)) && str.length > 0;
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
    },

    equipment() {
        let html = '';
        const equip = ['held', 'bag', 'wallet', 'cart'];
        equip.forEach(slot => {
            const item = iManager.getEquip(slot);
            html += `<div id='${slot}' class='equipslot'>`;
	
            if (item) {
                const data = Items.get(item.id);
                const img = this.itemImageResolve(item, data);
                let onclick = ` onClick="V.addMsg += Items.get('${item.id}').onUnEquip(); SugarCube.Engine.play(V.passage)"`;
	
                if (iManager.checkAvailable(item).avalaible == false) {
                    onclick = '';
                }

                html += `<mouse class="tooltip-tiny"${onclick}>\n`;
                html += `	<img class='icon' src="${img}">\n`;
                html += `	<span>${lanSwitch(data.info)}\n`;
                html += `	<span class="yellow">${getLan('unequip')}</span>`;
                html += '	</span>';
                html += '</mouse>';
            }
            else {
                html += `<img class='icon' src="img/items/${slot}_none.png">`;
            }
	
            html += '</div>';
        });
	
        return html;
    },

    pockets(slot) {
        let html = '';
        const pocket = Pocket.get(slot);
        const maxslot = pocket.max();

        for (let i = 0; i < maxslot; i++) {
            const item = pocket.slots[i];

            let data = item ? Items.get(item.id) : null;
            if (data && item.diff && data.diff[item.diff].aliasItem) {
                data = Items.get(data.diff[item.diff].aliasItem);
            }

            let itemname = data ? lanSwitch(data.name) : '';
            const itemcount = data ? iData.itemUnit(data, item.count) : '';

            const method = data ? lanSwitch(iData.useMethods(data.type, data.tags)) : '';

            let _html = `<div id='${slot}-${i}' class='pocketslot'>`;
            const img = this.itemImageResolve(item, data);

            if (data && item.diff && !item.tags.includes('equip')) {
                const diff = data.diff[item.diff];
                itemname = lanSwitch(diff.displayname);
            }

            _html += `<div class='itemname'>${itemname}</div>`;
            _html += `<div class='itemcount'>${itemcount}</div>`;
            _html += `<div id='${item ? item.uid : 'noitem'}' class='itemicon'>`;
            if (item) {
                _html += '<mouse class="tooltip-tiny">';
                _html += `	<img class='icon' src="${img}">`;
                _html += data ? `	<span>${lanSwitch(data.info)}</span>` : '';
                _html += '</mouse>';
            }
            else {
                _html += '<img class=\'icon\' src="img/items/item_none.png">';
            }
            _html += '</div>';
            if (data && V.combat == 0 && !V.event) {
                _html += `<div id='action' class='pocketaction'>
				<span class='itemaction'>`;

                if (data.tags.includes('equip')) {
                    _html += `<<link "${getLan('equip')}" $passage>>
						<<set $addMsg += "<<imgIcon '${img}'>>">>
						<<set $addMsg += Items.get('${data.id}').onEquip('${slot}', '${i}');>>
					<</link>>`;
                }
                else if (!data.require && (data.effects.length > 0 || typeof data.onUse == 'function')) {
					 _html += `<<link "${method}" "Actions UseItems">>
					 	<<set $tvar.useItem to ["${slot}", ${i}]>>
						<<set $tvar.img to "${img}">>
						<<if $passage.has("Actions UseItems", "Actions DropItems", "Actions TransferItem") is false>>
							<<set $tvar.exitPassage to $passage>>
						<</if>>
						<<run console.log('on use check', $tvar.useItem, $tvar.img, $tvar.exitPassage)>>
					 <</link>>`;
                }
				
                _html += `</span>
				<span class='itemaction'>
					<<link "${getLan('move')}">>
						<<set $tvar.transferItem to ["${slot}", ${i}]>>
					<</link>>
				</span>
				<span class='itemaction'>
					<<link "${getLan('drop')}" $passage>>
						<<run im.onRemove("${slot}", ${i})>>
					<</link>>
				</span>
				</div>`;
            }
            _html += '</div>';

            if (iCandy.config.debug) console.log(_html);

            html += _html;
        }
        return html;
    },

    noneItem : {
        type : 'misc',
        id   : 'noneitem',
        name : ['none', '无'],
        info : ['', '']
    },

    storage(postion) {
        const html = [];
        const storage = V.iStorage[postion];
        for (let i = 0; i < storage.limit; i++) {
            const item = storage.slots[i] || this.noneItem;
            const data = Items.get(item.id) || this.noneItem;

            const img = this.itemImageResolve(item, data);
            let name = lanSwitch(data.name);
            let _html = '';

            if (item.diff) {
                const diff = data.diff[item.diff];
                name = lanSwitch(diff.displayname);
            }
			
            _html += `<div id='storage-${index}' class='pocketslot no-numberify'>`;
            _html += `	<div class='itemname'>${name}</div>`;
            _html += `	<div class='itemcount'>${iData.itemUnit(data, item.count)}</div>`;
            if (item.count > 1) {
                _html += '	<div id=\'slider\'>';
                _html += `		<input type='range' min='1' max='${item.count}' value='1' step='1' oninput='T.storage[${index}] = $(this).val(); $('#sliderval-${index}').text(T.storage[${index}]);>`;
                _html += `		<span id='sliderval-${index}'>1</span>`;
                _html += '	</div>';
            }
            _html += `	<div id='${item.uid}' class='itemicon'>`;
            _html += '		<mouse class="tooltip-tiny">';
            _html += `			<img class='icon' src="${img}">`;
            if (data.id !== 'noneitem') {
                _html += `			<span>${lanSwitch(data.info)}</span>`;
            }
            _html += '		</mouse>';
            _html += '	</div>';
            if (data.id !== 'noneitem') {
                _html += '	<div id=\'action\' class=\'pocketaction\'>';
                _html += '		<span class=\'itemaction\'>';
                _html += `			<<link "${getLan('takehalf')}">>`;
                _html += `				<<run im.takeSelected("${postion}", ${index}, T.storage[${index}])>>`;
                _html += '			<</link>>';
                _html += '		</span>';
                _html += '		<span class=\'itemaction\'>';
                _html += `			<<link "${getLan('take')}">>`;
                _html += `				<<run im.takeSelected("${postion}", ${index}, T.storage[${index}])>>`;
                _html += '			<</link>>';
                _html += '		</span>';
                _html += '		<span class=\'itemaction\'>';
                _html += `			<<link "${getLan('clearall')}">>`;
                _html += `				<<run im.drop("${postion}", ${index})>>`;
                _html += '			<</link>>';
                _html += '		</span>';
                _html += '	</div>';
            }
            _html += '</div>';

            html.push(_html);
        }
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

const pocketUI = {

    iniData(item, storage) {
        if (!item) return this.emptyItem();
        
        const { id, uid, name, info, count, diff } = item;
        const source = Items.get(id);
        const unit = item.unitSize();

        const UIdata = {
            id,
            uid,
            name  : lanSwitch(name),
            info  : lanSwitch(info),
            count : iData.itemUnit(source, count),
            img   : P.itemImageResolve(item, source),
            type  : source.type
        };

        if (diff) {
            UIdata.name = lanSwitch(source.diff[diff].displayname);
        }

        if (!source.require && (source.effects.length > 0 || typeof source.onUse === 'function')) {
            UIdata.method = P.toUpper(
                lanSwitch(iData.useMethods(source.type, source.tags))
            );
        }

        if (source.tags.includes('equip')) {
            UIdata.method = getLan('equip');
            UIdata.type = 'equip';
        }

        if (storage) {
            UIdata.count = iData.itemUnit(source, unit, count, 1);
        }

        return UIdata;
    },

    emptyItem() {
        const emptyUI = {
            id    : 'none',
            uid   : 'none',
            name  : '',
            info  : '',
            count : '',
            img   : 'img/items/item_none.png'
        };

        return emptyUI;
    },

    pocket(pos) {
        const html = [];
        const pocket = Pocket.get(pos);
        const maxslot = pocket.max();

        for (let i = 0; i < maxslot; i++) {
            const item = pocket.select(i);
            const UIdata = this.iniData(item);
            const { id, uid, name, info, count, img, method, type } = UIdata;

            let _html = `
    <div id="${pos}-${i}" class="pocketslot">
        <div class="itemname">${name}</div>
        <div class="itemcount">${count}</div>
        <div id="${uid}" class="itemicon">`;
            
            if (uid !== 'none') {
                _html += `
            <mouse class="tooltip-tiny">
                <img src="${img}" class="itemimg">
                <span>${info}</span>
            </mouse>
        </div>`;

                //
            }
            else {
                _html += `
            <img src="${img}" class="itemimg">
       </div>`;

                //
            }

            // if empty or disabled on event, end at here
            if (uid == 'none' || !F.noEventRunning()) {
                _html += '</div>';
                html.push(_html);
                continue;
            }

            _html += `
        <div id="action" class="pocketaction">
            <span class="itemaction">`;

            
            if (type == 'equip') {
                _html += `
            <<link "${method}" $passage>>            
                    <<set $addMsg += "<<imgIcon '${img}'>>" >>
                    <<set $addMsg += Items.get("${id}").onEquip("${pos}", "${i}")>>
                <</link>>
            </span>
            <span class='itemaction'>`;

            //
            }
            else if (method) {
                _html += `
            <<link "${method}" "Actions UseItems">>
                <<set $tvar.itemMsg to im.useFromInv("${pos}", ${i})>>
                <<set $tvar.img to "${img}">>
                <<if $passage.has("Actions UseItems", "Actions DropItems", "Actions TransferItem") is false>>
                    <<set $tvar.exitPassage to $passage>>
                <</if>>
                <<run console.log('on use check', $tvar.useItem, $tvar.img, $tvar.exitPassage)>>
            <</link>>
            </span>
            <span class='itemaction'>`;

            //
            }

            _html += `
            <<link "${getLan('move')}">>
                <<run pocketUI.transfer("${pos}", ${i})>>
            <</link>>
            </span>`;

            _html += `
            <span class='itemaction'>
            <<link "${getLan('drop')}" $passage>>
                <<run im.onRemove("${pos}", ${i})>>
            <</link>>
            </span>
        </div>`;

            _html += '</div>';

            if (iCandy.config.debug) console.log('pocketUI', _html);

            html.push(_html);
        }

        return html.join('\n');
    },

    storage(location) {
        const html = [];
        const storage = Pocket.get(location);
        const maxslot = storage.max();

        for (let i = 0; i < maxslot; i++) {
            const item = storage.select(i);
            const UIdata = this.iniData(item, 1);
            const { uid, name, info, count, img } = UIdata;
            
            if (uid !== 'none') T.storage[i] = 1;

            let _html = `
    <div id="storage-${i}" class="pocketslot no-numberify">
        <div class="itemname">${name}</div>
        <div class="itemcount">${count}</div>`;
            
            if (item && item.count > 1) {
                _html += `
        <div id="slider">
            <input type="range" min="1" max="${item.count}" value="1" step="1" oninput="T.storage[${i}] = $(this).val(); $('#sliderval-${i}').text(T.storage[${i}]);">
            <span id='sliderval-${i}'>1</span>
        </div>`;

            //
            }

            _html += `
        <div id="${uid}" class="itemicon">`;
            
            if (uid !== 'none') {
                _html += `
            <mouse class="tooltip-tiny">
                <img src="${img}" class="itemimg">
                <span>${info}</span>
            </mouse>`;

            //
            }
            else {
                _html += `
                <img src="${img}" class="itemimg">`;
            }
        
            _html += `
        </div>`;

            // if empty, end at here
            if (uid == 'none') {
                _html += '</div>';
                html.push(_html);
                continue;
            }

            _html += `
        <div id="action" class="pocketaction">`;
            
            if (location.has('bag', 'cart')) {
                _html += `
            <span class="itemaction">
                <<link "${method}" "Actions UseItems">>
                    <<set $tvar.useItem to ["${location}", ${i}]>>
                    <<set $tvar.img to "${img}">>
                    <<if $passage.has("Actions UseItems", "Actions DropItems", "Actions TransferItem") is false>>
                        <<set $tvar.exitPassage to $passage>>
                    <</if>>
                    <<run console.log('on use check', $tvar.useItem, $tvar.img, $tvar.exitPassage)>>
                <</link>>
            </span>`;

            //
            }
    
            _html += `
            <span class="itemaction">
                <<link "${getLan('take')}" $passage>>
                    <<run V.addMsg = im.takeStorage("${location}", ${i}, T.storage[${i}])>>
                <</link>>
            </span>
            <span class="itemaction">
                <<link "${getLan('clearall')}" $passage>>
                    <<run im.drop("${location}", ${i})>>
                <</link>>
            </span>
        </div>`;

            _html += '</div>';
            if (iCandy.config.debug) console.log('pocketUI', _html);

            html.push(_html);
        }

        return html.join('\n');
    },

    wallet() {
        const html = [];
        const wallet = Pocket.get('wallet');
        const maxslot = wallet.max();

        for (let i = 0; i < maxslot; i++) {
            const item = wallet.select(i);
            const UIdata = this.iniData(item);
            const { uid, name, info, count, img } = UIdata;
        }

        return html.join('\n');
    },

    equipment() {
        const html = [];
        const equip = ['held', 'bag', 'cart', 'wallet'];
        equip.forEach(slot => {
            const item = iManager.getEquip(slot);
            let _html = `<div id='${slot}' class='equipslot'>`;
	
            if (item) {
                const data = Items.get(item.id);
                const img = P.itemImageResolve(item, data);
                let onclick = ` onClick="V.addMsg += Items.get('${item.id}').onUnEquip(); SugarCube.Engine.play(V.passage)"`;
	
                if (!iManager.checkUnequip(item) && slot !== 'held') {
                    onclick = '';
                }

                _html += `<mouse class="tooltip-tiny"${onclick}>\n`;
                _html += `	<img class='icon' src="${img}">\n`;
                _html += `	<span>${lanSwitch(data.info)}\n`;
                _html += `	<span class="yellow">${getLan('unequip')}</span>`;
                _html += '	</span>';
                _html += '</mouse>';
            }
            else {
                _html += `<img class='icon' src="img/items/${slot}_none.png">`;
            }
	
            _html += '</div>';

            if (iCandy.config.debug) console.log('pocketUI', _html);

            html.push(_html);
        });

        
        // 如果装备了钱包，则跟在最后尾显示卡槽
        /* if (iManager.getEquip('wallet')) {
            _html += this.wallet();
        } */
	
        return html.join('\n');
    },

    transfer(pos, slot) {
        const _item = Pocket.get(pos).select(slot);
        const item = this.iniData(_item, 1);
        const checklist = Pocket.list;
        checklist.push('wallet');

        if (V.tvar.storage) {
            checklist.push(V.tvar.storage);
        }

        const list = checklist.reduce((result, key) => {
            if (key == pos) return result;
            if (im.storeable(key, pos, slot)) {
                const equip = iManager.getEquip(key);
                const obj = {
                    key,
                    name : equip?.name || iData.storage[key]
                };
                result.push(obj);
            }
            return result;
        }, []);

        let html = `要将<img class='icon' src='${img}'><span class='teal'>${item.name}</span>移动到哪里？<br><br>`;

        list.forEach(obj => {
            const { key, name } = obj;
            html += `
            <span class='itemaction'>
                <<link ${lanSwitch(name)} $passage>>
                    <<run V.addMsg = im.putStorage('${key}', '${pos}', ${slot}, ${item.count})>>
                    <<addclass '#messageBox' 'hidden'>>
                    <<addclass '#background' 'hidden'>>
                <</link>>
            </span>`;
        });

        html += `
        <span class='itemaction'>
        <<link ${lanSwitch(['Cancel', '取消'])}>>
            <<addclass '#messageBox' 'hidden'>>
            <<addclass '#background' 'hidden'>>
        <</link>>
    </span>`;

        new Wikifier(null, `<<replace #messageBox>>${html}<</replace>><<removeclass #messageBox 'hidden'>><<removeclass #background 'hidden'>>`);
    }
};

Object.defineProperty(window, 'pocketUI', { value : pocketUI });

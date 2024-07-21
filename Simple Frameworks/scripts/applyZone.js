
const ApplyZone = (() => {
    'use strict';

    const mapContent = ['Places of', 'Points of', '可访问地点', '感兴趣地点'];

    const nextContent = ['Next', '继续', 'Continue', '下一步', 'Accept', 'Refuse', 'Reject', '接受', '拒绝', 'Finish', 'End', '结束', 'Obey', '遵从', '服从', '遵命', '听从', '听命', 'Ignore', '忽略', '无视', '不理', '忽略', 'Agree', 'Nod', '同意', '点头', 'Deny', 'Disagree','否认', '反对', 'Decline', 'Run', '跑'];

    const lastContent = ['Setting', '设置', 'Option', 'Config', 'Leave', '离开', '出去', 'Get Out'];

    function removeEmptyTextNode(node) {
        if (node?.nodeName === '#text') {
            return node.textContent.replace(/[\t\n]/gim, '').trim();
        }
        return null;
    }

    function createDiv(id) {
        const div = document.createElement('div');
        div.id = id;
        return div;
    }

    function findValidPrevNode(node) {
        const prev = node.previousSibling;
        const txt = removeEmptyTextNode(prev);
        if (txt !== null && txt.length === 0) {
            return findValidPrevNode(prev);
        }
        return prev;
    }

    function isMacroLink(node) {
        return node?.nodeName === 'A' && node.classList.contains('macro-link');
    }

    function isIconImg(node) {
        return node?.nodeName === 'IMG' && node.classList.contains('icon');
    }

    function isBreakline(node) {
        return node?.nodeName === 'BR' || node?.nodeName === 'DIV' || node?.nodeName === 'HR';
    }

    function isMap(node) {
        return node?.nodeName.has('svg', 'SVG') || node?.nodeName === 'DIV' && node.id == 'divmap';
    }

    function isText(node) {
        return node?.nodeName === '#text' || node?.nodeName === 'SPAN' || node?.nodeName === 'U' || node?.nodeName === 'I' || node?.nodeName === 'B';
    }

    function eventCheck() {
        const event = V.event;

        if (!event || typeof T.eventpoolRunning === 'string') {
            return false;
        }

        const eventBuffer = event.buffer;
        for (const buffer of eventBuffer) {
            for (const area of buffer.area) {
                if (area.includes('events')) {
                    return true;
                }
            }
        }

        return false;
    }

    class ApplyZone {
        static instance = null;
        static applyZone(id = 'passage-content') {
            ApplyZone.instance ??= new ApplyZone(id);
            ApplyZone.instance.id = id;
            ApplyZone.instance.apply();
        
            return ApplyZone.instance.getDebug();
        }
        static applyCombat(id = 'passage-content') {
            ApplyZone.instance ??= new ApplyZone(id);
            ApplyZone.instance.id = id;
            ApplyZone.instance.applyCombat();

            return ApplyZone.instance.getDebug();
        }

        constructor(id = 'passage-content') {
            this._id = id;
            this.resetSanity();
        }
        get id() {
            return this._id;
        }
        set id(value) {
            if (this._id === value) {
                return;
            }
            this._id = value;
            this.resetSanity();
        }
        get el() {
            return  document.getElementById(this.id);
        }
        get nodes() {
            return this.el?.childNodes ;
        }
        get nodeList() {
            const nodes = this.nodes;
            return nodes ? [...nodes.values()].filter(node => node) : [];
        }
        resetSanity() {
            this.onMap = false;
            this.hasNext = false;
            this.msgZone = null;
            this.beforeLink = null;
            this.extraLink = null;
            this.functionPage = false;
        }
        removeUnusedNode() {
            const nodelist = this.nodeList;
            const removeList = [];
            const nodesLength = nodelist.length;
            for (let i = 0; i < nodesLength; i++) {
                const node = nodelist[i];
                switch (node?.nodeName) {
                case '#text':
                // eslint-disable-next-line no-case-declarations
                    const txt = removeEmptyTextNode(node);
                    if (txt === null) {
                        continue;
                    }
                    // eslint-disable-next-line no-case-declarations
                    const prev = i - 1 >= 0 ? nodelist[i - 1].nodeName == 'IMG' : false;
                    // eslint-disable-next-line no-case-declarations
                    const next = i + 1 < nodesLength ? nodelist[i + 1].nodeName == 'A' : false;
                    if (txt.length === 0 && !prev && !next) {
                        removeList.push(node);
                    }
                    break;
                }
            }
            const el = this.el;
            removeList.forEach(node => {
                el.removeChild(node);
            });
        }
        sanityCheck() {
            this.resetSanity();
            
            const el = this.el;
            const innerHTML = this.el?.innerHTML;
            const nodes = this.nodeList;
            for (const node of nodes) {
                if (node?.nodeName === '#text' && node.textContent.has(mapContent)) {
                    this.onMap = true;
                }
                if (node?.nodeName === 'A' && node.classList.contains('macro-link') && node.textContent.has(nextContent)) {
                    this.hasNext = true;
                }
            }

            if (innerHTML.has('addAfterMsg')) {
                this.msgZone = el.querySelector('#addAfterMsg');
            }

            if (innerHTML.has('beforeLink')) {
                this.beforeLink = el.querySelector('#beforeLink');
            }

            if (innerHTML.has('extraLink')) {
                this.extraLink = el.querySelector('#extraLink');
            }
            if (this.el.querySelector('input')) {
                this.functionPage = true;
            }
        }
        apply() {
            if (this.el == null) {
                return;
            }

            this.removeUnusedNode();
            this.sanityCheck();

            if (this.msgZone == null) {
                this.applyMsg();
            }

            if (this.functionPage) {
                return;
            }

            const links = this.el.querySelectorAll('.macro-link');

            // no link zone on event page and streetevent page and aleast has 2 links
            if (links.length <= 1 || eventCheck() || this.hasNext === true) {
                return;
            }

            if (this.beforeLink == null) {
                this.applyBeforeLink();
            }

            // no extra link zone on some page aleast has 3 links
            if (links.length <= 2) {
                return;
            }

            if (this.extraLink == null) {
                this.applyExtraLink();
            }
        }

        applyCombat() {
            if (this.el == null) {
                return;
            }

            this.removeUnusedNode();
            this.sanityCheck();

            if (this.msgZone == null) {
                this.applyMsgCombat();
            }
        }

        getDebug() {
            return {
                el      : this.el,
                nodes   : this.nodes,
                onMap   : this.onMap,
                hasNext : this.hasNext,
                msgZone : this.msgZone,
                before  : this.beforeLink,
                extra   : this.extraLink
            };
        }

        applyMsg() {
            const list = [];
            for (const node of this.nodeList) {
                if (isIconImg(node) || isMacroLink(node) || node.textContent.has(mapContent)) {
                    break;
                }
                list.push(node);
            }

            let lastText = null;
            for (let i = list.length - 1; i >= 0; i--) {
                const node = list[i];
                if (isText(node)) {
                    lastText = node;
                    break;
                }
            }

            // insert div after last text node;
            const addMsg = createDiv('addAfterMsg');
            this.msgZone = addMsg;
            lastText.parentNode.insertBefore(addMsg, lastText.nextSibling);
        }

        applyMsgCombat() {
            let node = null;
            const addMsg = createDiv('addAfterMsg');
            this.msgZone = addMsg;

            const stalk = this.el.querySelector('.div_stalk');
            
            if (stalk !== null) {
                stalk.parentNode.insertBefore(addMsg, stalk);
                return;
            }
            // find text div before the status div
            const divs = this.el.querySelectorAll('div');
            for (let i = 0; i < divs.length; i++) {
                if (divs[i].innerHTML.count('<span class=') == 4 && divs[i].innerHTML.count('<br>') == 2) {
                    node = divs[i - 1];
                    break;
                }
            }
            node.appendChild(addMsg);
        }

        applyBeforeLink() {
            const link = this.el.querySelector('.macro-link');

            // check if the previous valid node isnot br and div and hr
            let prev = findValidPrevNode(link);

            // if not found then just insert to the lastSibling
            if (prev == null) {
                prev = link.previousSibling;
            }

            // if still not found then just insert before the link
            if (prev == null) {
                prev = link;
            }

            if (!isBreakline(prev)) {
            // then find the previous br or div
                let start = 0;
                const nodes = this.nodes;
                for (let i = 0; i < nodes.length; i++) {
                    if (!nodes[i]) continue;

                    if (nodes[i] === link) {
                        start = i;
                        break;
                    }
                }

                for (let i = start; i > 0; i--) {
                    const node = nodes[i];
                    if (!node) continue;
                    if (isBreakline(node)) {
                        prev = node;
                        break;
                    }
                }
            }

            console.log('[SFDebug] prevNode:', prev);

            const beforeLink = createDiv('beforeLink');
            prev.parentNode.insertBefore(beforeLink, prev.nextSibling);
            this.beforeLink = beforeLink;

            new Wikifier(null, '<<append #beforeLink>><<BeforeLinkZone>><</append>>');
        }

        applyExtraLink() {
        // find get out/get in img or setting link or leave link or svg
            const nodes = this.nodeList;
            let lastNode = null;

            for (const node of nodes) {
                if (isIconImg(node) && node.src.has('get_out', 'get_in')) {
                    lastNode = node;
                    break;
                }
                else if (isMacroLink(node) && node.textContent.has(lastContent)) {
                    lastNode = node;
                    if (findValidPrevNode(node).nodeName === 'IMG') {
                        lastNode = findValidPrevNode(node);
                    }
                    break;
                }
                else if (V.options.mapTop !== true && isMap(node)) {
                    lastNode = node;
                    console.log('[SFDebug] mapNode:', node);
                    break;
                }
            }

            if (lastNode == null && this.onMap) {
                lastNode = nodes[nodes.length - 1];
            }

            const extraLink = createDiv('extraLink');
            if (lastNode != null) {
                lastNode.parentNode.insertBefore(extraLink, lastNode);
                new Wikifier(null, '<<append #extraLink>><<ExtraLinkZone>><</append>>');
            }
            this.extraLink = extraLink;
        }
    }

    Object.defineProperties(window, {
        eventCheck : { value : eventCheck },
        createDiv  : { value : createDiv }
    });

    return ApplyZone;
})();

Object.defineProperty(window, 'ApplyZone', {
    value        : ApplyZone,
    writable     : false,
    configurable : false
});


Macro.delete('runeventpool');

Macro.add('runeventpool', {
    skipArgs : true,
    handler() {
        let pick = T.eventpool.find(e => e.name === V.eventPoolOverride);
        if (pick) {
            delete V.eventPoolOverride;
        }
        else if (T.eventpool.includes(V.eventPoolOverride)) {
            pick = V.eventPoolOverride;
            delete V.eventPoolOverride;
        }
        else {
            pick = rollWeightedRandomFromArray(T.eventpool);
        }
        if (!pick) throw new Error('Event pool is empty');
        // Jimmy: For tracking where in the code you may be.
        // E.G: ['eventAmbient', >>'autumn_anystreet_2'<<, 'generate1']
        T.eventpoolRunning = pick.name;
        console.log('[SFDebug/runeventpool] EventPool:', T.eventpoolRunning, pick);

        DOL.Stack.push(pick.name);
        jQuery(this.output).wiki(pick.content);
        DOL.Stack.pop();
    }
});

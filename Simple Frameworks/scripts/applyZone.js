const ApplyZone = (() => {
    'use strict';

    const mapContent = ['Places of', 'Points of', '可访问地点', '感兴趣地点', 'Travel', '其他区域', '快捷小路', 'Alternate Routes'];

    const nextContent = ['Next', '继续', 'Continue', '下一步', 'Accept', 'Refuse', 'Reject', '接受', '拒绝', 'Finish', 'End', '结束', 'Obey', '遵从', '服从', '遵命', '听从', '听命', 'Ignore', '忽略', '无视', '不理', '忽略', 'Agree', 'Nod', '同意', '点头', 'Deny', 'Disagree','否认', '反对', 'Decline'];

    const lastContent = ['Setting', '设置', 'Option', 'Config', 'Leave', '离开', '出去', 'Get Out','Get out', 'Sneak', '溜走', '潜入', '进去', '进门', '出门', 'Get in', 'Get In'];
    const entranceImg = ['get_out', 'get_in', 'stair', 'door', 'ladder'];

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
        return node?.nodeName == 'A' && node?.classList.contains('macro-link') || node?.nodeName == 'button';
    }

    function isIconImg(node) {
        if (node?.nodeName === 'SPAN' && (node.classList.contains('icon') || node.classList.contains('icon-container'))) {
            return true;
        }
        return node?.nodeName === 'IMG' && node.classList.contains('icon') && (isInteractive(node.nextElementSibling) === true || node?.onClick !== null);
    }

    function isBreakline(node) {
        return node?.nodeName === 'BR' || node?.nodeName === 'HR';
    }

    function isMap(node) {
        return node?.nodeName.has('svg', 'SVG') || node?.nodeName === 'DIV' && node.id == 'divmap';
    }

    function isText(node) {
        return node?.nodeName === '#text' || node?.nodeName === 'SPAN' || node?.nodeName === 'U' || node?.nodeName === 'I' || node?.nodeName === 'B' || node?.nodeName === 'STRONG' || node?.nodeName === 'DIV' && node.innerHTML.has('input', 'textarea', 'select') === false;
    }

    function isInteractive(node) {
        return isMacroLink(node) || isInput(node) || node?.nodeName === 'BUTTON' || node?.nodeName === 'MOUSE' || node?.onClick !== null;
    }


    function eventCheck() {
        const event = V.event;

        if (typeof event === 'undefined' || event?.length === 0) {
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

        if (typeof T.eventpoolRunning === 'string') {
            return true;
        }

        if (V.phase !== 0) {
            return true;
        }

        return false;
    }

    function hasInput(doc) {
        return doc.querySelector('input') || doc.querySelector('textarea') || doc.querySelector('select') || doc.querySelector('mouse');
    }

    function isInput(node) {
        return node?.nodeName === 'INPUT' || node?.nodeName === 'TEXTAREA' || node?.nodeName === 'SELECT';
    }

    function findInteractiveElement(parentNode) {
        const nodes = parentNode.childNodes;
        for (const node of nodes) {
            if (isMacroLink(node)) {
                return node;
            }
            if (isInput(node) === false && node.childNodes.length > 0) {
                const el = findInteractiveElement(node);
                if (el) {
                    return el;
                }
            }
        }
        return null;
    }

    function getAllElements(node) {
        const nodes = [];
        const children = $(node).children();
        for (const child of children) {
            if (!child) continue;
            
            if (child.nodeName === 'DIV' && $(child).children().length > 0) {
                nodes.push(...getAllElements(child));
                continue;
            }
            
            nodes.push(child);
        }
        return nodes;
    }

    function getAllNodes(node) {
        const nodes = [];
        const children = node.childNodes;
        for (const child of children) {
            if (!child) continue;

            if (child.nodeName === 'DIV' && child.childNodes.length > 0) {
                nodes.push(...getAllNodes(child));
                continue;
            }
            nodes.push(child);
        }
        return nodes;
    }

    function removeUnusedNode(node) {
        const nodelist = node.childNodes;
        const removeList = [];
        const nodesLength = nodelist.length;
        for (let i = 0; i < nodesLength; i++) {
            const node = nodelist[i];

            switch (node?.nodeName) {
            case 'DIV':
                removeUnusedNode(node);
                break;

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
        removeList.forEach(node => {
            node.parentNode.removeChild(node);
        });
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
        // eslint-disable-next-line class-methods-use-this
        get allElements() {
            return getAllElements(this.el);
        }

        // eslint-disable-next-line class-methods-use-this
        get allNodes() {
            return getAllNodes(this.el);
        }

        resetSanity() {
            this.onMap = false;
            this.hasNext = false;
            this.msgZone = null;
            this.beforeLink = null;
            this.extraLink = null;
            this.functionPage = false;
        }
        sanityCheck() {
            this.resetSanity();

            const el = this.el;
            if (el == null) return;

            const innerHTML = this.el.innerHTML;
            const nodes = this.allNodes;
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
            if (hasInput(this.el)) {
                this.functionPage = true;
            }
        }
        apply() {
            if (this.el == null) {
                return;
            }

            removeUnusedNode(this.el);
            this.sanityCheck();

            if (this.msgZone == null) {
                this.applyMsg();
            }

            // no link zone on function page
            if (this.functionPage) {
                return;
            }

            const links = this.el.querySelectorAll('.macro-link');

            // no link zone on event page and streetevent page
            if (eventCheck() || this.hasNext === true) {
                return;
            }

            if (this.beforeLink == null) {
                this.applyBeforeLink();
            }

            // no extra link zone on some page aleast has 2 links
            if (links.length <= 1) {
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

            removeUnusedNode(this.el);
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
            for (const node of this.allNodes) {
                if (isIconImg(node) || isMacroLink(node) || node.textContent.has(mapContent) || node.nodeName === 'HR' || isInput(node)) {
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
            // if not found then just after to last node
            if (lastText == null && list.length > 0) {
                lastText = list[list.length - 1];
            }
            // if still not found then just insert to the beginning
            else if (lastText == null) {
                lastText = this.allNodes[0];
            }

            // insert div after last text node;
            const addMsg = createDiv('addAfterMsg');
            this.msgZone = addMsg;
            lastText.parentNode.insertBefore(addMsg, lastText.nextSibling);
        }

        applyMsgCombat() {
            let node = null;
            const addMsg = createDiv('addAfterMsg');

            const stalk = this.el.querySelector('.div_stalk');
            
            if (stalk !== null) {
                stalk.parentNode.insertBefore(addMsg, stalk);
                return;
            }
            // find text div before the status div
            const divs = this.el.querySelectorAll('div');
            for (let i = 0; i < divs.length; i++) {
                if (divs[i].innerHTML.includes('macro-timed')) {
                    node = divs[i - 2];
                    break;
                }
            }
            if (!node) {
                node = divs[1];
            }
            if (node) {
                node.appendChild(addMsg);
                this.msgZone = addMsg;
            }
        }

        applyBeforeLink() {
            const link = this.el.querySelector('.macro-link');

            // check if has previous elements sibling
            let prev = link.previousElementSibling;

            // if previous is icon then find the previous element, if not found just keep it
            if (prev && isIconImg(prev)) {
                if (prev.previousElementSibling) {
                    prev = prev.previousElementSibling;
                }
                else {
                    prev = prev.previousSibling;
                }
            }

            // if don't has element before means this is not valid page
            if (prev == null) {
                return;
            }

            console.log('[SFDebug] prevNode:', prev);

            const beforeLink = createDiv('beforeLink');
            prev.parentNode.insertBefore(beforeLink, prev.nextSibling);
            
            this.beforeLink = beforeLink;

            new Wikifier(null, '<<append #beforeLink>><<BeforeLinkZone>><</append>>');
        }

        applyExtraLink() {
            // find get out/get in img or setting link or leave link or svg
            const nodes = this.allNodes;
            let lastNode = null;

            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];

                if (isIconImg(node) && node?.src?.has(entranceImg)) {
                    lastNode = node;
                    console.log('[SFDebug] lastNode:',i, lastNode);
                    break;
                }
                else if (isMacroLink(node) && node.textContent.has(lastContent)) {
                    lastNode = node;
                    if (lastNode.previousElementSibling && lastNode.previousElementSibling.nodeName === 'IMG') {
                        lastNode = lastNode.previousElementSibling;
                    }
                    console.log('[SFDebug] lastNode:',i, lastNode);
                    break;
                }
                else if (V.options.mapTop !== true && isMap(node)) {
                    lastNode = node;
                    console.log('[SFDebug] mapNode:',i, node);
                    break;
                }
            }

            if (lastNode == null && this.onMap) {
                lastNode = nodes[nodes.length - 1];
            }

            if (lastNode == null) return;

            const extraLink = createDiv('extraLink');
            lastNode.parentNode.insertBefore(extraLink, lastNode);
            new Wikifier(null, '<<append #extraLink>><<ExtraLinkZone>><</append>>');
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

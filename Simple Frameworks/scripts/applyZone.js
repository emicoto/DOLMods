
const ApplyZone = (() => {
    'use strict';

    const mapContent = ['Places of', 'Points of', '可访问地点', '感兴趣地点'];

    const nextContent = ['Next', '继续', 'Continue', 'Move on', '前进', '下一步'];

    const lastContent = ['Setting', '设置', 'Option', 'Config', 'Leave', '离开', '出去', 'Get Out'];

    function removeEmptyTextNode(node) {
        if (node.nodeName !== '#text') {
            return null;
        }
        return node.textContent.replace(/[\t\n]/gim, '').trim();
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
        return node.nodeName === 'A' && node.classList.contains('macro-link');
    }

    function isIconImg(node) {
        return node.nodeName === 'IMG' && node.classList.contains('icon');
    }

    function isBreakline(node) {
        return node.nodeName === 'BR' || node.nodeName === 'DIV' || node.nodeName === 'HR';
    }

    function isMap(node) {
        return node.nodeName.has('svg', 'SVG') || node.nodeName === 'DIV' && node.id == 'divmap';
    }

    function isText(node) {
        return node.nodeName === '#text' || node.nodeName === 'SPAN' || node.nodeName === 'U' || node.nodeName === 'I' || node.nodeName === 'B';
    }

    class ApplyZone {
        static instance = null;
        static applyZone(id = 'passage-content') {
            ApplyZone.instance ??= new ApplyZone(id);
            ApplyZone.instance.id = id;
            ApplyZone.instance.apply();
        
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
            return this.el.childNodes;
        }
        resetSanity() {
            this.onMap = false;
            this.hasNext = false;
            this.msgZone = null;
            this.beforeLink = null;
            this.extraLink = null;
        }
        removeUnusedNode() {
            const nodelist = this.el.childNodes;
            const removeList = [];
            const nodesLength = nodelist.length;
            for (let i = 0; i < nodesLength; i++) {
                const node = nodelist[i];
                switch (node.nodeName) {
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
            const el = this.el;
            const innerHTML = this.el.innerHTML;
        
            this.resetSanity();

            if (innerHTML.has(mapContent)) {
                this.onMap = true;
            }
            else if (innerHTML.has(nextContent)) {
                this.hasNext = true;
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
        }
        apply() {
            this.removeUnusedNode();
            this.sanityCheck();

            if (this.msgZone == null) {
                this.applyMsg();
            }

            if (this.beforeLink == null) {
                this.applyBeforeLink();
            }

            if (this.extraLink == null) {
                this.applyExtraLink();
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
            for (const node of this.nodes) {
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

        applyBeforeLink() {
            const link = this.el.querySelector('.macro-link');

            // check if the previous valid node isnot br and div and hr
            let prev = findValidPrevNode(link);
            if (!isBreakline(prev)) {
            // then find the previous br or div
                let start = 0;
                const nodes = this.nodes;
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i] === link) {
                        start = i;
                        break;
                    }
                }

                for (let i = start; i > 0; i--) {
                    const node = nodes[i];
                    if (isBreakline(node)) {
                        prev = node;
                        break;
                    }
                }
            }

            console.log('prev:', prev);

            const beforeLink = createDiv('beforeLink');
            prev.parentNode.insertBefore(beforeLink, prev.nextSibling);
            this.beforeLink = beforeLink;

            new Wikifier(null, '<<append #beforeLink>><<BeforeLinkZone>><</append>>');
        }

        applyExtraLink() {
        // find get out/get in img or setting link or leave link or svg
            const nodes = this.nodes;
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
                    console.log('map:', node);
                    break;
                }
            }

            if (lastNode == null && (this.onMap || !this.hasNext)) {
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

    return ApplyZone;
})();

Object.defineProperty(window, 'ApplyZone', {
    value        : ApplyZone,
    writable     : false,
    configurable : false
});

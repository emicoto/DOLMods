/**
 * @typedef { string[] | { CN:string, EN:string} } language
 */

const htmlTools = {
    /**
     * @description append a new div with id before the first image or link in div passage-content
     * @param {string} eId
     * @returns {HTMLElement}
     * @example
     * appendPatch('<<anywidget>>')
     * will append a new div with id extraContent and content <<anywidget>>
     *
     * appendPatch('myContent', '<<anywidget>>')
     * 'myContent' is the id of the new div, and <<anywidget>> is the content
     *
     * appendPatch()
     * will just append a new div with id 'extraContent'
     */
    appendPatch(pos, ...args) {
        let eId;
        let content = '';

        switch (args.length) {
        case 0:
            eId = 'extraContent';
            break;
        case 1:
            eId = 'extraContent';
            content = args[0];
            break;
        default:
            eId = args[0];
            content = args[1];
            break;
        }

        if (pos == 'before') {
            // find the first image in div passage-content, else find the first link
            let element = document.querySelector('#passage-content .macro-link');
            // check if has image before link
            if (element && element.previousElementSibling.tagName == 'IMG') {
                element = element.previousElementSibling;
            }

            // make a new div with id extraContent
            const div = document.createElement('div');
            div.id = eId;

            // insert the new div before the element
            element.insertAdjacentElement('beforebegin', div);
            new Wikifier(null, `<<append "#${eId}">>${content}<</append>>`);

            return div;
        }

        // if position is after, then find the last link in div passage-content
        const dom = document.getElementById('passage-content');
        const links = dom.getElementsByClassName('macro-link');
        const element = links[links.length - 1];
        
        const div = document.createElement('div');
        div.id = eId;
        element.insertAdjacentElement('afterend', div);
        new Wikifier(null, `<<append "#${eId}">>${content}<</append>>`);

        return div;
    },

    append(pos, eId) {
        let element = this.createDiv(eId);

        switch (pos) {
        case 'before':
            element = this.appendPatch(pos, eId);
            break;
        case 'after':
            element = this.appendPatch(pos, eId);
            break;
        case 'beforemain':
            document.getElementById('passage-content').insertAdjacentElement('afterbegin', element);
            break;
        case 'aftermain':
            document.getElementById('passage-content').insertAdjacentElement('beforeend', element);
            break;
        }

        return element;
    },

    /**
     * @description replace the oldlink with newlink
     * @param {string | language} oldlink
     * @param {string} newlink
     * @returns {HTMLElement}
     * @example
     * replaceLink('oldlink', '<<link newlink>><</link>>')
     * replacelink({CN:'旧链接', EN:'oldlink'}, '<<link newlink>><</link>>')
    */
    replaceLink(oldlink, newlink) {
        if (typeof oldlink == 'object') {
            oldlink = lanSwitch(oldlink);
        }

        // find the oldlink in elements
        const links = document.getElementsByClassName('macro-link');
        let elements;
        for (let i = 0; i < links.length; i++) {
            if (links[i].innerHTML.has(oldlink)) {
                // replace the oldlink with newlink
                elements = links[i];
                break;
            }
        }
        if (!elements) return;

        // replace the oldlink with newlink
        const parent = elements.parentNode;
        const newlinkPatch = document.createElement('div');
        newlinkPatch.id = 'patchlink';
        parent.replaceChild(newlinkPatch, elements);

        // wikifier the newlink
        new Wikifier(null, `<<replace "#patchlink">>${newlink}<</replace>>`);

        return newlinkPatch;
    },

    get applyCount() {
        return this._count ?? 0;
    },

    set applyCount(value) {
        this._count = value;
    },

    _count : 0,

    createDiv(eId = 'patchContent') {
        const element = document.getElementById(eId);
        if (element) {
            return element;
        }

        const div = document.createElement('div');
        div.id = eId;
        return div;
    },

    wikify(eId = 'patchContent', content) {
        new Wikifier(null, `<<append "#${eId}">>${content}<</append>>`);
    },

    /**
     * @description append content to certain element.
     * first parameter is the type of element, it can be 'text', 'link', 'div', 'span', 'u', 'b', 'i'
     * second parameter is the id of the element or the text of the element
     * third parameter is the content to append
     * fourth parameter can set the id of the new div
     * @param {string} tag
     * @param {string | language | LangType} txt
     * @param {string} content
     * @example
     * appendTo('text', 'you're townie.', '<<anywidget>> or text')
     * - will append a new div with content after the specified text node
     * appendTo('link', ['ENLinkText', 'CNLinkText'], '<<anywidget>> or text')
     * - will append a new div with content after the specified link
     * appendTo('div', 'divId', '<<anywidget>> or text')
     * - will append a new div with content after the specified div
     */
    appendTo(tag, txt, content, divId = null) {
        const eType = tag;
        const eId = txt;
        const count = this.applyCount + 1;
        const dId = divId === null ? `patch${tag}${count}` : divId;

        // if the tag is a text node
        if (eType === 'text') {
            const textNodes = document.getElementById('passage-content').childNodes;
            const txt = lanSwitch(eId);
            let node;
            for (let i = 0; i < textNodes.length; i++) {
                if (textNodes[i].textContent.has(txt)) {
                    node = textNodes[i];
                    break;
                }
            }
            // append the content after the text node
            const div = this.createDiv(dId);
            node.parentNode.insertBefore(div, node.nextSibling);
            this.wikify(dId, content);
        }
        else if (eType === 'link') {
            const links = document.getElementsByClassName('macro-link');
            const txt = lanSwitch(eId);
            let node;
            for (let i = 0; i < links.length; i++) {
                if (links[i].textContent.has(txt)) {
                    node = links[i];
                    break;
                }
            }
            // append the content after the link
            const div = this.createDiv(dId);
            node.parentNode.insertBefore(div, node.nextSibling);
            this.wikify(dId, content);
        }
        else if (eType === 'span' || eType === 'u' || eType === 'b' || eType === 'i') {
            let nodes;
            switch (eType) {
            case 'span':
                nodes = document.getElementsByTagName('span');
                break;
            case 'u':
                nodes = document.getElementsByTagName('u');
                break;
            case 'b':
                nodes = document.getElementsByTagName('b');
                break;
            case 'i':
                nodes = document.getElementsByTagName('i');
                break;
            }

            const txt = lanSwitch(eId);
            let node;
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].textContent.has(txt)) {
                    node = nodes[i];
                    break;
                }
            }
            // append the content after the span
            const div = this.createDiv(dId);
            node.insertAdjacentElement('afterend', div);
            this.wikify(dId, content);
        }
        else if (eId) {
            const element = document.getElementById(eId);
            if (!element) {
                throw new Error(`Element with id ${eId} not found`);
            }

            // append the content after the element
            const div = this.createDiv(`patch${eId}${count}`);
            element.insertAdjacentElement('afterend', div);
            this.wikify(`patch${eId}${count}`, content);
        }
        else {
            throw new Error('Invalid element type');
        }
    },

    /**
     * @description insert content before/after certain link
     * @param {'before' | 'after'} position;
     * @param {string} eId;
     * @param {string | language} link;
     * @param {string} content;
     * @returns {HTMLElement}
     * @example
     * insertToLink({link: 'linktext', content:'<<anywidget>>'})
     * //will insert a new div with content before the certain link
     * //the default id of new div is 'patchContent'
     *
     * insertToLink({pos: 'after', link: 'linktext', content:'<<anywidget>>'})
     * //will insert a new div with content after the certain link
     *
     * insertToLink({eId: 'myContent', link: 'linktext', content:'<<anywidget>>'})
     * //'myContent' is the id of the new div
     */
    insertToLink(options) {
        if (typeof options.link == 'object') {
            link = lanSwitch(options.link);
        }

        const doc = document.getElementById('passage-content');
        const links = doc.getElementsByClassName('macro-link');
        let element;
        for (let i = 0; i < links.length; i++) {
            if (links[i].innerHTML.has(options.link)) {
                element = links[i];
                break;
            }
        }
        if (!element) return;

        // check div if already exist, if not then create a new one
        let div = document.getElementById(options.eId);
        const eID = options.eId ?? 'patchContent';
        
        if (!div) {
            div = document.createElement('div');
            div.id = eID;
        }

        let pos = 'beforebegin';
        if (options.pos == 'after') {
            pos = 'afterend';
        }

        // if position is before then check the link previous sibling is image or not
        // if so then insert before the image
        if (pos == 'beforebegin') {
            if (element.previousElementSibling.tagName == 'IMG') {
                element = element.previousElementSibling;
            }
        }

        element.insertAdjacentElement(pos, div);

        // wikifier the content
        new Wikifier(null, `<<append "#${eID}">>${options.content ?? ''}<</append>>`);

        return div;
    },

    /**
     * @description replace text at TEXT_NODE
     * @param {string | language} oldtext
     * @param {string | language} newtext
     * @example
     * replaceText('oldtext', 'newtext')
     * replaceText({CN:'旧文本', EN:'oldtext'}, 'newtext')
     * replaceText('oldtext', {CN:'新文本', EN:'newtext'})
     */
    replaceText(oldtext, newtext) {
        const doc = document.getElementById('passage-content');
        const textNodes = doc.childNodes;
        if (!textNodes) return;

        if (typeof oldtext == 'object') {
            oldtext = lanSwitch(oldtext);
        }

        if (typeof newtext == 'object') {
            newtext = lanSwitch(newtext);
        }

        for (let i = 0; i < textNodes.length; i++) {
            const node = textNodes[i];
            if (node.textContent.has(oldtext)) {
                node.textContent = node.textContent.replace(oldtext, newtext);
                break;
            }
        }
    }
};

function parseXml(xml, arrayTags) {
    let dom = null;
    if (window.DOMParser) dom = new DOMParser().parseFromString(xml, 'text/xml');
    else if (window.ActiveXObject) {
        dom = new ActiveXObject('Microsoft.XMLDOM');
        dom.async = false;
        if (!dom.loadXML(xml)) {
            throw new Error(`${dom.parseError.reason} ${dom.parseError.srcText}`);
        }
    }
    else throw new Error('cannot parse xml string!');

    function parseNode(xmlNode, result) {
        if (xmlnode?.nodeName === '#text') {
            const v = xmlNode.nodeValue;
            if (v.trim()) result['#text'] = v;
            return;
        }

        if (xmlNode.nodeType === Node.CDATA_SECTION_NODE) {
            result['#cdata'] = xmlNode.nodeValue;
            return;
        }

        const jsonNode = {};
        const existing = result[xmlnode?.nodeName];

        if (existing) {
            if (!Array.isArray(existing)) result[xmlnode?.nodeName] = [existing, jsonNode];
            else result[xmlnode?.nodeName].push(jsonNode);
        }
        else {
            if (arrayTags && arrayTags.indexOf(xmlnode?.nodeName) !== -1) result[xmlnode?.nodeName] = [jsonNode];
            else result[xmlnode?.nodeName] = jsonNode;
        }

        if (xmlNode.attributes) {
            for (const attribute of xmlNode.attributes) {
                jsonNode[attribute.nodeName] = attribute.nodeValue;
            }
        }

        for (const childNode of xmlNode.childNodes) {
            parseNode(childNode, jsonNode);
        }
    }

    const result = {};
    for (const node of dom.childNodes) {
        parseNode(node, result);
    }

    return result;
}

Object.defineProperties(window, {
    htmlTools : {
        get : () => htmlTools
    },
    parseXml : {
        value    : parseXml,
        writable : false
    }
});

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
        let element = document.getElementById(eId);
        if (element) {
            return element;
        }

        switch (pos) {
        case 'before':
            element = this.appendPatch(pos, eId);
            break;
        case 'after':
            element = this.appendPatch(pos, eId);
            break;
        case 'beforemain':
            element = document.createElement('div');
            element.id = eId;
            document.getElementById('passage-content').insertAdjacentElement('afterbegin', element);
            break;
        case 'aftermain':
            element = document.createElement('div');
            element.id = eId;
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
        if (xmlNode.nodeName === '#text') {
            const v = xmlNode.nodeValue;
            if (v.trim()) result['#text'] = v;
            return;
        }

        if (xmlNode.nodeType === Node.CDATA_SECTION_NODE) {
            result['#cdata'] = xmlNode.nodeValue;
            return;
        }

        const jsonNode = {};
        const existing = result[xmlNode.nodeName];

        if (existing) {
            if (!Array.isArray(existing)) result[xmlNode.nodeName] = [existing, jsonNode];
            else result[xmlNode.nodeName].push(jsonNode);
        }
        else {
            if (arrayTags && arrayTags.indexOf(xmlNode.nodeName) !== -1) result[xmlNode.nodeName] = [jsonNode];
            else result[xmlNode.nodeName] = jsonNode;
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


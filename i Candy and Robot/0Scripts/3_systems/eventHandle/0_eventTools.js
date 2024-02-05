/**
 * @typedef { string[] | { CN:string, EN:string} } language
 */

const htmlTools = {
    /**
     * @description append a new div with id extraContent before the first image or link in div passage-content
     * @param {string} eId
     */
    appendPatch(eId = 'patchContent') {
        // if has icon image, then find the first image in div passage-content, else find the first link
        let element = document.querySelector('#passage-content img');
        if (!element) {
            element = document.querySelector('#passage-content a');
        }

        // make a new div with id extraContent
        const div = document.createElement('div');
        div.id = eId;

        // insert the new div before the element
        element.parentNode.insertBefore(div, element);
    },

    /**
     * @description replace the oldlink with newlink
     * @param {string | string[]} oldlink
     * @param {string} newlink
    */
    replaceLink(oldlink, newlink) {
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
    },

    /**
     * @description append content before certain link
     * @param {string | language} link;
     * @param {string} content;
     */
    appendBeforeLink(link, content) {
        const doc = document.getElementById('passage-content');
        const links = doc.getElementsByClassName('macro-link');
        let element;
        for (let i = 0; i < links.length; i++) {
            if (links[i].innerHTML.has(link)) {
                element = links[i];
                break;
            }
        }
        if (!element) return;

        // append content before the element
        const div = document.createElement('div');
        div.id = 'patchContent';
        doc.insertBefore(div, element);

        // wikifier the content
        new Wikifier(null, `<<append "#patchContent">>${content}<</append>>`);
    },

    /**
     * @description replace text at TEXT_NODE
     * @param {string | language} oldtext
     * @param {string} newtext
     */
    replaceText(oldtext, newtext) {
        const doc = document.getElementById('passage-content');
        const textNodes = doc.childNodes;
        if (!textNodes) return;

        if (typeof oldtext == 'object') {
            oldtext = lanSwitch(oldtext);
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


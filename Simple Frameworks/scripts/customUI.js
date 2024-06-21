const CustomPopup = (() => {
    function drawPopup(title = '', content = '', style, noBtn) {
        style ??= 'custom-pupup';

        const background = document.createElement('div');
        background.id = 'customPopupBG';
        background.classList.add('hidden');
        document.getElementById('passages').appendChild(background);

        const popup = document.createElement('div');
        popup.id = 'customPopup';
        popup.classList.add(style);
        popup.classList.add('hidden');
        popup.innerHTML = `
            <div id="PopupBanner">
                <div class="popup-title">${title}</div>
                ${noBtn ? '<div class="nocloseBtn"></div>' : '<button class="closeBtn" onclick="CustomPopup.close()">X</button>'}
            </div>
            <div id="PopupContent">${content}</div>
        `;

        document.getElementById('passages').appendChild(popup);
    }

    function setSize(width, height) {
        const popup = document.getElementById('customPopup');
        if (!popup) return;
        if (width) {
            popup.style.width = width;
        }
        if (height) {
            popup.style.height = height;
        }
    }

    function destroyPopup() {
        const popup = document.getElementById('customPopup');
        const bg = document.getElementById('customPopupBG');
        if (popup) {
            popup.remove();
            bg.remove();
        }
    }

    function setContent(content) {
        const popup = document.getElementById('PopupContent');
        if (popup) {
            popup.innerHTML = content;
        }
    }

    function showPopup() {
        const popup = document.getElementById('customPopup');
        const bg = document.getElementById('customPopupBG');

        if (popup) {
            popup.classList.remove('hidden');
            bg.classList.remove('hidden');
        }
    }

    function hidePopup() {
        const popup = document.getElementById('customPopup');
        const bg = document.getElementById('customPopupBG');
        if (popup) {
            popup.classList.add('hidden');
            bg.classList.add('hidden');
        }
    }

    function createPopup(options) {
        const { title = '', content = '', noBtn, width, height } = options;
        drawPopup(title, content, noBtn);

        if (width || height) {
            setSize(width, height);
        }

        showPopup();
    }

    function setPopup(content) {
        drawPopup('', content);
        showPopup();
    }

    return Object.freeze({
        set    : setPopup,
        create : createPopup,
        draw   : drawPopup,
        close  : destroyPopup,

        show : showPopup,
        hide : hidePopup,
        setContent,
        setSize
    });
})();

const HeaderMsg = (() => {
    let _Msglogs = [];

    function clearLogs() {
        _Msglogs = [];
    }

    function addLog(log) {
        _Msglogs.push(log);
    }

    function print() {
        if (_Msglogs.length === 0) return '';
        return _Msglogs.join('<br>\n');
    }

    function append() {
        const msgdiv = document.createElement('div');
        msgdiv.id = 'headerMsg';

        document.getElementById('passage-header').insertAdjacentElement('afterbegin', msgdiv);
    }

    function show() {
        const header = document.getElementById('headerMsg');
        if (!header) append();

        const html = print();

        new Wikifier(null, `<<replace "#headerMsg" transition>>${html}<</replace>>`);
    }

    return Object.freeze({
        get logs() {
            return _Msglogs;
        },

        add   : addLog,
        clear : clearLogs,
        show
    });
})();


Object.defineProperties(window, {
    CustomPopup : { get : () => CustomPopup },
    HeaderMsg   : { get : () => HeaderMsg }
});


$(document).on(':passageend', () => {
    if (HeaderMsg.logs.length > 0) {
        HeaderMsg.show();
        HeaderMsg.clear();
    }
});

DefineMacro('addHeaderMsg', HeaderMsg.add);

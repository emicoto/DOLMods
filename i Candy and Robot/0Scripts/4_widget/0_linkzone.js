iData.beforeLink = [];
iData.extraLink = [];
iData.psgdone = [];

function onBeforeLink() {
    const data = iData.beforeLink;
    const html = [];

    data.forEach(widget => {
        if (typeof widget == 'string') {
            html.push(`<<${widget}>>`);
        }
        else {
            if (widget.passage.includes(V.passage)) {
                html.push(`<<${widget.widget}>>`);
            }
        }
    });

    return html.join('\n');
}
DefineMacroS('iCandyBeforeLink', onBeforeLink);

function onExtraLink() {
    const data = iData.extraLink;
    const html = [];

    data.forEach(widget => {
        if (typeof widget == 'string') {
            html.push(`<<${widget}>>`);
        }
        else {
            if (widget.passage.includes(V.passage)) {
                html.push(`<<${widget.widget}>>`);
            }
        }
    });

    return html.join('\n');
}
DefineMacroS('iCandyExtraLink', onExtraLink);

function onPsgDone() {
    const data = iData.psgdone;
    const html = [];

    data.forEach(widget => {
        if (typeof widget == 'string') {
            html.push(`<<${widget}>>`);
        }
        else {
            if (widget.passage.includes(V.passage)) {
                html.push(`<<${widget.widget}>>`);
            }
        }
    });

    return html.join('\n');
}
DefineMacroS('iCandyDoneWidgets', onPsgDone);

iData.addto = function (name,...args) {
    if (!iData[name]) return;
    iData[name].push(...args);
};

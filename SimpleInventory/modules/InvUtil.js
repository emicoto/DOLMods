const InvUtil = (() => {
    'use strict';

    // export function
    
    function _getPalam(param, value) {
        if (param == 'aphrod') {
            InvUtil.getPalamV('drugged', value);
            return 'drugged';
        }
        
        if (param == 'drunk') {
            InvUtil.getPalamV('drunk', value);
            return 'alcohol';
        }

        wikifier(param, value, param == 'arousal' ? 'genital' : null);
        return param;
    }

    function _getPalamV(param, value) {
        if (!V.statFreeze && setup.palamlist.includes(param)) {
            V[param] = Math.clamp(V[param] + value, 0, 10000);
        }
    }

    function _printPalam(param, value) {
        let gl = 'l';
        let count = 1;
        if (value > 0) {
            gl = 'g';
        }

        value = Math.abs(value);

        if (value > 30) {
            count = 3;
        }
        else if (value > 20) {
            count = 2;
        }

        if (param == 'hunger' || param == 'thirsty') {
            if (value >= 500) {
                count = 3;
            }
            else if (value >= 200) {
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
    }

    return Object.freeze({
        getPalam   : _getPalam,
        getPalamV  : _getPalamV,
        printPalam : _printPalam
    });
})();


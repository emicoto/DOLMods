window.slog = function (type = 'log', ...args) {
    if (!['log', 'warn', 'error'].includes(type)) {
	   args.unshift(type);
	   type = 'log';
    }
    console[type](`[${type}] ${new Date().toLocaleTimeString()} |`, ...args);
};

window.dlog = function (type = 'log', ...args) {
    if (!['log', 'warn', 'error'].includes(type)) {
	   args.unshift(type);
	   type = 'log';
    }
    if (Config.debug) console[type](`[${type}] ${new Date().toLocaleTimeString()} |`, ...args);
};

slog('log', 'simple framework start at util.js')


;(function () {
    'use strict';

    // make sure the props is valid variables (not null, undefined, empty array, empty object)
    function isValid(props) {
        const type = typeof props;
        const isArray = Array.isArray(props);

        if (props === undefined || props === null) return false;

        if (isArray || type == 'string') {
            return props.length > 0;
        }

        if (type == 'object') {
            return JSON.stringify(props) !== '{}';
        }

        return true;
    }

    // check x is in range of min and max
    function inrange(x, min, max) {
        return x >= min && x <= max;
    }

    // make a random number
    function random(min, max) {
        if (!max) {
            max = min;
            min = 0;
        }
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // return a random element from an array by rate
    function maybe(arr) {
        let txt;
        arr.forEach((v, i) => {
            if (random(100) < v[1]) txt = v[0];
        });

        if (!txt) {
            return arr[0][0];
        }
        return txt;
    }

    // compare two elements in an object
    function compares(key) {
        return function (m, n) {
            const a = m[key];
            const b = n[key];
            return b - a;
        };
    }

    // roll dice
    function roll(times, max) {
        if (!times) times = 1;
        if (!max) max = 6;

        let re;

        re = {
            roll   : [],
            result : 0,
            bonus  : 0
        };

        for (let i = 0; i < times; i++) {
            const r = random(1, max);
            re.roll[i] = String(r);
            re.result += r;
            if (r == max) re.bonus++;
        }

        re.roll = re.roll.join(',');

        return re;
    }

    // check if the value is in the given array
    function groupmatch(value, ...table) {
        return table.includes(value);
    }

    // sum all the values in simple object
    function sumObj(obj) {
        let sum = 0;
        for (const el in obj) {
            sum += Number(obj[el]);
        }
        return sum;
    }

    // sum all the values of prop in object
    function sumObjProp(obj, prop) {
        let sum = 0;
        for (const el in obj) {
            if (obj.hasOwnProperty(prop) && Number(obj[prop]) !== NaN) {
                sum += Number(obj[prop]);
            }
            return sum;
        }
    }


    // swap two elements in an array
    function swap(arr, a, b) {
        const c = arr[a];
        const d = arr[b];
        arr[b] = c;
        arr[a] = d;
        return arr;
    }

    // deep clone an object
    function clone(orig) {
        /*
			Immediately return the primitives and functions.
		*/
        if (typeof orig !== 'object' || orig === null) {
            return orig;
        }

        /*
			Unbox instances of the primitive exemplar objects.
		*/
        if (orig instanceof String) {
            return String(orig);
        }
        if (orig instanceof Number) {
            return Number(orig);
        }
        if (orig instanceof Boolean) {
            return Boolean(orig);
        }

        /*
			Honor native clone methods.
		*/
        if (typeof orig.clone === 'function') {
            return orig.clone(true);
        }
        if (orig.nodeType && typeof orig.cloneNode === 'function') {
            return orig.cloneNode(true);
        }

        /**
		 *  handle function
		 */
        if (orig instanceof Function) {
            const copy = function () {
                return orig.apply(this, arguments);
            };
            copy.prototype = orig.prototype;
            return copy;
        }

        /*
			Create a copy of the original object.

			NOTE: Each non-generic object that we wish to support must be
			explicitly handled below.
		*/
        let copy;

        // Handle instances of the core supported object types.
        if (orig instanceof Array) {
            copy = new Array(orig.length);
        }
        else if (orig instanceof Date) {
            copy = new Date(orig.getTime());
        }
        else if (orig instanceof Map) {
            copy = new Map();
            orig.forEach((val, key) => copy.set(key, clone(val)));
        }
        else if (orig instanceof RegExp) {
            copy = new RegExp(orig);
        }
        else if (orig instanceof Set) {
            copy = new Set();
            orig.forEach(val => copy.add(clone(val)));
        }

        // Handle instances of unknown or generic objects.
        else {
            // We try to ensure that the returned copy has the same prototype as
            // the original, but this will probably produce less than satisfactory
            // results on non-generics.
            copy = Object.create(Object.getPrototypeOf(orig));
        }

        /*
			Duplicate the original object's own enumerable properties, which will
			include expando properties on non-generic objects.

			NOTE: This preserves neither symbol properties nor ES5 property attributes.
			Neither does the delta coding or serialization code, however, so it's not
			really an issue at the moment.
		*/
        Object.keys(orig).forEach(name => copy[name] = clone(orig[name]));

        return copy;
    }

    // count an element in a 2d array
    function countArray(arr, element) {
        return arr.reduce((count, subarr) => count + (subarr.includes(element) ? 1 : 0), 0);
    }

    // get and set object by path
    function setPath(obj, path, value) {
        const pathArray = path.split('.');
        const last = pathArray.pop();
        for (const p of pathArray) {
            if (!obj[p]) obj[p] = {};
            obj = obj[p];
        }
        if (value) {
            obj[last] = value;
        }
        return obj[last];
    }

    function getPath(obj, path) {
        const pathArray = path.split('.');
        let res = obj;
        for (const p of pathArray) {
            if (!res[p]) return undefined;
            res = res[p];
        }
        return res;
    }

    // get key by value
    function getKeyByValue(object, value) {
        const findArray = (arr, val) => arr.find(item => typeof item.includes === 'function' && item.includes(val));
        return Object.keys(object).find(
            key =>
                object[key] === value ||
				object[key].includes(value) ||
				Array.isArray(object[key]) && (object[key].includes(value) || findArray(object[key], value))
        );
    }

    Object.defineProperties(window, {
        inrange       : { value : inrange },
        Random        : { value : random },
        maybe         : { value : maybe },
        compares      : { value : compares },
        roll          : { value : roll },
        groupmatch    : { value : groupmatch },
        sumObj        : { value : sumObj },
        sumObjProp    : { value : sumObjProp },
        swap          : { value : swap },
        clone         : { value : clone },
        countArray    : { value : countArray },
        setPath       : { value : setPath },
        getPath       : { value : getPath },
        getKeyByValue : { value : getKeyByValue },
        isValid       : { value : isValid }
    });
	
    // fix the number to any decimal places
    Object.defineProperty(Math, 'fix',{
        configurable : true,
        writable     : true,

        value(num, count) {
            const value = Number(num);
            const a = Number(count) || 2;

            return parseFloat(value.toFixed(a));
        }
    });

    Object.defineProperty(Number.prototype, 'fix', {
        configurable : true,
        writable     : true,

        value(/* value */) {
            if (this == null) {
                // lazy equality for null
                throw new TypeError('Number.prototype.fix called on null or undefined');
            }

            if (arguments.length > 1) {
                throw new Error('Number.prototype.fix called with an incorrect number of parameters');
            }

            const value = Number(arguments[0]) || 2;

            return parseFloat(this.toFixed(value));
        }
    });

    /**
 * @param {string[]} arg
 * @returns {boolean}
 * @description
 * Checks if the string or array contains the given argument.
 * @example
 * "Hello World".has("Hello"); // 1
 * "Hello World".has("Hello", "World", "Foo"); // 2
 * "Hello World".has("Foo"); // false
 * "Hello World".has("Foo", "Bar"); // false
 */
    Object.defineProperty(String.prototype, 'has', {
        configurable : true,
        writable     : true,
        value(...arg) {
            if (this == null) {
                throw new TypeError('String.prototype.has called on null or undefined');
            }

            if (Array.isArray(arg[0])) arg = arg[0];
            let count = 0;
            for (let i = 0; i < arg.length; i++) {
                if (this.includes(arg[i])) count++;
            }
            if (!count) return false;
            return count;
        }
    });


    Object.defineProperty(Array.prototype, 'has', {
        configurable : true,
        writable     : true,
        value(/* needles */) {
            if (this == null) {
                throw new TypeError('Array.prototype.has called on null or undefined');
            }

            if (arguments.length === 1) {
                if (Array.isArray(arguments[0])) {
                    return Array.prototype.has.apply(this, arguments[0]);
                }

                return Array.prototype.includes.apply(this, arguments);
            }

            let count = 0;
            for (let i = 0, iend = arguments.length; i < iend; i++) {
                if (
                    Array.prototype.some.call(
                        this,
                        function (val) {
                            return val === this.val || val !== val && this.val !== this.val;
                        },
                        { val : arguments[i] }
                    )
                ) {
                    count++;
                }
            }
            if (count == 0) return false;
            return count;
        }
    });

    Object.defineProperty(String.prototype, 'toCamelCase', {
        configurable : true,
        writable     : true,
        value() {
            if (this == null) {
                throw new TypeError('String.prototype.toCamelCase called on null or undefined');
            }

            return this.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index == 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, '');
        }
    });

    Object.defineProperty(Array.prototype, 'randompop', {
        configurable : true,
        writable     : true,
        value() {
            if (this == null) {
                throw new TypeError('Array.prototype.randompop called on null or undefined');
            }

            return this.splice(Math.floor(Math.random() * this.length), 1)[0];
        }
    });

    Object.defineProperty(String.prototype, 'randompop', {
        configurable : true,
        writable     : true,
        value() {
            if (this == null) {
                throw new TypeError('String.prototype.randompop called on null or undefined');
            }

            return this.split('').randompop();
        }
    });

    // create alias for randompop
    Object.defineProperty(Array.prototype, 'randPop', {
        configurable : true,
        writable     : true,
        value() {
            return this.randompop();
        }
    });

    Object.defineProperty(String.prototype, 'randPop', {
        configurable : true,
        writable     : true,
        value() {
            return this.split('').randompop();
        }
    });

    Object.defineProperty(Array.prototype, 'randPopMany', {
        configurable : true,
        writable     : true,
    
        value(wantSize) {
            if (this == null) {
                // lazy equality for null
                throw new TypeError('Array.prototype.randPopMany called on null or undefined');
            }
    
            const length = this.length >>> 0;
    
            if (length === 0) {
                return [];
            }
    
            let want = Math.trunc(wantSize);
    
            if (!Number.isInteger(want)) {
                throw new Error('Array.prototype.randPopMany want parameter must be an integer');
            }
    
            if (want < 1) {
                return [];
            }
    
            if (want > length) {
                want = length;
            }
    
            const splice = Array.prototype.splice;
            const result = [];
            let max = length - 1;
    
            do {
                result.push(splice.call(this, random(0, max--), 1)[0]);
            } while (result.length < want);
    
            return result;
        }
    });

    Object.defineProperty(String.prototype, 'randPopMany', {
        configurable : true,
        writable     : true,
    
        value(wantSize) {
            if (this == null) {
                // lazy equality for null
                throw new TypeError('String.prototype.randPopMany called on null or undefined');
            }
    
            return this.split('').randPopMany(wantSize).join('');
        }
    });
})();

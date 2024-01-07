window.slog = function (type = "log", ...args) {

	if (!["log", "warn", "error"].includes(type)) {
	   args.unshift(type);
	   type = "log";
	}
	console[type](`[${type}] ${new Date().toLocaleTimeString()} |`, ...args);
 };

window.dlog = function (type = "log", ...args) {
	if (!["log", "warn", "error"].includes(type)) {
	   args.unshift(type);
	   type = "log";
	}
	if (Config.debug) console[type](`[${type}] ${new Date().toLocaleTimeString()} |`, ...args);
 };

 slog('log', 'simple framework start at util.js')


 ;(function () {
	'use strict';

	//make sure the props is valid variables (not null, undefined, empty array, empty object)
	function isValid(props) {
		const type = typeof props;
		const isArray = Array.isArray(props);

		if (props === undefined || props === null) return false;

		if (isArray || type=='string') {
			return props.length > 0;
		}

		if (type == "object") {
			return JSON.stringify(props) !== "{}";
		}

		return true;
	}

	//check x is in range of min and max
	function inrange(x, min, max) {
		return x >= min && x <= max;
	}

	//make a random number
	function random(min, max) {
		if (!max) {
			max = min;
			min = 0;
		}
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	//return a random element from an array by rate
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

	//compare two elements in an object
	function compares(key) {
		return function (m, n) {
			let a = m[key];
			let b = n[key];
			return b - a;
		};
	}

	//roll dice
	function roll(times, max) {
		if (!times) times = 1;
		if (!max) max = 6;

		let re;

		re = {
			roll: [],
			result: 0,
			bonus: 0,
		};

		for (let i = 0; i < times; i++) {
			let r = random(1, max);
			re.roll[i] = String(r);
			re.result += r;
			if (r == max) re.bonus++;
		}

		re.roll = re.roll.join(',');

		return re;
	}

	//check if the value is in the given array
	function groupmatch(value, ...table) {
		return table.includes(value);
	}

	//sum all the values in simple object
	function sumObj(obj) {
		let sum = 0;
		for (let el in obj) {
            sum += Number(obj[el])
		}
		return sum;
	}

    //sum all the values of prop in object
    function sumObjProp(obj, prop){
        let sum = 0;
        for(var el in obj){
            if(obj.hasOwnProperty(prop) && Number(obj[prop]) !== NaN ){
                sum += Number(obj[prop])
            }
            return sum
        }
    }


	//swap two elements in an array
	function swap(arr, a, b) {
		let c = arr[a];
		let d = arr[b];
		arr[b] = c;
		arr[a] = d;
		return arr;
	}

	//deep clone an object
	function clone(obj) {
		var copy;

		// Handle the 3 simple types, and null or undefined
		if (null == obj || "object" != typeof obj) return obj;

		// Handle Date
		if (obj instanceof Date) {
			copy = new Date();
			copy.setTime(obj.getTime());
			return copy;
		}

		// Handle Array
		if (obj instanceof Array) {
			copy = [];
			for (var i = 0, len = obj.length; i < len; i++) {
				copy[i] = clone(obj[i]);
			}
			return copy;
		}

		// Handle Function
		if (obj instanceof Function) {
			copy = function () {
				return obj.apply(this, arguments);
			};
			return copy;
		}

		// Handle Object
		if (obj instanceof Object) {
			copy = {};
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
			}
			return copy;
		}

		throw new Error("Unable to copy obj as type isn't supported " + obj.constructor.name);
	}

	//count an element in a 2d array
	function countArray(arr, element) {
		return arr.reduce((count, subarr) => count + (subarr.includes(element) ? 1 : 0), 0);
	}

	//get and set object by path
	function setPath(obj, path, value) {
		const pathArray = path.split(".");
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
		const pathArray = path.split(".");
		let res = obj;
		for (const p of pathArray) {
			if (!res[p]) return undefined;
			res = res[p];
		}
		return res;
	}

	//get key by value
	function getKeyByValue(object, value) {
		const findArray = (arr, val) => {
			return arr.find((item) => typeof item.includes === "function" && item.includes(val));
		};
		return Object.keys(object).find(
			(key) =>
				object[key] === value ||
				object[key].includes(value) ||
				(Array.isArray(object[key]) && (object[key].includes(value) || findArray(object[key], value)))
		);
	}


	Object.defineProperties(window, {
		inrange: { value: inrange },
		random: { value: random },
		maybe: { value: maybe },
		compares: { value: compares },
		roll: { value: roll },
		groupmatch: { value: groupmatch },
		sumObj: { value: sumObj },
        sumObjProp : { value: sumObjProp },
		swap: { value: swap },
		clone: { value: clone },
		countArray: { value: countArray },
		setPath: { value: setPath },
		getPath: { value: getPath },
		getKeyByValue: { value: getKeyByValue },
		isValid: { value: isValid },
	});
	
//fix the number to any decimal places
Object.defineProperty(Math, "fix",{
	configurable: true,
	writable:true,

	value(num, count){
		const value = Number(num);
		const a = Number(count) || 2;

		return parseFloat(value.toFixed(a));
	}
})

Object.defineProperty(Number.prototype, "fix", {
	configurable: true,
	writable:true,

	value(/* value */){
		if (this == null) {
			// lazy equality for null
			throw new TypeError("Number.prototype.fix called on null or undefined");
		}

		if (arguments.length > 1) {
			throw new Error("Number.prototype.fix called with an incorrect number of parameters");
		}

		let value = Number(arguments[0]) || 2;

		return parseFloat(this.toFixed(value));
	}
})

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
Object.defineProperty(String.prototype, "has", {
	configurable: true,
	writable: true,
	value(...arg) {
		if (this == null) {
			throw new TypeError("String.prototype.has called on null or undefined");
		}

		if (Array.isArray(arg[0])) arg = arg[0];
		let count = 0;
		for (let i = 0; i < arg.length; i++) {
			if (this.includes(arg[i])) count++;
		}
		if (!count) return false;
		return count;
	},
});

Object.defineProperty(Array.prototype, "has", {
	configurable: true,
	writable: true,
	value(/* needles */) {
		if (this == null) {
			throw new TypeError("Array.prototype.has called on null or undefined");
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
						return val === this.val || (val !== val && this.val !== this.val);
					},
					{ val: arguments[i] }
				)
			) {
				count++;
			}
		}
		if(count == 0) return false
		return count;
	},
});

Object.defineProperty(Array.prototype, "randompop", {
	configurable: true,
	writable: true,
	value() {
		if (this == null) {
			throw new TypeError("Array.prototype.randompop called on null or undefined");
		}

		return this.splice(Math.floor(Math.random() * this.length), 1)[0];
	},
});

})();

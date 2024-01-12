/*
    Concatenates one or more unique elements to the end of the base array
    and returns the result as a new array.  Elements which are arrays will
    be merged—i.e. their elements will be concatenated, rather than the
    array itself.
*/

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

/*
    Returns the given numerical clamped to the specified bounds.
*/
Object.defineProperty(Math, 'clamp', {
	configurable : true,
	writable     : true,

	value(num, min, max) {
		const value = Number(num);
		return Number.isNaN(value) ? NaN : value.clamp(min, max);
	}
});

/*
		Returns the number clamped to the specified bounds.
	*/
Object.defineProperty(Number.prototype, 'clamp', {
	configurable : true,
	writable     : true,

	value(/* min, max */) {
		if (this == null) {
			// lazy equality for null
			throw new TypeError('Number.prototype.clamp called on null or undefined');
		}

		if (arguments.length !== 2) {
			throw new Error('Number.prototype.clamp called with an incorrect number of parameters');
		}

		let min = Number(arguments[0]);
		let max = Number(arguments[1]);

		if (min > max) {
			[min, max] = [max, min];
		}

		return Math.min(Math.max(this, min), max);
	}
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

Object.defineProperty(String.prototype, 'toLocaleUpperFirst', {
	configurable : true,
	writable     : true,

	value() {
		if (this == null) {
			// lazy equality for null
			throw new TypeError('String.prototype.toLocaleUpperFirst called on null or undefined');
		}

		// Required as `this` could be a `String` object or come from a `call()` or `apply()`.
		const str = String(this);

		// Get the first code point—may be one or two code units—and its end position.
		const { char, end } = _getCodePointStartAndEnd(str, 0);

		return end === -1 ? '' : char.toLocaleUpperCase() + str.slice(end + 1);
	}
});

/*
		Returns a copy of the base string with the first Unicode code point uppercased.
	*/
Object.defineProperty(String.prototype, 'toUpperFirst', {
	configurable : true,
	writable     : true,

	value() {
		if (this == null) {
			// lazy equality for null
			throw new TypeError('String.prototype.toUpperFirst called on null or undefined');
		}

		// Required as `this` could be a `String` object or come from a `call()` or `apply()`.
		const str = String(this);

		// Get the first code point—may be one or two code units—and its end position.
		const { char, end } = _getCodePointStartAndEnd(str, 0);

		return end === -1 ? '' : char.toUpperCase() + str.slice(end + 1);
	}
});

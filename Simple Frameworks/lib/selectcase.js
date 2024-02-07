/**
 * @name SelectCase
 * @description
 * The SelectCase class is used to create a select case statement.
 * @example
 * const select = new SelectCase();
 * select.case(1, "one").case(2, "two").case(3, "three").else("unknown");
 * select.has(2); // "two"
 * select.has(4); // "unknown"
 * @example
 * const select = new SelectCase();
 * select.case([1, 3], "odd").case([2, 4], "even").else("unknown");
 * select.has(2); // "even"
 * select.has(4); // "even"
 * select.has(5); // "unknown"
 * @example
 * const select = new SelectCase();
 * select.caseMatch("abcd", "match").else("unknown");
 *
 * @example
 * const select = new SelectCase();
 * select.case(10, "ten").case(20, "twenty").case(30, "thirty").else("unknown");
 * select.isLT(15); // "ten"
 * select.isGT(15); // "twenty"
 * select.isLTE(15); // "ten"
 * select.isGTE(15); // "twenty"
 */

class SelectCase {
    arr = [];
    defaultresult = '';
    condtype = '';

    /**
	 * @param {string | number | string[] | number[]} cond
	 * @param {any} result
	 * @returns {SelectCase}
	 * @description
	 * The case method is used to create a select case statement.
	 * @example
	 * const select = new SelectCase();
	 * select.case(1, "one").case(2, "two").case(3, "three").else("unknown");
	 * select.has(2); // "two"
	 * select.has(4); // "unknown"
	 */
    case(cond, result) {
        this.check(cond);
        this.arr.push({ cond, result });
        return this;
    }
    /**
	 * @param {any} result
	 * @returns {SelectCase}
	 */
    else(result) {
        this.defaultresult = result;
        return this;
    }
    /**
	 * @param { number |  number[]} cond
	 * @param {any} result
	 * @returns {SelectCase}
	 * @description
	 * The caseMatch method is used to create a select case statement with number match.
	 * @example
	 * const select = new SelectCase();
	 * select.case([1,2,3], "one").case([4,5,6], "two").case([7,8,9], "three").else("unknown");
	 * select.has(2); // "one"
	 * select.has(4); // "two"
	 * select.has(12); // "unknown"
	 */
    caseMatch(_cond, result) {
        if (typeof _cond == 'number') _cond = [_cond];
        else if (Array.isArray(_cond)) {
            _cond.forEach(c => {
                if (typeof c !== 'number') throw new Error('cond must be a number or number[]');
            });
        }
        else {
            throw new Error('cond must be a number or number[]');
        }
        const cond = {
            c       : _cond,
            isMatch : 'number'
        };
        this.check(cond);
        this.arr.push({ cond, result });
        return this;
    }
    /**
	 * @param {string | string[]} cond
	 * @param {any} result
	 * @returns {SelectCase}
	 * @description
	 * The caseMatchS method is used to create a select case statement with string match.
	 * @example
	 * const select = new SelectCase();
	 * select.caseMatchS("abcd", "match").else("unknown");
	 * select.has("a"); // "match"
	 * select.has("b"); // "match"
	 * select.has("f"); // "unknown"
	 * @example
	 * const select = new SelectCase();
	 * select.caseMatchS(["abcd", "efgh"], "match").else("unknown");
	 * select.has("a"); // "match"
	 * select.has("bc"); // "match"
	 * select.has("f"); // "unknown"
	 */
    caseMatchS(_cond, result) {
        if (typeof _cond == 'string') _cond = [_cond];
        else if (Array.isArray(_cond)) {
            _cond.forEach(c => {
                if (typeof c !== 'string') throw new Error('cond must be a string or string[]');
            });
        }
        else {
            throw new Error('cond must be a string or string[]');
        }
        const cond = {
            c       : _cond,
            isMatch : 'string'
        };
        this.check(cond);
        this.arr.push({ cond, result });
        return this;
    }
    /**
	 * @param {string | number} pick
	 * @returns {any}
	 * @description
	 * The has method is used to check if the pick value is in the select case statement.
	 */
    has(pick) {
        for (const element of this.arr) {
            const { cond, result } = element;
            const type = this.type(cond);

            if (type == 'number[]') {
                if (pick >= cond[0] && pick <= cond[1]) return result;
            }
            if (type == 'string[]') {
                if (cond.includes(pick)) return result;
            }
            if (type == 'string' || type == 'number') {
                if (pick === cond) return result;
            }
            if (type == 'matchstring') {
                cond.c.forEach(c => {
                    if (c.includes(pick)) return result;
                });
            }
            if (type == 'matchnumber') {
                return cond.c.includes(pick) ? result : this.defaultresult;
            }
        }

        return this.defaultresult;
    }
    /**
	 * @param {number} pick
	 * @returns {any}
	 * @description
	 * The isLT method is used to check if the pick value is less than the select case statement.
	 */
    isLT(pick) {
        // from small to big
        this.arr.sort((a, b) => a.cond - b.cond);
		
        for (const element of this.arr) {
            const { cond, result } = element;
            const type = this.type(cond);
            if (type !== 'number') throw new Error('cannot compare types other than numbers');

            if (pick < cond) return result;
        }
        return this.defaultresult;
    }

    /**
	 * @param {number} pick
	 * @returns {any}
	 * @description
	 * The isGT method is used to check if the pick value is greater than the select case statement.
	 */
    isGT(pick) {
        // from big to small
        this.arr.sort((a, b) => b.cond - a.cond);

        for (const element of this.arr) {
            const { cond, result } = element;
            const type = this.type(cond);
            if (type !== 'number') throw new Error('cannot compare types other than numbers');

            if (pick > cond) return result;
        }
        return this.defaultresult;
    }

    /**
	 * @param {number} pick
	 * @returns {any}
	 * @description
	 * The isLTE method is used to check if the pick value is less than or equal to the select case statement.
	 */
    isLTE(pick) {
        // from small to big
        this.arr.sort((a, b) => a.cond - b.cond);

        for (const element of this.arr) {
            const { cond, result } = element;
            const type = this.type(cond);
            if (type !== 'number') throw new Error('cannot compare types other than numbers');

            if (pick <= cond) return result;
        }
        return this.defaultresult;
    }

    /**
	 * @param {number} pick
	 * @returns {any}
	 * @description
	 * The isGTE method is used to check if the pick value is greater than or equal to the select case statement.
	 */
    isGTE(pick) {
        // from big to small
        this.arr.sort((a, b) => b.cond - a.cond);

        for (const element of this.arr) {
            const { cond, result } = element;
            const type = this.type(cond);
            if (type !== 'number') throw new Error('cannot compare types other than numbers');

            if (pick >= cond) return result;
        }
        return this.defaultresult;
    }

    check(cond) {
        const check = this.type(cond).replace('[]', '');

        if (!this.condtype) this.condtype = check;
        else if (this.condtype !== check) throw new Error('number and string cannot be compare at same time');
    }

    // eslint-disable-next-line class-methods-use-this
    type(cond) {
        if (Array.isArray(cond)) {
            switch (typeof cond[0]) {
            case 'number':
                if (cond.length !== 2) throw new Error('number case must be [number, number]');

                return 'number[]';
            case 'string':
                return 'string[]';
            case 'object':
                if (cond?.isMatch) return `match${cond.isMatch}`;
                break;
            default:
                throw new Error('selectcase only accept string or number');
            }
        }
        if (typeof cond === 'string') return 'string';
        if (typeof cond === 'number') return 'number';

        throw new Error('selectcase only accept string or number');
    }
}

Object.defineProperties(window, {
    SelectCase : { value : Object.freeze(SelectCase) }
});

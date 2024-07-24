
class ABGame {
    // 3, 12
    constructor(hardness) {
        const maxTimes = [0, 0, 0, 10, 10, 18, 28, 36, 34, 32, 32, 36, 36];
        if (hardness < 3 || hardness > 12) {
            throw new Error('min length is 3, max length is 12');
        }

        this.hardness = Math.clamp(hardness, 3, 12);
        this.tried = 0;
        this.maxTimes = maxTimes[this.hardness];
        this.answer = this.generateAnswer();
    }

    generateAnswer() {
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B'];
        const numbers1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        if (this.hardness < 9) {
            return numbers1.randPopMany(this.hardness);
        }
        return numbers.randPopMany(this.hardness);
    }

    onInput(input) {
        if (input.length !== this.hardness) {
            return 'the input length does not match the hardness';
        }
        if (this.failed()) {
            return this.onFailed();
        }
        this.tried++;
        const result = this.compare(input);
        return `${result.a}A${result.b}B  (${this.tried}/${this.maxTimes})`;
    }
    /**
     * @param {string} _input
     */
    compare(_input) {
        let a = 0;
        let b = 0;

        // format input string
        const input = _input.toUpperCase().split('');
        if (input.length !== this.hardness) {
            return { a, b };
        }

        // string answer
        const answer = this.answer.join('').split('');

        // compare
        for (let i = 0; i < this.hardness; i++) {
            if (input[i] == answer[i]) {
                a++;
            }
            else if (answer.includes(input[i])) {
                b++;
            }
        }

        return { a, b };
    }

    failed() {
        return this.tried >= this.maxTimes;
    }

    onFailed() {
        return `Failed! The answer is ${this.answer.join('')}`;
    }

    onSucceed() {
        return `Congratulations! You've tried ${this.tried} times.`;
    }
}

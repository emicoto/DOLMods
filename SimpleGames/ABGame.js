const numberString = '0123456789AB';
const maxTimes = [0, 0, 0, 10, 10, 18, 28, 36, 34, 32, 32, 36, 36];
class ABGame {
    // 3, 12
    constructor(hardness) {
        if (hardness < 3 || hardness > 12) {
            throw new Error('min length is 3, max length is 12');
        }

        this.hardness = Math.clamp(hardness, 3, 12);
        this.tried = 0;
        this.maxTimes = maxTimes[this.hardness];
        this.answer = this.generateAnswer();
    }

    generateAnswer() {
        const text = this.hardness < 9 ? numberString.slice(0, 9) : numberString;
        const numbers = text.split('');
        return numbers.randPopMany(this.hardness);
    }

    onInput(input) {
        if (input.length !== this.hardness) {
            return 'the input length does not match the hardness';
        }
        if (this.isFailedGame) {
            return this.failedMessage;
        }

        this.tried++;

        const result = this.compare(input);
        if (result.a === this.hardness) {
            return this.succeedMessage;
        }
        return `${result.a}A${result.b}B  (${this.tried}/${this.maxTimes})`;
    }
    /**
     * @param {string} inputText
     */
    compare(inputText) {
        if (inputText.length !== this.hardness) {
            return { a, b };
        }
        let a = 0;
        let b = 0;

        // format input string
        const inputArray = inputText.toUpperCase().split('');


        // string answer
        const answerArray = typeof this.answer == 'string ' ? this.answer.split('') : this.answer;

        // compare
        for (let i = 0; i < this.hardness; i++) {
            const input = inputArray[i];
            if (input == answerArray[i]) {
                a++;
            }
            else if (answerArray.includes(input)) {
                b++;
            }
        }

        return { a, b };
    }

    get isFailedGame() {
        return this.tried >= this.maxTimes;
    }

    get failedMessage() {
        return `Failed! The answer is ${this.answerString}`;
    }
    get answerString() {
        return this.answer.join('');
    }
    get succeedMessage() {
        return `Congratulations! You've tried ${this.tried} times. The answer is ${this.answerString}`;
    }
}

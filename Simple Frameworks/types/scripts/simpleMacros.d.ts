// @ts-ignore
declare global {
    /**
     * The function to switch language string based on setup variable.
     *
     * @param {...(string|Object|string[])} lan - A list of language strings.
     *   It could be a single object with 'EN' and/or 'CN' properties (type 1),
     *   or two strings (EN and CN) (type 2),
     *   or an array containing these two strings (type 3).
     * @returns {string} - The selected string based on the 'setup.language' value. If 'setup.language' is 'CN', it returns CN value; otherwise, it returns EN value. If CN or EN are not defined, it will try to return the first defined one.
     *
     * @example <caption>Type 1: object as input</caption>
     *   lanSwitch({ EN: 'Hello', CN: '你好'}); // returns 'Hello' if setup.language is not 'CN'
     * @example <caption>Type 2: separate strings as input</caption>
     *   lanSwitch('Hello', '你好'); // returns 'Hello' if setup.language is not 'CN'
     * @example <caption>Type 3: array of strings as input</caption>
     *   lanSwitch(['Hello', '你好']); // returns 'Hello' if setup.language is not 'CN'
     */
    function lanSwitch(...lan: (string | LangType | string[])[]): string;

    function getLan(key: string): any;

    /**
     * This function picks and returns one of the two provided values based on the gender of a given NPC (non-player character) or player.
     * The female and male parameters should be of the same type. The type of return value matches the type of these two parameters.
     *
     * @template T
     * @param {(string|number)} npc - The identifier for the non-player character (npc) or the player.
     * - If it's a string other than 'pc', it's assumed to be an id from C.npc.
     * - If it's 'pc', it's assumed to be the player.
     * - If it's a number, it's assumed to be an array index.
     * @param {T} female - The value to return if the npc or player is female. Should be of same type as 'male'.
     * @param {T} male - The value to return if the npc or player is male. Should be of same type as 'female'.
     * @returns {T} - Returns female or male value according to the gender of the given npc or player.
     *
     * @example
     *  sexSwitch('pc', 'value for female', 'value for male'); // returns value based on the player's gender
     *  sexSwitch('npc_id', 'value for female', 'value for male'); // returns value based on npc_id from C.npc
     *  sexSwitch(2, 'value for female', 'value for male'); // returns value based on npc at index 2 in array
     */
    function sexSwitch<T>(npc: (string | number), female: T, male: T): T;

    /**
     * Retrieves the language-specific pronoun for a given non-player character (NPC) or player.
     *
     * @param {string|number} npc - The identifier for the non-player character (NPC) or player. If it's 0, it uses the NPC at the current index in V.NPCList.
     * @returns {string} - This function returns 'boy' or 'girl' depending on the gender. This string is returned in the language specified in setup.language.
     *
     * @example
     *  nnpcboy('npc_id'); // returns 'boy' or 'girl' based on npc_id's gender from C.npc
     *  nnpcboy(0); // returns 'boy' or 'girl' based on npc's gender at current index in V.NPCList
     */
    function nnpcboy(npc: string | number): string;

    /**
     * This function retrieves the language-specific pronoun for a given non-player character (NPC) or player and converts the first character to upper case.
     *
     * @param {string|number} npc - The identifier for the non-player character (NPC) or player. If it's 0, it uses the NPC at the current index in V.NPCList.
     * @returns {string} - This function returns 'Boy' or 'Girl' depending on the gender. This string is returned in the language specified in setup.language. The first character is converted to upper case.
     *
     * @example
     *  nnpcBoy('npc_id'); // returns 'Boy' or 'Girl' based on npc_id's gender from C.npc
     *  nnpcBoy(0); // returns 'Boy' or 'Girl' based on npc's gender at current index in V.NPCList
     */
    function nnpcBoy(npc: string | number): string;

    /**
     * This function retrieves the language-specific version of input pronoun from a predefined list.
     *
     * @param {string} pronun - The input pronoun which is either 'him', 'his', 'he' or 'himself'.
     *                          The case doesn't matter and it can start with an uppercase letter.
     * @returns {string} - This function returns the language-specific version of the input pronoun
     *                     based on the setup.language setting. The first character is converted to upper
     *                     case if and only if the input pronoun started with an uppercase letter.
     *
     * @example
     *  pcpn('him'); // returns 'him' or '他' based on the setup.language setting
     *  pcpn('Him'); // returns 'Him' or '他' based on the setup.language setting
     */
    function pcpn(pronun: string): string;

    /**
     * This function returns a text message based on the value of the speech attitude.
     *
     * @param {string} bratty - The text to return if the speech attitude is 'bratty'.
     * @param {string} neutral - The text to return if the speech attitude is 'neutral'.
     * @param {string} meek - The text to return if the speech attitude is 'meek'.
     * @returns {string} - Returns the corresponding text based on the value of the speech attitude.
     *
     * @example
     *  speechDif('Bratty text', 'Neutral text', 'Meek text'); // returns text based on the value of V.speech_attitude
     */
    function speechDif(bratty: string, neutral: string, meek: string): string;

    function cond<R>(...condtxt: [any, R][]): R;

    /**
     * This function escapes spaces inside quotes in the source string by replacing them with underscores.
     *
     * @param {string} source - The source string containing quoted text.
     * @returns {string} - Returns the source string with spaces inside the quotes replaced with underscores. If there are no matches, returns the original string.
     *
     * @example
     *  escapeSpaceInsideQuote('Hello "my friend", how are you?'); // returns 'Hello "my_friend", how are you?'
     */
    function escapeSpaceInsideQuote(source: string): string;

    interface Window {
        lanSwitch: typeof lanSwitch;
        getLan: typeof getLan;
        sexSwitch: typeof sexSwitch;
        speechDif: typeof speechDif;
        // cond: typeof cond;
    }
}

declare interface setup {
    lang: { [key: string]: LangType };
}

interface LangType {
    [key: string]: string;
}


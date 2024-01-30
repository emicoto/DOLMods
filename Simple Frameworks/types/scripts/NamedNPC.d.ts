// @ts-ignore
declare class NamedNPC {
    /**
     * A list of all named NPC objects.
     */
    static database: any[];

    /**
     * Add a new NPC object or multiple new NPC objects.
     *
     * @param {...NamedNPC} npc The NPC object(s) to be added.
     */
    static add(...npc: NamedNPC[]): void;

    /**
     * Clear/clean up the NPCs.
     */
    static clear(): void;

    /**
     * Check if a named NPC is stored in the database.
     *
     * @param {string} name The name of an NPC.
     * @returns {number} The index at which the first NPC with a matching name can be
     * found in the array, or -1 if it is not present.
     */
    static has(name: string): number;

    /**
     * Update all the NPCs stored in the class database with basic properties defined in this code block.
     */
    static update(): void;

    static switchlan(): void;

    /**
     * Initialize the NPCs by updating them.
     */
    static init(): void;

    /**
     * Reset the NPC with the provided data
     *
     * @param {NamedNPC} npc The NPC data to be reset.
     * @returns {NamedNPC} The reset NPC data.
     */
    static reset(npc: NamedNPC): NamedNPC;

    /**
     * Constructor to create a new object of the NamedNPC class.
     *
     * @param {string} name The name of the NPC
     * @param {string} title The title of the NPC
     * @param {string} des The description of the NPC
     * @param {string} type The type of the NPC
     */
    constructor(name: string, title: string, des: string, type: string);

    nam: string;
    description: string;
    title_lan: string;
    displayname_lan: string;
    type: string;
    penis: number;
    vagina: number;
    insecurity: string;
    pronoun: string;
    penissize: number;
    penisdesc: string;
    bottomsize: number;
    ballssize: number;
    breastsize: number;
    breastdesc: number;
    breastsdesc: number;
    skincolour: number;
    teen: number;
    adult: number;
    init: number;
    intro: number;
    trust: number;
    love: number;
    dom: number;
    lust: number;
    rage: number;
    state: string;
    trauma: number;
    eyeColour: string;
    hairColour: string;
    chastity: {
        penis: string;
        vagina: string;
        anus: string;
    };
    purity: number;
    corruption: number;
    pregnancy: {};
    pregnancyAvoidance: number;
    virginity: {
        anal: boolean;
        oral: boolean;
        penile: boolean;
        vaginal: boolean;
        handholding: boolean;
        temple: boolean;
        kiss: boolean;
    };

    /**
     * Initialize the NPC with gender and age.
     *
     * @param {string} gender The gender of the NPC.
     * @param {string} age The age of the NPC.
     * @returns {NamedNPC} The NPC with set gender and age.
     */
    Init(gender: string, age: string): NamedNPC;

    /**
     * Set the age group of the NPC.
     *
     * @param {string} age The age group of the NPC ('teen' or 'adult').
     * @returns {NamedNPC} The NPC with set age group.
     */
    setAge(age: string): NamedNPC;

    /**
     * Set the specific key to the provided value.
     *
     * @param {string} key The key to set.
     * @param {any} value The value of the key.
     * @returns {NamedNPC} The NPC with the key set to the provided value.
     */
    setValue(key: string, value: any): NamedNPC;

    /**
     * Set the pronouns for the NPC based on their gender.
     *
     * @param {string} gender The gender of the NPC.
     * @returns {NamedNPC} The NPC after updating their pronouns.
     */
    setPronouns(gender: string): NamedNPC;

    pronouns: {
        he: string;
        his: string;
        hers: string;
        him: string;
        himself: string;
        man: string;
        boy: string;
        men: string;
    };

    /**
     * Set the gender for the NPC.
     *
     * @param {string} gender The gender to set for the NPC.
     * @returns {NamedNPC} The NPC after updating their gender.
     */
    setGender(gender: string): NamedNPC;

    gender: string;

    /**
     * Set the penis size and description for the NPC.
     *
     * @param {number} size The size of the penis.
     * @param {string} des The description of the penis.
     * @returns {NamedNPC} The NPC after updating their penis size and description.
     */
    setPenis(size: number, des: string): NamedNPC;

    /**
     * Set the breast size and description for the NPC.
     *
     * @param {number} size The size of the breasts.
     * @param {string} des The description of the breast.
     * @param {string} desc The description of the breastsdesc.
     * @returns {NamedNPC} The NPC after updating their breast size and description.
     */
    setBreasts(size: number, des: string, desc: string): NamedNPC;

    /**
     * Sets the skin, eye and hair color of the NPC.
     *
     * @param {string} skin The skin color.
     * @param {string} eye The eye color.
     * @param {string} hair The hair color.
     * @returns {NamedNPC} The NPC after updating their color properties.
     */
    setColour(skin: string, eye: string, hair: string): NamedNPC;

    /**
     * Set the virginity status of the NPC.
     *
     * @param {object} object The virginity object.
     * @returns {NamedNPC} The NPC after updating their virginity status.
     */
    setVirginity(object: object): NamedNPC;

    /**
     * Set the pregnancy details of the NPC.
     *
     * @returns {NamedNPC} The NPC after setting their pregnancy details.
     */
    setPregnancy(): NamedNPC;

    /**
     * Set custom pronouns for the NPC.
     *
     * @param {object} object An object containing custom pronouns.
     * @returns {NamedNPC} The NPC after setting their custom pronouns.
     * @example
     * obj.setCustomPronouns( {
     *                 he      : 'he',
     *                 his     : 'his',
     *                 hers    : 'hers',
     *                 him     : 'him',
     *                 himself : 'himself',
     *                 man     : 'man',
     *                 boy     : 'boy',
     *                 men     : 'men'
     *             });
     */
    setCustomPronouns(object: object): NamedNPC;

    /**
     * Designate this NPC as important.
     *
     * @returns {NamedNPC} The NPC marked as important.
     */
    isImportant(): NamedNPC;

    /**
     * Designate this NPC as special.
     *
     * @returns {NamedNPC} The NPC marked as special.
     */
    isSpecial(): NamedNPC;
}

// @ts-ignore
declare global {
    interface Window {
        NamedNPC: typeof NamedNPC;
    }
}

declare interface setup {
    addNPCList: any[];
    ModNpcSetting: any[];
    ModNpcImportant: string[];
    ModNpcSpecial: string[];
    ModSocialSetting: () => void;
    ModLoveInterest: () => void;
}

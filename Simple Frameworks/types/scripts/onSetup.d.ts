interface iModManager {
    /**
     * iModManager is an object that provides methods to set, get, add and initialize certain game variables and configurations.
     */
    setCf(prop: string, value: any): void;

    /**
     * Returns the value of a configuration property.
     *
     * @param {string} prop The configuration property to get.
     * @returns {*} The value of the configuration property.
     */
    getCf(prop: string): any;

    /**
     * Sets the value of a game variable.
     *
     * @param {string} prop The game variable to set.
     * @param {*} value The value to set for the game variable.
     */
    setV(prop: string, value: any): void;

    /**
     * Adds a value to a game variable.
     * If the game variable does not already exist, it is created with the given value.
     * If it already exists, the given value is added to it.
     *
     * @template T expected Return Type
     * @param {string} prop The game variable to add value to.
     * @param {T} value The value to add to the game variable.
     * @returns {T} The new value of the game variable.
     */
    addV<T>(prop: string, value: T): T;

    /**
     * Returns the value of a game variable.
     *
     * @param {string} prop The game variable to get.
     * @returns {*} The value of the game variable.
     */
    getV(prop: string): any;

    /**
     * This function sets the value of a specific property for a particular character(NPC).
     * If the property value does not exist then it creates an empty object for that character
     * and then sets the property value.
     *
     * @param {string} chara The non-player character (NPC) identifier.
     * @param {string} prop the property to set.
     * @param {*} value the value to set for the property.
     * @returns {*} The value of the `chara` character after the new property value has been set.
     */
    setNpc(chara: string, prop: string, value: any): any;

    /**
     * This function retrieves the value of a specific property for a particular character(NPC).
     * If the character or property does not exist then it creates an empty object for that character
     * and then returns the property value of that character.
     *
     * @param {string} chara The non-player character (NPC) identifier.
     * @param {string} prop the property to get.
     * @returns {*} The value of the specified property for the given character.
     */
    getNpc(chara: string, prop: string): any;

    /**
     * This function modifies the value of a specific property for a particular character(NPC).
     * The modification depends on the type of the existing property value.
     * If the existing value is a number, it is incremented by the new value.
     * If it's an array, the new value is pushed to the existing array.
     * If it's an object, the new value is merged into the existing object.
     * If the existing value is of any other type or does not exist, it is replaced by the new value.
     *
     * @param {string} prop The non-player character (NPC) identifier.
     * @param {*} value the new value to modify the existing property value.
     * @returns {*} The new value of the `prop` after modification.
     */
    npcV(prop: string, value: any): any;

    /**
     * Initializes a game variable or configuration if it doesn't already exist, and ensures that
     * the 'set' and 'get' methods exist and console logs an initialization message.
     *
     * @param {string} type The type of game variable or configuration to initialize.
     */
    init(type: string): void;

    /**
     * Checks if a game variable or configuration of a certain type has a particular property.
     *
     * @param {string} type The type of game variable or configuration to check.
     * @param {string} prop The property to check.
     * @returns {boolean} True if the property exists, false otherwise.
     */
    has(type: string, prop: string): boolean;
}

// @ts-ignore
declare global {
    interface Window {
        iMod: typeof iModManager;
    }

    function modCombatDifficul(diffAction: any, action: any): string;

    function iModonReady(): void;

    function checkUpdate(): void;

    const lancheck: number;
}

declare interface Window {
    iMod: typeof iModManager;
}

type LanNameType = [string, string];

interface ModTraitsType {
    addto: string;
    name: LanNameType;
    cond: () => boolean;
    text: LanNameType | (() => string);
    colour?: string;
}

interface ModTraitTitleType {
    title: string;
    display: LanNameType;
    traits: {
        name: LanNameType;
        cond: () => boolean;
        text: LanNameType;
    }[];
}

interface ModTattoosType {
    key: string;
    name: string;
    cn: string;
    special: string;
}

interface ModCombatActionsType {
    displayname: LanNameType;
    value: string;
    type: string;
    widget: string;
    mainType: string;
    color: string;
    condition: () => boolean;
}

declare interface setup {
    DOLNPCNames: { [key: string]: [string, string] };
    dolbus: string[];

    ModTraits: ModTraitsType[];
    ModTraitTitle: ModTraitTitleType[];
    addModTrait: () => void;

    modTattoos: ModTattoosType [];
    addBodyWriting: () => void;

    modCombatActions: ModCombatActionsType[];
    ModCombatSetting: () => void;

    NPCFrameworkOnLoad: boolean;
}

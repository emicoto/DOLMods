
//------------------------------------------------------
//
//  新增NPC支持框架
//
//------------------------------------------------------
class NamedNPC {
    /**
     * A list of all named NPC objects.
     */
    static database = [];
    /**
     * Add a new NPC object or multiple new NPC objects.
     *
     * @param {...NamedNPC} npc The NPC object(s) to be added.
     */
    static add(...npc) {
        this.database.push(...npc);
    }
    /**
     * Clear/clean up the NPCs.
     */
    static clear() {
        // - 清理非法NPC
        console.log('[SFInfo] start to reslove npcs....', clone(V.NPCName) , clone(setup.NPCNameList));
        const newnpcs = [];
        for (let i = 0; i < V.NPCName.length; i++) {
            const npc = V.NPCName[i];
            if (setup.NPCNameList.includes(npc.nam)) {
                console.log('[SFInfo] resloving npcs...', npc.nam);
                newnpcs.push(V.NPCName[i]);
            }
        }
        V.NPCName = newnpcs;
        V.NPCNameList = setup.NPCNameList;
        console.log('[SFInfo] npcs resloving done!');
    }

    /**
     * Check if a named NPC is stored in the database.
     *
     * @param {string} name The name of an NPC.
     * @returns {number} The index at which the first NPC with a matching name can be
     * found in the array, or -1 if it is not present.
     */
    static has(name) {
        return this.database.findIndex(npc => npc.nam == name);
    }
    /**
     * Update all the NPCs stored in the class database with basic properties defined in this code block.
     */
    static update() {
        const hasnpc = name => V.NPCName.filter(npc => npc.nam == name)[0];
        console.log('[SFInfo] start to update npcs....');

        this.database.forEach(data => {
            const npc = clone(data);
            if (V.NPCNameList.includes(npc.nam) === false || !hasnpc(npc.nam)) {
                console.log('[SFInfo] update npcs:', npc.nam);
                npc.title = lanSwitch(npc.title_lan);
                npc.displayname = lanSwitch(npc.displayname_lan);

                if (!V.NPCName.find(chara => chara.nam == npc.nam)) {
                    V.NPCName.push(npc);
                }
                if (!setup.NPCNameList.includes(npc.nam)) {
                    setup.NPCNameList.push(npc.nam);
                }
                if (!V.NPCNameList.includes(npc.nam)) {
                    V.NPCNameList.push(npc.nam);
                }

                if (!C.npc.hasOwnProperty(npc.nam)) {
                    Object.defineProperty(C.npc, npc.nam, {
                        get() {
                            return V.NPCName[setup.NPCNameList.indexOf(npc.nam)];
                        },
                        set(val) {
                            V.NPCName[setup.NPCNameList.indexOf(npc.nam)] = val;
                        }
                    });
                }
            }
        });

        // 按setup的顺序重新排序
        const { npcs, list } = setup.NPCNameList.reduce((res, npc) => {
            const index = setup.NPCNameList.indexOf(npc);
            res.list[index] = npc;
            const [data] = V.NPCName.filter(data => data.nam == npc);
            res.npcs[index] = data;
            return res;
        }, { npcs : [], list : [] });

        V.NPCName = npcs;
        V.NPCNameList = list;

        // 更新显示名称
        V.NPCName.forEach(npc => {
            if (npc.displayname == undefined && setup.DOLNPCNames[npc.nam]) {
                npc.displayname = npc.nam;
                npc.displayname_lan = setup.DOLNPCNames[npc.nam];
            }
            else if (npc.displayname_lan == undefined && npc.description_lan) {
                npc.displayname_lan = npc.description_lan;
                npc.displayname = lanSwitch(npc.displayname_lan);
            }
            else if (npc.displayname == undefined) {
                npc.displayname_lan = [npc.nam, npc.description];
                npc.displayname = npc.nam;
            }
        });
    }
    static switchlan() {
        V.NPCName.forEach(npc => {
            if (npc.title_lan) {
                npc.title = lanSwitch(npc.title_lan);
            }
            if (npc.displayname_lan) {
                npc.displayname = lanSwitch(npc.displayname_lan);
            }
        });
    }

    /**
     * Initialize the NPCs by updating them.
     */
    static init() {
        this.update();
        console.log('[SFDebug] addNamedNPC', 'init mod npc from storyinit', V.NPCName, setup.NPCNameList);
    }

    /**
     * Reset the NPC with the provided data
     *
     * @param {NamedNPC} npc The NPC data to be reset.
     * @returns {NamedNPC} The reset NPC data.
     */
    static reset(npc) {
        const data = new NamedNPC(npc.nam, npc.title, npc.des, npc.type);
        for (const i in npc) {
            data[i] = npc[i];
        }
        return data;
    }

    /**
     * Constructor to create a new object of the NamedNPC class.
     *
     * @param {string} name The name of the NPC
     * @param {string} title The title of the NPC
     * @param {string} des The description of the NPC
     * @param {string} type The type of the NPC
     */
    constructor(name, title, des, type) {
        this.nam = name;
        this.description = name;
        this.title_lan = title;
        this.displayname_lan = des;
        this.type = type;

        this.penis = 0;
        this.vagina = 0;
        this.insecurity = 'none';
        this.pronoun = 'none';
        this.penissize = 0;
        this.penisdesc = 'none';
        this.bottomsize = 0;
        this.ballssize = 0;
        this.breastsize = 0;
        this.breastdesc = 0;
        this.breastsdesc = 0;

        this.skincolour = 0;
        this.teen = 0;
        this.adult = 1;
        this.init = 0;
        this.intro = 0;
        this.trust = 0;
        this.love = 0;
        this.dom = 0;
        this.lust = 0;
        this.rage = 0;
        this.state = '';
        this.trauma = 0;

        this.eyeColour = '';
        this.hairColour = '';

        this.chastity = { penis : '', vagina : '', anus : '' };

        this.purity = 0;
        this.corruption = 0;

        this.pregnancy = {};
        this.pregnancyAvoidance = 100;

        this.virginity = {
            anal        : false,
            oral        : false,
            penile      : false,
            vaginal     : false,
            handholding : false,
            temple      : false,
            kiss        : false
        };
    }

    /**
     * Initialize the NPC with gender and age.
     *
     * @param {string} gender The gender of the NPC.
     * @param {string} age The age of the NPC.
     * @returns {NamedNPC} The NPC with set gender and age.
     */
    Init(gender, age) {
        this.setGender(gender);
        this.setAge(age);

        return this;
    }

    /**
     * Set the age group of the NPC.
     *
     * @param {string} age The age group of the NPC ('teen' or 'adult').
     * @returns {NamedNPC} The NPC with set age group.
     */
    setAge(age) {
        if (age == 'teen') {
            this.teen = 1;
            this.adult = 0;
        }
        else {
            this.adult = 1;
            this.teen = 0;
        }
        return this;
    }
    /**
     * Set the specific key to the provided value.
     *
     * @param {string} key The key to set.
     * @param {any} value The value of the key.
     * @returns {NamedNPC} The NPC with the key set to the provided value.
     */
    setValue(key, value) {
        this[key] = value;
        return this;
    }
    /**
     * Set the pronouns for the NPC based on their gender.
     *
     * @param {string} gender The gender of the NPC.
     * @returns {NamedNPC} The NPC after updating their pronouns.
     */
    setPronouns(gender) {
        if (gender == 'm') {
            this.pronouns = {
                he      : 'he',
                his     : 'his',
                hers    : 'hers',
                him     : 'him',
                himself : 'himself',
                man     : 'man',
                boy     : 'boy',
                men     : 'men'
            };
        }
        else {
            this.pronouns = {
                he      : 'she',
                his     : 'her',
                hers    : 'hers',
                him     : 'her',
                himself : 'herself',
                man     : 'woman',
                boy     : 'girl',
                men     : 'women'
            };
        }
        return this;
    }

    /**
     * Set the gender for the NPC.
     *
     * @param {string} gender The gender to set for the NPC.
     * @returns {NamedNPC} The NPC after updating their gender.
     */
    setGender(gender) {
        this.gender = gender;
        this.penis = gender == 'm' ? 'clothed' : 'none';
        this.penissize = 3;
        this.penisdesc = 'penis';
        this.vagina = gender == 'm' ? 'none' : 'clothed';
        this.pronoun = gender;
        this.setPronouns();
        return this;
    }

    /**
     * Set the penis size and description for the NPC.
     *
     * @param {number} size The size of the penis.
     * @param {string} des The description of the penis.
     * @returns {NamedNPC} The NPC after updating their penis size and description.
     */
    setPenis(size, des) {
        this.penissize = size;
        this.penisdesc = des;
        return this;
    }

    /**
     * Set the breast size and description for the NPC.
     *
     * @param {number} size The size of the breasts.
     * @param {string} des The description of the breast.
     * @param {string} desc The description of the breastsdesc.
     * @returns {NamedNPC} The NPC after updating their breast size and description.
     */
    setBreasts(size, des, desc) {
        this.breastsize = size;
        this.breastdesc = des;
        this.breastsdesc = desc;
        return this;
    }
    /**
     * Sets the skin, eye and hair color of the NPC.
     *
     * @param {string} skin The skin color.
     * @param {string} eye The eye color.
     * @param {string} hair The hair color.
     * @returns {NamedNPC} The NPC after updating their color properties.
     */
    setColour(skin, eye, hair) {
        this.skincolour = skin;
        this.eyeColour = eye;
        this.hairColour = hair;
        return this;
    }

    /**
     * Set the virginity status of the NPC.
     *
     * @param {object} object The virginity object.
     * @returns {NamedNPC} The NPC after updating their virginity status.
     */
    setVirginity(object) {
        for (const i in object) {
            this.virginity[i] = object[i];
        }
        return this;
    }

    /**
     * Set the pregnancy details of the NPC.
     *
     * @returns {NamedNPC} The NPC after setting their pregnancy details.
     */
    setPregnancy() {
        const pregnancy = {
            fetus             : [],
            givenBirth        : 0,
            totalBirthEvents  : 0,
            timer             : null,
            timerEnd          : null,
            waterBreaking     : null,
            npcAwareOf        : null,
            pcAwareOf         : null,
            type              : null,
            enabled           : true,
            cycleDaysTotal    : random(24, 32),
            cycleDay          : 0,
            cycleDangerousDay : 10,
            sperm             : [],
            potentialFathers  : [],
            nonCycleRng       : [
                random(0, 3), random(0, 3)
            ],
            pills : null
        };

        pregnancy.cycleDay = random(1, pregnancy.cycleDaysTotal);
        pregnancy.cycleDangerousDay = 10;

        this.pregnancy = pregnancy;
        this.pregnancyAvoidance = 50;
        return this;
    }

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
    setCustomPronouns(object) {
        for (const i in object) {
            this.pronouns[i] = object[i];
        }
        return this;
    }

    /**
     * Designate this NPC as important.
     *
     * @returns {NamedNPC} The NPC marked as important.
     */
    isImportant() {
        setup.ModNpcImportant.push(this.nam);
        return this;
    }

    /**
     * Designate this NPC as special.
     *
     * @returns {NamedNPC} The NPC marked as special.
     */
    isSpecial() {
        setup.ModNpcSpecial.push(this.nam);
        return this;
    }
}

window.NamedNPC = NamedNPC;
setup.addNPCList = [];
setup.ModNpcSetting = {};
setup.ModNpcImportant = [];
setup.ModNpcSpecial = [];

setup.ModSocialSetting = function () {
    // make a bakup
    const config = clone(setup.ModNpcSetting);

    // init the options
    for (const [npc, settings] of Object.entries(setup.ModNpcSetting)) {
        for (const [key, option] of Object.entries(settings)) {
            if (typeof option === 'function') {
                settings[key] = option();
            }
            if (typeof option === 'object') {
                for (const i in option) {
                    const value = option[i];
                    if (typeof value === 'function') {
                        option[i] = value();
                    }
                    if (Array.isArray(value) && i == 'displayname') {
                        option.name = lanSwitch(value);
                    }
                }
            }
        }
    }
    Object.assign(T.npcConfig, setup.ModNpcSetting);

    const extra = Object.entries(setup.ModNpcSetting).reduce((list ,[npcname, config]) => {
        if (config.important) {
            list.push(npcname);
        }
        return list;
    }, []);

    T.importantNpcOrder.push(...extra);
    T.specialNPCs.push(...setup.ModNpcSpecial);

    // reset the configs
    setup.ModNpcSetting = config;
};

setup.ModLoveInterest = function () {
    // 把列表塞npc对照表
    T.npc.push(...setup.ModNpcImportant);

    // 根据条件塞入可选项
    setup.ModNpcImportant.forEach(npc => {
        const config = setup.ModNpcSetting[npc];
        if (config && typeof config.loveInterest === 'function') {
            if (config.loveInterest()) {
                T.potentialLoveInterests.push(npc);
            }
        }
        else if (config && typeof config.loveInterest === 'boolean') {
            if (config.loveInterest) {
                T.potentialLoveInterests.push(npc);
            }
        }
        else {
            T.potentialLoveInterests.push(npc);
        }
    });

    T.loveInterestSelections = {};
    const non = lanSwitch('None', '没有人');
    T.loveInterestSelections[non] = 'None';

    T.potentialLoveInterests.forEach(nnpc => {
        if (nnpc !== 'None') {
            const key = C.npc[nnpc].displayname;
            T.loveInterestSelections[key] = nnpc;
        }
    });
};

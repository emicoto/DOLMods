// add your NPC here
NamedNPC.add(
    new NamedNPC(
        'Tester',    // NPC name, also is their ID name
        ['Tester', '测试员'],  // NPC title, should be an array for language support. also you can just write ['English', 'English]
        ['Tester', '特斯特'], // NPC name for display.
        'robot'  // NPC type, or races
    )
        .Init('m', 'adult') // no necessary, but if want to initialaze your npc gender before start, you can add .Init('f/m', 'adult/teen') after parentheses
        .setValue('insecurity', 'weak') // no necessary, but if need an insecurity, use .setValue('insecurity', 'any'), PS, the default value is 'none', also you can set any additional varlue by this function.
        .setPenis(5, 'Big')// no necessary, but if want to set penis size before start, default value is 3
        .setBreasts(5, 'Cup')// no necessary, but if want to set breast size before start
        .setColour('pale', 'brown', 'blond') // no necessary, but if want to set skin/eye/hair color before start, will automaticall set color by vanilla initianazation
        .setPregnancy() // no necessary, but if want to enable their pregnancy before start
        .isImportant() // no necessary, but if want to set as love interest
);

// also you can add alot at once. dont forget the small comma
NamedNPC.add(
    new NamedNPC('Akosan', ['AkosanTitle', 'A子头衔'], ['Akosan', 'A子'], 'human'),
    new NamedNPC('Bkosan', ['BkosanTitle', 'B子头衔'], ['Bkosan', 'B子'], 'human'),
    new NamedNPC('Ckosan', ['CkosanTitle', 'C子头衔'], ['Ckosan', 'C子'], 'human').Init('f', 'teen'), // init Ckosan gender before start
    new NamedNPC('Dkosan', ['DkosanTitle', 'D子头衔'], ['Dkosan', 'D子'], 'human').setValue('trust', 5), // set Dkosan basic trust before start
    new NamedNPC('Sampler', ['robot', '机器人'], ['Sampler', '样本员'], 'robot').setColour('pale', 'blue', 'black').isImportant() // set Ekosan  color before start
);


// set your npc setting via object. temple can check in social.twee from vanilla code
const myNpcSetting = {
    Akosan : // this must be same as their ID name
     {
     	love : { maxValue : 30  }, // set max value of love
     	dom  : { name : 'Confidence', activeIcon : 'img/ui/confidence.png', color : 'blue' } // set display option
     },

    Bkosan : {
        trust : { maxValue : 50 }
    },

    Tester : {
        important    : true,  // set as love interest. also need to set as important when add npc,
        dom          : { name : 'Trust', maxValue : 100, activeIcon : 'img/ui/confidence.png', color : 'blue' },
        loveInterest : () => V.tester?.humanity > 80 && V.tester?.emotional > 60 && V.tester?.desire > 10
        // config the condition of selectable potential love interest.
        // if no config then they will always show up at the selection box
    },

    Sampler : {
        important : () => V.sampler?.process > 50, // all those value can set as function check with conditions
        love      : { displayname : ['Devotion', '忠诚'], requirements : () => V.sample?.condition > 50 },

        // also you can just set a boolean for loveInterest, make your npc is important but disable the selection from love interest
        loveInterest : false
    }
};


// then assign it
Object.assign(setup.ModNpcSetting, myNpcSetting);


// write you traits setting
const myTraits = [

    {
        addto  : 'General Traits', // which genre of traits to add. must write the vanilla name(english)
        name   : ['Custom Trait1', '自定义特征1'], // the trait name,
        cond   : () => V.player.virginity.anal == true, // the condition for get the trait
        text   : ['A simple trait add by mod.', '一个简单的自定义特征'], // the display text
        colour : 'green' // not necessary, optional for display color

    },

    {
        addto : 'Custom Traits',
        name  : ['Custom Trait2', '自定义特征2'],
        cond  : () => V.player.virginity.vaginal == true,
        
        text : () => {   // text, name, colour can be function for change display with condition.
            if (V.purity > 800) {
                return 'You are innocence.';
            }
            return 'A simple trait add by mod with condition';
        },

        colour : 'green'

    }

];

// then push to the setup
setup.ModTraits.push(...myTraits);

// add new Traits Display zone
setup.ModTraitTitle.push({
    title   : 'Custom Traits', // the id for code
    display : ['Custom Trait', '自定义特征'] // the text for display
});

setup.ModTraitTitle.push({
    title   : 'Custom Traits 2',
    display : ['Custom Traits', '自定义特征'],
    traits  : [ // also you can set a lot of traits with a new traits title
        {
            name : ['a trait', '一个特征'],
            cond : () => V.intro == 0,

            text : ['a trait', '一个特征']
        },
        {
            name : ['a trait', '一个特征'],
            cond : () => V.intro == 0,

            text : ['a trait', '一个特征']
        }
    ]
});

/**
 *  also you can add a lot at once
 * setup.ModTraitTitle.push({
    title: 'Custom Traits', //the id for code
    display: ['Custom Trait', '自定义特征'] // the text for display
},
{
    title: 'Custom Traits', //the id for code
    display: ['Custom Trait', '自定义特征'] // the text for display
},
{
    title: 'Custom Traits', //the id for code
    display: ['Custom Trait', '自定义特征'] // the text for display
})
 *
 *
 */

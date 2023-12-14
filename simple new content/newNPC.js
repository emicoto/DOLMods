$(document).on('addNameNPC:ready', ()=>{

    //add your NPC here

    NamedNPC.add(

        new NamedNPC(
            'Tester',    //NPC name
            ['Tester', '测试员'],  //NPC title, should be an array for language support. also you can just write ['English', 'English]
            ['Tester', '测试员'], // NPC description for display.
            'robot'  //NPC type, or races
        )
        .Init('m', 'adult') // no necessary, but if want to initialaze your npc gender before start, you can add .Init('f/m', 'adult/teen') after parentheses
        .setValue('insecurity', 'weak') //no necessary, but if need an insecurity, use .setValue('insecurity', 'any'), PS, the default value is 'none', also you can set any additional varlue by this function.
        .setPenis(5, 'Big')// no necessary, but if want to set penis size before start, default value is 3
        .setBreasts(5, 'Cup')//no necessary, but if want to set breast size before start
        .setColour('pale', 'brown', 'blond') //no necessary, but if want to set skin/eye/hair color before start, will automaticall set color by vanilla initianazation
    )

    //also you can add alot at once. dont forget the small comma
    NamedNPC.add(
        new NamedNPC( 'Akosan', ['AkosanTitle', 'A子头衔'], ['Akosan', 'A子'], 'human' ),
        new NamedNPC( 'Bkosan', ['BkosanTitle', 'B子头衔'], ['Bkosan', 'B子'], 'human' ),
        new NamedNPC( 'Ckosan', ['CkosanTitle', 'C子头衔'], ['Ckosan', 'C子'], 'human' ).Init('f', 'teen'), //init Ckosan gender before start
        new NamedNPC( 'Dkosan', ['DkosanTitle', 'D子头衔'], ['Dkosan', 'D子'], 'human' ).setValue('trust', 5), //set Dkosan basic trust before start
        new NamedNPC( 'Ekosan', ['EkosanTitle', 'E子头衔'], ['Ekosan', 'E子'], 'human' ).setColour('pale', 'blue', 'black'), //set Ekosan  color before start
    )

    
})
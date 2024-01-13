const iCandyModVersion = '2.4.0';
const iCandyStartConfig = {

};

setup.iCandyMod = 'start';

//-------------------------------------------------------------
//
// namespace
//
//-------------------------------------------------------------

Object.defineProperties(window, {
    Macro : { get : () => Macro },
    Story : { get : () => Story },
    R     : { get : () => State.variables.iCandyRobot }
});

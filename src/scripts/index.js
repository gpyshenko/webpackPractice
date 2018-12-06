require('../styles/card.css');
require('../styles/info.css');
require('./contacts')

let asd = 3;
console.log(`Asd ${asd}`);

let globalVar = 10;
let something = function(someArgument) {
    let result = function (someArgument) {
        return someArgument * someArgument + globalVar
    }
    console.log(result(someArgument))
}
something(2)
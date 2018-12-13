require('../styles/card.css');
require('../styles/info.css');
import {num, click} from './other';

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
console.log(num)

click()
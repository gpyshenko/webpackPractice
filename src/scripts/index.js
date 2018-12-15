import '../index.njk';
import '../styles/index-page.css';
import header from '../templates/blocks/header/header';
import {bdModal} from './vendors/modals';
import './vendors/modal.css';
import {num, click} from './other';

bdModal({})
// header

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
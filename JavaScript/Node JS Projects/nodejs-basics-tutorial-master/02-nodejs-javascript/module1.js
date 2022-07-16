// module javascript
var myString = 'Module 1 : string';

function myFunction() {
    console.log('Module 1 : Function was called');
}

module.exports.myFunction = myFunction;
module.exports.myString = myString;
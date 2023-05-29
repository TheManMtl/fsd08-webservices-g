//global object

global.setTimeout(() => {
    console.log('Timed out');
    clearInterval(int);
}, 6020);


var int = setInterval(() => {
    console.log('every 2 sec time out');
}, 2000);


var fullDir = __dirname;
var fullFile = __filename;

console.log(fullDir);
console.log(`file path ${fullFile}`);
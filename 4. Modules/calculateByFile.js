const fs = require('fs');
const opr = require('./opr');

let data = fs.readFileSync('input.txt');

let exp = data.toString().split(',');
let result = 0;
switch(exp[1]) {
    case '+':
        result = opr.add(Number(exp[0]),Number(exp[2]));
        break;
    case '-':
        result = opr.subtract(Number(exp[0]),Number(exp[2]));
        break;
    case '*':
        result = opr.multiply(Number(exp[0]),Number(exp[2]));
        break;
    case '/':
        result = opr.divide(Number(exp[0]),Number(exp[2]));
        break;
    default:
        console.log("Error : Invalid Expression");
        break;
}

fs.writeFile('output.txt',result,(err)=>{
    if (err)
        throw err;
    console.log('Complete');
});

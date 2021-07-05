const fs = require("fs");

let a = fs.readFileSync("pp.txt").toString();

console.log(a.split("\n"));

a = a.split("\n");
a = a.split("\r");

console.log(a);

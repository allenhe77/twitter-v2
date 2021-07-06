const glob = require("glob");
const fs = require("fs");

const f = glob.sync("notworking/*.json");

console.log(f);

for (let i = 0; i < f.length; i++) {
    const file = fs.readFileSync(f[i]).toString();
    const obj = JSON.parse(file);
    console.log(obj.proxy);
}

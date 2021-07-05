const glob = require("glob");
const fs = require("fs");
let a = glob.sync("*.json");

for (let i = 0; i < a.length; i++) {
    const file = fs.readFileSync(a[i]).toString();

    const obj = JSON.parse(file);
    obj.userAgent =
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36";

    fs.writeFileSync(a[i], JSON.stringify(obj));
}

const glob = require("glob");
const { quarantine } = require("./secondCapcha");
let fileArr;

const a = glob.sync("quarantine/*.json", {});
console.log(a);
const quaRun = async () => {
    for (let i = 0; i < a.length; i++) {
        try {
            await quarantine(a[i]);
        } catch (err) {
            console.error(err);
        }
    }
};

quaRun();

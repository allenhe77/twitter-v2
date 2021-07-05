const glob = require("glob");
const { quarantine } = require("./secondCapcha");
let fileArr;

const a = glob.sync("quarantine/*.json", {});

const quaRun = async () => {
    for (let i = 0; i < a.length; i += 5) {
        await Promise.all([
            quarantine(a[i]),
            quarantine(a[i + 1]),
            quarantine(a[i + 2]),
            quarantine(a[i + 3]),
            quarantine(a[i + 4]),
            // testBot(i + 5),
            // testBot(i + 6),
            // testBot(i + 7),
            // testBot(i + 8),
            // testBot(i + 9),
        ]);
    }
};

quaRun();

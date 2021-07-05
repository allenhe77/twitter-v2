const glob = require("glob");
const fs = require("fs");

const botFileNames = glob.sync("testing/*.json");

const proxies = fs.readFileSync("./lots.txt").toString().split("\r");

const proxyArr = [];

proxies.map((e) => {
    proxyArr.push(e.split("\n")[1]);
});

proxyArr.splice(0, 1);

const users = JSON.parse(fs.readFileSync("./users.json").toString());
const userObj = {};
//
for (let i = 0; i < botFileNames.length; i++) {
    // console.log(fileNames[i].split(".")[0].split("/")[1]);
    const obj = JSON.parse(fs.readFileSync(botFileNames[i]));
    // console.log(obj.cookies);
    fs.writeFileSync(
        `cookies/${obj.username}.json`,
        JSON.stringify(obj.cookies)
    );
    userObj[obj.username] = {
        proxy: proxyArr[i].split(":")[2] + ":" + proxyArr[i].split(":")[3],
        proxyUser: proxyArr[i].split(":")[0],
        proxyPass: proxyArr[i].split(":")[1],
        followed: {},
        liked: {},
        commented: {},
        retweeted: {},
        whatToComment: "Nice!",
        region: "RU",
    };
    // console.log(fileNames[4]);
}

fs.writeFileSync("./users.json", JSON.stringify(userObj));

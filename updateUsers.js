const {
    getUserNameFromTxt,
    decodeCookies,
    getCookieString,
    getLinesFromOrderTxt,
} = require("./utils");
const fs = require("fs");

const users = JSON.parse(fs.readFileSync("./users.json").toString());

const file = fs.readFileSync("./order.txt");
const linesArray = getLinesFromOrderTxt(file);

Array.prototype.contains = function (element) {
    return this.indexOf(element) > -1;
};

linesArray.map((element) => {
    let userName = getUserNameFromTxt(element);
    let cookieStr = getCookieString(element);
    decodeCookies(cookieStr, userName);
    if (!Object.keys(users).contains(userName)) {
        Object.assign(users, {
            [userName]: {
                proxy: "",
                followed: {},
                liked: {},
                commented: {},
                retweeted: {},
                whatToComment: "",
                region: "",
            },
        });
    }
});

fs.writeFileSync("./users.json", JSON.stringify(users));

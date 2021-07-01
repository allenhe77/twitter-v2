const {
    getUserNameFromTxt,
    decodeCookies,
    getCookieString,
    getLinesFromOrderTxt,
} = require("./utils");
const fs = require("fs");
const path = require("path");

const jsonPath = path.join(__dirname, "../users.json");

const users = JSON.parse(fs.readFileSync(jsonPath).toString());

const orderTxtPath = path.join(__dirname, "../order.txt");

const file = fs.readFileSync(orderTxtPath);
const linesArray = getLinesFromOrderTxt(file);

Array.prototype.contains = function (element) {
    return this.indexOf(element) > -1;
};

const updateUsers = async () => {
    return new Promise(async (resolve) => {
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

        fs.writeFileSync(jsonPath, JSON.stringify(users));
        resolve(true);
    });
};

exports.updateUsers = updateUsers;

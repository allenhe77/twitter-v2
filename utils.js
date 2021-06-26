const fs = require("fs");
const botUsersFilePath = "./users.json";

const getUserNameFromTxt = (str) => {
    //return username from original format
    const reg = /twitter.com\/(.*):Mozilla/;

    return str.match(reg)[1];
};

const getCookieString = (str) => {
    return str.split(":")[5];
};

const decodeCookies = (str, userName) => {
    let b64string = str;
    let buf = Buffer.from(b64string, "base64"); // Ta-da
    let text = buf.toString();
    const newText = text.replace(/'/g, '"');
    const newText2 = newText.replace(/True/g, "true");
    const newText3 = newText2.replace(/False/g, "false");
    const newText4 = newText3.replace(/""/g, '"');
    let parsedCookies = JSON.parse(newText4);

    fs.writeFileSync(
        `./cookies/${userName}.json`,
        JSON.stringify(parsedCookies)
    );
};

const getLinesFromOrderTxt = (file) => {
    let eachLine = file.toString().split("\n");
    let eachLineNew = [];
    eachLine.map((ele, index) => {
        if (ele !== "") {
            eachLineNew.push(ele);
        }
    });

    return eachLineNew;
};

const sleep = async (timeInMs) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), timeInMs);
    });
};

const getShuffledArr = (arr) => {
    const newArr = arr.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr;
};

const getBotUsersObject = () => {
    return JSON.parse(fs.readFileSync(botUsersFilePath).toString());
};

const updateBotActionList = (botAction, botTwitHandle, followedUsername) => {
    const botUsersObj = getBotUsersObject();

    switch (botAction) {
        case "follow":
            botUsersObj[botTwitHandle].followed[followedUsername] = true;
            break;
        case "like":
            botUsersObj[botTwitHandle].liked[followedUsername] = true;
            break;

        case "comment":
            botUsersObj[botTwitHandle].commented[followedUsername] = true;
            break;
        case "retweet":
            botUsersObj[botTwitHandle].retweeted[followedUsername] = true;
            break;
    }

    // botUsersObj[botTwitHandle].followed[followedUsername] = true;

    fs.writeFileSync(botUsersFilePath, JSON.stringify(botUsersObj));
};

const updateNotAllowedBotsList = (
    botUsersObj,
    botUserArr,
    botUserAllowed,
    action,
    followUserName
) => {
    const newArr = botUserArr.filter((val) => !botUserAllowed.includes(val));

    switch (action) {
        case "like":
            newArr.map((e) => {
                botUsersObj[e].liked[followUserName] = false;
            });

            break;
        case "comment":
            newArr.map((e) => {
                botUsersObj[e].commented[followUserName] = false;
            });
            break;
        case "retweet":
            newArr.map((e) => {
                botUsersObj[e].retweeted[followUserName] = false;
            });
            break;
    }
};

const getAllowedBots = (botUsersObj, botUserArr, action, followUserName) => {
    const newBotUserArr = [];
    switch (action) {
        case "follow":
            botUserArr.map((e) => {
                if (botUsersObj[e].followed[followUserName] === undefined) {
                    newBotUserArr.push(e);
                }
            });
            console.log("new user arr is: ", newBotUserArr);
            break;
        case "like":
            botUserArr.map((e) => {
                const likedTime = botUsersObj[e].liked[followUserName];
                const cooldownTimeInMin = 5;
                if (!likedTime || likedTime === undefined) {
                    newBotUserArr.push(e);
                }
            });
            console.log("new user arr is: ", newBotUserArr);
            break;
        case "comment":
            botUserArr.map((e) => {
                const commentedTime = botUsersObj[e].liked[followUserName];
                const cooldownTimeInMin = 5;
                if (!commentedTime || commentedTime === undefined) {
                    newBotUserArr.push(e);
                }
            });
            break;
        case "retweet":
            botUserArr.map((e) => {
                const retweetedTime = botUsersObj[e].liked[followUserName];
                const cooldownTimeInMin = 5;
                if (!retweetedTime || retweetedTime === undefined) {
                    newBotUserArr.push(e);
                }
            });
            break;
    }

    return newBotUserArr;
};

exports.updateNotAllowedBotsList = updateNotAllowedBotsList;
exports.getAllowedBots = getAllowedBots;
exports.updateBotActionList = updateBotActionList;
exports.shuffleArray = getShuffledArr;
exports.sleep = sleep;
exports.getLinesFromOrderTxt = getLinesFromOrderTxt;
exports.decodeCookies = decodeCookies;
exports.getUserNameFromTxt = getUserNameFromTxt;
exports.getCookieString = getCookieString;

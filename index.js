const { exec, execSync } = require("child_process");
const fs = require("fs");
const {
    sleep,
    shuffleArray,
    updateBotActionList,
    getAllowedBots,
    updateNotAllowedBotsList,
} = require("./utils");

const users = JSON.parse(fs.readFileSync("./users.json").toString());
const usersInArr = Object.keys(users);
const numberOfAvailableBot = usersInArr.length;
let msg;
let count = 0;

const actionType = process.argv[2];
const userTwitHandle = process.argv[3];
const numberOfBotsToUse = process.argv[4];
const delay = process.argv[5];
let oldOrNew = process.argv[6];

// console.log(usersInArr);
// const getShuffledArr = (arr) => {
//     const newArr = arr.slice();
//     for (let i = newArr.length - 1; i > 0; i--) {
//         const rand = Math.floor(Math.random() * (i + 1));
//         [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
//     }
//     return newArr;
// };
const botUserAllowed = getAllowedBots(
    users,
    usersInArr,
    actionType,
    userTwitHandle
);
// const shuffledUserArray = shuffleArray(botUserAllowed);
let shuffledUserArray;
if (oldOrNew === "new") {
    shuffledUserArray = shuffleArray(usersInArr);
} else if (oldOrNew === "old") {
    shuffledUserArray = shuffleArray(botUserAllowed);
}
console.log("Shuufled arr: ", shuffledUserArray);

const run = async () => {
    for (let i = 0; i < numberOfBotsToUse; i++) {
        const botTwitUsername = shuffledUserArray[i];
        const proxy = users[shuffledUserArray[i]].proxy;
        const comment = users[shuffledUserArray[i]].whatToComment.replace(
            / /g,
            "\\ "
        );
        await sleep(delay);

        if (actionType === "comment") {
            console.log(
                execSync(
                    `node botAction.js ${actionType} ${userTwitHandle} ${botTwitUsername} ${proxy} ${comment}`
                ).toString()
            );
        } else {
            console.log(
                execSync(
                    `node botAction.js ${actionType} ${userTwitHandle} ${botTwitUsername} ${proxy}`
                ).toString()
            );
        }

        updateBotActionList(actionType, botTwitUsername, userTwitHandle);
    }

    if (oldOrNew === "new") {
        updateNotAllowedBotsList(
            users,
            usersInArr,
            botUserAllowed,
            actionType,
            userTwitHandle
        );
    }
};

if (numberOfAvailableBot < numberOfBotsToUse) {
    console.log("Number of bots you have: ", numberOfAvailableBot);
    console.log("Number of bots you intend to use: ", numberOfBotsToUse);
    console.log(
        "Not enough bots available, please contact us to get more bots."
    );
} else if (
    actionType === "comment" ||
    actionType === "like" ||
    actionType === "retweet"
) {
    if (process.argv[6] === "old" || process.argv[6] === "new") {
        run();
    } else {
        console.log("Please specify new or old.");
        console.log(
            "Old means that other bots hae already liked, commented or retweeted this tweet."
        );
        console.log(
            "New means that no bots have liked, commented or retweeted this tweet yet."
        );
    }
} else {
    run();
}

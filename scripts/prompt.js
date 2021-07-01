const {
    followOptions,
    likeOptions,
    commentOptions,
    retweetOptions,
} = require("./promptOptionsQuestions");

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const { updateUsers } = require("./updateUsers");

const actionTypeQ = async () => {
    return new Promise((resolve) => {
        rl.question(
            "Please enter you options, \n [1] to follow \n [2] to like \n [3] to comment \n [4] to retweet \n [5] to add more bots",
            (option) => {
                resolve(option);
            }
        );
    });
};

const userToFollowQ = async () => {
    return new Promise((resolve) => {
        rl.question("Please enter the user's twitter handle \n", (handle) => {
            console.log("The twitter handle you entered is: ", handle, "\n");
            resolve(handle);
        });
    });
};

const numOfBotsQ = async () => {
    return new Promise((resolve) => {
        rl.question(
            "How many bots do you intend to use? Please enter a number: \n",
            (num) => {
                console.log("You intend to use : ", num, " number of bot. \n");
                resolve(num);
            }
        );
    });
};

const delayQ = async () => {
    return new Promise((resolve) => {
        rl.question(
            "Add a delay to each request. Please enter a number: \n",
            (num) => {
                console.log(
                    "The delay is : ",
                    num,
                    " ms, 1000 ms = 1 second. \n"
                );
                resolve(num);
            }
        );
    });
};

const newOldQ = async () => {
    return new Promise((resolve) => {
        rl.question(
            "Has any bot liked, commented or retweeted on your most recent tweet before? : \n" +
                "Please specify [new] or [old].\n" +
                "Old means that other bots have already liked, commented or retweeted this tweet.\n" +
                "New means that no bots have liked, commented or retweeted this tweet yet. \n",

            //         console.log(
            //             "Old means that other bots hae already liked, commented or retweeted this tweet."
            //         );
            //         console.log(
            //             "New means that no bots have liked, commented or retweeted this tweet yet."
            //         );
            (oldNew) => {
                console.log("You've entered: ", oldNew);
                resolve(oldNew);
            }
        );
    });
};

const mainFunc = async () => {
    return new Promise(async (resolve) => {
        let actionType = await actionTypeQ();
        let oldNew;
        let validInput = false;
        while (!validInput) {
            switch (actionType) {
                case "1":
                    console.log("You intend to follow: \n ");
                    validInput = true;
                    actionType = "follow";
                    break;
                case "2":
                    console.log("You intend to like: \n ");
                    validInput = true;
                    oldNew = await newOldQ();
                    actionType = "like";
                    break;
                case "3":
                    console.log("You intend to comment: \n ");
                    validInput = true;
                    oldNew = await newOldQ();
                    actionType = "comment";
                    break;
                case "4":
                    console.log("You intend to retweet: \n ");
                    validInput = true;
                    oldNew = await newOldQ();
                    actionType = "retweet";
                    break;
                case "5":
                    console.log("Adding bots");
                    validInput = true;
                    await updateUsers();
                    console.log("Bot added");
                    process.exit(0);

                default:
                    console.log(
                        "Please enter a valid option, [1], [2] ,[3], [4] \n"
                    );
                    actionType = await actionTypeQ();
            }
        }

        const handle = await userToFollowQ();
        const numOfBots = await numOfBotsQ();
        const delay = await delayQ();

        const input = {
            actionType: actionType,
            handle: handle,
            numOfBots: numOfBots,
            delay: delay,
            oldNew: oldNew,
        };

        resolve(input);
    });
};
//
// const mainFunc = async () => {
//     const actionType = await actionTypeQ();
//     const handle = await userToFollowQ();
//     const numOfBots = await numOfBotsQ();
//     const delay = await delayQ();
//
//     const input = {
//         actionType: actionType,
//         handle: handle,
//         numOfBots: numOfBots,
//         delay: delay,
//     };
//
//     return input;
// };

exports.prompt = mainFunc;

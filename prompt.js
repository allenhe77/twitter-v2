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

const getQ = async () => {
    return new Promise((resolve) => {
        rl.question(
            "Please enter you options, \n [1] to follow \n [2] to like \n [3] to comment \n []",
            (option) => {
                console.log(option);
                resolve(option);
            }
        );
    });
};
const mainFunc = async () => {
    const result = await getQ();
    console.log(result);
};

exports.prompt = mainFunc;

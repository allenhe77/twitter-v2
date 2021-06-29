const fs = require("fs");
const vanillaPuppeteer = require("puppeteer");
const { addExtra } = require("puppeteer-extra");
const Stealth = require("puppeteer-extra-plugin-stealth");
const { Cluster } = require("puppeteer-cluster");
const cookiesFilePath = "cookies.json";

const previousSession = fs.existsSync(cookiesFilePath);

const logIn = require("./actions/login");

const scrollPage = require("./actions/scrollPage");
const likeTweet = require("./actions/likeTweet");
const followUser = require("./actions/followUser");
const retweetUser = require("./actions/retweet");
const replyTweet = require("./actions/comment");
const { sleep } = require("./utils");

// const proxy = "23.236.168.230:8778";

const userTweetHandle = process.argv[3];
const botActions = process.argv[2];
const botTwitUsername = process.argv[4];
const proxy = process.argv[5];

// const botTwitUsername = "BblytheSailsbu2";
// const proxy = "45.94.45.13:7016";
const { randomActions } = require("./actions/randomActions");

const runBot = async () => {
    const puppeteer = addExtra(vanillaPuppeteer);
    puppeteer.use(Stealth());

    const browser = await puppeteer.launch({
        headless: false,
        args: [`--proxy-server=https=${proxy}`],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 1000 });

    await logIn(previousSession, page, cookiesFilePath, botTwitUsername);

    console.log("before goto");
    await page.goto("https://twitter.com", { waitUntil: "networkidle2" });

    await sleep(3000);
    console.log("after goto");
    //scrolling

    // await scrollPage(page);

    await randomActions(page, sleep);

    await sleep(2500);

    await page.goto(`https://twitter.com/${userTweetHandle}`, {
        waitUntil: "networkidle2",
    });

    if (botActions === "like") {
        await likeTweet(page, sleep);
    }

    await sleep(2500);

    if (botActions === "follow") {
        await followUser(page, sleep, userTweetHandle);
    }

    if (botActions === "retweet") {
        await retweetUser(page, sleep);
    }

    if (botActions === "comment") {
        await replyTweet(page, sleep, process.argv[6]);
    }

    await page.evaluate(() => {
        alert("Action complete. You may close the browser now.");
    });
    console.log(
        `Bot: ${botTwitUsername} has ${botActions}ed ${userTweetHandle}`
    );
    await browser.close();
};

runBot().catch((err) => console.error(err));

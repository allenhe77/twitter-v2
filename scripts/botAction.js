const fs = require("fs");
const puppeteer = require("puppeteer");
// const { addExtra } = require("puppeteer-extra");
// const Stealth = require("puppeteer-extra-plugin-stealth");
// const { Cluster } = require("puppeteer-cluster");
const cookiesFilePath = "cookies.json";

const previousSession = fs.existsSync(cookiesFilePath);

const logIn = require("./actions/login");

const scrollPage = require("./actions/scrollPage");
const likeTweet = require("./actions/likeTweet");
const followUser = require("./actions/followUser");
const retweetUser = require("./actions/retweet");
const replyTweet = require("./actions/comment");
const { sleep, getRandomIntBetween } = require("./utils");

// const proxy = "23.236.168.230:8778";

// const botTwitUsername = "BblytheSailsbu2";
// const proxy = "45.94.45.13:7016";
const { randomActions } = require("./actions/randomActions");

const path = require("path");
const isPkg = typeof process.pkg !== "undefined";
const chromiumExecutablePath = isPkg
    ? puppeteer.executablePath().replace(
          /^.*?\\node_modules\\puppeteer\\\.local-chromium/, //<------ That is for windows users, for linux users use:  /^.*?\/node_modules\/puppeteer\/\.local-chromium/
          path.join(path.dirname(process.execPath), "chromium") //<------ Folder name, use whatever you want
      )
    : puppeteer.executablePath();

const runBot = async (
    action,
    handle,
    botName,
    botProxy,
    comment,
    user,
    pass
) => {
    const userTweetHandle = handle;
    const botActions = action;
    const botTwitUsername = botName;
    // changing to residential ip, but with different user:pass
    const proxy = botProxy;
    return new Promise(async (resolve) => {
        // const puppeteer = addExtra(puppeteer);
        // puppeteer.use(Stealth());

        const browser = await puppeteer.launch({
            headless: false,
            executablePath: chromiumExecutablePath,
            // executablePath: "./chrome/chrome.exe",
            args: [`--proxy-server=https=${proxy}`],
        });

        const page = await browser.newPage();

        await page.setViewport({ width: 1000, height: 1000 });

        // added user:pass for new ips

        await page.authenticate({
            username: user,
            password: pass,
        });
        // added user:pass for new ips
        await logIn(previousSession, page, cookiesFilePath, botTwitUsername);

        try {
            await page.goto("https://twitter.com", {
                waitUntil: "networkidle2",
            });
        } catch (e) {
            await browser.close();
            resolve("Could not load homepage");
        }

        if (page.url() !== "https://twitter.com/home") {
            fs.renameSync(
                `./cookies/${botTwitUsername}.json`,
                `notworking/${botTwitUsername}.json`
            );
            await browser.close();
            resolve(false);
        }

        await sleep(3000);

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
            await replyTweet(page, sleep, comment);
        }

        // await page.evaluate(() => {
        //     alert("Action complete. You may close the browser now.");
        // });
        await sleep(getRandomIntBetween(1000, 3500));
        console.log(
            `Bot: ${botTwitUsername} has ${botActions}ed ${userTweetHandle}`
        );
        await browser.close();

        resolve(true);
    });
};

// runBot().catch((err) => console.error(err));

exports.runBot = runBot;

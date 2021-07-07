const fs = require("fs");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");
puppeteer.use(StealthPlugin());
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

const capchaKey = "8cd2a604d01a760299d88b6bbed17cf2";

puppeteer.use(
    RecaptchaPlugin({
        provider: {
            id: "2captcha",
            token: capchaKey, // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
        },
        visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
    })
);

const proxyArr = [
    "5.8.51.78",
    "5.8.54.250",
    "37.139.56.74",
    "31.184.194.254",
    "5.101.65.15",
    "5.8.52.97",
    "5.101.0.88",
    "5.8.52.3",
    "46.161.50.103",
    "46.161.51.80",
    "5.101.2.180",
    "5.8.11.235",
    "91.243.51.181",
    "91.243.48.140",
    "5.8.48.210",
    "5.101.1.93",
    "37.139.56.153",
    "37.139.59.5",
    "5.101.0.206",
    "31.184.199.154",
    "5.101.0.27",
    "5.8.11.20",
    "5.8.53.201",
    "5.101.1.97",
    "31.184.194.92",
    "95.215.1.81",
    "5.8.11.107",
];

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

    // const proxy = botProxy;
    return new Promise(async (resolve) => {
        // const puppeteer = addExtra(puppeteer);
        // puppeteer.use(Stealth());
        // const proxy =
        //     proxyArr[getRandomIntBetween(0, proxyArr.length)] + ":44429";
        const proxy = "proxy.packetstream.io:31112";
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
            username: "cheraj",
            password: "Z2sL4fJ2WiNzg88x_country",
        });
        // added user:pass for new ips
        await logIn(previousSession, page, cookiesFilePath, botTwitUsername);

        try {
            await page.goto("https://twitter.com", {
                waitUntil: "networkidle2",
                timeout: 0,
            });
        } catch (e) {
            await browser.close();
            resolve("Could not load homepage");
        }

        if ((await page.url()) !== "https://twitter.com/home") {
            try {
                await page.waitForSelector('input[value="Start"]', {
                    timeout: 0,
                });
                await page.click('input[value="Start"]');

                await sleep(4000);
                await page.solveRecaptchas();
                console.log("capcha solved");
                await sleep(2000);

                await Promise.all([
                    page.waitForNavigation({
                        waitUntil: "networkidle2",
                        timeout: 0,
                    }),
                    page.click("#continue_button"),
                ]);

                // continue to homepage
                try {
                    await page.waitForSelector('input[type="submit"]', {
                        visible: true,
                        timeout: 4500,
                    });

                    await page.click('input[type="submit"]');
                    // await browser.close();
                    console.log("success");
                } catch (err) {
                    await browser.close();

                    resolve(false);
                }
            } catch (err) {
                await page.solveRecaptchas();

                await Promise.all([
                    page.waitForNavigation({
                        waitUntil: "networkidle2",
                        timeout: 0,
                    }),
                    page.click("#continue_button"),
                ]);
            }
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

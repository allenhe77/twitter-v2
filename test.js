const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
// const { updateBotActionList } = require("./utils");
const { sleep, getRandomIntBetween } = require("./scripts/utils");
// const proxy = "5.8.54.250:44429";
puppeteer.use(StealthPlugin());
const login = require("./login2");
const fetch = require("node-fetch");

// updateBotActionList("DaisyMo26021147", "allen");

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
];
const userName = "Abigail32219747";
(async () => {
    const proxy = proxyArr[getRandomIntBetween(0, 9)] + ":44429";
    const browser = await puppeteer.launch({
        headless: false,
        args: [`--proxy-server=https=${proxy}`],
    });

    const page = await browser.newPage();
    // await page.evaluateOnNewDocument(() => {
    //     delete navigator.__proto__.webdriver;
    // });
    await login(page, userName);

    const file = fs.readFileSync(`new/${userName}.json`);
    const agent = JSON.parse(file).userAgent;

    await page.setUserAgent(agent);

    // const filePath = `./cookies/monica_twain.json`;
    // if (fs.existsSync(filePath)) {
    //     // If file exist load the cookies
    //     const cookiesString = fs.readFileSync(filePath);
    //     const parsedCookies = JSON.parse(cookiesString);
    //     if (parsedCookies.length !== 0) {
    //         for (let cookie of parsedCookies) {
    //             await page.setCookie(cookie);
    //         }
    //     }
    // }
    await page.goto("https://www.twitter.com");
    // other actions...

    // await browser.close();
    console.log("success");
})();

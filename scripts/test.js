const puppeteer = require("puppeteer");

const fs = require("fs");
const { updateBotActionList } = require("./utils");

const proxy = "31.184.199.154:44429";

const login = require("../login2");
const fetch = require("node-fetch");
// updateBotActionList("DaisyMo26021147", "allen");
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [`--proxy-server=https=${proxy}`],
    });

    const page = await browser.newPage();

    await login(page, "effysto83703719");

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

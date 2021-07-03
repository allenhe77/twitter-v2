const puppeteer = require("puppeteer");

const fs = require("fs");
const { updateBotActionList } = require("./utils");
const fetch = require("node-fetch");
// updateBotActionList("DaisyMo26021147", "allen");
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [`--proxy-server=https=23.236.168.217:8765`],
    });

    const page = await browser.newPage();

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

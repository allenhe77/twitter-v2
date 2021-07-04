const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const login = require("./login2");
const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");
puppeteer.use(StealthPlugin());
const capchaKey = "8cd2a604d01a760299d88b6bbed17cf2";
const proxy = "31.184.199.154:44429";
const glob = require("glob");
const { sleep } = require("./scripts/utils");
var fs = require("fs");

puppeteer.use(
    RecaptchaPlugin({
        provider: {
            id: "2captcha",
            token: capchaKey, // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
        },
        visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
    })
);

let fileArr;

glob("quarantine/*.json", {}, (err, files) => {
    fileArr = files;
});

const quarantine = async (filePath) => {
    return new Promise(async (resolve) => {
        const browser = await puppeteer.launch({
            headless: false,
            args: [`--proxy-server=https=${proxy}`],
        });

        const page = await browser.newPage();

        await login(page, filePath);

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
        await page.goto("https://www.twitter.com", {
            waitUntil: "networkidle2",
        });

        if (page.url() === "https://twitter.com/home") {
            fs.rename(
                filePath,
                `testing/${filePath.split("/")[1]}`,
                function (err) {
                    if (err) throw err;
                    console.log("Successfully renamed - AKA moved!");
                }
            );

            await browser.close();
            resolve(true);
        }

        await sleep(5000);

        await page.click('input[value="Start"]');

        await sleep(3500);

        await page.solveRecaptchas();
        // other actions...
        await sleep(1500);

        await page.click("#continue_button");

        await page.waitForSelector('input[type="submit"]', {
            visible: true,
            timeout: 4500,
        });
        await page.click('input[type="submit"]');
        // await browser.close();
        console.log("success");

        await sleep(4000);

        fs.rename(
            filePath,
            `testing/${filePath.split("/")[1]}`,
            function (err) {
                if (err) throw err;
                console.log("Successfully renamed - AKA moved!");
            }
        );

        await browser.close();

        resolve(true);
    });
};

exports.quarantine = quarantine;

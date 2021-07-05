const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const login = require("./login2");
const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");
puppeteer.use(StealthPlugin());
const capchaKey = "8cd2a604d01a760299d88b6bbed17cf2";

const glob = require("glob");
const { sleep, getRandomIntBetween } = require("./scripts/utils");
var fs = require("fs");
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
const proxyName = "palk38ee";
const proxyPass = "vx3tGezsm7Z1vXAe_country-Russia_session-U8VJHVlO";
glob("new/*.json", {}, (err, files) => {
    fileArr = files;
});

const quarantine = async (filePath) => {
    return new Promise(async (resolve) => {
        const file = fs.readFileSync(filePath);
        const obj = JSON.parse(file);
        // const proxy =
        //     proxyArr[getRandomIntBetween(0, proxyArr.length)] + ":44429";
        // const proxy = obj.proxy;
        const proxy = "3.224.22.75:31112";

        const browser = await puppeteer.launch({
            headless: false,
            args: [`--proxy-server=https=${proxy}`],
        });

        const page = await browser.newPage();
        await page.authenticate({ username: proxyName, password: proxyPass });
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

        try {
            await page.click('input[value="Start"]');
            await page.solveRecaptchas();
        } catch (err) {}

        await page.solveRecaptchas();

        await sleep(3500);

        // other actions...
        await sleep(1500);

        await page.click("#continue_button");

        try {
            await page.waitForSelector('input[type="submit"]', {
                visible: true,
                timeout: 4500,
            });
        } catch (err) {
            await browser.close();

            resolve(false);
        }

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

const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
// const { updateBotActionList } = require("./utils");
const { sleep, getRandomIntBetween } = require("./scripts/utils");
// const proxy = "5.8.54.250:44429";
puppeteer.use(StealthPlugin());
const login = require("./login2");
const fetch = require("node-fetch");
const glob = require("glob");
// updateBotActionList("DaisyMo26021147", "allen");

const proxyArr = [
    "5.101.6.231",
    "5.8.51.78",
    "5.101.6.51",
    "5.8.54.250",
    "37.139.58.190",
    "5.101.7.155",
    "5.101.64.141",
    "5.101.6.15",
    "5.8.51.77",
    "37.139.56.24",
    "46.161.48.17",
    "5.101.4.70",
    "31.184.197.73",
    "5.101.3.51",
    "31.184.193.174",
    "37.139.56.110",
    "95.215.0.214",
    "37.139.56.74",
    "5.8.53.41",
    "31.184.194.254",
    "37.139.59.217",
    "5.101.65.188",
    "5.101.4.131",
    "5.101.65.15",
    "5.8.52.97",
    "5.101.0.88",
    "5.8.52.3",
    "46.161.50.103",
    "46.161.51.80",
    "5.188.44.68",
    "5.101.4.110",
    "5.8.11.2",
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
    "46.161.50.74",
];

jsonArr = glob.sync("working/*.json");

const mainTest = async () => {
    for (let i = 0; i < jsonArr.length; i++) {
        await testBot(jsonArr[i]);
    }
};
const testBot = async (filePath) => {
    return new Promise(async (resolve) => {
        const file = fs.readFileSync(filePath);
        const obj = JSON.parse(file);
        // const proxy =
        //     proxyArr[getRandomIntBetween(0, proxyArr.length)] + ":44429";
        const proxy = obj.proxy;

        const browser = await puppeteer.launch({
            headless: false,
            args: [`--proxy-server=https=${proxy}`],
        });

        const page = await browser.newPage();
        await page.evaluateOnNewDocument(() => {
            delete navigator.__proto__.webdriver;
        });
        // await page.evaluateOnNewDocument(() => {
        //     delete navigator.__proto__.webdriver;
        // });
        await login(page, filePath);

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
        try {
            await page.goto("https://www.twitter.com", {
                waitUntil: "networkidle2",
            });
        } catch (err) {
            await browser.close();
            resolve(true);
        }

        // other actions...
        if (page.url() !== "https://twitter.com/home") {
            fs.renameSync(filePath, `notworking/${filePath.split("/")[1]}`);
            console.log("not working!");
        }
        await sleep(5000);
        await browser.close();

        resolve(true);
    });
};

mainTest();

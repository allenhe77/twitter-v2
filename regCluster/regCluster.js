const { Cluster } = require("puppeteer-cluster");
const puppeteer = require("puppeteer-extra");
const fetch = require("node-fetch");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const networkConfig = require("./networkOptions");
const { sleep, getRandomIntBetween } = require("../scripts/utils");

puppeteer.use(StealthPlugin());

const proxy = "proxy.packetstream.io:31112";
const username = "cheraj";
const password = "Z2sL4fJ2WiNzg88x_country-Russia";

const smsApiKey = "1532b3ecc5ef3d62A93759805860c339";
const twitterUrl = "https://twitter.com";
const fakenameApi = "https://api.namefake.com/english-united-kingdom/female/";
const run = async () => {
    return new Promise(async (resolve) => {
        // Create an instance of the chrome browser
        // But disable headless mode !
        const browser = await puppeteer.launch({
            args: [`--proxy-server=${proxy}`],
            headless: false,
            devtools: true,
        });

        // Create a new page
        const page = await browser.newPage();

        // login proxy user:pass

        await page.authenticate({ username, password });

        // Configure the navigation timeout
        await page.setDefaultNavigationTimeout(0);

        // Connect to Chrome DevTools
        const client = await page.target().createCDPSession();

        // Set throttling property
        await client.send(
            "Network.emulateNetworkConditions",
            networkConfig.Regular4G
        );
        // Navigate
        try {
            await page.goto(twitterUrl, {
                waitUntil: "networkidle2",
                timeout: 0,
            });
            console.log("Loaded twitter!");
        } catch (e) {
            console.error(e);
            await browser.close();
            resolve("Could not load twitter");
        }

        // get signup ele
        try {
            await page.waitForSelector('a[href="/i/flow/signup"]');
        } catch (e) {
            console.error(e);
            await browser.close();
            resolve("Signup button not found");
        }

        // click signup btn and wait for redirect

        try {
            await Promise.all([
                page.waitForNavigation(),
                page.click('a[href="/i/flow/signup"]'),
            ]);
        } catch (e) {
            console.error(e);
            await browser.close();
            resolve("Sign up element failed or sign up redirect failed");
        }

        // get fake names
        let fakeName = "";
        try {
            fakeName = await fetch(fakenameApi);
            fakeName = await fakeName.json();
        } catch (e) {
            console.error(e);
            await browser.close();
            resolve("Error getting fakenames");
        }

        fakeName = fakeName.name;

        // type in fake name
        await sleep(getRandomIntBetween(1500, 3000));
        try {
            await page.keyboard.type(fakeName, { delay: 35 });
            await sleep(1500);
            await page.keyboard.press("Tab");
        } catch (e) {
            console.error(e);
            await browser.close();
            resolve(false);
        }

        await sleep(500);

        //get phone number from API
        const apiRes = await fetch(
            `https://sms-activate.ru/stubs/handler_api.php?api_key=${smsApiKey}&action=getNumber&service=tw&country=1`
        );
        const apiResText = await apiRes.text();
        const requestId = apiResText.split(":")[1];
        const phoneNum = apiResText.split(":")[2];

        // type number
        await page.keyboard.type(phoneNum, { delay: 55 });

        await sleep(1350);

        // wait to see if number is working
        try {
            await page.waitForSelector('div[aria-live="assertive"]', {
                visible: true,
                timeout: 3500,
            });
            await fetch(
                `https://sms-activate.ru/stubs/handler_api.php?api_key=${smsApiKey}&action=setStatus&status=8&id=${requestId}`
            );

            await browser.close();
            resolve("Phone number not valid.");
        } catch (err) {
            console.log("Phone number working!");
        }
    });
};
run().then((msg) => console.log(msg));

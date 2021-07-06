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
            `https://sms-activate.ru/stubs/handler_api.php?api_key=${smsApiKey}&action=getNumber&service=tw&country=0`
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

        //input dates
        const month =
            '//*[@id="layers"]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div[5]/div[3]/div/div[1]';

        const monthElement = await page.$x(month);
        try {
            await monthElement[0].click();
        } catch (e) {
            console.error(e);
        }

        try {
            await sleep(3000);
        } catch (e) {
            console.error(e);
            await browser.close();
            resolve(true);
        }

        try {
            await page.select(
                "#SELECTOR_1",
                getRandomIntBetween(1, 12).toString()
            );
        } catch (e) {
            console.error(e);
            await browser.close();
            resolve(true);
        }

        const day =
            '//*[@id="layers"]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div[5]/div[3]/div/div[2]';

        const dayEle = await page.$x(day);

        try {
            await dayEle[0].click();
        } catch (e) {
            console.error(e);
            await browser.close();
            resolve(true);
        }

        await sleep(2561);

        await page.select("#SELECTOR_2", getRandomIntBetween(1, 28).toString());

        const year =
            '//*[@id="layers"]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div[5]/div[3]/div/div[3]';

        const yearEle = await page.$x(year);

        try {
            await yearEle[0].click();
        } catch (e) {
            console.error(e);
            await browser.close();
            resolve(true);
        }

        await sleep(2971);

        await page.select(
            "#SELECTOR_3",
            getRandomIntBetween(1990, 2002).toString()
        );

        await sleep(3153);

        const submit =
            '//*[@id="layers"]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div';
        const submitEle = await page.$x(submit);

        try {
            await submitEle[0].click();
        } catch (e) {
            console.error(e);
            await browser.close();
            resolve(true);
        }
    });
};
run().then((msg) => console.log(msg));

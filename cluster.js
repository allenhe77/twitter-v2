const { getRandomSideBarEle } = require("./scripts/elemenetsList");
const glob = require("glob");
const { Cluster } = require("puppeteer-cluster");
// const randomUseragent = require("random-useragent");
// const puppeteer = require("puppeteer");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");

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

// const proxy = "5.101.4.131:44429";
const { sleep, getRandomIntBetween } = require("./scripts/utils");
const fs = require("fs");
const fetch = require("node-fetch");

const smsApiKey = "1532b3ecc5ef3d62A93759805860c339";

const password = "123456abcde";

const capchaKey = "8cd2a604d01a760299d88b6bbed17cf2";

const botUsetAgent =
    "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36";

puppeteer.use(StealthPlugin());

puppeteer.use(
    RecaptchaPlugin({
        provider: {
            id: "2captcha",
            token: capchaKey, // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
        },
        visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
    })
);

let picArr;

glob("profilePics/*.jpeg", {}, function (er, files) {
    // files is an array of filenames.
    // If the `nonull` option is set, and nothing
    // was found, then files is ["**/*.js"]
    // er is an error object or null.
    picArr = files;
});

const getUser = async () => {
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_BROWSER,
        maxConcurrency: 2,
        puppeteerOptions: {
            headless: false,
            args: [], //  sandbox needed for it work in linux
        },
    });
    await cluster.task(async ({ page, data: data }) => {
        const getRandomPic = () => {
            const fileNum = getRandomIntBetween(0, picArr.length - 1);
            return fileNum;
        };

        // const proxy = proxyArr[getRandomIntBetween(0, 9)] + ":44429";

        // const page = await browser.newPage();
        await page.setViewport({
            width: 1200,
            height: 1080,
        });
        // const context = browser.defaultBrowserContext();
        // //        URL                  An array of permissions
        // await context.overridePermissions("https://www.twitter.com", [
        //     "notifications",
        // ]);
        // await page.evaluateOnNewDocument(() => {
        //     delete navigator.__proto__.webdriver;
        // });

        await sleep(2000);

        await page.setUserAgent(botUsetAgent);
        await page.goto("https://twitter.com", {
            waitUntil: "networkidle2",
        });

        await sleep(1500);

        await page.click('a[href="/i/flow/signup"]');

        await sleep(4000);

        let name = await fetch(
            "https://api.namefake.com/english-united-kingdom/female/"
        );
        name = await name.json();
        name = name.name;

        await page.keyboard.type(name, { delay: 20 });

        await sleep(1300);

        await page.keyboard.press("Tab");

        await sleep(500);

        const apiRes = await fetch(
            `https://sms-activate.ru/stubs/handler_api.php?api_key=${smsApiKey}&action=getNumber&service=tw&country=0`
        );

        const apiResText = await apiRes.text();
        console.log(apiResText);
        console.log(typeof apiResText);
        console.log(apiResText.split(":"));
        const requestId = apiResText.split(":")[1];
        const phoneNum = apiResText.split(":")[2];
        console.log("id: ", requestId);
        console.log("number: ", phoneNum);

        // wait for phone number

        //type number in

        await page.keyboard.type(phoneNum, { delay: 55 });

        await sleep(1350);

        try {
            await page.waitForSelector('div[aria-live="assertive"]', {
                visible: true,
                timeout: 3500,
            });
            await fetch(
                `https://sms-activate.ru/stubs/handler_api.php?api_key=${smsApiKey}&action=setStatus&status=8&id=${requestId}`
            );
            console.log("Phone number not valid.");
            return;
        } catch (err) {
            console.log("Phone number working!");
        }

        const month =
            '//*[@id="layers"]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div[5]/div[3]/div/div[1]';

        const monthElement = await page.$x(month);
        await monthElement[0].click();

        console.log("I still work! 1");

        await sleep(3000);

        await page.select("#SELECTOR_1", getRandomIntBetween(1, 12).toString());

        const day =
            '//*[@id="layers"]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div[5]/div[3]/div/div[2]';

        const dayEle = await page.$x(day);

        await dayEle[0].click();

        await sleep(2561);

        await page.select("#SELECTOR_2", getRandomIntBetween(1, 28).toString());

        const year =
            '//*[@id="layers"]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div[5]/div[3]/div/div[3]';

        const yearEle = await page.$x(year);

        await yearEle[0].click();

        await sleep(2971);

        await page.select(
            "#SELECTOR_3",
            getRandomIntBetween(1990, 2002).toString()
        );
        console.log("I still work! 2");
        await sleep(500000);

        const submit =
            '//*[@id="layers"]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div';
        console.log("I still work! 3");
        const submitEle = await page.$x(submit);

        await submitEle[0].click();
        await sleep(1400);

        const next =
            '//*[@id="layers"]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div';

        const nextEle = await page.$x(next);
        await nextEle[0].click();

        await sleep(1700);

        const signUp =
            '//*[@id="layers"]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div/div/div/div[5]';
        const signUpEle = await page.$x(signUp);

        await signUpEle[0].click();

        await sleep(2061);

        //confirming send sms to phone number
        const ok =
            '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div[3]/div[2]';

        const okEle = await page.$x(ok);

        await okEle[0].click();

        // send request to sms api to change status to 1

        let comfirmCode = "";
        let confirmed = false;

        let changeSmsStatusToSent = await fetch(
            `https://sms-activate.ru/stubs/handler_api.php?api_key=${smsApiKey}&action=setStatus&status=1&id=${requestId}`
        );

        for (let i = 0; i < 25; i++) {
            // get sms code from twitter
            let statusRes = await fetch(
                `https://sms-activate.ru/stubs/handler_api.php?api_key=${smsApiKey}&action=getStatus&id=${requestId}`
            );

            await sleep(5000);
            statusRes = await statusRes.text();

            console.log(statusRes.split(":"));
            const statusArr = statusRes.split(":");
            const status = statusArr[0];
            if (status === "STATUS_OK") {
                comfirmCode = statusArr[1];
                confirmed = true;
                // change status to code gotten to SMS api
                // let changeSmsStatusToGotten = await fetch(
                //     `https://sms-activate.ru/stubs/handler_api.php?api_key=${smsApiKey}&action=setStatus&status=6&id=${requestId}`
                // );
                break;
            }
        }

        if (confirmed === false) {
            await fetch(
                `https://sms-activate.ru/stubs/handler_api.php?api_key=${smsApiKey}&action=setStatus&status=8&id=${requestId}`
            );

            console.log("Auth Failed. \n");
            try {
                await browser.close();
            } catch (err) {
                console.error(err);
            }
        }

        console.log(comfirmCode);

        await sleep(500);

        await page.keyboard.type(comfirmCode, { delay: 35 });

        const codeNext =
            '//*[@id="layers"]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div';
        const codeNextEle = await page.$x(codeNext);
        await sleep(1681);
        await codeNextEle[0].click();

        await sleep(1711);

        await page.keyboard.type(password, { delay: 33 });

        await sleep(3300);

        const passNext =
            '//*[@id="layers"]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div';
        const passNextEle = await page.$x(passNext);
        await passNextEle[0].click();

        await sleep(3500);

        const elementHandle = await page.$("input[type=file]");

        await sleep(3000);
        await elementHandle.uploadFile(picArr[getRandomPic()]);

        await sleep(7500);

        //*[@id="layers"]/div[2]/div[2]/div/div/div/div/div[2]/div[2]/div/div[1]/div/div/div/div[3]/div
        const imageApply =
            '//*[@id="layers"]/div[2]/div[2]/div/div/div/div/div[2]/div[2]/div/div[1]/div/div/div/div[3]/div';
        const imageApplyEle = await page.$x(imageApply);

        await imageApplyEle[0].click();
        await page.screenshot({ path: "file.png" });

        await sleep(1575);

        const imageNext =
            '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div';

        const imageNextEle = await page.$x(imageNext);

        await imageNextEle[0].click();

        await sleep(2371);

        // const bioSkip =
        //     '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div';
        //
        // const bioSkipEle = await page.$x(bioSkip);
        await page.keyboard.press("Tab");

        await sleep(2000);

        await page.keyboard.press("Enter");
        await page.screenshot({ path: "bio.png" });

        // await bioSkipEle[0].click();

        await sleep(3500);

        const interestNext =
            '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div';
        const interestNextEle = await page.$x(interestNext);

        await interestNextEle[0].click();

        await sleep(5000);

        const follow1 =
            '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div[3]/section/div/div/div[3]/div/div';
        const follow2 =
            '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div[3]/section/div/div/div[4]/div/div';
        const follow3 =
            ' //*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div[3]/section/div/div/div[5]/div/div';

        const follow4 =
            ' //*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div[3]/section/div/div/div[6]/div/div';

        const follow5 =
            ' //*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div[3]/section/div/div/div[7]/div/div';

        const follow1Ele = await page.$x(follow1);
        const follow2Ele = await page.$x(follow2);
        const follow3Ele = await page.$x(follow3);
        const follow4Ele = await page.$x(follow4);
        const follow5Ele = await page.$x(follow5);

        await follow1Ele[0].click();

        await sleep(1351);

        await follow2Ele[0].click();

        await sleep(1457);
        await follow3Ele[0].click();

        await sleep(1597);

        await follow4Ele[0].click();

        await sleep(1597);

        await follow5Ele[0].click();

        await sleep(2100);

        const followNext =
            '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div';

        const followNextEle = await page.$x(followNext);

        await followNextEle[0].click();

        await sleep(4000);

        //skip changed to allow, to change it back change last div to 2

        const skipNoti =
            '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div/div/div/div/div[2]/div[2]/div[2]';
        const skipNotiEle = await page.$x(skipNoti);
        await skipNotiEle[0].click();

        await sleep(3500);
        //
        // await page.keyboard.press("Tab");
        //
        // await sleep(2000);
        // await page.keyboard.press("Enter");

        // await page.click('input[type="submit"]'); do not uncomment this

        await page.waitForSelector('input[type="submit"]', { timeout: 5000 });

        await page.click('input[type="submit"]');

        await sleep(3500);

        await page.solveRecaptchas();

        await sleep(1500);

        await page.click("#continue_button");

        await sleep(2300);

        try {
            await page.waitForSelector('input[type="submit"]', {
                visible: true,
                timeout: 4500,
            });
        } catch (e) {
            await page.solveRecaptchas();

            await sleep(2500);
        }

        await page.click('input[type="submit"]');

        const sendSmsSecond = await fetch(
            `https://sms-activate.ru/stubs/handler_api.php?api_key=${smsApiKey}&action=setStatus&status=3&id=${requestId}`
        );

        let secondSmsNum = "";

        let secondConfirm = false;

        for (let i = 0; i < 30; i++) {
            await sleep(4000);
            let smsSecond = await fetch(
                `https://sms-activate.ru/stubs/handler_api.php?api_key=${smsApiKey}&action=getStatus&id=${requestId}`
            );
            let smsText = await smsSecond.text();
            let smsStatus = smsText.split(":");
            console.log(smsStatus);

            if (smsStatus[0] === "STATUS_OK") {
                secondSmsNum = smsStatus[1];
                await fetch(
                    `https://sms-activate.ru/stubs/handler_api.php?api_key=${smsApiKey}&action=setStatus&status=6&id=${requestId}`
                );

                // if got second SMS return true, else false
                secondConfirm = true;
                break;
            }
        }

        await fetch(
            `https://sms-activate.ru/stubs/handler_api.php?api_key=${smsApiKey}&action=setStatus&status=6&id=${requestId}`
        );

        if (secondConfirm === false) {
            console.error("Second sms confirm failed!");

            try {
                await browser.close();
            } catch (err) {
                console.error(err);
            }
        }

        await sleep(1000);
        await page.keyboard.type(secondSmsNum, { delay: 30 });

        await sleep(1357);
        await page.click('input[value="Next"]');

        await sleep(2500);
        await page.click('input[type="submit"]');

        await sleep(6000);

        const finalNoti =
            '//*[@id="layers"]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div/div/div/div/div[2]/div[2]/div[2]';

        const finalNotiEle = await page.$x(finalNoti);

        await finalNotiEle[0].click();

        await sleep(6000);

        await page.waitForSelector('a[aria-label="Profile"]', {
            timeout: 0,
            visible: true,
        });

        const botUserUrl = await page.evaluate(() => {
            let name = document.querySelector('a[aria-label="Profile"]');
            return name.href;
        });

        const cookies = await page.cookies();

        const botInfo = {
            username: botUserUrl.split("/")[3],
            userUrl: botUserUrl,
            userAgent: botUsetAgent,
            cookies,
            phone: phoneNum,
            region: "Russia",
        };

        fs.writeFileSync(
            `./new/${botInfo.username}.json`,
            JSON.stringify(botInfo, null, 2)
        );

        console.log("Reg Done!");

        console.log(botUserUrl);

        await sleep(5000);

        await page.screenshot({ path: "bookmark.png" });

        console.log(page.url());

        for (let i = 0; i < 10; i++) {
            await page.click(`${getRandomSideBarEle()}`);

            await sleep(getRandomIntBetween(3000, 5000));
        }
    });

    for (let i = 0; i < 1; i++) {
        await cluster.queue({});
    }

    await cluster.idle();
    await cluster.close();

    // const userAgent = randomUseragent.getRandom(function (ua) {
    //     return parseFloat(ua.browserVersion) >= 20;
    // });
};

getUser();

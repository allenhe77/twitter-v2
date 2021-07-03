const puppeteer = require("puppeteer-extra");
(async () => {
    // const proxy = proxyArr[getRandomIntBetween(0, 9)] + ":44429";
    const browser = await puppeteer.launch({
        headless: false,
        args: [`--proxy-server=https=5.101.2.180:44429`],
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

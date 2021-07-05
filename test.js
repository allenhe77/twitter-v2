const puppeteer = require("puppeteer");
const username = "palk38ee";
const password = "vx3tGezsm7Z1vXAe_country-Russia_session-U8VJHVlO";
async function helloWorld() {
    const browser = await puppeteer.launch({
        headless: false,
        args: ["--proxy-server=https=3.224.22.75:31112"],
    });
    const page = await browser.newPage();
    await page.authenticate({ username, password });

    await page.goto(
        "https://en.wikipedia.org/wiki/%22Hello,_World!%22_program"
    );

    const firstPar = await page.$eval(
        "#mw-content-text p",
        (el) => el.innerText
    );

    console.log(firstPar); // A "Hello, World!" program is a computer program that outputs ...

    await browser.close();
}

helloWorld();

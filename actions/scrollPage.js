const { getRandomIntBetween } = require("../utils");

const scrollPage = async (page) => {
    return new Promise(async (resolve) => {
        //scroll down
        for (let i = 0; i < 7; i++) {
            await page.mouse.wheel({ deltaY: getRandomIntBetween(50, 250) });
        }

        //scroll up
        for (let i = 0; i < 7; i++) {
            await page.mouse.wheel({ deltaY: -getRandomIntBetween(50, 250) });
        }

        resolve(true);
    });
};

module.exports = scrollPage;

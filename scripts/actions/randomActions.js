const { getRandomSideBarEle, sideBar } = require("../elemenetsList");
const {
    sleep,
    getRandomIntBelowMax,
    getRandomIntBetween,
} = require("../utils");
const scrollPage = require("./scrollPage");

const randomActions = async (page, sleep) => {
    return new Promise(async (resolve) => {
        await scrollPage(page);
        await sleep(getRandomIntBetween(2000, 3000));
        await page.click(`${getRandomSideBarEle()}`);

        await sleep(getRandomIntBetween(3000, 5000));

        await page.click(`${getRandomSideBarEle()}`);

        await sleep(getRandomIntBetween(3000, 5000));

        await page.click(`${getRandomSideBarEle()}`);

        await sleep(getRandomIntBetween(3000, 5000));

        await page.click(`${sideBar.home}`);

        await sleep(getRandomIntBetween(1000, 2000));

        const selectRandomTweet = async () => {
            return new Promise(async (resolve) => {
                let numOfTweets = await page.evaluate(() => {
                    const tweetEles = document.querySelectorAll(
                        'div[data-testid="tweet"]'
                    );
                    // tweetEles.map((e, index) => {
                    //     e.id = `tweet_changed_${index}`;
                    // });

                    for (let i = 0; i < 6; i++) {
                        tweetEles[i].id = `tweet_changed_${i}`;
                    }

                    return tweetEles.length;
                });
                await sleep(2000);
                console.log(numOfTweets);

                await page.waitForSelector("#tweet_changed_0");

                let randomNum = getRandomIntBelowMax(6);
                console.log("random int is: ", randomNum);
                await page.evaluate((randomNum) => {
                    document
                        .querySelector(`#tweet_changed_${randomNum}`)
                        .scrollIntoView({ behavior: "smooth" });
                }, randomNum);

                await sleep(getRandomIntBetween(1000, 1500));

                await page.click(`#tweet_changed_${randomNum}`);
                await sleep(3000);
                // await page.goBack();

                await page.click(sideBar.home);

                // await page.click(sideBar.home)
                await sleep(getRandomIntBetween(1500, 2500));
                resolve(true);
            });
        };

        await selectRandomTweet();

        await selectRandomTweet();

        resolve(true);
    });

    // scrollIntoView({
    //     behavior: "smooth"
    // })
};

exports.randomActions = randomActions;

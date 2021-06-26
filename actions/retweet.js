const retweetUserTweet = async (page,sleep) => {
    return new Promise(async (resolve) => {
        await page.evaluate(() => {
            // const likeEle = document.querySelectorAll('div[data-testid="like"]');
            // for (let i=0; i< likeEle.length; i++){
            //     likeEle[i].id = `like_changed_${i}`
            // }

            const retweetEle = document.querySelectorAll('div[data-testid="retweet"]');
            for (let i=0; i< retweetEle.length; i++){
                retweetEle[i].id = `retweet_changed_${i}`
            }
        })

        await sleep(2000);

        await page.click('#retweet_changed_0');

        await sleep(1500);

        await page.click('div[data-testid="retweetConfirm"]');

        await sleep(1500);

        resolve(true);
    })
}

module.exports = retweetUserTweet;

const replyTweet = async (page, sleep, comment) => {
    return new Promise(async (resolve) => {
        await page.evaluate(() => {
            // const likeEle = document.querySelectorAll('div[data-testid="like"]');
            // for (let i=0; i< likeEle.length; i++){
            //     likeEle[i].id = `like_changed_${i}`
            // }

            const replyEle = document.querySelectorAll(
                'div[data-testid="reply"]'
            );
            for (let i = 0; i < replyEle.length; i++) {
                replyEle[i].id = `reply_changed_${i}`;
            }
        });
        await page.click(`#reply_changed_0`);

        await sleep(2000);

        await page.click(`div[data-testid="tweetTextarea_0"]`);
        await sleep(2000);
        await page.keyboard.type(comment);
        await sleep(1500);
        await page.click(`div[data-testid="tweetButton"]`);
        await sleep(1500);
        resolve(true);
    });
};

module.exports = replyTweet;

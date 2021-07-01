
const followUser = async (page,sleep,userTweetHandle) => {
    return new Promise(async (resolve) => {
        await page.click(`div[aria-label="Follow @${userTweetHandle}"]`);

        await sleep(3500);
        resolve(true);
    })

}

module.exports = followUser;

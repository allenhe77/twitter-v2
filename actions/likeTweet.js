const likeTweet = async (page,sleep) => {
    return new Promise(async (resolve) =>{

        await page.evaluate(() => {
            const likeEle = document.querySelectorAll('div[data-testid="like"]');
            for (let i = 0; i < likeEle.length; i++) {
                likeEle[i].id = `like_changed_${i}`
            }
        })

        await sleep(3000)
        await page.click("#like_changed_0")


        resolve(true)


    })

}

module.exports = likeTweet;


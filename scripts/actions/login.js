const fs = require("fs");

const LogInSession = async (
    previousSession,
    page,
    cookiesFilePath,
    botTwitUsername
) => {
    return new Promise(async (resolve) => {
        const filePath = `./cookies/${botTwitUsername}.json`;
        if (fs.existsSync(filePath)) {
            // If file exist load the cookies
            const cookiesString = fs.readFileSync(filePath);
            const parsedCookies = JSON.parse(cookiesString);
            if (parsedCookies.length !== 0) {
                for (let cookie of parsedCookies) {
                    await page.setCookie(cookie);
                }
            }
        }

        resolve(true);
    });
};

module.exports = LogInSession;

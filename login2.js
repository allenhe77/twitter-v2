const fs = require("fs");

const LogIn = async (page, filePaths) => {
    return new Promise(async (resolve) => {
        const filePath = filePaths;
        if (fs.existsSync(filePath)) {
            // If file exist load the cookies
            const cookiesString = fs.readFileSync(filePath);
            let parsedCookies = JSON.parse(cookiesString);
            parsedCookies = parsedCookies.cookies;

            // parsedCookies = parsedCookies.cookies;
            if (parsedCookies.length !== 0) {
                for (let cookie of parsedCookies) {
                    await page.setCookie(cookie);
                }
            }
        }

        resolve(true);
    });
};

module.exports = LogIn;

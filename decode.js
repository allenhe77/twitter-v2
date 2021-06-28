const fs = require("fs");

const decodeCookies = (str, userName) => {
    let b64string = str;
    let buf = Buffer.from(b64string, "base64"); // Ta-da
    let text = buf.toString();
    const newText = text.replace(/'/g, '"');
    const newText2 = newText.replace(/True/g, "true");
    const newText3 = newText2.replace(/False/g, "false");
    const newText4 = newText3.replace(/""/g, '"');
    let parsedCookies = JSON.parse(newText4);

    fs.writeFileSync(
        `./cookies/${userName}.json`,
        JSON.stringify(parsedCookies)
    );
};

exports.decodeCookies = decodeCookies;

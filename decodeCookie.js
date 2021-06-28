const fs = require("fs");
const readline = require("readline");
const cookiesString = fs.readFileSync("cookies.txt", {
  encoding: "utf8",
  flag: "r",
});
const { getUserNameFromTxt, getCookieString } = require("./utils");

// let lineReader = require('line-reader');
//
// lineReader.eachLine('cookies.txt', function(line, last) {
//     console.log(line);
//     // do whatever you want with line...
//     if(last){
//         // or check if it's the last one
//         console.log("last line!")
//     }
// });

const decodeCookies = () => {
  const file = fs.readFileSync("./order.txt");
  let eachLine = file.toString().split("\n");
  let eachLineNew = [];
  eachLine.map((ele, index) => {
    if (ele !== "") {
      eachLineNew.push(ele);
    }
  });

  eachLineNew.map((ele, index) => {
    // console.log(getUserNameFromTxt(ele))
    let userName = getUserNameFromTxt(ele);
    let cookiesString = getCookieString(ele);

    let b64string = cookiesString;
    let buf = Buffer.from(b64string, "base64"); // Ta-da
    let text = buf.toString();
    const newText = text.replace(/'/g, '"');
    const newText2 = newText.replace(/True/g, "true");
    const newText3 = newText2.replace(/False/g, "false");
    const newText4 = newText3.replace(/""/g, '"');
    let parsedCookies = JSON.parse(newText4);

    console.log(parsedCookies);

    fs.writeFileSync(
      `./cookies/${userName}.json`,
      JSON.stringify(parsedCookies)
    );
  });
};

// console.log(cookiesString)
//  const parsedCookies = JSON.parse(cookiesString);

// console.log(parsedCookies);

//*********************************************

// let b64string = cookiesString;
// let buf = Buffer.from(b64string, 'base64'); // Ta-da
// let text = buf.toString();
// const newText = text.replace(/'/g,'"');
// const newText2 = newText.replace(/True/g,"true");
// const newText3 = newText2.replace(/False/g,"false")
// const newText4 = newText3.replace(/""/g,'"')
// let parsedCookies = JSON.parse(newText4);
//
//
// console.log(parsedCookies)

// fs.writeFileSync("./cookies.json",JSON.stringify(parsedCookies))

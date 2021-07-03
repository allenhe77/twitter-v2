const fetch = require("node-fetch");
const glob = require("glob");
// fetch("https://api.namefake.com/english-united-kingdom/female/")
//     .then((res) => res.json())
//     .then((data) => {
//         console.log(data);
//     });

glob("profilePics/*.jpeg", {}, function (er, files) {
    // files is an array of filenames.
    // If the `nonull` option is set, and nothing
    // was found, then files is ["**/*.js"]
    // er is an error object or null.
    console.log(files);
});

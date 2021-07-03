const fetch = require("node-fetch");

fetch("https://api.namefake.com/english-united-kingdom/female/")
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    });

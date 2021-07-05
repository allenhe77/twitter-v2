const glob = require("glob");
const fs = require("fs");
let a = glob.sync("*.json");
const { getRandomIntBetween } = require("../scripts/utils");

const proxyArr = [
    "5.8.51.78",
    "5.8.54.250",
    "37.139.56.74",
    "31.184.194.254",
    "5.101.65.15",
    "5.8.52.97",
    "5.101.0.88",
    "5.8.52.3",
    "46.161.50.103",
    "46.161.51.80",
    "5.101.2.180",
    "5.8.11.235",
    "91.243.51.181",
    "91.243.48.140",
    "5.8.48.210",
    "5.101.1.93",
    "37.139.56.153",
    "37.139.59.5",
    "5.101.0.206",
    "31.184.199.154",
    "5.101.0.27",
    "5.8.11.20",
    "5.8.53.201",
    "5.101.1.97",
    "31.184.194.92",
    "95.215.1.81",
    "5.8.11.107",
];

for (let i = 0; i < a.length; i++) {
    const file = fs.readFileSync(a[i]).toString();

    const obj = JSON.parse(file);
    obj.proxy = proxyArr[getRandomIntBetween(0, proxyArr.length)] + ":44429";

    fs.writeFileSync(a[i], JSON.stringify(obj));
}

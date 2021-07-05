const { getRandomIntBelowMax } = require("./utils");

const sideBar = {
    home: 'a[href="/home"]',
    search: 'a[href="/explore"]',
    notifications: 'a[href="/notifications"]',
    messages: 'a[href="/messages"]',
    // bookmarks: 'a[href="/i/bookmarks"]',
    // profile: (botTweetHandle) => {
    //     return `a[href="/${botTweetHandle}"]`;
    // },
    // lists: (botTweetHandle) => {
    //     return `a[href="/${botTweetHandle}/lists"]`;
    // },
};

const getSideBarSelectorArray = Object.keys(sideBar);

const getRandomSideBarEle = () => {
    return sideBar[
        getSideBarSelectorArray[
            getRandomIntBelowMax(getSideBarSelectorArray.length)
        ]
    ];
};

exports.getSideBarSelectorArray = getSideBarSelectorArray;
exports.sideBar = sideBar;
exports.getRandomSideBarEle = getRandomSideBarEle;

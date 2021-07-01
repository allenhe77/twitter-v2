const followLikeCommentRetweetSharedSteps = {
    step2: "How many bots to use? \n",
    step3: "Enter a delay time in ms, 1000 ms = 1 second \n",
};
const likeCommentRetweetSharedSteps = {
    step4: "Have any bots liked, commented or retweeted on this user's most recent tweet before? \n If Yes, enter old \n If no, enter new",
};

const followOptions = {
    step1: "Enter which user you want to follow. \n",
    step2: followLikeCommentRetweetSharedSteps.step2,
    step3: followLikeCommentRetweetSharedSteps.step3,
};

const likeOptions = {
    step1: "Enter which user you want to follow. \n",
    step2: followLikeCommentRetweetSharedSteps.step2,
    step3: followLikeCommentRetweetSharedSteps.step3,
    step4: likeCommentRetweetSharedSteps,
};
const commentOptions = {
    step1: "Enter which user you want to follow. \n",
    step2: followLikeCommentRetweetSharedSteps.step2,
    step3: followLikeCommentRetweetSharedSteps.step3,
    step4: likeCommentRetweetSharedSteps,
};

const retweetOptions = {
    step1: "Enter which user you want to follow. \n",
    step2: followLikeCommentRetweetSharedSteps.step2,
    step3: followLikeCommentRetweetSharedSteps.step3,
    step4: likeCommentRetweetSharedSteps,
};

exports.followOptions = followOptions;
exports.commentOptions = commentOptions;
exports.likeOptions = likeOptions;
exports.retweetOptions = retweetOptions;

const { regUser } = require("./regUsers");
const { sleep } = require("./scripts/utils");
const runReg = async () => {
    for (let i = 0; i < 2; i++) {
        regUser();
        regUser();
        regUser();
        regUser();
        regUser();
        regUser();
        regUser();
        regUser();
        regUser();
        regUser();

        await sleep(400000);
    }
};
runReg();

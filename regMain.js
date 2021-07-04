const { regUser } = require("./regUsers");

const runReg = async () => {
    for (let i = 0; i < 10; i++) {
        try {
            await regUser();
        } catch (e) {
            console.error(e);
        }
    }
};
runReg();

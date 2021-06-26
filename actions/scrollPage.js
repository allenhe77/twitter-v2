const scrollPage = async (page) => {
    return new Promise(async (resolve) => {
        await page.mouse.wheel({ deltaY: 30 });
        await page.mouse.wheel({ deltaY: 44 });

        await page.mouse.wheel({ deltaY: 20 });

        await page.mouse.wheel({ deltaY: 100 });
        await page.mouse.wheel({ deltaY: 150 });
        await page.mouse.wheel({ deltaY: 90 });
        await page.mouse.wheel({ deltaY: 70 });
        await page.mouse.wheel({ deltaY: 80 });

        await page.mouse.wheel({ deltaY: -50 });
        await page.mouse.wheel({ deltaY: -17 });

        await page.mouse.wheel({ deltaY: -100 });
        await page.mouse.wheel({ deltaY: -150 });
        await page.mouse.wheel({ deltaY: -90 });
        await page.mouse.wheel({ deltaY: -70 });
        await page.mouse.wheel({ deltaY: -80 });

        resolve(true);
    });
};

module.exports = scrollPage;

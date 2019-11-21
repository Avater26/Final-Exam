const {
    randomHouse
} = require("../models/aside.model");
module.exports = function (app) {
    app.use(async function (req, res, next) {
        try {
            if (typeof req.app.locals.isLoggedIn === "undefined") {
                req.app.locals.isLoggedIn = false;
            }
            req.app.locals.siteName = "Boligstjernen";
            req.app.locals.randHouse = await randomHouse();
            return next();
        } catch (error) {
            return next(error);
        }
    })
};
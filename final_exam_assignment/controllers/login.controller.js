const {
    getUserByUsername
} = require('../models/user_roles.model');

const {
    compareSync
} = require("bcryptjs");



exports.getLoginForm = function (req, res, next) {
    res.render("login", {
        db: "Login"
    });
}

exports.loginCheck = async function (req, res, next) {
    try {
        const rows = await getUserByUsername(req.fields.username);

        if (rows.length !== 1) {
            res.redirect("/login");
            return;
        }
        if (!compareSync(req.fields.password, rows[0].password)) {
            res.redirect("/login");
            return;
        }
        req.session.isLoggedIn = true;
        req.session.user = rows[0].id;
        req.app.locals.isLoggedIn = true;
        res.redirect("/admin");
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}

exports.logout = function (req, res, next) {
    delete req.session.isLoggedIn;
    delete req.app.locals.isLoggedIn;
    delete req.session.user;
    res.redirect("/");
}
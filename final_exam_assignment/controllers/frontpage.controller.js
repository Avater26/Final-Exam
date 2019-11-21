const {
    getLimitNews,
    submitNewsletterModel,
    deleteNewsletterModel
} = require('../models/frontpage.model');

exports.frontpage = async function (req, res, next) {
    try {
        const news = await getLimitNews();
        res.render("frontpage", {
            page_name: "Forsiden",
            news: news
        })
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}

exports.submitNewsletter = async function (req, res, next) {
    try {
        const result = await submitNewsletterModel(req.fields.email);

        if (result.affectedRows == 1) {
            req.flash("info", "Du er nu tilmeldt nyhedsbrevet.");
        } else {
            req.flash("error", "Der skete en fejl under din tilmelding til nyhedsbrevet.");
        }

        res.redirect(req.headers.referer)
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}
exports.deleteNewsletter = async function (req, res, next) {
    try {
        const result = await deleteNewsletterModel(req.fields.email);

        if (result.affectedRows == 1) {
            req.flash("info", "Du er nu frameldt nyhedsbrevet.");
        } else {
            req.flash("error", "Der skete en fejl under din framelding fra nyhedsbrevet.");
        }

        res.redirect(req.headers.referer)
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}
const {
    contactInfo
} = require("../models/contact.model");

const {
    openTimes
} = require("../models/opentimes.model");

const {
    postCommentModel
} = require("../models/comment.model");

exports.getContact = async function (req, res, next) {
    try {
        const times = await openTimes();
        const contact = await contactInfo();
        res.render('contact', {
            page_name: "Kontakt",
            times,
            contact
        })
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}

exports.postComment = async function (req, res, next) {
    try {
        const result = await postCommentModel(req.fields.name, req.fields.address, req.fields.phone, req.fields.email, req.fields.comment)

        if (result[0].affectedRows == 1) {
            req.flash("info", "Din kommentar er blevet sendt.");
        } else {
            req.flash("error", "Der skete en fejl, da vi prøvede at sende din kommentar.");
        }
        res.redirect("/kontakt");
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}
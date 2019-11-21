const {
    getContact,
    postComment
} = require("../controllers/contact.controller");

module.exports = function (app) {
    app.get("/kontakt", getContact);
    app.post("/kontakt", postComment);
}
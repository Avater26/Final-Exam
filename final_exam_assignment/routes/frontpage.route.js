const {
    frontpage,
    submitNewsletter,
    deleteNewsletter
} = require("../controllers/frontpage.controller");

module.exports = function (app) {
    app.get("/", frontpage);
    app.post("/signup", submitNewsletter);
    app.post("/delete", deleteNewsletter);
}
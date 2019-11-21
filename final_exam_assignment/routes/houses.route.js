const {
    getSingleHouse,
    findByCaseNumber,
    getSearch,
    getSearchResults
} = require("../controllers/homes.controller");

module.exports = function (app) {
    app.get("/s%C3%B8g", getSearch);
    app.get("/boliger", getSearchResults);
    app.get("/bolig/:id", getSingleHouse);
}
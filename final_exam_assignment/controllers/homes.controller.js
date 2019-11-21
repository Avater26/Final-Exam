const {
    getOneHouse,
    searchHouses,
} = require("../models/houses.model");

const {
    getHouseTypes
} = require('../models/house_types.model')
const {
    getImagesByHouseId
} = require("../models/images.model");

exports.getSearch = async function (req, res, next) {
    try {
        const [types] = await getHouseTypes();

        res.render("search", {
            page_name: "Find bolig",
            types: types,
            input: req.query,
            results: []
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getSearchResults = async function (req, res, next) {
    try {
        const [rows] = await searchHouses(req.query);
        const [types] = await getHouseTypes();

        for (let i = 0; i < rows.length; i++) {
            if (rows[i].description.length > 187) {
                rows[i].description = rows[i].description.slice(0, 182);
                rows[i].description += " ...";
            }
        }

        if (rows.length == 0) {
            req.flash("error", "Der er desværre ikke nogen emner der matcher dine kriterier. Vi anbefaler at du udvider din søgning og prøver igen.")
        }

        res.render("search", {
            page_name: "Find bolig",
            results: rows,
            types: types,
            input: req.query
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getSingleHouse = async function (req, res, next) {
    try {

        const [product] = await getOneHouse(req.params.id)
        const images = await getImagesByHouseId(req.params.id)

        res.render("singleHouse", {
            result: product[0],
            page_name: "Bolig",
            images: images
        });
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}
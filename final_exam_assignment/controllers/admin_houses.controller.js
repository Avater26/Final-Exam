const {
    createHouse,
    getOneHouseById,
    updateHouse,
    getAdminHouseList,
    deleteHouseModel
} = require('../models/houses.model');

const {
    getHouseTypes,
} = require('../models/house_types.model');

const {
    createImage,
    getImagesByHouseId,
    setPrimaryImage,
    unsetPrimaryImage
} = require("../models/images.model");

exports.getHouses = async function (req, res, next) {
    try {
        const rows = await getAdminHouseList();

        res.render("admin_houses", {
            results: rows,
            db: "Boliger"
        });

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}

exports.getNewHouse = async function (req, res, next) {
    try {
        const [types] = await getHouseTypes();

        res.render("admin_new-house", {
            db: "Opret en ny bolig",
            types
        });

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");

    }
}

exports.createNewHouse = async function (req, res, next) {
    try {
        const house = await createHouse({
            title: req.fields.title,
            description: req.fields.description,
            case_number: req.fields.case_number,
            price: req.fields.price,
            brutto: req.fields.brutto,
            netto: req.fields.netto,
            size_area: req.fields.size_area,
            size_home: req.fields.size_home,
            fk_house_type: req.fields.type
        });

        if (Object.prototype.toString.call(req.files.image) === "[object Array]") {
            req.files.image.forEach(async file => {
                try {
                    await createImage(file, house.insertId);
                } catch (error) {
                    return
                }
            })
        } else {
            await createImage(req.files.image, house.insertId);
        }

        res.redirect("/admin/house/edit/" + house.insertId);

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}

exports.getHouseEdit = async function (req, res, next) {
    try {
        const house = await getOneHouseById(req.params.id);
        const [types] = await getHouseTypes();
        const images = await getImagesByHouseId(req.params.id);

        res.render("admin_edit-house", {
            house,
            types,
            images,
            db: "Rediger bolig"
        })

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}

exports.setPrimaryImage = async function (req, res, next) {
    try {
        const [unset] = await unsetPrimaryImage(req.headers.referer.split("/").pop())
        const [set] = await setPrimaryImage(req.fields.primary_image);
        if (set.affectedRows === 1 || unset.affectedRows === 1) {
            req.flash("info", "Boligs primære billed er blevet opdateret")
        } else {
            req.flash("error", "Der skete en fejl under opdateringen")
        }
        const path = new URL(req.headers.referer).pathname;
        res.redirect(path)
    } catch (error) {
        return next(error);
    }
}

exports.editHouse = async function (req, res, next) {
    try {
        await updateHouse({
            title: req.fields.title,
            description: req.fields.description,
            case_number: req.fields.case_number,
            price: req.fields.price,
            brutto: req.fields.brutto,
            netto: req.fields.netto,
            size_area: req.fields.size_area,
            size_home: req.fields.size_home,
            fk_house_type: req.fields.type,
            id: req.params.id
        })

        if (Object.prototype.toString.call(req.files.image) === "[object Array]") {
            req.files.image.forEach(async (file) => {
                try {
                    await createImage(file, req.params.id);
                } catch (error) {
                    return
                }
            })
        } else {
            await createImage(req.files.image, req.params.id);
        }

        res.redirect(req.headers.referer);

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}


exports.deleteHouse = async function (req, res, next) {
    try {
        await deleteHouseModel(req.params.id);

        res.redirect("/admin/houses");

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}
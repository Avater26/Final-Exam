const {
    getHouseTypes,
    createHouseTypeModel,
    getHouseTypeById,
    updateHouseType,
    deleteHouseTypeModel
} = require('../models/house_types.model');

exports.getHouseTypes = async function (req, res, next) {
    try {
        const [rows] = await getHouseTypes()

        res.render("admin_house_types", {
            results: rows,
            db: "Bolig typer"
        });

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}

exports.getNewHouseType = async function (req, res, next) {
    try {
        res.render("admin_new-house_type", {
            db: "Opret en ny bolig type"
        });

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}

exports.createHouseType = async function (req, res, next) {
    try {
        await createHouseTypeModel(req.fields.name)
        res.redirect("/admin/house_types");

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}

exports.getHouseTypeEdit = async function (req, res, next) {
    try {
        const rows = await getHouseTypeById(req.params.id)

        res.render("admin_edit-house_type", {
            house_type: rows,
            db: "Rediger bolig type"
        })

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}


exports.editHouseType = async function (req, res, next) {
    try {
        await updateHouseType(req.params.id, req.fields.name)

        res.redirect("/admin/house_types");

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}


exports.deleteHouseType = async function (req, res, next) {
    try {
        await deleteHouseTypeModel(req.params.id);

        res.redirect("/admin/house_types");

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}
const db = require('../config/mysql.js');
const {
    getRoles,
    getRoleById,
    createRoleModel,
    editRoleModel,
    deleteRoleModel
} = require('../models/user_roles.model');

exports.getRoles = async function (req, res, next) {
    try {
        const rows = await getRoles();

        res.render("admin_roles", {
            results: rows,
            db: "Roles"
        });

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}

exports.getNewRole = async function (req, res, next) {
    try {
        const roles = await getRoles();

        res.render("admin_new-role", {
            db: "Create new role",
            roles: roles
        });

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");

    }
}

exports.createRole = async function (req, res, next) {
    try {
        await createRoleModel(req.fields.name, req.fields.level);

        res.redirect("/admin/roles");
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}

exports.getRoleEdit = async function (req, res, next) {
    try {
        const roles = await getRoleById(req.params.id);

        res.render("admin_edit-role", {
            db: "Edit Role",
            roles: roles[0]
        })

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}


exports.editRole = async function (req, res, next) {
    try {
        const rows = await editRoleModel(req.params.id, req.fields.name, req.fields.level)

        if (rows.affectedRows == 1) {
            req.flash("info", "Brugeren er blevet opdateret");
        } else {
            req.flash("error", "Der skete en fejl under opdateringen");
        }

        res.redirect("/admin/roles");

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}


exports.deleteRole = async function (req, res, next) {
    try {
        await deleteRoleModel(req.params.id);

        res.redirect("/admin/roles");

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}
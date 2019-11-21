const {
    getUsersModel,
    getUserById,
    createUserModel,
    updateUser,
    deleteUserModel,
    getRoles
} = require("../models/user_roles.model");

exports.getDash = async function (req, res, next) {
    try {
        res.render("admin_dash", {
            db: "Dashboard"
        });

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}

exports.getUsers = async function (req, res, next) {
    try {
        const rows = await getUsersModel();

        res.render("admin_users", {
            results: rows,
            db: "Users"
        });

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}

exports.getNewUser = async function (req, res, next) {
    try {
        const roles = await getRoles();

        res.render("admin_new-user", {
            db: "Create new user",
            roles: roles
        });

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");

    }
}

exports.createUser = async function (req, res, next) {
    try {
        await createUserModel(req.fields.username, req.fields.password, req.fields.role);

        res.redirect("/admin/users");

    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.send("User already exists");
        }
        console.log(error);
        res.send("Something went wrong");
    }
}

exports.getUserEdit = async function (req, res, next) {
    try {
        const roles = await getRoles();

        const rows = await getUserById(req.params.id)

        res.render("admin_edit-user", {
            user: rows[0],
            roles: roles,
            db: "Users"
        })
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}


exports.editUser = async function (req, res, next) {
    try {
        const rows = await updateUser(req.fields.username, req.fields.password, req.fields.role, req.params.id);

        if (rows.affectedRows == 1) {
            req.flash("info", "Brugeren er blevet opdateret");
        } else {
            req.flash("error", "Der skete en fejl under opdateringen");
        }

        res.redirect("/admin/user/edit/" + req.params.id);

    } catch (error) {
        console.log(error);
        res.redirect("/admin/user/edit/" + req.params.id);
    }
}

exports.deleteUser = async function (req, res, next) {
    try {
        await deleteUserModel(req.params.id)

        res.redirect("/admin/users");

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}
const {
    getContactList,
    getContactById,
    contactUpdate
} = require('../models/contact.model');

exports.getContact = async function (req, res, next) {
    try {
        const contact = await getContactList();
        res.render('admin_contact', {
            results: contact,
            db: 'Kontakt information'
        })
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}

exports.getContactEdit = async function (req, res, next) {
    try {
        const contact = await getContactById(req.params.id);
        res.render('admin_edit-contact', {
            contact,
            db: 'Rediger kontakt'
        })
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}

exports.editContact = async function (req, res, next) {
    try {
        const rows = await contactUpdate({
            name: req.fields.name,
            address: req.fields.address,
            city: req.fields.city,
            phone: req.fields.phone,
            fax: req.fields.fax,
            email: req.fields.email,
            id: req.params.id
        })

        if (rows[0].affectedRows == 1) {
            req.flash("info", "Kontakt informationen er blevet opdateret");
        } else {
            req.flash("error", "Der skete en fejl under opdateringen");
        }

        res.redirect("/admin/contact/edit/" + req.params.id);
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}
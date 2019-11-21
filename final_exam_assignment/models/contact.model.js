const db = require("../config/mysql");

exports.contactInfo = async function () {
    try {
        const sql = `SELECT name, address, city, phone, fax, email FROM contact_info`;
        const [rows] = await db.query(sql);
        return rows[0]
    } catch (error) {
        console.log(error);
        return null
    }
}
// Admin related
exports.getContactList = async function () {
    try {
        const sql = `SELECT id, name, address, city, phone, fax, email FROM contact_info`;
        const [news] = await db.query(sql);
        return news;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.getContactById = async function (id) {
    try {
        const sql = `SELECT name, address, city, phone, fax, email FROM contact_info
        WHERE id = :id`;
        const [contact] = await db.query(sql, {
            id
        });

        return contact[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.contactUpdate = async function (params) {
    try {
        const sql = `UPDATE contact_info SET name = :name, address = :address, city = :city,
        phone = :phone, fax = :fax, email = :email WHERE id = :id`;
        return await db.query(sql, params);
    } catch (error) {
        console.log(error);
        return null;
    }
}
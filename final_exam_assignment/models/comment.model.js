const db = require("../config/mysql");

// Post comment
exports.postCommentModel = async function (name, address, phone, email, comment) {
    try {
        const sql = `INSERT INTO comments SET name = :name, address = :address, phone = :phone, email = :email, comment = :comment`;
        return await db.query(sql, {
            name,
            address,
            phone,
            email,
            comment
        });
    } catch (error) {
        console.log(error);
        return null
    }
}

// Admin stuff
exports.getCommentList = async function () {
    try {
        const sql = `SELECT id, name, address, phone, email, comment FROM comments`;
        const [comment] = await db.query(sql);
        return comment;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.commentDelete = async function (id) {
    try {
        const sql = `DELETE FROM comments WHERE id = :id`;
        return await db.query(sql, {
            id
        });
    } catch (error) {
        console.log(error);
        return null;
    }
}
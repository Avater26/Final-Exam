const db = require('../config/mysql.js');

exports.getTimes = async function (req, res, next) {
    try {
        const daysSQL = `SELECT id, days, open, close FROM open_times;`

        const [rows] = await db.query(daysSQL)

        res.render("admin_open_times", {
            results: rows,
            db: "Open Times"
        });

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}

exports.getTimesEdit = async function (req, res, next) {
    try {
        const daysSQL = `SELECT id, days, open, close FROM open_times
        WHERE id = :id`;

        const [rows] = await db.query(daysSQL, {
            id: req.params.id
        })

        res.render("admin_edit-open_times", {
            days: rows[0],
            db: "Open Times"
        })

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}


exports.editTimes = async function (req, res, next) {
    try {
        const userSQL = `UPDATE open_times SET days = :days, open = :open, close = :close  WHERE id = :id;`;

        await db.query(userSQL, {
            days: req.fields.days,
            open: req.fields.open,
            close: req.fields.close,
            id: req.params.id
        });

        res.redirect("/admin/open_times");

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}
const db = require("../config/mysql");
const moment = require("moment");
moment.locale("da");

// Open times
exports.openTimes = async function () {
    try {
        const timesSQL = `SELECT days, open, close, not_open FROM open_times`;

        const [times] = await db.query(timesSQL)

        for (let i = 0; i < times.length; i++) {
            times[i].open = moment(times[i].open, moment.HTML5_FMT.TIME).format("H:mm");
            times[i].close = moment(times[i].close, moment.HTML5_FMT.TIME).format("H:mm");
        }

        return times;
    } catch (error) {
        console.log(error);
        return null
    }
}
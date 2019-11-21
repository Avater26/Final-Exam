const db = require('../config/mysql');

exports.randomHouse = async function () {
    try {
        const sql = `SELECT houses.id, houses.title, houses.case_number, houses.price, houses.size_home, houses.size_area, images.path
        FROM images
        INNER JOIN houses ON images.fk_house = houses.id
        WHERE images.primary_img = 1
        ORDER BY RAND()
        LIMIT 1`;
        const [rows] = await db.query(sql);

        return rows;
    } catch (error) {
        console.log(error);
        return null
    }
}
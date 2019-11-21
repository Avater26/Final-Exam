const db = require('../config/mysql');
const Jimp = require('jimp');
const {
    join
} = require("path");
const uid = require("uid");

exports.setPrimaryImage = async function (id) {
    try {
        const sql = `UPDATE images SET primary_img = 1 WHERE id = :id`;
        return await db.query(sql, {
            id
        });
    } catch (error) {
        console.log(error);
        return null
    }
}

exports.unsetPrimaryImage = async function (houseId) {
    try {
        const sql = `UPDATE images SET primary_img = 0 WHERE fk_house = :houseId`;
        return await db.query(sql, {
            houseId
        });
    } catch (error) {
        console.log(error);
        return null
    }
}

const saveFileToDB = async function (houseId, filename) {
    try {
        const sql = `INSERT INTO images SET path = :path, fk_house = :fk_house`;
        const [result] = await db.query(sql, {
            path: filename,
            fk_house: houseId
        })
        return result;
    } catch (error) {
        console.log(error);
        return null
    }
}

const resizeImage = function (file, filename, width, height) {
    Jimp.read(file.path)
        .then(image => {
            return image
                .scaleToFit(width, height)
                .write(join(__dirname, "../public/images/uploads", filename));
        })
        .catch(err => {
            console.log(err);
        })
}

exports.createImage = async function (file, houseId) {
    return new Promise(async function (resolve, reject) {
        try {
            const filename = `${Date.now()}_${uid(4)}.jpg`;

            resizeImage(file, filename, 400, 300);
            resizeImage(file, "thumbnail_" + filename, 120, 90);

            resolve(await saveFileToDB(houseId, filename));
        } catch (error) {
            console.log(error);
            reject();
        }

    })
}

exports.getImagesByHouseId = async function (id) {
    try {
        const imageSQL = `SELECT id, path, primary_img, fk_house FROM images WHERE fk_house = :id ORDER BY primary_img DESC`;
        const [rows] = await db.query(imageSQL, {
            id
        });
        return rows;
    } catch (error) {
        console.log(error);
        return null
    }
}
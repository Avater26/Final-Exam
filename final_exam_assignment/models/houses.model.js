const db = require('../config/mysql');

exports.getOneHouse = async function (id) {
    try {
        const sql = `SELECT houses.title, houses.description, houses.price, houses.case_number,
        houses.brutto, houses.netto, houses.size_home, houses.size_area,
        house_type.name AS type FROM houses
        INNER JOIN house_type ON houses.fk_house_type = house_type.id
        WHERE houses.id = :id`;

        return await db.query(sql, {
            id
        })
    } catch (error) {
        console.log(error);
        return null
    }
}

exports.searchHouses = async function (searchParams) {
    try {
        let sql = `SELECT houses.id, houses.title, houses.description, images.path
           FROM images
           INNER JOIN houses ON images.fk_house = houses.id
           WHERE 1=1`;

        // if (searchParams.name != '') {
        //     sql += ' AND houses.name = :name ';
        //     searchParams.name = "%" + searchParams.name + "%";
        // }

        // Search Case Number
        if (searchParams.case_number != undefined && searchParams.case_number != '') {
            sql += ' AND houses.case_number = :case_number ';
        }

        // Search Price
        if (searchParams.minPrice != undefined && searchParams.minPrice != '' && (searchParams.maxPrice == undefined || searchParams.maxPrice == '')) {
            sql += ' AND houses.price >= :minPrice ';
        }
        if (searchParams.maxPrice != undefined && searchParams.maxPrice != '' && (searchParams.minPrice == undefined || searchParams.minPrice == '')) {
            sql += ' AND houses.price <= :maxPrice ';
        }
        if (searchParams.minPrice != '' && searchParams.maxPrice != '' && searchParams.minPrice < searchParams.maxPrice) {
            sql += ' AND (houses.price BETWEEN :minPrice AND :maxPrice) ';
        }

        // Search Brutto
        if (searchParams.minBrutto != undefined && searchParams.minBrutto != '' && (searchParams.maxBrutto == undefined || searchParams.maxBrutto == '')) {
            sql += ' AND houses.brutto >= :minBrutto ';
        }
        if (searchParams.maxBrutto != undefined && searchParams.maxBrutto != '' && (searchParams.minBrutto == undefined || searchParams.minBrutto == '')) {
            sql += ' AND houses.brutto <= :maxBrutto ';
        }
        if (searchParams.minBrutto != '' && searchParams.maxBrutto != '' && searchParams.minBrutto < searchParams.maxBrutto) {
            sql += ' AND (houses.brutto BETWEEN :minBrutto AND :maxBrutto) ';
        }

        // Search Netto
        if (searchParams.minNetto != undefined && searchParams.minNetto != '' && (searchParams.maxNetto == undefined || searchParams.maxNetto == '')) {
            sql += ' AND houses.netto >= :minBrutto ';
        }
        if (searchParams.maxNetto != undefined && searchParams.maxNetto != '' && (searchParams.minNetto == undefined || searchParams.minNetto == '')) {
            sql += ' AND houses.netto <= :maxNetto ';
        }
        if (searchParams.minNetto != '' && searchParams.maxNetto != '' && searchParams.minNetto < searchParams.maxNetto) {
            sql += ' AND (houses.netto BETWEEN :minNetto AND :maxNetto) ';
        }

        // Search Size Home
        if (searchParams.minHome != undefined && searchParams.minHome != '' && (searchParams.maxHome == undefined || searchParams.maxHome == '')) {
            sql += ' AND houses.size_home >= :minHome ';
        }
        if (searchParams.maxHome != undefined && searchParams.maxHome != '' && (searchParams.minHome == undefined || searchParams.minHome == '')) {
            sql += ' AND houses.size_home <= :maxHome ';
        }
        if (searchParams.minHome != '' && searchParams.maxHome != '' && searchParams.minHome < searchParams.maxHome) {
            sql += ' AND (houses.size_home BETWEEN :minHome AND :maxHome) ';
        }

        // Search Size Area
        if (searchParams.minArea != undefined && searchParams.minArea != '' && (searchParams.maxArea == undefined || searchParams.maxArea == '')) {
            sql += ' AND houses.size_area >= :minArea ';
        }
        if (searchParams.maxArea != undefined && searchParams.maxArea != '' && (searchParams.minArea == undefined || searchParams.minArea == '')) {
            sql += ' AND houses.size_area <= :maxArea ';
        }
        if (searchParams.minArea != '' && searchParams.maxArea != '' && searchParams.minArea < searchParams.maxArea) {
            sql += ' AND (houses.size_area BETWEEN :minArea AND :maxArea) ';
        }

        // Search House type
        if (Object.prototype.toString.call(searchParams.fk_house_type) === "[object Array]") {
            sql += ' AND (';
            sqlParts = [];
            searchParams.fk_house_type.forEach(house_type => {
                sqlParts.push(` (houses.fk_house_type = ${house_type})`);
            });
            sql += sqlParts.join(' OR ');
            sql += ' )';
        } else if (Object.prototype.toString.call(searchParams.fk_house_type) !== "[object Array]" && searchParams.fk_house_type != "" && searchParams.fk_house_type != undefined) {
            sql += ' AND houses.fk_house_type = :fk_house_type'
        }
        sql += " GROUP BY houses.id";

        return await db.query(sql, searchParams)
    } catch (error) {
        console.log(error);
        return null
    }
}

exports.getHouseByCaseNumber = async function (case_number) {
    try {
        const sql = `SELECT id FROM houses WHERE case_number = :case_number`;

        return await db.query(sql, {
            case_number
        })
    } catch (error) {
        console.log(error);
        return null
    }
}

exports.createHouse = async function (params) {
    try {
        const sql = `INSERT INTO houses 
        SET title = :title, description = :description, price = :price, case_number = :case_number,
        brutto = :brutto, netto = :netto, size_home = :size_home, size_area = :size_area,
        fk_house_type = :fk_house_type`;

        const [result] = await db.query(sql, params);

        return result;
    } catch (error) {
        console.log(error);
        return null
    }
}

exports.getOneHouseById = async function (id) {
    try {
        const sql = `SELECT houses.title, houses.description, houses.price, houses.case_number,
        houses.brutto, houses.netto, houses.size_home, houses.size_area, fk_house_type
        FROM houses
        WHERE houses.id = :id`;

        const [rows] = await db.query(sql, {
            id
        });
        return rows[0];
    } catch (error) {
        console.log(error);
        return null
    }
}

exports.getAdminHouseList = async function () {
    try {
        const sql = `SELECT houses.id, houses.title, houses.description, houses.price, houses.case_number,
        houses.brutto, houses.netto, houses.size_home, houses.size_area,
        house_type.name AS type, images.path FROM images
        INNER JOIN houses ON images.fk_house = houses.id
        INNER JOIN house_type ON houses.fk_house_type = house_type.id
        GROUP BY houses.id
        ORDER BY houses.id ASC;`;

        const [rows] = await db.query(sql);
        return rows;
    } catch (error) {
        console.log(error);
        return null
    }
}

exports.updateHouse = async function (params) {
    try {
        const sql = `UPDATE houses SET title = :title, case_number = :case_number, description = :description, price = :price, 
        brutto = :brutto, netto = :netto, size_area = :size_area, size_home = :size_home, 
        fk_house_type = :fk_house_type
        WHERE id = :id;`;

        const [results] = await db.query(sql, params);

        return results;
    } catch (error) {
        console.log(error);
        return null
    }
}

exports.deleteHouseModel = async function (id) {
    const sql = `DELETE FROM houses WHERE id = :id`;

    await db.query(sql, {
        id
    });

}
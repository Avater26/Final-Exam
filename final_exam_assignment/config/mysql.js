const {
	createPool
} = require('mysql2/promise');

module.exports = (function () {
	return createPool({
		'connectionLimit': 10,
		'host': process.env.DB_HOST,
		'user': process.env.DB_USER,
		'password': process.env.DB_PSWD,
		'database': process.env.DB_DTBS,
		namedPlaceholders: true
	});
})();
const mysql=require('mysql');
let db;

function mysqlConnect(mysqlConfig) {
	db = mysql.createConnection({
		connectionLimit: 10,
		...mysqlConfig
	});
	const query = db.query.bind(db);

	db.query = function (sql,data) {
		let args=[sql,data]
		return new Promise((resolve,reject) => {
			query(...args,(err,results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results)
				}
			})
		})
	}
	return db;
}

mysqlConnect({
	host: 'localhost',
	port: 3306,
	limit: 10,
	user: 'root',
	password: 'root'
});



module.exports={
	mysqlConnect: mysqlConnect,
	get db() {
		return db;
	}
}
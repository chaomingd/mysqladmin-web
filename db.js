const mysql=require('mysql');
let db;

function mysqlConnect(mysqlConfig) {
	db = mysql.createPool({
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
	db.connect(err => {
		if(err) {
			return console.error('error connecting: ' + err.stack);
		}
		console.log('connected as id ' + connection.threadId);
	})
	return db;
}



module.exports={
	mysqlConnect: mysqlConnect,
	get db() {
		return db;
	}
}
const Router = require('koa-router')
const db = require('../db').db

const router = new Router({
	prefix: '/api'
});

router.get('/tables',async ctx => {
	const query = ctx.query;
	console.log(query)
	if(!query.database) {
		return ctx.body = {code: 400, message: 'database 必填'}
	}
	let results = await db.query('show tables in ??',query.database)
	ctx.body = {code: 200, message: 'success', data: results}
})

router.post('/tables', async ctx => {
	const body = ctx.request.body;
	if(!body.database) {
		return ctx.body = {code: 400, message: 'database 必填'}
	}
	if(!body.table) {
		return ctx.body = {code: 400, message: 'table 必填'}
	}
	if(!body.columns) {
		return ctx.body = {code: 400, message: '至少添加一列'}
	}
	await db.query(`create table ${body.database}.?? ${resolveColumns(body.columns)}`,body.table);
	ctx.body = {code: 200, message: 'success'}
})

router.get('/columns',async ctx => {
	let results = await db.query('show columns from test.test1')
	ctx.body = results;
})


function resolveColumns(columns) {
	let result = [];
	let primary = [];
	let unique = [];
	let foreignKey = [];
	let FieldStr = [];
	columns.forEach(column => {
		FieldStr.push(`${column.Field} ${column.type} ${column.Null === 'NO'? 'not null': ''} ${column.Extra} ${column.Default?'default ' + column.Default: ''}`);
		if(column.Key === 'PRI') {
			primary.push(column.Field);
		}else if(column.Key === 'UNI') {
			unique.push(column.Field);
		}
	});
	FieldStr.push(`primary key (${primary})`);
	FieldStr.push(`CONSTRAINT ${unique.join('_')} UNIQUE (${unique})`);
	return `(${FieldStr})`
}


module.exports = router;
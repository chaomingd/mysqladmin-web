const Router = require('koa-router')
const mysqlClient = require('../db')
const router = new Router({
	prefix: '/api'
});

router.get('/databases',async (ctx) => {
	let results = await mysqlClient.db.query('show databases')
	ctx.body = {code: 200, message: 'success',data: results};
})

router.delete('/databases',async ctx => {
	const query = ctx.query;
	if(!query.database) {
		return ctx.body = {code: 400, message: 'database 必传'}
	}
	await mysqlClient.db.query('drop database ??',query.database);
	ctx.body = {code: 200, message: 'success'}
})
router.post('/databases',async ctx => {
	const body = ctx.request.body;
	if(!body.database) {
		return ctx.body = {code: 400, message: 'database 必传'}
	}
	try {
		let result = await mysqlClient.db.query('create database ??', body.database);
		ctx.body = result;
	}catch(e) {
		ctx.body = {code: 400, message: '数据库已存在'}
	}
})


module.exports = router;
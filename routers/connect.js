const Router = require('koa-router')
const router = new Router({
	prefix: '/api'
});

router.get('/connect',(ctx) => {
	ctx.body = {code: 200,message: 'success'}
})


module.exports = router;
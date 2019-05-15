const koa = require('koa');
const body = require('koa-body')

const app = new koa();

app.use(async (ctx,next) => {
	ctx.set({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': ['GET', 'PUT', 'POST','DELETE','OPTIONS'],
		'Access-Control-Allow-Headers': ['Content-Type', 'Authorization']
	})
  await	next();
});
app.use(async (ctx,next) => {
	try {
		await next();
	}catch(e) {
		console.log(e)
		ctx.body = {
			code: 400,
			message: e.message
		}
	}
})

app.use(body())

// routers
require('./routers')(app);

app.listen(3000)
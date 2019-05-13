const koa = require('koa');

const app = new koa();

// routers
require('./routers')(app);

app.listen(3000)
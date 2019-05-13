const fs = require('fs');
const path = require('path')

module.exports = app => {
	const files = fs.readdirSync(__dirname);
	files.forEach(item => {
			if (item !== 'index.js') {
					const router = require(path.resolve(__dirname,item))
					app.use(router.routes(), router.allowedMethods())
			}
	})
}
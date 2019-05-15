const PropTypes = require('./propTypes')

module.exports = function(constraints) {
	if(!constraints || !PropTypes.Array(constraints)) {
		throw new Error('constraints 参数不对')
	}
}
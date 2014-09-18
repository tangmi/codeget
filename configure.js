if (process.env.CODEGET_DEV) {
	module.exports = {
		CODE_DIR: __dirname + '/_test_code'
	};
} else {
	module.exports = {
		CODE_DIR: process.env.HOME + '/code'
	};
}
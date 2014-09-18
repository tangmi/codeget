var fs = require('fs');

module.exports = function(dir, cb) {
	if (!cb) throw new Error('no callback provided!');

	if (!dir) {
		return cb(new Error('directory not specified'));
	}

	if (!fs.existsSync(dir)) {
		return cb(new Error('no such file or directory: ' + dir));
	}

	if (!fs.statSync(dir).isDirectory()) {
		return cb(new Error('not a directory: ' + dir));
	}

	process.chdir(dir);
	cb();
}
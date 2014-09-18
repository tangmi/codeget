var configure = require('../configure');

var helper = require('./helper');
var fs = require('fs');
var path = require('path');

module.exports = function(reponame, cb) {
	if (!cb) throw new Error('no callback provided!');

	var repoDir = path.join(configure.CODE_DIR, 'localhost', reponame);

	require('mkdirp')(repoDir, function(err) {
		if (err) {
			return cb(err);
		}
		cb();
	});
}
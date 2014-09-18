var path = require('path');

var configure = require('../configure');

var git = require('./git');
var helper = require('./helper');

module.exports = function(repo, cb) {
	if (!cb) throw new Error('no callback provided!');

	var cloneDir = path.join(configure.CODE_DIR, path.join.apply(path.join, repo.path));

	git.clone(repo.url, cloneDir, function(code) {
		if (code != 0) {
			cb(new Error('git clone didn\'t complete successfully (code=' + code + ')'));
		} else {
			cb();
		}
	});
}
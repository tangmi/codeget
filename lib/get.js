var configure = require('../configure');

var git = require('./git');
var helper = require('./helper');

module.exports = function(repo, cb) {
	if (!cb) throw new Error('no callback provided!');

	var cloneDir = helper.getFilePathFromRepo(repo);

	git.clone(repo.url, cloneDir, function(code) {
		if (code != 0) {
			return cb(code);
		}
		cb();
	});
}
var cd = require('./cd');
var helper = require('./helper');

module.exports = function(repo, cb) {
	if (!cb) throw new Error('no callback provided!');

	var repoDir = helper.getFilePathFromRepo(repo);

	// TODO: is this impossible? changing the parent proc's dir?
	throw new Error('code go is likely impossible :(');

	cd(repoDir, function(err) {
		if (err) {
			return cb(err);
		}
		cb();
	});
}
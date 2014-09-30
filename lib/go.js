var cd = require('./cd');
var helper = require('./helper');

module.exports = function(repo, cb) {
	if (!cb) throw new Error('no callback provided!');

	var repoDirs = helper.getFilePathsFromShortTag(repo);

	if (repoDirs.length == 0) {
		return cb(new Error('no repos found! query=' + repo));
	}

	cb(null, repoDirs.sort(function(a, b) {
		return b.score - a.score;
	}));

	// var repoDir = helper.getFilePathFromRepo(repo);

	// // TODO: is this impossible? changing the parent proc's dir?
	// throw new Error('code go is likely impossible :(');

	// cd(repoDir, function(err) {
	// 	if (err) {
	// 		return cb(err);
	// 	}
	// 	cb();
	// });
}
var spawn = require('child_process').spawn;

require('shelljs/global');

module.exports = {
	clone: function(repourl, dir, cb) {
		if (!cb) throw new Error('no callback provided!');

		return spawn('git', ['clone', repourl, dir], {
			stdio: 'inherit',
		}).on('close', cb);;
	}
}
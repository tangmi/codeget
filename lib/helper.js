var path = require('path');
var configure = require('../configure');
var url = require('url');

module.exports = {
	getRepo: function(str) {
		str = str.trim();

		function getPath(repoUrl) {
			var path = url.parse(repoUrl).pathname.split('/');
			path.shift();
			path.push(path.pop().replace(/.git$/, ''));
			return path;
		}

		var repoUrl;

		if (/^[0-9a-zA-Z\-]+\/[0-9a-zA-Z\-\.]+$/.test(str)) {
			// checks if its a shortform github repo
			repoUrl = 'https://github.com/' + str + '.git';
			return {
				url: repoUrl,
				path: getPath(repoUrl)
			};
		}

		if (/^[0-9a-zA-Z\-\.]+@[0-9a-zA-Z\-\.]+:[0-9a-zA-Z\-\.]+/.test(str)) {
			// ssh mode
			var path = str.split(':')[1].split('/');
			path.push(path.pop().replace(/.git$/, ''));
			return {
				url: str,
				path: path
			};
		}

		if (/^[a-z]+:\/\/.*/.test(str)) {
			// checks if its a url
			return {
				url: str,
				path: getPath(str)
			};
		}

		throw new Error('could not figure out that repo url for ' + str);
	},
	getFilePathFromRepo: function(repo) {
		var repoUrl = repo.url;
		if(repoUrl.indexOf('@') != -1) {
			// TODO: kludge to make this work with ssh urls
			repoUrl = 'http://' + repo.url.substr(repo.url.indexOf('@') + 1);
		}
		return path.join(
			configure.CODE_DIR,
			url.parse(repoUrl).hostname,
			path.join.apply(
				path.join,
				repo.path));
	}
};
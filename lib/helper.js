module.exports = {
	getRepo: function(str) {
		str = str.trim();

		function getPath(repourl) {
			var url = require('url');
			var path = url.parse(repourl).pathname.split('/');
			path.shift();
			path.push(path.pop().replace(/.git$/, ''));
			return path;
		}

		var url;

		if (/^[0-9a-zA-Z\-]+\/[0-9a-zA-Z\-\.]+$/.test(str)) {
			// checks if its a shortform github repo
			url = 'https://github.com/' + str + '.git';
			return {
				url: url,
				path: getPath(url)
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
	}
};
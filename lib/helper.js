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

	// returns the file path from a string of form
	// username/repo
	// repo
	getFilePathsFromShortTag: function(shortTag) {
		/*
			alt idea:
			match shortTag (or simply, "tag") to all repo paths from 
			CODE_DIR + 3 levels

			(.. $CODE_DIR)/host/user/repo( ..)

			(use a special case for localhost, where it will only match two levels)

			1. get list of all paths
			2. match (decompose so i can drop in fuzzy searching later)
			3. return list of matches
		 */

		function getRepoPaths(root) {
			var allRepos = [];
			var fs = require('fs'),
				path = require('path');

			// TODO: refactor this
			var repos = (function getRepos(hosts) {
				hosts.forEach(function(host) {
					if (host == 'localhost') {
						var repos = fs.readdirSync(path.join(root, host));
						repos.filter(function filterRepos(repo) {
							return fs.statSync(path.join(root, host, repo)).isDirectory();
						}).forEach(function(repo) {
							allRepos.push([host, repo]);
						});
					} else {
						var users = fs.readdirSync(path.join(root, host));
						users.filter(function filterUsers(user) {
							return fs.statSync(path.join(root, host, user)).isDirectory();
						}).forEach(function(user) {
							var repos = fs.readdirSync(path.join(root, host, user));
							repos.filter(function filterRepos(repo) {
								return fs.statSync(path.join(root, host, user, repo)).isDirectory();
							}).forEach(function(repo) {
								allRepos.push([host, user, repo]);
							});
						});
					}
				});
			})((function getHosts() {
				return fs.readdirSync(root).filter(function filterHosts(host) {
					return fs.statSync(path.join(root, host)).isDirectory();
				});
			})());

			return allRepos;
		}

		var repos = getRepoPaths(configure.CODE_DIR).map(function(repoArray) {
			return repoArray.join('/');
		});

		// console.log(repos);

		var fuzzy = require('fuzzy');
		var results = fuzzy.filter(shortTag, repos);

		return results.map(function(el) {
			return {
				path: require('path').join(configure.CODE_DIR, el.string),
				score: el.score,
			}
		});
	},

	getFilePathFromRepo: function(repo) {
		var repoUrl = repo.url;
		if (repoUrl.indexOf('@') != -1) {
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

#!/usr/bin/env node

var path = require('path');

var helper = require('../lib/helper');
var configure = require('../configure');

if (/node$/.test(process.argv[0])) {
	process.argv.shift();
}

var program = process.argv[0],
	command = process.argv[1],
	arg = process.argv[2];

if (arg) {
	switch (command) {
		case 'get':
			var repo = helper.getRepo(arg);
			require('../lib/get')(repo, function(err) {
				console.log();

				if (err) {
					console.log('fatal: ' + err.message);
					return;
				}

				var cloneDir = path.join(configure.CODE_DIR, path.join.apply(path.join, repo.path));

				console.log('success: code get complete!');
				console.log('  => ' + cloneDir)
				console.log();
				console.log('type `code go ' + repo.path.join('/') + '` to enter repo');
			});
			break;
		case 'go':
			var repo = helper.getRepo(arg);
			require('../lib/go')(repo, function() {
				// TODO: print output for code go
			});
			break;
		case 'make':
			require('../lib/make')(reponame, function() {
				// TODO: print output for code make
			});
			break;
		default:
			printHelp();
			break;
	}
} else {
	printHelp();
}

function printHelp() {
	// TODO: write helpful help message
	console.log('help msg here lol');
}
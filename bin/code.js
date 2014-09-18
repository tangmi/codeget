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
					if (err == 128) {
						var cloneDir = helper.getFilePathFromRepo(repo);
						console.log('fatal: ' + 'repo already exists!');
						console.log('  => ' + cloneDir);
					} else {
						console.log('fatal: ' + 'git clone didn\'t complete successfully (code=' + err + ')');
					}
					return;
				}

				var cloneDir = helper.getFilePathFromRepo(repo);

				console.log('success: code get complete!');
				console.log('  => ' + cloneDir)
				// console.log();
				// console.log('type `code go ' + repo.path.join('/') + '` to enter repo');
			});
			break;
		case 'go':
			var repo = helper.getRepo(arg);
			require('../lib/go')(repo, function(err) {
				console.log();

				if (err) {
					console.log('fatal: ' + err.message);
					return;
				}

				var repoDir = helper.getFilePathFromRepo(repo);
				console.log('info: ' + 'changed directory');
				console.log('  => ' + repoDir)
			});
			break;
		case 'make':
			var reponame = arg;
			require('../lib/make')(reponame, function(err) {
				console.log();
				if (err) {
					console.log('fatal: ' + err.message);
					return;
				}

				var repoDir = path.join(configure.CODE_DIR, 'localhost', reponame);

				console.log('info: ' + 'make directory');
				console.log('  => ' + repoDir)
			});
			break;
		default:
			printHelp();
			break;
	}
} else {
	if (/^-v|--version$/.test(command)) {
		console.log(path.basename(program) + ' ' + require('../package.json').version);
	} else {
		printHelp();
	}
}

function printHelp() {
	console.log('Usage: %s <command> <repo>', path.basename(program));
	console.log();
	console.log('Commands:');
	// TODO: write helpful help message
	console.log('    get   ' + '');
	console.log('    go    ' + '');
	console.log('    make  ' + '');
}
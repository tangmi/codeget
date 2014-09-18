var assert = require('assert');

var helper = require('../lib/helper');

var input = [
	['tangmi/codeget', {
		url: 'https://github.com/tangmi/codeget.git',
		path: ['tangmi', 'codeget'],
	}],
	['https://github.com/tangmi/codeget.git', {
		url: 'https://github.com/tangmi/codeget.git',
		path: ['tangmi', 'codeget'],
	}],
	['git@github.com:tangmi/codeget.git', {
		url: 'git@github.com:tangmi/codeget.git',
		path: ['tangmi', 'codeget'],
	}],
	['http://unicodepizzaforyou.com/gitrepo.git', {
		url: 'http://unicodepizzaforyou.com/gitrepo.git',
		path: ['gitrepo']
	}]
];

for (var i = 0; i < input.length; i++) {
	console.log(i + ' input: ' + input[i][0] + '\n  expected: ' + JSON.stringify(input[i][1]));

	var actual = helper.getRepo(input[i][0]);
	var expected = input[i][1];

	assert.deepEqual(actual, expected);
}

assert.throws(function() {
	helper.getRepo('poop');
})
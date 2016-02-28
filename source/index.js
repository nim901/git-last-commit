var process = require('child_process');

function _command(command, callback) {
	process.exec(command, {cwd: __dirname}, function(err, stdout, stderr) {
		if (stdout === '') {
			callback('this does not look like a git repo');
			return;
		}

		if (stderr) { 
			callback(stderr);
			return;
		}

		callback(null, stdout.split('\n').join(','));
	});
}

var command = 
	'git log -1 --pretty=format:"%h"';

module.exports = {
	getLastCommit : function(callback) {
		_command(command, function(err, res) {
			if (err) {
				callback(err);
				return;
			}
			
			var a = res.split(',');

			var tags = [];
			if (a[a.length-1] !== '') {
				tags = a.slice(13 - a.length);
			}

			callback(null, {
				shortHash: a[0]
			});
		});
	}
};

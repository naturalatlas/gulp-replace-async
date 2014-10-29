var through = require('through2');
var gutil = require('gulp-util');
var asyncReplace = require('async-replace');
var PluginError = gutil.PluginError;
const PLUGIN_NAME = 'gulp-replace-async';

module.exports = function(pattern, replacer) {
	if (typeof pattern !== 'string' && !(pattern instanceof RegExp)) {
		throw new PluginError(PLUGIN_NAME, 'Pattern must be string or RegExp');
	} else if (!replacer) {
		throw new PluginError(PLUGIN_NAME, 'Missing callback');
	} else if (typeof replacer !== 'function') {
		throw new PluginError(PLUGIN_NAME, 'Callback must be a function');
	}

	return through.obj(function(file, enc, callback) {
		if (file.isStream()) {
			throw new PluginError(PLUGIN_NAME, 'Streams are not supported');
		} else if (file.isNull()) {
			return callback();
		}

		var contents = String(file.contents);
		asyncReplace(contents, pattern, function() {
			var callback = arguments[arguments.length - 1];
			var match = Array.prototype.slice.apply(arguments, [0, arguments.length - 1]);
			replacer(match, callback);
		}, function(err, result) {
			if (err) throw new PluginError(PLUGIN_NAME, 'Replacement failed "' + (err.message || err) + '"');
			file.contents = new Buffer(result);
			callback(null, file);
		});
	});
};
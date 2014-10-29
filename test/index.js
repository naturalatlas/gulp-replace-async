var fs = require('fs');
var gutil = require('gulp-util');
var assert = require('chai').assert;
var replacePlugin = require('../index.js');

describe('gulp-replace-async', function() {
	it('should replace occurrences (string pattern)', function(done) {
		var file = new gutil.File({
			path: 'test/fixtures/source.txt',
			cwd: 'test/',
			base: 'test/fixtures',
			contents: 'This is a test 1, 2, 3'
		});

		var stream = replacePlugin('1, 2, 3', function(match, callback) {
			setTimeout(function() {
				callback(null, '4, 5, 6');
			}, 0);
		});

		stream.on('data', function(file) {
			assert.equal(String(file.contents), 'This is a test 4, 5, 6');
			done();
		});

		stream.write(file);
		stream.end();
	});
	it('should replace occurrences (regex pattern)', function(done) {
		var file = new gutil.File({
			path: 'test/fixtures/source.txt',
			cwd: 'test/',
			base: 'test/fixtures',
			contents: 'This is a test 1, 2, 3'
		});

		var stream = replacePlugin(/,(\s)(\d+)/g, function(match, callback) {
			setTimeout(function() {
				callback(null, ',' + match[1] + (parseInt(match[2], 10) + 1));
			}, 0);
		});

		stream.on('data', function(file) {
			assert.equal(String(file.contents), 'This is a test 1, 3, 4');
			done();
		});

		stream.write(file);
		stream.end();
	});
});
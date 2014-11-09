# gulp-replace-async
[![NPM version](http://img.shields.io/npm/v/gulp-replace-async.svg)](https://www.npmjs.org/package/gulp-replace-async)
[![Installs](http://img.shields.io/npm/dm/gulp-replace-async.svg)](https://www.npmjs.org/package/gulp-replace-async)
[![Build Status](http://img.shields.io/travis/naturalatlas/gulp-replace-async/master.svg)](https://travis-ci.org/naturalatlas/gulp-replace-async)

```sh
$ npm install gulp-replace-async --save-dev
```

## Usage

```js
var replace = require('gulp-replace-async');

gulp.task('replace', function() {
    return gulp.src('index.html')
        .pipe(replace(/hello/i, function(match, callback) {
            callback(null, match[0].toUpperCase());
        })
        .pipe(gulp.dest('dist'));
});
```

## License

Copyright &copy; 2014 [Brian Reavis](https://github.com/brianreavis) & [Contributors](https://github.com/naturalatlas/gulp-replace-async/graphs/contributors)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at: http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

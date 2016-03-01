# gulp-css-sandbox
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]

> A plugin for [gulp](https://github.com/wearefractal/gulp) to sandbox css by prefixing rules with a selector

## Usage

First, install `gulp-css-sandbox` as a development dependency:

```shell
npm install --save-dev gulp-css-sandbox
```

Then, add it to your `gulpfile.js`:

```javascript
var css-sandbox = require("gulp-css-sandbox");

gulp.src("./src/*.css")
	.pipe(css-sandbox('#sandbox'))
	.pipe(gulp.dest("./dist"));
```

## API

### css-sandbox(prefix)

The prefix you want to attach to the css rules


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-css-sandbox
[npm-image]: https://badge.fury.io/js/gulp-css-sandbox.png

[travis-url]: http://travis-ci.org/beefo/gulp-css-sandbox
[travis-image]: https://secure.travis-ci.org/beefo/gulp-css-sandbox.png?branch=master

[coveralls-url]: https://coveralls.io/r/beefo/gulp-css-sandbox
[coveralls-image]: https://coveralls.io/repos/beefo/gulp-css-sandbox/badge.png

[depstat-url]: https://david-dm.org/beefo/gulp-css-sandbox
[depstat-image]: https://david-dm.org/beefo/gulp-css-sandbox.png

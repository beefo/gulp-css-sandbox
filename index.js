var through = require("through2"),
    gutil = require("gulp-util"),
    css = require("css");

module.exports = function (prefix) {
    "use strict";

    // if necessary check for required param(s), e.g. options hash, etc.
    if (!prefix) {
        throw new gutil.PluginError("gulp-css-sandbox", "No prefix supplied");
    }

    function cssPrefix(file, enc, callback) {
        /**
         * Parse css file string and add prefix to css styles
         * S
         * @param fileString {string} The css file string contents
         */
        var prefixFile = function (fileString) {
            /**
             * Recursivly add prefix to css rules
             * 
             * @param fileString {string} The css file string contents
             */
            var prefixRules = function (rules) {
                var i;
                for (i = 0; i < rules.length; i++) {
                    if (rules[i].rules) {
                        prefixRules(rules[i].rules);
                        continue;
                    }
                    if (!rules[i].selectors) {
                        continue;
                    }
                    rules[i].selectors = rules[i].selectors.map(function (selector) {
                        return prefix + ' ' + selector;
                    });
                }
            };

            var obj = css.parse(fileString);
            
            if (obj.stylesheet && obj.stylesheet.rules) {
                prefixRules(obj.stylesheet.rules);
            }
            
            return css.stringify(obj, {indent: '    '});
        }

        // Do nothing if no contents
        if (file.isNull()) {
            this.push(file);
            return callback();
        }

        if (file.isStream()) {
            // accepting streams is optional
            this.emit("error", new gutil.PluginError("gulp-css-sandbox", "Stream content is not supported"));
            return callback();
        }

        // check if file.contents is a `Buffer`
        if (file.isBuffer()) {
            
            file.contents = new Buffer(prefixFile(String(file.contents)));

            this.push(file);

        }
        return callback();
    }

    return through.obj(cssPrefix);
};

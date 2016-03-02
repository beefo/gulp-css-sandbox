/*global describe, it*/
"use strict";

var fs = require("fs"),
    es = require("event-stream"),
    should = require("should");

require("mocha");

delete require.cache[require.resolve("../")];

var gutil = require("gulp-util"),
    cssSandbox = require("../");

describe("gulp-css-sandbox", function () {

    var expectedFile = new gutil.File({
        path: "test/expected/styles.css",
        cwd: "test/",
        base: "test/expected",
        contents: fs.readFileSync("test/expected/styles.css")
    });

    it("should produce expected file via buffer", function (done) {

        var srcFile = new gutil.File({
            path: "test/fixtures/styles.css",
            cwd: "test/",
            base: "test/fixtures",
            contents: fs.readFileSync("test/fixtures/styles.css")
        });

        var stream = cssSandbox("#foo");

        stream.on("error", function (err) {
            should.exist(err);
            done(err);
        });

        stream.on("data", function (newFile) {

            should.exist(newFile);
            should.exist(newFile.contents);

            String(newFile.contents).should.equal(String(expectedFile.contents));
            done();
        });

        stream.write(srcFile);
        stream.end();
    });

    it("should error on stream", function (done) {

        var srcFile = new gutil.File({
            path: "test/fixtures/styles.css",
            cwd: "test/",
            base: "test/fixtures",
            contents: fs.createReadStream("test/fixtures/styles.css")
        });

        var stream = cssSandbox("#foo");

        stream.on("error", function (err) {
            should.exist(err);
            done();
        });

        stream.on("data", function (newFile) {
            newFile.contents.pipe(es.wait(function (err, data) {
                done(err);
            }));
        });

        stream.write(srcFile);
        stream.end();
    });
    
    it("should error without params", function (done) {

        should.throws(cssSandbox);
        done();

    });
    
    it("should pass through null file", function (done) {

        var srcFile = new gutil.File({
            path: "test/foo.css",
            cwd: "test/",
            base: "test/",
            contents: null
        });

        var stream = cssSandbox("#foo");

        stream.on("error", function (err) {
            should.exist(err);
            done();
        });

        stream.on("data", function (newFile) {
            should.equal(true, newFile.isNull());
            done();
        });

        stream.write(srcFile);
        stream.end();
    });

});

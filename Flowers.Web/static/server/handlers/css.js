'use strict';

const fs = require("fs"),
    sass = require('node-sass'),
    autoprefixer = require('autoprefixer'),
    postcss = require('postcss')
    ;

module.exports = function (filePath, res, next) {

    if (filePath.indexOf('.css') === -1) {
        return next();
    }

    fs.readFile(filePath, "binary", function (err, file) {

        if (err) {

            filePath = filePath.replace('.css', '.scss');

            fs.readFile(filePath, "binary", function (err, file) {

                if (err) {
                    res.writeHead(500, {"Content-Type": "text/plain"});
                    res.write(err + "\n");
                    res.end();
                    return;
                }

                sass.render({
                    file: filePath
                }, function (err, result) {

                    if (err) {
                        res.writeHead(500, {"Content-Type": "text/plain"});
                        res.write(err + "\n");
                        res.end();
                        return;
                    }

                    postcss([
                        autoprefixer({
                            browsers: [
                                'IE 10',
                                'Safari 7',
                                'IOS 6'
                            ]
                        })
                    ]).process(result.css)
                        .then(function (result) {
                            result.warnings().forEach(function (warn) {
                                console.warn(warn.toString());
                            });
                            //console.log(result.css);

                            res.writeHead(200,
                                {
                                    'Content-Type': 'text/css'
                                });
                            res.write(result.css, "binary");
                            res.end();
                        });

                });

            });

            return;
        }

        res.writeHead(200,
            {
                'Content-Type': 'text/css'
            });
        res.write(file, "binary");
        res.end();

    });

};

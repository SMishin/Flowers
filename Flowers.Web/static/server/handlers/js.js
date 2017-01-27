
'use strict';

let fs = require("fs"),
    babel = require("babel-core")
    ;

let babelOps = require('../../package.json').babel;
 babelOps.presets[0] = 'es2016';

if(babelOps.plugins.indexOf('transform-es2015-modules-systemjs') === -1) {
    babelOps.plugins.push('transform-es2015-modules-systemjs');
}

module.exports = function (filePath, res, next) {

    if(filePath.indexOf('.js') === -1)
    {
      return  next();
    }

    function needTransform(filename) {

        if(filename.indexOf('\\systemjs.config.js') !== -1) {
            return false;
        }

        return filename.indexOf('\\static\\app') !== -1;

    }

    fs.readFile(filePath, "binary", function (err, file) {

        if (err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.write(err + "\n");
            res.end();
            return;
        }

        var code = file;

        if (needTransform(filePath)) {
            //babelOps.sourceMaps = true;
            code = babel.transform(file, babelOps).code;
        }

        res.writeHead(200,
            {
                'Content-Type': 'application/javascript'
            });
        res.write(code, "binary");
        res.end();
    });

};

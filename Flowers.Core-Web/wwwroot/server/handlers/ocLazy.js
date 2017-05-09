
'use strict';

var fs = require("fs"),
    babel = require("babel-core"),
    requireJson = require('../../_libs/require-json')
    ;


var babelOps = require('../../package.json').babel;
if(babelOps.plugins.indexOf('transform-es2015-modules-systemjs') === -1) {
    babelOps.plugins.push('transform-es2015-modules-systemjs');
}

module.exports = function (filePath, res, next) {

    "use strict";

    const aofPath = '../src/aof/scripts/',
        rootComponentsSrc = aofPath + 'components/'
        ;

    var appConfig = requireJson(aofPath + 'config.json'),
        appConfigLazy = appConfig['components']['lazy'],
        header = 'function config($ocLazyLoadProvider){$ocLazyLoadProvider.config(<config>);}export default config;',
        componentConfig,
        config = {modules: []};

    if (!appConfigLazy || appConfigLazy.length == 0) {
        return;
    }

    appConfigLazy.forEach(function (cName) {

        var componentConfigFile = rootComponentsSrc + cName + '/config.json';

        componentConfig = requireJson(componentConfigFile);

        if (!componentConfig) {
            return;
        }

        config.modules.push({
            name: componentConfig.name,
            files: componentConfig['files']['debug'].map(file => file + '?<version>')
        });

    });

    var configFile = header.replace("<config>", JSON.stringify(config).replace(/<version>"/g,'v="'+'+window.app.version'));

    var code = babel.transform(configFile, babelOps).code;


    res.writeHead(200,
        {
            'Content-Type': 'application/javascript'
        });
    res.write(code, "binary");
    res.end();
return;

};

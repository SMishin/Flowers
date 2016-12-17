var express = require('express'),
    path = require('path'),
    fileHandler = require('./handleFile')
    ;
var app = express();

var root = path.resolveURL(__dirname,'../');

app.get('*.css', fileHandler(root, require('./handlers/css')));

app.listen(process.env.PORT || 8888);
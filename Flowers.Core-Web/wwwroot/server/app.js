var express = require('express'),
    path = require('path'),
    fileHandler = require('./handleFile')
    ;
var app = express();

var root = path.resolve(__dirname,'../');

app.get('*.css', fileHandler(root, require('./handlers/css')));
app.get(/.*.jsx?/, fileHandler(root, require('./handlers/js')));

app.listen(process.env.PORT || 8888);
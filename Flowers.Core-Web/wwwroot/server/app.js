var //express = require('express'),
    path = require('path')
    //fileHandler = require('./handleFile')
    ;
// var app = express();
//
// var root = path.resolve(__dirname,'../');
//
// app.get('*.css', fileHandler(root, require('./handlers/css')));
// app.get(/.*.jsx?/, fileHandler(root, require('./handlers/js')));
//
// app.listen(process.env.PORT || 8888);


let jsConvert = require('./handlers/js-convert');
let root =  path.resolve(__dirname,'../');


function precess(callback, filePath) {
	jsConvert(callback, (root + filePath).replace('/','\\'));
}
// precess(function () {
//
// },'/app/public/app.js');

module.exports = precess;



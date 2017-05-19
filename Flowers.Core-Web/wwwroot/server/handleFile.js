/*!
 * serve-static
 * Copyright(c) 2010 Sencha Inc.
 * Copyright(c) 2011 TJ Holowaychuk
 * Copyright(c) 2014-2016 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

var parseUrl = require('parseurl'),
    path = require('path')
    ;

var resolve = path.resolve;
var send = require('send');
var url = require('url');

/**
 * Module exports.
 * @public
 */

module.exports = serveStatic;
module.exports.mime = send.mime;

/**
 * @param {string} root
 * @param {object} [options]
 * @return {function}
 * @public
 */

function serveStatic(root, hanler) {
    if (!root) {
        throw new TypeError('root path required')
    }

    if (typeof root !== 'string') {
        throw new TypeError('root path must be a string')
    }

    // copy options object
    var opts = Object.create(null);

    // fall-though
    var fallthrough = opts.fallthrough !== false;

    // headers listener
    var setHeaders = opts.setHeaders;

    if (setHeaders && typeof setHeaders !== 'function') {
        throw new TypeError('option setHeaders must be function')
    }

    // setup options for send
    opts.maxage = opts.maxage || opts.maxAge || 0;
    opts.root = resolve(root);

    return function serveStatic(req, res, next) {
        if (req.method !== 'GET' && req.method !== 'HEAD') {
            if (fallthrough) {
                return next()
            }

            // method not allowed
            res.statusCode = 405;
            res.setHeader('Allow', 'GET, HEAD');
            res.setHeader('Content-Length', '0');
            res.end();
            return;
        }

        var originalUrl = parseUrl.original(req);
        var arr1 = root.split(path.sep);
        var arr2 = originalUrl.pathname.split('/');
        var arr3 = [...new Set([...arr1 ,...arr2])];//merge arrays
        var filePath = path.join.apply(null,arr3);

        // make sure redirect occurs at mount
        if (filePath === '/' && originalUrl.pathname.substr(-1) !== '/') {
            filePath = ''
        }

        hanler(filePath, res, next);

    }
}

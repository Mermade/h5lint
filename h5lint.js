'use strict';
var fs = require('fs');
var linter = require('./index.js');

if (process.argv.length <= 2) {
    console.log('Usage: node h5lint {filename}')
}
else {
    var filename = process.argv[2];
    fs.readFile(filename, 'utf8', function(err, s) {
        linter.lintStr(s);
    });
}
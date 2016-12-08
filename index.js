/*jslint
    node: true
*/
'use strict';

var Promise     = require('promise');
var fs          = require('fs');

var writePid = function(pidFile) {
    var promise = new Promise(function (resolve, reject) {
        var options = {
            mode: parseInt('0644',8)
        };
        fs.writeFile(pidFile, process.pid, options, function (err) {
            if (!err) {
                resolve(1);
            }
            else {
                console.log('Could not write pid file');
                process.exit(1);
            }
        });
    });
    return promise;
};

var readPid = function(pidFile) {
    var promise = new Promise(function (resolve, reject) {
        fs.readFile(pidFile, function (err, data) {
            if (!err) {
                resolve(data);
            }
            else {
                console.log('Could not read pid file');
                process.exit(1);
            }
        });
    });
    return promise;
};

var deletePid = function(pidFile) {
    fs.unlinkSync(pidFile);
};

module.exports = {
    writePid:writePid,
    readPid:readPid,
    deletePid:deletePid
};

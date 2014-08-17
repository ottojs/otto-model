
'use strict';

// Modules
var async = require('async');
var start = require('./method.start.js');
var end   = require('./method.end.js');

module.exports = function (middleware) {

  return function (parameters, callback) {

    // Assemble the waterfall
    var stack = [];
    stack.push(start(parameters));
    middleware.forEach(function (middleware) {
      stack.push(middleware);
    });
    stack.push(end);

    async.waterfall(stack, callback);

  };

};

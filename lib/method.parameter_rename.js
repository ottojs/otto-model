
'use strict';

module.exports = function (from, to) {
  return function (parameters, object, callback) {
    if (parameters[from] !== undefined) {
      parameters[to] = parameters[from];
      delete parameters[from];
    }
    return callback(null, parameters, object);
  };
};

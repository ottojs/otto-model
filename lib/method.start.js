
'use strict';

module.exports = function (parameters) {
  return function (next) {
    return next(null, parameters, null);
  };
};

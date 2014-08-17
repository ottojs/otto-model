
'use strict';

// Modules
var ErrorBadRequest = require('otto-errors').ErrorBadRequest;

// Temp Error (upgrading otto-errors soon to support this)
function errorx (resource, reason, data, message) {

  var error_object = new ErrorBadRequest(message);

  error_object.resource = resource;
  error_object.reason   = reason;

  if (data) {
    error_object.data = data;
  }

  return error_object;

}

module.exports = function (resource, p, options) {

  if (!options) { options = {}; }

  return function (parameters, object, callback) {

    if (parameters[p] === undefined) {
      if (options.default) {
        parameters[p] = options.default;
      } else {
        return callback(errorx(resource, 'parameter_required', p));
      }
    }

    if (parameters[p] === null) {
      if (options.optional !== true) {
        return callback(errorx(resource, 'parameter_required', p));
      }
    }

    // Default type check is String
    if (!options.type) {
      if (parameters[p] !== null) {
        options.type = 'string';
      }
    }

    // Number
    if (options.type === 'number') {

      if (typeof parameters[p] !== 'number') {
        return callback(errorx(resource, 'parameter_invalid', p));
      }

      if (options.integer === true) {
        if (parameters[p] !== Math.floor(parameters[p])) {
          return callback(errorx(resource, 'parameter_invalid', p));
        }
      }

      if (options.minimum) {
        if (parameters[p] < options.minimum) {
          return callback(errorx(resource, 'parameter_invalid', p));
        }
      }

      if (options.maximum) {
        if (parameters[p] > options.maximum) {
          return callback(errorx(resource, 'parameter_invalid', p));
        }
      }

    }

    // String
    if (options.type === 'string') {

      if (parameters[p].length === 0) {
        return callback(errorx(resource, 'parameter_invalid', p));
      }

      if (options && options.length) {
        if (parameters[p].length !== options.length) {
          return callback(errorx(resource, 'parameter_invalid', p));
        }
      }

    }

    return callback(null, parameters, object);

  };

};

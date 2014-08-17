
'use strict';

// TODO: Implement this middleware
// .parameter('email').lowercase()
// .parameter('id').required({ length : 32 });

// Exports
module.exports = {
  chain              : require('./method.chain.js'),
  parameter_rename   : require('./method.parameter_rename.js'),
  parameter_validate : require('./method.parameter_validate.js')
};

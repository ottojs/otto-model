
'use strict';

// Modules
require('should');

// Subject
var subject = require('../../lib/method.chain.js');

describe('.chain()', function () {

  it('should assemble the middleware and take parameters and a callback', function (done) {

    var chain = subject([
      function (parameters, object, next) {
        parameters.should.have.property('id').and.equal('abc123');
        object = { data : 'dynamic' };
        next(null, parameters, object);
      }
    ]);

    chain({ id : 'abc123' }, function (error, output) {
      (error === null).should.equal(true);
      output.should.have.property('data').and.equal('dynamic');
      done();
    });

  });

});

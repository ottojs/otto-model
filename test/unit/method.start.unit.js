
'use strict';

// Modules
require('should');

// Subject
var subject = require('../../lib/method.start.js');

describe('.start()', function () {

  it('should pass properties to the returned middleware', function () {
    var middleware = subject({ key : 'value' });
    middleware(function (error, properties, object) {
      (error === null).should.equal(true);
      properties.should.have.property('key').and.equal('value');
      (object === null).should.equal(true);
    });
  });

});

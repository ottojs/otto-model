
'use strict';

// Modules
require('should');

// Subject
var subject = require('../../lib/method.end.js');

describe('.end()', function () {

  it('should return the object passed to the middleware', function () {
    subject({}, { key : 'value' }, function (error, object) {
      (error === null).should.equal(true);
      object.should.have.property('key').and.equal('value');
    });
  });

});

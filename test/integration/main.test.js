
'use strict';

// Modules
require('should');

// Subject
var subject = require('../../lib/index.js');

describe('Module', function () {

  it('should have method .chain()', function () {
    subject.should.have.property('chain').and.be.type('function');
  });

  it('should have method .parameter_rename()', function () {
    subject.should.have.property('parameter_rename').and.be.type('function');
  });

  it('should have method .parameter_validate()', function () {
    subject.should.have.property('parameter_validate').and.be.type('function');
  });

});

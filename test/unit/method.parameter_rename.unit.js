
'use strict';

// Modules
require('should');

// Subject
var subject = require('../../lib/method.parameter_rename.js');

describe('.parameter_rename()', function () {

  it('should ignore undefined properties', function () {
    var middleware = subject('key1', 'key2');
    middleware({ other : 'value' }, {}, function (error, parameters) {
      (error === null).should.equal(true);
      parameters.should.have.property('other').and.equal('value');
    });
  });

  it('should return an object with the renamed property as the same value', function () {
    var middleware = subject('key1', 'key2');
    middleware({ key1 : 'value1' }, {}, function (error, parameters) {
      (error === null).should.equal(true);
      parameters.should.have.property('key2').and.equal('value1');
    });
  });

  it('should not contain the old property', function () {
    var middleware = subject('key1', 'key2');
    middleware({ key1 : 'value1' }, {}, function (error, parameters) {
      (error === null).should.equal(true);
      parameters.should.not.have.property('key1');
    });
  });

  it('should overwrite the renamed property if it is already present', function () {
    var middleware = subject('key1', 'key2');
    middleware({ key1 : 'value1', key2 : 'value2' }, {}, function (error, parameters) {
      (error === null).should.equal(true);
      parameters.should.have.property('key2').and.equal('value1');
    });
  });

});

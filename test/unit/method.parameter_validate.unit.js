
'use strict';

// Modules
require('should');

// Subject
var subject = require('../../lib/method.parameter_validate.js');

describe('.parameter_validate()', function () {

  describe('default', function () {

    it('should return an error when the parameter value is undefined', function () {
      var middleware = subject('resource', 'key');
      middleware({}, {}, function (error) {
        error.should.be.type('object');
        error.should.have.property('type').and.equal('client');
        error.should.have.property('name').and.equal('ErrorBadRequest');
        error.should.have.property('resource').and.equal('resource');
        error.should.have.property('reason').and.equal('parameter_required');
        error.should.have.property('data').and.equal('key');
      });
    });

    it('should return an error when the parameter value is null', function () {
      var middleware = subject('resource', 'key');
      middleware({ key : null }, {}, function (error) {
        error.should.be.type('object');
        error.should.have.property('type').and.equal('client');
        error.should.have.property('name').and.equal('ErrorBadRequest');
        error.should.have.property('resource').and.equal('resource');
        error.should.have.property('reason').and.equal('parameter_required');
        error.should.have.property('data').and.equal('key');
      });
    });

    it('should return an error when the parameter value has a length of 0', function () {
      var middleware = subject('resource', 'key');
      middleware({ key : '' }, {}, function (error) {
        error.should.be.type('object');
        error.should.have.property('type').and.equal('client');
        error.should.have.property('name').and.equal('ErrorBadRequest');
        error.should.have.property('resource').and.equal('resource');
        error.should.have.property('reason').and.equal('parameter_invalid');
        error.should.have.property('data').and.equal('key');
      });
    });

    it('should continue when the parameter is provided and 1+ characters', function () {
      var middleware = subject('resource', 'key');
      middleware({ key : 'value' }, { id : 'someid' }, function (error, parameters, object) {
        (error === null).should.equal(true);
        parameters.should.eql({ key : 'value' });
        object.should.eql({ id : 'someid' });
      });
    });

    it('should continue when the parameter is not provided but a default is specified', function () {
      var middleware = subject('resource', 'key', { default : 'supercool' } );
      middleware({}, { id : 'someid' }, function (error, parameters, object) {
        (error === null).should.equal(true);
        parameters.should.eql({ key : 'supercool' });
        object.should.eql({ id : 'someid' });
      });
    });

  });

  describe('optional', function () {

    it('should continue when the parameter is not provided and but declared optional', function () {
      var middleware = subject('resource', 'key', { optional : true });
      middleware({ key : null }, { id : 'someid' }, function (error, parameters, object) {
        (error === null).should.equal(true);
        parameters.should.eql({ key : null });
        object.should.eql({ id : 'someid' });
      });
    });

  });

  describe('with length', function () {

    it('should return an error when the length does not match the expected length', function () {
      var middleware = subject('resource', 'key', { length : 10 });
      middleware({ key : '12345' }, {}, function (error) {
        error.should.be.type('object');
        error.should.have.property('type').and.equal('client');
        error.should.have.property('name').and.equal('ErrorBadRequest');
        error.should.have.property('resource').and.equal('resource');
        error.should.have.property('reason').and.equal('parameter_invalid');
        error.should.have.property('data').and.equal('key');
      });
    });

    it('should continue when the parameter is provided is the specified length', function () {
      var middleware = subject('resource', 'key', { length : 10 });
      middleware({ key : '1234567890' }, { id : 'someid' }, function (error, parameters, object) {
        (error === null).should.equal(true);
        parameters.should.eql({ key : '1234567890' });
        object.should.eql({ id : 'someid' });
      });
    });

  });

  describe('numbers', function () {

    it('should return an error when the parameter is not a number', function () {
      var middleware = subject('resource', 'key', { type : 'number' });
      middleware({ key : 'string' }, {}, function (error) {
        error.should.be.type('object');
        error.should.have.property('type').and.equal('client');
        error.should.have.property('name').and.equal('ErrorBadRequest');
        error.should.have.property('resource').and.equal('resource');
        error.should.have.property('reason').and.equal('parameter_invalid');
        error.should.have.property('data').and.equal('key');
      });
    });

  });

  describe('integers', function () {

    it('should return an error when the parameter is not an integer', function () {
      var middleware = subject('resource', 'key', { type : 'number', integer : true });
      middleware({ key : 1.25 }, {}, function (error) {
        error.should.be.type('object');
        error.should.have.property('type').and.equal('client');
        error.should.have.property('name').and.equal('ErrorBadRequest');
        error.should.have.property('resource').and.equal('resource');
        error.should.have.property('reason').and.equal('parameter_invalid');
        error.should.have.property('data').and.equal('key');
      });
    });

    it('should continue when the parameter is an integer', function () {
      var middleware = subject('resource', 'key', { type : 'number', integer : true });
      middleware({ key : 100 }, { id : 'someid' }, function (error, parameters, object) {
        (error === null).should.equal(true);
        parameters.should.eql({ key : 100 });
        object.should.eql({ id : 'someid' });
      });
    });

  });

  describe('minimum', function () {

    it('should return an error when the parameter is below the minimum', function () {
      var middleware = subject('resource', 'key', { type : 'number', minimum : 25 });
      middleware({ key : 10 }, {}, function (error) {
        error.should.be.type('object');
        error.should.have.property('type').and.equal('client');
        error.should.have.property('name').and.equal('ErrorBadRequest');
        error.should.have.property('resource').and.equal('resource');
        error.should.have.property('reason').and.equal('parameter_invalid');
        error.should.have.property('data').and.equal('key');
      });
    });

    it('should continue when the parameter is at the minimum', function () {
      var middleware = subject('resource', 'key', { type : 'number', minimum : 25 });
      middleware({ key : 25 }, { id : 'someid' }, function (error, parameters, object) {
        (error === null).should.equal(true);
        parameters.should.eql({ key : 25 });
        object.should.eql({ id : 'someid' });
      });
    });

    it('should continue when the parameter is at the minimum', function () {
      var middleware = subject('resource', 'key', { type : 'number', minimum : 25 });
      middleware({ key : 30 }, { id : 'someid' }, function (error, parameters, object) {
        (error === null).should.equal(true);
        parameters.should.eql({ key : 30 });
        object.should.eql({ id : 'someid' });
      });
    });

  });

  describe('maximum', function () {

    it('should return an error when the parameter is above the maximum', function () {
      var middleware = subject('resource', 'key', { type : 'number', maximum : 25 });
      middleware({ key : 30 }, {}, function (error) {
        error.should.be.type('object');
        error.should.have.property('type').and.equal('client');
        error.should.have.property('name').and.equal('ErrorBadRequest');
        error.should.have.property('resource').and.equal('resource');
        error.should.have.property('reason').and.equal('parameter_invalid');
        error.should.have.property('data').and.equal('key');
      });
    });

    it('should continue when the parameter is at the maximum', function () {
      var middleware = subject('resource', 'key', { type : 'number', maximum : 25 });
      middleware({ key : 25 }, { id : 'someid' }, function (error, parameters, object) {
        (error === null).should.equal(true);
        parameters.should.eql({ key : 25 });
        object.should.eql({ id : 'someid' });
      });
    });

    it('should continue when the parameter is below the maximum', function () {
      var middleware = subject('resource', 'key', { type : 'number', maximum : 25 });
      middleware({ key : 20 }, { id : 'someid' }, function (error, parameters, object) {
        (error === null).should.equal(true);
        parameters.should.eql({ key : 20 });
        object.should.eql({ id : 'someid' });
      });
    });

  });

});

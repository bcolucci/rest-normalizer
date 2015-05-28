/**
 * Created by bcolucci on 1/5/15.
 */
'use strict';

var assert = require('assert'),
  rest = require(__dirname + '/..'),
  error = rest.error;

describe('error', function () {

  it('should have a BuildError', function () {
    assert.strictEqual('RestError occurred', new error.BuildError().getMessage());
    assert.strictEqual('error message', new error.BuildError('error message').getMessage());
  });

  it('should have a ParseError', function () {
    assert.strictEqual('RestError occurred', new error.ParseError().getMessage());
    assert.strictEqual('error message', new error.ParseError('error message').getMessage());
  });

});
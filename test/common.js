/**
 * Created by bcolucci on 1/5/15.
 */
'use strict';

var assert = require('assert'),
  rest = require(__dirname + '/..'),
  common = rest.common;

describe('common', function () {

  describe('Data', function () {

    it('should have items', function () {
      var data = new common.Data();
      assert.strictEqual(0, data.getItems().length);

      data.getItems().push(42);
      assert.strictEqual(1, data.getItems().length);

      assert.strictEqual(data.getItems().length, data.getTotalItems());
    });

  });

  describe('Parameter', function () {

    it('should have an id and and values', function () {
      var parameter = new common.Parameter('name', 'john');
      assert.strictEqual('name', parameter.getId());
      assert.strictEqual('john', parameter.getValues().shift());

      parameter = new common.Parameter('name');
      parameter.addValue({test: true}); // must serialize none string
      assert.deepEqual(["[object Object]"], parameter.getValues());
    });

  });

  describe('Error', function () {

    it('should have a message, a reason and a location', function () {
      var error = new common.Error('error message', 'InvalidUsername', 'username');
      assert.strictEqual('error message', error.getMessage());
      assert.strictEqual('InvalidUsername', error.getReason());
      assert.strictEqual('username', error.getLocation());

      error = new common.Error('error message', 'InvalidUsername');
      assert.strictEqual(null, error.getLocation());
    });

    it('should require a message', function () {
      assert.throws(function () {
        new common.Error();
      });
    });

    it('should require a reason', function () {
      assert.throws(function () {
        new common.Error('error message');
      });
    });

  });

});
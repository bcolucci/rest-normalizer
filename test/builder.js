/**
 * Created by bcolucci on 1/5/15.
 */
'use strict';

var assert = require('assert'),
  rest = require(__dirname + '/..'),
  http = rest.http,
  common = rest.common,
  builder = rest.builder;

describe('builder', function () {

  it('should have an API version', function () {
    var successBuilder = new builder.SuccessResponseBuilder('1.2', http.Method.GET());
    assert.strictEqual('1.2', successBuilder.getApiVersion());
  });

  it('should have an Http method', function () {
    var successBuilder = new builder.SuccessResponseBuilder('1.2', http.Method.GET());
    assert.strictEqual(http.Method.GET().getValue(), successBuilder.getHttpMethod().getValue());
  });

  describe('Success', function () {

    it('should throw error if invalid item added', function () {
      var successBuilder = new builder.SuccessResponseBuilder('1.2', http.Method.GET());
      assert.throws(function () {
        successBuilder.addItem(42);
      });
    });

    it('should build a jsonify object', function () {
      var successBuilder = new builder.SuccessResponseBuilder('1.2', http.Method.GET());
      successBuilder
        .addParameter(new common.Parameter('ids', 1, 2).addValue(3))
        .addItem({field: 36})
        .addItem({field: 42})
        .addItems([
          {field: 1},
          {field: 2}
        ]);
      assert.strictEqual(
        '{"apiVersion":"1.2","method":"GET","params":{"ids":[1,2,3]},"data":{"items":[{"field":36},{"field":42},{"field":1},{"field":2}],"totalItems":4}}',
        JSON.stringify(successBuilder.build())
      );
      assert.strictEqual(1, successBuilder.getParameters().length);

      successBuilder = new builder.SuccessResponseBuilder('1.2', http.Method.GET());
      successBuilder.addParameters([
        new common.Parameter('ids', 1, 2),
        new common.Parameter('name', 'john')
      ]);
      assert.strictEqual(
        '{"apiVersion":"1.2","method":"GET","params":{"ids":[1,2],"name":"john"},"data":{"items":[],"totalItems":0}}',
        JSON.stringify(successBuilder.build())
      );
    });

  });

  describe('Error', function () {

    it('should throw error if invalid error code', function () {
      assert.throws(function () {
        new builder.ErrorResponseBuilder('1.2', http.Method.GET());
      });
    });

    it('should throw error if no error added', function () {
      assert.throws(function () {
        var errorBuilder = new builder.ErrorResponseBuilder('1.2', http.Method.GET(), 400);
        errorBuilder.build();
      });
    });

    it('should build a jsonify object', function () {
      var errorBuilder = new builder.ErrorResponseBuilder('1.2', http.Method.GET(), 400);
      errorBuilder
        .addParameter(new common.Parameter('ids', 1, 2).addValue(3))
        .addParameters([
          new common.Parameter('name', 'john'),
          new common.Parameter('age', 42)
        ])
        .addError(new common.Error('m1', 'r1', 'l1'))
        .addErrors([
          new common.Error('m2', 'r2', 'l2'),
          new common.Error('m3', 'r3', 'l3')
        ]);
      assert.strictEqual(
        '{"apiVersion":"1.2","method":"GET","params":{"ids":[1,2,3],"name":"john","age":42},"code":400,"message":"m1","errors":[{"message":"m1","reason":"r1","location":"l1"},{"message":"m2","reason":"r2","location":"l2"},{"message":"m3","reason":"r3","location":"l3"}]}',
        JSON.stringify(errorBuilder.build())
      );
    });

  });

});
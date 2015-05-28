/**
 * Created by bcolucci on 1/5/15.
 */
'use strict';

var assert = require('assert'),
  rest = require(__dirname + '/..'),
  http = rest.http;

describe('http', function () {

  describe('Method', function () {

    it('should have available methods list', function () {
      var methods = http.Method.getAvailableMethods();
      assert.strictEqual('[object Array]', Object.prototype.toString.apply(methods));
    });

    it('should have a valueOf method', function () {
      assert.deepEqual(http.Method.GET(), http.Method.valueOf('GET'));
      assert.strictEqual(null, http.Method.valueOf('yolo'));
    });

    it('should have a value', function () {
      assert.strictEqual(http.Method.C_HEAD, http.Method.HEAD().getValue());
      assert.strictEqual(http.Method.C_GET, http.Method.GET().getValue());
      assert.strictEqual(http.Method.C_POST, http.Method.POST().getValue());
      assert.strictEqual(http.Method.C_PUT, http.Method.PUT().getValue());
      assert.strictEqual(http.Method.C_PATCH, http.Method.PATCH().getValue());
      assert.strictEqual(http.Method.C_DELETE, http.Method.DELETE().getValue());
    });

  });

  describe('Code', function () {

    it('should have a value', function () {
      assert.strictEqual(200, new http.SuccessCode(200).getValue());
    });

    it('should have a valueOf method', function () {
      assert.deepEqual(new http.SuccessCode(200), http.Code.valueOf(200));
      assert.deepEqual(new http.ErrorCode(400), http.Code.valueOf(400));
      assert.strictEqual(null, http.Code.valueOf(800));
    });

    it('should have a valid success code', function () {
      new http.SuccessCode(200);
      assert.throws(function () {
        new http.SuccessCode(800);
      });
    });

    it('should have a valid error code', function () {
      new http.ErrorCode(400);
      assert.throws(function () {
        new http.ErrorCode(200);
      });
    });

  });

});
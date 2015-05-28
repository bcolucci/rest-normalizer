/**
 * Created by bcolucci on 1/2/15.
 */
'use strict';
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var http;
(function (http) {
    var Method = (function () {
        function Method(value) {
            this.value = value;
        }
        Method.prototype.getValue = function () {
            return this.value;
        };
        Method.getAvailableMethods = function () {
            return [
                Method.C_HEAD,
                Method.C_GET,
                Method.C_POST,
                Method.C_PUT,
                Method.C_PATCH,
                Method.C_DELETE
            ];
        };
        Method.valueOf = function (value) {
            value = value.trim().toUpperCase();
            var methods = Method.getAvailableMethods();
            if (methods.indexOf(value) <= 0) {
                return null;
            }
            return new Method(value);
        };
        Method.HEAD = function () {
            return new Method(Method.C_HEAD);
        };
        Method.GET = function () {
            return new Method(Method.C_GET);
        };
        Method.POST = function () {
            return new Method(Method.C_POST);
        };
        Method.PUT = function () {
            return new Method(Method.C_PUT);
        };
        Method.PATCH = function () {
            return new Method(Method.C_PATCH);
        };
        Method.DELETE = function () {
            return new Method(Method.C_DELETE);
        };
        Method.C_HEAD = 'HEAD';
        Method.C_GET = 'GET';
        Method.C_POST = 'POST';
        Method.C_PUT = 'PUT';
        Method.C_PATCH = 'PATCH';
        Method.C_DELETE = 'DELETE';
        return Method;
    })();
    http.Method = Method;
    var Code = (function () {
        function Code(value) {
            this.value = value;
        }
        Code.prototype.getValue = function () {
            return this.value;
        };
        Code.valueOf = function (value) {
            if (SuccessCode.isValidCode(value)) {
                return new SuccessCode(value);
            }
            else if (ErrorCode.isValidCode(value)) {
                return new ErrorCode(value);
            }
            return null;
        };
        return Code;
    })();
    http.Code = Code;
    var SuccessCode = (function (_super) {
        __extends(SuccessCode, _super);
        function SuccessCode(value) {
            if (!SuccessCode.isValidCode(value)) {
                throw new Error('Invalid Http Success Code');
            }
            _super.call(this, value);
        }
        SuccessCode.isValidCode = function (code) {
            return code >= 100 && code <= 305;
        };
        return SuccessCode;
    })(Code);
    http.SuccessCode = SuccessCode;
    var ErrorCode = (function (_super) {
        __extends(ErrorCode, _super);
        function ErrorCode(value) {
            if (!ErrorCode.isValidCode(value)) {
                throw new Error('Invalid Http Error Code');
            }
            _super.call(this, value);
        }
        ErrorCode.isValidCode = function (code) {
            return code >= 400 && code <= 505;
        };
        return ErrorCode;
    })(Code);
    http.ErrorCode = ErrorCode;
})(http = exports.http || (exports.http = {}));
//# sourceMappingURL=http.js.map
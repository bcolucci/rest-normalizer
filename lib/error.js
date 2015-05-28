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
var error;
(function (error) {
    var RestError = (function () {
        function RestError(message) {
            this.message = (message || 'RestError occurred').trim();
        }
        RestError.prototype.getMessage = function () {
            return this.message;
        };
        return RestError;
    })();
    var BuildError = (function (_super) {
        __extends(BuildError, _super);
        function BuildError(message) {
            _super.call(this, message);
        }
        return BuildError;
    })(RestError);
    error.BuildError = BuildError;
    var ParseError = (function (_super) {
        __extends(ParseError, _super);
        function ParseError(message) {
            _super.call(this, message);
        }
        return ParseError;
    })(RestError);
    error.ParseError = ParseError;
})(error = exports.error || (exports.error = {}));
//# sourceMappingURL=error.js.map
/**
 * Created by bcolucci on 1/2/15.
 */
'use strict';
var common;
(function (common) {
    var Data = (function () {
        function Data() {
            this.items = [];
        }
        Data.prototype.getItems = function () {
            return this.items;
        };
        Data.prototype.getTotalItems = function () {
            return this.items.length;
        };
        return Data;
    })();
    common.Data = Data;
    var Parameter = (function () {
        function Parameter(id) {
            this.id = id;
            this.values = [];
            if (arguments.length > 1) {
                for (var i = 1; i < arguments.length; i++) {
                    this.addValue(arguments[i]);
                }
            }
        }
        Parameter.prototype.addValue = function (value) {
            if (!value) {
                return this;
            }
            if (typeof value == 'object') {
                value = Object.prototype.toString.apply(value);
            }
            this.values.push(value);
            return this;
        };
        Parameter.prototype.getId = function () {
            return this.id;
        };
        Parameter.prototype.getValues = function () {
            return this.values;
        };
        return Parameter;
    })();
    common.Parameter = Parameter;
    var Error = (function () {
        function Error(message, reason, location) {
            this.message = (message || '');
            if (!this.message.length) {
                throw 'Error message required';
            }
            this.reason = (reason || '');
            if (!this.reason.length) {
                throw 'Error reason required';
            }
            this.location = location || null;
        }
        Error.prototype.getMessage = function () {
            return this.message;
        };
        Error.prototype.getReason = function () {
            return this.reason;
        };
        Error.prototype.getLocation = function () {
            return this.location;
        };
        return Error;
    })();
    common.Error = Error;
})(common = exports.common || (exports.common = {}));
//# sourceMappingURL=common.js.map
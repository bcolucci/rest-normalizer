/**
 * Created by bcolucci on 1/2/15.
 */
'use strict';

import error = require('./error');
import http = require('./http');
import common = require('./common');

export module builder {

  export class ResponseBuilder {
    apiVersion : string;
    httpMethod : http.http.Method;
    parameters : common.common.Parameter[];

    constructor(apiVersion : string, httpMethod : http.http.Method) {
      this.apiVersion = apiVersion;
      this.httpMethod = httpMethod;
      this.parameters = [];
    }

    addParameter(parameter : common.common.Parameter) : ResponseBuilder {
      this.parameters.push(parameter);
      return this;
    }

    addParameters(parameters : common.common.Parameter[]) : ResponseBuilder {
      for (var i in parameters) {
        if (!parameters.hasOwnProperty(i)) {
          continue;
        }
        this.parameters.push(parameters[i]);
      }
      return this;
    }

    getApiVersion() : string {
      return this.apiVersion;
    }

    getHttpMethod() : http.http.Method {
      return this.httpMethod;
    }

    getParameters() : common.common.Parameter[] {
      return this.parameters;
    }

    build() : any {
      var data = {
        apiVersion: this.apiVersion,
        method: this.httpMethod.getValue(),
        params: {}
      };

      for (var i in this.parameters) {
        if (!this.parameters.hasOwnProperty(i)) {
          continue;
        }
        var plainValue : any = null,
          values = this.parameters[i].getValues();
        if (values.length === 1) {
          plainValue = values.shift();
        } else if (values.length > 1) {
          plainValue = values;
        }
        data.params[this.parameters[i].getId()] = plainValue;
      }

      return data;
    }
  }

  export class ErrorResponseBuilder extends ResponseBuilder {
    httpErrorCode : http.http.ErrorCode;
    errors : common.common.Error[];

    constructor(apiVersion : string, httpMethod : http.http.Method, httpErrorCode : http.http.ErrorCode) {
      super(apiVersion, httpMethod);
      if (typeof httpErrorCode !== 'number') {
        throw new Error('Http error code required (number)');
      }
      this.httpErrorCode = httpErrorCode;
      this.errors = [];
    }

    addParameter(parameter : common.common.Parameter) : ErrorResponseBuilder {
      super.addParameter(parameter);
      return this;
    }

    addParameters(parameters : common.common.Parameter[]) : ErrorResponseBuilder {
      super.addParameters(parameters);
      return this;
    }

    addError(error : common.common.Error) : ErrorResponseBuilder {
      this.errors.push(error);
      return this;
    }

    addErrors(errors : common.common.Error[]) : ErrorResponseBuilder {
      for (var i in errors) {
        if (!errors.hasOwnProperty(i)) {
          continue;
        }
        this.errors.push(errors[i]);
      }
      return this;
    }

    build() : any {
      if (!this.errors.length) {
        throw new error.error.BuildError('One error at least is required in order to build a restful error');
      }

      var data = super.build();

      data.code = this.httpErrorCode;
      data.message = this.errors[0].getMessage();

      data.errors = [];
      for (var i in this.errors) {
        if (!this.errors.hasOwnProperty(i)) {
          continue;
        }
        data.errors.push({
          message: this.errors[i].getMessage(),
          reason: this.errors[i].getReason(),
          location: this.errors[i].getLocation()
        });
      }

      return data;
    }
  }

  export class SuccessResponseBuilder extends ResponseBuilder {
    data : common.common.Data;
    itemsType : string;

    constructor(apiVersion : string, httpMethod : http.http.Method, itemsType : string = null) {
      super(apiVersion, httpMethod);
      this.data = new common.common.Data();
      this.itemsType = itemsType;
    }

    addParameter(parameter : common.common.Parameter) : SuccessResponseBuilder {
      super.addParameter(parameter);
      return this;
    }

    addParameters(parameters : common.common.Parameter[]) : SuccessResponseBuilder {
      super.addParameters(parameters);
      return this;
    }

    addItem(item : any) : SuccessResponseBuilder {
      if (Object.prototype.toString.apply(item) !== '[object Object]') {
        throw new error.error.BuildError('Item must be an object');
      }
      //TODO type validation
      this.data.getItems().push(item);
      return this;
    }

    addItems(items : any[]) : SuccessResponseBuilder {
      for (var i in items) {
        if (!items.hasOwnProperty(i)) {
          continue;
        }
        this.addItem(items[i]);
      }
      return this;
    }

    build() : any {
      var data = super.build();

      data.data = {
        items: this.data.getItems(),
        totalItems: this.data.getTotalItems()
      };

      return data;
    }
  }

}
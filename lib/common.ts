/**
 * Created by bcolucci on 1/2/15.
 */
'use strict';

export module common {

  export class Data {
    items : any[];

    constructor() {
      this.items = [];
    }

    getItems() : any[] {
      return this.items;
    }

    getTotalItems() : number {
      return this.items.length;
    }
  }

  export class Parameter {
    id : string;
    values : string[];

    constructor(id : string) {
      this.id = id;

      this.values = [];
      if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
          this.addValue(arguments[i]);
        }
      }
    }

    addValue(value : any) : Parameter {
      if (!value) {
        return this;
      }

      if (typeof value == 'object') {
        value = Object.prototype.toString.apply(value);
      }
      this.values.push(value);
      return this;
    }

    getId() : string {
      return this.id;
    }

    getValues() : string[] {
      return this.values;
    }
  }

  export class Error {
    message : string;
    reason : string;
    location : string;

    constructor(message : string, reason : string, location? : string) {
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

    getMessage() : string {
      return this.message;
    }

    getReason() : string {
      return this.reason;
    }

    getLocation() : string {
      return this.location;
    }
  }

}
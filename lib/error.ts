/**
 * Created by bcolucci on 1/2/15.
 */
'use strict';

export module error {

  class RestError {
    message : string;

    constructor(message : string) {
      this.message = (message || 'RestError occurred').trim();
    }

    getMessage() : string {
      return this.message;
    }
  }

  export class BuildError extends RestError {
    constructor(message : string) {
      super(message);
    }
  }

  export class ParseError extends RestError {
    constructor(message : string) {
      super(message);
    }
  }

}
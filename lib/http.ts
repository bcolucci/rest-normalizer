/**
 * Created by bcolucci on 1/2/15.
 */
'use strict';

export module http {

  export class Method {
    static C_HEAD : string = 'HEAD';
    static C_GET : string = 'GET';
    static C_POST : string = 'POST';
    static C_PUT : string = 'PUT';
    static C_PATCH : string = 'PATCH';
    static C_DELETE : string = 'DELETE';

    value : string;

    constructor(value : string) {
      this.value = value;
    }

    public getValue() : string {
      return this.value;
    }

    static getAvailableMethods() : string[] {
      return [
        Method.C_HEAD,
        Method.C_GET,
        Method.C_POST,
        Method.C_PUT,
        Method.C_PATCH,
        Method.C_DELETE
      ];
    }

    static valueOf(value : string) : Method {
      value = value.trim().toUpperCase();
      var methods = Method.getAvailableMethods();
      if (methods.indexOf(value) <= 0) {
        return null;
      }
      return new Method(value);
    }

    static HEAD() : Method {
      return new Method(Method.C_HEAD);
    }

    static GET() : Method {
      return new Method(Method.C_GET);
    }

    static POST() : Method {
      return new Method(Method.C_POST);
    }

    static PUT() : Method {
      return new Method(Method.C_PUT);
    }

    static PATCH() : Method {
      return new Method(Method.C_PATCH);
    }

    static DELETE() : Method {
      return new Method(Method.C_DELETE);
    }
  }

  export class Code {
    value : number;

    constructor(value : number) {
      this.value = value;
    }

    public getValue() : number {
      return this.value;
    }

    static valueOf(value : number) : Code {
      if (SuccessCode.isValidCode(value)) {
        return new SuccessCode(value);
      } else if (ErrorCode.isValidCode(value)) {
        return new ErrorCode(value);
      }
      return null;
    }
  }

  export class SuccessCode extends Code {
    constructor(value : number) {
      if (!SuccessCode.isValidCode(value)) {
        throw new Error('Invalid Http Success Code');
      }
      super(value);
    }

    static isValidCode(code : number) : boolean {
      return code >= 100 && code <= 305;
    }
  }

  export class ErrorCode extends Code {
    constructor(value : number) {
      if (!ErrorCode.isValidCode(value)) {
        throw new Error('Invalid Http Error Code');
      }
      super(value);
    }

    static isValidCode(code : number) : boolean {
      return code >= 400 && code <= 505;
    }
  }

}
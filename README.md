
# RestNormalizer component

Use this component in order to normalize your Restful API I/O.

**It's a very simple and not exhaustive implementation. Help is welcome!**

## How to install

     npm install rest-normalizer --save

## Run tests

    npm test

    // code coverage
    npm run-script cover

## How to use

    var rest = require('rest-normalizer');
    /*
        error
            BuildError
            ParseError

        http
            Method
                getAvailableMethods
                valueOf
                HEAD
                GET
                POST
                PUT
                PATCH
                DELETE

            Code
                valueOf

            SuccessCode
                valueOf
                isValidCode

            ErrorCode
                valueOf
                isValidCode

        common
            Data
            Parameter
            Error

        builder
            ResponseBuilder
            ErrorResponseBuilder
            SuccessResponseBuilder
    */

    var successBuilder = new rest.builder.SuccessResponseBuilder('1.2', http.Method.GET());
        successBuilder
            .addParameter(new common.Parameter('ids', 1, 2).addValue(3))
            .addItem({field: 36})
            .addItem({field: 42})
            .addItems([
              {field: 1},
              {field: 2}
            ]);

    JSON.stringify(successBuilder.build());
    /* will produce:
    {
       "apiVersion":"1.2",
       "method":"GET",
       "params":{
          "ids":[1,2,3]
       },
       "data":{
          "items":[
             {"field":36},
             {"field":42},
             {"field":1},
             {"field":2}
          ],
          "totalItems":4
       }
    }
    */

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

    JSON.stringify(successBuilder.build());
    /* will produce:
    {
       "apiVersion":"1.2",
       "method":"GET",
       "params":{
          "ids":[1,2,3],
          "name":"john",
          "age":42
       },
       "code":400,
       "message":"m1",
       "errors":[
          {"message":"m1","reason":"r1","location":"l1"},
          {"message":"m2","reason":"r2","location":"l2"},
          {"message":"m3","reason":"r3","location":"l3"}
       ]
    }
    */

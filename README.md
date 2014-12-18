data2level
==========

## Writer
Insert data to level db with auto generating keys.

````javascript
    var Writer = require('data2level').Writer
    , data = [ 
        { ID: 1:, name: 'UnitA', result: 56 }
        , { ID: 1:, name: 'UnitB', result: 54} 
        , { ID: 2:, name: 'UnitA', result: 67}
    ]
    , keys = [ 'ID', 'name' ]
    , writer
    ;
    
    writer = new Writer({
      'db': './db/data'
    });
    
    writer.write(data, keys, callback );

````
gets in the database like this:
````javascript
    {
        '1\x00UnitA': { ID: 1:, name: 'UnitA', result: 56 },
        '1\x00UnitB': { ID: 1:, name: 'UnitB', result: 56 },
        '2\x00UnitA': { ID: 2:, name: 'UnitA', result: 56 }
    }
````

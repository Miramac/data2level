var path = require('path') 
, level = require('level')
, Writer = require('../lib/writer')
, writer
, dbPath = path.join(__dirname, 'db/test')
;
writer = new Writer({
	'db': dbPath
});

writer.write([ { ID: 1, name: 'UnitA', result: 100 }, { ID: 2, name: 'UnitB', result: 100} ], [ 'ID', 'name' ]);

// var entries = []

// db = level(dbPath);
 // db.get('ID', function (err, value) {
        // console.log('dprk:', value)
        // db.close()
      // })
// db.createReadStream({ start: 'UnitA\x00', end: 'UnitA\x00\xff' })
  // .on('data', function (entry) { entries.push(entry) })
  // .on('close', function () { console.log(entries) })


var path = require('path') 
, level = require('level')
, Writer = require('../lib/writer')
, writer
, dbPath = path.join(__dirname, 'db/test')
;

level.destroy(dbPath);

writer = new Writer({
	'db': dbPath
});

writer.write([ { ID: 1, name: 'UnitA', result: 1000 }, { ID: 1, name: 'UnitB', result: 100}, { ID: 2, name: 'UnitA', result: 100} ], [ 'ID', 'name' ], TestData);

//TestData()
function TestData() {
    db = level(dbPath);
    var allData = [];
    db.createReadStream({
        start : '1'        
      , end   : '1\x00Unit\xff' // stop at the last key with the prefix
    })
    .on('data', function (data) {
      allData.push(data.value);
    })
    .on('close', function () {
		
      console.log(allData);
    }) 
}


// db.createReadStream({ start: 'UnitA\x00', end: 'UnitA\x00\xff' })
  // .on('data', function (entry) { entries.push(entry) })
  // .on('close', function () { console.log(entries) })


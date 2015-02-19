var path = require('path') 
, level = require('level')
, Writer = require('../lib/writer')
, writer
, dbPath = path.join(__dirname, 'db/test')
;

//level.destroy(dbPath);

writer = new Writer({
	'db': dbPath
});

 writer.write([ { ID: 1, name: 'UnitA', result: 600 }, { ID: 1, name: 'UnitB', result: 400}, { ID: 2, name: 'UnitA', result: 500}, { ID: 3, name: 'UnitA', result: 200} ], [ 'ID', 'name' ], TestData);

//TestData()
function TestData() {
    db = level(dbPath);
    var allData = [];
    db.createReadStream({
        start : '\x00'        
      , end   : '\xff'
    })
    .on('data', function (data) {
      allData.push(data.value);
    })
    .on('close', function () {
		
      console.log(allData);
    }) 
}

/*global define,it */
var assert = require('assert')
, path = require('path')
, level = require('level')
, Writer = require('../').Writer
, dbPath = path.join(__dirname, 'db/mocha.test')
;

describe('data2lvel Writer', function(){
	
	describe('#write', function(){
		
		it('should write one row', function(done){
			var testPath = dbPath +'01';
			level.destroy(testPath, function() {
				var writer = new Writer({
					'db': testPath
				});
				var testData = [{ ID: 1, name: 'A', result: 1000 }];
				writer.write(testData,['ID', 'name'] , function() {
					getData(testPath, 1, 'A', function(err, data) {
						if (err) throw err;
						assert.deepEqual(data, testData);
						done();
					});
				});
			});
		});
		it('should write 3 rows', function(done){
			var testPath = dbPath +'02';
			level.destroy(testPath, function() {
				var writer = new Writer({
					'db': testPath
				});
				var testData = [{ ID: 1, name: 'AA', result: 1000 },{ ID: 1, name: 'AB', result: 1000 },{ ID: 1, name: 'AC', result: 1000 }];
				writer.write(testData,['ID', 'name'] , function() {
					getData(testPath, 1, 'A', function(err, data) {
						if (err) throw err;
						assert.deepEqual(data, testData);
						done();
					});
				});
			});
		});
	});
});

//Get data from level db
function getData(dbPath, start, end, cb) {
    db = level(dbPath);
    var allData = [];
    db.createReadStream({
        start : start        
      , end   : end + '\xff' // stop at the last key with the prefix
    })
	.on('error', function(err) {
		cb(new Error(err));
	})
    .on('data', function (data) {
      allData.push(JSON.parse(data.value));
    })
    .on('close', function () {
      cb(null, allData);
    }) 
    
    
}


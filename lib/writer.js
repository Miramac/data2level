//write sql data to level db
var path = require('path')
, level = require('level')
;

function Writer(options) {
	options = (options) ? options : {};
	options.db = (options.db) ? options.db : path.join(__dirname, 'db/__data__');
	options.start = (options.start) ? options.start : '\x00';
	options.end = (options.end) ? options.end : '\x00\xff';
	
	
	
	var self = this
	, writer = {}
	;
	
	//write the sql data 
	// rows : [ { ID: 1:, name: 'UnitA', result: 100 }, { ID: 2:, name: 'UnitB', result: 100} ]
	// keys : [ 'ID', 'name' ]
	writer.write = function(rows, keys, cb) {
		if (!keys && !keys.length) return;
		var i,j
		, key
		, db = level(options.db, { valueEncoding: 'json' });
		;
		for (i=0; i<rows.length; i++) {
			key = '';
			for(j=0; j<keys.length; j++){
				key += ((j>0) ? '\x00' : '') + keys[j];
			}
			db.put(key, rows[i], cb);
		}
	};
	
	return writer;
}

module.exports = Writer;

//
//write data to level db
//
var level = require('level'),
	Datakey = require('datakey');


function Writer(options) {
	options = (options) ? options : {};
	options.divider = (options.divider) ? options.divider : '\x00';
	
	var datakey = new Datakey({divider: options.divider}),
	writer = {};
	
	//write the sql data 
	// rows : [ { ID: 1:, name: 'UnitA', result: 100 }, { ID: 2:, name: 'UnitB', result: 100} ]
	// keys : [ 'ID', 'name' ]
	writer.write = function(rows, keys, cb) {
		if (!keys && !keys.length) return;
		var db = level(options.db, { valueEncoding: 'json' });
		
        db.batch(datakey.levelup(rows, keys), function(err) {
            db.close();
            if(cb) {
                if(err) {
                    cb(err);
                } else {
                   cb(null); 
                }
            } else {
                if(err) throw err;
            }
        });
	};
	
	return writer;
}

module.exports = Writer;

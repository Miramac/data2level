//
//write data to level db
//
var level = require('level')
;

function Writer(options) {
	options = (options) ? options : {};
	options.divider = (options.divider) ? options.divider : '\x00';
	
	var writer = {}
	;
	
	//write the sql data 
	// rows : [ { ID: 1:, name: 'UnitA', result: 100 }, { ID: 2:, name: 'UnitB', result: 100} ]
	// keys : [ 'ID', 'name' ]
	writer.write = function(rows, keys, cb) {
		if (!keys && !keys.length) return;
		var i,j
        , data = []
		, key
		, db = level(options.db, { valueEncoding: 'json' });
		;
		for (i=0; i<rows.length; i++) {
			key = '';
			for(j=0; j<keys.length; j++){
				key += ((j>0) ? options.divider : '') + rows[i][keys[j]];
			}
			data.push({type: 'put', key: key, value: rows[i] }); 
		}
        db.batch(data, function(err) {
            db.close();
            if(cb) {
                if(err) {
                    cb(err);
                } else {
                   cb(null, data); 
                }
            } else {
                if(err) throw err;
            }
        });
	};
	
	return writer;
}

module.exports = Writer;

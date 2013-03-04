var fs = require('fs'), mongoose = require('mongoose'), async = require('async');
;

module.exports = {

	/*
	 * use id to get the json data
	 */
	getDataByCompanyID : function(id) {

		var data;
		try {
			data = fs.readFileSync(this.getFilePath(id), 'utf8');
			return data;
		} catch (e) {
			console.error(e);
		}
		return false;
	},

	getDataByCompanyIDFromDB : function(id, next) {
		var data;
		try {
			Company = mongoose.model('Company');
			var ret = '';

			Company.findByName(id, function(err, data) {
				if ( data instanceof Object) {
					data = JSON.stringify(data.data[0]);
					next(data);
				} else {
					next(false);
				}
			});
		} catch (e) {
			console.error(e);
			return false;
		}
	},

	saveDataByCompanyID : function(id, data, next) {
		if (id && data) {
			var createOrUpdate = function(ret) {
				Company = mongoose.model('Company');
				if (ret) {//update
					var conditions = { name: id }
  						, update = { data : data }
  						, options = {};
					Company.update(conditions, update, options, next);
				} else {//create
					//new one should create
					var companyObj = new Company();
					companyObj.name = id;
					companyObj.data = data;
					companyObj.save();
					next(true);
				}
			};
			this.getDataByCompanyIDFromDB(id, createOrUpdate);
		}
	},

	getFilePath : function(id) {
		return './public/data/' + id + '.json';
	}
};


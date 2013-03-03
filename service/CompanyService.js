var fs = require('fs'), 
	mongoose = require('mongoose'),
	async = require('async');

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

	getDataByCompanyIDFromDB : function(id) {
		var data;
		try {
			Company = mongoose.model('Company');
			var ret = '';
			
			Company.findByName(id, function(err, data) {
				if ( data instanceof Object) {
					console.log('inside the data');
					return data.data;
				} else {
					return false;
				}
			});
			console.log('finished');
		} catch (e) {
			console.error(e);
			return false;
		}
	},

	saveDataByCompanyID : function(id, data) {
		if (id && data) {
			Company = mongoose.model('Company');
			var companyObj = new Company();
			companyObj.name = id;
			companyObj.data = data;
			companyObj.save();

			//fs.writeFileSync(this.getFilePath(id), data, 'utf8');
			return true;
		}
		return false;
	},

	getFilePath : function(id) {
		return './public/data/' + id + '.json';
	}
};


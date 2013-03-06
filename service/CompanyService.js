var fs = require('fs'), mongoose = require('mongoose'), async = require('async');
;

module.exports = {

	createCompany : function(id, next) {
		var data = fs.readFileSync('./public/data/template-zh.json', 'utf8');
		data = JSON.parse(data);
		Company = mongoose.model('Company');
		var companyObj = new Company();
		companyObj.name = id;
		companyObj.data = data;
		companyObj.save();
		next(true);
	},

	getDataByCompanyID : function(id, next) {
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
					Company.update(conditions, update, options, callback);
					
					function callback (err, numAffected) {
						if(numAffected){
							next(true);
						}else{
							next(false);
						}
					}
				} else {//create
					//new one should create
					var companyObj = new Company();
					companyObj.name = id;
					companyObj.data = data;
					companyObj.save();
					next(true);
				}
			};
			this.getDataByCompanyID(id, createOrUpdate);
		}
	},
	
	
	

	getFilePath : function(id) {
		return './public/data/' + id + '.json';
	}
};


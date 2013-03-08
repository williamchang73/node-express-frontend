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
	
	
	getCompanys : function(page, next) {
		var data;
		try {
			Company = mongoose.model('Company');
			var options = {
				'display' : {'name' : 1, 'data.company_info' : 1, 'data.company_pic.pic' : 1}
			};

			Company.search(options, function(err, data) {
				if ( data instanceof Object) {
					
					//console.log(data);
					
					var ret = [];
					for (var i=0;i<data.length;i++){
						
						var coverpic = data[i]['data'][0]['company_pic'][0]['pic'];
						var name =  data[i]['data'][0]['company_info']['name'];
						var arr = { 'coverpic' : coverpic , 'name' : name , 'urlname' : data[i]['name']}
						ret.push(arr);
					}
					data = JSON.stringify(ret);
					next(data);
				} else {
					next(false);
				}
			});
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	
	
	

};


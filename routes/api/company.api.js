var base = require('./base.api.js');
var companyService = require('./../../service/CompanyService');





exports.get = function(req, res){
	if(req.body.id == undefined){
		res.send(false);
		return;
	}
	var ret = companyService.getDataByCompanyID(req.body.id);
	base.responseJson(res, ret);
};



exports.getFromDB = function(req, res){
	if(req.body.id == undefined){
		res.send(false);
		return;
	}
	var next = function(data){
		if(data){
			base.responseJson(res, data);	
		}else{
			base.responseErrorJson(res, data);
		}
	};
	companyService.getDataByCompanyIDFromDB(req.body.id, next);
};


exports.update = function(req, res){
	var id = req.body.id;
	var data = req.body.data;
	
	var next = function(data){
		console.log('api : ' +data);
		if(data){
			base.responseJson(res, true);	
		}else{
			base.responseErrorJson(res, data);
		}
	};
	companyService.saveDataByCompanyID(id, data, next);
};


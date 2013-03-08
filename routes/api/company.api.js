var base = require('./base.api.js');
var companyService = require('./../../service/CompanyService');


exports.create = function(req, res){
	if(req.body.id == undefined){
		base.responseErrorParameterJson(res, false);
	}
	var next = function(data){
		if(data){
			base.responseJson(res, data);	
		}else{
			base.responseErrorJson(res, data);
		}
	};
	companyService.createCompany(req.body.id, next);
}

exports.get = function(req, res){
	if(req.body.id == undefined){
		base.responseErrorParameterJson(res, false);
	}
	var next = function(data){
		if(data){
			base.responseJson(res, data);	
		}else{
			base.responseErrorJson(res, data);
		}
	};
	companyService.getDataByCompanyID(req.body.id, next);
};


exports.update = function(req, res){
	var id = req.body.id;
	var data = req.body.data;
	
	if(!(id && data)){
		base.responseErrorParameterJson(res, false);
	}
	
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



exports.list = function(req, res){
	var next = function(data){
		if(data){
			base.responseJson(res, data);	
		}else{
			base.responseErrorJson(res, data);
		}
	};
	var page = 1;
	companyService.getCompanys(page, next);
};


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



exports.update = function(req, res){
	var id = req.body.id;
	var data = req.body.data;
	var ret = companyService.saveDataByCompanyID(id, data);
	if(ret){
		base.responseJson(res, true);
	}else{
		base.responseJson(res, false);
	}	
};












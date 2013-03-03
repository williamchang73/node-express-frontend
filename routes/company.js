
exports.index = function(req, res){
	if(req.params.id == undefined){
		res.send('please specify a company name !!');
		return;
	}

	var data = { 
		company_name  : req.params.id,
		mode : 'view'
	};

	res.render('pages/company', data);
};



//for administrator
exports.edit = function(req, res){
	if(req.params.id == undefined){
		res.send('please specify a company name !!');
		return;
	}

	var data = { 
		company_name  : req.params.id,
		mode : 'edit'
	};
	res.render('pages/company', data);
};
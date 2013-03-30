
exports.index = function(req, res){
	if(req.params.id == undefined){
		res.send('please specify a company name !!');
		return;
	}

	var data = { 
		company_name  : req.params.id,
		mode : 'view',
		"clientcss" : req.app.get('clientcss').renderTags("app", "page_company"),
		"clientjs" : req.app.get('clientjs').renderTags("app", "page_company", "base")
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
		mode : 'edit',
		"clientcss" : req.app.get('clientcss').renderTags("app", "page_company"),
		"clientjs" : req.app.get('clientjs').renderTags("app", "page_company", "base")
	};
	res.render('pages/company', data);
};
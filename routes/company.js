
exports.index = function(req, res){
	if(req.params.id == undefined){
		res.send('please specify a company name !!');
		return;
	}


	var clientjs = req.app.get('clientjs');
	clientjs.addFile("page_company", __dirname + "/../public/3rd_party/prettyPhoto/js/jquery.prettyPhoto.js");
  	clientjs.addFile("page_company", __dirname + "/../public/javascripts/pages/company.view.js");

	var data = { 
		company_name  : req.params.id,
		mode : 'view',
		"clientjs" : clientjs.renderTags("app", "page_company", "base")
	};

	res.render('pages/company', data);
};



//for administrator
exports.edit = function(req, res){
	if(req.params.id == undefined){
		res.send('please specify a company name !!');
		return;
	}
	
	var clientjs = req.app.get('clientjs');
	clientjs.addFile("page_company", __dirname + "/../public/3rd_party/filepicker/filepicker.js");
	clientjs.addFile("page_company", __dirname + "/../public/javascripts/pages/company.view.js");

	var data = { 
		company_name  : req.params.id,
		mode : 'edit',
		"clientjs" : clientjs.renderTags("app", "page_company", "base")
	};
	res.render('pages/company', data);
};
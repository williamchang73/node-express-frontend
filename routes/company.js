
exports.index = function(req, res){
	if(req.params.id == undefined){
		res.send('please specify a company name !!');
		return;
	}

	var clientcss = req.app.get('clientcss');
	var clientjs = req.app.get('clientjs');
	
	clientcss.addFile("page_company", __dirname + "/../public/3rd_party/prettyPhoto/css/prettyPhoto.css");
	clientcss.addFile("page_company", __dirname + "/../public/stylesheets/pages/company.view.css");
	clientjs.addFile("page_company", __dirname + "/../public/3rd_party/prettyPhoto/js/jquery.prettyPhoto.js");
  	clientjs.addFile("page_company", __dirname + "/../public/javascripts/pages/company.view.js");

	var data = { 
		company_name  : req.params.id,
		mode : 'view',
		"clientcss" : clientcss.renderTags("app", "page_company"),
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
	
	var clientcss = req.app.get('clientcss');
	var clientjs = req.app.get('clientjs');
	clientcss.addFile("page_company", __dirname + "/../public/stylesheets/pages/company.view.css");
	clientjs.addFile("page_company", __dirname + "/../public/3rd_party/filepicker/filepicker.js");
	clientjs.addFile("page_company", __dirname + "/../public/javascripts/pages/company.view.js");

	var data = { 
		company_name  : req.params.id,
		mode : 'edit',
		"clientcss" : clientcss.renderTags("app", "page_company"),
		"clientjs" : clientjs.renderTags("app", "page_company", "base")
	};
	res.render('pages/company', data);
};
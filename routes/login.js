
/*
 * GET login page.
 */

exports.login = function(req, res){
  var clientcss = req.app.get('clientcss');
  var clientjs = req.app.get('clientjs');
  
  clientcss.addFile("page_login", __dirname + "/../public/stylesheets/pages/login.view.css");
  clientjs.addFile("page_login", __dirname + "/../public/3rd_party/parsley/parsley-standalone.min.js");
  clientjs.addFile("page_login", __dirname + "/../public/javascripts/pages/login.view.js");
  
  
  var data = { 
		"mode" : "login",
		"clientcss" : clientcss.renderTags("app", "page_login"),
		"clientjs" : clientjs.renderTags("app", "page_login", "base")
	};
  res.render('pages/login', data);
};



exports.logout = function(req, res){
  var clientcss = req.app.get('clientcss');
  var clientjs = req.app.get('clientjs');
  clientcss.addFile("page_login", __dirname + "/../public/stylesheets/pages/login.view.css");
  clientjs.addFile("page_login", __dirname + "/../public/javascripts/pages/login.view.js");
  
  var data = { 
		"mode" : "logout",
		"clientcss" : clientcss.renderTags("app", "page_login"),
		"clientjs" : clientjs.renderTags("app", "page_login", "base")	
	};
  res.render('pages/login', data);
};
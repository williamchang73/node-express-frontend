
/*
 * GET login page.
 */

exports.login = function(req, res){
  var data = { 
		"mode" : "login"
	};
  res.render('pages/login', data);
};



exports.logout = function(req, res){
  var data = { 
		"mode" : "logout"	
	};
  res.render('pages/login', data);
};
/*
 * GET login page.
 */

exports.login = function(req, res) {
	var data = {
		"mode" : "login",
		"clientcss" : req.app.get('clientcss').renderTags("app", "page_login"),
		"clientjs" : req.app.get('clientjs').renderTags("app", "page_login", "base")
	};
	res.render('pages/login', data);
};

exports.logout = function(req, res) {
	var data = {
		"mode" : "logout",
		"clientcss" : req.app.get('clientcss').renderTags("app", "page_login"),
		"clientjs" : req.app.get('clientjs').renderTags("app", "page_login", "base")
	};
	res.render('pages/login', data);
}; 
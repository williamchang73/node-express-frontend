/*
 * GET home page.
 */
exports.index = function(req, res) {

	var data = {
		"clientcss" : req.app.get('clientcss').renderTags("app", "page_index"),
		"clientjs" : req.app.get('clientjs').renderTags("app", "page_index", "base")
	};

	res.render('pages/index', data);
}; 
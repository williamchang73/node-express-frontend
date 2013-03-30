
/*
 * GET home page.
 */
exports.index = function(req, res){
  var clientcss = req.app.get('clientcss');
  var clientjs = req.app.get('clientjs');
  
  clientcss.addFile("page_index", __dirname + "/../public/stylesheets/pages/index.view.css");
  clientjs.addFile("page_index", __dirname + "/../public/javascripts/pages/index.view.js");
  
  var data = {
  		"clientcss" : clientcss.renderTags("app", "page_index"), 
		"clientjs" : clientjs.renderTags("app", "page_index", "base")
	};
	
  res.render('pages/index', data);
};
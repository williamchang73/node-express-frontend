
/*
 * GET home page.
 */
exports.index = function(req, res){
  var clientjs = req.app.get('clientjs');
  
  clientjs.addFile("page_index", __dirname + "/../public/javascripts/pages/index.view.js");
  
  var data = { 
		"clientjs" : clientjs.renderTags("app", "page_index", "base")
	};
	
  res.render('pages/index', data);
};
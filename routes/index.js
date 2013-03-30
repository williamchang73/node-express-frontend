
/*
 * GET home page.
 */
exports.index = function(req, res){
  var js = req.app.get('clientjs');
  
  var data = { 
		"global_js" : js.renderTags("app")
	};
	
  res.render('pages/index', data);
};
var base = require('./base');


exports.index = function(req, res){
	base.init(req, res);
	var data = { title: 'Express' };
	base.render('company', data);
};


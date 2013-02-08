
exports.index = function(req, res){
	var data = { 
		data  : req.params.id + '.json',
	};
	res.render('pages/company', data);
};


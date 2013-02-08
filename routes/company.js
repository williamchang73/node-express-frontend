
exports.index = function(req, res){
	var data = { 
		page  : 'company',
		title : 'Express',
		data  : req.params.id + '.json',
		company : 'lalala'
	};
	res.render('pages/company', data);
};



exports.uploadphotos = function(req, res){
	var data = { 
	};

	res.render('admin/uploadphotos', data);
};



exports.uploaddata = function(req, res){
	
	//post data
	if(req.files.data != undefined){
		//save to data
		var fs = require('fs');
		fs.readFile(req.files.data.path, function (err, data) {
		  	console.log('read...');
			var newPath = __dirname + "/../public/data/" + req.files.data.name;
			fs.writeFile(newPath, data, function (err) {
				res.send('ok ! ');
				return;
			});
		});
	}else{
		var data = {};
		res.render('admin/uploaddata', data);
	}
	
};

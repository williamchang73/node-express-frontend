var fs = require('fs');

module.exports = {


	/*
	 * use id to get the json data
	 */
	getDataByCompanyID : function(id) {

		var data;
		try {
			data = fs.readFileSync(this.getFilePath(id), 'utf8');
			return data;
		} catch (e) {
			console.error(e);
		}
		return false;		
	},
	
	
	saveDataByCompanyID : function(id, data){
		if(id && data){
			fs.writeFileSync(this.getFilePath(id), data, 'utf8');
			return true;
		}
		return false;
	},
	
	getFilePath : function(id){
		return './public/data/' + id + '.json';
	}
	 
};


	
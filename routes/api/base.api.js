
module.exports = {
	
	responseJson : function(res, data) {
		var ret = {};
		ret['error_code'] = '';
		ret['error_message'] = '';

		if(data){
			if(data !="" && (typeof data) == "string"){
				data = JSON.parse(data);
			}
			ret['data'] = data;
			ret['status'] = true;
		}else{
			ret['data'] = '';
			ret['status'] = false;
		}
		res.send(ret);
	},	 
	
	responseErrorJson : function(res, data) {
		var ret = {};
		ret['data'] = '';
		ret['status'] = false;
		ret['error_code'] = '100';
		ret['error_message'] = 'can not find company';
		res.send(ret);
	},
	
	responseErrorParameterJson : function(res, data) {
		var ret = {};
		ret['data'] = '';
		ret['status'] = false;
		ret['error_code'] = '101';
		ret['error_message'] = 'parameter is incorrect';
		res.send(ret);
	}
};


	
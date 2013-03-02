
module.exports = {

	responseJson : function(res, data) {
		var ret = {};
		if(data){
			if((typeof data) == "string"){
				data = JSON.parse(data);
			}
			ret['data'] = data;
			ret['status'] = true;
			ret['error_code'] = '';
			ret['error_message'] = '';
		}else{
			ret['data'] = '';
			ret['status'] = false;
			ret['error_code'] = '';
			ret['error_message'] = '';
		}
		res.send(ret);
	}	 
};


	
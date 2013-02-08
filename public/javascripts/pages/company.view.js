/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var companyController = new SWSController;
companyController.init = function() {
	companyController.getCompanyData();	
}

companyController.initWidget = function() {}


companyController.getCompanyData = function() {
    var that = this;
    SWSUtility.ajax({    
        url :"/data/appz.json",       
        data : {},
        type : 'GET',
        async : false,
        success : function(data) {
        	// success do nothing;
			console.log(data); 
        },                 
        error : function(data) {
            console.error(data.error_message);
        }
	});
};



$(function() {
    companyController.initialize();
});

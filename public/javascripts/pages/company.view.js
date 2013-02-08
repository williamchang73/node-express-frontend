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
			companyController.setCompanyInfo(data);		
			companyController.setWorkingSpaces(data);	 
        },                 
        error : function(data) {
            console.error(data.error_message);
        }
	});
};

//set up event
companyController.setCompanyInfo = function(data) {
	console.log(data);
	var company_info = data.company_info;
	$('.brand strong').text('Inside - ' + company_info.name);
	$('#slogan h3 p').text(company_info.slogan);
}


//set up event
companyController.setWorkingSpaces = function(data) {
	var $workspace = $('#workspace').remove().clone();
	var company_pic = data.compamy_pic;
	var startIndex = 4;
	$.each( company_pic, function(i, picinfo) {
		if(++i>startIndex){
	        var $eachPicinfo = $workspace.clone();
	        console.log(picinfo.pic);
	        $eachPicinfo.find("img").attr("src", picinfo.pic)
	        .end()
	        .find('.text h6')
	        .text(picinfo.title)
	        .end()
	        .find('.text p')
	        .text(picinfo.desc)
	        .end();
	        $('.features_op1_row').append( $eachPicinfo );
		}
    });
}




$(function() {
    companyController.initialize();
});

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var indexController = new SWSController;
var companydata = '';

indexController.initBinding = function() {
	$('.carousel').carousel({
  		interval: 6000
	});
}



indexController.initWidget = function() {
	indexController.getCompanys();
}

$(function() {
    indexController.initialize();
});


indexController.getCompanys = function() {
	
	
	/*
	var data = {
		'Company[name]' : 'kkk222',
		'Company[data]' : '222kkk'
	};
	AboutUsAPI.createCompany(data, function(res){
		console.log(res);
	});
	
	return false;
	
	AboutUsAPI.getCompanyList({}, function(data){
		console.log(data);
	});
	return false;
	*/
	
    var that = this;
    /*
    SWSUtility.ajax({    
        url :"/api/get_company/list",
        data : {},
        success : function(data) {
        	var $company = $('.thumbnails .span4').remove().clone();
			$.each( data, function(i, company) {
				var $eachCompany = $company.clone();
				$eachCompany.find('.caption p').text(company.name);
				if(i % 3 == 0){
					$eachCompany.addClass('first');
				}
				$eachCompany.find('img').attr('src', company.coverpic + '/convert?w=400&h=290&fit=crop');
				$eachCompany.click(function () {
					window.location = '/company/' + company.urlname;
				});

				$('.thumbnails').append($eachCompany);
    		});
        },                 
        error : function(data) {
            console.error(data.error_message);
        }
	});
	*/
};

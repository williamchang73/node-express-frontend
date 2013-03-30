/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var indexController = new SWSController;
var companydata = '';

indexController.initBinding = function() {
	$('.carousel').carousel({
		interval : 6000
	});
}

indexController.initWidget = function() {
	indexController.getCompanies();
}
$(function() {
	indexController.initialize();
});

indexController.getCompanies = function() {

	var data = {
		page : 0
	};
	var $company = $('.thumbnails .span4').remove().clone();
	AboutUsAPI.getCompanies(data, function(companies) {
		companies = companies.data;
		$.each(companies, function(i, company) {
			var $eachCompany = $company.clone();
			$eachCompany.find('.caption p').text(company.name);
			if (i % 3 == 0) {
				$eachCompany.addClass('first');
			}
			$eachCompany.find('img').attr('src', company.coverpic + '/convert?w=400&h=290&fit=crop');
			$eachCompany.click(function() {
				window.location = '/company/' + company.urlname;
			});

			$('.thumbnails').append($eachCompany);
		});
	});
};

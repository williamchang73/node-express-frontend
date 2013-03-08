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

$(function() {
    indexController.initialize();
});


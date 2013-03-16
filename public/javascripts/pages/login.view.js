/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var loginController = new SWSController;

loginController.initWidget = function() {
}

loginController.initBinding = function() {
	$('#btnCreateUser').click(function() {
		var validate = $('#createForm').parsley('validate');
		if(validate){
			loginController.createUser();
		}
	});
}

loginController.createUser = function() {
	var email = $('#email').val();
	var pass = $('#password').val();
	var pass2 = $('#password2').val();
	var urlname = $('#urlname').val();
	if (email == '' || pass == '' || (pass != pass2 )) {
		alert('error');
	} else {
		var data = {
			'User[email]' : email,
			'User[password]' : pass
		};
		AboutUsAPI.createUser(data, function(res) {
			if (res) {
				var userid = res.data.id;
				var data = {
					'Company[name]' : urlname,
					'Company[data]' : '222kkk',
					'Company[userid]' : userid
				};
				AboutUsAPI.createCompany(data, function(res) {
					console.log(res);
				});
			} else {

			}
		});
	}

}
$(function() {
	loginController.initialize();
});

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var loginController = new SWSController;

loginController.initWidget = function() {
	$('#btnLoginUser').hide();
}

loginController.initBinding = function() {
	$('#btnCreateUser').click(function() {
		var validate = $('#createForm').parsley('validate');
		if(validate){
			loginController.createUser();
		}
	});
	
	
	$('#login').click(function() {
		loginController.loginUserDisplay();		
	});
	
	
	$('#btnLoginUser').click(function() {
		loginController.loginUser();
	});
}


loginController.loginUser = function() {
	var email = $('#email').val();
	var pass = $('#password').val();
	var data = {
		'email' : email,
		'password' : pass
	};
	AboutUsAPI.loginUser(data, function(res) {
		var expired = 30;
		if(res && res.token){
			$.cookie("token", res.token, { expires: expired });
			$.cookie("user", res.user, { expires: expired });
			console.log('save into cookies');
		}
	});
}



loginController.loginUserDisplay = function() {
	$('#urlname').hide();
	$('#password2').hide();
	$('.forgot').hide();
	$('#btnCreateUser').hide();
	$('#btnLoginUser').show();
	
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
		AboutUsAPI.createUser(data, function(res) { //first create user
			if (res) {
				var userid = res.data.id;
				var data = {
					'Company[name]' : urlname,
					'Company[data]' : '222kkk',
					'Company[userid]' : userid
				};
				AboutUsAPI.createCompany(data, function(res) { //create company and will redirect to the company
					//auto login
					loginController.loginUser();
				});
			} else {

			}
		});
	}

}
$(function() {
	loginController.initialize();
});

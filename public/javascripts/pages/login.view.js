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
		if (validate) {
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
	console.log('login user');
	var email = $('#email').val();
	var pass = $('#password').val();
	var data = {
		'email' : email,
		'password' : pass
	};
	AboutUsAPI.loginUser(data, function(res) {
		if (res.status == 200) {
			data = res.data;
			if (data && data.token) {
				var expired = 30;
				$.cookie("token", data.token, {
					expires : expired
				});
				$.cookie("user", JSON.stringify(data.user), {
					expires : expired
				});
				
				//after login, will auto redirect...
				AboutUsAPI.getCompaniesByUser({}, data.token, function(res2){
					if(res2.status == 200 && res2.data.length > 0){
						var company = res2.data[0].name;
						if(company.length > 0){
							window.location.href = '/company/'+company;
						}						
					}else if($('#urlname').val()){ //need to create company, only at the first time
						AboutUsAPI.createCompany({'Company[name]' : $('#urlname').val()}, data.token, function(res) {
						 	console.log(res);
						});
					}
				});
			}else{
				console.error('login failed');
			}
		}else{
			console.error(res);
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
		AboutUsAPI.createUser(data, function(res) {//first create user
			if (res) {
				
				/*
				var userid = res.data.id;
				var data = {
					'Company[name]' : urlname,
					'Company[data]' : '',
					'Company[userid]' : userid
				};
				*/
				loginController.loginUser();
				/*
				console.log('token : ' + $.cookie("token"));
				*/
				/*
				 AboutUsAPI.createCompany(data, function(res) { //create company and will redirect to the company
				 //auto login

				 });*/
			} else {
				console.error('login failed');
			}
		});
	}

}
$(function() {
	loginController.initialize();
});

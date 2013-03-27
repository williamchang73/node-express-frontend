/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var loginController = new SWSController;

loginController.initWidget = function() {
	$('#btnLoginUser').hide();
	
	//check if need logout
	if(global_mode == 'logout'){
		$.cookie("user", null);
		$.cookie("token", null);
		$.cookie("urlname", null);
		$('#nav_login').show();
		$('#nav_user').hide();
	}
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

/**
 * we need to login, and get all the companies belong this user
 */
loginController.loginUser = function() {
	console.log('login user');
	var email = $('#email').val();
	var pass = $('#password').val();
	var data = {
		'email' : email,
		'password' : pass
	};
	AboutUsAPI.loginUser(data, function(res) {
		console.log('login user res', res);
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
					console.log('get companies by user : res2', res2);
					if(res2.status == 200 && res2.data.length > 0){ // if exist can not create again
						$.cookie("urlname", res2.data[0].name, {expires : expired});
						window.location.href = '/company/'+res2.data[0].name+'/edit';
					}else if($('#urlname').val()){ //need to create company, only at the first time
						console.log('will also create a compnay');
						AboutUsAPI.createCompany({'Company[name]' : $('#urlname').val()}, data.token, function(res3) {
							console.log('create company res3 : ', res3);
							if(res3.status == 200){
								$.cookie("urlname", res3.data.name, {expires : expired});
								window.location.href = '/company/'+res3.data.name+'/edit';	
							}
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
			console.log('create user res', res);
			if (res) {
				loginController.loginUser();
			} else {
				console.error('login failed');
			}
		});
	}

}


$(function() {
	loginController.initialize();
});

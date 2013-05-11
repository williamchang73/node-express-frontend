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
		$.cookie("company", null);
		window.location.href = '/login';
	}
	
	$('#nav_login').find('a').addClass('active');
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
					if(res2.status == 200 && res2.data.length > 0){ // if exist can not create again
						$.cookie("company", JSON.stringify( {'name' : res2.data[0].name, 'id' : res2.data[0].id } ), {expires : expired});
						window.location.href = '/company/'+res2.data[0].name+'/edit';
					}else if($('#urlname').val()){ //need to create company, only at the first time
						AboutUsAPI.createCompany({'Company[name]' : $('#urlname').val()}, data.token, function(res3) {
							if(res3.status == 200){
								$.cookie("company", JSON.stringify( {'name' : res3.data.name, 'id' : res3.data.id } ), {expires : expired});
								window.location.href = '/company/'+res3.data.name+'/edit';	
							}
						});
					}
				});
			}else{
				console.error('login failed');
			}
		}else{
			console.log('api login failed');
			alert('login failed, please try again later!');
			console.error(res);
		}
	});
}

loginController.loginUserDisplay = function() {
	$('#urlname').hide();
	$('#password2').hide();
	$('#label_urlname').hide();
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
			if (res.status == 200) {
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

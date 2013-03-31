
//user voice
var uvOptions = {};
  (function() {
    var uv = document.createElement('script'); uv.type = 'text/javascript'; uv.async = true;
    uv.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'widget.uservoice.com/kTLcZG7JmmNHmZ9IpDfkNA.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(uv, s);
})();



//check login
$(function() {
	
	
    var token = $.cookie("token");
    var user = $.cookie("user");
    var company = $.cookie("company");
    if(token && user && company && user !=  "null"){
    	user = $.parseJSON(user);
    	company = $.parseJSON(company);
    	$('#nav_login').hide();
    	$('#user_email').text(user.email).append('<b class="caret"></b>');
    	$('#nav_company').find('a').text(company.name).attr('href', '/company/'+company.name+'/edit');
    }else{
    	$('#nav_user').hide();
    }
});


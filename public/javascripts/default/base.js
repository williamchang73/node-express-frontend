
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
    
    if(token && user){
    	user = $.parseJSON(user);
    	console.log(user);
    	$('#nav_login').hide();
    	$('#nav_user').find('a').text(user.email + ' / logout');
    	//$('#nav_company').find('a').text(user.urlname + ' / logout');
    }else{
    	$('#nav_user').hide();
    }
});


var ejs = require('ejs')
  , fs = require('fs');


exports.init = function(req, res) {
	this.req = req;
	this.res = res;
};
exports.render = function(template, option) {
	
	var data = {
		'header' : getHeader(),
		'navibar': getNaviBar(),
		'content': getContent(template, option),
		'footer' : getFooter()
	}
	return this.res.render('default/template', data);
	
};

getContent = function(template, option){
	var tpl = fs.readFileSync(__dirname + '/../views/pages/'+template+'.htm', 'utf8'); 
	return ejs.render(tpl, option);
}

getHeader = function(){
	var tpl = fs.readFileSync(__dirname + '/../views/default/header.htm', 'utf8'); 
	return ejs.render(tpl, {});
}

getNaviBar = function(){
	var tpl = fs.readFileSync(__dirname + '/../views/default/navibar.htm', 'utf8'); 
	return ejs.render(tpl, {});
}


getFooter = function(){
	var tpl = fs.readFileSync(__dirname + '/../views/default/footer.htm', 'utf8'); 
	return ejs.render(tpl, {});
}

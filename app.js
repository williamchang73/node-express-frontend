/**
 * Module dependencies.
 */

var express = require('express'), http = require('http'), fs = require('fs'), path = require('path'), Log = require('log'), log = new Log('info', fs.createWriteStream('./log/abous.log'), engine = require('ejs-locals'), piler = require("piler-compat"));

var app = express();
//var app = require('express');
var srv = http.createServer(app);
var clientjs = piler.createJSManager({
	outputDirectory: __dirname + "/public/build",
    urlRoot: "/build/"
});
var clientcss = piler.createCSSManager({
	outputDirectory: __dirname + "/public/build",
    urlRoot: "/build/"
});

app.configure(function() {


	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('testing', 'testing');
	app.engine('htm', engine);
	app.set('view engine', 'htm');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	//app.use(express.session());
	app.use(app.router);
	app.use(require('less-middleware')({
		src : __dirname + '/public'
	}));
	app.use(express.static(path.join(__dirname, 'public')));

	/* glocal js and css */
	clientjs.bind(app, srv);
	clientcss.bind(app, srv);

	clientcss.addFile("app", __dirname + "/public/3rd_party/bootstrap/css/bootstrap.css");
	clientcss.addFile("app", __dirname + "/public/stylesheets/default/base.css");
	clientcss.addFile("app", __dirname + "/public/stylesheets/default/theme.css");
	clientcss.addFile("app", __dirname + "/public/3rd_party/googlefont/font.css");

	clientjs.addFile("app", __dirname + "/public/3rd_party/bootstrap/js/bootstrap.min.js");
	clientjs.addFile("app", __dirname + "/public/3rd_party/cookies/jquery.cookie.js");
	clientjs.addFile("app", __dirname + "/public/javascripts/default/theme.js");
	clientjs.addFile("app", __dirname + "/public/javascripts/lib/util/swsController.js");

	clientjs.addFile("base", __dirname + "/public/javascripts/default/base.js");

	//index
	clientcss.addFile("page_index", __dirname + "/public/stylesheets/pages/index.view.css");
	clientjs.addFile("page_index", __dirname + "/public/javascripts/pages/index.view.js");

	//login
	clientcss.addFile("page_login", __dirname + "/public/stylesheets/pages/login.view.css");
	clientjs.addFile("page_login", __dirname + "/public/3rd_party/parsley/parsley-standalone.min.js");
	clientjs.addFile("page_login", __dirname + "/public/javascripts/pages/login.view.js");

	//company
	clientcss.addFile("page_company", __dirname + "/public/3rd_party/prettyPhoto/css/prettyPhoto.css");
	clientcss.addFile("page_company", __dirname + "/public/stylesheets/pages/company.view.css");
	clientjs.addFile("page_company", __dirname + "/public/3rd_party/prettyPhoto/js/jquery.prettyPhoto.js");
	clientjs.addFile("page_company", __dirname + "/public/3rd_party/filepicker/filepicker.js");
	clientjs.addFile("page_company", __dirname + "/public/javascripts/pages/company.view.js");

	app.set('clientjs', clientjs);
	app.set('clientcss', clientcss);

});

app.configure('development', function() {
	app.use(express.errorHandler());
});

//for config --------------------
// Load configurations
var env = process.env.NODE_ENV || 'development', config = require('./config/config')[env]

process.env.NODE_ENV = env;

//for routing --------------------
var routes = require('./routes'), index = require('./routes/index'), admin = require('./routes/admin'), login = require('./routes/login'), company = require('./routes/company');

app.get('/', index.index);
//to do need a index file
app.get('/company', company.index);
app.get('/company/:id', company.index);
app.get('/company/:id/edit', company.edit);

app.get('/login', login.login);
app.get('/logout', login.logout);

//admin
app.get('/admin/create_company', admin.createCompany);

srv.listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port') + " ... " + env);
});

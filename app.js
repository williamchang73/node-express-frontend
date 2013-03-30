/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , fs = require('fs')
  , path = require('path')
  , Log = require('log')
  , log = new Log('info', fs.createWriteStream('./log/abous.log')
  ,	engine = require('ejs-locals')
  , piler = require("piler-compat")
);

var app = express();
//var app = require('express');
var srv = http.createServer(app);
var clientjs = piler.createJSManager();
var clientcss = piler.createCSSManager();


app.configure(function(){
	
  clientjs.bind(app, srv);
  clientcss.bind(app, srv);	

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
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.set('clientjs', clientjs);
  app.set('clientcss', clientcss);

  
  /* glocal js and css */
  clientcss.addFile("app", __dirname + "/public/3rd_party/bootstrap/css/bootstrap.css");
  clientcss.addFile("app", __dirname + "/public/stylesheets/default/base.css");
  clientcss.addFile("app", __dirname + "/public/stylesheets/default/theme.css");
  clientcss.addFile("app", __dirname + "/public/3rd_party/googlefont/font.css");
 
  clientjs.addFile("app", __dirname + "/public/3rd_party/bootstrap/js/bootstrap.min.js");
  clientjs.addFile("app", __dirname + "/public/3rd_party/cookies/jquery.cookie.js");
  clientjs.addFile("app", __dirname + "/public/javascripts/default/theme.js");
  clientjs.addFile("app", __dirname + "/public/javascripts/lib/util/swsController.js");

  clientjs.addFile("base", __dirname + "/public/javascripts/default/base.js");
});

app.configure('development', function(){
  app.use(express.errorHandler());
});



//for config --------------------
// Load configurations
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]

process.env.NODE_ENV = env;


//for routing --------------------
var routes = require('./routes')
  , index = require('./routes/index')
  , admin = require('./routes/admin')
  , login = require('./routes/login')
  , company = require('./routes/company');


app.get('/', index.index); //to do need a index file
app.get('/company', company.index);
app.get('/company/:id', company.index);
app.get('/company/:id/edit', company.edit);

app.get('/login', login.login);
app.get('/logout', login.logout);



//admin
app.get('/admin/create_company', admin.createCompany);


srv.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port') +  " ... " + env);
});

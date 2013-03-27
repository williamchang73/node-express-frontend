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
  
);

  
var app = express();
log.info('app start');
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('testing', 'testing');
  //app.engine('htm', require('ejs').renderFile);
  app.engine('htm', engine);
  app.set('view engine', 'htm');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});



//for config --------------------
// Load configurations
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]

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


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

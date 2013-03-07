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
  , mongoose = require('mongoose');

// db connection
mongoose.connect(config.db);

// init models
var models_path = __dirname + '/model';
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file)
})




//for routing --------------------
var routes = require('./routes')
  , index = require('./routes/index')
  , admin = require('./routes/admin')
  , login = require('./routes/login')
  , company = require('./routes/company')
  , api_company = require('./routes/api/company.api');


app.get('/', index.index); //to do need a index file
app.get('/company', company.index);
app.get('/company/:id', company.index);
app.get('/company/:id/edit', company.edit);

app.get('/login', login.login);



//admin
app.get('/admin/create_company', admin.createCompany);



//api
app.post('/api/update_company', api_company.update);
app.post('/api/get_company', api_company.get);
app.post('/api/post_company', api_company.create);



http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

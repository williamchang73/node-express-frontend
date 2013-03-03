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








//for routing --------------------
var routes = require('./routes')
  , index = require('./routes/index')
  , admin = require('./routes/admin')
  , company = require('./routes/company')
  , api_company = require('./routes/api/company.api')


app.get('/', index.index); //to do need a index file
app.get('/company', company.index);
app.get('/company/:id', company.index);
app.get('/company/:id/edit', company.edit);



//admin
/*
app.get('/admin/uploadphotos', admin.uploadphotos);
app.get('/admin/uploaddata', admin.uploaddata);
app.post('/admin/uploaddata', admin.uploaddata);
*/
app.get('/admin/create_company', admin.createCompany);
app.post('/admin/create_company', admin.createCompany);


//api
app.post('/api/update_company', api_company.update);
app.post('/api/get_company', api_company.get);



http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

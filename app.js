
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');


// var index = require('./routes/index');
// Example route
// var user = require('./routes/user');

var home = require('./routes/home');
var requirement = require('./routes/requirement');
var category = require('./routes/category');
var data_functions = require('./routes/data_functions');
var login = require('./routes/login');
var summary = require('./routes/summary')
var app = express();


// all environments
app.set('port', process.env.PORT || 3100);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here

// Webpages
app.get('/', login.viewLogin);
app.get('/home',home.viewHome);
app.get('/requirement/:requirement',requirement.viewRequirement);
app.get('/requirement/:requirement/:category',category.viewCategory);
app.get('/summary', summary.view);
app.get('/debug',home.debug);

// Functions to get data
app.get('/major/:major', data_functions.listTracks);
app.get('/user_login',login.login);
app.post('/save_classes',data_functions.saveClasses);
app.get('/get_classes',data_functions.getClasses);
app.get('/get_all_classes',summary.getAllClasses);
app.post('/get_class_detail',data_functions.getClassDetails);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

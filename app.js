
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

var index = require('./routes/index');
var project = require('./routes/project');
var major = require('./routes/major');
var login = require('./routes/login');
var app = express();

// Add routes here
app.get('/', login.view);
app.get('/index',index.view);
app.get('/project/:name', project.viewProject);
app.get('/university_requirements',project.viewReq);
app.get('/project/:name/:track', project.viewTrack);
app.get('/requirement/:specificRequirement',project.viewSpecificRequirement);
app.get('/requirement/:specificRequirement/:requirementCategory',project.viewCategory);
app.get('/major/:major', major.listTracks);



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
// app.get('/', index.view);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

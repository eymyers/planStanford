
/*
 * GET home page.
 */

 var data = require('../data.json');

exports.viewHome = function(req, res){
	//var username = {"username" : req.session.username};
	//var merged = $.extend({},username,data);
	//var merged = JSON.stringify(JSON.stringify(data) + {"username" : req.session.username});
	//var merged = JSON.concat(data,{"username" : req.session.username});

	//var merged_object = JSON.parse((JSON.stringify(object1) + JSON.stringify(object2)).replace(/}{/g,","))

	console.log(req.session.username);
    res.render('home', {'data' : data, 'username' : req.session.username});
};


exports.debug = function(req,res){
	res.render('debug',{'classes' : data['classes']});
}

exports.assign_major_and_track = function (req,res) {
	var major = 
	var track = 
}
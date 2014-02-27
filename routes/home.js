
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

exports.class_major_track = function (req,res) {
	console.log(req.query);
	console.log("major: "+req.query.majorfield);
	console.log("track: "+req.query.trackfield);
	console.log("class: "+req.query.classfield);
	console.log("program:"+req.query.programyear);
	
	req.session.classyear = req.query.classfield;
	req.session.programyear = req.query.programyear;
	req.session.major = req.query.majorfield;
	req.session.track = req.query.trackfield;
	res.redirect('/requirement/Major');

	// req.session.major = major;
	// req.session.track = track;
}
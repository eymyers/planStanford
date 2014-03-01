
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
	
	req.session.classYear = req.query.classfield;
	req.session.programYear = req.query.programyear;
	major = req.query.majorfield.split("-");
	req.session.major = major[0];
	req.session.majorID = major[1];
	track = req.query.trackfield.split("-");
	req.session.track = track[0];
	req.session.trackID = track[1];
	res.redirect('/requirement/Major');

	// req.session.major = major;
	// req.session.track = track;
}
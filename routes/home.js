
/*
 * GET home page.
 */

 var data = require('../data.json');
 var models = require('../models');

exports.viewHome = function(req, res){
	//var username = {"username" : req.session.username};
	//var merged = $.extend({},username,data);
	//var merged = JSON.stringify(JSON.stringify(data) + {"username" : req.session.username});
	//var merged = JSON.concat(data,{"username" : req.session.username});

	//var merged_object = JSON.parse((JSON.stringify(object1) + JSON.stringify(object2)).replace(/}{/g,","))

	if(!req.session.login){
		res.redirect("/login");
	}else{
		console.log(req.session.username);
    	res.render('home', {'data' : data, 'username' : req.session.username});
	}
};


exports.debug = function(req,res){
	res.render('debug',{'classes' : data['classes']});
}

exports.debug2 = function(req,res){
	models.userData.find({}).exec(function(err,data){
		if(err) console.log(err);
		res.send(data);
	});
	// models.Project.find({'title':'dopesauce'}).exec(afterQuery);

	// function afterQuery(err,name){
	// 	if(err) console.log(err);
	// 	console.log(name.length);
	// 	if(!name.length){
	// 		newData = {'title':"dopesauce"};
	// 		var data = new models.Project(newData);
	// 		data.save(afterSaving);
	// 		console.log("Added dopesauce!");
	// 	}

	// 	function afterSaving(err){
	// 		if(err){
	//   			console.log(err);
	//   			res.send(500);
	// 		}
	// 		res.send(200);
	// 	}
	// }

	// models.Project.find({}).exec(sendData);
	// function sendData(err,data){
	// 	if(err) console.log(err);
	// 	res.send(data);
	// }
}


exports.class_major_track = function (req,res) {
	console.log(req.query);
	console.log("major: "+req.query.majorfield);
	console.log("track: "+req.query.trackfield);
	console.log("class: "+req.query.classfield);
	console.log("program:"+req.query.programyear);
	//console.log(req.query.University_Button);
	//console.log(req.query.Choice_Button);
	
	
	if(req.query.Choice_Button == "Major"){
		req.session.classYear = req.query.classfield;
		req.session.programYear = req.query.programyear;
		major = req.query.majorfield.split("-");
		req.session.major = major[0];
		req.session.majorID = major[1];
		track = req.query.trackfield.split("-");
		req.session.track = track[0];
		req.session.trackID = track[1];
	}

	if(req.query.Choice_Button == "University"){
		req.session.classYear = req.query.classfield;
	}

	models.userData.find({'userID':req.session.username}).exec(update);

	function update(err,data){
		data[0].classYear = req.query.classfield;
		data[0].programYear = req.query.programyear;
		data[0].majorName = req.session.major;
		data[0].majorID = req.session.majorID;
		data[0].trackName = req.session.track;
		data[0].trackID = req.session.trackID;
		data[0].save();
	}

	res.redirect('/requirement/'+req.query.Choice_Button);

	// req.session.major = major;
	// req.session.track = track;
}










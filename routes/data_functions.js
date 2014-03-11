var data = require ('../data.json');
var courseData = require('../courseData.json');
var courseMap = require('../courseMap.json');
var models = require('../models');


// Function used to populate form in home.page
// home.html
exports.listTracks = function(req, res) { 
	var major = req.params.major;
	console.log(major);
	var courseList = data[major]['tracks'];
	var populate = false;
	var trackID;
	if(req.session.track){
		populate = true;
		trackID = req.session.trackID;
	}
	res.send({'tracks':courseList,"populate":populate,"trackID":trackID});
}

exports.saveClasses = function(req,res){
	var classes = req.body.classes;
	addToClasses(req,classes);
	console.log("In saveClasses");
	console.log(req.session.current_classes);

	models.userData.find({'userID':req.session.username}).exec(update);

	function update(err,data){
		var category = req.session.current_category;
		var requirement = req.session.current_requirement;
		var categoryClasses = req.session.current_classes[requirement][category];
		data[0].major[category] = categoryClasses;
		data[0].save();
		res.json({"requirement":req.session.requirement});	
	}

	//res.json({"requirement":req.session.requirement});	


}

exports.getClasses = function(req,res){
	console.log("getClasses");
	//console.log(JSON.stringify(req.query));
	//var category = req.query.category;
	var category = req.session.current_category;
	var requirement = req.session.current_requirement;
	console.log(category);
	if(category){
		var classes = null;
		console.log(req.session.current_classes);
		try{
			classes = req.session.current_classes[requirement][category];
		}
		catch(err){
			console.log("ERROR");
			console.log(err);
		}
		console.log(classes);
		res.json({'classes':classes});
	}else{
		res.json({'classes':"No classes"});
	}
}

// exports.getFormDetails = function(req,res){
// 	var classYear, programYear, major, track, majorID, trackID;
// 	if(req.session.classYear){
// 		classYear = req.session.classYear;
// 	}
// 	if(req.session.programYear){
// 		programYear = req.session.programYear;
// 	}
// 	if(req.session.major){
// 		major = req.session.major;
// 		majorID = req.session.majorID;
// 	}
// 	if(req.session.track){
// 		track = req.session.track;
// 		trackID = req.session.trackID;
// 	}
// 	res.json(
// 		{'classYear': classYear, 
// 		'programYear': programYear,
// 		'major': major, 
// 		'track': track,
// 		'majorID' : majorID,
// 		'trackID' : trackID});
// }

exports.getFormDetails = function(req,res){
	models.userData.find({'userID':req.session.username}).exec(function(err,user){
		if(user.length == 1){
			console.log("Taking from database");
			console.log(user[0].trackName);
			console.log(user[0].trackID);

			req.session.classYear = user[0].classYear;
			req.session.programYear =  user[0].programYear;
			req.session.major = user[0].majorName;
			req.session.majorID = user[0].majorID;
			req.session.track = user[0].trackName;
			req.session.trackID = user[0].trackID;

			var classYear, programYear, major, track, majorID, trackID;
			if(req.session.classYear){
				classYear = req.session.classYear;
			}
			if(req.session.programYear){
				programYear = req.session.programYear;
			}
			if(req.session.major){
				major = req.session.major;
				majorID = req.session.majorID;
			}
			if(req.session.track){
				track = req.session.track;
				trackID = req.session.trackID;
			}
			res.json(
				{'classYear': classYear, 
				'programYear': programYear,
				'major': major, 
				'track': track,
				'majorID' : majorID,
				'trackID' : trackID});
				}
	});
}


function addToClasses(req, classesPicked){
	var category = req.session.current_category;
	var requirement = req.session.current_requirement;
	console.log("Category " + category);
	console.log("Current category " + req.session.current_category);
	console.log("classes " + classesPicked);
	var current_classes = req.session.current_classes[requirement][category];
	var on_elective = req.session.on_elective;
	var newClassList = [].concat(current_classes);
	var classNumber = current_classes.length;
	console.log("Class Number" + classNumber);
	console.log(newClassList);



	var required = data['requirements']['Major']['2014']['Computer Science'];
	var classes_in_category;
	var class_electives;
	for(var i=0; i< required.length; i++){
    	var obj = required[i];
     	if(obj.name == category){
        	classes_in_category = obj.classes;
        	class_electives = obj.electives;
      	}
    }


	// If current_classes isn't created, create it and add classes
	if(!req.session.current_classes){
		req.session.current_classes = {};
	}

	// Requirement doesn't exist;
	if(!req.session.current_classes[requirement]){
			req.session.current_classes[requirement] = {}
	}
	else if(req.session.current_classes[requirement][category]){
		if(typeof classesPicked !=='undefined'){
			if(on_elective){
				for(var i = 0; i<current_classes.length; i++){
					if( classesPicked.indexOf(current_classes[i]) < 0 && class_electives.indexOf(current_classes[i]) > -1){
						newClassList.splice(newClassList.indexOf(current_classes[i]),1);
											console.log(newClassList);

					}
				}
			}else{ // should be on required classes
				for(var i = 0; i<current_classes.length; i++){
					console.log(i);
					if(classesPicked.indexOf(current_classes[i]) < 0 && classes_in_category.indexOf(current_classes[i]) > -1){
						newClassList.splice(newClassList.indexOf(current_classes[i]),1);

					}
				}
			}

			// Add new classes
			for(var i = 0; i<classesPicked.length; i++){

				var index = current_classes.indexOf(classesPicked[i]);
				if(index < 0){
					newClassList.push(classesPicked[i]);
				}
			}
		}else{
			if(on_elective){
				for(var i = 0; i<current_classes.length; i++){
					if(class_electives.indexOf(current_classes[i]) > -1){
						newClassList.splice(newClassList.indexOf(current_classes[i]),1);

					}
				}
			}else{ // should be on required classes
				for(var i = 0; i<current_classes.length; i++){
					if(classes_in_category.indexOf(current_classes[i]) > -1){
						newClassList.splice(newClassList.indexOf(current_classes[i]),1);

					}
				}
			}
		}
		req.session.current_classes[requirement][category] = newClassList;

	}else{
		req.session.current_classes[requirement][category] = classes;
	}
	
}
function isNumeric(num){
    return !isNaN(num)
}
exports.getClassDetails = function(req,res){
	var class_name = req.body.class;
	
	class_name = class_name.substr('info-'.length);
	console.log("Class Name ");
	class_name_upper = class_name.toUpperCase();
	console.log(class_name);

	var classPrefix = "";
	for(var i = 0; i<class_name.length; i++){
		if(isNaN(class_name[i])){
			console.log(class_name[i]);
			var buf = class_name[i];
			classPrefix = classPrefix + buf.toUpperCase();
		}else{ //This is to prevent grabbing A on CS106A
			break;
		}
	}
	console.log("Class prefix");
	console.log(classPrefix);
	var department = courseMap[classPrefix];
	console.log(department);
	var description = courseData[department][class_name_upper]['description'];
	var title = courseData[department][class_name_upper]['title'];
	console.log(description);
	res.json({'message' : description, 'class' : class_name, 'title' : title});
}












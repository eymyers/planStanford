 var courseData = require('../courseData.json');
 var courseMap = require('../courseMap.json');
 var data = require('../data.json');
 var models = require('../models');


exports.view = function(req, res){
	if(!req.session.login){
		res.redirect("/login");
	}else{
		var programYear;
		if(req.session.programYear){
			programYear = req.session.programYear;
		}
		saveData(req,res);
	    res.render('summary',{'programYear':programYear});
	}
};

function saveData(req,res){
	var allClasses = req.session.current_classes;
	var categories = data['requirements']['Major']['2014']['Categories'];
	// var saveThisData = new models.userData();

	// saveThisData.classYear = req.session.classYear;
	// saveThisData.programYear = req.session.programYear;
	// saveThisData.major = ;
	// saveThisData.specialization = ;


	console.log(allClasses);
	models.userData.find({'userID':req.session.username}).exec(update);

	function update(err,data){
		console.log(data[0]);
		console.log(data[0].major.Math);
		for(var i = 0; i < categories.length; i++){
			var cat = categories[i];
			console.log(cat);
			if(allClasses['Major'][cat]){
				data[0].major[cat] = allClasses['Major'][cat];
			}
		}
		data[0].save();

	}

	// for(var i = 0; i < categories.length; i++){
	// 	var cat = categories[i];
	// 	if(allClasses['Major'][cat]){
	// 		console.log(cat);
	// 		//saveThisData.major[cat] = allClasses['Major'][cat];
	// 		models.userData.find({'userID':req.session.username}).exec(update);
		
	// 		//saveThisData.save(afterSaving);
	// 		function update(err,data){
	// 			if(err){
	// 		  		console.log(err);
	// 			}
	// 			console.log(data);
	// 			console.log(cat);
	// 			data.major[cat] = allClasses['Major'][cat];
	// 			data.save();
	// 		}
	// 	}
	// }
	// models.userData.find({}).exec(function(err,data){
	// 			res.send(data);
	// 		});	
}

exports.getAllClasses = function(req,res){
	var allClasses = req.session.current_classes;
	console.log(allClasses);
	var categories = data['requirements']['Major']['2014']['Categories'];
	var unitCount = {};
	for(var i = 0; i < categories.length; i++){
		var cat = categories[i];
		var unitsCompleted = 0;
		if(allClasses['Major'][cat]){
			unitsCompleted = getUnitCount(allClasses,cat);
		}
		var unitsNeeded = findUnitsRequired(cat,"Computer Science");
		var classesRequired = getClassesRequired(cat,"Computer Science");
		unitCount[cat] = {'unitsCompleted' : unitsCompleted, 'unitsNeeded' : unitsNeeded, 'classesRequired' : classesRequired};

	}
	console.log(unitCount);
	allClasses['units'] = unitCount;
	allClasses['categories'] = categories;
	allClasses['map'] = data['Requirement_Map'];
	console.log(allClasses);
	res.send(allClasses);
}

function getClassesRequired(category, major){
	var classesNeeded;
	var major = data['requirements']['Major']['2014'][major];
	for(var i=0; i< major.length; i++){
	    var obj = major[i];
	    if(obj.name == category){
	    	if(obj.unitsRequired != "One Class"){
	    		console.log("String comparison Worked!");
	    		console.log(obj.unitsRequired);
	    		classesNeeded = obj.classes;
	    	}else{
	    		classesNeeded = obj.unitsRequired;
	    	}
	      break;
	    }
  	}
  	return classesNeeded;
}

function findUnitsRequired(category,major){
	var unitsRequired;
	var major = data['requirements']['Major']['2014'][major];
	for(var i=0; i< major.length; i++){
	    var obj = major[i];
	    if(obj.name == category){
	      unitsRequired = obj.unitsRequired;
	      break;
	    }
  	}
  	return unitsRequired;
}

function getUnitCount(allClasses,category){
	var units = 0;
	var class_name;
	for(var i = 0; i < allClasses['Major'][category].length; i++){
		class_name = allClasses['Major'][category][i];
		var classPrefix = "";
		for(var j = 0; j<class_name.length; j++){
			if(isNaN(class_name[j])){
				classPrefix = classPrefix + class_name[j];
			}else{ //This is to prevent grabbing A on CS106A
				break;
			}
		}
		var department = courseMap[classPrefix];
		console.log(department);
		console.log(class_name);
		if(courseData[department][class_name]){
			units = units + courseData[department][class_name]['units'];
		}
	}
	return units;
}
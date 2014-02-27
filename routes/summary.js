 var courseData = require('../courseData.json');
 var courseMap = require('../courseMap.json');
 var data = require('../data.json');


exports.view = function(req, res){
    res.render('summary');
};

exports.getAllClasses = function(req,res){
	var allClasses = req.session.current_classes;
	var categories = data['requirements']['Major']['2014']['Categories'];
	var unitCount = {};
	for(var i = 0; i < categories.length; i++){
		var cat = categories[i];
		var units = 0;
		if(allClasses['Major'][cat]){
			units = getUnitCount(allClasses,cat);
		}
		var maxUnits = findUnit(cat,"Computer Science");
		unitCount[cat] = {'unitsCompleted' : units, 'unitsNeeded' : maxUnits};
	}
	console.log(unitCount);
	allClasses['units'] = unitCount;
	allClasses['categories'] = categories;
	console.log(allClasses);
	res.send(allClasses);
}

function findUnit(category,major){
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
		units = units + courseData[department][class_name]['units'];
	}
	return units;
}
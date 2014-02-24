var data = require ('../data.json');

// Function used to populate form in home.page
// home.html
exports.listTracks = function(req, res) { 
	var major = req.params.major;
	var courseList = data[major]['tracks'];
	res.json(courseList);
}

exports.saveClasses = function(req,res){
	var classes = req.body.classes;
	addToClasses(req,classes);
	console.log("In saveClasses");
	console.log(req.session.current_classes);
	res.json(JSON.stringify(classes));	
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

function addToClasses(req, classes){
	var category = req.session.current_category;
	var requirement = req.session.current_requirement;
	console.log("Category " + category);
	console.log("Current category " + req.session.current_category);
	console.log("classes " + classes);


	if(!req.session.current_classes){
		// If current_classes isn't created, create it and add classes
		req.session.current_classes = {};
	}
	if(!req.session.current_classes[requirement]){
			req.session.current_classes[requirement] = {}
	}
	req.session.current_classes[requirement][category] = classes;
	
}

exports.getClassDetails = function(req,res){
	var class_name = req.body.class;
	console.log(class_name);
	res.json({'message' : "Nothing yet", 'class' : class_name});
}
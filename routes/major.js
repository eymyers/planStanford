var data = require ('../data.json');

//Returns course array
exports.listTracks = function(req, res) { 
	var major = req.params.major;
	var courseList = data[major]['tracks'];
	console.log("Where the fuck is this being called");
	res.json(courseList);
}

exports.saveClasses = function(req,res){
	var classes = req.body.classes;
	var category = req.body.category;
	var requirement = req.body.requirement;
	addToClasses(req,category,classes);
	console.log("In saveClasses");
	console.log(req.session.current_classes);
	res.json(JSON.stringify(classes));	
}

exports.getClasses = function(req,res){
	console.log(JSON.stringify(req.query));
	var category = req.query.category;
	var specificRequirement = req.session.current_specificRequirement;
	console.log(category);
	if(category){
		var classes = null;
		try{
			classes = req.session.current_classes[specificRequirement][category];
		}
		catch(err){
			console.log(err);
		}
		console.log("in get classes");
		console.log(classes);
		res.json({'classes':classes});
	}else{
		res.send("No classes");
	}
}

function addToClasses(req,category, classes){
	console.log("Category " + category);
	console.log("Current category " + req.session.current_category);
	console.log("classes " + classes);
	category2 = req.session.current_category;
	specificRequirement = req.session.current_specificRequirement;

	if(!req.session.current_classes){
		// If current_classes isn't created, create it and add classes
		req.session.current_classes = {};
	}
	if(!req.session.current_classes[specificRequirement]){
			req.session.current_classes[specificRequirement] = {}
	}
	req.session.current_classes[specificRequirement][category2] = classes;
	
}
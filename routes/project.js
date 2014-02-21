var data = require('../data.json');


exports.viewProject = function(req, res) { 
  // controller code goes here 
  var name = req.params.name;
  console.log("The project name is: " + name);
  tracks = data[name]["tracks"];
  console.log(tracks);
  res.render('major', {
    "tracks" : tracks,
    'major' : name
  });
};


exports.viewTrack = function(req,res){
	var name = req.params.name;
	console.log("The project name is: " + name);
	res.render('tracks',{
		'trackName' : name
	});
};

exports.viewReq = function(req, res) { 
  res.render('unireq');
};

exports.viewTrack = function(req, res) { 
  var name = req.params.name;
  var track = req.params.track;
  classes = data['classes']
  res.render('inprogress',{"classes" : classes});
};

exports.viewSpecificRequirement = function(req,res){
  // Don't know why the fuck this doesn't work
  // req.session.universityYear = "2014";
  // if(req.session.universityYear){
  //   uniYear = req.session.universityYear;
  // }

  // req.session.current_classes = ["WTF"];
  var current_classes = req.session.current_classes;
  if(req.session.current_classes){
    console.log("It thinks there are current_classes in the session.");
    console.log(req.session.current_classes);
  }
  else{
    console.log("no classes");  
  }

  var uniYear = "2014";
  //console.log(uniYear);
  var specificRequirement = req.params.specificRequirement;
  //console.log(specificRequirement);
  if(specificRequirement != "University" && specificRequirement != "Major"){
    res.render('home'); 
  }
  var requirements = data['requirements'][specificRequirement][uniYear];
  //console.log(requirements);
  res.render('requirements',{
    "name" : specificRequirement,
    "requirements" : requirements,
    "classes" : current_classes
  });
}

exports.viewCategory = function(req,res){

  var uniYear = "2014";
  var category = req.params.requirementCategory;
  var specificRequirement = req.params.specificRequirement;
  var requirements = data['requirements'][specificRequirement][uniYear];
  //console.log(requirements);
  req.session.current_category = category;
  req.session.current_specificRequirement = specificRequirement;

  var classes_in_category;

  for(var i=0; i< requirements.length; i++){
    var obj = requirements[i];
    if(obj.name == category){
      classes_in_category = obj.classes;
    }
  }

  var current_classes = null;
  try{
    current_classes = req.session.current_classes[category];
    console.log("in view category");
    console.log(current_classes);
  }catch(err){
    console.log(err)
    console.log("Not classes in that category");
  }


  res.render("category",{
    "requirement" : specificRequirement, 
    "category" : category, 
    "classes" : classes_in_category,
    "current_classes" : current_classes
  });
}

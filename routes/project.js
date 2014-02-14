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
  var uniYear = "2014";
  console.log(uniYear);
  var specificRequirement = req.params.specificRequirement;
  console.log(specificRequirement);
  if(specificRequirement != "University" && specificRequirement != "Major"){
    res.render('home'); 
  }
  var requirements = data['requirements'][specificRequirement][uniYear];
  console.log(requirements);
  res.render('requirements',{
    "name" : specificRequirement,
    "requirements" : requirements
  });
}

exports.viewCategory = function(req,res){
  var uniYear = "2014";
  var category = req.params.requirementCategory;
  var specificRequirement = req.params.specificRequirement;
  var requirements = data['requirements'][specificRequirement][uniYear];
  //console.log(requirements);
  var classes;

  for(var i=0; i< requirements.length; i++){
    var obj = requirements[i];
    if(obj.name == category){
      classes = obj.classes;
    }
  }

  res.render("category",{
    "requirement" : specificRequirement, 
    "category" : category, 
    "classes" : classes
  });
}

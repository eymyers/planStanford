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


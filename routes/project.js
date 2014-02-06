

exports.viewProject = function(req, res) { 
  // controller code goes here 
  var name = req.params.name;
  console.log("The project name is: " + name);
  res.render('project', 
  {
    'projectName': name,
  	'majors' : [
    {
      'major' : 'Computer Science',
      'tracks' : ['Artificial Intelligence','Systems','Human Computer Interaction']
    },
    {
      'major' : 'Electrical Engineering',
      'tracks' : ['Computer Software', 'Signals and Systems', 'Circuits']
    }
  ]});
};

exports.viewTrack = function(req,res){
	var name = req.params.name;
	console.log("The project name is: " + name);
	res.render('tracks',{
		'trackName' : name
	});
};


exports.view = function(req, res){
	res.render('project', {
    'majors' : [
    {
      'major' : 'Computer Science',
      'tracks' : ['Artificial Intelligence','Systems','Human Computer Interaction']
    },
    {
      'major' : 'Electrical Engineering',
      'tracks' : ['Computer Software', 'Signals and Systems', 'Circuits']
    }
  ]  
  });
};
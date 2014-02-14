var data = require ('../data.json');

//Returns course array
exports.listTracks = function(req, res) { 
	var major = req.params.major;
	var courseList = data[major]['tracks'];
	res.json(courseList);
}
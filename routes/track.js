exports.viewTrack = function(req, res) { 
	var name = req.params.name;
	var track = req.params.track;
 	res.render('inprogress');
};
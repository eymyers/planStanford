exports.view = function(req, res){
    
    res.render('summary');
};

exports.getAllClasses = function(req,res){
	var allClasses = req.session.current_classes;
	console.log(allClasses);
	res.send(allClasses);
}
exports.viewLogin = function(req, res){
    res.render('login');
};

exports.login = function(req,res){
	var username = req.query.username;
	var password = req.query.password;

	req.session.username = username;

	console.log(username);
	console.log(password);

	res.redirect('/home');
}
var models = require('../models');
var data = require('../data.json');

exports.viewLogin = function(req, res){
	req.session.login = false;
    res.render('login');
};

exports.logout = function(req,res){
	req.session.destroy();
	//req.session = null;
	//req.session.login = false;
	//req.session.create();
	res.render('login');
}

exports.sign_up_page = function(req,res){
	res.render('sign_up');
}

exports.create_account = function(req,res){
	var email = req.body.email;
	var password = req.body.password;
	models.userData.find({'userID':email}).exec(function(err,user){
		if(user.length == 0){
			console.log("user doesn't exist");
			console.log("creating account");
			var newUser = new models.userData();
			newUser.userID = email;
			newUser.password = password;
			newUser.save(afterSaving);
			function afterSaving(err){
				if(err){
					console.log(err);
					res.send(500);
				}else{
					console.log("Redirecting to home");
					res.render('summary');
				}
			}
			req.session.login = true;
			//res.render('home',{'username':email});
			res.redirect('/home');
		}else{
			console.log("User already exists");
			res.render('login',{"message":"User account already exists."});
		}
	});
}

exports.login = function(req,res){
	// var email = req.query.email;
	// var password = req.query.password;

	var email = req.body.email;
	var password = req.body.password;

	req.session.username = email;
	console.log(email);
	console.log(password);
	var allClasses;

	models.userData.find({'userID':email}).exec(function(err,user){
		if(user.length == 0){
			console.log("user doesn't exist");
			// var newUser = new models.userData();
			// newUser.userID = email;
			// newUser.password = password;
			// newUser.save(afterSaving);
			// function afterSaving(err){
			// 	if(err){
			// 		console.log(err);
			// 		res.send(500);
			// 	}else{
			// 		res.redirect('/home');
			// 	}
			// }
			res.render('login',{"message":"User account does not exist."});

		}else{ //user has been created
			console.log(user)
			console.log(user[0].password);
			console.log(password);
			if(user[0].password != password){
				console.log("passwords didn't equal");
				res.redirect('/');
			}else{
				console.log("Passwords equaled");
				req.session.login = true;
				var categories = data['requirements']['Major']['2014']['Categories'];
				req.session.current_classes = { "Major" : {} };
				for(var i = 0; i< categories.length; i++){
					var classes = user[0].major[categories[i]];
					var makeClass = [];
					for(var j = 0; j<classes.length; j++){
						makeClass.push(String(classes[j]));
						console.log(user[0].major[categories[i]][j]);				
					}
					req.session.current_classes["Major"][String(categories[i])] = makeClass;
					// console.log("Printing out classes");
					// req.session.current_classes = allClasses;
					// console.log(allClasses);
					console.log(req.session.current_classes);
				}
				// res.render('home',{username:email});
				res.redirect('/home');
			}
		}
	});
}

var data = require('../data.json');

exports.viewRequirement = function(req,res){
  // req.session.universityYear = "2014";
  // if(req.session.universityYear){
  //   uniYear = req.session.universityYear;
  // }

  if(!req.session.login){
    res.redirect("/login");
  }else{

    var current_classes = req.session.current_classes;
    if(req.session.current_classes){
      console.log(req.session.current_classes);
    }
    else{
      console.log("no classes");  
    }

    var uniYear = "2014";
    //console.log(uniYear);
    var requirement = req.params.requirement;
    req.session.requirement = req.params.requirement;
    //console.log(specificRequirement);
    if(requirement != "University" && requirement != "Major"){
      res.render('home'); 
    }
    var major = 'Computer Science';
    if(requirement == 'University'){
      major = "Buffer";
      res.render("comingsoon",{"name":requirement});
    }
    var requirements = data['requirements'][requirement][uniYear][major];
    //console.log(requirements);
    res.render('requirements',{
      "name" : requirement,
      "requirements" : requirements,
      "classes" : current_classes
    });
  }
}
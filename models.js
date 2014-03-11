var Mongoose = require('mongoose');

var UserData_Classes = new Mongoose.Schema({
  // fields are defined here
  "userID" : String, //email
  "password" : String,
  "classYear" : String,
  "programYear" : String,
  "majorName" : String,
  "majorID" : String,
  "trackName" : String,
  "trackID" : String,
  "major" : {
  	"Math" : Array,
  	"Science" : Array,
  	"Technology in Society" : Array,
  	"Engineering Fundamental" : Array,
  	"Writing in the Major" : Array,
  	"Core" : Array,
  	"Specialization" : Array,
  	"Senior Project" : Array
  	}
});
exports.userData = Mongoose.model('Project', UserData_Classes);
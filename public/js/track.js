'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	console.log("Page Ready");
	initializePage();
});

var category;

function initializePage(){

	category = $(".class")[0].name;
	console.log("Category is");
	console.log(category);


	$.get("/get_classes", {'category' : category}, getClasses);

	$(".class").click(function(){
		console.log(this.id);
		console.log("Icon clicked");
		console.log(".test #" + this.id);
		$("#" + this.id).toggleClass("classPicked");
		$(".button #" + this.id).toggleClass("btn-danger");
	});

	$(".save_button").click(function(){
		var allClasses = $(".classPicked");
		var classes = [];
		var category = null; 
		//var requirement = null;
		allClasses.each(function(){
			var classTaking = $(this).attr('id');
			if(!category){
				category = $(this).attr('name');
			}
			/*
			if(!requirement){
				requirement = $(this.attr(''))
			}
			*/
			console.log($(this).attr('id'));
			classes.push(classTaking);
		});
		console.log(category);
		$.post("/save_classes",
			{"classes" : classes, 
			"requirement" : null,
			"category" : category}, 
			saveClasses);

	});
}

function saveClasses(result){
	console.log("Do nothing...");
	console.log(result);
}

function getClasses(result){
	var current_classes = result['classes'];
	console.log(result['classes']);
	console.log("Get classes");
	console.log(category);
	for(var i = 0; i < current_classes.length; i++){
		console.log('#'+current_classes[i]);
		$('#'+current_classes[i]).toggleClass("classPicked");
		$('.button #'+current_classes[i]).toggleClass("btn-danger");

	}
	//toggle class to active for every class passed in
}
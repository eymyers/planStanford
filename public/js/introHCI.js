'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	console.log("Page Ready");
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Page Ready");
	// add any functionality and listeners you want here
	$(".test").click(function(){
		console.log("Changing class");
		$(".test").toggleClass("activeMajor");
	});
	
	//$(".test").click(changeClass());

	$(".getAll").click(function(){
		console.log("Hopefully getting all elements");
		var ele = $(".activeMajor p");
		// console.log(ele);
		// var len = ele.length;
		// for(var i = 0; i<len; i++){
		// 	console.log(ele[i].text);
		// }
		var classes = []
		ele.each(function(){
			var classTaking = $(this).text();
			console.log($(this).text());
			classes.push(classTaking);
		});
		var item = {}
		item["classes"] = classes;
		console.log(JSON.stringify(item));


	});

}

function changeClass(e){
  console.log("Changing class");
  $(".test").toggleClass("activeMajor");
}
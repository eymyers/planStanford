'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	console.log("Page Ready");
	initializePage();
})

function initializePage(){
	console.log("In track.js");
	$(".test").click(function(){
		console.log(this.id);
		console.log("Icon clicked");
		console.log(".test #" + this.id);
		$("#" + this.id).toggleClass("iconClicked");
	});
}
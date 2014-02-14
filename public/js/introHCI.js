'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Page Ready");
	// add any functionality and listeners you want here
	$('#classfield').change(toggleUniReqButton);
	$('#majorfield').change(toggleConcentrationField);
	$('#trackfield').change(toggleConcentrationButton);
	
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

// Toggles visibility of Button under University Requirements
function toggleUniReqButton() {
	console.log("Reached toggleUniReqButton");
	var year = document.getElementById('classfield').value;
	console.log("year" + year);
	if(year === "0") {
		document.getElementById('classButton').style.visibility="hidden";
	} else {
		document.getElementById('classButton').style.visibility="visible";	
	}
}

// Toggles visibility of Select Concentration Dropdown
function toggleConcentrationField() {
	console.log("Reached toggleConcentrationField");
	document.getElementById('trackfield').innerHTML='';
	var maj = document.getElementById('majorfield').value;
	
	console.log("major" + maj);
	if(maj === "0") {
		document.getElementById('trackTitle').style.visibility="hidden";
		document.getElementById('trackfield').style.visibility="hidden";

	} else {
		$.get("/major/" + maj, populateConcentration);
		console.log("/major/" + maj);
		document.getElementById('trackTitle').style.visibility="visible";
		document.getElementById('trackfield').style.visibility="visible";
		document.getElementById('majorButton').style.visibility="hidden";	
	}
}

function populateConcentration(result) {
	console.log(result.length);
	var dropdown = document.getElementById('trackfield');
	var el1 = document.createElement("option");
	el1.textContent = "-- Select Track --";
	el1.value = '0';
	dropdown.appendChild(el1);
	for(var i = 0; i < result.length; i++) {
		var el = document.createElement("option");
        el.textContent = result[i];
        el.value = result[i];
        dropdown.appendChild(el);
	}
	// .style.visibility="visible";
	
	// {{#each tracks}}
	// 	<option value="track">{{this}}</option>
	// {{/each}}
}

// Toggles visibility of Button under Major Requirements
function toggleConcentrationButton() {
	console.log("Reached toggleConcentrationButton");
	var track = document.getElementById('trackfield').value;
	console.log("track" + track);
	if(track === "0") {
		document.getElementById('majorButton').style.visibility="hidden";
	} else {
		document.getElementById('majorButton').style.visibility="visible";	
	}
}
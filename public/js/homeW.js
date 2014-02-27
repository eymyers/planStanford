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
	
}


// Toggles visibility of Button under University Requirements
function toggleUniReqButton() {
	console.log("Reached toggleUniReqButton");
	var year = document.getElementById('classfield').value;
	console.log("year" + year);
	//req.session.year = year;
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
	//req.session.major = maj;
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
	//req.session.track = track;
	console.log("track" + track);
	if(track === "0") {
		document.getElementById('majorButton').style.visibility="hidden";
	} else {
		document.getElementById('majorButton').style.visibility="visible";	
	}
}
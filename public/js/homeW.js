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
	$('#programfield').change(togglemajorField);
	$('#majorfield').change(toggleConcentrationField);
	$('#trackfield').change(toggleConcentrationButton);
}

// Toggles visibility of Button under University Requirements
function toggleUniReqButton() {
	console.log("Reached toggleUniReqButton");
	var year = document.getElementById('classfield').value;
	console.log("year" + year);
	if(year === "0") {
		$('#classButton').attr('disabled', 'disabled');
	} else {
		$('#classButton').removeAttr('disabled');
	}
	toggleConcentrationButton();
}

function togglemajorField() {
	console.log("Reached togglemajorField");
	var major = document.getElementById('programfield').value;
	if(major === "0") {
		$('#majorfield').attr('disabled', 'disabled');
	} else {
		$('#majorfield').removeAttr('disabled');
	}
	toggleConcentrationButton();
}

// Toggles disabling of Select Concentration Dropdown
function toggleConcentrationField() {
	console.log("Reached toggleConcentrationField");
	document.getElementById('trackfield').innerHTML='';
	var maj = document.getElementById('majorfield').value;
	console.log("major" + maj);
	if(maj === "0") {
		$('#trackfield').attr('disabled', 'disabled');
		toggleConcentrationButton();
	} else {
		$.get("/major/" + maj, populateConcentration);
		console.log("/major/" + maj);
		$('#trackfield').removeAttr('disabled');
		
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
	toggleConcentrationButton();
}

// Toggles visibility of Button under Major Requirements
function toggleConcentrationButton() {
	console.log("Reached toggleConcentrationButton");
	var classYear = document.getElementById('classfield').value;
	var programYear = document.getElementById('programfield').value;
	var major = document.getElementById('majorfield').value;
	var track = document.getElementById('trackfield').value;
	console.log("track" + track);
	if(track === "0" || major === "0" || programYear === "0" || classYear === "0") {
		$('#majorButton').attr('disabled', 'disabled');
		//document.getElementById('majorButton').style.visibility="hidden";
	} else {
		$('#majorButton').removeAttr('disabled');
		//document.getElementById('majorButton').style.visibility="visible";	
	}
}
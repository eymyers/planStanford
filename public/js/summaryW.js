
// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	console.log("Page Ready");
	initializePage();
});

function initializePage(){
	//google.load("visualization", "1", {packages:["corechart"]});
	$.get("/get_all_classes",classData);
}

var structuredDataForGraph;

function classData(data){
	console.log(data);

	var fullHtml = "";
	for(var i = 0; i<data['categories'].length; i++){
		var category = data['categories'][i];
		var unitsCompleted = data['units'][category]['unitsCompleted'];
		var unitsNeeded = data['units'][category]['unitsNeeded'];
		var html = "<tr> <td>" + category + "</td> <td>"+unitsCompleted+"</td> <td>"+unitsNeeded+"</td> </tr>";
		fullHtml = fullHtml.concat(html);
	}
	console.log(fullHtml);
	$('.table-body').html(fullHtml);
}

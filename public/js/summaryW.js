
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
		var categoryName = category;
		if(category == "Specialization"){
			console.log("found specializaiton!");
			categoryName = data['special'];
		}
		var unitsCompleted = data['units'][category]['unitsCompleted'];
		var unitsNeeded = data['units'][category]['unitsNeeded'];
		var classesRequired = data['units'][category]['classesRequired'];
		//var html = "<tr> <td>" + category + "</td> <td>"+unitsCompleted+"</td> <td>"+unitsNeeded+"</td> </tr>";
	
		var html = '<tr><td> <div class=\"accordion\" id=\"accordion' + data['map'][category] + '\"> <div class=\"accordion-group\"> <div class=\"accordion-heading\"><a class=\"accordion-toggle\" data-toggle=\"collapse\" style="color: #b42121;" data-parent=\"#accordion' + data['map'][category] + '\" href=\"#collapse' + data['map'][category] + '\"> <h5 class=\"game-name\">';


    	var html2 = "<span class=\"arrow\"> <i class=\"fa fa-chevron-down fa-xs\"></i></span> </h5> </a> <div id=\"collapse" + data['map'][category] + "\" class=\"accordion-body collapse\">";

    	var classesTaken = ""
		if(data['Major'][category]){
			classesTaken = data['Major'][category];
		}else{
			classesTaken = "None"
		}
		var backTag = "<a style=\"color: #b42121;\" href=\"/requirement/Major/" + category + "\">Go to " + categoryName + " page <i class=\"fa fa-angle-double-right\"></i></a>";

		var classHtml = "Classes Used: <br/>" + classesTaken + "<br/>Classes Required:<br/>" + classesRequired + "<br/>" + backTag;



		var html3 = '</div> </div> </div> </div> </div>';



    // <div class=\"details-left col-md-6\"> 
    // <p><b>Sport:</b> {{game.sport}}</p> 
    // <p><b>Description:</b> {{game.description}}</p> 
    // <p><b>Start Time:</b> {{game.timeStart.time}}</p> 
    // </div> <div class=\"details-right col-md-6\"> 
    // <p><b>Location:</b> {{game.location}}</p> 
    // <p><b>Max Players:</b> {{game.cap}}</p> 
    // <p><b>Creator:</b> {{game.creator}}</p> 

   
		var html4 = "</td> <td>"+unitsCompleted+"</td> <td>"+unitsNeeded+"</td> </tr>";

    	// console.log(html);
    	fullHtml = fullHtml.concat(html,categoryName,html2,classHtml,html3,html4);
	}
	//console.log(fullHtml);
	$('.table-body').html(fullHtml);
}
          

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	console.log("Page Ready");
	initializePage();
});

function initializePage(){
	google.load("visualization", "1", {packages:["corechart"]});
	$.get("/get_all_classes",classData);
}

var structuredDataForGraph;

function classData(data){
	console.log(data);
	if(data['University']){
		console.log("University is defined!");
		ihumNumber = (data['University']['IHUM'] ? data['University']['IHUM'].length : 0);
		discpNumber = (data['University']['Disciplinary Breadth'] ? data['University']['Disciplinary Breadth'].length : 0);
		educNumber = (data['University']['Education for Citizenship'] ? data['University']['Education for Citizenship'].length : 0);

	}
	else{
		// University is not defined, so everything is 0
		ihumNumber = 0;
		discpNumber = 0;
		educNumber = 0;
		console.log("University not defined");
	}
	if(data['Major']){
		console.log("Major is defined.");
		mathNumber = (data['Major']['Math'] ? data['Major']['Math'].length : 0);
		scienceNumber = (data['Major']['Science'] ? data['Major']['Science'].length : 0);
		TISNumber = (data['Major']['Technology in Society'] ? data['Major']['Technology in Society'].length : 0);
		ENGRNumber = (data['Major']['Engienering Fundamental'] ? data['Major']['Engienering Fundamental'].length : 0);
		WIMNumber = (data['Major']['Writing in the Major'] ? data['Major']['Writing in the Major'].length : 0);
		coreNumber = (data['Major']['Core'] ? data['Major']['Core'].length : 0);
		specialNumber = (data['Major']['Speciality'] ? data['Major']['Speciality'].length : 0);
		capNumber = (data['Major']['Capstone'] ? data['Major']['Capstone'].length : 0);
		
	}else{
		// Major is not defined, so everything is 0
		
		mathNumber = 0;
		scienceNumber = 0;
		TISNumber = 0;
		ENGRNumber = 0;
		WIMNumber = 0;
		coreNumber = 0;
		specialNumber = 0;
		capNumber = 0;
		console.log("Major not defined");
		
	}

	structuredDataForGraph = [
		['Courses', 'Completed', 'Required'], 
		['Math',  mathNumber ,      4], 
		['Science',  scienceNumber,      3], 
        ['Technology in Society', TISNumber,      1], 
        ['Engineering Fundamental',  ENGRNumber,      3], 
        ['Writing in the Major',  WIMNumber,      1], 
        ['Core',  coreNumber,      3], 
        ['Speciality',  specialNumber,      4], 
        ['Capstone',  capNumber,       1] 
        ];

    console.log("Calling draw Chart");
    console.log(structuredDataForGraph);
	google.setOnLoadCallback(drawChart);

}


	  
function drawChart() {
	console.log("On summary page");
	console.log(structuredDataForGraph);
	var data = google.visualization.arrayToDataTable(structuredDataForGraph);

	var options = {
	  title: 'Test Requirements',
	  vAxis: {title: 'Courses',  titleTextStyle: {color: 'red'}}
	};

	var chart = new google.visualization.BarChart(document.getElementById('test-chart'));
	chart.draw(data, options);
}
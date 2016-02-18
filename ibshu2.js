document.addEventListener("DOMContentLoaded", start);

function start() {
    DatenAbfrage(DataVisualization);
    
    // Alle 30 Sekunden
    window.setInterval (function () {
        console.log ("Data updates in " + time());
        DatenAbfrage(DataVisualization);
    }, 30 * 1000);
}

function time () {
    var a = new Date();
    var b = a.getHours();
    var c = a.getMinutes();
    var d = a.getSeconds();
    return b + ":" + c + ":" + d;   
}

function DatenAbfrage(callback) {
    var xhttp = new XMLHttpRequest ();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            callback(xhttp.responseText);
        }
    };
    xhttp.open("GET", "https://arsnova.eu/api/statistics", true);
    xhttp.send();
}

var daten;
function DataVisualization(json) {
    daten = JSON.parse(json);
    
    // OpenSessions, ClosedSessions
    var chart = new CanvasJS.Chart("sessionVisuals",
	{
		title: { text: "Open and closed Sessions" },
		data: [
            {       
                type: "doughnut",
		startAngle:20,
		indexLabelFontFamily: "Garamond",       
		indexLabelFontSize: 30,
		indexLabelFontColor: "navy",       
		indexLabelLineColor: "darkgrey",
                indexLabel: "{y} {label}",
                dataPoints: [
                    {  y: daten["openSessions"], label: "Open Sessions" },
                    {  y: daten["closedSessions"], label: "Closed Sessions" }
                ]
            }
        ]
	});

    var chart2 = new CanvasJS.Chart("questionVisuals",
	{
		title: { text: "Types of Questions" },
		data: [
            {       
                type: "doughnut",
		indexLabelFontFamily: "Garamond",       
		indexLabelFontSize: 30,
		startAngle:0,
		indexLabelFontColor: "dimgrey",       
		indexLabelLineColor: "darkgrey", 
		toolTipContent: "{y} %", 
                indexLabel: "{y} {label}",
                dataPoints: [
                    {  y: daten["lectureQuestions"], label: "Lecture Questions" },
                    {  y: daten["preparationQuestions"], label: "Preparation Questions" },
                    {  y: daten["interposedQuestions"], label: "Interposed Questions" },
                    {  y: daten["conceptQuestions"], label: "Concept Questions" }
                ]
            }
        ]
	});
    
    var chart3 = new CanvasJS.Chart("userVisuals",
	{
		title: { text: "User Data" },
		
		animationEnabled: true,
		theme: "theme2",
			
		data: [
            {       
                type: "doughnut",
		indexLabelFontFamily: "Garamond",       
		indexLabelFontSize: 30,
		indexLabelFontColor: "maroon",       
		indexLabelLineColor: "darkgrey",
                indexLabel: "{y} {label}",
                dataPoints: [
                    {  y: daten["activeUsers"], label: "Active Users" },
                    {  y: daten["activeStudents"], label: "Active Students" },
                    {  y: daten["creators"], label: "Creators" }
                ]
            }
        ]
	});

	chart.render();
	chart2.render();
	chart3.render();
}
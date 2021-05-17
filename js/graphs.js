function foo(arr) {
    var a = [], b = [], prev;

    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);           // if a= [1 2 2 2 3 3]
            b.push(1);
        } else {
            b[b.length-1]++;         // then b= [1 3 2] (freq of each a[i])
        }
        prev = arr[i];
    }
    return [a, b];
}
// function graph1(data){

// 	var data = data.features;
// 	var arr = [];
    
// 	for(var i =0; i < data.length; i++){
// 		arr.push(data[i].properties.primary_type);
// 	}
// 	var result = foo(arr);
// 	// console.log(result);          // result array [2 x 32]=> result[0]= ["arson","theft",....], result[1]= [123,344,...]
// 	// console.log(result[1]);
// 	// console.log("======================================\n");
// 	// console.log(result[0]);
// 	var barChart = [{
// 			x: result[1],
// 			y:result[0],
// 			type: "bar",
// 			orientation: "h",
// 			transforms: [{
// 		    type: 'sort',
// 		    target: 'x',
// 		    order: 'ascending'
// 		 	}],
// 		}];

// 	var layout = {
// 		title: "Crime by Type",
// 		xaxis: {
// 			title: "Crime Count",
// 		},
// 		yaxis: {
// 			tickfont: {
// 		    size: 8,
// 		    },
// 		},
// 		margin: {
// 		    l: 170
// 		}
// 	};

// 	Plotly.newPlot('graph1', barChart,layout, {responsive: true});

// }


function graph1(data){    // for graph : 1 7 8 9 10

	var data = data.features;
	var arr = [];
	var counts = [];
	var indexx = [];
	for(var i = 0; i <= 77; i++){
		counts.push(0);
		indexx.push(i);
	}

	for(var i =0; i < data.length; i++){
		arr.push(data[i].properties.primary_type);
		counts[(data[i].properties.community_area)] = counts[(data[i].properties.community_area)]+1;
	}
	var g7 = [];
	for(var i=1; i<=77; i++){
		g7.push([indexx[i],counts[i]]);
	}	
	var result = foo(arr);
	res = [];

	for(var i=0; i<result[0].length; i++){
		res.push([result[0][i],result[1][i]]);
	}	

	res.sort(function(a, b) {
		var x = a[1];
		var y = b[1];
		return x - y;
	});
	g7.sort(function(a, b) {
		var x = a[1];
		var y = b[1];
		return x - y;
	});
	var res2 = [];
	var res3 = [];
	var res4 = [];
	var res5= [], counts2=[], indexx2=[];

	var census = censusData;
	for(var i = 76;i>=67;i--){
		indexx[76-i]=census[g7[i][0]-1].Community_Area;
		counts[76-i]=g7[i][1];
		counts2.push(g7[76-i][1]);
		indexx2.push(census[g7[76-i][0]-1].Community_Area);
	}
	// console.log(counts2);
	// console.log(indexx2);
	// console.log(counts);
	// console.log(indexx);
	for(var i=res.length-1; i>=res.length-1-4; i--){
		if(i>res.length) break;
		res2.push(res[i][0]);
		res3.push(res[i][1]);
	}
	for(var i=0; i<=4; i++){
		if(i>=res.length) break;
		res4.push(res[i][0]);
		res5.push(res[i][1]);
	}
	// graph7
	var trace1 = {
		x: counts.slice(0,10).reverse(),
		y: indexx.slice(0,10).reverse(),
		type: 'scatter'
	};

	var trace2 = {
		x: counts2.reverse(),
		y: indexx2.reverse(),
		type: 'scatter'
	};
	// console.log(counts);
	var data = [trace1];
	var data2 = [trace2];
	// graph7 ends

	var barChart = [{
			x:result[1],
			y:result[0],
			type: "bar",
			orientation: "h",
			transforms: [{
		    type: 'sort',
		    target: 'x',
		    order: 'ascending'
		 	}],
		}];
	
	var layout = {
		title: "Crime by Type",
		xaxis: {
			title: "Crime Count",
		},
		yaxis: {
			tickfont: {
		    size: 8,
		    },
		},
		margin: {
		    l: 170
		}
	};

	var barChart2 = [{
		x:res3,
		y:res2,
		type: "bar",
		orientation: "h",
		transforms: [{
		type: 'sort',
		target: 'x',
		order: 'ascending'
		 }],
	}];

	var layout2 = {
		title: "Top 5 crimes",
		xaxis: {
			title: "Crime Count",
		},
		yaxis: {
			tickfont: {
			size: 8,
			},
		},
		margin: {
			l: 170
		}
	};

	var barChart3 = [{
		x:res5,
		y:res4,
		type: "bar",
		orientation: "h",
		transforms: [{
		type: 'sort',
		target: 'x',
		order: 'ascending'
		 }],
	}];

	var layout3 = {
		title: "Top 5 infrequent crimes",
		xaxis: {
			title: "Crime Count",
		},
		yaxis: {
			tickfont: {
			size: 8,
			},
		},
		margin: {
			l: 170
		}
	};

	var layout4 = {
		title: "Crime by Community Areas",
		xaxis: {
			title: "Crime Count",
		},
		yaxis: {
			tickfont: {
		    size: 8,
		    },
		},
		margin: {
		    l: 170
		}
	};

	Plotly.newPlot('graph1', barChart,layout, {responsive: true});
	Plotly.newPlot('graph7', barChart2,layout2);
	Plotly.newPlot('graph8', barChart3,layout3);
	Plotly.newPlot('graph9', data, layout4);
	Plotly.newPlot('graph10', data2, layout4);
}

$('.form-control').change(function() {
	/* Act on the event */

	var offence= $("#crimeType").val();
	var arrest= $("#arrest").val();
	var domestic= $("#domestic").val();
	var startDate= $("#startDate").val();
	var endDate= $("#endDate").val();
	// ---------- Plot To Time-Series ---------------

	var formDataLineGraph = new FormData();

    var formDataLineGraph =  {
        	"$select" : "date_trunc_ym(date) as date"
        	+ ", "
        	+ 'count(primary_type) as offence',
        	"$group" : "date",
        	"$where" : "date >='" + startDate + "'"
        	+ " AND date <='" + endDate + "'"
        	+ " AND latitude IS NOT NULL",
        	"arrest" : arrest,
        	"domestic" : domestic,
			"primary_type" : offence,
        	"$order" : "date ASC",
        	"$limit" : 200000,
        	"$$app_token" : app_token};

        if (offence == "All") {
		  //  block of code to be executed if condition1 is true
		  delete formDataLineGraph.primary_type;
		}if (arrest == "All"){
			delete formDataLineGraph.arrest;
		}if (domestic == "All"){
			delete formDataLineGraph.domestic;
		}else{
		};

	$.ajax({
		url: 'https://data.cityofchicago.org/resource/ijzp-q8t2.geojson',
		method: "GET",
		dataType: "json",
        data: formDataLineGraph,
	}).done(function(data) {
		graph2(data);
		});

function graph2(data) {
	// console.log(data);
	var data = data.features;

	var x = [];
	var y = [];

	var selectorOptions = {
	    buttons: [{
	        step: 'month',
	        stepmode: 'backward',
	        count: 3,
	        label: '3m'
	    }, {
	        step: 'month',
	        stepmode: 'backward',
	        count: 6,
	        label: '6m'
	    }, {
	        step: 'year',
	        stepmode: 'todate',
	        count: 1,
	        label: 'YTD'
	    }, {
	        step: 'year',
	        stepmode: 'backward',
	        count: 1,
	        label: '1y'
	    }, {
	        step: 'all',
	    }],
	};


	for(var i =0; i < data.length; i++){
		y.push(data[i].properties.offence);        // offence= primary_type
		x.push(new Date(data[i].properties.date));
	};


	var total = 0;
	for(var i = 0; i < data.length; i++) {
	    total += +data[i].properties.offence;
	}
	var yMean = total / data.length;

	var x0 = x[0];
	var x1 = x[x.length - 1];

	var barChart = {
			name: "Time-Series",
			mode: "lines",
			type: "scatter",
			showlegend: true,
			x:x,
			y:y
			};

	var trace = {
	    	name: "Mean",
	    	showlegend: true,
			x: [x0,x1],
			y:[yMean,yMean],
			type: "scatter",
			mode: "lines",
			line: {
	        color: 'rgb(255,0,0)',
	        width: 4,
	        dash: "dash"
	      }
		};

	var layout = {
		title: 'Crime Time-Series from '+ $("#startDate").val() + ' to '+ $("#endDate").val() + '',
		xaxis: {
        rangeselector: selectorOptions,
        rangeslider: {}
    	},
    	yaxis: {
    		fixedrange: true,
    		title: "Crime Count"
    	},
	};

	var plot = [barChart, trace]
	Plotly.newPlot('graph2', plot,layout, {responsive: true})

}
	var formDataBarGraph = new FormData();

    var formDataBarGraph =  {
        	"$select" : "date_extract_m(date) as month"
        	+ ", "
        	+ 'count(primary_type) as offence',
        	"$group" : "month",
        	"$where" : "date >='" + startDate + "'"
        	+ " AND date <='" + endDate + "'"
        	+ " AND latitude IS NOT NULL",
        	"arrest" : arrest,
        	"domestic" : domestic,
			"primary_type" : offence,
        	"$order" : "month ASC",
        	"$limit" : 200000,
        	"$$app_token" : app_token};

        if (offence == "All") {
		  //  block of code to be executed if condition1 is true
		  delete formDataBarGraph.primary_type;
		}if (arrest == "All"){
			delete formDataBarGraph.arrest;
		}if (domestic == "All"){
			delete formDataBarGraph.domestic;
		}else{
		};

	$.ajax({
		url: 'https://data.cityofchicago.org/resource/ijzp-q8t2.geojson',
		method: "GET",
		dataType: "json",
        data: formDataBarGraph,
	}).done(function(data) {
		graph3(data);
		});
}).change();

function graph3(data) {

	var offence= $("#crimeType").val();

	var data = data.features;
	var yCount = []; //Average count
	var xMonth = []; //Months

	var year1 = new Date($("#startDate").val()).getFullYear();
	var year2 = new Date($("#endDate").val()).getFullYear();
	var month1 = new Date($("#startDate").val()).getMonth();
	var month2 = new Date($("#endDate").val()).getMonth();
	var day1 = new Date($("#startDate").val()).getDate();
	var day2 = new Date($("#endDate").val()).getDate();
	var numYear = year2 - year1;
	var numMonth = month2 - month1;
	var numDay = day2 - day1;

	var timePeriod;

	if (numYear > 0){
		timePeriod = numYear;
	}
	if (numMonth > 0) {
		timePeriod = numMonth;
	}
	else{
		timePeriod = numDay;
	}

	var month = new Array(12);
	month[0] = "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";

	for(var i =0; i < data.length; i++){
		yCount.push(data[i].properties.offence/timePeriod);
		xMonth.push(month[new Date(data[i].properties.month).getMonth()]);
	};

	var trace1 =
		  {
		x: xMonth,
		y: yCount,
	    type: "bar",
	    bins: {
		    end: 2.8,
		    size: 0.06,
		    start: .5
		  },
	    marker: {
           line: {
            color:  "black",
            width: 1
    	},
    	}
		};

	var data = [trace1];

	var layout = {
	  title: 'Average Monthly '+ offence +' Crime from '+ $("#startDate").val() + ' to '+ $("#endDate").val() + '',
	  yaxis: {
    		fixedrange: true,
    		title: "Count"
    	}
	};

Plotly.newPlot('graph3', data, layout,{responsive: true});
}

function graph4(data) {
	//data from Heatmap AJAX request

	// ---------- Plot Pie chart for Arrest and Domestic count ---------------

	var myData = data.features;

	var xPie1 = [];
	var xPie2 = [];

	for(var i =0; i < myData.length; i++){
		xPie1.push(myData[i].properties.arrest);
		xPie2.push(myData[i].properties.domestic);
	}

	var result = foo(xPie1);
	var result1 = foo(xPie2);

	var arrestPercentage = (result[1][1]/(result[1][0]+result[1][1]))*100;
	if(isNaN(arrestPercentage) == true){
		arrestPercentage = 0;
	}
	var pie1 = {
			  values: result[1],
			  labels: result[0],
			  type: 'pie',
			  name: '' + $("#crimeType").val() + '',
			  marker: {
			    colors: ['red','blue']
			  },
			  textinfo: 'none',
			  domain: {
			    row: 0,
			    column: 0
			  },
			  hole: .7,
			  title: {
			    text:''+ arrestPercentage.toFixed(1) +'%<br> Arrest(s)',
			    font: {
			      size: 24
			    },
			  },
			}

	var domesticPercentage = (result1[1][1]/(result1[1][0]+result1[1][1]))*100;
	if(isNaN(domesticPercentage) == true){
		domesticPercentage = 0;
	}
	var pie2 = {
		values: result1[1],
		  labels: result1[0],
		  type: 'pie',
		  name: '' + $("#crimeType").val() + '',
		  marker: {
		    colors: ['red','blue']
		  },
		  textinfo: 'none',
		  title: {
		    text:''+ domesticPercentage.toFixed(1) +'%<br> Domestic(s)',
		    font: {
		      size: 24
		    },
		  },
		  hole: .7,
		  domain: {
		    row: 0,
		    column: 1
		  },
		};

	var data = [pie1,pie2];

	var layout = {
		title: '' + $("#crimeType").val() + ' Arrest & Domestic Count',
		  grid: {rows: 1, columns: 2}
		};

	Plotly.newPlot('graph4', data, layout, {responsive: true});

}
// new graphs ----------------------------------------------------------------------

function graph5(data){               // crime classify by location

	var data = data.features;
	var arr = [];

	for(var i =0; i < data.length; i++){
		arr.push(data[i].properties.location_description);
	}
	var result = foo(arr);
	var processed = [];
	// console.log(result);
	// console.log(result[0].length);
	for(var i=0; i<result[0].length; i++)
		processed.push([result[0][i],result[1][i]]);

	processed.sort(function(a, b) {
    	return b[1] - a[1];
	});
	for(var i=0; i<processed.length; i++){
		result[0][i]= processed[i][0];
		result[1][i]= processed[i][1];
	}
	var barChart = [{
			x: result[1].slice(1,15),
			y: result[0].slice(1,15),
			type: "bar",
			orientation: "h",
			transforms: [{
		    type: 'sort',
		    target: 'x',
		    order: 'ascending'
		 	}],
		}];

	var layout = {
		title: "Area of Occurence",
		xaxis: {
			title: "Crime Count",
		},
		yaxis: {
			tickfont: {
		    size: 8,
		    },
		},
		margin: {
		    l: 170
		}
	};
	Plotly.newPlot('graph5', barChart,layout, {responsive: true});
}

$('.form-control').change(function() {

	var offence= $("#crimeType").val();
	var startDate= $("#startDate").val();
	var endDate= $("#endDate").val();
	// ---------- Plot To Time-Series ---------------

	var formLineGraph = new FormData();

    var formLineGraph =  {
        	"$select" : "date as date1"
        	+ ", "
        	+ "date_trunc_ym(date) as date2"
        	+ ", "
        	+ 'count(primary_type) as offence',
        	"$group" : "date",
        	"$where" : "date2 >='" + startDate + "'"
        	+ " AND date2 <='" + endDate + "'"
        	+ " AND latitude IS NOT NULL",
        	"primary_type" : offence,
        	"$order" : "date ASC",
        	"$limit" : 200000,
        	"$$app_token" : app_token};

        if (offence == "All"){ 
		  delete formLineGraph.primary_type;
		}else{
		};

	$.ajax({
		url: 'https://data.cityofchicago.org/resource/ijzp-q8t2.geojson',
		method: "GET",
		dataType: "json",
        data: formLineGraph,
	}).done(function(data) {
		graph6(data);
		});

function graph6(data){

	var data = data.features;
	var arr = [];
	for(var i =0; i < data.length; i++){
		var hour= new Date(data[i].properties.date1).getHours();
		arr.push(hour/3);
	}
	var result = foo(arr);
	var lineGraph = [{
		x: ["0-3","3-6","6-9","9-12","12-15","15-18","18-21","21-24"],
		y: result[1],
		type: "scatter",
	}];
	var layout= {
		title: "Crime time of the day",
		xaxis: {
			title: "Quarters of the day (3 hrs slot)",
		},
		yaxis: {
			tickfont: {
		    size: 8,
		    },
		},
		margin: {
		    l: 170
		}
	};

	Plotly.newPlot('graph6', lineGraph,layout, {responsive: true});
}
}).change();
	

difbar("tm","#tonetrue","reality   ");
difbar("pm","#tonepred","prediction");

function difbar(lkey,divtag,labtag){
var margin = {top: 10, right: 10, bottom: 20, left: 30}, width = 700 - margin.left - margin.right, 
 height = 150 - margin.top - margin.bottom;
var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
var y = d3.scale.linear().range([height, 0]);
var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

var svg = d3.select(divtag).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
   .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
d3.csv("difbar2.csv",function(error, data) {
	data.forEach(function(d) {
    	console.log("d", d);
    	d.date = d.date;
    	d[lkey]= +d[lkey];
  	});
	var x0 = Math.max(-d3.min(data), d3.max(data));
    	 x.domain(data.map(function(d) { return d.date; }));
     	 y.domain([d3.min(data, function(d) { return d[lkey]; }), d3.max(data, function(d) { return d[lkey]; })]);

  svg.append("g")
     .attr("class", "x axis")
     .attr("transform", "translate(0," + height + ")")
     .call(xAxis);
  svg.append("g")
     .attr("class", "y axis")
     .call(yAxis)
	.append("text")
      .attr("y", 6)
     .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".91em")
      .style("text-anchor", "end")
      .text(labtag);

  svg.selectAll(".bar")
      .data(data).enter().append("rect")
      .attr("class", function(d) { return d[lkey]< 0 ? "bar negative" : "bar positive"; })
      .attr("x", function(d, i) { return x(d.date); })
      .attr("y", function(d, i) { return y(Math.max(0, d[lkey]));})
      .attr("width", x.rangeBand())
      .attr("height", function(d) { return Math.abs(y(d[lkey]) - y(0)); });
      
  var text = svg.selectAll("text")
				      	.data([labtag])
                        .enter()
                        .append("text");
  var textLabels = text
                 .attr("x", 10)
                 .attr("y", 10)
                 .text(String)
                 .attr("font-family", "sans-serif")
                 .attr("font-size", "20px")
                 .attr("fill", "lightgray")
                 .attr("fill-opacity",1);      
      


});



}
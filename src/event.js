renderevent();
function renderevent(){
var margin = {top: 0, right: 10, bottom: 20, left: 20},
    width = 700 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var format = d3.time.format("%Y-%m");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(d3.time.years);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var chart = d3.select(".eventchart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("eventfight.csv",function(error, data) {
	data.forEach(function(d) {
    	console.log("d", d);
    	d.date = format.parse(d.date);
    	d["trueval"]= +d["trueval"];
	    d["predval"] = +d["predval"];
  	});

  x.domain(d3.extent(data, function(d) { return d.date; }));

  y.domain([
    0,d3.max(data, function(d) { return Math.max(d["trueval"], d["predval"]); })
  ]);

  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
		.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("events");
  chart.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.date); })
      .attr("y", function(d) { return y(d["trueval"]); })
      .attr("height", function(d) { return height - y(d["trueval"]); })
      .attr("width", width/data.length);
   
});
}
toneline();
function toneline(){
var margin = {top: 10, right: 10, bottom: 20, left: 30},
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

var line = d3.svg.area()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d["trueval"]); });

var area = d3.svg.area()
    .x(function(d) { return x(d.date); })
    .y1(function(d) { return y(d["predval"]); });

var svg = d3.select("#difline").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var graph = d3.csv("difline.csv", function(data) {
  data.forEach(function(d) {
    console.log("d", d);
    d.date = format.parse(d.date);
  
    d["trueval"]= +d["trueval"];
    d["predval"] = +d["predval"];
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));

  y.domain([
    d3.min(data, function(d) { return Math.min(d["trueval"], d["predval"]); }),
    d3.max(data, function(d) { return Math.max(d["trueval"], d["predval"]); })
  ]);

  svg.datum(data);

  svg.append("clipPath")
      .attr("id", "clip-below")
    .append("path")
      .attr("d", area.y0(height));

  svg.append("clipPath")
      .attr("id", "clip-above")
    .append("path")
      .attr("d", area.y0(0));

  svg.append("path")
      .attr("class", "area above")
      .attr("clip-path", "url(#clip-above)")
      .attr("d", area.y0(function(d) { return y(d["trueval"]); }));

  svg.append("path")
      .attr("class", "area below")
      .attr("clip-path", "url(#clip-below)")
      .attr("d", area);

  svg.append("path")
      .attr("class", "line")
      .attr("d", line);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("tone value");
});
}
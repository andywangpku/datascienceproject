calbuild("count30.csv","#cal30","blue",5);
calbuild("count40.csv","#cal40","olivedrab",20);
calbuild("count42.csv","#cal42","red",10);
calbuild("count43.csv","#cal43","darkcyan",10);

function calbuild(csvpath,divtag,colorHigh,maxcnt){
var width = 300,
    height = 70,
    cellSize = 5; // cell size

var day = d3.time.format("%w"),
    week = d3.time.format("%U"),
    format = d3.time.format("%Y-%m-%d");


var colorLow ='white';

var color = d3.scale.linear()
     .domain([0, maxcnt])
     .range([colorLow, colorHigh]);

var svg = d3.select(divtag).selectAll("svg")
    .data(d3.range(2008, 2011))
  .enter().append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

svg.append("text")
    .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
    .style("text-anchor", "middle")
    .text(function(d) { return d; });

var rect = svg.selectAll(".day")
    .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  .enter().append("rect")
    .attr("class", "day")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("x", function(d) { return week(d) * cellSize; })
    .attr("y", function(d) { return day(d) * cellSize; })
    .datum(format);

rect.append("title")
    .text(function(d) { return d; });

svg.selectAll(".month")
    .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  .enter().append("path")
    .attr("class", "month")
    .attr("d", monthPath);

d3.csv(csvpath, function(error, csv) {
  var data = d3.nest()
    .key(function(d) { return d.Date; })
    .rollup(function(d) { return d[0].cnt; })
    .map(csv);

  rect.filter(function(d) { return d in data; })
      .attr("class", function(d) { return "day " + color(data[d]); })
      .style("fill", function(d) {
//		console.log("d",d);
       return color(data[d]); })
    .select("title")
      .text(function(d) { return d + ": " + data[d]; });
});

function monthPath(t0) {
  var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
      d0 = +day(t0), w0 = +week(t0),
      d1 = +day(t1), w1 = +week(t1);
  return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
      + "H" + w0 * cellSize + "V" + 7 * cellSize
      + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
      + "H" + (w1 + 1) * cellSize + "V" + 0
      + "H" + (w0 + 1) * cellSize + "Z";
}

}
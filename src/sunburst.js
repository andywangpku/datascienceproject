
sunburstjs("geosunburst.json");
function sunburstjs(jsonpath){
var width = 400,
    height = 400,
    radius = Math.min(width, height) / 2;

var x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

var y = d3.scale.linear()
      .range([0, radius]);

var colorLow = 'red', colorMed = 'white', colorHigh = 'green';

var colorScale = d3.scale.linear()
     .domain([-10,0,10])
     .range([colorLow, colorMed, colorHigh]);

var svg = d3.select("#mycanvas").append("svg")
    .attr("width", width)
    .attr("height", height+100)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

var partition = d3.layout.partition()
    .value(function(d) { return d.size; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

d3.json(jsonpath, function(error, root) {
  var path = svg.selectAll("path")
      .data(partition.nodes(root))
    .enter().append("path")
      .attr("d", arc)
      .style("fill", function(d) { return colorScale(d.GoldsteinScale); })
      .on("click", click);

  var textBox = d3.select("#mycanvas > svg").selectAll("text")
      .data(["Click on a path"])
    .enter().append("text")
      .attr("x",0)
      .attr("y",410)
      .attr("font-size", "15px")
      .attr("transform", "translate(" + width + ",0)")
      .attr("text-anchor", "end")
      .attr("dy", 16)
      .text(String);

  function click(d) {
    path.transition()
      .duration(750)
      .attrTween("d", arcTween(d));

    textBox.data([d.name +" ("+d.size+")events"])
        .text(String);
  }
  
  function arcTween(d) {
  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
      yd = d3.interpolate(y.domain(), [d.y, 1]),
      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
  return function(d, i) {
    return i
        ? function(t) { return arc(d); }
        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
  };
}
});

}
// Interpolate the scales!



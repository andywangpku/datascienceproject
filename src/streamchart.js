var datearray = [];
			  
function assignDefaultValues( dataset )
{
    var defaultValue = 0;
    var keys = [ '1' , '2', '6','7','8','10','12', '13' ,'14','15','16','17','18','19','20'];
    var hadData = [ true, true,true, true, true, ,true,true,true,true, true, true ,true,true,true,true];
    var newData = [];
    var previousdate = new Date();
    var sortByDate = function(a,b){ return a.date > b.date ? 1 : -1; };
    
    dataset.sort(sortByDate);
    dataset.forEach(function(row){
        if(row.date.valueOf() !== previousdate.valueOf()){
            for(var i = 0 ; i < keys.length ; ++i){
                if(hadData[i] === false){
                    newData.push( { key: keys[i], 
                                   value: defaultValue, 
                                   date: previousdate });
                }
                hadData[i] = false;
            }
            previousdate = row.date;
        }
        hadData[keys.indexOf(row.key)] = true; 
    });
    for( i = 0 ; i < keys.length ; ++i){
        if(hadData[i] === false){
            newData.push( { key: keys[i], value: defaultValue, 
                            date: previousdate });
        }
    }
    return dataset.concat(newData).sort(sortByDate);
}
chart("./dfdata.csv");
function chart(csvpath) {
var colormap=[0,3.400000,   3.816479,0,0,0,   6.171964  , 7.666556  , 6.406398 ,0, -5.000000,0,
			  -4.347387 , -5.417790 , -6.632367 , -7.200000 , -5.140670 , -5.562093  ,-9.025527 , -9.900176 ,-10.000000];
var eventmap=["test","PUBLIC STATEMENT","APPEAL","INTENT TO COOPERATE","CONSULT","ENGAGE IN DIPLOMATIC COOPERATION",
			"ENGAGE IN MATERIAL COOPERATION","PROVIDE AID","YIELD","INVESTIGATE","DEMAND","DISAPPROVE","REJECT",
				"THREATEN","PROTEST","EXHIBIT FORCE POSTURE","REDUCE RELATIONS","COERCE","ASSAULT","FIGHT",
				"USE UNCONVENTIONAL MASS VIOLENCE"];
var format = d3.time.format("%Y-%m");

var margin = {top: 20, right: 40, bottom: 30, left: 50};
var width = 1200;
var height = 400;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height-10, 0]);

var colorLow = 'red', colorMed = 'white', colorHigh = 'green';

var z = d3.scale.linear()
     .domain([-10,0, 10])
     .range([colorLow, colorMed, colorHigh]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(d3.time.years);

var yAxis = d3.svg.axis()
    .scale(y);

var yAxisr = d3.svg.axis()
    .scale(y);

var stack = d3.layout.stack()
    .offset("silhouette")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value; });

var nest = d3.nest()
    .key(function(d) { return d.key; });

var area = d3.svg.area()
    .interpolate("cardinal")
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

var svg = d3.select(".streamchart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var graph = d3.csv(csvpath, function(data) {
  data.forEach(function(d) {
//  	console.log("d", d)
    d.date = format.parse(d.date);
    d.value = +d.value;
  });
  var paddata= assignDefaultValues(data);
  var layers = stack(nest.entries(paddata));

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);

  svg.selectAll(".layer")
      .data(layers)
    .enter().append("path")
      .attr("class", "layer")
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d) {
       		console.log("d stream",d.key);
       		console.log("d color",colormap[parseInt(d.key)]);
       		return z(colormap[parseInt(d.key)]); 
       });
  var tmp="";
  var text = svg.selectAll("text")
				      	.data([tmp])
                        .enter()
                        .append("text");
  var textLabels = text
                 .attr("x", 50)
                 .attr("y", 50)
                 .text(String)
                 .attr("font-family", "sans-serif")
                 .attr("font-size", "20px")
                 .attr("fill", "white")
                 .attr("fill-opacity",0.8);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + width + ", 0)")
      .call(yAxis.orient("right"));

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis.orient("left"));
 
  svg.selectAll(".layer")
    .attr("opacity", 1)
    .on("mouseover", function(d, i) {
      svg.selectAll(".layer").transition()
      .duration(250)
      .attr("opacity", function(d, j) {
        return j != i ? 0.1 : 1;
    })})

    .on("mousemove", function(d, i) {
      mousex = d3.mouse(this);
      mousex = mousex[0];
      var invertedx = x.invert(mousex);
      invertedx =invertedx.getFullYear() + invertedx.getMonth() ;
      var selected = (d.values);
      for (var k = 0; k < selected.length; k++) {
        datearray[k] = selected[k].date
        datearray[k] = datearray[k].getFullYear()+datearray[k].getMonth();
      }

      mousedate = datearray.indexOf(invertedx);
      pro = d.values[mousedate].value;
	  console.log("cur value",pro);
      d3.select(this)
      .classed("hover", true)
      .attr("stroke", "black")
      .attr("stroke-width", "0.1px");
      tmp=eventmap[parseInt(d.key)];
      text.data([tmp])
        		.text(String);      
    })
    .on("mouseout", function(d, i) {
     svg.selectAll(".layer")
      .transition()
      .duration(250)
      .attr("opacity", "1");
      d3.select(this)
      .classed("hover", false)
      .attr("stroke-width", "0px");
      tmp="";
      text.data([tmp.toString()])
        		.text(String);      
      
  })
    
});
}
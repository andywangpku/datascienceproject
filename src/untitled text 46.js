

worldjs("./countrytone.csv");
function worldjs(csvpath){
	var width = 960,
    	height = 1000;
	var projection = d3.geo.mercator()
 		.center([0,0])
	 	.scale((width + 1) / 2 / Math.PI)
    	.translate([width / 2, height / 2])
    	.precision(.1);

	var graticule = d3.geo.graticule();
	var path = d3.geo.path()
   		 .projection(projection);

	var colorLow = 'red', colorMed = 'white', colorHigh = 'green';

	var colorScale = d3.scale.linear()
    	 .domain([-20,10, 50])
     	.range([colorLow, colorMed, colorHigh]);
	var svg = d3.select("#worldmap").append("svg")
    	.attr("width", width)
    	.attr("height", 700);
	svg.append("path")
    	.datum(graticule)
	    .attr("class", "graticule")
    	.attr("d", path);
	svg.append("path")
    	.datum(graticule.outline)
    	.attr("class", "graticule outline")
	    .attr("d", path);
    
	var mycsv = d3.csv(csvpath, function(mydata){
  		mydata.forEach(function(d) {
  			console.log("d", d)
    		d.country = d.country;
    		d.toneprev = +d.toneprev;
    		d.toneafter = +d.toneafter;
  		});
  	d3.json("world.json", function(error, world) {
  		var subuint=svg.selectAll("subunit")
	      			   .data(topojson.feature(world, world.objects.subunits).features)
    	               .enter().insert("path", ".graticule")
                   	   .attr("class", "country")
      				   .attr("d", path)
			           .style("fill", function(d) {
      						console.log("d out 1", d.id);
	      					for(var i=0;i<mydata.length;i++){
			    	  			if(d.id==mydata[i].country){
	    				  			console.log("d value 1",mydata[i].toneprev);	
		    	  					return colorScale(mydata[i].toneprev);
      							}
      						}
      					})
				      	.on("click", click);
      	 
      	 function click() {
  		 		   subuint.style("fill", function(d) {
      					console.log("d out 2", d.id);
      					for(var i=0;i<mydata.length;i++){
    	  						if(d.id==mydata[i].country){
	    	  						console.log("d value 2",mydata[i].toneafter);	
		    	  					return colorScale(mydata[i].toneafter);
      							}
      						}
      				});		 
  		 }
  
      			
	});


	});
}
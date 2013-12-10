

worldjs("countrytone.csv");
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
    	 .domain([-20,0,80])
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
//  			console.log("d", d)
    		d.country = d.country;
    		d.YEAR1997=+d.YEAR1997;
    		d.YEAR1998=+d.YEAR1998;
    		d.YEAR1999=+d.YEAR1999;
    		d.YEAR2000=+d.YEAR2000;
    		d.YEAR2001=+d.YEAR2001;
    		d.YEAR2002=+d.YEAR2002;
    		d.YEAR2003=+d.YEAR2003;
    		d.YEAR2004=+d.YEAR2004;
    		d.YEAR2005=+d.YEAR2005;
    		d.YEAR2006=+d.YEAR2006;
    		d.YEAR2007=+d.YEAR2007;
    		d.YEAR2008=+d.YEAR2008;
    		d.YEAR2009=+d.YEAR2009;
    		d.YEAR2010=+d.YEAR2010;
    		d.YEAR2011=+d.YEAR2011;
    		d.YEAR2012=+d.YEAR2012;

  		});
  	var tmp =1997;
  	d3.json("world.json", function(error, world) {
  		var subuint=svg.selectAll("subunit")
	      			   .data(topojson.feature(world, world.objects.subunits).features)
    	               .enter().insert("path", ".graticule")
                   	   .attr("class", "country")
      				   .attr("d", path)
			           .style("fill", function(d) { 		 		   		
      						for(var i=0;i<mydata.length;i++){
			    	  			if(d.id==mydata[i].country){
//			    	  			    console.log("inital value",mydata[i].YEAR1997);
	    				  			return colorScale(mydata[i].YEAR1997);
      							}
      						}
      					});
      	var text = svg.selectAll("text")
				      	.data([tmp.toString()])
                        .enter()
                        .append("text");
        var textLabels = text
                 .attr("x", 680)
                 .attr("y", 120)
                 .text(String)
                 .attr("font-family", "sans-serif")
                 .attr("font-size", "120px")
                 .attr("fill", "lightgray")
                 .attr("fill-opacity",0.4);
		var inter = setInterval(function() {
        	        updateData();
        		}, 1800); 			      	
    function updateData() {
    	text.data([tmp.toString()])
        		.text(String);
		if(tmp==1997){
  			subuint.style("fill", function(d) {
	  			for(var i=0;i<mydata.length;i++){
    	  			if(d.id==mydata[i].country){
 //   	  				console.log("update value",mydata[i].YEAR1997);
  		    	  		return colorScale(mydata[i].YEAR1997);
      				}
      		 	}	
      	  	});
      	  	tmp=1998;
      	  	return;
		}
		if(tmp==1998){
  			subuint.style("fill", function(d) {
	  			for(var i=0;i<mydata.length;i++){
    	  			if(d.id==mydata[i].country){
 //   	  				console.log("update value",mydata[i].YEAR1998);
  		    	  		return colorScale(mydata[i].YEAR1998);
      				}
      		 	}	
      	  	});
      	  	tmp=1999;
      	  	return;
		}
		if(tmp==1999){
  			subuint.style("fill", function(d) {
	  			for(var i=0;i<mydata.length;i++){
    	  			if(d.id==mydata[i].country){
//    	  				console.log("update value",mydata[i].YEAR1999);
  		    	  		return colorScale(mydata[i].YEAR1999);
      				}
      		 	}	
      	  	});
      	  	tmp=2000;
      	  	return;
		}
		if(tmp==2000){
  			subuint.style("fill", function(d) {
	  			for(var i=0;i<mydata.length;i++){
    	  			if(d.id==mydata[i].country){
//    	  				console.log("update value",mydata[i].YEAR2000);
  		    	  		return colorScale(mydata[i].YEAR2000);
      				}
      		 	}	
      	  	});
      	  	tmp=2001;
      	  	return;
		}
		if(tmp==2001){
  			subuint.style("fill", function(d) {
	  			for(var i=0;i<mydata.length;i++){
    	  			if(d.id==mydata[i].country){
 //   	  				console.log("update value",mydata[i].YEAR2001);
  		    	  		return colorScale(mydata[i].YEAR2001);
      				}
      		 	}	
      	  	});
      	  	tmp=2002;
      	  	return;
		}
		if(tmp==2002){
  			subuint.style("fill", function(d) {
	  			for(var i=0;i<mydata.length;i++){
    	  			if(d.id==mydata[i].country){
 //   	  				console.log("update value",mydata[i].YEAR2002);
  		    	  		return colorScale(mydata[i].YEAR2002);
      				}
      		 	}	
      	  	});
      	  	tmp=2003;
      	  	return;
		}
		if(tmp==2003){
  			subuint.style("fill", function(d) {
	  			for(var i=0;i<mydata.length;i++){
    	  			if(d.id==mydata[i].country){
 //   	  				console.log("update value",mydata[i].YEAR2003);
  		    	  		return colorScale(mydata[i].YEAR2003);
      				}
      		 	}	
      	  	});
      	  	tmp=2004;
      	  	return;
		}
		if(tmp==2004){
  			subuint.style("fill", function(d) {
	  			for(var i=0;i<mydata.length;i++){
    	  			if(d.id==mydata[i].country){
 //   	  				console.log("update value",mydata[i].YEAR2004);
  		    	  		return colorScale(mydata[i].YEAR2004);
      				}
      		 	}	
      	  	});
      	  	tmp=2005;
      	  	return;
		}
		if(tmp==2005){
  			subuint.style("fill", function(d) {
	  			for(var i=0;i<mydata.length;i++){
    	  			if(d.id==mydata[i].country){
 //   	  				console.log("update value",mydata[i].YEAR2005);
  		    	  		return colorScale(mydata[i].YEAR2005);
      				}
      		 	}	
      	  	});
      	  	tmp=2006;
      	  	return;
		}
		if(tmp==2006){
  			subuint.style("fill", function(d) {
	  			for(var i=0;i<mydata.length;i++){
    	  			if(d.id==mydata[i].country){
  //  	  				console.log("update value",mydata[i].YEAR2006);
  		    	  		return colorScale(mydata[i].YEAR2006);
      				}
      		 	}	
      	  	});
      	  	tmp=2007;
      	  	return;
		}
		if(tmp==2007){
  			subuint.style("fill", function(d) {
	  			for(var i=0;i<mydata.length;i++){
    	  			if(d.id==mydata[i].country){
  //  	  				console.log("update value",mydata[i].YEAR2007);
  		    	  		return colorScale(mydata[i].YEAR2007);
      				}
      		 	}	
      	  	});
      	  	tmp=2008;
      	  	return;
		}
		if(tmp==2008){
  			subuint.style("fill", function(d) {
	  			for(var i=0;i<mydata.length;i++){
    	  			if(d.id==mydata[i].country){
  //  	  				console.log("update value",mydata[i].YEAR2008);
  		    	  		return colorScale(mydata[i].YEAR2008);
      				}
      		 	}	
      	  	});
      	  	tmp=2009;
      	  	return;
		}
		if(tmp==2009){
  			subuint.style("fill", function(d) {
	  			for(var i=0;i<mydata.length;i++){
    	  			if(d.id==mydata[i].country){
   // 	  				console.log("update value",mydata[i].YEAR2009);
  		    	  		return colorScale(mydata[i].YEAR2009);
      				}
      		 	}	
      	  	});
      	  	tmp=2010;
      	  	return;
		}
		if(tmp==2010){
  			subuint.style("fill", function(d) {
	  			for(var i=0;i<mydata.length;i++){
    	  			if(d.id==mydata[i].country){
  //  	  				console.log("update value",mydata[i].YEAR2010);
  		    	  		return colorScale(mydata[i].YEAR2010);
      				}
      		 	}	
      	  	});
      	  	tmp=2011;
      	  	return;
		}
		if(tmp==2011){
  			subuint.style("fill", function(d) {
	  			for(var i=0;i<mydata.length;i++){
    	  			if(d.id==mydata[i].country){
 //   	  				console.log("update value",mydata[i].YEAR2011);
  		    	  		return colorScale(mydata[i].YEAR2011);
      				}
      		 	}	
      	  	});
      	  	tmp=2012;
      	  	return;
		}
		if(tmp==2012){
  			subuint.style("fill", function(d) {
	  			for(var i=0;i<mydata.length;i++){
    	  			if(d.id==mydata[i].country){
  //  	  				console.log("update value",mydata[i].YEAR2012);
  		    	  		return colorScale(mydata[i].YEAR2012);
      				}
      		 	}	
      	  	});
      	  	tmp=1997;
      	  	return;
		}     		
  	}
  
      			
	});


	});
}
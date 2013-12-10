$(document).ready(function() {
	$.ajax({ 
	    url: "http://ajaxhttpheaders.appspot.com", 
	    dataType: 'jsonp', 
	    success: function(headers) {
	        if(headers['Accept-Language'].substring(0,2)=="fr"){
				var message = "<div id='language'>Vous préféreriez peut être la version française de notre site.<a href=\"http://dataveyes.com/\"> Afficher </a> ou <span>masquer</span></div>";
				$('body #container').prepend(message);
			}
			$('#language span').live('click',function(){
				$('#language').fadeOut(200);
			})
			$('#language').delay(10000).fadeOut(200);
	    }
	});
	var month = new Date();
	var year = new Date();
	month = month.getMonth();
	if(month<6){
		year = (year.getFullYear()-2010-1);
		month = month+6+(year*12);
	}else{
		year = (year.getFullYear()-2010);
		month = month-6+(year*12);
	}
	$('#timeline .text p.title').html('We are '+month+' months old');
	
});
















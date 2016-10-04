var currentLocation;
//if statement to check if browser is chrome.
if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1){
	// Do something in Chrome
  
    load('texas','f');
} 
//if statement to check if geolocation is supported by browser.
else if (navigator.geolocation)// if true..then execute 
{
 navigator.geolocation.getCurrentPosition(function(position)
	 {
		 currentLocation=position.coords.latitude+','+position.coords.longitude;
	 /*so we have the longitude and latitude information now.
		we now need to use the simple weather api to get the JSON for the location we have. lets see how that is done */
		 load(currentLocation,'f');
	 });
 }//end of if statement
else{
	currentLocation = 'toronto';
	var unit = 'f'; 
	load(currentLocation,unit); // I will incorporate a text input
}//end of else
$("#radio input").on('change',function(){	
	var unitChoice=$('input[name="my_unit"]:checked',"#radio").val();
	load(currentLocation,unitChoice);
});
/*
function:load
parameter:location(lat/long,city/country), woeid;
output:none.
description:
*/
function load(location,unit)
{
	var update;
		 $.simpleWeather({			 
			 location:location,
			 woeid:'',
			 unit: unit,
			 success: function(weather)
				 {
					 //set the well colors based on the temperature
					 if (unit=='f'){var limit=75;}
					 else{var limit=24;}
					 if(weather.temp > limit) {
						 $('#current').animate({backgroundColor: '#F7AC57'}, 1500);
						 $('#temp').animate({backgroundColor: '#F7AC57'}, 1500);
						 $('#temp').css('background','url('+weather.image+')');
						 $('#win').animate({backgroundColor: '#F7AC57'}, 1500);
						 $('#win').css('background','url('+weather.image+')');
						 $('#humid').animate({backgroundColor: '#F7AC57'}, 1500);
						 $('#humid').css('background','url('+weather.image+')');
					 }//end of if
					 else {
						 
						 $('#current').animate({backgroundColor: '#0091c2'}, 1500);
						 $('#temp').animate({backgroundColor: '#0091c2'}, 1500);
						 $('#temp').css('background','url('+weather.image+')');
						 $('#win').animate({backgroundColor: '#0091c2'}, 1500);
						 $('#win').css('background','url('+weather.image+')');
						 $('#humid').animate({backgroundColor: '#0091c2'}, 1500);
						 $('#humid').css('background','url('+weather.image+')');
					 }	//end of else 
					 // now update the html with the values.
					 update='<p1>'+weather.title+'</p1>';
					 $("#title p1").html(update);
					 update='<h3>'+weather.currently+'</h3>';
					 update+='<i class="icon-'+weather.code+'"></i>';
					 $("#current").html(update);
					 update='<p1>Temperature</p1>';
					 update+='<h3>'+weather.temp+'&deg;'+weather.units.temp+'</h3>';
					 $("#temp").html(update);
					 update='<p1>Wind</p1>';
					 update+='<h3>'+weather.wind.direction+' '+weather.wind.speed+''+weather.units.speed+' '+weather.wind.chill+'&deg;'+weather.units.temp+'</h3>';
					 $("#win").html(update);
					 update='<p1>Humidity %</p1>';
					 update+='<h3>'+weather.humidity+'</h3>'
					 $("#humid").html(update);
				 },
				 error: function(){$("#title p1").html("Error: Please Enable location services in your browser settings");}
			 }); //just a simple object type manipulation.
}

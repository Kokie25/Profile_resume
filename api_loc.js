

var endpoint = 'http://ip-api.com/json/?fields=status,message,country,city,lat,lon';
var longitude;
var latitude;
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var response = JSON.parse(this.responseText);
		if(response.status !== 'success') {
			console.log('query failed: ' + response.message);
			return
		}

        latitude = response.lat;
        longitude =response.lon;
        document.getElementById("location").innerHTML= "Location: " + response.country +"," + response.city;

        var api = "d7b1b7de72fb72f5c24cc76672c33897"
        var weatherendpoint = "https://api.openweathermap.org/data/2.5/weather?"
        fetch(weatherendpoint+"lat="+latitude+"&lon="+longitude+"&appid="+api, {
            "method": "GET",
            })
            .then(WeatherData =>{
                return WeatherData.json()
            })
            .then(WeatherData => {
            document.getElementById("weather").innerHTML = "Weather ("+ WeatherData.weather[0].description + ", " + 
            (WeatherData.main.temp - 273.15).toFixed(2) +" ℃" + ")" ;
            })
            .catch(err => {
            console.error(err);
            });
	}
};
xhr.open('GET', endpoint, true);
xhr.send();




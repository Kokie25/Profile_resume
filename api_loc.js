

var endpoint = 'http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone';

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
        console.log(latitude + " " + longitude)
        document.getElementById("location").innerHTML= response.country +"," + response.timezone;

        var api = "d7b1b7de72fb72f5c24cc76672c33897"
        var weatherendpoint = "https://api.openweathermap.org/data/2.5/weather?"
        fetch(weatherendpoint+"lat="+latitude+"&lon="+longitude+"&appid="+api, {
            "method": "GET",
            })
            .then(WeatherData =>{
                return WeatherData.json()
            })
            .then(WeatherData => {
            document.getElementById("weather").innerHTML = "Weather ("+ WeatherData.weather[0].description + "," + "Temp = " + (WeatherData.main.temp - 273.15.toFixed(0)) + " ℃" + ")" ;
            console.log(WeatherData);
            })
            .catch(err => {
            console.error(err);
            });
	}
};
xhr.open('GET', endpoint, true);
xhr.send();




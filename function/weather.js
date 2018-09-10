var API_KEY = 'b29c6a6ca12d0a681e4f0f4e92b372b3';
var city = 'seoul';
var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
var request = require('request');
var response = require('response');

function weatherFunction(callback) {
	request(url,function(err,response,body) {
		if(err)
			console.log(err);
		else {
			obj = JSON.parse(body);
			if(obj.weather[0].main=='Clear')
				weatherObj = {
                "img":"weather_img/clear.png", 
                "temp":obj.main.temp, 
                "status":"맑음",
                "temp_max" : obj.main.temp_max,
                "temp_min" : obj.main.temp_min
                };
			else if(obj.weather[0].main == 'Clouds')
				weatherObj = {
                "img":"weather_img/cloudy.png", 
                "temp":obj.main.temp, 
                "status":"구름 조금",
                "temp_max" : obj.main.temp_max,
                "temp_min" : obj.main.temp_min
                };
			else if(obj.weather[0].main == 'Rain')
				weatherObj = {
                "img":"weather_img/rain.png",
                "temp":obj.main.temp, 
                "status":"비",
                "temp_max" : obj.main.temp_max,
                "temp_min" : obj.main.temp_min
                };
            else{
				weatherObj = {
                "img":"weather_img/unknown.png",
                "temp":obj.main.temp, 
                "status":"알수없음",
                "temp_max" : obj.main.temp_max,
                "temp_min" : obj.main.temp_min
                };
            }
			callback(weatherObj)
		}
	});
}

exports.weatherFunction = weatherFunction;

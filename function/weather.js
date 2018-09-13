var API_KEY = 'b29c6a6ca12d0a681e4f0f4e92b372b3';
var city = 'seoul';
var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
var url2 = `http://api.openweathermap.org/data/2.5/forecast?id=1835848&appid=${API_KEY}&units=metric`
var request = require('request');
var response = require('response');

function weatherFunction(callback) {
	request(url,function(err,response,body) {
		if(err)
			console.log(err);
		else {
            //요일 구하기
            var week = new Array('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');
			var today = new Date().getDay();
            var todayLabel = week[today];
            //년월일 구하기
            var newDate = new Date();
            var time = newDate.toFormat('YYYY/MM/DD');
            obj = JSON.parse(body);
			if(obj.weather[0].main=='Clear')
				weatherObj = {
                "img":"weather_img/Clear.png", 
                "temp":Math.round(obj.main.temp), 
                "status":"맑음",
                "week" : todayLabel,
                "date" : time,
                "wind" : obj.wind.speed,
                "humidity" : obj.main.humidity
                };
			else if(obj.weather[0].main == 'Clouds')
				weatherObj = {
                "img":"weather_img/Clouds.png", 
                "temp":Math.round(obj.main.temp), 
                "status":"구름 조금",
                "week" : todayLabel,
                "date" : time,
                "wind" : obj.wind.speed,
                "humidity" : obj.main.humidity
                };
			else if(obj.weather[0].main == 'Rain')
				weatherObj = {
                "img":"weather_img/Rain.png",
                "temp":Math.round(obj.main.temp), 
                "status":"비",
                "week": todayLabel,
                "date" : time,
                "wind" : obj.wind.speed,
                "humidity" : obj.main.humidity
                };
            else if(obj.weather[0].main == 'Mist')
                weatherObj = {
                "img":"weather_img/Mist.png",
                "temp":Math.round(obj.main.temp), 
                "status":"안개",
                "week": todayLabel,
                "date" : time,
                "wind" : obj.wind.speed,
                "humidity" : obj.main.humidity
                }
            else{
				weatherObj = {
                "img":"weather_img/unknown.png",
                "temp":Math.round(obj.main.temp), 
                "status":obj.weather[0].main,
                "week": todayLabel,
                "date" : time,
                "wind" : obj.wind.speed,
                "humidity" : obj.main.humidity
                };
            }
			callback(weatherObj)
		}
	});
}

exports.weatherFunction = weatherFunction;

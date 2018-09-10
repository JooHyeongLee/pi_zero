var API_KEY = 'b29c6a6ca12d0a681e4f0f4e92b372b3';
var city = 'seoul';
var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
var request = require('request');
var response = require('response');
var exec = require('child_process').exec;
var flag = true;

function timeOperationFunction(time){
	var hour = time.substring(11,13);
	var minute= time.substring(14,16);
	var second = time.substring(17,19);

	if(hour =='20') {
		request(url,function(err,response,body){
			if(err)
				console.log(err);
			else if(flag){
				flag = false;
				var obj = JSON.parse(body);
				console.log('현재 기온: '+obj.main.temp);
				var run = exec("chromium-browser --app=http://localhost:3000/forecast -start-fullscreen",function(err,stdout,stderr){});
			}
		});
	}	
}
exports.timeOperationFunction = timeOperationFunction; 

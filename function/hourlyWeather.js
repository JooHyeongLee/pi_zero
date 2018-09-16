var API_KEY = 'b29c6a6ca12d0a681e4f0f4e92b372b3';
var city = 'seoul';
var url = `http://api.openweathermap.org/data/2.5/forecast?id=1835848&appid=${API_KEY}&units=metric`
var request = require('request');
var response = require('response');

function hourlyWeatherFunction(callback) {
    request(url,function(err,response,body) {
        if(err)
            console.log(err)
        else  
           obj = JSON.parse(body);
       callback(obj)
       console.log(obj.list)
    });
}
exports.hourlyWeatherFunction = hourlyWeatherFunction;

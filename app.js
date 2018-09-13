var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var response = require('response');
var date = require('date-utils');
var fs = require('fs');
var exec = require('child_process').exec;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('view engine','pug');
app.set('views','./views');
app.use(express.static(__dirname));
var Flickr = require('flickr-sdk');
var flickr = new Flickr('5c2e4d0d734ed64210332e42ccc0814c');
var oauth = new Flickr.OAuth(
	'5c2e4d0d734ed64210332e42ccc0814c',
	'23db734b8dd1b2e6'
);
//시스템 시간
var newDate;
var time;
//singleton 패턴
var singleton = require('./function/singleton');
//search 기능
var search = require('./function/search');
//flickr 감시
var watch = require('./function/watch');
//시간별 작업
var timeOp = require('./function/timeOperation');
//flickr gallery
var gallery = require('./function/gallery');
var myPhoto = require('./function/myPhoto');
//날씨 정보
var weather = require('./function/weather');
var hourlyWeather = require('./function/hourlyWeather');

app.get('/gallery',function(req,res){
	res.send('gallery');
	gallery.galleryFunction();
	var run = exec('sh gallery_show.sh',function(err,stdout,stderr){
		if(err) {}
		else
			var run = exec('sh kill.sh',function(err,stdout,stderr){});
	});
});
app.get('/forecast',function(req,res){
	console.log('get');
    hourlyWeather.hourlyWeatherFunction(function(hourly) {
        weather.weatherFunction(function(data){
            res.render('forecast',{data:JSON.stringify(data), hourly:JSON.stringify(hourly)});
        })
   });

});
app.post('/search_post',function(req,res) {
	search.searchFunction(req.body.postData)
	var run = exec('sh search_show.sh',function(err,stdout,stderr){
		if(err) {}
		else
			var run = exec('sh kill.sh',function(err,stdout,stderr){});
        });
	var inputData;
	req.on('data',function(data) {
		inputData = JSON.parse(data);
		console.log(data)
	});
	req.on('end',function() {
		console.log(inputData.postData);
	});
	res.write("OK!");
	res.end();
});
app.get('/exit',function(req,res){
	var run = exec('sh kill.sh',function(err,stdout,stderr){
		console.log(err);
	});
	res.send('exit');
});
app.get('/',function(req,res){
	var run = exec('sh show.sh',function(err,stdout,stderr){
		if(err){}
		else
			var run = exec('sh kill.sh',function(err,stdout,stderr){});
	});
});

app.listen(3000,function(){
	setInterval(function(){
		newDate = new Date();
		time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
		timeOp.timeOperationFunction(time);
	},1000);
	console.log('server connected');
	watch.watchFunction();
	var run = exec('sh show.sh',function(err,stdout,stderr){});
});

Array.prototype.compare = function(array) {
  array.sort();
  this.sort();
  if (!array) {
  return false;
	}
  if (this.length !== array.length) {
	  return false;
		}
	  for (var i = 0, l = this.length; i < l; i++) {
		  if (this[i] instanceof Array && array[i] instanceof Array) {
			if (!this[i].compare(array[i])) {
			return false;
				  }
					  }
			  else if (this[i] !== array[i]) {
					return false;
				}
			  }
			return true;
		}

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
var os = require('os');
var cron = require('node-cron');
//시스템 시간
var newDate;
var time;
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
//todo
var todoFlag = true;
//forecast
var castFlag = true;

app.get('/gallery',function(req,res){
	res.send('gallery');
	gallery.galleryFunction();
	var run = exec('sh ./shell_command/gallery_show.sh',function(err,stdout,stderr){
		if(err) {console.log(err);}
		else
			var run = exec('sh ./shell_command/kill.sh',function(err,stdout,stderr){});
	});
});
app.get('/forecast',function(req,res){
    hourlyWeather.hourlyWeatherFunction(function(hourly) {
        weather.weatherFunction(function(data){
            res.render('forecast',{data:JSON.stringify(data), hourly:JSON.stringify(hourly)});
			if(castFlag){
				exec("chromium-browser --app=http://localhost:3000/forecast -start-fullscreen", function(err,stdout,stderr){});
				exec('sh ./shell_command/kill.sh',function(err,stdout,stderr){});
				castFlag = false;		
			}
        })
   });
});
app.get('/todo',function(req,res){
	res.render('index');
	if(todoFlag){
		var run = exec("chromium-browser --app=http://localhost:3000/todo -start-fullscreen", function(err,stdout,stderr){});
		todoFlag = false;	
	}
});
app.get('/search_get',function(req,res){
	var networkInterfaces = os.networkInterfaces();
	var ipAddr = networkInterfaces.eth0[0].address;
	res.render('search',{ip:ipAddr});
});
app.post('/search_post',function(req,res) {
	const result = {'tf':true};
	search.searchFunction(req.body.word);
	setTimeout(function(){
		exec('sh ./shell_command/kill.sh',function(err,stdout,stderr){});
		exec('sh ./shell_command/search_show.sh',function(err,stdout,stderr){});
	},4000);
	res.json(result);
});
app.get('/exit',function(req,res){
	var run = exec('sh ./shell_command/kill.sh',function(err,stdout,stderr){
		console.log(err);
	});
	res.send('exit');
});
app.get('/',function(req,res){
	var run = exec('sh ./shell_command/show.sh',function(err,stdout,stderr){
		if(err){console.log(err);}
		else
			var run = exec('sh ./shell_command/kill.sh',function(err,stdout,stderr){});
	});
});

app.listen(3000,function(){
	setInterval(function(){
		newDate = new Date();
		time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
		timeOp.timeOperationFunction(time);
		//watch.watchFunction();
	},1000);
	cron.schedule('*/1 * * * *',function(){
		watch.watchFunction();	
	});
	console.log('server connected');
	var run = exec('sh ./shell_command/show.sh',function(err,stdout,stderr){});
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

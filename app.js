var express = require('express');
var app = express();
var request = require('request');
var response = require('response');
var date = require('date-utils');
var fs = require('fs');
var exec = require('child_process').exec;
app.set('view engine','pug');
app.set('views','./views');
var Flickr = require('flickr-sdk');
var flickr = new Flickr('5c2e4d0d734ed64210332e42ccc0814c');
var oauth = new Flickr.OAuth(
	'5c2e4d0d734ed64210332e42ccc0814c',
	'23db734b8dd1b2e6'
);
//singleton 패턴
var singleton = require('./function/singleton');
//flickr 감시
var watch = require('./function/watch');
//시간별 작업
var timeOp = require('./function/timeOperation');
//flickr gallery
var gallery = require('./function/gallery');
var myPhoto = require('./function/myPhoto');

app.get('/gallery',function(req,res){
	res.send('home');
	gallery.galleryFunction();
	var run = exec('sh gallery_show.sh',function(err,stdout,stderr){
		if(err) {}
		else
			var run = exec('sh kill.sh',function(err,stdout,stderr){});
	});
});
app.get('/weather',function(req,res){
	res.send('weather');
	var run = exec("chromium-browser --app=http://localhost:3000/forecast -start-fullscreen",function(err,stdout,stderr){});
});
app.get('/forecast',function(req,res){
	var url = 'https://farm6.staticflickr.com/5045/5294436653_2fca5b8a14.jpg';
	res.render('forecast',{data:JSON.stringify(url)});
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
		var newDate = new Date();
		var time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
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

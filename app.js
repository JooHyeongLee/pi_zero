var express = require('express');
var app = express();
var reques = require('request');
var fs = require('fs');
var exec = require('child_process').exec;
var Flickr = require('flickr-sdk');
var flickr = new Flickr('5c2e4d0d734ed64210332e42ccc0814c');
var oauth = new Flickr.OAuth(
	'5c2e4d0d734ed64210332e42ccc0814c',
	'23db734b8dd1b2e6'
);
//이미지 url 추출
var getUrl = require('./getUrl');
//이미지 다운로드 메소드
var download = require('./download');

app.get('/home',function(req,res){
	res.send('home');
});
app.get('/download',function(req,res,next){
	var name;
	var url;
	flickr.people.getPhotos({
		user_id: '142709372@N03'
	}).then(function(response){
		name = response.body.photos.photo[0].id;
		url = 'https://farm2.staticflickr.com/1867/44182668432_d2a965b718.jpg';
		download.downloadFunction(url,name,res,function(){
		console.log('done');
	});
	});
	res.send('download');
});
app.get('/show',function(req,res){
	var run = exec('sh show.sh',function(err,stdout,stderr){
		console.log(err);
	});
	res.send('show');
});
app.get('/exit',function(req,res){
	var run = exec('sh kill.sh',function(err,stdout,stderr){
		console.log(err);
	});
	res.send('exit');
});

app.listen(3000,function(){
	console.log('server connected');
	var photo_id;
	var file = [];
	var current;
	var farm_id, server_id, id, secret;
	setInterval(function() {
	flickr.people.getPhotos({
		user_id: '142709372@N03'
	}).then(function(res){
		for(var i=0;i<res.body.photos.total;i++)
			file[i] = res.body.photos.photo[i].id;
		current= file.length;
		if(res.body.photos.total != current)
			file = [];
	}).catch(function(err){
		console.error(err);
	});
	},2000);
	getUrl.getUrlFunction();
});

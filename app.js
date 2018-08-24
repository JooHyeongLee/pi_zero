var express = require('express');
var app = express();
var request = require('request');
var response = require('response');
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
//singleton 패턴
var singleton = require('./singleton');
//file 개수
var fileNum = require('./fileNum');

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
	var path = './img/';
	var file = [];
	setInterval(function() {
	flickr.people.getPhotos({
		user_id: '142709372@N03'
	}).then(function(res){
		for(var i=0;i<res.body.photos.total;i++)
			file[i] = res.body.photos.photo[i].id;

		fileNum.fileNumFunction(path,function(cnt){
		if(res.body.photos.total != cnt){
			file = [];
			getUrl.getUrlFunction();
			setTimeout(function() {
				for(var i=0;i<singleton.count;i++) {
					download.downloadFunction(singleton.url[i],singleton.name[i],response,function(){
						console.log('done');
					});
				}
			},1000);
		}});
	}).catch(function(err){
		console.error(err);
	});
	},2000);
});

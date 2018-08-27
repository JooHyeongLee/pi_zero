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
	setInterval(function() {
	flickr.people.getPhotos({
		user_id: '142709372@N03'
	}).then(function(res){
	var flickrFile = [];
		for(var i=0;i<res.body.photos.total;i++)
			flickrFile[i] = res.body.photos.photo[i].id;
		fileNum.fileNumFunction(path,function(localFile){
		/* flickr와 로컬의 파일이 일치하지 않을 때
		   로컬 파일을 flickr와 동일하게 삭제 및 다운로드*/
		if(!localFile.compare(flickrFile)){
			setTimeout(function() {
				//로컬파일이 더 많을 때 로컬파일 개수 기준으로 반복
				if(localFile.length>flickrFile.length){
					localFile.forEach(function(element) {
						if(flickrFile.indexOf(element)==-1){
							fs.unlink('./img/'+element,function(err){if(err) throw err;});
							getUrl.getUrlFunction(element,function(){
								download.downloadFunction(singleton.url[0],singleton.name[0],response,function(){
									console.log('done');
								});
							});
						}
					});
				}
				//flickr 파일이 더 많거나 같을 때 flickr 파일개수 기준으로 반복
				else {
					flickrFile.forEach(function(element) {
						if(localFile.indexOf(element)==-1){
								getUrl.getUrlFunction(element,function(){
								download.downloadFunction(singleton.url[0],singleton.name[0],response,function(){
									console.log('done');
								});
							});
						}
					});
				}
			},1000);
		}
		else
			console.log('local과 flickr 일치함');
		});
	}).catch(function(err){
		console.error(err);
	});
	},2000);
	var run = exec('sh show.sh',function(err,stdout,stderr){console.log(err);});
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

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
//singleton 패턴
var singleton = require('./function/singleton');
//flickr 감시
var watch = require('./function/watch');
//flickr gallery
var gallery = require('./function/gallery');
var myPhoto = require('./function/myPhoto');

app.get('/gallery',function(req,res){
	res.send('home');
	gallery.galleryFunction();
});
app.get('/exit',function(req,res){
	var run = exec('sh kill.sh',function(err,stdout,stderr){
		console.log(err);
	});
	res.send('exit');
});
app.get('/show',function(req,res){
	var run = exec('sh show.sh',function(err,stdout,stderr){console.log(err);});
});

app.listen(3000,function(){
	console.log('server connected');
	watch.watchFunction();
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

var express = require('express');
var app = express();
var request = require('request');
var fs = require('fs');
var exec = require('child_process').exec;
var pinterestAPI = require('pinterest-api');
const PORT = process.env.PORT

var download = function(url,filename,callback){
	request.head(url,function(err,res,body){
		console.log('content-type:',res.headers['content-type']);
		console.log('content-length:',res.headers['content-length']);
	request(url).pipe(fs.createWriteStream('./img/'+filename)).on('close',callback);
	});	
};
app.get('/home',function(req,res){
	res.send('home');
});
app.get('/download',function(req,res,next){
	var pinterest = pinterestAPI('godparty');
	pinterest.getPinsFromBoard('project',true,function(pins){
		var count = pins.data.length;
		var url = [];
		for(var i=0; i<count; i++){
			url.push(pins.data[i].images['237x'].url);
			download(url[i],pins.data[i].id,function(){
				console.log('done');
			});
		}
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

app.listen(PORT,function(){
	console.log('server connected');
	var pinterest = pinterestAPI('godparty');
	var curr = [];
	var i = 0;
	if(i>2)
		i = 0;
	pinterest.getPinsFromBoard('project',true,function(pins){
	setInterval(function() {
		curr[i] = pins.data.length;
		i++;
		console.log(curr);
	},3000);
	});
});

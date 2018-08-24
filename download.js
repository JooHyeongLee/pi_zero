var fs = require('fs');
var exec = require('child_process').exec;
var request = require('request');

function downloadFunction(url,filename,res,callback) {
	request.head(url,function(err,res,body){
		console.log('content-type:',res.headers['content-type']);
		console.log('content-length:',res.headers['content-length']);
	request(url).pipe(fs.createWriteStream('./img/'+filename)).on('close',callback);
	});	
}
exports.downloadFunction = downloadFunction;

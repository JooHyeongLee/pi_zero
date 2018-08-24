var fs = require('fs');

function fileNumFunction(path,callback) {
var i = 0;
fs.readdir(path, function (err, files) {
	if(err) throw err;
  		files.forEach(function(file) {
			i++;
		});
	});
	setTimeout(function(){return callback(i);},500);
}
exports.fileNumFunction = fileNumFunction;

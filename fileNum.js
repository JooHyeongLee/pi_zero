var fs = require('fs');

function fileNumFunction(path,callback) {
var list = [];
fs.readdir(path, function (err, files) {
	if(err) throw err;
  		files.forEach(function(file) {
			list.push(file);
		});
	});
	setTimeout(function(){return callback(list);},500);
}
exports.fileNumFunction = fileNumFunction;

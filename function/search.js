var Flickr = require('flickr-sdk');
var flickr = new Flickr('5c2e4d0d734ed64210332e42ccc0814c');
var download = require('./download');
var fs = require('fs');
var response = require('response');

function searchFunction(word) {
	path = './search_img/';
	flickr.photos.search({
		text: word
	}).then(function(res) {
		for(var i=0;i<10;i++) {
			var url ='https://farm'+res.body.photos.photo[i].farm+'.staticflickr.com/'+res.body.photos.photo[i].server+'/'+res.body.photos.photo[i].id+'_'+res.body.photos.photo[i].secret+'.jpg'
			download.downloadFunction(path,url,res.body.photos.photo[i].id,response,function() {console.log('done')});
		}
	}).catch(function(err) {
		console.error('bonk',err);
	});
}

exports.searchFunction = searchFunction;

var Flickr = require('flickr-sdk');
var flickr = new Flickr('5c2e4d0d734ed64210332e42ccc0814c');
var download = require('./download');
var response = require('response');

function myPhotoFunction() {
	var path = './img/';
	flickr.people.getPhotos({
		user_id: '142709372@N03'
	}).then(function(res) {
		res.body.photos.photo.forEach(function(element){
			var url ='https://farm'+element.farm+'.staticflickr.com/'+element.server+'/'+element.id+'_'+element.secret+'.jpg'
			download.downloadFunction(path,url,element.id,response,function(){console.log('done')});
		});
	});
}

function myPhotoPartFunction(element) {
	var path = './img/';
	flickr.photos.getInfo({
		photo_id: element
	}).then(function(res) {
		var url ='https://farm'+res.body.photo.farm+'.staticflickr.com/'+res.body.photo.server+'/'+res.body.photo.id+'_'+res.body.photo.secret+'.jpg'
		download.downloadFunction(path,url,res.body.photo.id,response,function(){console.log('done')});
	})
}
exports.myPhotoFunction = myPhotoFunction;
exports.myPhotoPartFunction = myPhotoPartFunction;

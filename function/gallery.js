var Flickr = require('flickr-sdk');
var flickr = new Flickr('5c2e4d0d734ed64210332e42ccc0814c');
var download = require('./download');
var fs = require('fs');
var response = require('response');

function galleryFunction() {
	var path = './gallery_img/';
	flickr.galleries.getPhotos({
		gallery_id: '72157700635747985'
	}).then(function(res){
		//현재 갤러리 페이지에 있는 사진 개수만큼 반복
		res.body.photos.photo.forEach(function(element){
			var url ='https://farm'+element.farm+'.staticflickr.com/'+element.server+'/'+element.id+'_'+element.secret+'.jpg'
			console.log(url)
			download.downloadFunction(path,url,element.id,response,function(){ console.log('done')});
		});
	})
}
exports.galleryFunction = galleryFunction;

var Flickr = require('flickr-sdk');
var flickr = new Flickr('5c2e4d0d734ed64210332e42ccc0814c');
var singleton = require('./singleton');
var oauth = new Flickr.OAuth(
	'5c2e4d0d734ed64210332e42ccc0814c',
	'23db734b8dd1b2e6'
);
function getUrlFunction(p_id,callback) {
	var urls = [];
	var names = [];
	flickr.people.getPhotos({
		user_id: '142709372@N03'
	}).then(function(res1) {
		flickr.photos.getInfo({
			//photo_id: res1.body.photos.photo[i].id
			photo_id : p_id
		}).then(function(res){
			farm_id = res.body.photo.farm;
			server_id = res.body.photo.server;
			id = res.body.photo.id;
			secret = res.body.photo.secret;
			urls.push('https://farm'+farm_id+'.staticflickr.com/'+server_id+'/'+id+'_'+secret+'.jpg');
			names.push(id);
		}).then(function(){
			singleton.url = urls;
			singleton.count = res1.body.photos.total;
			singleton.name = names;
			callback(singleton);
		})
	}).catch(function(err){
		console.log(err);
	});
}

exports.getUrlFunction = getUrlFunction;

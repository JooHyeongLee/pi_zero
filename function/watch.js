var Flickr = require('flickr-sdk');
var flickr = new Flickr('5c2e4d0d734ed64210332e42ccc0814c');

var exec = require('child_process').exec;
var fs = require('fs');
var request = require('request');
var response = require('response');

//내 포토스트림 이미지 가져오기
var myPhoto = require('./myPhoto');
//이미지 다운로드 메소드
var download = require('./download');
//singleton 패턴
var singleton = require('./singleton');
//file 개수
var fileNum = require('./fileNum');

function watchFunction() {
	var path = './img/';
	setInterval(function() {
	flickr.people.getPhotos({
		user_id: '142709372@N03'
	}).then(function(res){
		var flickrFile = [];
		res.body.photos.photo.forEach(function(element){
			flickrFile.push(element.id);
		});
		fileNum.fileNumFunction(path,function(localFile){
		/* flickr와 로컬의 파일이 일치하지 않을 때
		   로컬 파일을 flickr와 동일하게 삭제 및 다운로드*/
		if(!localFile.compare(flickrFile)){
			//로컬에 파일이 없을 시에 모두 다운로드
			if(localFile.length==0)
				myPhoto.myPhotoFunction();
			else {
				flickrFile.forEach(function(element){
					if(localFile.indexOf(element)==-1)
						myPhoto.myPhotoPartFunction(element);
				})
				localFile.forEach(function(element){
					if(flickrFile.indexOf(element)==-1) {
						fs.unlink(path+element,function(err){if(err) throw err; else console.log('done')});
					}
				})
			}
		}
		else{
			//console.log('local과 flickr 일치함');
		}
			});
	}).catch(function(err){
		console.error(err);
	});
	},3000);
}
exports.watchFunction = watchFunction;

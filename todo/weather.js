const COORDS = 'coords';

function saveCoords(coordsObj){
	localStorage.setItem(COORDS,JSON.stringify(coordsObj))
}

function handleGeoSuccess(position){
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude,longitude
	};
	saveCoords(coordsObj)
}

function handleGeoError(){
	console.log('error')
}

function askForCoords(){
	navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError)
}

function loadCoords(){
	const loadCoords = localStorage.getItem(COORDS)
	if(loadCoords === null) {
		askForCoords();
	}
	else {
		console.log(loadCoords)	
	}
}
function init() {
	loadCoords();
}

init();

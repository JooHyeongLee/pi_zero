const body = document.querySelector("body")
const IMG_NUMBER = 2;

function paintImage(){
	const randomNumber = genRandom();
	const image = new Image();
	image.src=`../images/1.jpg`
	image.classList.add("bgImage")
	body.appendChild(image)
}
function genRandom(){
	const number = Math.floor(Math.random()*IMG_NUMBER);
	return number;
}
function init(){
	paintImage();
}
init();


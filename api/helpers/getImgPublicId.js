
const getImgPublicId = (url) => {

	const urlArr = url.split('/');
	const name = urlArr[urlArr.length-1];

	return name.split('.')[0];
} 

module.exports = getImgPublicId;
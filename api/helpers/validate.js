
const isNumber = (...values) => {

	let res = true;

	values.map(el => {

		if(isNaN(el) || !el || Number(el) < 0) res = false;
	})

	return res;
}


const isText = (...values) => {

	if(typeof values[0] === 'object') values = values[0];
	
	let res = true;
	const regText = /^[A-Za-zñÑ-áéíóúÁÉÍÓÚ\s]+$/i;
	
	values.map(el => {
		
		if(!regText.test(el) || !el) res = false;
	})

	return res;
}


const isUUID = (id) => {
	const regId = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	return regId.test(id);
}


module.exports = {
	isNumber,
	isText,
	isUUID

}
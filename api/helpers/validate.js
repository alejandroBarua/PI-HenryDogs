
const isNumber = (...values) => {

	let res = true;

	values.map(el => {

		if(isNaN(el) || !el) res = false;
	})

	return res;
}


const isText = (...values) => {

	if(typeof values[0] === 'object') values = values[0];
	
	let res = true;
	const expReg = /^[A-Za-zñÑ-áéíóúÁÉÍÓÚ\s]+$/i;
	
	values.map(el => {
		
		if(!expReg.test(el) || !el) res = false;
	})

	return res;
}



module.exports = {
	isNumber,
	isText,

}
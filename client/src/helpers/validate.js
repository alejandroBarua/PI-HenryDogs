
const isNumber = (value) => {

	return (isNaN(value) || !value || Number(value) <= 0) ? false : true;

}

const minMax = (num1, num2) => {

	if(!num1 || !num2) return true;
	return Number(num1) < Number(num2) ? true : false
}

const isText = (value) => {

	const regText = /^[A-Za-zñÑ-áéíóúÁÉÍÓÚ\s]+$/i;
	
	return (!regText.test(value) || !value.trim() || value.length > 50) ? false : true;
}


export const validateInput = (input) => {

	return {
		...input,
		name: !isText(input.name),
		minWeight: !isNumber(input.minWeight) || !minMax(input.minWeight, input.maxWeight),
		maxWeight: !isNumber(input.maxWeight) || !minMax(input.minWeight, input.maxWeight),
		minHeight: !isNumber(input.minHeight) || !minMax(input.minHeight, input.maxHeight),
		maxHeight: !isNumber(input.maxHeight)|| !minMax(input.minHeight, input.maxHeight),
		minYear: !isNumber(input.minYear) || !minMax(input.minYear, input.maxYear),
		maxYear: !isNumber(input.maxYear) || !minMax(input.minYear, input.maxYear)
	}
}

export const validateFile = (file) => {

	if(!file) return true;

	const type = file.type.split('/')[1];
	const validExtensions = ['png', 'jpg', 'jpeg', 'webp', 'gif'];

	return validExtensions.includes(type);
}
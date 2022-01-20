
export const sortWeightDES = (a, b) => {

	const getNum = (el) => {
		
		let num = el.weight.split(' ');
		if(num.length === 2) return Number(num[0]) || 69;
		if(num.length === 4) return num[2];
	}

	const num1 = getNum(a);
	const num2 = getNum(b);

	return num2 - num1;
}


export const sortNameAZ = (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())

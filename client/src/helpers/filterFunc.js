
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


export const sortDogs = (opt, dogs) => {

	if(opt === 1) return dogs.sort(sortNameAZ);
	if(opt === 2) return dogs.sort(sortNameAZ).reverse();
	if(opt === 3) return dogs.sort(sortWeightDES).reverse();
	if(opt === 4) return dogs.sort(sortWeightDES);
}

export const filterByTemps = (filterTemps, payload) => {

	if(!filterTemps.length) return payload;

	return payload.filter(el => {
		
		const interception = el.temps.filter(temp => filterTemps.includes(temp));
		return interception.length === filterTemps.length;
	})
}
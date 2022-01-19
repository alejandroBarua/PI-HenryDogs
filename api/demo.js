/* const getDogModelApi = (dataApi = [], filterTemps = []) => {

	filterTemps = filterTemps.map(el => el.toLowerCase());

	return dataApi.reduce((beforeValue, el) => {

		if(filterTemps.length){

			if(el.temperament){
				
				const tempsAPi = el.temperament.toLowerCase().split(', ');
				const interceptionTemps = tempsAPi.filter(value => filterTemps.includes(value));
	
				return interceptionTemps.length === filterTemps.length ?
					beforeValue.concat(dogModel(el))
					: beforeValue;
			}

			return beforeValue;
		}

		return beforeValue.concat(dogModel(el));

	}, [])
} */


/* const { isNumber } = require('../helpers/validate');

const pagination = (data, page, limit) => {

	if(!isNumber(page) || !isNumber(limit)){
		page = 1;
		limit = 40;
	}

	const offset = page * limit - limit;

	if(limit > data.length || limit * page > data.length){
		limit = data.length;
	}
	
	return data.slice(offset, page * limit);
}

module.exports = pagination; */


const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let limit = 3

const pagination = (data, page, limit) => {
	
	const offset = page * limit - limit;
	return data.slice(offset, page*limit);
}

let page = 3

const res = paginacion(nums, page, limit);

console.log(res);
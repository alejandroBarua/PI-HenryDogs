const { isNumber } = require('../helpers/validate');

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

module.exports = pagination;
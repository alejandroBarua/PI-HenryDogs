
export const paginate = (data, page, limit) => {

	const offset = page * limit - limit;

	if(limit > data.length || limit * page > data.length){
		limit = data.length;
	}
	
	return data.slice(offset, page * limit);
}
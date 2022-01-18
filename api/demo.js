
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let limit = 3

const pagination = (data, page, limit) => {
	
	const offset = page * limit - limit;
	return data.slice(offset, page*limit);
}

let page = 3

const res = paginacion(nums, page, limit);

console.log(res);
const num1 = "12a"
const num2 = "ga2"
const num3 = 12


const isNumber = (...values) => {

	let res = true;

	values.map(el => {

		if(isNaN(el) || !el) res = false;
	})

	return res;
}

const res = isNumber(num1);
console.log(res);

const names = [
	{
		id: 1,
		name: "arbol"
	},
	{
		id: 2,
		name: "amarillo"
	},
	{
		id: 3,
		name: "azul azul"
	},
	{
		id: 4,
		name: "tomate"
	}

]



const getName = (values, regex) => {
	
	return values.reduce((beforeValue, el) => {

		if(regex){
			return regex.test(el.name) ? beforeValue.concat({name: el.name + "hola"}) : beforeValue;
		}

		return beforeValue.concat({name: el.name + "hola"});

	}, [])
}

const code = 'zx';
const regName = new RegExp(code, 'i');

const res = getName(names, regName);

console.log(res);
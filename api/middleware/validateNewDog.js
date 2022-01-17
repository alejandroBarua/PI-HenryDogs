const { isNumber, isText } = require('../helpers/validate');
const { Dog } = require('../models');


const validateValuesDog = async(req, res, next) => {

		const { 
		name, 
		minWeight, maxWeight, 
		minHeight, maxHeight, 
		minAge, maxAge, 
		temps,
	} = req.body;

	if(!isText(name) || !isText(temps)){
		return res.status(400).json({msg: "the value is invalid"})
	}

	if(!isNumber(minWeight, maxWeight, minHeight, maxHeight, minAge, maxAge)){
		return res.status(400).json({msg: "the value is invalid"})
	}

	next();
}


const validateDogNotExist = async(req, res, next) => {

	const { name } = req.body;

	try {

		const dog = await Dog.findOne({ where: { name }});
		if(dog)return res.status(400).json({ msg: 'the name is not available' });
		
	} catch (error) {

		console.log(err)
		return res.status(500).json({ msg: "server error" });
	}

	next();
}

/* 

1. investigar como guardar imagenes dentro del proyecto porque no se pueden guardar en la base de datos
2. hacer validaciones para la imagen
3. poner la ruta de la imagen por defecto
4. hacer la relacion de muchos a muchos con los temperamentos ingresados

*/

module.exports = {
	validateValuesDog,
	validateDogNotExist,

}
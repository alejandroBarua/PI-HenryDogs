const { request, response } = require('express');

const { isNumber, isText } = require('../helpers/validate');
const { Dog } = require('../models');


const validateValuesDog = async(req = request, res = response, next) => {

	const { 
		name, 
		minWeight, maxWeight, 
		minHeight, maxHeight, 
		minYear, maxYear, 
		temps,
	} = req.body;

	if(!isText(name)){
		return res.status(400).json({error: "The name is invalid."})
	}

	if(!isText(temps)){
		return res.status(400).json({error: "The temperaments is invalid."})
	}

	if(!isNumber(minWeight, maxWeight) || Number(maxWeight) <= Number(minWeight)){
		return res.status(400).json({error: "The weight is invalid."})
	}

	if(!isNumber(minHeight, maxHeight) || Number(maxHeight) <= Number(minHeight)){
		return res.status(400).json({error: "The height is invalid."})
	}

	if(!isNumber(minYear, maxYear) || Number(maxYear) <= Number(minYear)){
		return res.status(400).json({error: "The year is invalid."})
	}

	next();
}


const validateDogNotExist = async(req = request, res = response, next) => {

	const { name } = req.body;

	try {

		const dog = await Dog.findOne({ where: { name }});
		if(dog)return res.status(400).json({ error: 'The name already exists in the database.' });
		
	} catch (error) {

		console.log(error)
		return res.status(500).json({ error: "Server error." });
	}

	next();
}


const validateImage = async(req = request, res = response, next) => {

	if(!req.files) return next();

	if (Object.keys(req.files).length > 1) {
    return res.status(400).json({ 
			error: 'Choose only one file.' 
		})
  }

  const { image } = req.files;
	const type = image.mimetype.split('/')[1];

	const validExtensions = ['png', 'jpg', 'jpeg', 'webp', 'gif'];

	if(!validExtensions.includes(type)){
		return res.status(400).json({ 
			error: `The extension ${type} is not valid.`
		})
	}

	next();
}


module.exports = {
	validateValuesDog,
	validateDogNotExist,
	validateImage

}
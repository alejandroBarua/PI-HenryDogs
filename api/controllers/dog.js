const { request, response } = require('express');

const { Dog } = require('../models');


const createDog = async(req = request, res = response) => {

	const { 
		name, 
		minWeight, maxWeight, 
		minHeight, maxHeight, 
		minAge, maxAge, 
		temps,
		image 
	} = req.body;


	const getRange = (min, max) => `${parseInt(min)}-${parseInt(max)}`;

	const weight = getRange(minWeight, maxWeight);
	const height = getRange(minHeight, maxHeight);
	const age = getRange(minAge, maxAge);

	const newDog = await Dog.create({ name, weight, height, age, image });

	res.status(201).json({
		msg: 'Post /api/dog',
		newDog
	})

}



module.exports = {
	createDog,

}
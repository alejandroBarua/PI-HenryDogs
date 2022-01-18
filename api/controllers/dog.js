const { request, response } = require('express');

const { Dog, Temp } = require('../models');


const createDog = async(req = request, res = response) => {

	let { 
		name, 
		minWeight, maxWeight, 
		minHeight, maxHeight, 
		minYear, maxYear, 
		temps,
	} = req.body;

	temps = [...new Set(temps)];

	const getRange = (min, max) => `${parseInt(min)}-${parseInt(max)}`;

	const weight = getRange(minWeight, maxWeight);
	const height = getRange(minHeight, maxHeight);
	const life_span = getRange(minYear, maxYear);

	try {

		const newDog = await Dog.create({ name, weight, height, life_span });

		const promises = temps.map(el => Temp.findOne({ where: { name: el }}));
		const tempsDB = await Promise.all(promises);

		await newDog.addTemps(tempsDB);

		res.status(201).json({ data: newDog });

	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: "Server error." });		
	}
}


module.exports = {
	createDog,

}
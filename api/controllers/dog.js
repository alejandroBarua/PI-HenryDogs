const { request, response } = require('express');

const { Dog, Temp } = require('../models');



const createDog = async(req = request, res = response) => {

	let { 
		name, 
		minWeight, maxWeight, 
		minHeight, maxHeight, 
		minAge, maxAge, 
		temps,
	} = req.body;

	temps = [...new Set(temps)];

	const getRange = (min, max) => `${parseInt(min)}-${parseInt(max)}`;

	const weight = getRange(minWeight, maxWeight);
	const height = getRange(minHeight, maxHeight);
	const age = getRange(minAge, maxAge);

	try {

		const newDog = await Dog.create({ name, weight, height, age });

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
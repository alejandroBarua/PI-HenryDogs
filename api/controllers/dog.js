const { request, response } = require('express');

const { Dog, Temp } = require('../models');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);


const createDog = async(req = request, res = response) => {

	let { 
		name, 
		minWeight, maxWeight, 
		minHeight, maxHeight, 
		minYear, maxYear, 
		temps,
	} = req.body;

	temps = [...new Set(temps)];

	const getRange = (min, max) => `${parseInt(min)} - ${parseInt(max)}`;

	const weight = getRange(minWeight, maxWeight) + ' kg';
	const height = getRange(minHeight, maxHeight) + ' cm';
	const life_span = getRange(minYear, maxYear) + ' years';

	try {

		const newDog = await Dog.create({ name, weight, height, life_span });

		const promises = temps.map(el => Temp.findOne({ where: { name: el }}));
		const tempsDB = await Promise.all(promises);

		await newDog.addTemps(tempsDB);

		res.status(201).json(newDog);

	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: "Server error." });		
	}
}

const deleteDog = async(req = request, res = response) => {

	const { id } = req.params;

	try {

	 	const dogDB = await Dog.findOne({ where: { id }});
		
	 	if(!dogDB) {
			return res.status(400).json({ error: 'The id is not valid.' })
	 	}

		await Dog.destroy({ where: { id }});

		if (dogDB.imgUrl) {
			const nameArr = dogDB.imgUrl.split('/');
			const name = nameArr[nameArr.length-1];
			const [ public_id ] = name.split('.');
			cloudinary.uploader.destroy(public_id);
		}

  	res.status(200).json(dogDB)

	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: "Server error." });
	}

}


module.exports = {
	createDog,
	deleteDog,

}
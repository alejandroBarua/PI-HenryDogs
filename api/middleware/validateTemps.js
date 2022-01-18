const { request, response } = require('express');

const { Temp } = require('../models');


const validateTemps = async(req = request, res = response, next) => {

	let { temps } = req.body;
	temps = [...new Set(temps)];

	try {

		const promises = temps.map(el => Temp.findOne({ where: { name: el }}));
		const tempsDB = await Promise.all(promises);

		if(tempsDB.includes(null)){
			return res.status(400).json({ error: "Temperament does not exist." });
		}
		
	} catch (error) {
		
		console.log(err)
		return res.status(500).json({ error: "Server error." });
	}
	
	next();
}

module.exports = validateTemps;
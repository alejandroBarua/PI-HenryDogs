const { request, response } = require('express');
const axios = require('axios');

const { Temp } = require('../models');

const { extractTemps } = require('../utils/temp');


const getTemps = async(req = request, res = response) => {

	try {
		
		let temps = await Temp.findAll({ attributes: ['name'] });
		temps = temps.map(el => el.name);
		
		if(temps.length !== 0){
			return res.status(200).json(temps);
		}
			
		const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`);
	
		const results = extractTemps(data);
	
		const promises = results.map(el => Temp.create({ name: el }));
	
		await Promise.all(promises);
		let tempsDB = await Temp.findAll({ attributes: ['name'] });
		tempsDB = tempsDB.map(el => el.name);
	
		res.status(200).json(tempsDB);

	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: "Server error." });
	}
}


module.exports = {
	getTemps,

}
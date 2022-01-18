const axios = require('axios');

const { Dog } = require('../models');

const getDogModel = require('../utils/getDogModel');


const getDogsAll = async(req, res) => {

	try {

		const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`);
		const results = getDogModel(data);

		res.status(200).json(results);
		
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: "Server error." });
	}
}


const getDogByIdDB = async(req, res) => {

	const { id } = req.params;

	try {

		const dogDB = await Dog.findOne({ 
			where: { id },
			attributes: ['id', 'name', 'weight', 'height', 'life_span', 'imgUrl']
		})
		
		if(!dogDB){
			return res.status(400).json({
				error: 'The id is not valid.'
			})
		}

		const { name, weight, height, life_span, imgUrl } = dogDB;

		let temps = await dogDB.getTemps();
		temps = temps.map(el => el.name);

		res.status(200).json({
			id,
			name, 
			weight, 
			height, 
			life_span, 
			imgUrl,
			temps
		})

	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: "Server error." });
	}
}


module.exports = {
	getDogsAll,
	getDogByIdDB,

}
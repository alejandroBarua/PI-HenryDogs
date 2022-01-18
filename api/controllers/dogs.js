const { request, response } = require('express');
const axios = require('axios');
const Op = require('sequelize').Op;

const { Dog } = require('../models');

const { getDogModelApi, getDogModelDB } = require('../utils/getDogModel');


const getDogsAll = async(req = request, res = response) => {

	const { name } = req.query;
	const { connectAPI = true, connectDB = true, filterTemps = [], page = 1, limit = 8 } = req.body;

	
	try {

		let dataAPI = [],
			dataDB = [];

		if(connectAPI){

			let { data } = name ?
			await axios.get(`https://api.thedogapi.com/v1/breeds/search?api_key=${process.env.API_KEY}&q=${name}`)
			: await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`);

			dataAPI = getDogModelApi(data, filterTemps);
		}
		
		if(connectDB){

			const query = {
				attributes: ['id', 'name', 'weight', 'height', 'life_span', 'imgUrl'],
				include: 'Temps'
			}

			dataDB = name ? 
			await Dog.findAll({
				where: {
					name: {
						[Op.like]: `%${name}%`
					}
				},
				...query
			})
			: await Dog.findAll(query);
			
			dataDB = getDogModelDB(dataDB, filterTemps);
		}

		const results = [...dataAPI, ...dataDB];

		res.status(200).json({
			total: results.length,
			results
		});
		
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: "Server error." });
	}
}


const getDogByIdDB = async(req = request, res = response) => {

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
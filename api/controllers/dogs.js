const { request, response } = require('express');
const axios = require('axios');
const Op = require('sequelize').Op;

const { Dog } = require('../models');

const { getDogModelApi, getDogModelDB } = require('../utils/getDogModel');


const getDogsAll = async(req = request, res = response) => {

	const { name, connect } = req.query;

	try {

		let dataAPI = [], 
		dataDB = [];

		if(connect === 'dataAll' || connect === 'dataAPI'){
			
			let { data } = name ?
				await axios.get(`https://api.thedogapi.com/v1/breeds/search?api_key=${process.env.API_KEY}&q=${name}`)
				: await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`);
	
			dataAPI = getDogModelApi(data);
		}

		
		if(connect === 'dataAll' || connect === 'dataDB'){

			const query = {
				attributes: ['id', 'name', 'weight', 'imgUrl'],
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
			
			dataDB = getDogModelDB(dataDB);
		}

		let results = [...dataDB, ...dataAPI];

		res.status(200).json(results);
		
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: "Server error." });
	}
}


const getDogByIdAPI = async(req = request, res = response) => {

	const { id } = req.params;

	try {
		
		const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${process.env.API_KEY}`);

		if(Object.keys(data).length === 0) {

			return res.status(400).json({
				error: 'The id is not valid.'
			})
		}
			
		const dog = getDogModelApi([data], true)[0];
		res.status(200).json(dog);
		
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: "Server error." });
	}

}


module.exports = {
	getDogsAll,
	getDogByIdAPI,

}
const { request, response } = require('express');

const axios = require('axios');

const { getDogModelApi } = require('../utils/getDogModel');

const getDogByIdAPI = async(req = request, res = response, next) => {

	const { id } = req.params;

	console.log(id);

	try {
		
		const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${process.env.API_KEY}`);

		if(Object.keys(data).length !== 0){

			const dog = getDogModelApi([data], true)[0];

			return res.status(200).json(dog);
		}

	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: "Server error." });
	}

	next();
}

module.exports = getDogByIdAPI;
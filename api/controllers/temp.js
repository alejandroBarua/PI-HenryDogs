const { request, response } = require('express');
const axios = require('axios');

const { Temp } = require('../models');

const { extractTemps } = require('../helpers/temp');


const getTemps = async(req = request, res = response) => {

	let temps = await Temp.findAll({ attributes: ['id', 'name'] });

	if(temps.length !== 0){
		return res.status(200).json({ temps });
	}
		
	const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`);

	const results = extractTemps(data);

	const promises = results.map(el => Temp.create({ name: el }));

	Promise.all(promises)
		.then(res => {
			console.log('temps created');
			return Temp.findAll();
		})
		.then(temps => res.status(200).json({ temps }))
		.catch(err => {
			console.log(err)
			return res.status(500).json({ msg: "server error" });
		})

}



module.exports = {
	getTemps,

}
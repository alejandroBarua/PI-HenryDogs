const { request, response } = require('express');

const { Dog } = require('../models');

const { isId } = require('../helpers/validate');



const getDogByIdDB = async(req = request, res = response, next) => {

	const { id } = req.params;

	if(!isId(id)) return next();

	try {

		const dogDB = await Dog.findOne({ 
			where: { id },
			attributes: ['id', 'name', 'weight', 'height', 'life_span', 'imgUrl']
		})
		
		if(!dogDB) return next();

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


module.exports = getDogByIdDB;

const { Dog } = require('../models');

const axios = require('axios');

const { isId } = require('../helpers/validate');


const getDogById = async(req, res) => {

	const { id } = req.params;

	try {

		const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`);

		const dog = data.filter(el => el.id === Number(id));

		if(dog.length === 1){

			const { name, weight, height, life_span, temperament, image } = dog[0];
			
			return res.status(200).json({
				data: {
					dog: { 
						id,
						name,
						weight: weight.metric,
						height: height.metric,
						life_span,
						imgUrl: image.url
					},
					temps: temperament.split(', ')
				}})
		}

		if(!isId(id)){
			return res.status(400).json({ error: 'The id is not valid.' })
		}
		
		const dogDB = await Dog.findOne({ 
			where: { id },
			attributes: ['id', 'name', 'weight', 'height', 'life_span', 'imgUrl']
		})
		
		if(!dogDB){
			return res.status(400).json({
				error: 'The id is not valid.'
			})
		}

		let temps = await dogDB.getTemps();
		temps = temps.map(el => el.name);

		res.status(200).json({
			data: {
				dog: dogDB,
				temps
			}		
		})

	} catch (error) {
		
		console.log(error)
		return res.status(500).json({ error: "Server error." });
	}

}



module.exports = {
	getDogById,

}
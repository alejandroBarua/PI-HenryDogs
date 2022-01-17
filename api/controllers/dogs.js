const { Dog } = require('../models');

const getDogById = async(req, res) => {

	const { id } = req.params;

	try {
		
		const dog = await Dog.findOne({ 
			where: { id },
			attributes: ['id', 'name', 'weight', 'height', 'age']
		})
		
		if(!dog){
			return res.status(400).json({
				error: 'The id is not valid.'
			})
		}
		
		let temps = await dog.getTemps();
		temps = temps.map(el => el.name);

		res.status(200).json({
			data: {
				dog,
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
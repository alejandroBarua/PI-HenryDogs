const path = require('path');

const { Dog } = require('../models');

const getImgById = async(req, res) => {

	const { id } = req.params;

	try {
		
		const dog = await Dog.findOne({ 
			where: { id },
			attributes: ['image']
		})
		
		if(!dog){
			return res.status(400).json({
				error: 'The id is not valid.'
			})
		}

		const pathImage = path.join(__dirname, '../uploads/', dog.image);
		res.status(200).sendFile(pathImage)

	} catch (error) {
		
		console.log(error)
		return res.status(500).json({ error: "Server error." });
	}

}



module.exports = {
	getImgById,

}
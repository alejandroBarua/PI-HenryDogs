const { request, response } = require('express');
const path = require('path');

const { Dog } = require('../models');

const uploadImage = require('../utils/uploadImage');


const getImgById = async(req = request, res = response) => {

	const { id } = req.params;

	try {
		
		const dog = await Dog.findOne({ 
			where: { id },
			attributes: ['imgName']
		})
		
		if(!dog){
			return res.status(400).json({
				error: 'The id is not valid.'
			})
		}

		const pathImage = path.join(__dirname, '../uploads/', dog.imgName);
		res.status(200).sendFile(pathImage)

	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: "Server error." });
	}

}


const createImage = async(req = request, res = response) => {

	const { id } = req.params;

	try {

		const dog = await Dog.findOne({ where: { id } });

		if(!dog || dog.imgUrl){
			return res.status(400).json({
				error: 'The id is not valid.'
			})
		}

		const imgName = await uploadImage(req.files, id);
		const imgUrl = `http://localhost:${process.env.PORT}/api/img/${id}`;

		await Dog.update({ imgName, imgUrl }, { where: { id } });

		res.status(201).json({
			imgName,
			imgUrl
		})

	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: "Server error." });
	}

}


module.exports = {
	getImgById,
	createImage
}
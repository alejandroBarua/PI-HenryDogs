const { request, response } = require('express');

const { Dog } = require('../models');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);


const createImage = async(req = request, res = response) => {

	const { id } = req.params;

	try {

		const dog = await Dog.findOne({ where: { id } });

		if(!dog){
			return res.status(400).json({
				error: 'The id is not valid.'
			})
		}

		if (dog.imgUrl) {
			const nameArr = dog.image.split('/');
			const name = nameArr[nameArr.length-1];
			const [ public_id ] = name.split('.');
			cloudinary.uploader.destroy(public_id);
		}


		const { tempFilePath } = req.files.image;
		const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

		await Dog.update({ imgUrl: secure_url }, { where: { id } });

		res.status(201).json({
			id,
			secure_url
		})

	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: "Server error." });
	}

}


module.exports = {
	createImage
}
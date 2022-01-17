const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadImage = (files) => {

	return new Promise((resolve, reject) => {

		if(!files) return resolve('defaultImage.png');
		if(!files.image) return resolve('defaultImage.png');

		const { image } = files;

		const type = image.mimetype.split('/')[1];
		const nameImage = uuidv4() + '.' + type;

		const uploadPath = path.join(__dirname, '../uploads/', nameImage);

		image.mv(uploadPath, (err) => {

			if (err) reject(err);
		})

		resolve(nameImage);
	})
}

module.exports = uploadImage;
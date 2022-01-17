const path = require('path');

const uploadImage = (files, dogId) => {

	return new Promise((resolve, reject) => {

		if(!files) return resolve('defaultImage.png');
		if(!files.image) return resolve('defaultImage.png');

		const { image } = files;

		const type = image.mimetype.split('/')[1];
		const nameImage = dogId + '.' + type;

		const uploadPath = path.join(__dirname, '../uploads/', nameImage);

		image.mv(uploadPath, (err) => {

			if (err) reject(err);
		})

		resolve(nameImage);
	})
}

module.exports = uploadImage;
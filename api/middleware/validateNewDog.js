const { isNumber, isText } = require('../helpers/validate');
const { Dog } = require('../models');


const validateValuesDog = async(req, res, next) => {

	const { 
		name, 
		minWeight, maxWeight, 
		minHeight, maxHeight, 
		minAge, maxAge, 
		temps,
	} = req.body;

	console.log("name", name);


	if(!isText(name)){
		return res.status(400).json({error: "The name is invalid."})
	}

	if(!isText(temps)){
		return res.status(400).json({error: "The temperaments is invalid."})
	}

	if(!isNumber(minWeight, maxWeight)){
		return res.status(400).json({error: "The weight is invalid."})
	}

	if(!isNumber(minHeight, maxHeight)){
		return res.status(400).json({error: "The height is invalid."})
	}

	if(!isNumber(minAge, maxAge)){
		return res.status(400).json({error: "The age is invalid."})
	}

	next();
}


const validateDogNotExist = async(req, res, next) => {

	const { name } = req.body;

	try {

		const dog = await Dog.findOne({ where: { name }});
		if(dog)return res.status(400).json({ error: 'The name is not available.' });
		
	} catch (error) {

		console.log(err)
		return res.status(500).json({ error: "Server error." });
	}

	next();
}


const validateImage = async(req, res, next) => {

	if(!req.files) return next();
	if(!req.files.image) return next();

	if (Object.keys(req.files).length > 1) {
    return res.status(400).json({ 
			error: 'Choose only one file.' 
		})
  }

  const { image } = req.files;
	const type = image.mimetype.split('/')[1];

	const validExtensions = ['png', 'jpg'];

	if(!validExtensions.includes(type)){
		return res.status(400).json({ 
			error: `The extension ${type} is not valid.`
		})
	}

	next();
}



module.exports = {
	validateValuesDog,
	validateDogNotExist,
	validateImage

}
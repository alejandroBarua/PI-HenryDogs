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

	if(!isText(name)){
		return res.status(400).json({msg: "The name is invalid."})
	}

	if(!isText(temps)){
		return res.status(400).json({msg: "The temperaments is invalid."})
	}

	if(!isNumber(minWeight, maxWeight)){
		return res.status(400).json({msg: "The weight is invalid."})
	}

	if(!isNumber(minHeight, maxHeight)){
		return res.status(400).json({msg: "The height is invalid."})
	}

	if(!isNumber(minAge, maxAge)){
		return res.status(400).json({msg: "The age is invalid."})
	}

	next();
}


const validateDogNotExist = async(req, res, next) => {

	const { name } = req.body;

	try {

		const dog = await Dog.findOne({ where: { name }});
		if(dog)return res.status(400).json({ msg: 'The name is not available.' });
		
	} catch (error) {

		console.log(err)
		return res.status(500).json({ msg: "Server error." });
	}

	next();
}


const validateImage = async(req, res, next) => {

	if(!req.files) return next();
	if(!req.files.image) return next();

	if (Object.keys(req.files).length > 1) {
    return res.status(400).json({ 
			msg: 'Choose only one file.' 
		})
  }

  const { image } = req.files;
	const type = image.mimetype.split('/')[1];

	const validExtensions = ['png', 'jpg'];

	if(!validExtensions.includes(type)){
		return res.status(400).json({ 
			msg: `The extension ${type} is not valid.`
		})
	}

	next();
}



module.exports = {
	validateValuesDog,
	validateDogNotExist,
	validateImage

}
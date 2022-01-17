const { isId } = require('../helpers/validate');

const validateDogId = async(req, res, next) => {

	const { id } = req.params;

	if(!isId(id)){
		return res.status(400).json({ error: 'The id is not valid.' })
	}

	next();
}

module.exports = validateDogId;
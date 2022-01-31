const { request, response } = require('express');

const { isUUID } = require('../helpers/validate');

const validateDogId = async(req = request, res = response, next) => {

	const { id } = req.params;

	if(!isUUID(id)){
		return res.status(400).json({ error: 'The id is not valid.' })
	}

	next();
}

module.exports = validateDogId;
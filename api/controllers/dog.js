const { request, response } = require('express');

const { Dog } = require('../models');



const getDogs = async(req = request, res = response) => {

	res.status(200).json({
		msg: 'GET /api/dogs',
	})

}



module.exports = {
	getDogs,

}
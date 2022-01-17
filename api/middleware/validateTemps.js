const { Temp } = require('../models');


const validateTemps = async(req, res, next) => {

	const { temps } = req.body;

	try {

		const promises = temps.map(el => Temp.findOne({ where: { name: el }}));
		const tempsDB = await Promise.all(promises)
	
		if(tempsDB.includes(null)){
			return res.status(400).json({ msg: "temperament does not exist" });
		}
		
	} catch (error) {
		
		console.log(err)
		return res.status(500).json({ msg: "server error" });
	}
	
	next();
}

module.exports = validateTemps;
const db = require('../models');

const dbConnection = async(opt = { force: false }) => {
	
	try {
		
		await db.sequelize.sync(opt);
		console.log('Database online');
		
	} catch (error) {
		console.log(error);
	}
}

module.exports = dbConnection;
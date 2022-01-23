const getDogByIdDB = require('./getDogByIdDB');
const validateDogId = require('./validateDogId');
const validateTemps = require('./validateTemps');
const { 	
	validateValuesDog,
	validateDogNotExist,
	validateImage,
	
} = require('./validateNewDog');


module.exports = {
	getDogByIdDB,
	validateDogId,
	validateTemps,
	validateValuesDog,
	validateDogNotExist,
	validateImage
}
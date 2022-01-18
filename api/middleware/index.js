const getDogByIdAPI = require('./getDogByIdAPI');
const validateDogId = require('./validateDogId');
const validateTemps = require('./validateTemps');
const { 	
	validateValuesDog,
	validateDogNotExist,
	validateImage,
	
} = require('./validateNewDog');


module.exports = {
	getDogByIdAPI,
	validateDogId,
	validateTemps,
	validateValuesDog,
	validateDogNotExist,
	validateImage
}
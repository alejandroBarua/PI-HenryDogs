const { Router } = require('express');
const router = Router();

const { 
	validateTemps, 
	validateValuesDog, 
	validateDogNotExist,
	
} = require('../middleware');

const { createDog } = require('../controllers/dog');


router.post('/', 
	validateValuesDog,
	validateDogNotExist,
	validateTemps,
	createDog)


module.exports = router;
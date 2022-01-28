const { Router } = require('express');
const router = Router();

const { 
	validateTemps, 
	validateValuesDog, 
	validateDogNotExist,
	validateDogId,
	
} = require('../middleware');

const { createDog, deleteDog } = require('../controllers/dog');


router.post('/', 
	validateValuesDog,
	validateDogNotExist,
	validateTemps,
	createDog)

router.delete('/:id', 
	validateDogId,
	deleteDog)


module.exports = router;
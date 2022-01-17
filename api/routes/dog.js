const { Router } = require('express');
const router = Router();

const { validateValuesDog, validateDogNotExist } = require('../middleware/validateNewDog');
const validateTemps = require('../middleware/validateTemps');

const { createDog } = require('../controllers/dog');



router.post('/', 
	validateValuesDog,
	validateDogNotExist,
	validateTemps,
	createDog)



module.exports = router;
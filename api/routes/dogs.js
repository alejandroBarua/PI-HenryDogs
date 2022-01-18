const { Router } = require('express');
const router = Router();

const getDogByIdAPI = require('../middleware/getDogByIdAPI');
const validateDogId = require('../middleware/validateDogId');

const { getDogsAll, getDogByIdDB } = require('../controllers/dogs');


router.get('/', getDogsAll);

router.get('/:id', 
	getDogByIdAPI, 
	validateDogId,
	getDogByIdDB);


module.exports = router;
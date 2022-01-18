const { Router } = require('express');
const router = Router();

const { getDogByIdAPI, validateDogId } = require('../middleware');
const { getDogsAll, getDogByIdDB } = require('../controllers/dogs');


router.get('/', getDogsAll);

router.get('/:id', 
	getDogByIdAPI, 
	validateDogId,
	getDogByIdDB);


module.exports = router;
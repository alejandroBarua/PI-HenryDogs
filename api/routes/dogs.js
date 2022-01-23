const { Router } = require('express');
const router = Router();

const { getDogByIdDB } = require('../middleware');
const { getDogsAll, getDogByIdAPI } = require('../controllers/dogs');


router.get('/', getDogsAll);

router.get('/:id', 
	getDogByIdDB,
	getDogByIdAPI)


module.exports = router;
const { Router } = require('express');
const router = Router();

const validateDogId = require('../middleware/validateDogId');

const { getDogById } = require('../controllers/dogs');


router.get('/:id', 
validateDogId, 
getDogById)



module.exports = router;
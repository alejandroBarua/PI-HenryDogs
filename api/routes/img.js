const { Router } = require('express');
const router = Router();

const validateDogId = require('../middleware/validateDogId');

const { getImgById } = require('../controllers/img');


router.get('/:id', 
validateDogId, 
getImgById)



module.exports = router;
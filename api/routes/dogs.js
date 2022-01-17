const { Router } = require('express');
const router = Router();

const { getDogById } = require('../controllers/dogs');


router.get('/:id', 
getDogById)



module.exports = router;
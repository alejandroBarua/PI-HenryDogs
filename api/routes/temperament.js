const { Router } = require('express');
const router = Router();

const { getTemps } = require('../controllers/temperament');


// http:localhos:8081/api/temperament

router.get('/', getTemps);


module.exports = router;
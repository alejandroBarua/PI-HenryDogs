const { Router } = require('express');
const router = Router();

const { getTemps } = require('../controllers/temperament');


router.get('/', getTemps);

module.exports = router;
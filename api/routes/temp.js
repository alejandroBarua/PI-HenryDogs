const { Router } = require('express');
const router = Router();

const {
	getTemps,

} = require('../controllers/temp')



router.get('/', getTemps);

module.exports = router;
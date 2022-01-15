const { Router } = require('express');
const router = Router();

const {
	getDogs,

} = require('../controllers/dog')



router.get('/', getDogs);



module.exports = router;
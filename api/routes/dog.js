const { Router } = require('express');
const router = Router();

const fileUpload = require('express-fileupload');

const { 
	validateValuesDog,
	validateDogNotExist,
	validateImage
} = require('../middleware/validateNewDog');
const validateTemps = require('../middleware/validateTemps');

const { createDog } = require('../controllers/dog');


router.use(fileUpload({
	useTempFiles: true,
	tempFileDir: '/tmp/'
}))


router.post('/', 
	validateValuesDog,
	validateDogNotExist,
	validateTemps,
	validateImage,
	createDog)



module.exports = router;
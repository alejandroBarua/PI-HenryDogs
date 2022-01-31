const { Router } = require('express');
const router = Router();

const fileUpload = require('express-fileupload');

const { validateDogId, validateImage } = require('../middleware');
const { createImage } = require('../controllers/img');


router.use(fileUpload({
	useTempFiles: true,
	tempFileDir: '/tmp/'
}))

router.post('/:id', 
	validateDogId, 
	validateImage,
	createImage)


module.exports = router;
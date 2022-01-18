const { Router } = require('express');
const router = Router();

const fileUpload = require('express-fileupload');

const { validateDogId, validateImage } = require('../middleware');
const { getImgById, createImage } = require('../controllers/img');


router.use(fileUpload({
	useTempFiles: true,
	tempFileDir: '/tmp/'
}))


router.get('/:id', 
validateDogId, 
getImgById)

router.post('/:id', 
validateDogId, 
validateImage,
createImage)


module.exports = router;
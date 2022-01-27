const express = require('express');
const routes = express.Router();

const paths = {
	temperament: '/api/temperament',
	dog: '/api/dog',
	dogs: '/api/dogs',
	img: '/api/img'
}

routes.use(paths.temperament, require('./temperament'));
routes.use(paths.dogs, require('./dogs'));
routes.use(paths.dog, require('./dog'));
routes.use(paths.img, require('./img'));



module.exports = routes;
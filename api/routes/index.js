const { Router } = require('express');
const routes = Router();
const path = require('path');

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

routes.get('*', (req, res) => {
  return res.sendFile(path.join(__dirname, '../../client/build/index.html'));
})


module.exports = routes;
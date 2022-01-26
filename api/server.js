const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const db = require('./models');

class Server {

	constructor(){

		this.app = express();
		this.port = process.env.PORT || '8080';
		this.paths = {
			temp: '/api/temperament',
			dog: '/api/dog',
			dogs: '/api/dogs',
			img: '/api/img',
		}

		this.dbConnection();
		this.middlewares();
		this.routes();
	}

	async dbConnection(){

		try {

			await db.sequelize.sync({ force: true });
			console.log('Database online');

		} catch (error) {
			console.log(error);
		}
	}

	middlewares(){
		this.app.use(cors());
		this.app.use(morgan('dev'));
		this.app.use(express.json());
		this.app.use(express.static(path.join(__dirname, 'public')));
	}

	routes(){

		this.app.use(this.paths.temp, require('./routes/temperament'));
		this.app.use(this.paths.dog, require('./routes/dog'));
		this.app.use(this.paths.dogs, require('./routes/dogs'));
		this.app.use(this.paths.img, require('./routes/img'));
	}

	listen(){

		this.app.listen(this.port, () => {
    	console.log(`App listening at http://localhost:${this.port}`)
		})
	}
}


module.exports = Server;
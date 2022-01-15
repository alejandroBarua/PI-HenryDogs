const express = require('express');
const cors = require('cors');

const db = require('./models');

class Server {

	constructor(){

		this.app = express();
		this.port = process.env.PORT || '8080';
		this.paths = {
			dog: '/api/dogs',
			temp: '/api/temperament'
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
		this.app.use(express.json());
		this.app.use(express.static('public'));
	}

	routes(){

		this.app.use(this.paths.dog, require('./routes/dog'));
		this.app.use(this.paths.temp, require('./routes/temp'));
	}

	listen(){

		this.app.listen(this.port, () => {
    	console.log(`App listening at http://localhost:${this.port}`)
		})
	}
}


module.exports = Server;
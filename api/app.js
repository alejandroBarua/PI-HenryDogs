require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes');
const dbConnection = require('./db');

const port = process.env.PORT || '8080';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(routes);
	
const server = app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`)
})

dbConnection({ force: false });


module.exports = {
	app,
	server
}
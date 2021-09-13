const express = require('express');
const {connect} = require('./utils/db')
const Character = require('./models/Character');
const characterRoutes = require('./routes/character.routes');
const locationRoutes = require('./routes/location.routes');
const userRoutes = require('./routes/user.routes');

const passport = require('passport');
require('./authentication/passport'); // Requerimos nuestro archivo de configuración

connect();
const PORT = 3000;
const server = express();


server.use(express.json());
server.use(express.urlencoded({ extended: false }));


// Añadimos el nuevo middleware al servidor
server.use(passport.initialize())

server.use('/characters', characterRoutes);
server.use('/locations', locationRoutes);
server.use('/users', userRoutes)

server.use('*', (req, res, next) => {
	const error = new Error('Route not found'); 
	error.status = 404;
	next(error); 
  });

server.use((error, req, res, next) => {
	return res.status(error.status || 500).json(error.message || 'Unexpected error');
});

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
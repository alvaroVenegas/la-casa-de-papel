const express = require('express');
const { connect, urlDb } = require('./utils/db')
const Character = require('./models/Character');
const characterRoutes = require('./routes/character.routes');
const locationRoutes = require('./routes/location.routes');
const userRoutes = require('./routes/user.routes');

const passport = require('passport');
require('./authentication/passport'); // Requerimos nuestro archivo de configuración

const session = require('express-session');

const MongoStore = require('connect-mongo');

const {isAuthenticated} = require('./middlewares/auth.middleware');

connect();
const PORT = 3000;
const server = express();


server.use(express.json());
server.use(express.urlencoded({ extended: false }));


server.use(
	session({
		secret: 'upgradehub_node', // ¡Este secreto tendremos que cambiarlo en producción!
		resave: false, // Solo guardará la sesión si hay cambios en ella.
		saveUninitialized: false, // Lo usaremos como false debido a que gestionamos nuestra sesión con Passport
		cookie: {
			maxAge: 3600000 // Milisegundos de duración de nuestra cookie, en este caso será una hora.
		},
		store: MongoStore.create({
			mongoUrl: urlDb,
		})
	})
);

server.use(passport.initialize());
server.use(passport.session());

server.use('/characters', [isAuthenticated], characterRoutes);
server.use('/locations', locationRoutes);
server.use('/users', userRoutes)

server.use('*', (req, res, next) => {
	const error = new Error('Route not found');
	error.status = 404;
	next(error);
});

server.use((error, req, res, next) => {
	return res.status(error.status || 500).json(error.message || 'Unexpected error');
});

server.listen(PORT, () => {
	console.log(`Server running in http://localhost:${PORT}`);
});
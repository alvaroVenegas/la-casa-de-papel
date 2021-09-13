const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/register', (req, res, next) => {
    // Invocamos a la autenticación de Passport
    passport.authenticate('register', (error, user) => {
        // Si hay un error, llamamos a nuestro controlador de errores
        if (error) {
            return next(error);
        }
        req.logIn(user, (error) => {
            // Si hay un error logeando al usuario, resolvemos el controlador
            if (error) {
                return next(error);
            }
            // Si no hay error, devolvemos al usuario logueado
            return res.status(200).json(user)
        });
    })(req); // ¡No te olvides de invocarlo aquí!
});


router.post('/login', (req, res, next) => {
    passport.authenticate('login', (error, user) => {
        if (error) return next(error)

        req.logIn(user, (error) => {
            // Si hay un error logeando al usuario, resolvemos el controlador
            if (error) {
                return next(error);
            }
            // Si no hay error, devolvemos al usuario logueado
            return res.status(200).json(user)
        });
    })(req);
});

router.post('/logout', (req, res, next) => {
    if (req.user) {
      // Destruimos el objeto req.user para este usuario
      req.logout();
  
      req.session.destroy(() => {
        // Eliminamos la cookie de sesión al cancelar la sesión
        res.clearCookie('connect.sid');
        // Redirijimos el usuario a la home
        return res.status(200).json('Hasta pronto!!');
      });
    } else {
      return res.sendStatus(304); // Si no hay usuario, no habremos cambiado nada
    }
  });


module.exports = router;
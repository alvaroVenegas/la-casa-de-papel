const router = require('express').Router();

router.get('/', (req, res, next) => {
    try {
        return res.send('Welcome to La Casa de Papel Api')
    } catch (error) {
        return next(error)
    }
});

module.exports = router;
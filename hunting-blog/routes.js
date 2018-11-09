const express = require('express');
const router = express.Router();
const HomeController = require('./controllers/homeController');
const ApiAuthController = require('./controllers/api/v1/authController');
const { loginStrategy, registerStrategy, jwtStrategy } = require('./strategies/authStrategies');
const passport = require('passport');

passport.use('registerStrategy', registerStrategy);
passport.use('loginStrategy', loginStrategy);
passport.use('jwtStrategy', jwtStrategy);

const apiLogin = passport.authenticate('loginStrategy', {session: false});
const apiRegister = passport.authenticate('registerStrategy', {session: false});
const jwtAuth = passport.authenticate('jwtStrategy', {session: false});


router.post('/api/v1/register', apiRegister, ApiAuthController.register);
router.get('/protected', jwtAuth, HomeController.index)
router.get('/', HomeController.index);

module.exports = router;
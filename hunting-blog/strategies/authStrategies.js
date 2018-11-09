const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../models/user');
const { JWT_SECRET } = require('../config'); 

const registerStrategy = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, function(req, username, password, done) {
    User.findOne({
        username: username
    }, function(err, user) {
        if(err) {
            return done(err);
        }
        if(user) {
            return done(null, false);
        }
        let newUser = new User(req.body);
        newUser.password = newUser.hashPassword(req.body.password);
        newUser.save(function(err) {
            if(err) {
                return done(err);
            }
            return done(null, newUser);
        });
    });
});

const loginStrategy = new LocalStrategy(function(username, password, callback) {
    let user;
    User.findOne({
        username: username
    })
    .then(function(_user) {
        user = _user;
        if(!user) {
            return Promise.reject({
                reason: 'Login Error',
                message: 'Incorret Username or Password'
            });
        }
        return user.validatePassword(password);
    })
    .then(function(isValid) {
        if(!isValid) {
            return Promise.reject({
                reason: 'Login Error',
                message: 'Incorret Username or Password'
            }); 
        }
        return callback(null, user);
    })
    .catch(function(err) {
        if(err.reason === 'Login Error') {
            return callback(null, false, err);
        }
        return callback(err, false);
    });
});

const jwtStrategy = new JwtStrategy({
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    algorithms: ['HS256']
}, function(payload, done) {
    done(null, payload.user);
});

module.exports = {registerStrategy, loginStrategy, JwtStrategy};
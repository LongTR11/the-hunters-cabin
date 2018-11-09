const express = require('express');
const app = express();
const router = require('./routes');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const { DATABASE_URL, PORT, JWT_SECRET } = require('./config');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser());
app.use(morgan('common'));
app.use(cookieParser(JWT_SECRET));
app.use(session({secret: JWT_SECRET}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);

let server;
let db;

function runServer(dbURL, port = PORT) {
    return new Promise(function (resolve, reject) {
        db = mongoose.connect(dbURL, function (err) {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, function () {
                console.log(`listening on ${port}`);
                resolve();
            }).on('error', function (err) {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(function () {
        return new Promise(function (resolve, reject) {
            console.log('closing server');
            server.close(function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(err);
            });
        });
    });
}

if (require.main === module) {

    runServer(DATABASE_URL).catch(function (err) {
        console.error(err);
    });
}
module.exports = { runServer, app, closeServer };
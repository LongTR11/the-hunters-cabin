const express = require('express');
const app = express();
const router = require('./routes');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser());
app.use(morgan('common'));

app.use('/', router);

app.listen(8080, function () {
    console.log('listening on 8080');
});
 
app.use('/blogposts', router);
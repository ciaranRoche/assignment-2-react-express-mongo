var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var morgan = require('morgan');
var path = require('path');
var logger = require('winston');
var bodyParser = require('body-parser');

var app = express();

// Add middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// See the User Controller for `/users` routes
app.use('/api/users', require('./api/users/index'));
app.use('/api/vinyl', require('./api/vinyl/index'));

if (require.main === module) {
  mongoose.connect('mongodb://localhost/db', {
    useMongoClient: true,
  });
  app.listen(8000, function () {
    logger.info('Listening at http://localhost:8000');
  });
}

module.exports = app;
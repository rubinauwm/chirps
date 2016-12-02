var express = require('express'),
  morgan = require('morgan'),
  logger = require('./logger'),
  path = require('path'),
  glob = require('glob'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  cors = require('cors');

module.exports = function (app, config) {

  app.use(morgan('dev'));

  mongoose.connect(config.db);
  mongoose.Promise = global.Promise;
  var db = mongoose.connection;
  db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
  });


  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));

    mongoose.set('debug', true);
    mongoose.connection.once('open', function callback() {
      logger.log("Mongoose connected to the database");
    });
    app.use(function (req, res, next) {
      logger.log('Request from ' + req.connection.remoteAddress, 'info');
      next();
    });
    app.get(function (req, res, next) {
      logger.log('request from' + req.connection.remoteAddress, 'info');
      next();
    });

  };

  //body parser

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // routes

  app.use(express.static(config.root + '/public'));

  app.use(cors());


  var models = glob.sync(config.root + '/app/models/*.js');
  models.forEach(function (model) {
    require(model);
  });



  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app, config);
  });


 app.use(function (req, res) {
    res.type('text/plan');
    res.status(404);
    res.send('404 Not Found');
  });


  app.use(function (err, req, res, next) {
    console.log(err)
    if (process.env.NODE_ENV !== 'test') logger.log(err.stack, 'error');
    res.type('text/plan');
    if (err.status) {
      res.status(err.status).send(err.message);
    } else {
      res.status(500).send('500 Sever Error');
    }
  });


  logger.log("Starting application");

};

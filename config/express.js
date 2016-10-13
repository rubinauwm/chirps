var express = require('express'),
    morgan = require('morgan'),
    logger = require('./logger');
    path= require('path');
    glob=require('glob');
bodyParser = require('body-parser');


module.exports = function (app, config) {

  app.use(morgan('dev'));

  if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  };

  app.use(function (req, res, next) {
    logger.log('Request from ' + req.connection.remoteAddress, 'info');
    next();
  });  

  //body parser

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  
  app.get(function(req,res,next){
    logger.log('request from' + req.connection.remoteAddress, 'info');
    next();
  });

   // routes
 
 app.use(express.static(config.root + '/public'));



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
    console.error(err.stack);
    res.type('text/plan');
    res.status(500);
    res.send('500 Sever Error');
  });

  logger.log("Starting application");

};

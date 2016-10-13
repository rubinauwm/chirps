var express = require('express'),
	logger = require('../../config/logger'),
  	router = express.Router()  

module.exports = function (app) {
  	app.use('/api', router); 


      router.route('/chirps/like/:id')

      .put(function (req, res) {
			logger.log("like a chirp","verbose");		
            res.status(200).json({msg: "like a chirp"});
		});

 router.route('/chirps/userChirps/:id')

 .get(function (req, res) {
			logger.log("Get a user's chirps","verbose");		
            res.status(200).json({msg: "GET a user's chirps"});
		});


 router.route('/chirps/:id')

 .get(function (req, res) {
			logger.log("Get a chirps","verbose");		
            res.status(200).json({msg: "GET a chirps"});
		})

      .delete(function (req, res) {
			logger.log("delete a chirps","verbose");		
            res.status(200).json({msg: "delete a chirps"});
		});

     
     
      router.route('/chirps')

.get(function (req, res) {
			logger.log("Get all chirps","verbose");		
            res.status(200).json({msg: "GET all chirps"});
		})

    
.post(function (req, res) {
			logger.log("create a chirps","verbose");		
            res.status(201).json({msg: "create a chirps"});
		})  


.put(function (req, res) {
			logger.log("update a chirps","verbose");		
            res.status(200).json({msg: "update a chirps"});
		});



}
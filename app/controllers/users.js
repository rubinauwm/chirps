var express = require('express'),
	logger = require('../../config/logger'),
  	router = express.Router()  

module.exports = function (app) {
  	app.use('/api', router);  


      router.route('/users/follow/:id')

       .put(function(req,res){
        logger.log("follow a user","verbose");
        res.status(200).json({msg: "follow a user"});

    });

     
     
      router.route('/users/followedChirps/:id')

       .get(function(req,res){
          logger.log("get the chirps of the users a user follows","verbose");
          res.status(200).json({msg: "get the chirps of the users a user follows"});
      });

      
      
      router.route('/users/screenName/:name')

      .get(function(req,res){
          logger.log("get a user based on screen name","verbose");
          res.status(200).json({msg: "get a user based on screen name"});
      });

	
    
    router.route('/users/:id')

    .get(function(req,res){
        logger.log("get a user","verbose");
        res.status(200).json({msg: "get a user"});
    })

    .delete(function(req,res){
        logger.log("delete a user","verbose");
        res.status(200).json({msg: "delete a user"});
    });
    
    
  
  
    router.route('/users')	

    .get(function (req, res) {
			logger.log("Get all users","verbose");		
            res.status(200).json({msg: "GET all users"});
		})

		.post(function(req, res){
			logger.log("Create a users","verbose");
			res.status(201).json({msg: "Create a user"});
		})

        .put(function(req,res){
        logger.log("update a user","verbose");
        res.status(200).json({msg: "update a user"});

    });




}

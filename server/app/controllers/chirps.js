var express = require('express'),
	logger = require('../../config/logger'),
	router = express.Router(),
	mongoose = require('mongoose'),
	Chirp = mongoose.model('Chirp');

module.exports = function (app) {
	app.use('/api', router);


	 router.route('/chirps/followedChirps/:id')

		.get(requireAuth,function (req, res, next) {
			logger.log('Get Users followed chirps ' + req.params.id, 'debug');
			User.findOne({ _id: req.params.id }, function (err, user) {
				if (!err) {
					Chirp.find({
						$or: [
							{ chirpAuthor: user._id }, { chirpAuthor: { $in: user.follow } }
						]
					}).populate('chirpAuthor').sort({ dateSubmitted: -1 }).exec(function (err, chirps) {
						if (!err) {
							res.status(200).json(chirps);
						} else {
							res.status(403).json({ message: "Forbidden" });
						}
					});
				}
			});
		});



	router.route('/chirps/like/:id')


		.put(requireAuth,function (req, res, next) {
			logger.log('Update Chirp ' + req.params.id, 'debug');
			Chirp.findOne({ _id: req.params.id }).exec()
				.then(function (chirp) {
					chirp.likes++;
					return chirp.save();
				})
				.then(function (chirp) {
					res.status(200).json(chirp);
				})
				.catch(function (err) {
					return next(err);
				});
		});




	router.route('/chirps/userChirps/:id')


		.get(requireAuth,function (req, res, next) {
			logger.log('Get User Chirps ' + req.params.id, 'verbose');
			Chirp.find({ chirpAuthor: req.params.id })
				.populate('chirpAuthor')
				.sort("-dateCreated")
				.exec()
				.then(function (chirps) {
					res.status(200).json(chirps);
				})
				.catch(function (err) {
					return next(err);
				})
		});




	router.route('/chirps/:id')

		.get(requireAuth,function (req, res) {
			logger.log("Get a chirps", "verbose");
			res.status(200).json({ msg: "GET a chirps" });
		})

		.delete(requireAuth,function (req, res) {
			logger.log("delete a chirps", "verbose");
			res.status(200).json({ msg: "delete a chirps" });
		});



	router.route('/chirps')

		.get(requireAuth,function (req, res) {
			logger.log("Get all chirps", "verbose");
			Chirp.find()
				.exec()
				.then(function (chirps) {
					res.status(200).json(chirps);
				})

		})

		.post(function (req, res, next) {
			logger.log('Create Chirp', 'verbose');
			var chirp = new Chirp(req.body);
			chirp.save()
				.then(function (result) {
					res.status(201).json(result);
				})
				.catch(function (err) {
					return next(err);
				});
		})


		.put(requireAuth,function (req, res) {
			logger.log("update a chirps", "verbose");
			res.status(200).json({ msg: "update a chirps" });
		});

}
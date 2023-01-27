const express = require('express');
const router = express.Router();

const {
	isLoggedIn,
	validateId,
	isAuthor,
	validateBody,
} = require('../middleware');
const { vehicleSchema } = require('../schemas');
const Vehicle = require('../models/vehicles');
const vehicleController = require('../controllers/vehicles');

router
	.route('/')
	.get(isLoggedIn, vehicleController.index)
	.post(isLoggedIn, validateBody(vehicleSchema), vehicleController.create);

router.route('/nuevo').get(isLoggedIn, vehicleController.getCreate);

router
	.route('/:id')
	.put(
		isLoggedIn,
		validateId(Vehicle),
		isAuthor(Vehicle),
		validateBody(vehicleSchema),
		vehicleController.update
	)
	.delete(
		isLoggedIn,
		validateId(Vehicle),
		isAuthor(Vehicle),
		vehicleController.delete
	);

module.exports = router;

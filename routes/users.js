const express = require('express');
const router = express.Router();

const {
	isLoggedIn,
	validateId,
	isAuthor,
	validateBody,
	isBusiness,
} = require('../middleware');
const { userSchema } = require('../schemas');
const User = require('../models/users');
const userController = require('../controllers/users');

router
	.route('/')
	.get(isLoggedIn, isBusiness, userController.index)
	.post(
		isLoggedIn,
		isBusiness,
		validateBody(userSchema),
		userController.create
	);

router.route('/nuevo').get(isLoggedIn, isBusiness, userController.getCreate);

router
	.route('/:id')
	.put(
		isLoggedIn,
		isBusiness,
		validateId(User),
		isAuthor(User),
		validateBody(userSchema),
		userController.update
	)
	.delete(
		isLoggedIn,
		isBusiness,
		validateId(User),
		isAuthor(User),
		userController.delete
	);

module.exports = router;
